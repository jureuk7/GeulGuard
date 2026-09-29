import AppKit
import HangulCore
import InputMethodKit
import os

@objc(GeulGuardInputController)
final class GeulGuardInputController: IMKInputController {
    private static let composingSessions = OSAllocatedUnfairLock(initialState: Set<ObjectIdentifier>())

    static var hasPendingComposition: Bool {
        composingSessions.withLock { !$0.isEmpty }
    }

    private var composer = HangulComposer()
    private var telegramInline = TelegramInlineComposition()
    private var telegramUsesMarkedFallback = false
    private let noReplacement = NSRange(location: NSNotFound, length: NSNotFound)

    override func handle(_ event: NSEvent!, client sender: Any!) -> Bool {
        guard let event, let client = sender as? IMKTextInput else { return false }
        defer { recordCompositionState() }

        let useTelegramInline = TelegramInlinePolicy.isEnabled(
            bundleIdentifier: client.bundleIdentifier(),
            settingEnabled: GeulGuardPreferences.usesTelegramInlineComposition
        )
        if telegramInline.hasInlineText {
            // Telegram may have sent and cleared the field without forwarding Enter
            // to the IME. Never rewrite a stale range in the next document state.
            if !useTelegramInline || !telegramInline.isCurrent(in: client) {
                composer.cancel()
                telegramInline.clear()
                telegramUsesMarkedFallback = false
            }
        } else if useTelegramInline && composer.hasComposition && !telegramUsesMarkedFallback {
            // Finish an existing marked syllable in its original mode if the
            // setting was enabled in the middle of that composition.
            telegramUsesMarkedFallback = true
        }

        guard event.modifierFlags.intersection([.command, .control, .option]).isEmpty else {
            commitComposition(to: client)
            return false
        }

        if event.keyCode == 53 { // Escape commits Hangul; macOS owns input source switching.
            commitComposition(to: client)
            return false
        }

        if event.keyCode == 51 { // Delete/backspace decomposes active Hangul.
            guard let update = composer.backspace() else { return false }
            if telegramInline.hasInlineText, update.committed.isEmpty, update.composing.isEmpty {
                // Telegram ignores an empty replacement, so let its own Backspace
                // delete the last inline jamo right before the caret.
                telegramInline.clear()
                return false
            }
            apply(update, to: client, inline: useTelegramInline && !telegramUsesMarkedFallback)
            return true
        }

        guard let character = hangulKey(from: event) else {
            commitComposition(to: client)
            return false
        }

        composer.combinesRepeatedInitials = GeulGuardPreferences.combinesRepeatedInitials
        guard let update = composer.input(character) else {
            // Never let navigation, focus-changing keys, shortcuts, or
            // punctuation cancel marked Hangul. Commit it synchronously first.
            commitComposition(to: client)
            return false
        }

        apply(update, to: client, inline: useTelegramInline && !telegramUsesMarkedFallback)
        return true
    }

    override func commitComposition(_ sender: Any!) {
        defer { recordCompositionState() }
        guard let client = sender as? IMKTextInput else {
            composer.cancel()
            telegramInline.clear()
            telegramUsesMarkedFallback = false
            return
        }
        commitComposition(to: client)
    }

    override func deactivateServer(_ sender: Any!) {
        defer { recordCompositionState() }
        if let client = sender as? IMKTextInput {
            commitComposition(to: client)
        } else {
            composer.cancel()
            telegramInline.clear()
            telegramUsesMarkedFallback = false
        }
        super.deactivateServer(sender)
    }

    deinit {
        let identifier = ObjectIdentifier(self)
        _ = Self.composingSessions.withLock { $0.remove(identifier) }
    }

    private func recordCompositionState() {
        let identifier = ObjectIdentifier(self)
        let hasComposition = composer.hasComposition
        Self.composingSessions.withLock { sessions in
            if hasComposition {
                sessions.insert(identifier)
            } else {
                sessions.remove(identifier)
            }
        }
    }

    private func apply(_ update: CompositionUpdate, to client: IMKTextInput, inline: Bool) {
        if inline {
            if telegramInline.apply(update, to: client) { return }
            // Without a usable selection range, preserve the input via the
            // normal marked-text path for this update.
            telegramUsesMarkedFallback = true
        }
        if !update.committed.isEmpty {
            client.insertText(update.committed, replacementRange: noReplacement)
        }

        // Plain strings often render as a selection highlight in Electron/Chromium.
        // An underlined attributed string matches system IME marked-text styling.
        let marked = NSAttributedString(
            string: update.composing,
            attributes: [
                .underlineStyle: NSUnderlineStyle.single.rawValue
            ]
        )
        client.setMarkedText(
            marked,
            selectionRange: NSRange(location: marked.length, length: 0),
            replacementRange: noReplacement
        )
    }

    private func commitComposition(to client: IMKTextInput) {
        if telegramInline.hasInlineText {
            composer.cancel()
            telegramInline.clear()
            telegramUsesMarkedFallback = false
            return
        }
        let committed = composer.commit()
        telegramUsesMarkedFallback = false
        guard !committed.isEmpty else { return }
        client.insertText(committed, replacementRange: noReplacement)
    }

    /// Maps a key event to 두벌식 Latin keys without letting a still-held Shift
    /// after ㄲ/ㄸ/ㅃ/ㅆ/ㅉ leak as ASCII (`ㅆ` + `M` instead of `쓰`).
    private func hangulKey(from event: NSEvent) -> Character? {
        guard let raw = event.charactersIgnoringModifiers,
              raw.count == 1,
              let base = raw.lowercased().first,
              base.isASCII,
              base.isLetter else {
            // Punctuation / space: prefer characters so shifted symbols work.
            guard let characters = event.characters,
                  characters.count == 1,
                  let character = characters.first,
                  !character.isLetter else {
                return nil
            }
            return character
        }

        let shifted = event.modifierFlags.contains(.shift)
        let shiftVariants: [Character: Character] = [
            "q": "Q", "w": "W", "e": "E", "r": "R", "t": "T",
            "o": "O", "p": "P"
        ]
        if shifted, let variant = shiftVariants[base] {
            return variant
        }
        return base
    }
}

import AppKit
import HangulCore
import InputMethodKit

@objc(GeulGuardInputController)
final class GeulGuardInputController: IMKInputController {
    private var composer = HangulComposer()
    private let noReplacement = NSRange(location: NSNotFound, length: NSNotFound)

    override func handle(_ event: NSEvent!, client sender: Any!) -> Bool {
        guard let event, let client = sender as? IMKTextInput else { return false }

        if isModeToggle(event) {
            commitComposition(to: client)
            MainActor.assumeIsolated {
                InputModeStore.shared.toggle()
            }
            return true
        }

        let mode = MainActor.assumeIsolated { InputModeStore.shared.mode }
        if mode == .english {
            return false
        }

        if event.keyCode == 53 { // Escape: preserve text, then make Vim/terminal safe.
            commitComposition(to: client)
            MainActor.assumeIsolated {
                InputModeStore.shared.switchToEnglish()
            }
            return false
        }

        if event.keyCode == 51 { // Delete/backspace decomposes active Hangul.
            guard let update = composer.backspace() else { return false }
            apply(update, to: client)
            return true
        }

        let disallowedModifiers: NSEvent.ModifierFlags = [.command, .control, .option]
        guard event.modifierFlags.intersection(disallowedModifiers).isEmpty,
              let characters = event.characters,
              characters.count == 1,
              var character = characters.first else {
            commitComposition(to: client)
            return false
        }

        // Caps Lock should not turn every consonant/vowel into its Shift variant.
        if event.modifierFlags.contains(.capsLock),
           !event.modifierFlags.contains(.shift),
           let normalized = String(character).lowercased().first {
            character = normalized
        }

        guard let update = composer.input(character) else {
            // The fix: never let navigation, focus-changing keys, shortcuts, or
            // punctuation cancel marked Hangul. Commit it synchronously first.
            commitComposition(to: client)
            return false
        }

        apply(update, to: client)
        return true
    }

    override func commitComposition(_ sender: Any!) {
        guard let client = sender as? IMKTextInput else {
            composer.cancel()
            return
        }
        commitComposition(to: client)
    }

    override func deactivateServer(_ sender: Any!) {
        if let client = sender as? IMKTextInput {
            commitComposition(to: client)
        } else {
            composer.cancel()
        }
        super.deactivateServer(sender)
    }

    private func apply(_ update: CompositionUpdate, to client: IMKTextInput) {
        if !update.committed.isEmpty {
            client.insertText(update.committed, replacementRange: noReplacement)
        }

        client.setMarkedText(
            update.composing,
            selectionRange: NSRange(location: update.composing.utf16.count, length: 0),
            replacementRange: noReplacement
        )
    }

    private func commitComposition(to client: IMKTextInput) {
        let committed = composer.commit()
        guard !committed.isEmpty else { return }
        client.insertText(committed, replacementRange: noReplacement)
    }

    private func isModeToggle(_ event: NSEvent) -> Bool {
        event.keyCode == 49
            && event.modifierFlags.contains(.shift)
            && !event.modifierFlags.contains(.command)
            && !event.modifierFlags.contains(.control)
            && !event.modifierFlags.contains(.option)
    }
}

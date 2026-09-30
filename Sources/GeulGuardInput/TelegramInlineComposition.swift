import Foundation
import HangulCore
import InputMethodKit

enum TelegramInlinePolicy {
    static let clientBundleIdentifiers: Set<String> = ["ru.keepcoder.Telegram"]

    static func isEnabled(bundleIdentifier: String?, settingEnabled: Bool) -> Bool {
        settingEnabled && bundleIdentifier.map(clientBundleIdentifiers.contains) == true
    }
}

/// Mirrors the composer's current syllable in ordinary document text, never marked text.
struct TelegramInlineComposition {
    private(set) var inlineRange: NSRange?
    private(set) var lastInlineString = ""

    var hasInlineText: Bool { inlineRange != nil }

    func isCurrent(in client: IMKTextInput) -> Bool {
        guard let range = inlineRange else { return true }
        guard range.location != NSNotFound,
              NSMaxRange(range) <= client.length(),
              client.selectedRange() == NSRange(location: NSMaxRange(range), length: 0) else {
            return false
        }
        let currentText = client.attributedSubstring(from: range)?.string
            ?? client.string(from: range, actualRange: nil)
        return currentText == lastInlineString
    }

    @discardableResult
    mutating func apply(_ update: CompositionUpdate, to client: IMKTextInput) -> Bool {
        let replacementRange = inlineRange ?? client.selectedRange()
        guard replacementRange.location != NSNotFound else { return false }

        let text = update.committed + update.composing
        client.insertText(text, replacementRange: replacementRange)

        if update.composing.isEmpty {
            clear()
        } else {
            // IMK ranges use UTF-16 offsets, including for non-BMP text before the caret.
            inlineRange = NSRange(
                location: replacementRange.location + (update.committed as NSString).length,
                length: (update.composing as NSString).length
            )
            lastInlineString = update.composing
        }
        return true
    }

    mutating func clear() {
        inlineRange = nil
        lastInlineString = ""
    }
}

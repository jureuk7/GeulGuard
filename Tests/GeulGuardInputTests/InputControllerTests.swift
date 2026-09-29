import AppKit
import HangulCore
import InputMethodKit
import XCTest
@testable import GeulGuardInput

final class InputControllerTests: XCTestCase {
    @MainActor
    func testUpdateWaitsForEveryCompositionToFinish() {
        let firstClient = TextClient()
        let secondClient = TextClient()
        let first = GeulGuardInputController(server: nil, delegate: nil, client: nil)!
        var second: GeulGuardInputController? = GeulGuardInputController(server: nil, delegate: nil, client: nil)!
        XCTAssertFalse(GeulGuardInputController.hasPendingComposition)
        XCTAssertTrue(first.handle(key("r", code: 15), client: firstClient))
        XCTAssertTrue(second!.handle(key("k", code: 40), client: secondClient))
        XCTAssertTrue(GeulGuardInputController.hasPendingComposition)
        first.deactivateServer(firstClient)
        XCTAssertEqual(firstClient.string, "ㄱ")
        XCTAssertTrue(GeulGuardInputController.hasPendingComposition)
        second?.commitComposition(secondClient)
        XCTAssertEqual(secondClient.string, "ㅏ")
        XCTAssertFalse(GeulGuardInputController.hasPendingComposition)
        XCTAssertTrue(second!.handle(key("r", code: 15), client: secondClient))
        second = nil
        XCTAssertFalse(GeulGuardInputController.hasPendingComposition)
    }

    @MainActor

    func testEmptyCommitDoesNotEraseSelectedEnglishText() {
        let client = TextClient()
        client.string = "abcdef"
        client.setSelectedRange(NSRange(location: 0, length: 6))
        let controller = GeulGuardInputController(server: nil, delegate: nil, client: nil)!
        controller.commitComposition(client)
        XCTAssertEqual(client.string, "abcdef")
        XCTAssertEqual(client.markedWrites, 0)
    }

    @MainActor
    func testEscapeKeepsFollowingInputKorean() {
        let client = TextClient()
        let controller = GeulGuardInputController(server: nil, delegate: nil, client: nil)!
        XCTAssertTrue(controller.handle(key("r", code: 15), client: client))
        XCTAssertFalse(controller.handle(key("\u{1b}", code: 53), client: client))
        XCTAssertTrue(controller.handle(key("k", code: 40), client: client))
        controller.commitComposition(client)
        XCTAssertEqual(client.string, "ㄱㅏ")
    }

    @MainActor
    func testShiftSpacePassesThroughAndDoesNotSwitchMode() {
        let client = TextClient()
        let controller = GeulGuardInputController(server: nil, delegate: nil, client: nil)!
        XCTAssertTrue(controller.handle(key("r", code: 15), client: client))
        XCTAssertFalse(controller.handle(key(" ", code: 49, modifiers: .shift), client: client))
        XCTAssertTrue(controller.handle(key("k", code: 40), client: client))
        controller.commitComposition(client)
        XCTAssertEqual(client.string, "ㄱㅏ")
    }

    @MainActor
    func testRepeatedKoreanInputAndSourceDeactivationPreserveText() {
        let client = TextClient()
        let controller = GeulGuardInputController(server: nil, delegate: nil, client: nil)!
        for _ in 0..<100 {
            XCTAssertTrue(controller.handle(key("r", code: 15, repeatKey: true), client: client))
            XCTAssertTrue(controller.handle(key("k", code: 40, repeatKey: true), client: client))
        }
        controller.deactivateServer(client)
        XCTAssertEqual(client.string, String(repeating: "가", count: 100))
        XCTAssertFalse(client.hasMarkedText)
        client.setSelectedRange(NSRange(location: 0, length: 100))
        controller.commitComposition(client)
        XCTAssertEqual(client.string, String(repeating: "가", count: 100))
    }

    @MainActor
    func testRepeatedInitialSettingAppliesToActiveInputSession() {
        let defaults = UserDefaults.standard
        let previousValue = defaults.object(forKey: GeulGuardPreferences.combineRepeatedInitialsKey)
        defer {
            if let previousValue {
                defaults.set(previousValue, forKey: GeulGuardPreferences.combineRepeatedInitialsKey)
            } else {
                defaults.removeObject(forKey: GeulGuardPreferences.combineRepeatedInitialsKey)
            }
        }

        defaults.set(false, forKey: GeulGuardPreferences.combineRepeatedInitialsKey)
        let client = TextClient()
        let controller = GeulGuardInputController(server: nil, delegate: nil, client: nil)!
        XCTAssertTrue(controller.handle(key("r", code: 15), client: client))
        XCTAssertTrue(controller.handle(key("r", code: 15), client: client))

        defaults.set(true, forKey: GeulGuardPreferences.combineRepeatedInitialsKey)
        XCTAssertTrue(controller.handle(key("r", code: 15), client: client))
        controller.commitComposition(client)

        XCTAssertEqual(client.string, "ㄱㄲ")
    }

    @MainActor
    func testModifiedBackspaceCommitsHangulAndPassesShortcutToClient() {
        for modifier: NSEvent.ModifierFlags in [.control, .option, .command] {
            let client = TextClient()
            let controller = GeulGuardInputController(server: nil, delegate: nil, client: nil)!
            XCTAssertTrue(controller.handle(key("r", code: 15), client: client))
            XCTAssertTrue(controller.handle(key("k", code: 40), client: client))
            XCTAssertFalse(controller.handle(key("\u{7f}", code: 51, modifiers: modifier), client: client))
            XCTAssertEqual(client.string, "가")
            XCTAssertFalse(client.hasMarkedText)
        }
    }

    @MainActor
    func testControlShortcutsPreserveCompositionBeforePassingThrough() {
        for shortcut in [("c", UInt16(8)), ("d", UInt16(2)), ("u", UInt16(32)), ("w", UInt16(13))] {
            let client = TextClient()
            let controller = GeulGuardInputController(server: nil, delegate: nil, client: nil)!
            XCTAssertTrue(controller.handle(key("r", code: 15), client: client))
            XCTAssertTrue(controller.handle(key("k", code: 40), client: client))
            XCTAssertFalse(controller.handle(key(shortcut.0, code: shortcut.1, modifiers: .control), client: client))
            XCTAssertEqual(client.string, "가")
            XCTAssertFalse(client.hasMarkedText)
        }
    }

    @MainActor
    func testPlainBackspaceStillDeletesOneJamo() {
        let client = TextClient()
        let controller = GeulGuardInputController(server: nil, delegate: nil, client: nil)!
        XCTAssertTrue(controller.handle(key("r", code: 15), client: client))
        XCTAssertTrue(controller.handle(key("k", code: 40), client: client))
        XCTAssertTrue(controller.handle(key("\u{7f}", code: 51), client: client))
        XCTAssertEqual(client.string, "ㄱ")
        XCTAssertTrue(client.hasMarkedText)
        XCTAssertTrue(controller.handle(key("\u{7f}", code: 51), client: client))
        XCTAssertEqual(client.string, "")
        XCTAssertFalse(controller.handle(key("\u{7f}", code: 51), client: client))
    }

    @MainActor
    func testNavigationCommitsExactlyOnceBeforePassingThrough() {
        let boundaries: [(String, UInt16)] = [("\r", 36), ("\t", 48), (" ", 49), ("\u{f702}", 123), ("\u{f703}", 124)]
        for boundary in boundaries {
            let client = TextClient()
            let controller = GeulGuardInputController(server: nil, delegate: nil, client: nil)!
            XCTAssertTrue(controller.handle(key("r", code: 15), client: client))
            XCTAssertTrue(controller.handle(key("k", code: 40), client: client))
            XCTAssertFalse(controller.handle(key(boundary.0, code: boundary.1), client: client))
            XCTAssertEqual(client.string, "가")
            XCTAssertFalse(client.hasMarkedText)
            controller.commitComposition(client)
            XCTAssertEqual(client.string, "가")
        }
    }

    @MainActor
    func testTelegramInlineTypesWordWithoutMarkedText() {
        withTelegramInlineSetting(true) {
            let client = TextClient(bundleID: "ru.keepcoder.Telegram")
            let controller = GeulGuardInputController(server: nil, delegate: nil, client: nil)!
            let keys: [(String, UInt16)] = [
                ("d", 2), ("k", 40), ("s", 1), ("s", 1), ("u", 32), ("d", 2),
                ("g", 5), ("k", 40), ("t", 17), ("p", 35), ("d", 2), ("y", 16)
            ]
            for (text, code) in keys {
                XCTAssertTrue(controller.handle(key(text, code: code), client: client))
                XCTAssertFalse(client.hasMarkedText)
                XCTAssertEqual(client.markedWrites, 0)
            }
            XCTAssertEqual(client.string, "안녕하세요")
            XCTAssertFalse(controller.handle(key(" ", code: 49), client: client))
            controller.commitComposition(client)
            XCTAssertEqual(client.string, "안녕하세요")
            XCTAssertFalse(GeulGuardInputController.hasPendingComposition)
        }
    }

    @MainActor
    func testTelegramInlineBackspaceDecomposesAndDeletes() {
        withTelegramInlineSetting(true) {
            let client = TextClient(bundleID: "ru.keepcoder.Telegram")
            let controller = GeulGuardInputController(server: nil, delegate: nil, client: nil)!
            XCTAssertTrue(controller.handle(key("r", code: 15), client: client))
            XCTAssertTrue(controller.handle(key("k", code: 40), client: client))
            XCTAssertTrue(controller.handle(key("s", code: 1), client: client))
            XCTAssertEqual(client.string, "간")
            for expected in ["가", "ㄱ"] {
                XCTAssertTrue(controller.handle(key("\u{7f}", code: 51), client: client))
                XCTAssertEqual(client.string, expected)
                XCTAssertFalse(client.hasMarkedText)
            }
            // The last jamo is left to the client's own Backspace, which Telegram
            // honors, instead of an empty replacement it ignores.
            XCTAssertFalse(controller.handle(key("\u{7f}", code: 51), client: client))
            XCTAssertEqual(client.string, "ㄱ")
            XCTAssertFalse(controller.handle(key("\u{7f}", code: 51), client: client))
            XCTAssertEqual(client.markedWrites, 0)
        }
    }

    @MainActor
    func testTelegramInlineDropsStaleStateAfterExternalClear() {
        withTelegramInlineSetting(true) {
            let client = TextClient(bundleID: "ru.keepcoder.Telegram")
            let controller = GeulGuardInputController(server: nil, delegate: nil, client: nil)!
            XCTAssertTrue(controller.handle(key("r", code: 15), client: client))
            XCTAssertTrue(controller.handle(key("k", code: 40), client: client))
            XCTAssertEqual(client.string, "가")
            client.string = "" // Telegram sent the message without forwarding Enter to IMK.
            XCTAssertTrue(controller.handle(key("s", code: 1), client: client))
            XCTAssertEqual(client.string, "ㄴ")
            controller.commitComposition(client)
            XCTAssertEqual(client.string, "ㄴ")
            XCTAssertEqual(client.markedWrites, 0)
        }
    }

    @MainActor
    func testTelegramInlineDropsStaleStateAfterCaretOrTextChange() {
        withTelegramInlineSetting(true) {
            for changedText in [false, true] {
                let client = TextClient(bundleID: "ru.keepcoder.Telegram")
                let controller = GeulGuardInputController(server: nil, delegate: nil, client: nil)!
                XCTAssertTrue(controller.handle(key("r", code: 15), client: client))
                XCTAssertTrue(controller.handle(key("k", code: 40), client: client))
                if changedText {
                    client.string = "나"
                    client.setSelectedRange(NSRange(location: 1, length: 0))
                } else {
                    client.string = "가X"
                    client.setSelectedRange(NSRange(location: 2, length: 0))
                }
                XCTAssertTrue(controller.handle(key("s", code: 1), client: client))
                XCTAssertEqual(client.string, changedText ? "나ㄴ" : "가Xㄴ")
                XCTAssertEqual(client.markedWrites, 0)
            }
        }
    }

    @MainActor
    func testTelegramInlineCommittedAndComposingTailUsesUTF16Ranges() {
        let client = TextClient(bundleID: "ru.keepcoder.Telegram")
        client.string = "😀"
        client.setSelectedRange(NSRange(location: 2, length: 0))
        var inline = TelegramInlineComposition()
        XCTAssertTrue(inline.apply(CompositionUpdate(composing: "가"), to: client))
        XCTAssertEqual(inline.inlineRange, NSRange(location: 2, length: 1))
        XCTAssertTrue(inline.isCurrent(in: client))
        XCTAssertTrue(inline.apply(CompositionUpdate(committed: "가", composing: "나"), to: client))
        XCTAssertEqual(client.string, "😀가나")
        XCTAssertEqual(inline.inlineRange, NSRange(location: 3, length: 1))
        XCTAssertEqual(inline.lastInlineString, "나")
        XCTAssertTrue(inline.isCurrent(in: client))
        XCTAssertTrue(inline.apply(CompositionUpdate(committed: "😀", composing: "다"), to: client))
        XCTAssertEqual(client.string, "😀가😀다")
        XCTAssertEqual(inline.inlineRange, NSRange(location: 5, length: 1))
        XCTAssertEqual(client.markedWrites, 0)
    }

    @MainActor
    func testTelegramInlineStartsByReplacingSelection() {
        let client = TextClient(bundleID: "ru.keepcoder.Telegram")
        client.string = "replace me"
        client.setSelectedRange(NSRange(location: 0, length: 7))
        var inline = TelegramInlineComposition()
        XCTAssertTrue(inline.apply(CompositionUpdate(composing: "가"), to: client))
        XCTAssertEqual(client.string, "가 me")
        XCTAssertEqual(inline.inlineRange, NSRange(location: 0, length: 1))
        XCTAssertTrue(inline.isCurrent(in: client))
        XCTAssertEqual(client.markedWrites, 0)
    }

    @MainActor
    func testTelegramInlineCanValidateWithPlainSubstring() {
        withTelegramInlineSetting(true) {
            let client = TextClient(bundleID: "ru.keepcoder.Telegram")
            client.omitsAttributedSubstring = true
            let controller = GeulGuardInputController(server: nil, delegate: nil, client: nil)!
            XCTAssertTrue(controller.handle(key("r", code: 15), client: client))
            XCTAssertTrue(controller.handle(key("k", code: 40), client: client))
            XCTAssertEqual(client.string, "가")
            XCTAssertEqual(client.markedWrites, 0)
        }
    }

    @MainActor
    func testTelegramInlineCommitTriggersDoNotDuplicateText() {
        withTelegramInlineSetting(true) {
            let boundaries: [(String, UInt16, NSEvent.ModifierFlags)] = [
                ("\r", 36, []), ("\t", 48, []), (" ", 49, []),
                ("\u{f702}", 123, []), ("\u{1b}", 53, []), ("c", 8, .command)
            ]
            for (text, code, modifiers) in boundaries {
                let client = TextClient(bundleID: "ru.keepcoder.Telegram")
                let controller = GeulGuardInputController(server: nil, delegate: nil, client: nil)!
                XCTAssertTrue(controller.handle(key("r", code: 15), client: client))
                XCTAssertTrue(controller.handle(key("k", code: 40), client: client))
                XCTAssertFalse(controller.handle(key(text, code: code, modifiers: modifiers), client: client))
                XCTAssertEqual(client.string, "가")
                controller.commitComposition(client)
                XCTAssertEqual(client.string, "가")
                XCTAssertEqual(client.markedWrites, 0)
            }
            let client = TextClient(bundleID: "ru.keepcoder.Telegram")
            let controller = GeulGuardInputController(server: nil, delegate: nil, client: nil)!
            XCTAssertTrue(controller.handle(key("r", code: 15), client: client))
            XCTAssertTrue(controller.handle(key("k", code: 40), client: client))
            controller.deactivateServer(client)
            XCTAssertEqual(client.string, "가")
            XCTAssertEqual(client.markedWrites, 0)

            let callbackClient = TextClient(bundleID: "ru.keepcoder.Telegram")
            let callbackController = GeulGuardInputController(server: nil, delegate: nil, client: nil)!
            XCTAssertTrue(callbackController.handle(key("r", code: 15), client: callbackClient))
            XCTAssertTrue(callbackController.handle(key("k", code: 40), client: callbackClient))
            callbackController.commitComposition(callbackClient)
            XCTAssertEqual(callbackClient.string, "가")
            XCTAssertEqual(callbackClient.markedWrites, 0)
        }
    }

    @MainActor
    func testTelegramSettingOffAndOtherAppsKeepMarkedText() {
        for (enabled, bundleID) in [(false, "ru.keepcoder.Telegram"), (true, "dev.jureuk.GeulGuardTests")] {
            withTelegramInlineSetting(enabled) {
                let client = TextClient(bundleID: bundleID)
                let controller = GeulGuardInputController(server: nil, delegate: nil, client: nil)!
                XCTAssertTrue(controller.handle(key("r", code: 15), client: client))
                XCTAssertTrue(controller.handle(key("k", code: 40), client: client))
                XCTAssertTrue(client.hasMarkedText)
                XCTAssertGreaterThan(client.markedWrites, 0)
                XCTAssertFalse(controller.handle(key("\r", code: 36), client: client))
                XCTAssertEqual(client.string, "가")
                XCTAssertFalse(client.hasMarkedText)
                XCTAssertEqual(client.insertRanges.last?.location, NSNotFound)
            }
        }
    }

    @MainActor
    func testTurningTelegramInlineOffLeavesExistingTextAndStartsMarkedInput() {
        withTelegramInlineSetting(true) {
            let client = TextClient(bundleID: "ru.keepcoder.Telegram")
            let controller = GeulGuardInputController(server: nil, delegate: nil, client: nil)!
            XCTAssertTrue(controller.handle(key("r", code: 15), client: client))
            XCTAssertTrue(controller.handle(key("k", code: 40), client: client))
            UserDefaults.standard.set(false, forKey: GeulGuardPreferences.telegramInlineCompositionKey)
            XCTAssertTrue(controller.handle(key("s", code: 1), client: client))
            XCTAssertEqual(client.string, "가ㄴ")
            XCTAssertTrue(client.hasMarkedText)
            controller.commitComposition(client)
            XCTAssertEqual(client.string, "가ㄴ")
        }
    }

    @MainActor
    func testTurningTelegramInlineOnFinishesCurrentMarkedSyllable() {
        withTelegramInlineSetting(false) {
            let client = TextClient(bundleID: "ru.keepcoder.Telegram")
            let controller = GeulGuardInputController(server: nil, delegate: nil, client: nil)!
            XCTAssertTrue(controller.handle(key("r", code: 15), client: client))
            UserDefaults.standard.set(true, forKey: GeulGuardPreferences.telegramInlineCompositionKey)
            XCTAssertTrue(controller.handle(key("k", code: 40), client: client))
            XCTAssertEqual(client.string, "가")
            XCTAssertTrue(client.hasMarkedText)
            XCTAssertFalse(controller.handle(key(" ", code: 49), client: client))
            XCTAssertEqual(client.string, "가")
            XCTAssertFalse(client.hasMarkedText)
            XCTAssertTrue(controller.handle(key("s", code: 1), client: client))
            XCTAssertEqual(client.string, "가ㄴ")
            XCTAssertFalse(client.hasMarkedText)
        }
    }

    func testTelegramInlineSettingDefaultsOff() {
        let defaults = UserDefaults.standard
        let key = GeulGuardPreferences.telegramInlineCompositionKey
        let previousValue = defaults.object(forKey: key)
        defer {
            if let previousValue {
                defaults.set(previousValue, forKey: key)
            } else {
                defaults.removeObject(forKey: key)
            }
        }
        defaults.removeObject(forKey: key)
        XCTAssertFalse(GeulGuardPreferences.usesTelegramInlineComposition)
    }

    @MainActor
    private func withTelegramInlineSetting(_ enabled: Bool, body: () -> Void) {
        let defaults = UserDefaults.standard
        let key = GeulGuardPreferences.telegramInlineCompositionKey
        let previousValue = defaults.object(forKey: key)
        defer {
            if let previousValue {
                defaults.set(previousValue, forKey: key)
            } else {
                defaults.removeObject(forKey: key)
            }
        }
        defaults.set(enabled, forKey: key)
        body()
    }

    @MainActor
    private func key(_ text: String, code: UInt16, modifiers: NSEvent.ModifierFlags = [], repeatKey: Bool = false) -> NSEvent {
        NSEvent.keyEvent(with: .keyDown, location: .zero, modifierFlags: modifiers, timestamp: 0,
                        windowNumber: 0, context: nil, characters: text,
                        charactersIgnoringModifiers: text, isARepeat: repeatKey, keyCode: code)!
    }
}

@MainActor
private final class TextClient: NSObject, @preconcurrency IMKTextInput {
    var markedWrites = 0
    var insertRanges: [NSRange] = []
    var omitsAttributedSubstring = false
    let bundleID: String
    private let view = NSTextView()
    init(bundleID: String = "dev.jureuk.GeulGuardTests") {
        self.bundleID = bundleID
    }
    var string: String {
        get { view.string }
        set { view.string = newValue }
    }
    func setSelectedRange(_ range: NSRange) { view.setSelectedRange(range) }
    func selectedRange() -> NSRange { view.selectedRange() }
    func markedRange() -> NSRange { view.markedRange() }
    var hasMarkedText: Bool { view.hasMarkedText() }
    func insertText(_ string: Any!, replacementRange: NSRange) {
        insertRanges.append(replacementRange)
        view.insertText(string, replacementRange: replacementRange)
    }
    func setMarkedText(_ string: Any!, selectionRange: NSRange, replacementRange: NSRange) {
        markedWrites += 1
        view.setMarkedText(string, selectedRange: selectionRange, replacementRange: replacementRange)
    }
    func attributedSubstring(from range: NSRange) -> NSAttributedString! {
        omitsAttributedSubstring ? nil : view.textStorage?.attributedSubstring(from: range)
    }
    func validAttributesForMarkedText() -> [Any]! { [NSAttributedString.Key.underlineStyle] }
    func firstRect(forCharacterRange range: NSRange, actualRange: NSRangePointer!) -> NSRect {
        view.firstRect(forCharacterRange: range, actualRange: actualRange)
    }
    func length() -> Int { (string as NSString).length }
    func characterIndex(for point: NSPoint, tracking mappingMode: IMKLocationToOffsetMappingMode, inMarkedRange: UnsafeMutablePointer<ObjCBool>!) -> Int { NSNotFound }
    func attributes(forCharacterIndex index: Int, lineHeightRectangle: UnsafeMutablePointer<NSRect>!) -> [AnyHashable: Any]! { [:] }
    func overrideKeyboard(withKeyboardNamed name: String!) {}
    func selectMode(_ identifier: String!) {}
    func supportsUnicode() -> Bool { true }
    func bundleIdentifier() -> String! { bundleID }
    func windowLevel() -> CGWindowLevel { 0 }
    func supportsProperty(_ property: TSMDocumentPropertyTag) -> Bool { false }
    func uniqueClientIdentifierString() -> String! { "GeulGuardTests" }
    func string(from range: NSRange, actualRange: NSRangePointer!) -> String! {
        actualRange?.pointee = range
        return (string as NSString).substring(with: range)
    }
}

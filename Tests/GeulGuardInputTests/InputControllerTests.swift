import AppKit
import InputMethodKit
import XCTest
@testable import GeulGuardInput

final class InputControllerTests: XCTestCase {
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
    private func key(_ text: String, code: UInt16, modifiers: NSEvent.ModifierFlags = [], repeatKey: Bool = false) -> NSEvent {
        NSEvent.keyEvent(with: .keyDown, location: .zero, modifierFlags: modifiers, timestamp: 0,
                        windowNumber: 0, context: nil, characters: text,
                        charactersIgnoringModifiers: text, isARepeat: repeatKey, keyCode: code)!
    }
}

@MainActor
private final class TextClient: NSObject, @preconcurrency IMKTextInput {
    var markedWrites = 0
    private let view = NSTextView()
    var string: String {
        get { view.string }
        set { view.string = newValue }
    }
    func setSelectedRange(_ range: NSRange) { view.setSelectedRange(range) }
    func selectedRange() -> NSRange { view.selectedRange() }
    func markedRange() -> NSRange { view.markedRange() }
    var hasMarkedText: Bool { view.hasMarkedText() }
    func insertText(_ string: Any!, replacementRange: NSRange) {
        view.insertText(string, replacementRange: replacementRange)
    }
    func setMarkedText(_ string: Any!, selectionRange: NSRange, replacementRange: NSRange) {
        markedWrites += 1
        view.setMarkedText(string, selectedRange: selectionRange, replacementRange: replacementRange)
    }
    func attributedSubstring(from range: NSRange) -> NSAttributedString! { view.textStorage?.attributedSubstring(from: range) }
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
    func bundleIdentifier() -> String! { "dev.jureuk.GeulGuardTests" }
    func windowLevel() -> CGWindowLevel { 0 }
    func supportsProperty(_ property: TSMDocumentPropertyTag) -> Bool { false }
    func uniqueClientIdentifierString() -> String! { "GeulGuardTests" }
    func string(from range: NSRange, actualRange: NSRangePointer!) -> String! {
        actualRange?.pointee = range
        return (string as NSString).substring(with: range)
    }
}

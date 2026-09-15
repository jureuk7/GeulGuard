import AppKit
import Carbon

@MainActor
final class UpdateLogoutPrompt {
    private static let pendingVersionKey = "updatePendingLogoutVersion"
    private let defaults: UserDefaults
    private let requestLogout: @MainActor () throws -> Void

    init(defaults: UserDefaults = .standard,
         requestLogout: @escaping @MainActor () throws -> Void = UpdateLogoutPrompt.requestSystemLogout) {
        self.defaults = defaults
        self.requestLogout = requestLogout
    }

    func recordInstallation(version: String) {
        defaults.set(version, forKey: Self.pendingVersionKey)
    }

    func cancelInstallation() {
        defaults.removeObject(forKey: Self.pendingVersionKey)
    }

    func consumeInstalledUpdate(currentVersion: String) -> Bool {
        guard let expected = defaults.string(forKey: Self.pendingVersionKey) else { return false }
        cancelInstallation()
        return expected == currentVersion
    }

    func present() {
        NSApp.activate(ignoringOtherApps: true)
        handleChoice(Self.makeAlert().runModal())
    }

    static func makeAlert() -> NSAlert {
        let alert = NSAlert()
        alert.messageText = "글가드 업데이트가 설치되었습니다"
        alert.informativeText = "새 버전이 바로 적용되지 않았다면 로그아웃한 뒤 다시 로그인해 주세요. 지금 로그아웃하려면 다른 앱에서 작업 중인 내용을 먼저 저장하세요."
        alert.addButton(withTitle: "나중에")
        alert.addButton(withTitle: "지금 로그아웃")
        alert.buttons[0].keyEquivalent = "\r"
        alert.buttons[1].keyEquivalent = ""
        return alert
    }

    func handleChoice(_ choice: NSApplication.ModalResponse) {
        guard choice == .alertSecondButtonReturn else { return }
        do {
            try requestLogout()
        } catch {
            let alert = NSAlert()
            alert.messageText = "로그아웃을 요청하지 못했습니다"
            alert.informativeText = "작업을 저장한 뒤 Apple 메뉴에서 로그아웃을 선택해 주세요."
            alert.addButton(withTitle: "확인")
            alert.runModal()
        }
    }

    static func logoutEvent() -> NSAppleEventDescriptor {
        NSAppleEventDescriptor(eventClass: AEEventClass(kCoreEventClass),
                               eventID: AEEventID(kAELogOut),
                               targetDescriptor: NSAppleEventDescriptor(bundleIdentifier: "com.apple.loginwindow"),
                               returnID: AEReturnID(kAutoGenerateReturnID),
                               transactionID: AETransactionID(kAnyTransactionID))
    }

    private static func requestSystemLogout() throws {
        _ = try logoutEvent().sendEvent(options: [.noReply, .canInteract], timeout: 10)
    }
}

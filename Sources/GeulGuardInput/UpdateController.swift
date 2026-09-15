import AppKit
import Carbon
import Combine
import Sparkle

struct UpdateConfiguration {
    static func isValid(_ info: [String: Any]) -> Bool {
        guard let address = info["SUFeedURL"] as? String,
              let url = URL(string: address), url.scheme == "https",
              let host = url.host, !host.isEmpty,
              url.user == nil, url.password == nil,
              let key = info["SUPublicEDKey"] as? String,
              Data(base64Encoded: key)?.count == 32 else { return false }
        return true
    }

    static func isOfficialPackage(_ url: URL?) -> Bool {
        guard let url, url.scheme == "https", url.host == "github.com",
              url.user == nil, url.password == nil, url.port == nil,
              url.query == nil, url.fragment == nil else { return false }
        let parts = url.pathComponents
        return parts.count == 7 && parts[1...4] == ["jureuk7", "GeulGuard", "releases", "download"]
            && !parts[5].isEmpty && parts[6] == "GeulGuard.pkg"
    }

    static func canTerminateForUpdate(sourceID: String?, hasComposition: Bool) -> Bool {
        sourceID == "com.apple.keylayout.ABC" && !hasComposition
    }
}

@MainActor
final class UpdateController: NSObject, ObservableObject, SPUUpdaterDelegate {
    @Published private(set) var isAvailable = false
    @Published private(set) var canCheckForUpdates = false
    @Published private(set) var checksOnLaunch = GeulGuardPreferences.checksForUpdatesOnLaunch
    @Published private(set) var status = "이 빌드에서는 업데이트를 사용할 수 없습니다."
    private var controller: SPUStandardUpdaterController?
    private var observations: [NSKeyValueObservation] = []
    private(set) var isInstallingUpdate = false

    override init() {
        super.init()
        guard UpdateConfiguration.isValid(Bundle.main.infoDictionary ?? [:]) else { return }
        let controller = SPUStandardUpdaterController(startingUpdater: false, updaterDelegate: self, userDriverDelegate: nil)
        self.controller = controller
        controller.updater.automaticallyChecksForUpdates = false
        controller.updater.automaticallyDownloadsUpdates = false
        controller.updater.sendsSystemProfile = false
        do {
            try controller.updater.start()
            isAvailable = true
            status = "설치 시 관리자 인증이 필요하며, 로그아웃 후 다시 로그인해야 할 수 있습니다."
            observations = [
                controller.updater.observe(\.canCheckForUpdates, options: [.initial, .new]) { [weak self] _, _ in
                    Task { @MainActor [weak self] in self?.refreshState() }
                }
            ]
            refreshState()
            if checksOnLaunch {
                controller.updater.checkForUpdatesInBackground()
            }
        } catch {
            status = "업데이트를 시작하지 못했습니다. 공식 배포본을 다시 설치해 주세요."
        }
    }

    private func refreshState() {
        canCheckForUpdates = controller?.updater.canCheckForUpdates ?? false
    }

    func setChecksOnLaunch(_ enabled: Bool) {
        guard isAvailable else { return }
        UserDefaults.standard.set(enabled, forKey: GeulGuardPreferences.checkForUpdatesOnLaunchKey)
        checksOnLaunch = enabled
    }

    @objc func checkForUpdates() {
        guard isAvailable, controller?.updater.canCheckForUpdates == true else { return }
        controller?.checkForUpdates(nil)
    }

    func updater(_ updater: SPUUpdater, shouldProceedWithUpdate updateItem: SUAppcastItem,
                 updateCheck: SPUUpdateCheck) throws {
        guard updateItem.installationType == "package",
              UpdateConfiguration.isOfficialPackage(updateItem.fileURL) else {
            throw NSError(domain: "dev.jureuk.GeulGuard.Update", code: 1,
                          userInfo: [NSLocalizedDescriptionKey: "공식 글가드 PKG 업데이트가 아닙니다."])
        }
    }

    func allowedSystemProfileKeys(for updater: SPUUpdater) -> [String]? { [] }

    func updater(_ updater: SPUUpdater, willInstallUpdate item: SUAppcastItem) {
        isInstallingUpdate = true
    }

    func updater(_ updater: SPUUpdater, willInstallUpdateOnQuit item: SUAppcastItem,
                 immediateInstallationBlock immediateInstallHandler: @escaping () -> Void) -> Bool {
        isInstallingUpdate = true
        return false
    }

    func updater(_ updater: SPUUpdater, userDidMake choice: SPUUserUpdateChoice,
                 forUpdate updateItem: SUAppcastItem, state: SPUUserUpdateState) {
        if state.stage == .installing {
            isInstallingUpdate = true
        }
    }

    func updater(_ updater: SPUUpdater, didAbortWithError error: Error) {
        isInstallingUpdate = false
    }

    func confirmTermination() -> NSApplication.TerminateReply {
        guard isInstallingUpdate else { return .terminateNow }
        let alert = NSAlert()
        alert.messageText = "글가드 업데이트를 설치할까요?"
        alert.informativeText = "입력 중인 글자를 확정하고 메뉴 막대에서 ABC로 전환해 주세요. 설치 후 글가드를 다시 선택하세요. 반영되지 않으면 작업을 저장한 뒤 로그아웃하고 다시 로그인해 주세요."
        alert.addButton(withTitle: "설치 계속")
        alert.addButton(withTitle: "취소")
        guard alert.runModal() == .alertFirstButtonReturn else { return .terminateCancel }
        guard UpdateConfiguration.canTerminateForUpdate(
            sourceID: Self.currentInputSourceID,
            hasComposition: GeulGuardInputController.hasPendingComposition
        ) else {
            let blocked = NSAlert()
            blocked.messageText = "ABC로 전환한 뒤 다시 시도해 주세요"
            blocked.informativeText = "조합 중인 글자가 남아 있거나 현재 입력 소스가 ABC가 아닙니다. 업데이트 창에서 설치를 다시 시도할 수 있습니다."
            blocked.addButton(withTitle: "확인")
            blocked.runModal()
            return .terminateCancel
        }
        return .terminateNow
    }

    private static var currentInputSourceID: String? {
        guard let source = TISCopyCurrentKeyboardInputSource()?.takeRetainedValue(),
              let value = TISGetInputSourceProperty(source, kTISPropertyInputSourceID) else { return nil }
        return Unmanaged<CFString>.fromOpaque(value).takeUnretainedValue() as String
    }
}

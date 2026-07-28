import AppKit
import SwiftUI

@MainActor
final class AppDelegate: NSObject, NSApplicationDelegate {
    private var statusItem: NSStatusItem?
    private var settingsWindow: NSWindow?
    private var modeObserver: NSObjectProtocol?

    func applicationDidFinishLaunching(_ notification: Notification) {
        configureStatusItem()
        modeObserver = NotificationCenter.default.addObserver(
            forName: .geulGuardModeDidChange,
            object: nil,
            queue: .main
        ) { [weak self] _ in
            Task { @MainActor in
                self?.refreshStatusTitle()
            }
        }

        if ProcessInfo.processInfo.arguments.contains("--settings") {
            showSettings()
        }
    }

    func applicationWillTerminate(_ notification: Notification) {
        if let modeObserver {
            NotificationCenter.default.removeObserver(modeObserver)
        }
    }

    @objc private func showSettings() {
        if settingsWindow == nil {
            let rootView = SettingsView()
            let window = NSWindow(contentViewController: NSHostingController(rootView: rootView))
            window.title = "글가드 설정"
            window.setContentSize(NSSize(width: 520, height: 460))
            window.styleMask = [.titled, .closable, .miniaturizable]
            window.isReleasedWhenClosed = false
            settingsWindow = window
        }

        NSApp.activate(ignoringOtherApps: true)
        settingsWindow?.center()
        settingsWindow?.makeKeyAndOrderFront(nil)
    }

    @objc private func toggleMode() {
        InputModeStore.shared.toggle()
    }

    @objc private func quit() {
        NSApp.terminate(nil)
    }

    private func configureStatusItem() {
        let item = NSStatusBar.system.statusItem(withLength: NSStatusItem.squareLength)
        item.button?.toolTip = "글가드 입력 모드"

        let menu = NSMenu()
        menu.addItem(withTitle: "한/A 전환 (⇧Space)", action: #selector(toggleMode), keyEquivalent: "")
        menu.addItem(withTitle: "설정…", action: #selector(showSettings), keyEquivalent: ",")
        menu.addItem(.separator())
        menu.addItem(withTitle: "글가드 종료", action: #selector(quit), keyEquivalent: "q")
        item.menu = menu
        statusItem = item
        refreshStatusTitle()
    }

    private func refreshStatusTitle() {
        statusItem?.button?.title = InputModeStore.shared.mode.indicator
    }
}

private struct SettingsView: View {
    var body: some View {
        VStack(alignment: .leading, spacing: 22) {
            HStack(spacing: 14) {
                Image(systemName: "character.cursor.ibeam")
                    .font(.system(size: 42))
                    .foregroundStyle(.blue)
                VStack(alignment: .leading, spacing: 4) {
                    Text("글가드")
                        .font(.largeTitle.bold())
                    Text("조합 중인 마지막 글자를 잃지 않는 두벌식 입력기")
                        .foregroundStyle(.secondary)
                }
            }

            Divider()

            feature("⇧Space", "입력 소스를 바꾸지 않고 한/영 모드를 즉시 전환합니다.")
            feature("커서 이동 안전", "방향키·Tab·Return·단축키 전에 조합 문자를 먼저 확정합니다.")
            feature("ESC 안전", "조합을 확정한 뒤 영문 모드로 바꿔 Vim과 터미널 입력을 보호합니다.")
            feature("개인정보 보호", "네트워크 연결, 키 입력 저장, 접근성 권한이 없습니다.")

            Spacer()

            Text("시스템 설정 → 키보드 → 텍스트 입력 → 편집에서 ‘글가드’를 추가한 뒤 선택하세요.")
                .font(.callout)
                .foregroundStyle(.secondary)
                .fixedSize(horizontal: false, vertical: true)
        }
        .padding(28)
        .frame(minWidth: 520, minHeight: 460)
    }

    private func feature(_ title: String, _ description: String) -> some View {
        HStack(alignment: .firstTextBaseline, spacing: 14) {
            Text(title)
                .font(.headline.monospaced())
                .frame(width: 92, alignment: .leading)
            Text(description)
                .fixedSize(horizontal: false, vertical: true)
        }
    }
}

import AppKit
import SwiftUI

@MainActor
final class AppDelegate: NSObject, NSApplicationDelegate {
    private var statusItem: NSStatusItem?
    private var settingsWindow: NSWindow?

    func applicationDidFinishLaunching(_ notification: Notification) {
        configureStatusItem()
        if ProcessInfo.processInfo.arguments.contains("--settings") {
            showSettings()
        }
    }

    @objc private func showSettings() {
        if settingsWindow == nil {
            let rootView = SettingsView()
            let window = NSWindow(contentViewController: NSHostingController(rootView: rootView))
            window.title = "글가드 설정"
            window.setContentSize(NSSize(width: 520, height: 540))
            window.styleMask = [.titled, .closable, .miniaturizable]
            window.isReleasedWhenClosed = false
            settingsWindow = window
        }

        NSApp.activate(ignoringOtherApps: true)
        settingsWindow?.center()
        settingsWindow?.makeKeyAndOrderFront(nil)
    }

    @objc private func quit() {
        NSApp.terminate(nil)
    }

    private func configureStatusItem() {
        let item = NSStatusBar.system.statusItem(withLength: NSStatusItem.variableLength)
        item.button?.toolTip = "글가드 · 한글 입력기"
        if let imageURL = Bundle.main.url(forResource: "GeulGuardMenu", withExtension: "tiff"),
            let image = NSImage(contentsOf: imageURL)
        {
            image.isTemplate = true
            image.size = NSSize(width: 22, height: 16)
            item.button?.image = image
            item.button?.imagePosition = .imageOnly
        }

        let menu = NSMenu()
        menu.addItem(withTitle: "설정…", action: #selector(showSettings), keyEquivalent: ",")
        menu.addItem(.separator())
        menu.addItem(withTitle: "글가드 종료", action: #selector(quit), keyEquivalent: "q")
        item.menu = menu
        statusItem = item
    }
}

private struct SettingsView: View {
    @AppStorage(GeulGuardPreferences.combineRepeatedInitialsKey)
    private var combineRepeatedInitials = true

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

            feature("한/영 전환", "macOS 입력 메뉴나 시스템 단축키로 ABC ↔ 글가드를 전환합니다.")
            feature("커서 이동 안전", "방향키·Tab·Return·단축키 전에 조합 문자를 먼저 확정합니다.")
            feature("ESC 확정", "조합 중인 한글만 확정합니다. 영어는 ABC 입력 소스를 사용하세요.")
            feature("개인정보 보호", "네트워크 연결, 키 입력 저장, 접근성 권한이 없습니다.")

            Divider()

            VStack(alignment: .leading, spacing: 6) {
                Toggle("연속 자음을 쌍자음으로 조합", isOn: $combineRepeatedInitials)
                    .font(.headline)
                Text(combineRepeatedInitials ? "ㄱㄱ을 ㄲ으로 조합합니다." : "ㄱㄱ을 각각 입력합니다.")
                    .font(.callout)
                    .foregroundStyle(.secondary)
            }

            Spacer()

            Text("시스템 설정 → 키보드 → 텍스트 입력 → 편집에서 ‘ABC’와 ‘글가드 두벌식’을 추가하세요.")
                .font(.callout)
                .foregroundStyle(.secondary)
                .fixedSize(horizontal: false, vertical: true)
        }
        .padding(28)
        .frame(minWidth: 520, minHeight: 540)
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

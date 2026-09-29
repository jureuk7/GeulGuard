import Testing
@testable import GeulGuardInput

struct TelegramInlinePolicyTests {
    @Test func onlyEnabledTelegramUsesInlineComposition() {
        #expect(TelegramInlinePolicy.isEnabled(
            bundleIdentifier: "ru.keepcoder.Telegram", settingEnabled: true
        ))
        #expect(!TelegramInlinePolicy.isEnabled(
            bundleIdentifier: "ru.keepcoder.Telegram", settingEnabled: false
        ))
        #expect(!TelegramInlinePolicy.isEnabled(
            bundleIdentifier: "org.telegram.desktop", settingEnabled: true
        ))
        #expect(!TelegramInlinePolicy.isEnabled(bundleIdentifier: nil, settingEnabled: true))
    }
}

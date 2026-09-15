import XCTest
import Carbon
@testable import GeulGuardInput

@MainActor
final class UpdateLogoutPromptTests: XCTestCase {
    func testPromptRequiresMatchingInstalledVersionAndIsConsumedOnce() {
        let name = "GeulGuard.LogoutTest.\(UUID().uuidString)"
        let defaults = UserDefaults(suiteName: name)!
        defer { defaults.removePersistentDomain(forName: name) }
        let prompt = UpdateLogoutPrompt(defaults: defaults, requestLogout: {})
        XCTAssertFalse(prompt.consumeInstalledUpdate(currentVersion: "7"))
        prompt.recordInstallation(version: "8")
        XCTAssertFalse(prompt.consumeInstalledUpdate(currentVersion: "7"))
        prompt.recordInstallation(version: "8")
        XCTAssertTrue(prompt.consumeInstalledUpdate(currentVersion: "8"))
        XCTAssertFalse(prompt.consumeInstalledUpdate(currentVersion: "8"))
        prompt.recordInstallation(version: "9")
        prompt.cancelInstallation()
        XCTAssertFalse(prompt.consumeInstalledUpdate(currentVersion: "9"))
    }

    func testOnlyExplicitLogoutChoiceRequestsLogout() {
        var requests = 0
        let prompt = UpdateLogoutPrompt(requestLogout: { requests += 1 })
        prompt.handleChoice(.alertFirstButtonReturn)
        prompt.handleChoice(.abort)
        XCTAssertEqual(requests, 0)
        prompt.handleChoice(.alertSecondButtonReturn)
        XCTAssertEqual(requests, 1)
        XCTAssertEqual(UpdateLogoutPrompt.logoutEvent().eventID, AEEventID(kAELogOut))
    }
}

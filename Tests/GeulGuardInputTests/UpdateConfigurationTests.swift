import XCTest
@testable import GeulGuardInput

final class UpdateConfigurationTests: XCTestCase {
    private let publicKey = Data(repeating: 1, count: 32).base64EncodedString()

    func testLaunchChecksDefaultOnAndRespectOptOut() {
        let defaults = UserDefaults.standard
        let key = GeulGuardPreferences.checkForUpdatesOnLaunchKey
        let previous = defaults.object(forKey: key)
        defer {
            if let previous { defaults.set(previous, forKey: key) }
            else { defaults.removeObject(forKey: key) }
        }
        defaults.removeObject(forKey: key)
        XCTAssertTrue(GeulGuardPreferences.checksForUpdatesOnLaunch)
        defaults.set(false, forKey: key)
        XCTAssertFalse(GeulGuardPreferences.checksForUpdatesOnLaunch)
        defaults.set(true, forKey: key)
        XCTAssertTrue(GeulGuardPreferences.checksForUpdatesOnLaunch)
    }

    func testUpdatesRequireHTTPSAndACompletePublicKey() {
        XCTAssertFalse(UpdateConfiguration.isValid([:]))
        for address in ["http://example.com/appcast.xml", "file:///tmp/feed", "https://user:pass@example.com/feed"] {
            XCTAssertFalse(UpdateConfiguration.isValid(["SUFeedURL": address, "SUPublicEDKey": publicKey]))
        }
        XCTAssertFalse(UpdateConfiguration.isValid(["SUFeedURL": "https://example.com/feed", "SUPublicEDKey": "placeholder"]))
        XCTAssertTrue(UpdateConfiguration.isValid(["SUFeedURL": "https://example.com/feed", "SUPublicEDKey": publicKey]))
    }

    func testOnlyOfficialVersionedPackagesAreAccepted() {
        XCTAssertTrue(UpdateConfiguration.isOfficialPackage(URL(string: "https://github.com/jureuk7/GeulGuard/releases/download/v0.6.0/GeulGuard.pkg")))
        for address in [
            "http://github.com/jureuk7/GeulGuard/releases/download/v0.6.0/GeulGuard.pkg",
            "https://github.com/attacker/GeulGuard/releases/download/v0.6.0/GeulGuard.pkg",
            "https://github.com/jureuk7/GeulGuard/releases/latest/download/GeulGuard.pkg",
            "https://github.com/jureuk7/GeulGuard/releases/download/v0.6.0/GeulGuard.zip",
            "https://github.com/jureuk7/GeulGuard/releases/download/v0.6.0/GeulGuard.pkg?redirect=1",
            "https://github.com:443/jureuk7/GeulGuard/releases/download/v0.6.0/GeulGuard.pkg"
        ] {
            XCTAssertFalse(UpdateConfiguration.isOfficialPackage(URL(string: address)), address)
        }
        XCTAssertFalse(UpdateConfiguration.isOfficialPackage(nil))
    }

    func testUnknownOrHangulSourceAndPendingTextBlockTermination() {
        XCTAssertTrue(UpdateConfiguration.canTerminateForUpdate(sourceID: "com.apple.keylayout.ABC", hasComposition: false))
        XCTAssertFalse(UpdateConfiguration.canTerminateForUpdate(sourceID: "com.apple.keylayout.ABC", hasComposition: true))
        XCTAssertFalse(UpdateConfiguration.canTerminateForUpdate(sourceID: nil, hasComposition: false))
        XCTAssertFalse(UpdateConfiguration.canTerminateForUpdate(sourceID: "dev.jureuk.inputmethod.GeulGuard", hasComposition: false))
    }
}

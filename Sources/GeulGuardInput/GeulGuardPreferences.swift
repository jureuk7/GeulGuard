import Foundation

enum GeulGuardPreferences {
    static let checkForUpdatesOnLaunchKey = "checkForUpdatesOnLaunch"

    static var checksForUpdatesOnLaunch: Bool {
        UserDefaults.standard.object(forKey: checkForUpdatesOnLaunchKey) as? Bool ?? true
    }

    static let combineRepeatedInitialsKey = "combineRepeatedInitials"

    static var combinesRepeatedInitials: Bool {
        UserDefaults.standard.object(forKey: combineRepeatedInitialsKey) as? Bool ?? true
    }
}

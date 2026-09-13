import Foundation

enum GeulGuardPreferences {
    static let combineRepeatedInitialsKey = "combineRepeatedInitials"

    static var combinesRepeatedInitials: Bool {
        UserDefaults.standard.object(forKey: combineRepeatedInitialsKey) as? Bool ?? true
    }
}

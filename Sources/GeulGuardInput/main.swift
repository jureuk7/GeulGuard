import AppKit
import InputMethodKit

let application = NSApplication.shared
let delegate = AppDelegate()
application.delegate = delegate
application.setActivationPolicy(.accessory)

let connectionName = Bundle.main.object(forInfoDictionaryKey: "InputMethodConnectionName") as? String
    ?? "dev.jureuk.inputmethod.GeulGuard_Connection"
let server = IMKServer(
    name: connectionName,
    bundleIdentifier: Bundle.main.bundleIdentifier ?? "dev.jureuk.inputmethod.GeulGuard"
)

withExtendedLifetime(server) {
    application.run()
}

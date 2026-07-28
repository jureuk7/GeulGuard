import Foundation

@MainActor
final class InputModeStore {
    static let shared = InputModeStore()

    enum Mode: String {
        case korean
        case english

        var indicator: String {
            self == .korean ? "한" : "A"
        }
    }

    private(set) var mode: Mode = .korean {
        didSet {
            NotificationCenter.default.post(name: .geulGuardModeDidChange, object: mode)
        }
    }

    private init() {}

    func toggle() {
        mode = mode == .korean ? .english : .korean
    }

    func switchToEnglish() {
        mode = .english
    }
}

extension Notification.Name {
    static let geulGuardModeDidChange = Notification.Name("GeulGuardModeDidChange")
}

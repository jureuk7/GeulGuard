import Foundation

public struct CompositionUpdate: Equatable, Sendable {
    public let committed: String
    public let composing: String

    public init(committed: String = "", composing: String = "") {
        self.committed = committed
        self.composing = composing
    }
}

/// A deterministic Korean two-set (두벌식) composition engine.
///
/// The engine deliberately separates committed text from marked (preedit) text.
/// InputMethodKit clients must receive those two streams in that order or a
/// focus/navigation event can cancel the last visible Hangul syllable.
public struct HangulComposer: Sendable {
    private var initial: Int?
    private var medial: Int?
    private var final: Int?

    public init() {}

    public var composingText: String {
        render(initial: initial, medial: medial, final: final)
    }

    public var hasComposition: Bool {
        initial != nil || medial != nil
    }

    public mutating func input(_ character: Character) -> CompositionUpdate? {
        if let vowel = Self.vowels[character] {
            return inputVowel(vowel)
        }
        if let consonant = Self.initials[character] {
            return inputConsonant(consonant)
        }
        return nil
    }

    public mutating func backspace() -> CompositionUpdate? {
        guard hasComposition else { return nil }

        if let final {
            self.final = Self.splitFinals[final]?.0
        } else if let medial {
            self.medial = Self.splitMedials[medial]?.0
        } else if let initial {
            self.initial = Self.splitInitials[initial] ?? nil
        }

        return CompositionUpdate(composing: composingText)
    }

    public mutating func commit() -> String {
        let text = composingText
        reset()
        return text
    }

    public mutating func cancel() {
        reset()
    }

    private mutating func inputConsonant(_ consonant: Int) -> CompositionUpdate {
        guard let currentInitial = initial else {
            if medial != nil {
                let committed = composingText
                medial = nil
                initial = consonant
                return CompositionUpdate(committed: committed, composing: composingText)
            }
            initial = consonant
            return CompositionUpdate(composing: composingText)
        }

        guard medial != nil else {
            if let doubled = Self.combinedInitials[Pair(currentInitial, consonant)] {
                initial = doubled
                return CompositionUpdate(composing: composingText)
            }

            let committed = composingText
            initial = consonant
            return CompositionUpdate(committed: committed, composing: composingText)
        }

        guard let currentFinal = final else {
            if let simpleFinal = Self.initialToFinal[consonant] {
                final = simpleFinal
                return CompositionUpdate(composing: composingText)
            }

            let committed = composingText
            initial = consonant
            medial = nil
            return CompositionUpdate(committed: committed, composing: composingText)
        }

        if let nextFinal = Self.combinedFinals[Pair(currentFinal, consonant)] {
            final = nextFinal
            return CompositionUpdate(composing: composingText)
        }

        let committed = composingText
        initial = consonant
        medial = nil
        final = nil
        return CompositionUpdate(committed: committed, composing: composingText)
    }

    private mutating func inputVowel(_ vowel: Int) -> CompositionUpdate {
        guard initial != nil else {
            if let currentMedial = medial,
               let combined = Self.combinedMedials[Pair(currentMedial, vowel)] {
                medial = combined
            } else if medial != nil {
                let committed = composingText
                medial = vowel
                return CompositionUpdate(committed: committed, composing: composingText)
            } else {
                medial = vowel
            }
            return CompositionUpdate(composing: composingText)
        }

        guard let currentMedial = medial else {
            medial = vowel
            return CompositionUpdate(composing: composingText)
        }

        guard let currentFinal = final else {
            if let combined = Self.combinedMedials[Pair(currentMedial, vowel)] {
                medial = combined
                return CompositionUpdate(composing: composingText)
            }

            let committed = composingText
            initial = nil
            medial = vowel
            return CompositionUpdate(committed: committed, composing: composingText)
        }

        let priorInitial = initial
        if let split = Self.splitFinals[currentFinal] {
            final = split.0
            let committed = render(initial: priorInitial, medial: currentMedial, final: final)
            initial = split.1
            medial = vowel
            final = nil
            return CompositionUpdate(committed: committed, composing: composingText)
        }

        let committed = render(initial: priorInitial, medial: currentMedial, final: nil)
        initial = Self.finalToInitial[currentFinal]
        medial = vowel
        final = nil
        return CompositionUpdate(committed: committed, composing: composingText)
    }

    private mutating func reset() {
        initial = nil
        medial = nil
        final = nil
    }

    private func render(initial: Int?, medial: Int?, final: Int?) -> String {
        if let initial, let medial {
            let scalar = 0xAC00 + ((initial * 21) + medial) * 28 + (final ?? 0)
            return UnicodeScalar(scalar).map(String.init) ?? ""
        }
        if let initial {
            return Self.compatibilityInitials[initial]
        }
        if let medial {
            return Self.compatibilityMedials[medial]
        }
        return ""
    }
}

private extension HangulComposer {
    struct Pair: Hashable, Sendable {
        let first: Int
        let second: Int

        init(_ first: Int, _ second: Int) {
            self.first = first
            self.second = second
        }
    }

    // Uppercase aliases cover “Shift still held after ㄲ/ㄸ/ㅃ/ㅆ/ㅉ”.
    // Shift-significant keys (QWERTO P) keep distinct uppercase mappings.
    static let initials: [Character: Int] = [
        "r": 0, "R": 1, "s": 2, "S": 2, "e": 3, "E": 4, "f": 5, "F": 5,
        "a": 6, "A": 6, "q": 7, "Q": 8, "t": 9, "T": 10, "d": 11, "D": 11,
        "w": 12, "W": 13, "c": 14, "C": 14, "z": 15, "Z": 15,
        "x": 16, "X": 16, "v": 17, "V": 17, "g": 18, "G": 18
    ]

    static let vowels: [Character: Int] = [
        "k": 0, "K": 0, "o": 1, "i": 2, "I": 2, "O": 3, "j": 4, "J": 4,
        "p": 5, "u": 6, "U": 6, "P": 7, "h": 8, "H": 8,
        "y": 12, "Y": 12, "n": 13, "N": 13, "b": 17, "B": 17,
        "m": 18, "M": 18, "l": 20, "L": 20
    ]

    static let compatibilityInitials = [
        "ㄱ", "ㄲ", "ㄴ", "ㄷ", "ㄸ", "ㄹ", "ㅁ", "ㅂ", "ㅃ", "ㅅ",
        "ㅆ", "ㅇ", "ㅈ", "ㅉ", "ㅊ", "ㅋ", "ㅌ", "ㅍ", "ㅎ"
    ]

    static let compatibilityMedials = [
        "ㅏ", "ㅐ", "ㅑ", "ㅒ", "ㅓ", "ㅔ", "ㅕ", "ㅖ", "ㅗ", "ㅘ", "ㅙ",
        "ㅚ", "ㅛ", "ㅜ", "ㅝ", "ㅞ", "ㅟ", "ㅠ", "ㅡ", "ㅢ", "ㅣ"
    ]

    static let initialToFinal: [Int: Int] = [
        0: 1, 1: 2, 2: 4, 3: 7, 5: 8, 6: 16, 7: 17, 9: 19,
        10: 20, 11: 21, 12: 22, 14: 23, 15: 24, 16: 25, 17: 26, 18: 27
    ]

    static let finalToInitial = Dictionary(uniqueKeysWithValues: initialToFinal.map { ($1, $0) })

    static let combinedInitials: [Pair: Int] = [
        Pair(0, 0): 1, Pair(3, 3): 4, Pair(7, 7): 8,
        Pair(9, 9): 10, Pair(12, 12): 13
    ]

    static let splitInitials: [Int: Int] = [
        1: 0, 4: 3, 8: 7, 10: 9, 13: 12
    ]

    static let combinedMedials: [Pair: Int] = [
        Pair(8, 0): 9, Pair(8, 1): 10, Pair(8, 20): 11,
        Pair(13, 4): 14, Pair(13, 5): 15, Pair(13, 20): 16,
        Pair(18, 20): 19
    ]

    static let splitMedials: [Int: (Int, Int)] = [
        9: (8, 0), 10: (8, 1), 11: (8, 20),
        14: (13, 4), 15: (13, 5), 16: (13, 20), 19: (18, 20)
    ]

    /// The second value is an initial index so it can begin the next syllable.
    static let combinedFinals: [Pair: Int] = [
        Pair(1, 0): 2, Pair(1, 9): 3,
        Pair(4, 12): 5, Pair(4, 18): 6,
        Pair(8, 0): 9, Pair(8, 6): 10, Pair(8, 7): 11,
        Pair(8, 9): 12, Pair(8, 16): 13, Pair(8, 17): 14, Pair(8, 18): 15,
        Pair(17, 9): 18, Pair(19, 9): 20
    ]

    static let splitFinals: [Int: (Int?, Int)] = [
        2: (1, 0), 3: (1, 9), 5: (4, 12), 6: (4, 18),
        9: (8, 0), 10: (8, 6), 11: (8, 7), 12: (8, 9),
        13: (8, 16), 14: (8, 17), 15: (8, 18),
        18: (17, 9), 20: (19, 9),
        1: (nil, 0), 4: (nil, 2), 7: (nil, 3), 8: (nil, 5),
        16: (nil, 6), 17: (nil, 7), 19: (nil, 9), 21: (nil, 11),
        22: (nil, 12), 23: (nil, 14), 24: (nil, 15), 25: (nil, 16),
        26: (nil, 17), 27: (nil, 18)
    ]
}

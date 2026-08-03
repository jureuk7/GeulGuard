import Testing
@testable import HangulCore

@Suite("두벌식 조합")
struct HangulComposerTests {
    @Test("기본 음절과 단어를 조합한다")
    func composesBasicWord() {
        var composer = HangulComposer()
        let output = type("dkssud", into: &composer)

        #expect(output + composer.commit() == "안녕")
    }

    @Test("받침을 다음 음절 초성으로 이동한다")
    func movesFinalToNextSyllable() {
        var composer = HangulComposer()
        let output = type("rkrk", into: &composer)

        #expect(output + composer.commit() == "가가")
    }

    @Test("겹받침을 모음 앞에서 분리한다")
    func splitsCompoundFinal() {
        var composer = HangulComposer()
        let output = type("fkfrk", into: &composer)

        #expect(output + composer.commit() == "랄가")
    }

    @Test("복합 모음을 조합하고 단계적으로 지운다")
    func combinesAndDeletesMedial() {
        var composer = HangulComposer()
        _ = type("rhk", into: &composer)
        #expect(composer.composingText == "과")

        #expect(composer.backspace()?.composing == "고")
        #expect(composer.backspace()?.composing == "ㄱ")
        #expect(composer.backspace()?.composing == "")
        #expect(composer.backspace() == nil)
    }

    @Test("받침을 단계적으로 지운다")
    func deletesFinalByJamo() {
        var composer = HangulComposer()
        _ = type("rkrt", into: &composer)
        #expect(composer.composingText == "갃")

        #expect(composer.backspace()?.composing == "각")
        #expect(composer.backspace()?.composing == "가")
    }

    @Test("지원하지 않는 문자는 조합기가 소비하지 않는다")
    func rejectsPunctuation() {
        var composer = HangulComposer()
        #expect(composer.input("!") == nil)
        #expect(!composer.hasComposition)
    }

    @Test("쌍자음 뒤 Shift가 남은 대문자 모음도 한글로 조합한다")
    func acceptsStickyShiftVowelsAfterDoubleConsonant() {
        var composer = HangulComposer()
        let output = type("TM", into: &composer)

        #expect(output + composer.commit() == "쓰")
    }

    @Test("대문자 N/B도 ㅜ/ㅠ로 조합한다")
    func acceptsUppercaseUVowels() {
        var composer = HangulComposer()
        #expect(type("dN", into: &composer) + composer.commit() == "우")

        composer = HangulComposer()
        #expect(type("tB", into: &composer) + composer.commit() == "슈")
    }

    @Test("직접 입력한 쌍자음을 다음 음절 초성으로 통째로 이동한다")
    func movesDirectDoubleConsonantToNextSyllable() {
        var composer = HangulComposer()
        #expect(type("smRla", into: &composer) + composer.commit() == "느낌")

        composer = HangulComposer()
        #expect(type("dlTj", into: &composer) + composer.commit() == "이써")
    }

    @Test("두 자음으로 조합한 겹받침은 모음 앞에서 분리한다")
    func splitsComposedDoubleFinalBeforeVowel() {
        var composer = HangulComposer()
        #expect(type("rkrrk", into: &composer) + composer.commit() == "각가")
    }

    @Test("모음 뒤 자음을 이전 음절로 재배열하지 않는다")
    func preservesJamoOrder() {
        var composer = HangulComposer()
        let output = type("kr", into: &composer)

        #expect(output + composer.commit() == "ㅏㄱ")
    }

    private func type(_ text: String, into composer: inout HangulComposer) -> String {
        var committed = ""
        for character in text {
            let update = composer.input(character)
            committed += update?.committed ?? ""
        }
        return committed
    }
}

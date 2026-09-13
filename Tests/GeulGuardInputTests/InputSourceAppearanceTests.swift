import AppKit
import XCTest

final class InputSourceAppearanceTests: XCTestCase {
    private let projectRoot = URL(fileURLWithPath: #filePath)
        .deletingLastPathComponent()
        .deletingLastPathComponent()
        .deletingLastPathComponent()

    func testInputSourceIconUsesNativeTemplateRendering() throws {
        let infoURL = projectRoot.appendingPathComponent("Resources/Info.plist")
        let infoData = try Data(contentsOf: infoURL)
        let info = try XCTUnwrap(
            PropertyListSerialization.propertyList(from: infoData, format: nil) as? [String: Any]
        )

        XCTAssertEqual(info["TISIconIsTemplate"] as? Bool, true)

        let component = try XCTUnwrap(info["ComponentInputModeDict"] as? [String: Any])
        let modes = try XCTUnwrap(component["tsInputModeListKey"] as? [String: Any])
        let mode = try XCTUnwrap(modes["dev.jureuk.inputmethod.GeulGuard"] as? [String: Any])
        let labels = try XCTUnwrap(mode["TISIconLabels"] as? [String: String])
        XCTAssertEqual(labels["Primary"], "한")
        XCTAssertEqual(mode["tsInputModeMenuIconFileKey"] as? String, "GeulGuardMenu.tiff")
        XCTAssertEqual(mode["tsInputModePaletteIconFileKey"] as? String, "GeulGuardMenu.tiff")
        XCTAssertNil(mode["tsInputModeAlternateMenuIconFileKey"])
    }

    func testInputSourceNameIsLocalized() throws {
        let expectedNames = [
            "ko": "글가드 두벌식",
            "en": "GeulGuard 2-Set Korean",
        ]

        for (language, expectedName) in expectedNames {
            let stringsURL = projectRoot
                .appendingPathComponent("Resources/\(language).lproj/InfoPlist.strings")
            let stringsData = try Data(contentsOf: stringsURL)
            let strings = try XCTUnwrap(
                PropertyListSerialization.propertyList(from: stringsData, format: nil) as? [String: String]
            )
            XCTAssertEqual(strings["dev.jureuk.inputmethod.GeulGuard"], expectedName)
        }
    }

    func testMenuIconIsABlackMaskWithATransparentGlyph() throws {
        let outputURL = FileManager.default.temporaryDirectory
            .appendingPathComponent("GeulGuard-menu-icon-\(UUID().uuidString).tiff")
        defer { try? FileManager.default.removeItem(at: outputURL) }

        let process = Process()
        process.executableURL = URL(fileURLWithPath: "/usr/bin/xcrun")
        process.arguments = [
            "swift",
            projectRoot.appendingPathComponent("scripts/make-icon.swift").path,
            outputURL.path,
        ]
        try process.run()
        process.waitUntilExit()
        XCTAssertEqual(process.terminationStatus, 0)

        let imageData = try Data(contentsOf: outputURL)
        let bitmap = try XCTUnwrap(NSBitmapImageRep(data: imageData))
        XCTAssertEqual(bitmap.size, NSSize(width: 22, height: 16))
        XCTAssertEqual(bitmap.pixelsWide, 22)
        XCTAssertEqual(bitmap.pixelsHigh, 16)

        let corner = try XCTUnwrap(bitmap.colorAt(x: 0, y: 0)?.usingColorSpace(.deviceRGB))
        let roundedEdge = try XCTUnwrap(bitmap.colorAt(x: 4, y: 0)?.usingColorSpace(.deviceRGB))
        XCTAssertLessThan(corner.alphaComponent, 0.1)
        XCTAssertGreaterThan(roundedEdge.alphaComponent, 0.5)

        var transparentInteriorPixelCount = 0
        var maximumColorComponent = CGFloat.zero

        for y in 0 ..< bitmap.pixelsHigh {
            for x in 0 ..< bitmap.pixelsWide {
                let color = try XCTUnwrap(bitmap.colorAt(x: x, y: y)?.usingColorSpace(.deviceRGB))
                if color.alphaComponent < 0.1 {
                    if x >= bitmap.pixelsWide / 4,
                       x < bitmap.pixelsWide * 3 / 4,
                       y >= bitmap.pixelsHigh / 4,
                       y < bitmap.pixelsHigh * 3 / 4
                    {
                        transparentInteriorPixelCount += 1
                    }
                    continue
                }

                maximumColorComponent = max(
                    maximumColorComponent,
                    color.redComponent,
                    color.greenComponent,
                    color.blueComponent
                )
            }
        }

        XCTAssertLessThan(maximumColorComponent, 0.05)
        XCTAssertGreaterThan(transparentInteriorPixelCount, 0)
    }
}

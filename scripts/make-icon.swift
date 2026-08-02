import AppKit
import Foundation

guard CommandLine.arguments.count == 2 else {
    FileHandle.standardError.write(Data("usage: make-icon.swift OUTPUT.tiff\n".utf8))
    exit(2)
}

let outputPath = CommandLine.arguments[1]
let workDirectory = URL(fileURLWithPath: NSTemporaryDirectory())
    .appendingPathComponent("GeulGuardIcon-\(ProcessInfo.processInfo.globallyUniqueString)")

try FileManager.default.createDirectory(at: workDirectory, withIntermediateDirectories: true)
defer { try? FileManager.default.removeItem(at: workDirectory) }

// Menu-bar input-source icons must be tiny (16pt), like Apple's KoreanIM TIFFs.
// A large app-style badge is rendered at full size and breaks the input menu.
func renderMenuIcon(pixels: Int) -> NSBitmapImageRep {
    guard let rep = NSBitmapImageRep(
        bitmapDataPlanes: nil,
        pixelsWide: pixels,
        pixelsHigh: pixels,
        bitsPerSample: 8,
        samplesPerPixel: 4,
        hasAlpha: true,
        isPlanar: false,
        colorSpaceName: .deviceRGB,
        bytesPerRow: 0,
        bitsPerPixel: 0
    ) else {
        fatalError("failed to allocate bitmap")
    }

    // Logical size stays 16pt so the menu treats this as a menu glyph, not an app icon.
    rep.size = NSSize(width: 16, height: 16)
    NSGraphicsContext.saveGraphicsState()
    NSGraphicsContext.current = NSGraphicsContext(bitmapImageRep: rep)

    let paragraph = NSMutableParagraphStyle()
    paragraph.alignment = .center
    let attributes: [NSAttributedString.Key: Any] = [
        .font: NSFont.systemFont(ofSize: 11, weight: .semibold),
        .foregroundColor: NSColor.black,
        .paragraphStyle: paragraph
    ]

    let text = NSString(string: "글")
    let textSize = text.size(withAttributes: attributes)
    let origin = NSPoint(
        x: (16 - textSize.width) / 2,
        y: (16 - textSize.height) / 2 - 0.5
    )
    text.draw(at: origin, withAttributes: attributes)

    NSGraphicsContext.restoreGraphicsState()
    return rep
}

func writePNG(_ rep: NSBitmapImageRep, to url: URL) throws {
    guard let data = rep.representation(using: .png, properties: [:]) else {
        throw NSError(domain: "GeulGuardIcon", code: 1)
    }
    try data.write(to: url, options: .atomic)
}

let oneX = workDirectory.appendingPathComponent("GeulGuard.png")
let twoX = workDirectory.appendingPathComponent("GeulGuard@2x.png")
try writePNG(renderMenuIcon(pixels: 16), to: oneX)
try writePNG(renderMenuIcon(pixels: 32), to: twoX)

let process = Process()
process.executableURL = URL(fileURLWithPath: "/usr/bin/tiffutil")
process.arguments = [
    "-cathidpicheck",
    oneX.path,
    twoX.path,
    "-out",
    outputPath
]
try process.run()
process.waitUntilExit()
guard process.terminationStatus == 0 else {
    FileHandle.standardError.write(Data("tiffutil failed\n".utf8))
    exit(1)
}

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

let menuIconSize = NSSize(width: 22, height: 16)
let menuIconCornerRadius: CGFloat = 5

func renderMenuIcon(scale: Int) -> NSBitmapImageRep {
    guard let rep = NSBitmapImageRep(
        bitmapDataPlanes: nil,
        pixelsWide: Int(menuIconSize.width) * scale,
        pixelsHigh: Int(menuIconSize.height) * scale,
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

    rep.size = menuIconSize
    NSGraphicsContext.saveGraphicsState()
    NSGraphicsContext.current = NSGraphicsContext(bitmapImageRep: rep)

    let badge = NSBezierPath(
        roundedRect: NSRect(origin: .zero, size: menuIconSize),
        xRadius: menuIconCornerRadius,
        yRadius: menuIconCornerRadius
    )
    NSColor.black.setFill()
    badge.fill()

    let paragraph = NSMutableParagraphStyle()
    paragraph.alignment = .center
    let attributes: [NSAttributedString.Key: Any] = [
        .font: NSFont.systemFont(ofSize: 10.5, weight: .semibold),
        .foregroundColor: NSColor.black,
        .paragraphStyle: paragraph
    ]

    let text = NSString(string: "한")
    let textSize = text.size(withAttributes: attributes)
    let origin = NSPoint(
        x: (menuIconSize.width - textSize.width) / 2,
        y: (menuIconSize.height - textSize.height) / 2
    )
    NSGraphicsContext.current?.compositingOperation = .clear
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
try writePNG(renderMenuIcon(scale: 1), to: oneX)
try writePNG(renderMenuIcon(scale: 2), to: twoX)

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

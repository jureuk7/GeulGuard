import AppKit
import Foundation

guard CommandLine.arguments.count == 2 else {
    FileHandle.standardError.write(Data("usage: make-icon.swift OUTPUT\n".utf8))
    exit(2)
}

let size = NSSize(width: 128, height: 128)
let image = NSImage(size: size)
image.lockFocus()

let background = NSBezierPath(
    roundedRect: NSRect(origin: .zero, size: size),
    xRadius: 28,
    yRadius: 28
)
NSColor(calibratedRed: 0.145, green: 0.388, blue: 0.922, alpha: 1).setFill()
background.fill()

let paragraph = NSMutableParagraphStyle()
paragraph.alignment = .center
let attributes: [NSAttributedString.Key: Any] = [
    .font: NSFont.systemFont(ofSize: 70, weight: .bold),
    .foregroundColor: NSColor.white,
    .paragraphStyle: paragraph
]
NSString(string: "한").draw(
    in: NSRect(x: 8, y: 22, width: 112, height: 84),
    withAttributes: attributes
)

image.unlockFocus()

guard let data = image.tiffRepresentation else {
    FileHandle.standardError.write(Data("failed to render icon\n".utf8))
    exit(1)
}

try data.write(to: URL(fileURLWithPath: CommandLine.arguments[1]), options: .atomic)

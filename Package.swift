// swift-tools-version: 6.0

import PackageDescription

let package = Package(
    name: "GeulGuard",
    platforms: [
        .macOS(.v14)
    ],
    products: [
        .library(name: "HangulCore", targets: ["HangulCore"]),
        .executable(name: "GeulGuardInput", targets: ["GeulGuardInput"])
    ],
    targets: [
        .target(name: "HangulCore"),
        .executableTarget(
            name: "GeulGuardInput",
            dependencies: ["HangulCore"],
            linkerSettings: [
                .linkedFramework("AppKit"),
                .linkedFramework("InputMethodKit"),
                .linkedFramework("SwiftUI")
            ]
        ),
        .testTarget(
            name: "HangulCoreTests",
            dependencies: ["HangulCore"]
        )
    ]
)

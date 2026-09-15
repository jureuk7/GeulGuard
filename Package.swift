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
    dependencies: [
        .package(url: "https://github.com/sparkle-project/Sparkle", exact: "2.10.0")
    ],
    targets: [
        .target(name: "HangulCore"),
        .executableTarget(
            name: "GeulGuardInput",
            dependencies: ["HangulCore", .product(name: "Sparkle", package: "Sparkle")],
            linkerSettings: [
                .linkedFramework("AppKit"),
                .linkedFramework("InputMethodKit"),
                .linkedFramework("SwiftUI"),
                .linkedFramework("Carbon"),
                .unsafeFlags(["-Xlinker", "-rpath", "-Xlinker", "@executable_path/../Frameworks"])
            ]
        ),
        .testTarget(
            name: "GeulGuardInputTests",
            dependencies: ["GeulGuardInput"],
            linkerSettings: [
                .unsafeFlags(["-Xlinker", "-rpath", "-Xlinker", "@loader_path/../../.."])
            ]
        ),
        .testTarget(
            name: "HangulCoreTests",
            dependencies: ["HangulCore"]
        )
    ]
)

#!/usr/bin/env swift
import CryptoKit
import Foundation

func fail(_ message: String) -> Never {
    FileHandle.standardError.write(Data("\(message)\n".utf8))
    exit(2)
}

func readPlist(_ path: String) throws -> [String: Any] {
    let data = try Data(contentsOf: URL(fileURLWithPath: path))
    guard let plist = try PropertyListSerialization.propertyList(from: data, format: nil) as? [String: Any] else {
        fail("앱 Info.plist를 읽을 수 없습니다")
    }
    return plist
}

func validFeed(_ value: String) -> Bool {
    guard let url = URLComponents(string: value) else { return false }
    return url.scheme == "https" && !(url.host ?? "").isEmpty && url.user == nil && url.password == nil && url.fragment == nil
}

func xml(_ value: String) -> String {
    value.replacingOccurrences(of: "&", with: "&amp;")
        .replacingOccurrences(of: "<", with: "&lt;")
        .replacingOccurrences(of: ">", with: "&gt;")
        .replacingOccurrences(of: "\"", with: "&quot;")
        .replacingOccurrences(of: "'", with: "&apos;")
}

let args = Array(CommandLine.arguments.dropFirst())
if args == ["--help"] {
    print("""
    Usage:
      swift scripts/update-metadata.swift configure INFO_PLIST
      swift scripts/update-metadata.swift appcast INFO_PLIST PKG SIGNATURE_FILE DOWNLOAD_URL OUTPUT_XML
    configure reads public GEUL_GUARD_UPDATE_FEED_URL and GEUL_GUARD_UPDATE_PUBLIC_KEY.
    appcast validates the sign_update signature against the built app's public key.
    No private keys are read, generated or exported by this script.
    """)
    exit(0)
}

do {
    switch args.first {
    case "configure" where args.count == 2:
        let environment = ProcessInfo.processInfo.environment
        let feed = environment["GEUL_GUARD_UPDATE_FEED_URL"] ?? ""
        let key = environment["GEUL_GUARD_UPDATE_PUBLIC_KEY"] ?? ""
        guard !feed.isEmpty || !key.isEmpty else { exit(0) }
        guard validFeed(feed), let decoded = Data(base64Encoded: key), decoded.count == 32 else {
            fail("업데이트 설정에 유효한 HTTPS 피드 주소와 32바이트 Base64 공개키가 필요합니다")
        }
        var plist = try readPlist(args[1])
        plist["SUFeedURL"] = feed
        plist["SUPublicEDKey"] = key
        let data = try PropertyListSerialization.data(fromPropertyList: plist, format: .xml, options: 0)
        try data.write(to: URL(fileURLWithPath: args[1]), options: .atomic)
    case "appcast" where args.count == 6:
        let plist = try readPlist(args[1])
        guard let version = plist["CFBundleVersion"] as? String,
              let shortVersion = plist["CFBundleShortVersionString"] as? String,
              let minimumOS = plist["LSMinimumSystemVersion"] as? String,
              let feed = plist["SUFeedURL"] as? String, validFeed(feed),
              let publicKey = plist["SUPublicEDKey"] as? String,
              let keyData = Data(base64Encoded: publicKey) else {
            fail("빌드된 앱에 버전, 최소 OS 또는 업데이트 설정이 없습니다")
        }
        let expectedURL = "https://github.com/jureuk7/GeulGuard/releases/download/v\(shortVersion)/GeulGuard.pkg"
        guard args[4] == expectedURL else { fail("다운로드 URL은 공식 버전별 GitHub Release PKG 주소여야 합니다: \(expectedURL)") }
        let signatureOutput = try String(contentsOfFile: args[3], encoding: .utf8)
        let pattern = #"sparkle:edSignature="([A-Za-z0-9+/=]+)""#
        let expression = try NSRegularExpression(pattern: pattern)
        let range = NSRange(signatureOutput.startIndex..., in: signatureOutput)
        guard let match = expression.firstMatch(in: signatureOutput, range: range),
              let signatureRange = Range(match.range(at: 1), in: signatureOutput),
              let signature = Data(base64Encoded: String(signatureOutput[signatureRange])) else {
            fail("sign_update 출력에 EdDSA 서명이 없습니다")
        }
        let packageData = try Data(contentsOf: URL(fileURLWithPath: args[2]), options: .mappedIfSafe)
        let verificationKey = try Curve25519.Signing.PublicKey(rawRepresentation: keyData)
        guard verificationKey.isValidSignature(signature, for: packageData) else {
            fail("PKG 서명이 앱에 내장된 공개키와 일치하지 않습니다")
        }
        let appcast = """
        <?xml version="1.0" encoding="utf-8"?>
        <rss version="2.0" xmlns:sparkle="http://www.andymatuschak.org/xml-namespaces/sparkle">
          <channel>
            <title>GeulGuard Updates</title>
            <link>\(xml(feed))</link>
            <description>글가드 업데이트</description>
            <item>
              <title>GeulGuard \(xml(shortVersion))</title>
              <sparkle:version>\(xml(version))</sparkle:version>
              <sparkle:shortVersionString>\(xml(shortVersion))</sparkle:shortVersionString>
              <sparkle:minimumSystemVersion>\(xml(minimumOS))</sparkle:minimumSystemVersion>
              <enclosure url="\(xml(args[4]))" length="\(packageData.count)" type="application/octet-stream" sparkle:installationType="package" sparkle:edSignature="\(signature.base64EncodedString())" />
            </item>
          </channel>
        </rss>
        """
        try Data((appcast + "\n").utf8).write(to: URL(fileURLWithPath: args[5]), options: .atomic)
    default:
        fail("잘못된 인수입니다. --help를 확인하세요")
    }
} catch {
    fail("업데이트 메타데이터 처리 실패: \(error.localizedDescription)")
}

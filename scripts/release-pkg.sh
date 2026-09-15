#!/bin/bash
set -euo pipefail

if [[ "${1:-}" == "--help" && $# -eq 1 ]]; then
  echo "Usage: scripts/release-pkg.sh (signed PKG and appcast; environment in docs/updates.md)"
  exit 0
elif [[ $# -ne 0 ]]; then
  echo "잘못된 인수입니다. --help를 확인하세요" >&2
  exit 2
fi

project_root="$(cd "$(dirname "$0")/.." && pwd)"
application_identity="${DEVELOPER_ID_APPLICATION:-}"
installer_identity="${DEVELOPER_ID_INSTALLER:-}"
notary_profile="${NOTARY_PROFILE:-}"
release_scratch="${GEUL_GUARD_RELEASE_PATH:-${TMPDIR:-/tmp}/GeulGuardRelease}"
package_path="$project_root/dist/GeulGuard.pkg"
download_url="${GEUL_GUARD_RELEASE_DOWNLOAD_URL:-}"

if [[ -z "${GEUL_GUARD_UPDATE_FEED_URL:-}" || -z "${GEUL_GUARD_UPDATE_PUBLIC_KEY:-}" || -z "$download_url" ]]; then
  echo "GEUL_GUARD_UPDATE_FEED_URL, GEUL_GUARD_UPDATE_PUBLIC_KEY, GEUL_GUARD_RELEASE_DOWNLOAD_URL이 필요합니다" >&2
  exit 2
fi

if [[ -z "$application_identity" || -z "$installer_identity" || -z "$notary_profile" ]]; then
  echo "DEVELOPER_ID_APPLICATION, DEVELOPER_ID_INSTALLER, NOTARY_PROFILE이 필요합니다" >&2
  exit 2
fi

identities="$(security find-identity -v)"
for identity in "$application_identity" "$installer_identity"; do
  if [[ "$identities" != *\"$identity\"* ]]; then
    echo "키체인에서 인증서를 찾을 수 없습니다: $identity" >&2
    exit 1
  fi
done

mkdir -p "$release_scratch" "$project_root/dist"

app_path="$(
  CONFIGURATION=release \
  GEUL_GUARD_ARCHITECTURES="arm64 x86_64" \
  GEUL_GUARD_SCRATCH_PATH="$release_scratch/build" \
  CODESIGN_IDENTITY="$application_identity" \
    "$project_root/scripts/build-app.sh"
)"

if [[ -f "$package_path" ]]; then
  mv "$package_path" "$release_scratch/GeulGuard.previous.$$.pkg"
fi

COPYFILE_DISABLE=1 productbuild \
  --component "$app_path" "/Library/Input Methods" \
  --sign "$installer_identity" \
  "$package_path"

pkgutil --check-signature "$package_path"
xcrun notarytool submit "$package_path" \
  --keychain-profile "$notary_profile" \
  --wait
xcrun stapler staple "$package_path"
xcrun stapler validate "$package_path"
spctl --assess --type install --verbose=2 "$package_path"

sign_update="$release_scratch/build/build-x86_64/artifacts/sparkle/Sparkle/bin/sign_update"
signature_path="$release_scratch/update-signature.txt"
"$sign_update" "$package_path" > "$signature_path"
swift "$project_root/scripts/update-metadata.swift" appcast \
  "$app_path/Contents/Info.plist" "$package_path" "$signature_path" \
  "$download_url" "$project_root/dist/appcast.xml"

echo "$package_path"

#!/bin/bash
set -euo pipefail

project_root="$(cd "$(dirname "$0")/.." && pwd)"
configuration="${CONFIGURATION:-debug}"
scratch_path="${GEUL_GUARD_SCRATCH_PATH:-${TMPDIR:-/tmp}/GeulGuardBuild}"
app_path="$scratch_path/GeulGuard.app"
archive_path="$project_root/dist/GeulGuard.zip"
module_cache="$scratch_path/ModuleCache"

mkdir -p "$module_cache"
export CLANG_MODULE_CACHE_PATH="$module_cache"
export SWIFTPM_MODULECACHE_OVERRIDE="$module_cache"

swift build \
  --package-path "$project_root" \
  --configuration "$configuration" \
  --disable-sandbox \
  --scratch-path "$scratch_path"

binary_path="$(swift build \
  --package-path "$project_root" \
  --configuration "$configuration" \
  --disable-sandbox \
  --scratch-path "$scratch_path" \
  --show-bin-path)/GeulGuardInput"

if [[ -d "$app_path" ]]; then
  mv "$app_path" "$scratch_path/GeulGuard.previous.$$.app"
fi
mkdir -p "$app_path/Contents/MacOS" "$app_path/Contents/Resources"
COPYFILE_DISABLE=1 cp "$binary_path" "$app_path/Contents/MacOS/GeulGuardInput"
COPYFILE_DISABLE=1 cp "$project_root/Resources/Info.plist" "$app_path/Contents/Info.plist"
swift "$project_root/scripts/make-icon.swift" \
  "$app_path/Contents/Resources/GeulGuard.tiff"
xattr -cr "$app_path"
codesign --force --deep --sign - "$app_path"
# Some synced folders attach provenance metadata during signing. It is not part
# of the signature and would otherwise be archived as `._` AppleDouble files.
xattr -cr "$app_path"
codesign --verify --deep --strict "$app_path"

mkdir -p "$project_root/dist"
if [[ -f "$archive_path" ]]; then
  mv "$archive_path" "$scratch_path/GeulGuard.previous.$$.zip"
fi
(
  cd "$scratch_path"
  COPYFILE_DISABLE=1 /usr/bin/zip -qry "$archive_path" "GeulGuard.app"
)

echo "$app_path"

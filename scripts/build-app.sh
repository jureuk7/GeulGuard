#!/bin/bash
set -euo pipefail

project_root="$(cd "$(dirname "$0")/.." && pwd)"
configuration="${CONFIGURATION:-debug}"
scratch_path="${GEUL_GUARD_SCRATCH_PATH:-${TMPDIR:-/tmp}/GeulGuardBuild}"
architectures_value="${GEUL_GUARD_ARCHITECTURES:-native}"
codesign_identity="${CODESIGN_IDENTITY:--}"
app_path="$scratch_path/GeulGuard.app"
archive_path="$project_root/dist/GeulGuard.zip"

read -r -a architectures <<< "$architectures_value"
if [[ ${#architectures[@]} -eq 0 ]]; then
  echo "GEUL_GUARD_ARCHITECTURES가 비어 있습니다" >&2
  exit 2
fi

binary_paths=()
for architecture in "${architectures[@]}"; do
  architecture_scratch="$scratch_path/build-$architecture"
  module_cache="$architecture_scratch/ModuleCache"
  mkdir -p "$module_cache"

  build_arguments=(
    swift build
    --package-path "$project_root"
    --configuration "$configuration"
    --disable-sandbox
    --scratch-path "$architecture_scratch"
  )
  if [[ "$architecture" != "native" ]]; then
    build_arguments+=(--triple "${architecture}-apple-macosx14.0")
  fi

  # Keep build logs on stderr so callers can capture only the app path from stdout.
  CLANG_MODULE_CACHE_PATH="$module_cache" \
    SWIFTPM_MODULECACHE_OVERRIDE="$module_cache" \
    "${build_arguments[@]}" 1>&2

  binary_directory="$(CLANG_MODULE_CACHE_PATH="$module_cache" \
    SWIFTPM_MODULECACHE_OVERRIDE="$module_cache" \
    "${build_arguments[@]}" --show-bin-path)"
  binary_paths+=("$binary_directory/GeulGuardInput")
done

binary_path="$scratch_path/GeulGuardInput"
if [[ ${#binary_paths[@]} -eq 1 ]]; then
  COPYFILE_DISABLE=1 cp "${binary_paths[0]}" "$binary_path"
else
  lipo -create "${binary_paths[@]}" -output "$binary_path"
fi

if [[ -d "$app_path" ]]; then
  mv "$app_path" "$scratch_path/GeulGuard.previous.$$.app"
fi
mkdir -p "$app_path/Contents/MacOS" "$app_path/Contents/Resources"
COPYFILE_DISABLE=1 cp "$binary_path" "$app_path/Contents/MacOS/GeulGuardInput"
COPYFILE_DISABLE=1 cp "$project_root/Resources/Info.plist" "$app_path/Contents/Info.plist"
for localization in ko en; do
  mkdir -p "$app_path/Contents/Resources/${localization}.lproj"
  COPYFILE_DISABLE=1 cp \
    "$project_root/Resources/${localization}.lproj/InfoPlist.strings" \
    "$app_path/Contents/Resources/${localization}.lproj/InfoPlist.strings"
done
swift "$project_root/scripts/make-icon.swift" \
  "$app_path/Contents/Resources/GeulGuard.tiff"
COPYFILE_DISABLE=1 cp \
  "$project_root/Resources/GeulGuard.icns" \
  "$app_path/Contents/Resources/GeulGuard.icns"
xattr -cr "$app_path"
if [[ "$codesign_identity" == "-" ]]; then
  codesign --force --sign - "$app_path"
else
  codesign \
    --force \
    --options runtime \
    --timestamp \
    --sign "$codesign_identity" \
    "$app_path"
fi
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

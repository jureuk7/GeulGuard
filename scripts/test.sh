#!/bin/bash
set -euo pipefail

project_root="$(cd "$(dirname "$0")/.." && pwd)"
scratch_path="${GEUL_GUARD_TEST_PATH:-${TMPDIR:-/tmp}/GeulGuardTests}"
module_cache="$scratch_path/ModuleCache"

mkdir -p "$module_cache"
export CLANG_MODULE_CACHE_PATH="$module_cache"
export SWIFTPM_MODULECACHE_OVERRIDE="$module_cache"

swift test \
  --package-path "$project_root" \
  --disable-sandbox \
  --scratch-path "$scratch_path"

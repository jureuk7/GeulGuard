#!/bin/bash
set -euo pipefail

project_root="$(cd "$(dirname "$0")/.." && pwd)"
app_path="$("$project_root/scripts/build-app.sh")"
install_directory="$HOME/Library/Input Methods"
installed_app="$install_directory/GeulGuard.app"

mkdir -p "$install_directory"
ditto "$app_path" "$installed_app"

echo "설치 완료: $installed_app"
echo "로그아웃 후 다시 로그인하고 시스템 설정 → 키보드 → 텍스트 입력 → 편집에서 ‘글가드’를 추가하세요."

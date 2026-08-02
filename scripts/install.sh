#!/bin/bash
set -euo pipefail

project_root="$(cd "$(dirname "$0")/.." && pwd)"
app_path="$("$project_root/scripts/build-app.sh")"
install_directory="$HOME/Library/Input Methods"
installed_app="$install_directory/GeulGuard.app"

if [[ ! -d "$app_path" ]]; then
  echo "빌드된 앱을 찾을 수 없습니다: $app_path" >&2
  exit 1
fi

mkdir -p "$install_directory"

# Replace any previous install cleanly so TextInputMenuAgent re-reads Info.plist.
if [[ -d "$installed_app" ]]; then
  # Quit a running instance before overwriting the bundle.
  pkill -f "/Library/Input Methods/GeulGuard.app/Contents/MacOS/GeulGuardInput" 2>/dev/null || true
  rm -rf "$installed_app"
fi

ditto "$app_path" "$installed_app"
xattr -cr "$installed_app"

# Launch once so InputMethodKit registers the connection, then refresh the menu agent.
open "$installed_app"
sleep 1
killall TextInputMenuAgent 2>/dev/null || true

echo "설치 완료: $installed_app"
echo
echo "다음 단계:"
echo "1. 로그아웃 후 다시 로그인하세요. (최초 설치 시 입력 소스 목록 반영에 필요할 수 있습니다)"
echo "2. 시스템 설정 → 키보드 → 텍스트 입력 → 편집"
echo "3. + 를 누르고 한국어 아래의 ‘글가드’를 추가하세요"
echo "4. 메뉴 막대 입력 메뉴에서 ‘글가드’를 선택하세요"

chcp 65001 >nul
@echo off
cd /d "%~dp0"

echo 當前目錄為：%cd%
echo.

REM 進入 frontend 並執行 npm install
if exist frontend\package.json (
  echo 正在 frontend 執行 npm install ...
  cd frontend
  npm install
  cd ..
) else (
  echo frontend 資料夾找不到 package.json，跳過 npm install
)

echo.

REM 進入 backend 並執行 npm install
if exist backend\package.json (
  echo 正在 backend 執行 npm install ...
  cd backend
  npm install
  cd ..
) else (
  echo backend 資料夾找不到 package.json，跳過 npm install
)

echo.
echo 所有 npm install 完成！
pause

chcp 65001 >nul
@echo off
set "base=%~dp0"
cd /d "%base%\.."

echo 當前目錄為：%cd%
echo.

REM 啟動 frontend (npm run serve)
if exist frontend\package.json (
  echo 啟動 frontend ...
  start cmd /k "cd /d %cd%\frontend && echo 路徑：%cd%\frontend && echo 執行命令：npm run serve && npm run serve"
) else (
  echo frontend 資料夾找不到 package.json，無法啟動
)

REM 啟動 backend (node index.js)
if exist backend\index.js (
  echo 啟動 backend ...
  start cmd /k "cd /d %cd%\backend && echo 路徑：%cd%\backend && echo 執行命令：node index.js && echo. && node index.js"
) else (
  echo backend 資料夾找不到 index.js，無法啟動
)

echo.
echo 已啟動前後端兩個視窗
pause

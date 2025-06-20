@echo off
chcp 65001

start cmd /c "cd /d %~dp0backend && npm install"

cd frontend
npm install
cd ..



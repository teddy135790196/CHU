# CHU-kang900320 書店專案

## Minor Project 分支說明

本分支為小組成員進行分工所設立。以下說明各資料夾來源與檔案功能，組員可自行進入更新

## 專案結構
- 📁 查看完整 [檔案結構－前端](./docs/檔案結構－前端.txt)
- 📁 查看完整 [檔案結構－後端](./docs/檔案結構－後端.txt)
- 📁 查看完整 [檔案結構－整體](./docs/檔案結構－整體.txt)

## 技術棧
- **前端**: Vue.js 2, Bootstrap 5, Axios
- **後端**: Node.js, Express.js
- **資料庫**: MySQL (Railway)
- **部署**: Railway (後端), Vercel (前端)

## 功能特色
- 📚 完整的書籍管理系統
- 🛒 購物車功能 (localStorage 持久化)
- 👤 會員註冊/登入系統
- 🔐 密碼加密 (bcrypt)
- 📧 忘記密碼功能
- 🎨 響應式設計
- 🔍 書籍搜尋功能

## 說明
目前仍在製作中，檔案結構有可能發生變化，如果情況允許，建議額外建立一個測試專用的專案，每次使用直接將src砍掉

## 外部連結
[我的 Notion 筆記](https://www.notion.so/1d5d07d9b596803dbaabc42779d44084)<br>
[柯博文老師直播影片](https://www.youtube.com/playlist?list=PLkvu6TsdkQFqvlhPJt8uYu9Lpg8yEzb6h)<br>
[俞樺捷老師教學影片](https://www.youtube.com/playlist?list=PLuE5-ADiU3JKsMI5ecbCViOAyx0L3tWXH)<br>

## 安裝與執行

### 後端啟動
```bash
cd backend
npm install
npm start
```

### 前端啟動
```bash
cd frontend
npm install
npm run serve
```

## 更新紀錄

<details>
<summary>👉 點擊這裡展開更新紀錄 👈</summary>

<hr>

<details>
<summary>最新｜完整購物車系統整合</summary>

- **新增**
  - 完整的購物車功能 (加入、修改數量、刪除)
  - 結帳流程 (訂單資訊填寫、確認、成功頁面)
  - 訂單管理系統 (後端 API 完整實現)
  - 會員忘記密碼功能
  - 首頁和書籍一覽頁面的加入購物車功能

- **修復**
  - 解決 PowerShell 兼容性問題
  - 修復資料庫連接和交易處理
  - 解決端口衝突問題
  - 修復圖片顯示問題

</details>
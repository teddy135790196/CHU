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

<details>
<summary>0613｜會員設定區塊抓資料庫資料顯示</summary>

- **新增**
  - 會員設定根據帳號渲染對應的資料(上方資訊與帳號密碼未實作)
  - 訂單API實作(未檢查並放到前端)

- **補充**
  - 會員設定用的快煩死了，就先這樣了

</details>

<details>
<summary>0612｜優化後端API</summary>

- **新增**
  - 註冊時檢查帳號與郵箱是否重複的後端API實作
- **更新**
  - 優化後端API，將 login、register 純手打一次
  - 將前端連結後端網址全部用 main.js 變更
  - 會員頁面寫死的內容改為變數

</details>

<details>
<summary>0611｜註冊頁面檢查帳號與郵箱是否有重複</summary>

- **新增**
  - 註冊時檢查帳號與郵箱是否重複的後端API實作
- **更新**
  - railway雲端部屬 v0.3 完成，可從前端部屬丟data到雲端資料庫

- **補充**
  - 這次的後端就是用看GPT的內容純手打一次，確實有了一些心得，對後端的聯繫也有了一些感悟，準備將之前直接貼上的也手打一次

</details>

<details>
<summary>0610｜railway雲端部屬除錯</summary>

- **更新**
  - 註冊功能檢查邏輯更新
  - railway的後端除錯完成，可順利用後端網址抓到雲端SQL資料

</details>

<details>
<summary>0609｜測試railway全端部屬</summary>

- **新增**
  - railway前後端連接GitHub部屬測試
- **更新**
  - 分離式部屬資料庫改為alwaysdata測試

</details>

<details>
<summary>0608｜進度丟失</summary>

- **新增**
  - 忘記更新了什麼，找不到紀錄了

</details>

<details>
<summary>0607｜註冊密碼加密與登入功能實作</summary>

- **新增**
  - 註冊密碼使用 bcrypt插件 進行 HASH加密
- **更新**
  - login功能委託GPT完成(尚未搞懂)
  - railway的users資料表重構

</details>

<details>
<summary>0606｜後端index.js插件功能拆分</summary>

- **新增**
  - 根據.env設定選擇當前資料庫
- **更新**
  - 將插件功能從後端index.js中拆出方便維護(cors、session、routes)
  - 建立login基本架構(未實作)

</details>

<details>
<summary>0605｜測試Azure雲端部屬與註冊資料傳到SQL</summary>

- **新增**
  - Azure雲端部屬，可抓取上面的SQL資料
- **更新**
  - 後端網站檔案重構(邏輯：index => routes => controllers => models => dao )
  - 註冊功能的資料順利上傳SQL

- **補充**
  - 感謝尤乙淳同學提供今天上課內容檔案

</details>

<details>
<summary>0604｜測試雲端分離式部屬與前端重構</summary>

- **新增**
  - 前端使用 Vercel 部屬，有人進入網頁時才會消耗額度，月初刷新
  - 後端使用 Render 部屬，每月可開啟 750 小時與限量額度，月初刷新(似乎可以自動休眠)
  - 資料庫使用 Railway 部屬，放上去後不用開啟也可以抓到資料
- **更新**
  - 前端網站檔案重構(邏輯：View => Page => Area)
  - 字體檔案從 ttf 轉為 woff2(更省空間)

</details>

<details>
<summary>0603｜註冊驗證碼實作</summary>

- **新增**
  - 註冊頁面的驗證碼圖片(需用cmd開後端)
  - 註冊頁面的驗證功能，但還需搞懂(需用cmd開後端)

- **補充**
  - 測試HTML連接後端部屬沒問題，但VUE還未測試

</details>

<details>
<summary>0602｜前端設計基本結束</summary>

- **新增**
  - 後端連接雲端部屬抓取資料
- **更新**
  - 登入、註冊、會員頁面主體完成，未來應該只做細調

</details>

<details>
<summary>0529｜細調響應式設計與會員專區地址</summary>

- **新增**
  - 會員專區新增地址欄位
- **更新**
  - 登入與註冊頁面響應式細調

</details>

<details>
<summary>0528｜登入Vue頁面CSS重製完成</summary>

- **新增**
  - 會員專區HTML轉Vue完成
  - 資料庫的會員資料表初期設計
- **更新**
  - 登入頁面響應式完成

- **補充**
  - WEB>membersArea.js的說明不會再丟了吧，今天完全沒問純手寫出來了！

</details>

<details>
<summary>0527｜登入與註冊Vue頁面CSS重製(未完成)</summary>

- **更新**
  - 登入頁面歡迎區響應式完成、登入區未調整
  - 註冊頁面響應式重製完成

</details>

<details>
<summary>0526｜登入頁面CSS重製(未完成)</summary>

- **新增**
  - CSS響應式標準模板(感謝尤乙淳同學提供的樣板)
- **更新**
  - 開始將登入頁面的CSS完全重製，目前進度到設定版面寬度

</details>

</details>

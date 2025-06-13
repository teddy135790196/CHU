## 專案結構
- 📁 查看完整 [檔案結構－前端](./docs/檔案結構－前端.txt)
- 📁 查看完整 [檔案結構－後端](./docs/檔案結構－後端.txt)
- 📁 查看完整 [檔案結構－整體](./docs/檔案結構－整體.txt)


## 說明
目前仍在製作中，檔案結構有可能發生變化，如果情況允許，建議額外建立一個測試專用的專案，每次使用直接將src砍掉


## 外部連結
[我的 Notion 筆記](https://www.notion.so/1d5d07d9b596803dbaabc42779d44084)<br>
[柯博文老師直播影片](https://www.youtube.com/playlist?list=PLkvu6TsdkQFqvlhPJt8uYu9Lpg8yEzb6h)<br>
[俞樺捷老師教學影片](https://www.youtube.com/playlist?list=PLuE5-ADiU3JKsMI5ecbCViOAyx0L3tWXH)<br>


## 更新紀錄

<details>
<summary>👉 點擊這裡展開更新紀錄 👈</summary>

<hr>

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
<summary>0613｜</summary>

- **新增**
  - 
- **更新**
  - 

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

- **補充**
  - 響應式用的好煩，不太受控。但有尤提供的區塊寫法後好寫多了

</details>

<details>
<summary>0525｜會員專區HTML設計完成</summary>

- **新增**
  - 完整書籍資料EXCEL表格
- **更新**
  - 會員頁面完整設計完成，但只實裝個人設定分區

</details>

<details>
<summary>0524｜會員介面設定功能初期設計</summary>

- **新增**
  - 完整書籍資料EXCEL表格
- **更新**
  - 會員頁面設定區HTML設計

</details>

<details>
<summary>0523｜檔案結構重構與建立會員VUE</summary>

- **新增**
  - Vue會員頁面簡易建立完成
  - 會員頁面功能HTML功能規劃
  - 通用浮窗元件
- **更新**
  - 檔案結構整體重構
  - 登入區引用新增22條名言作者

</details>

<details>
<summary>0522｜註冊頁面驗證條件完善與響應式精修</summary>

- **更新**
  - 註冊頁面響應式設計細微調整並美化
  - 驗證條件細條規則與提示詞
  - 註冊步驟元件所有文字整理至 data.message 集中管理

</details>

<details>
<summary>0521｜註冊頁面完成元件化、驗證條件與響應式</summary>

- **更新**
  - 註冊頁面完成元件化
  - 註冊頁面基本驗證功能完成
  - 註冊頁面基本響應式設計完成

- **補充**
  - v-model 傳資料一定要傳需要的值就好，不要整個物件都丟進去，深刻的教訓

</details>

<details>
<summary>0520｜註冊頁面Step1完成元件化與驗證條件</summary>

- **更新**
  - 註冊頁面的 Step1 完成元件化
  - Step1 的帳號、密碼、重複密碼的驗證功能完成

</details>

<details>
<summary>0519｜更新字體與 VUE 註冊頁面元件化 (未完成)</summary>

- **新增**
  - src新增王翰宗開源系列字體(根目錄有設捷徑)
- **更新**
  - 註冊頁面嘗試元件化，但尚未完成

</details>

<details>
<summary>0518｜會員專區 WEB 與 登入註冊 VUE</summary>

- **新增**
  - 會員專區初步功能完成
  - 增加 檔案結構與待更新 備忘文件
- **更新**
  - 將 登入與註冊 轉成VUE寫法(src資料夾)

- **補充**
  - 會員的個人簡介摺疊有夠難做

</details>

<details>
#<summary>0517｜註冊與登入頁面 - WEB 初版</summary>

- **新增**
  - 登入頁面大致效果展示
  - 註冊頁面簡易流程展示(未完成)
  - 使用 Themes.css 來統一管理主題顏色

</details>

</details>
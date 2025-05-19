## Minor Project 分支說明

本分支為讓小組成員進行分工所設立。以下說明各資料夾與檔案功能，組員可自行進入更新 (若有要新增檔案請通知，因為需要修改 router 等系統關聯路徑)。

### 1. 主要檔案結構說明

#### 核心檔案

* **main.js**: 應用程式的入口點，負責初始化 Vue 應用程式。
* **App.vue**: 應用程式的主要根組件，定義了整體的應用程式結構。

#### 目錄結構

* **components/** - 可重用的 Vue 組件
    * **ShoppingCart.vue**: 購物車組件，處理購物車相關的顯示和功能。
    * **HelloWorld.vue**: 示例組件，可能用於首頁展示。
* **views/** - 頁面級別的 Vue 組件
    * **Login.vue**: 登入頁面，處理用戶登入功能。
    * **Register.vue**: 註冊頁面，處理新用戶註冊功能。
    * **ShoppingCart.vue**: 購物車頁面，顯示購物車內容和結帳流程。
    * **ShopCheckoutInfo.vue**: 結帳資訊頁面，收集用戶的結帳相關資訊。
    * **ShopCheckoutSuccess.vue**: 結帳成功頁面，顯示訂單確認資訊。
    * **Admin.vue**: 管理員頁面，可能用於後台管理功能。
    * **Home.vue**: 首頁組件。
    * **Navbar.vue**: 導航欄組件，提供網站導航功能。
* **services/** - 服務層，處理與後端 API 的通信
    * **authService.js**: 認證服務，處理用戶認證相關的 API 調用。
* **router/** - 路由配置目錄，包含路由配置文件，定義應用程式的頁面路由。
* **assets/** - 靜態資源目錄，存放圖片、樣式表等靜態資源。

### 2. 分工建議

* **前端 UI/UX 開發者**
    * 負責 `components/` 目錄下的組件開發和維護。
    * 處理 `views/` 目錄下的頁面樣式和用戶體驗。
    * 管理 `assets/` 目錄下的靜態資源。

* **認證功能開發者**
    * 負責 `Login.vue` 和 `Register.vue` 的開發和維護。
    * 處理 `services/authService.js` 的認證邏輯。
    * 確保用戶認證流程的安全性。

* **購物功能開發者**
    * 負責 `ShoppingCart.vue` (組件和視圖)。
    * 處理 `ShopCheckoutInfo.vue` 和 `ShopCheckoutSuccess.vue` 開發購物相關的業務邏輯。

* **後端整合開發者**
    * 負責 `services/` 目錄下的 API 整合。
    * 處理與後端服務的通信。
    * 確保數據流的安全性和可靠性。

* **路由和架構開發者**
    * 負責 `router/` 目錄的配置。
    * 管理 `main.js` 和 `App.vue` 的架構。
    * 確保應用程式的整體結構合理。



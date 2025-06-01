## Minor Project 分支說明

本分支為讓小組成員進行分工所設立。以下說明各資料夾與檔案功能，組員可自行進入更新 


# 🛠️ 專案總覽與分工說明

本專案採用 Vue 框架構建，具備前台產品展示、用戶註冊登入、購物車與訂單管理等功能。此 README 為團隊協作指南，明確分工並說明新增頁面需更新的相關檔案。

---

## 📂 專案核心檔案結構

### 📌 核心檔案
- `main.js`：應用程式進入點，初始化 Vue。
- `App.vue`：應用根組件，控制主架構與路由出口。

### 📁 目錄說明與關鍵檔案

#### `components/` - 可重用組件
- `ShoppingCart.vue`：購物車組件。
- `HelloWorld.vue`：示範用組件。
- `Navbar.vue`：網站導航欄。

#### `views/` - 頁面級組件
- `Home.vue`：首頁。
- `Login.vue`：登入頁。
- `Register.vue`：註冊頁。
- `ShoppingCart.vue`：購物車頁。
- `ShopCheckoutInfo.vue`：結帳資訊頁。
- `ShopCheckoutSuccess.vue`：結帳成功頁。
- `OrderQuery.vue`：訂單查詢頁。
- `Admin.vue`：後台管理頁。

#### `services/` - API 服務層
- `authService.js`：登入與註冊的 API 服務。
- 其他 API 調用檔案（購物、訂單、用戶等）。

#### `router/`
- `index.js`：路由配置檔，**新增頁面需在此註冊路由。**

#### `assets/`
- 靜態資源（圖片、CSS 等）。

---

## 👥 分工說明與負責內容

### 1️⃣ 產品前台與後台管理（尤）
- **前台展示**：`Home.vue`、產品相關組件（`components/`）、圖片（`assets/`）。
- **後台管理介面**：`Admin.vue` 中產品管理部分。
- **需同步更新**：
  - `router/index.js`：新增頁面註冊。
  - `services/`：新增或修改 API。
  - `App.vue`：必要時調整版型。

---

### 2️⃣ 顧客註冊與用戶管理（亘）
- **註冊與登入**：`Login.vue`、`Register.vue`。
- **後台用戶管理**：`Admin.vue` 中用戶管理區塊。
- **服務邏輯**：`services/authService.js`
- **需同步更新**：
  - `router/index.js`
  - `components/`（有使用共用輸入組件可更新）
  - API 修改請於 `services/` 同步更新

---

### 3️⃣ 購物車與結帳功能（Teddy）
- **前台頁面**：
  - `ShoppingCart.vue`（頁面與組件）
  - `ShopCheckoutInfo.vue`：收件與付款資料
  - `ShopCheckoutSuccess.vue`：訂單成功通知
- **後台訂單管理**：`Admin.vue` 中訂單管理部分
- **需同步更新**：
  - `router/index.js`
  - `services/`：訂單、購物車 API
  - 如有新的共用元件需同步新增至 `components/`

---

### 4️⃣ 網站首頁與訂單查詢（俊良）
- **首頁內容**：`Home.vue`、首頁輪播或介紹組件
- **訂單查詢**：`OrderQuery.vue` 頁面、對應 API
- **需同步更新**：
  - `router/index.js`
  - `services/`：訂單查詢 API
  - 靜態圖片新增請放至 `assets/`

---

## 🧾 更新規範與提醒

### ✅ 路由設定
- 所有頁面需於 `src/router/index.js` 註冊。
- **命名唯一**、URL 不重複。

### ✅ 組件開發
- 可重用元件 ➜ `components/`
- 頁面級組件 ➜ `views/`
- 組件請使用 `scoped` 樣式管理。

### ✅ API 管理
- 所有 API 封裝 ➜ `services/`。
- 新增功能請建立對應 service 檔案或函數。

### ✅ 靜態資源
- 圖片、CSS ➜ `assets/`。
- 請統一命名規則。

### ✅ 狀態管理（如需）
- 若頁面需共用資料，請使用 Vuex。

---

如有新增頁面或功能，請務必更新：
1. `router/index.js` ➜ 路由
2. `services/` ➜ API 通訊
3. `components/` ➜ 共用元件
4. `assets/` ➜ 圖片或樣式
5. `README.md` ➜ 分工與頁面對應更新

> 📌 請確保每次提交皆註明修改內容與負責人，方便後續協作與維護。

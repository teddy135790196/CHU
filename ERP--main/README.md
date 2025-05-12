# ERP-
卓俊良ZhuoJunliang的ERP系統網頁板
# 臺南市噪音監測站監測數據

此專案使用 jQuery 透過 AJAX 向 [臺南市噪音監測 API](https://soa.tainan.gov.tw/Api/Service/Get/895dc515-d959-45be-a48e-0c07caf65d2e) 發送請求，以獲取噪音監測站的監測數據，並以 HTML 表格的形式呈現。

## 資料來源
本專案的數據來自 [政府資料開放平臺](https://data.gov.tw/dataset/101813)，包含噪音監測站的噪音測量結果。

## 目錄結構
- `42_ajax_get_post.html` - 取得資料的 AJAX 請求
- `26A_矩陣json.html` - JSON 格式解析
- `35_exam.html` - 表格展示數據

## 使用技術
- HTML5
- jQuery 3.7.1
- AJAX (HTTP GET 方法)
- JSON 資料解析

## 功能概述
1. 使用 AJAX 向 API 取得監測數據。
2. 將返回的 JSON 資料解析並轉換為 HTML 表格格式。
3. 顯示監測站名稱、監測數據及相關數據指標。
4. 按下按鈕即可執行請求並呈現數據。

## 如何運行

1. **下載或複製專案** 到你的本機環境。
2. **確保你的網路環境允許 AJAX 請求跨來源 (CORS)**。
3. **開啟 `index.html` 或相關文件**，並點擊 "HTTP Get 有 CORS 的問題" 按鈕，即可獲取並顯示數據。

## 程式碼結構
主程式位於 `<script>` 標籤內，包含：
- **API 請求**: `$.get(url1, function (data, status) { ... });`
- **數據處理**: 透過 `data.data.forEach(station => {...});` 迭代 JSON 資料並建立表格。
- **視覺呈現**: 使用 jQuery `$("#div1").html(table);` 更新內容。

## 可能問題與解決方案
- **CORS 限制**: 確保伺服器允許跨來源請求，或使用 Proxy 來解決。
- **數據格式變更**: 若 API 回傳格式變更，請更新 JavaScript 解析邏輯。

## 參考資料
- [jQuery AJAX 官方文件](https://api.jquery.com/jquery.ajax/)
- [政府資料開放平臺](https://data.gov.tw/)





# Tainan City Noise Monitoring Station Data

This project uses jQuery to send an AJAX request to the [Tainan City Noise Monitoring API](https://soa.tainan.gov.tw/Api/Service/Get/895dc515-d959-45be-a48e-0c07caf65d2e) to retrieve noise monitoring station data, which is then displayed in an HTML table format.

## Data Source
The data in this project is sourced from the [Government Open Data Platform](https://data.gov.tw/dataset/101813) and includes noise monitoring results from various stations.

## Directory Structure
- `42_ajax_get_post.html` - AJAX request for data retrieval
- `26A_矩陣json.html` - JSON format parsing
- `35_exam.html` - Table display for structured data

## Technologies Used
- HTML5
- jQuery 3.7.1
- AJAX (HTTP GET method)
- JSON data processing

## Features
1. Uses AJAX to request monitoring data from the API.
2. Parses the returned JSON data and transforms it into an HTML table.
3. Displays monitoring station names, noise levels, and related data indicators.
4. Clicking the button triggers the request and displays the data.

## How to Run

1. **Download or clone this project** to your local environment.
2. **Ensure your network environment allows AJAX cross-origin requests (CORS)**.
3. **Open `index.html` or relevant files**, and click the "HTTP Get has CORS issues" button to fetch and display the data.

## Code Structure
The main script is inside the `<script>` tag and includes:
- **API Request**: `$.get(url1, function (data, status) { ... });`
- **Data Processing**: Iterates through `data.data.forEach(station => {...});` to parse JSON data and build the table.
- **Visual Representation**: Uses jQuery `$("#div1").html(table);` to update the content.

## Potential Issues & Solutions
- **CORS Restrictions**: Ensure the server allows cross-origin requests, or use a proxy to resolve this.
- **Data Format Changes**: If the API response format changes, update the JavaScript parsing logic accordingly.

## References
- [jQuery AJAX Documentation](https://api.jquery.com/jquery.ajax/)
- [Government Open Data Platform](https://data.gov.tw/)

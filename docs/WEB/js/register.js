/* 【註冊頁面更新 */

// 更新按鈕文字
function updateButtonText() {
	const prevBtn = document.getElementById("prevBtn");
	const nextBtn = document.getElementById("nextBtn");

	// 更新按鈕文字
	prevBtn.textContent = nowStep === 1 ? "離開" : "上一頁";
	nextBtn.textContent = nowStep === 4 ? "完成" : "下一步";
}

// 顯示畫面
let nowStep = 1;
const progressWidth = [40, 70, 90, 100];
function showStep(step) {
	for (let i = 1; i <= 4; i++) {
		document.getElementById(`step${i}`).classList.remove("active-step");
	}
	document.getElementById(`step${step}`).classList.add("active-step");

	// 更新進度條比例
	const progress = progressWidth[step - 1];
	const progressBar = document.getElementById("progressBar");
	progressBar.style.width = `${progress}%`;
	// progressBar.innerText = `步驟 ${step}/4`;

	// 更新按鈕文字
	updateButtonText();
}
/* 註冊頁面更新】 */


// 按鈕 - 下一頁
function nextStep() {
	if (nowStep < 4) {
		nowStep++;
		showStep(nowStep);
	} else {
		// 使用確認訊息框來提示離開
		const isExit = confirm("確認資料是否無誤？");
		if (isExit) { window.location.href = "./login.html"; }
	}
}
// 按鈕 - 上一頁
function prevStep() {
	if (nowStep > 1) {
		nowStep--;
		showStep(nowStep);
	} else {
		// 使用確認訊息框來提示離開
		const isExit = confirm("您確定要離開註冊流程嗎？");
		if (isExit) { window.location.href = "./login.html"; }
		// window.location.href = "/"; => 跳轉到首頁
		/**
		 * 情境 3：單頁應用程式 (SPA)
		 * 如果是 React 或 Vue 應用程式：
		 * 
		 * window.location.href = "/";
		 * 
		 * 前提：
		 * 必須在路由配置中將 / 導向首頁組件，如：
		 * 
		 * // React Router (index.js)
		 * import { BrowserRouter, Route, Routes } from 'react-router-dom';
		 * 
		 * function App() {
		 *     return (
		 *         <BrowserRouter>
		 *             <Routes>
		 *                 <Route path="/" element={<Home />} />
		 *             </Routes>
		 *         </BrowserRouter>
		 *     );
		 * }
		 * 
		 * 結果：
		 * 正常跳轉到首頁。
		 */


	}
}






// 輸入驗證
input
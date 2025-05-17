
// 歡迎語與標題陣列
const welcomes = [
	{ title: "歡迎", message: "立即註冊，開始在手機、平板與電腦上暢遊文字的世界，享受免費閱讀服務。" },
	{ title: "瀏覽", message: "隨時隨地探索熱門書單、新書上架，以及為你精選的主題閱讀專區。" },
	{ title: "搜尋", message: "正在找一本書、某位作家，或某個主題嗎？輕鬆搜尋，即刻閱讀。" },
	{ title: "你的書櫃", message: "將你喜歡的書收藏進個人書櫃，打造屬於自己的閱讀空間。" },
	{ title: "閱讀紀錄", message: "自動保存你讀過的每一本書，隨時接續、回顧或分享你的閱讀足跡。" },
	{ title: "推薦書單", message: "依照你的喜好與閱讀習慣，每天推薦你可能喜歡的書與書評。" },
	{ title: "跨裝置同步", message: "無論在哪裡登入，都能從上次中斷的地方繼續閱讀，不錯過任何精彩片段。" }
];

// 名句與作者陣列
const quotes = [
	{ quote: "秦時明月漢時關，一片孤城萬仞山。<br>蓬山此去無多路，輕舟已過萬重山。", author: "？？？" },
	{ quote: "罔談彼短，靡恃己長。信使可覆，器欲難量。<br>禍因惡積，福緣善慶。尺璧非寶，寸陰是競。", author: "周興嗣《千字文．節選》" },
	{ quote: "老驥伏櫪，志在千里。<br>烈士暮年，壯心不已。", author: "曹操《龜雖壽》" },
	{ quote: "綠螘新醅酒，紅泥小火爐。<br>晚來天欲雪，能飲一杯無？", author: "白居易《問劉十九》" },
	{ quote: "昨夜雨疏風驟，濃睡不消殘酒<br>試問捲簾人，卻道海棠依舊<br>知否？知否？應是綠肥紅瘦", author: "李清照《如夢令．昨夜雨疏風驟》" },
	{ quote: "援琴鳴弦發清商，短歌微吟不能長<br>明月皎皎照我床，星漢西流夜未央<br>牽牛織女遙相望，爾獨何辜限河梁", author: "曹丕《燕歌行（一）．節選》" },
];





/************************* 【歡迎訊息區 *************************/

// 取得 - 隨機歡迎標題與訊息
function getRandomWelcome() {
	const randomIndex = Math.floor(Math.random() * welcomes.length);
	return welcomes[randomIndex];
}

// 更新 - 歡迎標題與訊息
function updateWelcome() {
	const welcome = getRandomWelcome();
	const welcomeTitle = document.getElementById("welcomeTitle");
	const welcomeSoild = document.getElementById("welcomeSoild");
	const welcomeMessage = document.getElementById("welcomeMessage");

	// 初始化。移除顯示類別，讓動畫重新播放
	welcomeTitle.classList.remove("show");
	welcomeSoild.classList.remove("show");
	welcomeMessage.classList.remove("show");

	setTimeout(() => {
		welcomeTitle.innerHTML = welcome.title;
		welcomeMessage.innerHTML = welcome.message;

		// 加入 show 類別，觸發淡入效果
		welcomeTitle.classList.add("show");
		welcomeSoild.classList.add("show");
		welcomeMessage.classList.add("show");
	}, 50)
}

/* 歡迎訊息區】 */





/************************* 【引用名言區 *************************/

// 取得 - 隨機名句和作者
function getRandomQuote() {
	// 等於C#的 random.Next(quotes.Length); 目的取 0~n(陣列長度) 的隨機一數
	const randomIndex = Math.floor(Math.random() * quotes.length);
	return quotes[randomIndex];
}

// 更新 - 名句和作者
function updateQuote() {
	const quoteObj = getRandomQuote();
	const quote = document.getElementById("quote");
	const author = document.getElementById("author");

	// 初始化。移除顯示類別，讓動畫重新播放
	quote.classList.remove("show");
	author.classList.remove("show");

	// 短暫延遲再更新，避免直接出現
	setTimeout(() => {
		quote.innerHTML = quoteObj.quote;
		author.innerHTML = quoteObj.author;

		// 加入 show 類別，觸發淡入效果
		quote.classList.add("show");
		author.classList.add("show");
	}, 500);
}

/* 引用名言區】 */




// 頁面載入時更新
window.onload = function () {
	updateQuote();
	updateWelcome();
};

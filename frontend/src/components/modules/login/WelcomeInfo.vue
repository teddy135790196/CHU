<template>
	<div class="welcome welcome-anime" v-if="content">
		<h2 class="welcomeTitle" :class="{ show: isShow }">{{ content.title }}</h2>
		<div class="welcomeSoild" :class="{ show: isShow }"></div>
		<span class="welcomeMessage" :class="{ show: isShow }">{{ content.message }}</span>
	</div>
</template>

<script>
export default {
	name: 'WelcomeInfo',
	props: {
		isShow: Boolean
	},
	data() {
		return {
			welcomes: [
				{ title: "歡迎", message: "立即註冊，開始在手機、平板與電腦上暢遊文字的世界，享受免費閱讀服務。" },
				{ title: "瀏覽", message: "隨時隨地探索熱門書單、新書上架，以及為你精選的主題閱讀專區。" },
				{ title: "搜尋", message: "正在找一本書、某位作家，或某個主題嗎？輕鬆搜尋，即刻閱讀。" },
				{ title: "你的書櫃", message: "將你喜歡的書收藏進個人書櫃，打造屬於自己的閱讀空間。" },
			],
			content: null
		};
	},
	mounted() {
		this.content = this.getRandomItem(this.welcomes);
	},
	methods: {
		getRandomItem(arr) {
			return arr[Math.floor(Math.random() * arr.length)];
		}
	}
};
</script>


<style scoped>
/* 歡迎標語 */
.welcome {
	font-family: '王翰宗粗鋼體';
	margin-top: 50px;
	user-select: none;

	/* 主題 */
	h2 {
		margin-bottom: 0;
		font-size: 44px;
		text-align: center;
	}

	/* 橫線 */
	.welcomeSoild {
		margin: 10px auto;
		height: 2px;
		width: 70%;
		background-color: var(--second-text-color);

	}

	/* 內容 */
	span {
		margin: 0 auto;
		width: 80%;

		font-size: 24px;
		text-align: justify;
	}
}

/* 【歡迎標語-動畫 (讓引用區淡入顯示，避免元素區塊一開始突兀出現展開) */
.welcome-anime {

	/* 標題先出現 */
	.welcomeTitle {
		/* 透明 */
		opacity: 0;
		/* 指定透明：淡入效果	ease:常見預設值，慢 - 快 - 慢 */
		transition: opacity 1s ease 0.5s;
	}

	/* 訊息再出來 */
	.welcomeMessage,
	.welcomeSoild {
		opacity: 0;
		transition: opacity 1s ease 1.5s;
	}

	/* JS加入的樣式，用以啟動上方動畫效果 */
	.show {
		/* 顯示 */
		opacity: 1;
	}

}

/* ========================================
   基本全局樣式（適用於所有設備）
   寫好的CSS貼在這區
======================================== */

/* 歡迎標語 */
.welcome {
	margin-top: 50px;

	/* 主題 */
	h2 {
		font-size: 44px;
	}

	/* 內容 */
	span {
		width: 80%;
		font-size: 24px;
	}
}




/* ========================================
   xxl: ≥ 1400px (大桌機、4K 螢幕)
   container 寬度: 1320px
======================================== */
@media (min-width: 1400px) {

	/* 歡迎標語 */
	.welcome {
		margin-top: 40px;

		/* 主題 */
		h2 {
			font-size: 60px;
		}

		/* 橫線 */
		.welcomeSoild {
			width: 360px;
		}

		/* 內容 */
		span {
			width: 440px;
			font-size: 30px;
		}
	}
}




/* ========================================
   xl: 1200px ~ 1399px (一般桌機)
   container 寬度: 1140px
======================================== */
@media (min-width: 1200px) and (max-width: 1399px) {

	/* 歡迎標語 */
	.welcome {
		margin-top: 50px;

		/* 主題 */
		h2 {
			font-size: 54px;
		}

		/* 橫線 */
		.welcomeSoild {
			width: 336px;
		}

		/* 內容 */
		span {
			width: 400px;
			font-size: 27px;
		}
	}
}




/* ========================================
   lg: 992px ~ 1199px (小型桌機、橫向大型平板)
   container 寬度: 960px
======================================== */
@media (min-width: 992px) and (max-width: 1199px) {

	/* 歡迎標語 */
	.welcome {
		margin-top: 66px;

		/* 主題 */
		h2 {
			font-size: 48px;
		}

		/* 橫線 */
		.welcomeSoild {
			width: 300px;
		}

		/* 內容 */
		span {
			width: 360px;
			font-size: 24px;
		}
	}
}




/* ========================================
   md: 768px ~ 991px (橫向 iPad、小型平板)
   container 寬度: 720px
======================================== */
@media (min-width: 768px) and (max-width: 991px) {

	/* 歡迎標語 */
	.welcome {
		margin-top: 36px;

		/* 主題 */
		h2 {
			font-size: 40px;
		}

		/* 橫線 */
		.welcomeSoild {
			width: 240px;
		}

		/* 內容 */
		span {
			width: 300px;
			font-size: 20px;
		}
	}
}




/* ========================================
   sm: 577px ~ 767px (大型手機、直向平板)
   container 寬度: 540px
======================================== */
@media (min-width: 577px) and (max-width: 767px) {

	/* 歡迎標語 */
	.welcome {
		margin-top: 36px;

		/* 主題 */
		h2 {
			font-size: 44px;
		}

		/* 橫線 */
		.welcomeSoild {
			width: 280px;
		}

		/* 內容 */
		span {
			width: 330px;
			font-size: 22px;
		}
	}
}




/* ========================================
   xs: ≤ 576px (手機)
   container 寬度: 100% (fluid)
======================================== */
@media (max-width: 576px) {

	/* 歡迎標語 */
	.welcome {
		margin-top: 30px;

		/* 主題 */
		h2 {
			font-size: 48px;
		}

		/* 橫線 */
		.welcomeSoild {
			width: 300px;
		}

		/* 內容 */
		span {
			width: 360px;
			font-size: 24px;
		}
	}
}
</style>

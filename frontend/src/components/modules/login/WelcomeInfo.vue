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
</style>

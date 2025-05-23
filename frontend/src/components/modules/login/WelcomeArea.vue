<template>
  <div class="col box-md-6 d-flex align-items-center justify-content-center">
    <div class="content-login content-left d-flex flex-column">
      <div class="title title-anime">
        <h1 :class="{ show: isShow }">{{ siteName }}</h1>
      </div>

      <WelcomeInfo :isShow="isShow" />
      <WelcomeQuote :isShow="isShow" />
    </div>
  </div>
</template>

<script>
import WelcomeInfo from '@/components/modules/login/WelcomeInfo.vue';
import WelcomeQuote from '@/components/modules/login/WelcomeQuote.vue';

export default {
  name: "WelcomeArea",
  components: {
    WelcomeInfo,
    WelcomeQuote
  },
  data() {
    return {
      siteName: "棲遲書屋",
      isShow: false
    };
  },
  mounted() {
    setTimeout(() => {
      this.isShow = true;
    }, 400);
  }
};
</script>


<style scoped>
  /* 棲遲書屋 */
	.title {
		text-align: center;
		transition: opacity 2s ease 2s; /* 延遲1秒後逐漸顯示，持續2秒 */

		h1{
			font-family: '王翰宗中行書';
			font-size: 90px;
		}
	}

	/* 當 h1 加上 show 類別時顯示 */
	.title-anime {
		h1 {
			/* 透明 */
			opacity: 0;
			/* 指定透明：淡入效果	ease:常見預設值，慢 - 快 - 慢 */
			transition: opacity .8s ease;
		}

		/* JS加入的樣式，用以啟動上方動畫效果 */
		.show {
			/* 顯示 */
			opacity: 1;
		}
	}
</style>
<template>
  <div class="col-sm-12 col-md-6 d-flex align-items-center justify-content-center">
    <div class="content page-login content-left d-flex flex-column">
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
/* ========================================
   基本全局樣式（適用於所有設備）
   寫好的CSS貼在這區
======================================== */

/* 棲遲書屋 */
.title {
  text-align: center;
  transition: opacity 2s ease 2s;
  /* 延遲1秒後逐漸顯示，持續2秒 */

  h1 {
    font-family: '王翰宗中行書';
    user-select: none;
  }
}

/* 棲遲書屋：動畫。
   當 h1 加上 show 類別時顯示 */
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




/* ========================================
   xxl: ≥ 1400px (大桌機、4K 螢幕)
   container 寬度: 1320px
======================================== */
@media (min-width: 1400px) {

  /* 棲遲書屋 */
  .title {
    h1 {
      font-size: 120px;
    }
  }
}




/* ========================================
   xl: 1200px ~ 1399px (一般桌機)
   container 寬度: 1140px
======================================== */
@media (min-width: 1200px) and (max-width: 1399px) {
  /* 棲遲書屋 */
  .title {
    h1 {
      font-size: 108px;
    }
  }
}




/* ========================================
   lg: 992px ~ 1199px (小型桌機、橫向大型平板)
   container 寬度: 960px
======================================== */
@media (min-width: 992px) and (max-width: 1199px) {
  /* 棲遲書屋 */
  .title {
    h1 {
      font-size: 96px;
    }
  }
}




/* ========================================
   md: 768px ~ 991px (橫向 iPad、小型平板)
   container 寬度: 720px
======================================== */
@media (min-width: 768px) and (max-width: 991px) {
  /* 棲遲書屋 */
  .title {
    h1 {
      font-size: 80px;
    }
  }
}




/* ========================================
   sm: 577px ~ 767px (大型手機、直向平板)
   container 寬度: 540px
======================================== */
@media (min-width: 577px) and (max-width: 767px) {
  /* 棲遲書屋 */
  .title {
    h1 {
      font-size: 88px;
    }
  }
}




/* ========================================
   xs: ≤ 576px (手機)
   container 寬度: 100% (fluid)
======================================== */
@media (max-width: 576px) {
  /* 棲遲書屋 */
  .title {
    h1 {
      font-size: 96px;
    }
  }
}
</style>
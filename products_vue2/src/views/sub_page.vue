<template>
  <div class="container">
    <div class="row">
      <!-- 分類導覽nav -->
      <sub_nav class="col-sm-2" />
      <div class="col-sm-10">
        <!-- 放輪播 -->
        <!-- 放跑馬燈 -->
        <!-- 放商品格子 格子收到了category跟他回傳了select-isbn(我的這個isbn_id被使用者按下了!)-->
        <sub_block :category="sub" @select_isbn="getIsbn" />
      </div>
    </div>
  </div>
</template>
<script>
// import block from '@/components/book_block.vue'
import sub_nav from "@/components/sub_nav.vue";
import sub_block from "@/components/sub_block.vue";

// 輸出到外面
export default {
  name: "sub_page",
  props: ["sub"],
  components: { sub_nav, sub_block },
  mounted() {
    document.title = this.sub || "分類";
  },
  methods: {
    getIsbn(isbn) {
      //取到這個isbn了我要跳轉到isbn頁! -->現在的路由要改成...
      this.$router.push(`/book/${encodeURIComponent(isbn)}`);
    },
  },
};
</script>
<style scoped>
/* 不論是nav、block都有用到的 */
* {
  margin: 0;
  padding: 0;
  list-style: none;
}
a:hover,
a {
  text-decoration: none;
}
/* 設定寬度跟置中 */
.container {
  margin: 0 auto;
  width: 1400px;
}

/* 跑馬燈 */
/* 宣告動畫marquee */
@keyframes marquee {
  /* 從x軸0的地方跑到-50%的地方 */
  from {
    transform: translateX(0);
  }
  to {
    transform: translateX(-50%);
  }
}
.marquee {
  width: 100%;
  overflow: hidden; /* 自動隱藏超出的文字或圖片 */
}
.marquee .scroll {
  /* 寬度等於內容最大寬度，表示內容固有的最大的寬度或高度->text就算會溢出（overflow）也不會換行。 */
  width: max-content;
  display: flex;
  /* font-weight: 100; */
  font-family: "標楷體";
  /* 線性持續10秒的動畫 */
  animation: marquee 10s linear infinite;
}
.mqItem {
  font-size: 5em; /*em:相對長度單位。 若在一個沒有設定 font-size 的「元素」上則會繼承「父元素」的 font-size 屬性值*/
  color: hsl(353, 100%, 29.2%);
  display: flex;
  align-items: center; /*垂直對齊*/
  flex-shrink: 0; /*flex-shrink 尚未進行設定時，會按照數字「壓縮」比例分配。0為不被壓縮。*/
  white-space: nowrap; /*遇到連續空白字元與換行字元時，會合併成一個空白字元，不論外層有沒有容器都強制不換行。 詳情->https://vocus.cc/article/64804d00fd89780001db397d*/
}
.scroll .second {
  animation-delay: -5s;
} /*提前五秒開始做*/
/*hover就暫停動畫*/
.marquee:hover .scroll {
  animation-play-state: paused;
}
/* 跑馬燈結束 */

/* 改尺寸 */
/* 659~577 */
@media (min-width: 577px) and (max-width: 670px) {
  /* 分類頁的作者跟價格 */
  .PandChartBtn {
    flex-direction: column;
    margin: 0px auto;
  }
  .PandChartBtn h3 {
    font-size: 20px;
    margin-bottom: 0px;
  }
  .PandChartBtn button {
    width: 100%;
    border-radius: 0px;
  }
  /* 小圖區 */
  .col3 {
    margin: 0 auto;
    height: 370px;
    width: 150px;
  }
  .PandChartBtn {
    margin-top: auto;
  }
  /* 商品頁 */
  #card-1 {
    display: flex;
    flex-direction: column;
  }
  #card_spe {
    width: 100%;
  }
  #card_del {
    width: 100%;
  }
}
/* 中尺寸 */
@media (min-width: 670px) and (max-width: 992px) {
  /* 分類頁的作者跟價格 */
  /* 書名超連結 */
  .smProduct span {
    font-size: 23px;
  }
  /* 價格 */
  .PandChartBtn {
    align-items: end;
  }
  .PandChartBtn h3 {
    font-size: 22px;
  }
  .PandChartBtn button {
    width: 110px;
  }
  /* 小圖區 */
  .col3 {
    margin: 10px auto;
    padding: 0 2px;
    width: 190px;
    height: 360px;
  }
  /* 細項的li整體往左移 */
  /* .subA {margin-left: -20px;} */
}

/* 小尺寸 */
@media (max-width: 577px) {
  .container {
    margin: 0 auto;
    width: 100%;
  }
  /* 分類頁的作者跟價格 */
  .PandChartBtn {
    flex-direction: column;
  }
  /* 價格 */
  .PandChartBtn h3 {
    font-size: 25px;
    margin-bottom: 0px;
  }
  .PandChartBtn button {
    width: 100%;
    border-radius: 0px;
  }
  /* 小圖區 */
  .col3 {
    margin: 10px auto;
    padding: 0 15px;
    width: 170px;
    height: 330px;
  }
  .smProduct span {
    font-size: 23px;
  }
  /* 商品頁 */
  #card-1 {
    display: flex;
    flex-direction: column;
  }
  #card_spe {
    width: 100%;
  }
  #card_del {
    width: 100%;
  }
}

/*  */
</style>

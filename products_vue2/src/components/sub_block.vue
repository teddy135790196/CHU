<template>
  <div class="row smProduct" v-if="books.length > 0">
  
   <!-- <img v-lazy="'/images/_exist.jpg'" /> -->
  
    
    <!-- 單個商品圖版型 -->

    <div class="col3" v-for="n in books" v-bind:key="n.ISBN_id" >
      <a @click="n.ISBN_id"
        >
        <div class="container-fluid">
          <img class="lazy-img" v-lazy="n.imgUrl" :alt="n.name" />
        </div>
        <!-- 若書名超過15則會... -->
        <div v-if="n.name.length > 15">
          <h4>
            <span>{{ n.name.slice(0, 15) }}...</span>
          </h4>
        </div>
        <div v-else>
          <h4>
            <span>{{ n.name }}</span>
          </h4>
        </div>
      </a>
      <a href="#" class="authorColor">
        <!-- 若作者超過20就:用三元運算寫 -->
        {{ n.author.length > 17 ? n.author.slice(0, 17) + "..." : n.author }}</a
      >
      <div class="PandChartBtn">
        <i>
          <h3><small>$</small>{{ intPrice(n.price) }}</h3> </i
        ><button>加入購物車</button>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      data: null,
      books: [],
      total: null
    };
  },
  props: ["category"], //子元件，等待父傳資料
  $emit:["isbn"],
  mounted(){this.fetchData();}, // 元件進來時也要抓一次資料
  watch: {
    // 當分類變了就重新查詢
    category() {
      //<-每次變動都要重新抓資料
      this.fetchData();
    },
  },
  methods: {
    // 抓網址內資料
    async fetchData() {
      try {
        const baseUrl = "http://localhost:3000/books";
        let url = baseUrl;
        if (this.category) {
          url += `/${encodeURIComponent(this.category)}?page=${this.page}`;
        }
        const response = await fetch(url);
        // 檢查是否為 HTTP 200～299
        if (!response.ok) {
          throw new Error(`HTTP 錯誤：${response.status}`);
        }

        this.data = await response.json();
        //取出一個個
        this.books = this.data.books || this.data; //如果是分類查詢，取 .books；否則取全體
      //  確認total有沒有值，首頁沒有值->total=null
      if(this.data.total!==undefined){
        this.total = this.data.total;}
      else{this.total=null;}
      } catch (error) {
        console.error("失敗內容:", error);
        this.books = [];
        this.total = 0;
      }
    },
    // 將小數點無條件捨去的函數
    intPrice(price) {
      return Math.floor(price);
    }
  }
};
</script>
<style scoped>
/* 分類頁的作者跟價格 */
.col3 {
  /* border: 1px black solid; */
  display: flex;
  flex-direction: column;
  width: 200px;
  height: 390px;
  margin: 10px auto;
  padding: 0 auto;
}
.authorColor {
  color: hsl(36, 50.7%, 50%);
  transition: all 0.55s;
}
.authorColor:hover {
  color: hsl(38, 74%, 24%);
}
.PandChartBtn {
  margin-top: auto;
  display: flex;
  justify-content: space-between;
  align-items: end; /* 垂直置中 */
}
/* 分類頁的價格 */
.PandChartBtn h3 {
  font-weight: bold;
  font-family: "標楷體";
  color: hsl(353, 100%, 29.2%);
  transition: all 1s;
}
/* 分類頁的加入購物車按鈕 */
.PandChartBtn button {
  color: white;
  background-color: hsl(36, 50.7%, 71.4%);
  border: none;
  padding: 10px 15px;
  border-radius: 20px;
  transition: all 0.7s;
}
.PandChartBtn button:hover {
  background-color: hsl(353, 100%, 29.2%);
}
/*  */

/* 商品小圖 */
.smProduct img {
  /* width: 150px; */
  width: 100%;
  margin: 15px auto;
  transition: all 0.5s;
}
.smProduct {
  margin-bottom: 50px;
  padding: 30px;
}

/* 書名超連結 */
.smProduct span {
  color: rgb(34, 34, 34);
  padding-bottom: 10px;
  display: inline-block;
  transition: all 0.55s;
}
.smProduct a:hover span {
  color: hsl(353, 100%, 29.2%);
}
.smProduct h4 span{font-size: 20px;}
/* 動態產生線 */
.smProduct h4::after {
  background-color: hsl(353, 100%, 29.2%);
  content: "";
  display: block;
  width: 30%;
  height: 2px;
  transition: all 0.4s;
}
.smProduct a:hover h4::after {
  width: 100%;
}

/* 滑到變圓角，可惜手機不能有 */
.smProduct a:hover img {
  scale: 1.03;
  border-radius: 20px;
  z-index: 2;
}

</style>

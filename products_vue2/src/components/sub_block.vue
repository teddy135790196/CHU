<template>
  <div class="row smProduct" v-if="books.length > 0">
  
   <!-- <img v-lazy="'/images/_exist.jpg'" /> -->
  
    
    <!-- 單個商品圖版型 -->

    <div class="col3" v-for="n in books" v-bind:key="n.ISBN_id">
      <a
        ><!-- v-bind:href="n.url || '#'" -->
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
      total: null,
    };
  },
  props: ["category"], //子元件，等待父傳資料
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

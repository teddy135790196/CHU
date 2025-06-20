<template>
  <div class="row smProduct">
    <h2>共{{ books.length }}本書</h2>
    <!-- 單個商品圖版型 -->

    <div v-for="n in books" v-bind:key="n.ISBN_id">
      <div id="block" class="col_d" @click="goToDetail(n.ISBN_id)">
        <!-- 點擊就觸發 -->
        <div class="block_img">
          <img class="lazy-img" v-lazy="n.imgUrl" :alt="n.name" />
        </div>
        <div class="context">
          <h4>
            <span>{{ n.name }}</span>
            <span v-if="n.hit > 5">
              <abbr title="多人查看"> <i class="fa-solid fa-fire"></i></abbr>
            </span>
            <span v-if="n.award">
              <abbr :title="n.award"> <i class="fa-solid fa-award"></i></abbr>
            </span>
          </h4>
          <author_a :name="n.author" class="authorColor"> {{ n.author }}</author_a>
          <p>{{ n.description.slice(0, 80) }}...</p>
          <div class="PandChartBtn">
            <i>
              <h3><small>$</small>{{ intPrice(n.price) }}</h3>
            </i>
            <!-- <i @click="putInCart(n.ISBN_id)" class="fa-solid fa-heart"></i> -->
            <i class="fa-solid fa-heart"></i>
            <div>
              <button @click="putInCart(n.ISBN_id)">加入購物車</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import author_a from "./authorA.vue";
export default {
  components: { author_a },
  data() {
    return {
      data: null,
      books: [],
    };
  },

  mounted() {
    this.fetchData();
  }, // 元件進來時也要抓一次資料
  /**/
  watch: {
    "$route.query.q": "fetchData",
    "$route.query.scope": "fetchData",
    "$route.params.name": "fetchData"
  },
  methods: {
    //函數庫
    // 抓網址內資料 的自訂函數
    async fetchData() {
      try {
        // 抓路由的查詢參數 ?q=關鍵字 &scope=欄位
        const q = this.$route.query.q;
        const scope = this.$route.query.scope;
        // 抓路由的路徑 /:name
        const authorName = this.$route.params.name;
        let url = "/api/products/";

        // http://localhost:3000/api/products/search/con=author&kw=關鍵字
        //http://localhost:3000/api/products/author/作者
        
        // 搜尋
        if (q || scope) {
          url += `search/con=${encodeURIComponent(scope)}&kw=${encodeURIComponent(q)}`;
          console.log("抓取的網址:", url);
          const response = await this.$axios.get(url);
          this.data = response.data;
        this.books = this.data.books;
        }
        else if (this.$route.name === 'author' && authorName) { //抓作者頁
          // this.$route.name是路由的路徑名稱(就是那個path:,name:...中的name)
          url += `author/${encodeURIComponent(authorName)}`;
          console.log("抓取的網址:", url);
          const response = await this.$axios.get(url);this.data = response.data || {};
        this.books = Array.isArray(this.data.books) ? this.data.books : [];
        //取下作者的姓名、簡介並傳到page
        if(this.books.length>0){
          this.$emit('author_info',{
            name:this.book[0].author,
            introduce:this.books[0].introduce
          });
        }
        }

        
        

        // this.total = this.data.total;
      } catch (error) {
        console.error("失敗內容:", error);
        this.books = [];
      }
    },
    // 將小數點無條件捨去的函數
    intPrice(price) {
      return Math.floor(price);
    },
    //抓到按下的this的ISBN_id
    goToDetail(ISBN_id) {
      // div回傳的資料
      this.$emit("select_isbn", ISBN_id); //通知父元件
    },
    putInCart(ISBN_id) {
      // 加入購物車回傳的資料
      this.$emit("buy_isbn", ISBN_id); //通知父元件

      // 新增：直接加入購物車功能
      const bookData = this.books.find(book => book.ISBN_id === ISBN_id);
      if (bookData) {
        this.addToCart(bookData);
      }
    },

    addToCart(book) {
      // 從 localStorage 讀取現有購物車
      let cartItems = JSON.parse(localStorage.getItem("cartItems") || "[]");

      // 檢查商品是否已存在購物車中
      const existingItemIndex = cartItems.findIndex(item => item.id === book.ISBN_id);

      if (existingItemIndex > -1) {
        // 如果已存在，增加數量
        cartItems[existingItemIndex].count++;
        alert("商品數量已增加！");
      } else {
        // 如果不存在，添加新商品
        const cartItem = {
          id: book.ISBN_id,
          itemName: book.name,
          price: book.price,
          count: 1,
          imgUrl: book.imgUrl || "https://via.placeholder.com/100x100?text=書籍封面",
        };
        cartItems.push(cartItem);
        alert("商品已加入購物車！");
      }

      // 保存到 localStorage
      localStorage.setItem("cartItems", JSON.stringify(cartItems));

      // 觸發 storage 事件來更新其他組件（如導航欄的購物車數量）
      window.dispatchEvent(new Event("storage"));
    },
  },
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

.smProduct>div {
  padding: 0px;
}

.context {
  margin: auto;
  padding: 20px;
  width: 300px;
}

.block_img {
  margin: auto;
  width: 300px;
}

@media (min-width: 576px) {
  .col_d {
    display: flex;
  }

  .context {
    width: 60%;
  }
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
  align-items: end;
  /* 垂直置中 */
}

@media (min-width: 576px) {
  .PandChartBtn {
    width: 270px;
  }
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
  margin-left: 20px;
}

.PandChartBtn button:hover {
  background-color: hsl(353, 100%, 29.2%);
}

/* 加入收藏 */
.fa-heart {
  /* margin: 0 40px; */
  padding: 10px;
  color: indianred;
  border: 1px solid hsl(353, 100%, 29.2%);
  border-radius: 50%;
}

.fa-heart:hover {
  color: hsl(353, 100%, 29.2%);
}

/* 商品小圖 */
.smProduct img {
  /* width: 150px; */
  width: 100%;
  /* padding: 40px; */
  transition: all 0.5s;
}

@media (min-width: 768px) {
  .smProduct img {
    padding: 40px;
  }
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

#block:hover span {
  color: hsl(353, 100%, 29.2%);
}

#block:hover {
  background-color: hsla(36, 51%, 71%, 0.45);
}

.smProduct h4 span {
  font-size: 20px;
}

/* 動態產生線 */
.smProduct h4::after {
  background-color: hsl(353, 100%, 29.2%);
  content: "";
  display: block;
  width: 30%;
  height: 2px;
  transition: all 0.4s;
}

#block:hover h4::after {
  width: 100%;
}

/* 滑到變圓角，可惜手機不能有 */
#block:hover img {
  scale: 1.03;
  border-radius: 60px;
}
</style>

<template>
  <div>
    <div v-for="n in book" :key="n.ISBN_id">
    <div class="row">
      <!-- 商品圖 -->
      <div class="col-md-6">
        <div class="prodP">
          <img :src="n.imgUrl" alt="n.name" />
        </div>
      </div>
      <!-- 再從6裡切作者資訊跟價格 -->
      <div class="col-md-6" >
        <h1 class="bookTitle">{{ n.name }} <span v-if="n.hit>5">
        <abbr title="多人查看"> <i class="fa-solid fa-fire"></i></abbr>
        </span></h1>
        <hr />
        <div class="row prodFlex">
          <div>
            <ul>
              <li>作者/ <a href="#">{{ n.author }}</a></li>
              <li>系列/ <a href="#">{{ n.series }}</a></li>
              <li>出版社/ <a href="">{{n.publisher}}</a></li>
              <li>出版日期/ {{n.created_at.slice(0,10)}}</li>

              <li>庫存狀態/
                <span v-if="n.stock>0" class="Stock">有貨</span>
              <span v-else class="Stock">缺貨</span></li>
            </ul>
          </div>
          <div>
            <h2 class="price">${{ n.price }}</h2>
          </div>
        </div>
        <hr />
        <!-- 內文說明 -->
        <div class="describe"><p>{{n.description}}</p>
        </div>
      </div>
    </div>
    <hr />
    <!-- 卡片 -->
    <div id="card-1">
      <!-- 1 -->
      <div class="card" id="card_spe">
        <div class="card-header">
          <a class="card-link" data-toggle="collapse" data-parent="#card-1" href="#card-element-2">商品規格▼</a>
        </div>
        <div id="card-element-2" class="collapse show">
          <div class="card-body">
            <p><span>ISBN：</span>{{n.ISBN_id}}</p>
            <p><span>頁數：</span>{{ n.page }}</p>
            <p><span>出版類型：</span>{{n.pub_type}}</p>
            <p><span>分類：</span>{{n.major_category}}</p>
            <p><span>分類細項：</span>{{ n.minor_category }}</p>
            <p><span>語言：</span>{{ n.original_language }}</p>
          </div>
        </div>
      </div>

      <!-- 3 -->
      <div class="card" id="card_del">
        <div class="card-header">
          <a class="collapsed card-link" data-toggle="collapse" data-parent="#card-1" href="#card-element-3">
            運送與售後▼</a>
        </div>
        <div id="card-element-3" class="collapse">
          <div class="card-body">
            <dl>
              <dt>配送範圍</dt>
              <dd>
                -前僅提供台灣本島地區配送服務，外島及海外地區暫不開放配送，敬請見諒。
              </dd>
              <dt>出貨時間</dt>
              <dd>
                -訂單確認後一般於 1–3
                個工作天內出貨（不含例假日與國定假日）。<br />
                -如遇特殊促銷或物流旺季，出貨時間可能延長，還請耐心等候。
              </dd>
              <dt>配送方式與時間</dt>
              <dd>
                -我們採用合作物流夥伴配送，配送時間依各地區及物流狀況而異，通常於出貨後
                1–3 天送達。
              </dd>
              <dt>訂單查詢</dt>
              <dd>
                -出貨後將以電子郵件通知物流單號，您可透過該單號查詢配送進度。<br />-如未收到通知信，請先檢查垃圾郵件匣，或聯絡客服協助處理。
              </dd>
              <dt>退換貨說明</dt>
              <dd>
                -若收到商品有破損、缺頁、印刷錯誤等情況，請於收到商品 7
                天內聯絡我們，提供照片及訂單資訊，我們將盡快為您處理退換貨。<br />-退換貨僅限商品本身有瑕疵，恕不接受因個人因素（如不喜歡內容）申請退貨。
              </dd>
              <dt>客服聯絡方式</dt>
              <dd>
                -如有任何問題，歡迎透過客服信箱或網站聯絡表單與我們聯繫，我們將儘速回覆您。
              </dd>
            </dl>
          </div>
        </div>
      </div>
    </div>
  </div>
  </div>
</template>
<script>
// import
export default {
  data() { return { data: null, book: [] } },
  props: ["isbn"],
  mounted() { 
    if(this.isbn){this.fetchData();}
   },//有值才開始
  // 先監聽看有沒有數值
  watch: {
  isbn(newVal) {
    if (newVal) {
      this.fetchData();
    }
  }
},
  methods: {
    async fetchData() {
      try {
        // const baseUrl = "http://localhost:3000";
        // let url = baseUrl + "/api/products/book";
        let url = "/api/products/book";
        url += `/${encodeURIComponent(this.isbn)}`;
        // const response = await fetch(url);
        const response = await this.$axios.get(url);
        // 檢查是否為 HTTP 200～299(改成 axios 之後，就 不需要再判斷 response.ok，否則會誤判！)
        // if (!response.ok) {
        //   throw new Error(`HTTP 錯誤：${response.status}`);
        // }
        // this.data = await response.json();
        this.data = response.data;
        // 取出一個個
        this.book=this.data.book;


      } catch (error) {
        console.error("失敗內容:", error);
        this.book = [];
       }
    },
    // 將小數點無條件捨去的函數
    intPrice(price) {
      return Math.floor(price);
    }

  }


};
</script>
<!-- css -->
<style scoped>
* {
  margin: 0;
  padding: 0;
  list-style: none;
}

a:hover,
a {
  text-decoration: none;
}
/* 商品頁 */
span{color: hsl(36, 50.7%, 50%);}
/* 產品頁面 */
.prodP {
  margin: 0 auto;
}

.prodP img {
  width: 100%;
}

.prodFlex {
  display: flex;
  justify-content: space-around;
}

/* 書標題 */
.bookTitle {
  margin-bottom: 12px;
  /* border-bottom: 1px solid black; */
}

/* 價格 */
.price {
  font-weight: bold;
  color: white;
  background-color: hsl(36, 50.7%, 50%);
  padding: 15px 45px;
  border-radius: 0px 30px;
  margin-top: 40px;
}

/* 庫存 */
.Stock {
  color: hsl(353, 100%, 29.2%);
  font-weight: bold;
  font-size: 20px;
}

/* 商品頁的作者跟出版商 */
.prodFlex {
  font-size: 20px;
}
/* +商品頁的內文描述+卡片裡的dt小標 */
.prodFlex a,.card-body dt{
  color: hsl(353, 100%, 29.2%);
}
/* .fa-fire {
  color: hsla(36, 51%, 50%, 0.654);

} */
.describe{
  margin-top: 30px;
}
 

/* 商品頁的商品規格 */
#card-1 {
  display: flex;
  justify-content: space-around;
}

#card_spe {
  width: 700px;
}

#card_del {
  width: 1250px;
}

.card a {
  font-size: 20px;
  color: white;
}

.card-header {
  background-color: hsl(353, 100%, 29.2%);
}

.card-body {
  margin: 10px 30px;
}



/* 你可能會喜歡_小圖區 */
.MaybeLike {
  padding: 10px 0;
}

.page-header {
  background-color: rgba(165, 42, 42, 0.77);
  padding: 10px 0;
}

.txtMaybeLike {
  color: white;
  margin: 12px;
}

.txtMaybeLike i {
  color: rgba(165, 42, 42, 0.77);
  border-bottom: 1px rgba(165, 42, 42, 0.77) solid;
}

</style>

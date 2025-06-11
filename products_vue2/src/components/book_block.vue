<template>
            <div class="row smProduct" v-if="novels.length>0">
              <!-- 單個商品圖版型 -->

              <div class="col3" v-for="n in novels" v-bind:key="n.ISBN_id">
                <a v-bind:href="n.url||'#'">
                  <div class="container-fluid">
                    <!-- 注意圖片網址要綁data-src ，原本是v-bind:src="n.imgUrl"-->
                    <img class="lazy-load-image" v-bind:data-src="n.imgUrl"
                      src="https://images.plurk.com/GzgdRIhMnbmDrtsBlbANQ.jpg" alt="n.name" />
                  </div>
                  <!-- 若書名超過15則會... -->
                  <div v-if="n.name.length>15">
                    <h4><span>{{n.name.slice(0,15)}}...</span></h4>
                  </div>
                  <div v-else>
                    <h4><span>{{n.name}}</span></h4>
                  </div>
                </a>
                <a href="#" class="authorColor">
                  <!-- 若作者超過20就:用三元運算寫 -->
                  {{ n.author.length>17 ? n.author.slice(0, 17)+'...' :
                  n.author }}</a>
                <div class="PandChartBtn">
                  <i>
                    <h3><small>$</small>{{intPrice(n.price)}}</h3>
                  </i><button>加入購物車</button>
                </div>
              </div>
            </div>
</template>
<script>
export default{
  data() {
    return {data:null,novels:[]};
  },
  mounted() {
    //先取得C料庫資料，等取值完後再把現在顯示資料等於過去
    this.fetchData().then(() => {
      // 輸入資料要啟用initLazyLoadImages函式
      // this.initLazyLoadImages(); <--太快就出現了需要等vue渲染完再開始
      this.$nextTick(() => { //等畫面（DOM）更新完成後，再執行裡面的程式
      this.initLazyLoadImages(); // ✅ 保證圖片出現後才監聽
    });
    });
  },
  methods: {
    // 抓網址內資料
    async fetchData() {

      const response  =await fetch("http://localhost:3000/products");
      this.data =await response .json();
      //取出一個個
      this.novels=this.data
    },
    // 延遲顯示
    initLazyLoadImages() {
      // 檢查瀏覽器是否支援 Intersection Observer
      if ("IntersectionObserver" in window) {
        const observer = new IntersectionObserver(
          //entries是被監控的所有元素
          (entries, observer) => {
            entries.forEach((entry) => {
              //如果監控的元素已經進入視窗
              if (entry.isIntersecting) {
                const img = entry.target;
                // 當圖片進入視窗時，將 data-src 的值賦給 src
                img.src = img.dataset.src;
                // 載入後移除 class 或執行其他操作（例如移除監聽）
                img.classList.remove("lazy-load-image"); // 移除 class
                observer.unobserve(img); // 停止監聽已載入的圖片
              }
            });
          },
          {
            rootMargin: "0px 0px 100px 0px", // 圖片進入視窗下方 100px 時就開始載入
          }
        );

        const lazyImages = document.querySelectorAll(".lazy-load-image");
        lazyImages.forEach((img) => {
          observer.observe(img); // 開始監聽每張.lazy-load-image圖片
        });
      } else {
        // 如果瀏覽器不支援 Intersection Observer，則回退到一次性載入所有圖片
        console.warn(
          "Intersection Observer is not supported, all images will be loaded immediately."
        );
        const lazyImages = document.querySelectorAll(".lazy-load-image");
        lazyImages.forEach((img) => {
          img.src = img.dataset.src;
          img.classList.remove("lazy-load-image");
        });
      }
    },
    // 將小數點無條件捨去的函數
    intPrice(price){
        return Math.floor(price);
    }
  }
};
</script>
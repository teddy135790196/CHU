//
const allBooks = new Vue({
  el: "#app",
  data() {
    return {
      ob: [],
      novels: [],
    };
  },
  mounted() {
    //先取得CSV資料庫資料，等取值完後再把現在顯示資料等於過去
    this.fetchData().then(() => {
      this.novels = this.ob;
      // 輸入資料要啟用initLazyLoadImages函式
      this.initLazyLoadImages();
    });
  },
  methods: {
    async fetchData() {
      const response = await fetch("./書本表3.csv");
      //  等解碼後再取資料吧-->移至最後
      // const responseData = await response.text();

      // 編碼判斷
      // 取得該csv的二進位資料
      const csvBinary = await response.arrayBuffer(); //取二進位資料，因為text會預設是utf8，這個則是原封不動的資料
      const byte = new Uint8Array(csvBinary); //從二進位資料裡拿出一個個

      // 檢查 BOM：判斷是否為 UTF-16LE、UTF-16BE、還是預設為 UTF-8
      let encoding = "utf-8"; // 預設
      //判斷是否是utf16
      if (byte[0] === 0xff && byte[1] === 0xfe) {
        encoding = "utf-16le";
      } else if (byte[0] === 0xfe && byte[1] === 0xff) {
        encoding = "utf-16be";
      } //PapaParse 不支援be，要自己反轉

      // 解碼
      const decoder = new TextDecoder(encoding); //用什麼解碼
      const responseData = decoder.decode(csvBinary);
      const parsed = Papa.parse(responseData, {
        header: false, //但我沒有欄位就改false
        skipEmptyLines: true, // 跳過空行
        delimiter: "^", //欄位分割符號
      });
      this.ob = parsed.data.map((row) => ({
        ISBN: row[0],
        name: row[5],
        author: row[6],
        price: row[11],
        imgUrl: row[13],
      }));
      // console.log(this.ob);
      // console.log(window.location.href);
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
    }
  }
});

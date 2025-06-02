"use strict"; //使用嚴格模式

const {createApp} = Vue;
createApp({
  data() {
    return {
      //推薦書籍編號
      isbns: [
        "999-000-519277-8",
        "999-000-888953-2",
        "999-000-603288-4",
        "999-000-660896-1",
        "999-000-057849-7",
        "999-000-670585-1",
        "999-000-981099-0",
        "999-000-409906-0",
        "999-000-298283-5",
        "999-000-568782-2",
        " 999-000-678901-2",
        "999-000-012345-6",
      ],
      originBooks: null, //所有書籍
      currentBooks: [], //現在顯示書籍
      currentIndex: -1, //書籍詳細內容需要的id
      searchValue: "",
      selectedField: "",
      showPopup: false, //是否顯示彈出視窗
      interval: null, //輪播計時器
      carouselIndex: 0, //輪播圖片id
      carouselUrl: [
        "https://lh3.googleusercontent.com/pw/AP1GczOD0O5aJr_3w2Hg0mEYeC7BO20PMazSANcR24Pk2ODmMWSA9e2cnwOKVNs1H7iqnpr5Ml2tlhU6I8MomNn4x_BNuznQ-q1o7HyfmZV8AzavB9MlPvwTnHzVUFFXEwK6P5Fl7QGzvwYops_dr2iHHrmc=w1024-h528-s-no-gm?authuser=0",
        "https://lh3.googleusercontent.com/pw/AP1GczOcgbypEEZMW5nKDjl178V3MvVKQk1Z3TtDrEL6iPzEf20rn5cPYXVQ2pvB1sIdTA5TDwYjWwzV_0IUZ-VnqPNSd2GbP28d49xK0HhcS3Y-iO33esHSCFdFpfYmsWvtZjYxUoU4jtM85Szr-zryq13Z=w1013-h754-s-no-gm?authuser=0",
        "https://lh3.googleusercontent.com/pw/AP1GczObW6R8ISPk64-E_yQU1WE8mxfR48Y-gXrXxdJLxNjdsRRjdgfI9mkVQxFzx7jEhegubH6z3W6CG_ONIpCvDQAyz0LK00sXG0vKkkn5J0KkqTDOR2kb81NaFDIUuY0EPTIlocZlxEvHTwYvz826Lb4M=w1334-h890-s-no-gm?authuser=0",
        "https://lh3.googleusercontent.com/pw/AP1GczNzDAevB84GaSI0bRBIPvp0R89Dp-Bx0hGAsy87c74E8x54EqjUFL8M_MvtQRk0MtK6AdC4PkbKyKuRmMsHkqFWA2zAVd_tZJO3Y0Jhbnr327wVNXGPtaJXccoruain-JRVH0ssC609JsdkeJK01qzX=w664-h666-s-no-gm?authuser=0",
        "https://lh3.googleusercontent.com/pw/AP1GczO4U6XUxknnXgg-SvguLKJhuj6Pg6lwmucu-PI5cDSKc3N0gM7bE1BI-qOrP0QvA5JjymOiSVQ3wwScsToeJHf_kuwLHdKjIuFPfz1L1iV2Yhu_Wf0dhzPkre_568h6KOWM1zpHLRFMLScTCUjLvriG=w890-h890-s-no-gm?authuser=0",
      ],
      carouselAlt: ["紅樓夢推廣", "三國演義推廣", "AI淘汰人類推廣", "經典文學特展", "少年隊防詐騙"],
      slide: "slideLeft", //動畫方向
      broadcastIndex: 0,
      broadcastImagesUrl: [
        "https://lh3.googleusercontent.com/pw/AP1GczOaiGsYBM0zrSoiqgWZX-FsslrsHg6mNiB42OImZlQJzX91DbZLtNXQK0-YYctsdU1Kx1V095rf3N2jLDOZSUktk8jts-JnXxJJBtKihGY89UI-HnZ0EpT0Eojw2I-TbSfuMgW9GuXJVMbPNoXt-_s_=w647-h649-s-no-gm?authuser=0",
        "https://lh3.googleusercontent.com/pw/AP1GczNrkAjLCL7S9Jgvc7QS1NiGjCGU_Aq89od3qMwCgFbOWS5G6PcyksFULhn2gwb_-n0dyqIbSSweu7F5KG_l4Ddp1bcOOH6c8YTIIhKLaItxzCbi0SYoVcEspB0MCDw1byYx3kEEI1bT4pUUg0lnGDxQ=w641-h642-s-no-gm?authuser=0",
      ],
      broadcastImagesAlt: ["浴佛節推廣活動", "植樹節推廣活動"],
    };
  },

  mounted() {
    //先取得CSV資料庫資料，等取值完後再把現在顯示資料等於過去
    this.fetchData().then(() => {
      for (let i = 0; i < this.originBooks.length; i++) {
        for (let isbn of this.isbns) {
          if (this.originBooks[i]["ISBN"].includes(isbn)) {
            this.currentBooks.push(this.originBooks[i]);
          }
        }
      }
    });

    this.isChange(true);

    // 在 mounted 鉤子中初始化圖片延遲載入
    this.initLazyLoadImages();
  },

  methods: {
    async fetchData() {
      const response = await fetch("bookTable.csv");
      const responseData = await response.text();
      this.originBooks = Papa.parse(responseData, {
        header: true, // 設定為 true 以轉換為物件格式
        skipEmptyLines: true, // 跳過空行
      }).data;
    },

    //依照欄位名稱和值找出書籍，欄位名稱和值都不寫那就顯示全書目，沒有欄位名稱就搜尋全書目
    findBookByCondition(fields, queryValue) {
      let queryBooks = [];
      for (let i = 0; i < this.originBooks.length; i++) {
        if (fields === "" && queryValue === "") {
          queryBooks.push(this.originBooks[i]);
        } else if (fields === "") {
          //無欄位名，搜尋所有欄位
          //匿名函式，some歷遍物件，查看所有值是否符合自訂條件
          if (Object.values(this.originBooks[i]).some(value => value.includes(queryValue))) {
            queryBooks.push(this.originBooks[i]);
          }
          //有欄位名，搜尋該欄位
        } else if (this.originBooks[i][fields].includes(queryValue)) {
          queryBooks.push(this.originBooks[i]);
        }
      }

      this.currentBooks = queryBooks;
      this.currentIndex = -1; //重設currentIndex
    },

    isChange(changeOrNot) {
      if (changeOrNot) {
        this.interval = setInterval(() => {
          this.carouselIndex++;
          if (this.carouselIndex === 5) {
            this.carouselIndex = 0;
          }

          this.broadcastIndex++;
          if (this.broadcastIndex === 2) {
            this.broadcastIndex = 0;
          }
          // 對於自動輪播，通常希望有統一的滑動方向
          this.slide = "slideLeft";
        }, 5000);
      } else {
        clearInterval(this.interval);
      }
    },

    increaseCarouselIndex(num) {
      if (num === 1) {
        this.slide = "slideLeft";
      } else {
        this.slide = "slideRight";
      }

      this.carouselIndex += num;
      if (this.carouselIndex >= 5) {
        this.carouselIndex = 0;
      } else if (this.carouselIndex < 0) {
        this.carouselIndex = 4;
      }
    },

    setCarouselIndex(num) {
      // 根據目前索引和新索引判斷滑動方向
      if (num > this.carouselIndex) {
        this.slide = "slideLeft";
      } else if (num < this.carouselIndex) {
        this.slide = "slideRight";
      }
      this.carouselIndex = num;
    },

    //延遲加載失敗，可能是定位問題導致圖片位置無法被正確解讀。
    // //初始化圖片延遲載入
    // initLazyLoadImages() {
    //   // 檢查瀏覽器是否支援 Intersection Observer
    //   if ("IntersectionObserver" in window) {
    //     const observer = new IntersectionObserver(
    //       //entries是被監控的所有元素
    //       (entries, observer) => {
    //         entries.forEach(entry => {
    //           //如果監控的元素已經進入視窗
    //           if (entry.isIntersecting) {
    //             const img = entry.target;
    //             // 當圖片進入視窗時，將 data-src 的值賦給 src
    //             img.src = img.dataset.src;
    //             // 載入後移除 class 或執行其他操作（例如移除監聽）
    //             img.classList.remove("lazy-load-image"); // 移除 class
    //             observer.unobserve(img); // 停止監聽已載入的圖片
    //           }
    //         });
    //       },
    //       {
    //         rootMargin: "0px 0px -100px 0px", // 圖片進入視窗下方 100px 時就開始載入
    //       }
    //     );

    //     const lazyImages = document.querySelectorAll(".lazy-load-image");
    //     lazyImages.forEach(img => {
    //       observer.observe(img); // 開始監聽每張.lazy-load-image圖片
    //     });
    //   } else {
    //     // 如果瀏覽器不支援 Intersection Observer，則回退到一次性載入所有圖片
    //     console.warn("Intersection Observer is not supported, all images will be loaded immediately.");
    //     const lazyImages = document.querySelectorAll(".lazy-load-image");
    //     lazyImages.forEach(img => {
    //       img.src = img.dataset.src;
    //       img.classList.remove("lazy-load-image");
    //     });
    //   }
    // },

    setBroadcastIndex(num) {
      this.broadcastIndex = num;
    },
  },
}).mount("#app");

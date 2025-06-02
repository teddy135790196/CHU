const wait_load=new Vue({
    el:"#app1",
    data(){

    return {
      books: [
        {
          ISBN: "123456",
          書名: "紅樓夢",
          作者: "曹雪芹",
          價格: 599,
          網址: "https://example.com/image.jpg"
        }, {
          ISBN: "123456",
          書名: "紅樓夢",
          作者: "曹雪芹",
          價格: 599,
          網址: "https://example.com/image.jpg"
        }]

    };},methods:{
            //初始化圖片延遲載入
    initLazyLoadImages() {
      // 檢查瀏覽器是否支援 Intersection Observer
      if ("IntersectionObserver" in window) {
        const observer = new IntersectionObserver(
          //entries是被監控的所有元素
          (entries, observer) => {
            entries.forEach(entry => {
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
        lazyImages.forEach(img => {
          observer.observe(img); // 開始監聽每張.lazy-load-image圖片
        });
      } else {
        // 如果瀏覽器不支援 Intersection Observer，則回退到一次性載入所有圖片
        console.warn("Intersection Observer is not supported, all images will be loaded immediately.");
        const lazyImages = document.querySelectorAll(".lazy-load-image");
        lazyImages.forEach(img => {
          img.src = img.dataset.src;
          img.classList.remove("lazy-load-image");
        });
      }
    }
    }
}) 
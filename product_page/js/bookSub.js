 const pub = new Vue({
        el: "#pubBC",
        data() {
          return {
            pubType: [
              { name: "書籍", url: "#" },
              { name: "漫畫", url: "#" },
              { name: "雜誌", url: "#" },
              { name: "繪本", url: "#" },
              { name: "其他出版物", url: "#" },
            ],
            isVisible: false, // 預設不顯示
          };
        },
        methods: {
          showPub() {
            this.isVisible = !this.isVisible; //=!為相反  是跟之前的顯示為相反的意思
          },
        },
      });
      // pub.mount("#pubBC"); <-因為mount這是vue3專用
      const bk = new Vue({
        el: "#bookSC",
        data() {
          return {
            BkBigCat: "",
            bookItems: [
              "文學類",
              "科學類",
              "社會與科學類",
              "歷史與地理",
              "藝術與設計類",
              "生活與休閒類",
              "商業與管理類",
              "宗教與哲學類",
            ],
            BkSubCat: [
              {
                name: "小說",
                type: "文學類",
                url: "#",
              },
              { name: "散文與詩詞", type: "文學類", url: "" },
              { name: "自然科學", type: "科學類", url: "" },
              { name: "科普讀物", type: "科學類", url: "" },
              { name: "心理與經濟", type: "社會與科學類", url: "#" },
              { name: "政治與經濟", type: "社會與科學類", url: "#" },
              { name: "世界與區域歷史", type: "歷史與地理", url: "#" },
              { name: "地理與文化探索", type: "歷史與地理", url: "#" },
              { name: "美術與攝影", type: "藝術與設計類", url: "#" },
              { name: "設計與建築", type: "藝術與設計類", url: "" },
              { name: "飲食與健康", type: "生活與休閒類", url: "" },
              { name: "旅遊與手作", type: "生活與休閒類", url: "" },
              { name: "行銷與創業", type: "商業與管理類", url: "" },
              { name: "財經與職場技能", type: "商業與管理類", url: "" },
              { name: "哲學與思辯", type: "宗教與哲學類", url: "" },
              { name: "宗教信仰與靈修", type: "宗教與哲學類", url: "" },
            ],
          };
        }
      });
      // bk.mount("#bookSC");
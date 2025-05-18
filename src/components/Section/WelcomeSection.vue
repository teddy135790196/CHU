<template>
  <div
    class="col box-md-6 bg-primary d-flex align-items-center justify-content-center"
  >
    <div class="content content-left d-flex flex-column">
      <div class="title">
        <h1>{{ siteName }}</h1>
      </div>
      <div class="welcome welcome-anime">
        <h2 class="welcomeTitle" :class="{ show: isShow }">
          {{ welcomeTitle }}
        </h2>
        <div class="welcomeSoild" :class="{ show: isShow }"></div>
        <span class="welcomeMessage" :class="{ show: isShow }">{{
          welcomeMessage
        }}</span>
      </div>

      <div class="quotations quotations-anime mt-auto">
        <div class="quote" :class="{ show: isShow }" v-html="quote"></div>
        <div class="author" :class="{ show: isShow }">{{ author }}</div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "WelcomeSection",
  data() {
    return {
      siteName: "棲遲書屋",
      welcomeTitle: "",
      welcomeMessage: "",
      quote: "",
      author: "",
      // ...現有資料...
      isShow: false,
      welcomes: [
        {
          title: "歡迎",
          message:
            "立即註冊，開始在手機、平板與電腦上暢遊文字的世界，享受免費閱讀服務。",
        },
        {
          title: "瀏覽",
          message: "隨時隨地探索熱門書單、新書上架，及精選閱讀專區。",
        },
        {
          title: "搜尋",
          message: "尋找書籍、作家或主題？輕鬆搜尋，即刻閱讀。",
        },
        { title: "你的書櫃", message: "收藏你喜歡的書，打造專屬閱讀空間。" },
      ],
      quotes: [
        {
          quote:
            "秦時明月漢時關，一片孤城萬仞山。<br>蓬山此去無多路，輕舟已過萬重山。",
          author: "？？？",
        },
        {
          quote:
            "罔談彼短，靡恃己長。信使可覆，器欲難量。<br>禍因惡積，福緣善慶。尺璧非寶，寸陰是競。",
          author: "周興嗣《千字文．節選》",
        },
        {
          quote: "老驥伏櫪，志在千里。<br>烈士暮年，壯心不已。",
          author: "曹操《龜雖壽》",
        },
        {
          quote: "綠螘新醅酒，紅泥小火爐。<br>晚來天欲雪，能飲一杯無？",
          author: "白居易《問劉十九》",
        },
        {
          quote:
            "昨夜雨疏風驟，濃睡不消殘酒<br>試問捲簾人，卻道海棠依舊<br>知否？知否？應是綠肥紅瘦",
          author: "李清照《如夢令．昨夜雨疏風驟》",
        },
        {
          quote:
            "援琴鳴弦發清商，短歌微吟不能長<br>明月皎皎照我床，星漢西流夜未央<br>牽牛織女遙相望，爾獨何辜限河梁",
          author: "曹丕《燕歌行（一）．節選》",
        },
      ],
    };
  },
  methods: {
    getRandomItem(arr) {
      const randomIndex = Math.floor(Math.random() * arr.length);
      return arr[randomIndex];
    },
    updateContent() {
      const welcome = this.getRandomItem(this.welcomes);
      const quoteObj = this.getRandomItem(this.quotes);

      console.log("welcome.title:", welcome.title);
      console.log("welcome.message:", welcome.message);
      console.log("quote.quote:", quoteObj.quote);
      console.log("quote.author:", quoteObj.author);

      this.welcomeTitle = welcome.title;
      this.welcomeMessage = welcome.message;
      this.quote = quoteObj.quote;
      this.author = quoteObj.author;

      this.isShow = false;

      setTimeout(() => {
        this.isShow = true;
      }, 400); // 延遲一點時間觸發動畫
    },
  },
  mounted() {
    this.updateContent();
  },
};
</script>

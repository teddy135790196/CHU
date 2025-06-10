<template>
  <div class="login-fullscreen">
    <!-- 左側 50% -->
    <div class="login-half login-left d-flex align-items-center justify-content-center">
      <div class="login-content-left card-style text-center">
        <h1 class="login-title">棲遲書屋</h1>
        <!-- 瀏覽標題與說明文字 -->
        <div class="search-row d-flex flex-column align-items-center justify-content-center mt-4 mb-4">
          <div class="search-browse mb-2">瀏覽</div>
          <div class="search-divider"></div>
          <div class="search-desc">隨時隨地探索熱門書單、新書上架，以及為你精選的主題閱讀專區。</div>
        </div>
        <div class="welcome welcome-anime">
          <h2 id="welcomeTitle" class="welcomeTitle center-title"></h2>
          <div id="welcomeSoild" class="welcomeSoild"></div>
          <span id="welcomeMessage" class="welcomeMessage"></span>
        </div>
        <div class="quotations quotations-anime mt-auto">
          <div id="quote" class="quote"></div>
          <div id="author" class="author"></div>
        </div>
      </div>
    </div>
    <!-- 右側 50% -->
    <div class="login-half login-right d-flex align-items-center justify-content-center">
      <div class="login-content-right card-style">
        <div class="inp_modle">
          <p>帳號</p>
          <div class="soild"></div>
          <input type="text" v-model="username" placeholder="請輸入您的帳號或電子郵箱" @input="validateUsername" />
          <span class="quote" v-if="errors.username">{{ errors.username }}</span>
        </div>
        <div class="inp_modle">
          <p>密碼</p>
          <div class="soild"></div>
          <input type="password" v-model="password" placeholder="請輸入您所設定的密碼" @input="validatePassword" />
          <span class="quote" v-if="errors.password">{{ errors.password }}</span>
        </div>
        <button type="button" @click="handleLogin" :disabled="!isFormValid" :class="{'is-loading': isLoading}">登入</button>
        <div class="other mt-4">
          <a href="#">忘記密碼</a>
          ｜
          <router-link to="/register">加入會員</router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { authService } from '@/services/authService';

// 歡迎語與標題陣列（已移除歡迎與相關訊息）
const welcomes = [
  
  { title: "歡迎", message: "立即註冊，開始在手機、平板與電腦上暢遊文字的世界，享受免費閱讀服務。" },
	{ title: "瀏覽", message: "隨時隨地探索熱門書單、新書上架，以及為你精選的主題閱讀專區。" },
	{ title: "搜尋", message: "正在找一本書、某位作家，或某個主題嗎？輕鬆搜尋，即刻閱讀。" }, 
	{ title: "你的書櫃", message: "將你喜歡的書收藏進個人書櫃，打造屬於自己的閱讀空間。" },
	{ title: "閱讀紀錄", message: "自動保存你讀過的每一本書，隨時接續、回顧或分享你的閱讀足跡。" },
	{ title: "推薦書單", message: "依照你的喜好與閱讀習慣，每天推薦你可能喜歡的書與書評。" },
	{ title: "跨裝置同步", message: "無論在哪裡登入，都能從上次中斷的地方繼續閱讀，不錯過任何精彩片段。" }

];

// 名句與作者陣列
const quotes = [
  { quote: "秦時明月漢時關，一片孤城萬仞山。<br>蓬山此去無多路，輕舟已過萬重山。", author: "？？？" },
  { quote: "罔談彼短，靡恃己長。信使可覆，器欲難量。<br>禍因惡積，福緣善慶。尺璧非寶，寸陰是競。", author: "周興嗣《千字文．節選》" },
  { quote: "老驥伏櫪，志在千里。<br>烈士暮年，壯心不已。", author: "曹操《龜雖壽》" },
  { quote: "綠螘新醅酒，紅泥小火爐。<br>晚來天欲雪，能飲一杯無？", author: "白居易《問劉十九》" },
  { quote: "昨夜雨疏風驟，濃睡不消殘酒<br>試問捲簾人，卻道海棠依舊<br>知否？知否？應是綠肥紅瘦", author: "李清照《如夢令．昨夜雨疏風驟》" },
  { quote: "援琴鳴弦發清商，短歌微吟不能長<br>明月皎皎照我床，星漢西流夜未央<br>牽牛織女遙相望，爾獨何辜限河梁", author: "曹丕《燕歌行（一）．節選》" },
];

export default {
  name: 'LoginView',
  data() {
    return {
      username: '',
      password: '',
      errors: {
        username: '',
        password: ''
      },
      isLoading: false
    }
  },
  computed: {
    isFormValid() {
      return !this.errors.username && !this.errors.password && 
             this.username && this.password;
    }
  },
  methods: {
    validateUsername() {
      this.errors.username = authService.validateUsername(this.username);
      return !this.errors.username;
    },
    validatePassword() {
      this.errors.password = authService.validatePassword(this.password);
      return !this.errors.password;
    },
    async handleLogin() {
      if (!this.isFormValid) {
        return;
      }

      this.isLoading = true;
      try {
        const response = await authService.login(this.username, this.password);
        if (response.success) {
          // 設置登入狀態
          localStorage.setItem("isLogin", "true");
          localStorage.setItem("user", JSON.stringify(response.user));
          
          // 獲取重定向路徑
          const redirectPath = this.$route.query.redirect || '/cart';
          this.$router.push(redirectPath);
        }
      } catch (error) {
        console.error('登入失敗:', error);
        alert(error.message || '登入失敗，請檢查帳號密碼');
      } finally {
        this.isLoading = false;
      }
    },
    // 取得隨機歡迎標題與訊息
    getRandomWelcome() {
      const randomIndex = Math.floor(Math.random() * welcomes.length);
      return welcomes[randomIndex];
    },
    // 更新歡迎標題與訊息
    updateWelcome() {
      const welcome = this.getRandomWelcome();
      const welcomeTitle = document.getElementById("welcomeTitle");
      const welcomeSoild = document.getElementById("welcomeSoild");
      const welcomeMessage = document.getElementById("welcomeMessage");
      welcomeTitle.classList.remove("show");
      welcomeSoild.classList.remove("show");
      welcomeMessage.classList.remove("show");
      setTimeout(() => {
        welcomeTitle.innerHTML = welcome.title;
        welcomeMessage.innerHTML = welcome.message;
        welcomeTitle.classList.add("show");
        welcomeSoild.classList.add("show");
        welcomeMessage.classList.add("show");
      }, 50);
    },
    // 取得隨機名句和作者
    getRandomQuote() {
      const randomIndex = Math.floor(Math.random() * quotes.length);
      return quotes[randomIndex];
    },
    // 更新名句和作者
    updateQuote() {
      const quoteObj = this.getRandomQuote();
      const quote = document.getElementById("quote");
      const author = document.getElementById("author");
      quote.classList.remove("show");
      author.classList.remove("show");
      setTimeout(() => {
        quote.innerHTML = quoteObj.quote;
        author.innerHTML = quoteObj.author;
        quote.classList.add("show");
        author.classList.add("show");
      }, 500);
    }
  },
  mounted() {
    this.updateQuote();
    this.updateWelcome();
  }
}
</script>

<style scoped>
:root {
  --main-color: #2563eb;
  --main-text-color: #222;
  --second-colorLight: #bcd0fa;
  --second-text-color: #757c80;
  --quote-text-color: #222;
  --inputfocus: #e0e7ff;
  --quote-bg: #f3f3f3;
}

.login-fullscreen {
  display: flex;
  width: 100vw;
  height: 100vh;
}
.login-half {
  width: 50vw;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
}
.login-left {
  background: var(--main-color);
  color: var(--main-text-color);
}
.login-right {
  background: var(--second-text-color);
  color: var(--main-text-color);
}
.card-style {
  width: 100%;
  max-width: 420px;
  background: #fff;
  border-radius: 16px;
  box-shadow: 0 4px 24px rgba(0,0,0,0.10);
  padding: 48px 36px 36px 36px;
  display: flex;
  flex-direction: column;
  align-items: center;
}
.login-content-left {
  max-width: 420px;
}
.login-content-right {
  max-width: 420px;
}
.login-title {
  font-size: 66px;
  margin-bottom: 40px;
}
.center-title {
  text-align: center;
  width: 100%;
}
.search-row {
  width: 100%;
  max-width: 320px;
}
.search-browse {
  font-size: 20px;
  color: var(--main-color);
  font-weight: 600;
  white-space: nowrap;
  text-align: center;
  letter-spacing: 2px;
}
.search-divider {
  width: 100%;
  height: 2px;
  background: #e0e0e0;
  margin: 8px 0 16px 0;
  border-radius: 1px;
}
.search-desc {
  font-size: 16px;
  color: #333;
  text-align: center;
  background: none;
  border: none;
  margin: 0;
  padding: 0;
}
.welcome {
  margin-top: 40px;
}
.welcome h2 {
  margin-bottom: 0;
  font-size: 27px;
}
.welcomeSoild {
  margin: 10px auto;
  height: 2px;
  width: 70%;
  background-color: var(--second-text-color);
}
.welcomeMessage {
  margin: 0 auto;
  width: 80%;
  font-size: 14px;
}
.quotations {
  margin: 0 auto;
  margin-top: 40px;
}
.quote {
  border-left: 3px solid var(--quote-text-color);
  padding: 0.2em 0.5em;
  background-color: var(--quote-bg);
  max-width: 280px;
  font-style: italic;
  font-size: 12px;
  color: var(--quote-text-color);
  line-height: 1.6;
  border-radius: 6px;
}
.author {
  margin: 0;
  margin-top: 5px;
  font-size: 12px;
  text-align: right;
  color: var(--quote-text-color);
  display: inline-block;
}
.author::before {
  content: "——";
  margin-right: 4px;
}
.quotations-anime .quote {
  opacity: 0;
  transition: opacity 1.5s ease 1.5s;
}
.quotations-anime .author {
  opacity: 0;
  transition: opacity 1s ease 2s;
}
.quotations-anime .show {
  opacity: 1;
}
.inp_modle {
  width: 100%;
  text-align: left;
  line-height: normal;
  margin-bottom: 24px;
}
.inp_modle p {
  font-size: 32px;
  margin-bottom: 0;
}
.inp_modle .soild {
  height: 4px;
  margin-bottom: -2px;
  background-color: var(--main-color);
}
.inp_modle input {
  width: 100%;
  box-shadow: inset -2px -2px 4px rgba(0, 0, 0, 0.4);
  border: none;
  outline: none;
  font-size: 18px;
  border-radius: 4px;
  padding: 8px 12px;
}
.inp_modle input:focus {
  background-color: var(--inputfocus);
}
button[type="button"] {
  width: 100%;
  background: var(--main-color);
  color: #fff;
  border: none;
  border-radius: 6px;
  font-size: 20px;
  padding: 10px 0;
  margin-top: 12px;
  margin-bottom: 12px;
  transition: background 0.2s;
}
button[type="button"]:hover {
  background: #1e40af;
}
button[type="button"]:disabled {
  background: #bbb;
  cursor: not-allowed;
}
.other {
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 8px;
  margin-top: 16px;
}
.other a, .other .router-link {
  color: #2563eb;
  text-decoration: none;
  font-size: 16px;
}
.other a:hover, .other .router-link:hover {
  text-decoration: underline;
}
.quote {
  color: #dc3545;
  font-size: 14px;
  margin-top: 5px;
}
@media (max-width: 991px) {
  .login-fullscreen {
    flex-direction: column;
    height: auto;
    min-height: 100vh;
  }
  .login-half {
    width: 100vw;
    height: 50vh;
  }
  .login-content-left, .login-content-right {
    max-width: 90vw;
    padding: 24px 8px;
  }
  .search-row {
    max-width: 90vw;
  }
}
</style>

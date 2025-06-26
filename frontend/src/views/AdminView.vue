<template>
  <div>
    <!-- 導覽列 -->
    <nav class="d-flex justify-content-around mb-5 shadow-sm nav-dark">
      <router-link class="nav-item text-center" to="/admin/home">🏠 後台首頁</router-link>
      <router-link class="nav-item text-center" to="/admin/visit">📊 瀏覽數據</router-link>
      <router-link class="nav-item text-center" to="/admin/member">🧑‍💼 會員管理</router-link>
      <router-link class="nav-item text-center" to="/admin/orders">📃 訂單總覽</router-link>
      <router-link class="nav-item text-center" to="/admin/books">📚 書本管理</router-link>
      <a class="nav-item text-center" href="#" @click.prevent="logoutWithConfirm">
        🚪 登出
        <small class="text-white">({{ formattedTime }})</small>
      </a>
    </nav>

    <!-- 用來顯示子頁面 -->
    <router-view />
  </div>
</template>

<script>
export default {
  name: 'AdminLayout',
  data() {
    return {
      idleTime: 0,
      idleMinutes: 5, // 測試用 .5 分鐘（30 秒），正式可設為 5
      timer: null,
    };
  },
  computed: {
    // 閒置秒數上限
    idleMax() {
      return this.idleMinutes * 60;
    },
    // 顯示倒數時間（mm:ss）
    formattedTime() {
      const remaining = this.idleMax - this.idleTime;
      const min = String(Math.floor(remaining / 60)).padStart(2, '0');
      const sec = String(Math.floor(remaining % 60)).padStart(2, '0');
      return `${min}:${sec}`;
    },
  },
  mounted() {
    this.startIdleTimer();
  },
  beforeDestroy() {
    this.clearIdleTimer();
  },
  methods: {
    // 手動點選登出（會詢問）
    logoutWithConfirm() {
      const isLogout = window.confirm('確定要登出嗎？');
      if (!isLogout) return;
      this.forceLogout();
    },
    // 自動登出（不詢問）
    forceLogout() {
      localStorage.removeItem('token');
      localStorage.removeItem('isAdmin');
      this.clearIdleTimer();
      this.$router.push('/admin');
    },
    // 開始監聽閒置時間
    startIdleTimer() {
      this.idleTime = 0;
      this.timer = setInterval(() => {
        this.idleTime++;
        if (this.idleTime >= this.idleMax) {
          alert(`閒置超過 ${this.idleMinutes} 分鐘，自動登出`);
          this.forceLogout();
        }
      }, 1000);

      // 有互動就重設閒置時間
      ['mousemove', 'keydown', 'click'].forEach(evt => {
        window.addEventListener(evt, this.resetIdleTime);
      });
    },
    resetIdleTime() {
      this.idleTime = 0;
    },
    clearIdleTimer() {
      clearInterval(this.timer);
      ['mousemove', 'keydown', 'click'].forEach(evt => {
        window.removeEventListener(evt, this.resetIdleTime);
      });
    },
  },
};
</script>

<style scoped>
.nav-dark {
  background-color: #ffffff;
  color: #dc3545;
  gap: 5px;
  padding: 5px 0;
}

.nav-item {
  flex: 1;
  padding: 15px 0;
  color: #dc3545;
  text-decoration: none;
  transition: background-color 0.3s ease;
  font-family: '標楷體', 'DFKai-SB', 'BiauKai', serif;
  font-size: 1.2rem;
  font-weight: 600;
}

.nav-item:hover {
  background-color: #ffe6e6;
  text-decoration: none;
  color: #dc3545;
}

.nav-item small {
  color: #000000 !important;
}
</style>

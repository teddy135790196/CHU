<template>
  <div>
    <!-- 導覽列 -->
    <nav class="d-flex justify-content-around mb-5 shadow-sm nav-dark">
      <router-link class="nav-item text-center" to="/admin/home">🏠 後台首頁</router-link>
      <router-link class="nav-item text-center" to="/admin/orders">📃 訂單管理</router-link>
      <router-link class="nav-item text-center" to="/admin/dash">📌 圖表測試</router-link>
      <a class="nav-item text-center" href="#" @click.prevent="logout">
        🚪 登出
        <small class="text-white">({{ formattedTime }})</small>
      </a>
    </nav>

    <!-- 這裡用 router-view 顯示子頁面，於 index.js 中設定 -->
    <router-view />
  </div>
</template>

<script>
export default {
  name: 'AdminLayout',
  data() {
    return {
      idleTime: 0,
      idleMax: 5 * 60,
      timer: null,
    };
  },
  computed: {
    formattedTime() {
      const remaining = this.idleMax - this.idleTime;
      const min = String(Math.floor(remaining / 60)).padStart(2, '0');
      const sec = String(remaining % 60).padStart(2, '0');
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
    logout() {
      const isLogout = window.confirm('確定要登出嗎？');
      if (!isLogout) return;

      localStorage.removeItem('token');
      localStorage.removeItem('isAdmin');
      this.clearIdleTimer();
      this.$router.push('/admin');
    },
    startIdleTimer() {
      this.idleTime = 0;
      this.timer = setInterval(() => {
        this.idleTime++;
        if (this.idleTime >= this.idleMax) {
          alert('閒置超過 30 秒，自動登出');
          this.logout();
        }
      }, 1000);
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
  background-color: #343a40;
  color: white;
  gap: 5px;
}

.nav-item {
  flex: 1;
  padding: 15px 0;
  color: white;
  text-decoration: none;
  transition: background-color 0.3s ease, transform 0.2s ease;
}

.nav-item:hover {
  background-color: rgb(170, 111, 1);
  transform: translateY(-2px);
  text-decoration: none;
  color: #f8f9fa;
}
</style>

<template>
  <div class="container mt-5">
    <h1 class="text-center">管理後台首頁</h1>
    <p class="text-center">歡迎進入後台管理系統！</p>
    <button @click="logout" class="btn btn-danger">登出</button>
  </div>
</template>

<script>
export default {
  name: 'AdminHomeView',
  data() {
    return {
      idleTime: 0,
      // idleMax: 5 * 60, // 5分鐘(秒)
      idleMax: 1 * 30, // 5分鐘(秒)
      timer: null,
    };
  },
  mounted() {
    this.startIdleTimer();
  },
  beforeDestroy() {
    this.clearIdleTimer();
  },
  methods: {
    logout() {
      localStorage.removeItem('token');
      localStorage.removeItem('isAdmin');
      this.clearIdleTimer();
      this.$router.push('/admin'); // 跳回登入頁
    },
    startIdleTimer() {
      this.idleTime = 0;
      this.timer = setInterval(() => {
        this.idleTime++;
        if (this.idleTime >= this.idleMax) {
          alert('閒置超過 5 分鐘，自動登出');
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
    }
  }
};
</script>

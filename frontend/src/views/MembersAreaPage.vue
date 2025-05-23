<template>
  <div id="app" class="wrap">
    <AccessAlert 
      v-if="showAccessAlert" 
      :title="message.AccessAlert.title" 
      :message="message.AccessAlert.message" 
      :button-text="message.AccessAlert.btText"
      :showButton="true" 
      :closeOnOverlay="false"
      @action="goToPublisherApply" />

    <div class="container-fluid">
      <div class="row">
        <MembersArea />
      </div>
    </div>
  </div>
</template>

<script>
// 路徑要對應到 components/Section 底下的元件位置
import AccessAlert from '@/components/common/AccessAlert.vue';
import MembersArea from '@/components/modules/members/MembersArea.vue';


export default {
  name: "MembersAreaPage",
  components: {
    AccessAlert,
    MembersArea,
  },
  data() {
    return {
      showAccessAlert: true, // 一進來就顯示彈窗
      message: {
        AccessAlert: {
          title: '歡迎加入棲遲書屋！',
          message: '您已完成註冊成為會員！<br>為保障帳戶安全與完整功能使用，請至會員中心完成【信箱驗證】與【手機驗證】。',
          btText: '我知道了！',
        },

      },
    };
  },
  methods: {
    // 關閉浮窗
    goToPublisherApply() { this.showAccessAlert = false; }
  }
};
</script>

<style scoped>
@import url("https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css");
</style>

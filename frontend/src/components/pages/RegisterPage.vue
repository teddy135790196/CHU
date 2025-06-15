<template>
  
  <div class="col vh-100 d-flex align-items-center justify-content-center">
    <div class="content register d-flex flex-column">
      <!-- 進度條 -->
      <div class="progress mb-1">
        <div 
        class="progress-bar" 
        :class="{finish: nowStep === 4}"
        :style="{ width: (progressWidth[nowStep - 1] || 0) + '%' }"></div>
      </div>

      <!-- Step1 -->
      <AccountArea v-show="nowStep === 1" :nowStep="nowStep"
        :formData="{ username: form.username, password: form.password, repassword: form.repassword }"
        @updateForm="updatePartialForm" ref="step1" />

      <!-- Step2 -->
      <InfoArea v-show="nowStep === 2" :nowStep="nowStep"
        :formData="{ nickname: form.nickname, gender: form.gender, birth: form.birth }"
        @updateForm="updatePartialForm" ref="step2" />

      <!-- Step3 -->
      <ContactArea v-show="nowStep === 3" :nowStep="nowStep" :formData="{ email: form.email, phone: form.phone }"
        @updateForm="updatePartialForm" ref="step3" />

      <!-- Step4 -->
      <ReviewArea v-show="nowStep === 4" :nowStep="nowStep" :form="form" ref="step4" />


      <!-- 按鈕區 -->
      <div class="btn-group mt-auto">
        <button class="btn btn-primary" @click="prevStep">
          {{ nowStep === 1 ? "離開" : "上一頁" }}
        </button>
        <button class="btn btn-success" @click="nextStep">
          {{ nowStep === 4 ? "完成" : "下一步" }}
        </button>
      </div>
      <!-- 測試用 -->
      <!-- <button class="btn btn-light" v-show="nowStep <= 3" @click="nowStep++">
        {{ "跳過" }}
      </button> -->
    </div>

  </div>
</template>

<script>
import AccountArea from '@/components/areas/register/AccountArea.vue';
import InfoArea from '@/components/areas/register/InfoArea.vue';
import ContactArea from '@/components/areas/register/ContactArea.vue';
import ReviewArea from '@/components/areas/register/ReviewArea.vue';

export default {
  // 註冊名稱
  name: 'RegisterPage',
  // 該檔案資料庫
  data() {
    return {
      nowStep: 1,
      progressWidth: [40, 70, 90, 100],
      form: { username: '', password: '', repassword: '', nickname: '', gender: '', birth: '', email: '', phone: '', summary: '字裡行間，自有清歡。願以此生，與君共賞。' },
    };
  },
  // 開放權限
  components: {
    AccountArea,
    InfoArea,
    ContactArea,
    ReviewArea,
  },
  // 方法
  methods: {
    // POST：註冊表單
    async register() {
      try {
        const res = await this.$axios.post('/api/register', this.form);
        alert('註冊成功！即將跳轉至登入頁！');
        console.log('註冊成功', res.data);
      } catch (error) {
        console.error('註冊失敗', error);
      }
    },
    
    updatePartialForm(updatedFields) {
      this.form = {
        ...this.form,
        ...updatedFields,
      };
    },
    // @click 前一頁
    prevStep() {
      if (this.nowStep > 1) this.nowStep--;
      else if (confirm('確定離開？')) this.$router.push('/login');
    },
    // @click 下一頁
    async nextStep() {
      const stepRef = `step${this.nowStep}`;

      if (this.$refs[stepRef].validateForm) {
        const isValid = await this.$refs[stepRef].validateForm();

        if (isValid) {
          if (this.nowStep === 4) {
            if (confirm('確認資料是否無誤？')) {
              await this.register();  // 第 4 步才送出註冊
              this.$router.push('/login'); // 註冊成功後導向登入頁
            }
          } else {
            this.nowStep++;
          }
        }
      }
    }
  },

};
</script>

<style scoped>
@import url("https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css");

/* ========================================
   基本全局樣式（適用於所有設備）
   寫好的CSS貼在這區
======================================== */

/* 圓角內容區塊 */
.content.register {
  padding: 20px;

  min-width: 600px;
  min-height: 720px;
}






/* ========================================
   sm: 577px ~ 767px (大型手機、直向平板)
   container 寬度: 540px
======================================== */
@media (min-width: 577px) and (max-width: 767px) {

  /* 圓角內容區塊 */
  .content.register {
    border-radius: 0;

    min-width: 520px;
min-height: 650px;
  }

}




/* ========================================
   xs: ≤ 576px (手機)
   container 寬度: 100% (fluid)
======================================== */
@media (max-width: 576px) {

  /* 圓角內容區塊 */
  .content.register {
    background-color: transparent;
    box-shadow: none;

    min-width: 100%;
    min-height: 600px;
  }

}
</style>

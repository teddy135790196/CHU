<template>
  <div class="container">
    <div class="row">
      <div class="col box d-flex align-items-center justify-content-center">
        <div class="content d-flex flex-column">
          <!-- 進度條 -->
          <div class="progress mb-1">
            <div class="progress-bar" :style="{ width: (progressWidth[nowStep - 1] || 0) + '%' }"></div>
          </div>

          <!-- 註冊步驟子元件 -->
          <RegisterStep1 
          v-show="nowStep === 1" 
          :nowStep="nowStep" 
          :formData="{ username: form.username, password: form.password, repassword: form.repassword }"
          @updateForm="updatePartialForm" 
          ref="step1" />

          <RegisterStep2 
          v-show="nowStep === 2" 
          :nowStep="nowStep" 
          :formData="{ nickname: form.nickname, gender: form.gender, birth: form.birth }"
          @updateForm="updatePartialForm"
          ref="step2" />

          <RegisterStep3 
          v-show="nowStep === 3" 
          :nowStep="nowStep" 
          :formData="{ email: form.email, phone: form.phone }"
          @updateForm="updatePartialForm"
          ref="step3" />

          <RegisterStep4 
          v-show="nowStep === 4" 
          :nowStep="nowStep" 
          :form="form" 
          ref="step4" />

          
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
          <button class="btn btn-light" v-show="nowStep <= 3" @click="nowStep++">
            {{ "跳過" }}
          </button>
        </div>
        
      </div>
    </div>
  </div>
</template>

<script>
import RegisterStep1 from '@/components/Register/RegisterStep1.vue';
import RegisterStep2 from '@/components/Register/RegisterStep2.vue';
import RegisterStep3 from '@/components/Register/RegisterStep3.vue';
import RegisterStep4 from '@/components/Register/RegisterStep4.vue';

export default {
  // 註冊名稱
  name: 'RegisterForm',
  // 該檔案資料庫
  data() {
    return {
      nowStep: 1,
      progressWidth: [40, 70, 90, 100],
      form: { username: '', password: '', repassword: '', nickname: '', gender: '', birth: '', email: '', phone: '' },
    };
  },
  // 開放權限
  components: {
    RegisterStep1,
    RegisterStep2,
    RegisterStep3,
    RegisterStep4,
  },
  // 方法
  methods: {
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
    nextStep() {
      // 取得自己資料庫的 nowStep
      const stepRef = `step${this.nowStep}`;
      if (this.$refs[stepRef].validateForm()) {
        if (this.nowStep === 4) {
          if (confirm('確認資料是否無誤？')) this.$router.push('/login');
        } else {
          this.nowStep++;
        }
      }
    },
  },

};
</script>

<style scoped>
@import url("https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css");

</style>

<template>
  <!-- Step 3 -->
  <div :class="['step', nowStep === 3 ? 'active-step' : '']">
    <h4>【參．想知道您的聯絡方式】</h4>

    <BaseInput id="email" label="電子郵件" type="email" placeholder="請輸入您的電子郵箱" quote="請輸入您的電子郵箱" v-model="localForm.email"
      :error-message="formErrors.email" @blur="validateEmail" />

    <BaseInput id="phone" label="手機號碼" type="tel" placeholder="請輸入您的手機號碼" quote="請輸入 10 位數字" v-model="localForm.phone"
      :error-message="formErrors.phone" @blur="validatePhone" />
  </div>
</template>

<script>
import BaseInput from '@/components/Form/BaseInput.vue';

export default {
  // 註冊名稱
  name: "RegisterStep3",
  // 引入子元件
  components: {
    BaseInput,
  },
  // 接收資料
  props: {
    nowStep: Number,
    formData: {
      type: Object,
      required: true
    }
  },
  // 本地資料庫
  data() {
    return {
      localForm: {
				email: this.formData.email,
				phone: this.formData.phone,
			},
      formErrors: {
        email: '',
        phone: '',
      }
    };
  },
  // 監測
  watch: {
    localForm: {    // localForm 物件數值變動
      handler(newVal) {
        console.log('localForm 變更了：', newVal);
        this.$emit('updateForm', newVal); // 只 emit 自己的欄位
      },
      deep: true // <- 必須加這個
    },
  },
  // 方法
  methods: {
    // 驗證 email 格式
    validateEmail() {
      const email = this.formData.email;
      this.formErrors.email = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(email)
        ? ''
        : '請輸入有效的電子郵箱';
      return !this.formErrors.email;
    },

    // 驗證手機號碼（10 碼數字）
    validatePhone() {
      const phone = this.formData.phone;
      this.formErrors.phone = /^\d{10}$/.test(phone)
        ? ''
        : '請輸入 10 位數字的手機號碼';
      return !this.formErrors.phone;
    },

    // 整合驗證
    validateForm() {
      const ispass_1 = this.validateEmail();
      const ispass_2 = this.validatePhone();

      return ispass_1 && ispass_2;
    }
  }
};
</script>

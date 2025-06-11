<template>
  <!-- Step 3 -->
  <div :class="['step', nowStep === 3 ? 'active-step' : '']">
    <h4>【參．想知道您的聯絡方式】</h4>

    <BaseInput type="email" id="email" :label="message.inputLabel.email" :placeholder="message.inputPlahold.email"
      :quote="message.quote.email" :error-message="formErrors.email" @blur="validateEmail" v-model="localForm.email" />

    <BaseInput type="tel" id="phone" :label="message.inputLabel.phone" :placeholder="message.inputPlahold.phone"
      :quote="message.quote.email" :error-message="formErrors.phone" @blur="validatePhone" v-model="localForm.phone" />
  </div>
</template>

<script>
import BaseInput from '@/components/common/BaseInput.vue';

export default {
  // 註冊名稱
  name: "ContactArea",
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
      },

      // 修改顯示訊息區
      message: {

        stepTitle: '【參．想知道您的聯絡方式】',

        // input => label
        inputLabel: {
          email: '電子郵件',
          phone: '手機號碼',
        },

        // input => placeholder
        inputPlahold: {
          email: '範例：myemail@gmail.com',
          phone: '範例：0123456789',
        },

        // 預設提示文字
        // 驗證：無輸入
        quote: {
          email: '請輸入您的電子郵箱',
          phone: '請輸入您的手機號碼',

          // 驗證：格式錯誤
          errformat: {
            email: '格式不符：請輸入有效的電子郵箱',
            phoneRule: '格式不符：只可輸入數字',
            phoneOver: '格式不符：輸入數字超過 10 位',
            phoneShort: '格式不符：輸入數字未達 10 位',
          },
        },

      },

    };
  },
  // 監測
  watch: {
    localForm: {    // localForm 物件數值變動
      handler(newVal) {
        // console.log('localForm 變更了：', newVal);
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
      const rule = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(email);

      if (!email || email.trim() === '') {
        // 驗證：無輸入
        this.formErrors.email = this.message.quote.email;
        return false;
      } else if (!rule) {
        // 驗證：格式錯誤
        this.formErrors.email = this.message.quote.errformat.email;
        return false;
      } else {
        // 驗證：通過！
        this.formErrors.email = '';
        return true;
      }

    },

    // 驗證手機號碼（10 碼數字）
    validatePhone() {
      const phone = this.formData.phone;
      const rule = /^\d+$/.test(phone);

      if (!phone || phone.trim() === '') {
        // 驗證：無內容
        this.formErrors.phone = this.message.quote.phone;
        return false;
      } else if (!rule) {
        // 驗證：格式錯誤
        this.formErrors.phone = this.message.quote.errformat.phoneRule;
        return false;
      } else if (phone.length < 10) {
        // 驗證：少於 10 碼
        this.formErrors.phone = this.message.quote.errformat.phoneShort;
        return false;
      } else if (phone.length > 10) {
        // 驗證：超過 10 碼
        this.formErrors.phone = this.message.quote.errformat.phoneOver;
        return false;
      } else {
        // 驗證：通過！
        this.formErrors.phone = '';
        return true;
      }

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

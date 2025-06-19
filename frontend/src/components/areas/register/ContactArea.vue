<template>
  <!-- Step 3 -->
  <div :class="['step', nowStep === 3 ? 'active-step' : '']">
    <h4>【參．想知道您的聯絡方式】</h4>

    <BaseInput type="email" id="email" :label="message.baseInput.label.email"
      :placeholder="message.baseInput.plahold.email" :quote="message.baseInput.quote.email"
      :error-message="formErrors.email" @blur="validateEmail" v-model="localForm.email" />

    <BaseInput type="tel" id="phone" :label="message.baseInput.label.phone"
      :placeholder="message.baseInput.plahold.phone" :quote="message.baseInput.quote.phone"
      :error-message="formErrors.phone" @blur="validatePhone" v-model="localForm.phone" />
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

        baseInput: {
          label: {
            email: '電子郵件',
            phone: '手機號碼',
          },
          plahold: {
            email: '範例：myemail@gmail.com',
            phone: '範例：0123456789',
          },
          quote: {
            // 預設提示文字
            email: '請輸入您的電子郵箱',
            phone: '請輸入您的手機號碼',
          },
          quoteErr: {
            // 驗證：無輸入
            uninput: {
              email: '格式不符：電子郵箱不得為空',
              phone: '格式不符：手機號碼不得為空',
            },
            // 驗證：格式錯誤(長度太短)
            length_short: {
              // email: '暫留',
              phone: '格式不符：輸入數字未達 10 位',
            },
            // 驗證：格式錯誤(長度太長)
            length_long: {
              // email: '暫留',
              phone: '格式不符：輸入數字超過 10 位',
            },
            // 驗證：格式錯誤(英數)
            format: {
              email: '格式不符：請輸入有效的電子郵箱',
              phone: '格式不符：只可輸入數字',
            },
            reEmail: '該信箱已被使用',
          },
        }
      },
    }
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
    async validateEmail() {
      const email = this.formData.email;
      const rule = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(email);

      if (!email || email.trim() === '') {
        // 驗證：無輸入
        this.formErrors.email = this.message.baseInput.quoteErr.uninput.email;
        return false;
      } else if (!rule) {
        // 驗證：格式錯誤
        this.formErrors.email = this.message.baseInput.quoteErr.format.email;
        return false;
      }


      // 通過前面同步驗證，再去呼叫後端查重（async）
      try {
				// 查詢資料庫看郵箱是否重複
				const res = await this.$axios.get('/api/register/check/email', {
					params: { email: this.localForm.email }
				});

				// 如果有重複
				if (res.data.exists) {
					// 驗證：郵箱重複
					this.formErrors.email = this.message.baseInput.quoteErr.reEmail;
					return false;
				} else {
					// 驗證：通過！
					this.formErrors.email = '';
					return true;
				}
			} catch (err) {
				console.error('檢查郵箱錯誤', err);
				this.formErrors.email = '檢查失敗，請稍後再試';
				return false;
			}

    },

    // 驗證手機號碼（10 碼數字）
    validatePhone() {
      const phone = this.formData.phone;
      const rule = /^\d+$/.test(phone);

      if (!phone || phone.trim() === '') {
        // 驗證：無內容
        this.formErrors.phone = this.message.baseInput.quoteErr.uninput.phone;
        return false;
      } else if (!rule) {
        // 驗證：格式錯誤
        this.formErrors.phone = this.message.baseInput.quoteErr.format.phone;
        return false;
      } else if (phone.length < 10) {
        // 驗證：少於 10 碼
        this.formErrors.phone = this.message.baseInput.quoteErr.length_short.phone;
        return false;
      } else if (phone.length > 10) {
        // 驗證：超過 10 碼
        this.formErrors.phone = this.message.baseInput.quoteErr.length_long.phone;
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
  },
};
</script>

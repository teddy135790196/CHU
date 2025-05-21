<template>
	<!-- Step 1 -->
	<div :class="['step', { 'active-step': nowStep === 1 }]">
		<h4>【壹．設定您的帳號與密碼】</h4>

		<!-- <p>目前步驟：{{ nowStep }}</p>
		<p>目前步驟：{{ localForm.username }}</p>
		<p>目前步驟：{{ localForm.password }}</p>
		<p>目前步驟：{{ localForm.repassword }}</p> -->

		<!-- <div class="inp_modle">
      <p>帳號</p>
      <div class="soild"></div>
      <input
        id="username"
        type="text"
        placeholder="請輸入您的帳號或電子郵箱"
        v-model="localForm.username"
      />
      <span class="quote" :class="{ error: formErrors.username }">
        {{ formErrors.username || "請輸入您的帳號" }}
      </span>
    </div> -->

		<BaseInput id="username" label="帳號" type="text" placeholder="請輸入您的帳號或電子郵箱" quote="請輸入您的帳號"
			v-model="localForm.username" :errorMessage="formErrors.username" @blur="validateUsername" />

		<BaseInput id="password" label="密碼" type="password" placeholder="請輸入您的密碼" quote="請輸入8位以上英數混合密碼"
			v-model="localForm.password" :error-message="formErrors.password" @blur="validatePassword" />

		<BaseInput id="repassword" label="確認密碼" type="password" placeholder="請再次輸入您的密碼" quote="請輸入8位以上英數混合密碼"
			v-model="localForm.repassword" :error-message="formErrors.repassword" @blur="validateRepassword" />
	</div>
</template>


<script>
import BaseInput from '@/components/Form/BaseInput.vue';

export default {
	// 註冊名稱
	name: "RegisterStep1",
	// 引入子元件
	components: { BaseInput },
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
				username: this.formData.username,
				password: this.formData.password,
				repassword: this.formData.repassword
			},  // 複製 prop 避免直接改
			formErrors: {
				username: '',
				password: '',
				repassword: ''
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
		}
	},
	methods: {
		// 驗證帳號
		validateUsername() {
			this.formErrors.username = this.localForm.username ? '' : '帳號不得為空';
			return !this.formErrors.username;
		},
		// 驗證密碼
		validatePassword() {
			const password = this.localForm.password;
			console.log('目前密碼:', password, '長度:', password?.length);

			if (!password) {
				this.formErrors.password = '密碼不得為空';
			} else if (password.length < 8) {
				this.formErrors.password = '密碼需至少 8 碼';
			} else if (!(/[A-Za-z]/.test(password) && /\d/.test(password))) {
				this.formErrors.password = '密碼需含英文字母與數字';
			} else {
				this.formErrors.password = '';
			}

			console.log('錯誤訊息:', this.formErrors.password);
			return !this.formErrors.password;
		},
		// 驗證重複密碼
		validateRepassword() {
			const repassword = this.localForm.repassword;
			const password = this.localForm.password;
			if (repassword.length < 8) {
				this.formErrors.repassword = '確認密碼需至少 8 碼';
			} else if (!(/[A-Za-z]/.test(repassword) && /\d/.test(repassword))) {
				this.formErrors.repassword = '確認密碼需含英文字母與數字';
			} else if (repassword !== password) {
				this.formErrors.repassword = '密碼不一致';
			} else {
				this.formErrors.repassword = '';
			}
			return !this.formErrors.repassword;
		},

		// 驗證全部回傳父元件
		validateForm() {
			// 全部欄位驗證整合
			const ispass_1 = this.validateUsername();
			const ispass_2 = this.validatePassword();
			const ispass_3 = this.validateRepassword();

			return ispass_1 && ispass_2 && ispass_3;
		}
	}
};
</script>

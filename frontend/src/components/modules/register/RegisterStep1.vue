<template>
	<!-- Step 1 -->
	<div :class="['step', { 'active-step': nowStep === 1 }]">
		<h4>{{message.stepTitle}}</h4>

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

		<BaseInput id="username" type="text" :label="message.inputLabel.username" :placeholder="message.inputPlahold.username" :quote="message.quote.username"
			:errorMessage="formErrors.username" @blur="validateUsername" v-model="localForm.username" />

		<BaseInput id="password" type="password" :label="message.inputLabel.password" :placeholder="message.inputPlahold.password" :quote="message.quote.password"
		:error-message="formErrors.password" @blur="validatePassword" v-model="localForm.password" />

		<BaseInput id="repassword" type="password" :label="message.inputLabel.repassword" :placeholder="message.inputPlahold.repassword" :quote="message.quote.repassword"
			:error-message="formErrors.repassword" @blur="validateRepassword" v-model="localForm.repassword" />
	</div>
</template>


<script>
import BaseInput from '@/components/common/BaseInput.vue';

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
			},
			message: {
				stepTitle: '【壹．設定您的帳號與密碼】',

				// input => label
				inputLabel: {
					username: '帳號',
					password: '密碼',
					repassword: '確認密碼',
				},

				// input => placeholder
				inputPlahold: {
					username: '範例：myemail@gmail.com',
					password: '範例：A123456789',
					repassword: '範例：A123456789',
				},

				quote: {
					// 預設提示文字
					username: '請輸入您的帳號',
					password: '請輸入8位以上英數混合密碼',
					repassword: '請輸入8位以上英數混合密碼',
					// 驗證：無輸入
					uninput: {
						username: '格式不符：帳號不得為空',
						password: '格式不符：密碼不得為空',
						repassword: '格式不符：確認密碼不得為空',
					},
					// 驗證：格式錯誤(長度)
					errformatlen: {
						// username: '暫留',
						password: '格式不符：密碼需至少 8 碼',
						repassword: '格式不符：確認密碼需至少 8 碼',
					},
					// 驗證：格式錯誤(英數)
					errformat: {
						// username: '暫留',
						password: '格式不符：密碼需含英文字母與數字',
						repassword: '格式不符：確認密碼需含英文字母與數字',
					},
					// 密碼不一致
					notmatch: '輸入錯誤：與設定密碼不一致',
				},
				
				
			},
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
			if (!this.localForm.username || this.localForm.username.trim() === '') {
				this.formErrors.username = this.message.quote.uninput.username;
				return false;
			} else {
				this.formErrors.username = '';
				return true;
			}
		},

		// 驗證密碼
		validatePassword() {
			const password = this.localForm.password;
			const rule = (/[A-Za-z]/.test(password) && /\d/.test(password));

			if (!password || password.trim() === '') {
				// 驗證：無輸入
				this.formErrors.password = this.message.quote.uninput.password;
				return false;
			} else if (password.length < 8) {
				// 驗證：格式錯誤(長度)
				this.formErrors.password = this.message.quote.errformatlen.password;
				return false;
			} else if (!rule) {
				// 驗證：格式錯誤(英數)
				this.formErrors.password = this.message.quote.errformat.password;
				return false;
			} else {
				// 驗證：通過！
				this.formErrors.password = '';
				return true;
			}
		},

		// 驗證重複密碼
		validateRepassword() {
			const password = this.localForm.password;
			const repassword = this.localForm.repassword;
			const rule = (/[A-Za-z]/.test(repassword) && /\d/.test(repassword));

			if (!repassword || repassword.trim() === '') {
				// 驗證：無輸入
				this.formErrors.repassword = this.message.quote.uninput.repassword;
				return false;
			} else if (repassword.length < 8) {
				// 驗證：格式錯誤(長度)
				this.formErrors.repassword = this.message.quote.errformatlen.repassword;
				return false;
			} else if (!rule) {
				// 驗證：格式錯誤(英數)
				this.formErrors.repassword = this.message.quote.errformat.repassword;
				return false;
			} else if (repassword !== password) {
				// 驗證：密碼不一致
				this.formErrors.repassword = this.message.quote.notmatch;
				return false;
			} else {
				// 驗證：通過！
				this.formErrors.repassword = '';
				return true;
			}
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

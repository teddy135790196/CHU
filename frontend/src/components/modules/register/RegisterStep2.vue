<template>
	<!-- Step 2 -->
	<div id="step2" :class="['step', nowStep === 2 ? 'active-step' : '']">
		<h4>{{ message.stepTitle }}</h4>
		<!-- 暱稱：{{ localForm.nickname }}<br>	
		性別：{{ genderText }}<br>	
		生日：{{ localForm.birth }}<br>	 -->
		<BaseInput 
		id="nickname" 
		type="text" 
		:label="message.inputLabel.nickname" 
		:placeholder="message.inputplahold.nickname" 
		:quote="message.quote.nickname"
		:error-message="formErrors.nickname"
		@blur="validateNickname"
		v-model="localForm.nickname"  />

		<!-- 性別核取區塊 -->
		<div class="inp_modle">
			<p>{{ message.inputLabel.nickname }}</p>
			<div class="soild"></div>
			<div class="gender" @blur="validateGender">
				<!-- 男性 -->
				<div class="gender-check">
					<input 
					type="radio" 
					name="gender" 
					id="male" 
					value="male" 
					v-model="localForm.gender" />
					<label for="male">&nbsp;{{genderMap.male}}</label>
				</div>
				<!-- 女性 -->
				<div class="gender-check">
					<input 
					type="radio" 
					name="gender" 
					id="female" 
					value="female" 
					v-model="localForm.gender" />
					<label for="female">&nbsp;{{genderMap.female}}</label>
				</div>
				<!-- 隱藏 -->
				<div class="gender-check">
					<input 
					type="radio" 
					name="gender" 
					id="hidden" 
					value="hidden" 
					v-model="localForm.gender" />
					<label for="hidden">&nbsp;{{genderMap.hidden}}</label>
				</div>
			</div>
			<span :class="['quote', formErrors.gender ? 'error' : '']">
				{{ formErrors.gender || message.quote.gender }}
			</span>
		</div>

		<!-- 生日 -->
		<BaseInput 
			id="birth" 
			type="date" 
			:label="message.inputLabel.birth" 
			:quote="message.quote.birth"
			:error-message="formErrors.birth"
			@blur="validateBirth"
			v-model="localForm.birth"  />
	</div>
</template>

<script>
import BaseInput from '@/components/common/BaseInput.vue';

export default {
	// 註冊名稱
	name: "RegisterStep2",
	// 引入子元件
	components: {
		BaseInput
	},
	// 接收資料
	props: {
		nowStep: Number,
		formData: {
			type: Object,
			required: true,
		},
	},
	// 本地資料庫
	data() {
		return {
			// 引入資料
			localForm: {
				nickname: this.formData.nickname,
				gender: this.formData.gender,
				birth: this.formData.birth,
			},
			// 錯誤訊息
			formErrors: {
				nickname: '',
				gender: '',
				birth: ''
			},
			// 性別選項對應文字
			genderMap: {
				male: '男性',
				female: '女性',
				hidden: '隱藏'
			},

			// 修改顯示訊息區
			message: {
				stepTitle: '【貳．設定您的個人資料】',

				// input => label
				inputLabel: {
					nickname: '暱稱',
					gender: '性別',
					birth: '生日',
				},

				// input => placeholder
				inputplahold: {
					nickname: '範例：棲遲',
					// gender: '範例：A123456789',
					// birth: '範例：A123456789',
				},

				
				quote: {
					// 預設提示文字
					// 驗證：無輸入
					nickname: '請輸入您的暱稱',
					gender: '請選擇您的性別',
					birth: '請選擇您的生日',
					// 驗證：格式錯誤
					errformat: {
						// nickname: '暫留',
						// gender: '暫留',
						birth: '格式不符：生日不能是未來的日期',
					},
				},
				
			},
		};
	},
	// 計算
	computed: {
		// 取得核取文字
			genderText() {
			return this.genderMap[this.localForm.gender] || '未選擇';
		}
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
		// 驗證暱稱
		validateNickname() {
			if (this.localForm.nickname.trim() === '') {
				// 驗證：無輸入
				this.formErrors.nickname = this.message.quote.nickname;
				return false;
			} else {
				// 驗證：通過！
				this.formErrors.nickname = '';
				return true;
			}
		},

		// 驗證性別
		validateGender() {
			if (!this.localForm.gender) {
				// 驗證：無輸入
				this.formErrors.gender = this.message.quote.gender;
				return false;
			} else {
				// 驗證：通過！
				this.formErrors.gender = '';
				return true;
			}
		},

		// 驗證生日
		validateBirth() {
			const today = new Date().toISOString().split('T')[0]; // 取得今天的日期（格式：YYYY-MM-DD）

			if (!this.localForm.birth) {
				// 驗證：無輸入
				this.formErrors.birth = this.message.quote.birth;
				return false;
			} else if (this.localForm.birth > today) {
				// 驗證：格式錯誤
				this.formErrors.birth = this.message.quote.errformat.birth;
				return false;
			} else {
				// 驗證：通過！
				this.formErrors.birth = '';
				return true;
			}
		},

		// 驗證全部回傳父元件
		validateForm() {
			// 全部欄位驗證整合
			const ispass_1 = this.validateNickname();
			const ispass_2 = this.validateGender();
			const ispass_3 = this.validateBirth();
			console.log(this.localForm)
			return ispass_1 && ispass_2 && ispass_3;
		}
	}
};
</script>


<style scoped>

/* ========================================
   基本全局樣式（適用於所有設備）
   寫好的CSS貼在這區
======================================== */

#step2 {

	/* 性別核取 */
	.gender {
		display: flex;
		flex-direction: row;
		/* 對齊 - 調整核取整體 */
		margin-top: 4px;
		margin-bottom: 0px;
		gap: 30px;

		.gender-check {
			display: flex;

			margin-right: 36px;

			input[type="radio"] {
				box-shadow: none;
				transform: scale(1.5); /* 放大 1.5 倍 */
			}

			label {
				/* 對齊 - 調整核取文字 */
				margin-top: 7px;
				margin-bottom: -4px;
				/* 防止意外換行 */
				white-space: nowrap;
				font-size: 20px;
			}
		}


	}

	.quote.error {
		color: var(--error);
		/* font-weight: bold; */
	}

	
}




/* ========================================
   sm: 577px ~ 767px (大型手機、直向平板)
   container 寬度: 540px
======================================== */
@media (min-width: 577px) and (max-width: 767px) {

  /* 圓角內容區塊 */
  .content.register {
    border-radius: 0;

    min-width: 90%;

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

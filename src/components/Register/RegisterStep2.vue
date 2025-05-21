<template>
	<!-- Step 2 -->
	<div id="step2" :class="['step', nowStep === 2 ? 'active-step' : '']">
		<h4>【貳．設定您的個人資料】</h4>
		<!-- 暱稱：{{ localForm.nickname }}<br>	
		性別：{{ genderText }}<br>	
		生日：{{ localForm.birth }}<br>	 -->
		<BaseInput 
		id="nickname" 
		label="暱稱" 
		type="text" 
		placeholder="請輸入您的暱稱" 
		quote="請輸入您的暱稱"
		v-model="localForm.nickname" 
		:error-message="formErrors.nickname"
		@blur="validateNickname" />

		<!-- 性別核取區塊 -->
		<div class="inp_modle">
			<p>性別</p>
			<div class="soild"></div>
			<div class="gender">
				<!-- 男性 -->
				<div class="gender-check">
					<input type="radio" name="gender" id="male" value="male" v-model="localForm.gender" />
					<label for="male">&nbsp;{{genderMap.male}}</label>
				</div>
				<!-- 女性 -->
				<div class="gender-check">
					<input type="radio" name="gender" id="female" value="female" v-model="localForm.gender" />
					<label for="female">&nbsp;{{genderMap.female}}</label>
				</div>
				<!-- 隱藏 -->
				<div class="gender-check">
					<input type="radio" name="gender" id="hidden" value="hidden" v-model="localForm.gender" />
					<label for="hidden">&nbsp;{{genderMap.hidden}}</label>
				</div>
			</div>
			<span class="quote">請選擇您的性別</span>
		</div>

		<!-- 生日 -->
		<BaseInput 
			id="birth" 
			label="生日" 
			type="date" 
			placeholder="請選擇您的生日" 
			quote="請選擇您的出生年月"
			v-model="localForm.birth" 
			:error-message="formErrors.birth"
			@blur="validateBirth" />
	</div>
</template>

<script>
import BaseInput from '@/components/Form/BaseInput.vue';

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
			localForm: {
				nickname: this.formData.nickname,
				gender: this.formData.gender,
				birth: this.formData.birth,
			},
			formErrors: {
				nickname: '',
				gender: '',
				birth: ''
			},
			genderMap: {
        male: '男性',
        female: '女性',
        hidden: '隱藏'
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
				this.formErrors.nickname = '請輸入暱稱';
				return false;
			} else {
				this.formErrors.nickname = '';
				return true;
			}
		},

		// 驗證性別
		validateGender() {
			return true;
		},

		// 驗證生日
		validateBirth() {
			const today = new Date().toISOString().split('T')[0]; // 取得今天的日期（格式：YYYY-MM-DD）

			if (!this.localForm.birth) {
				this.formErrors.birth = '請選擇生日';
				return false;
			} else if (this.localForm.birth > today) {
				this.formErrors.birth = '生日不能是未來的日期';
				return false;
			} else {
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
#step2 {

	/* 性別核取 */
	.gender {
		display: flex;
		flex-direction: row;
		/* 對齊 - 調整核取少了2px */
		margin-top: 2px;
		margin-bottom: -2px;
		margin-right: 20px;

		.gender-check {
			display: flex;

			margin-right: 36px;

			input[type="radio"] {
				box-shadow: none;

			}

			label {
				white-space: nowrap;
				/* 防止意外換行 */
			}
		}


	}

	
}


</style>

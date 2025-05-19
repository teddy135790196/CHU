<template>
	<!-- Step 1 -->
	<div :class="['step', nowStep === 1 ? 'active-step' : '']">
		<h4>【壹．設定您的帳號與密碼】</h4>


		<BaseInput
			id="username"
			label="帳號"
			type="text"
			placeholder="請輸入您的帳號或電子郵箱"
			v-model="form.username"
			quote="請輸入您的帳號"
			:error-message="formErrors.username"
		/>

		<BaseInput
			id="password"
			label="密碼"
			type="password"
			placeholder="請輸入您的密碼"
			v-model="form.password"
			quote="請輸入8位以上英數混合密碼"
			:error-message="formErrors.password"
		/>

		<BaseInput
			id="repassword"
			label="確認密碼"
			type="password"
			placeholder="請再次輸入您的密碼"
			v-model="form.repassword"
			quote="請輸入8位以上英數混合密碼"
			:error-message="formErrors.repassword"
		/>
	</div>
</template>


<script setup>
import { reactive } from 'vue';	// reactive自動監測變化(比blur簡單)
import BaseInput from '@/components/Form/BaseInput.vue'; // 請根據實際路徑調整

const form = reactive({
	username: '',
	password: '',
	repassword: ''
});

const formErrors = reactive({
  username: '',
  password: '',
  repassword: ''
});

// 接收Register.vue的資料
defineProps({
	nowStep: Number
});

// validateForm() 是一個驗證函式，作用是檢查表單資料是否符合規範
function validateForm() {
  formErrors.username = form.username ? '' : '帳號不得為空';
  formErrors.password = form.password.length >= 8 ? '' : '密碼需至少 8 碼';
  formErrors.repassword = form.repassword === form.password ? '' : '密碼不一致';

  // 返回驗證結果：true 表示沒錯誤
  return !formErrors.username && !formErrors.password && !formErrors.repassword;
}



// 👇 讓父層可以呼叫這個方法
defineExpose({
  validateForm
});

</script>
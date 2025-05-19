<template>
	<!-- Step 3 -->
	<div :class="['step', nowStep === 3 ? 'active-step' : '']">
		<h4>【參．想知道您的聯絡方式】</h4>

		<BaseInput
			id="email"
			label="電子郵件"
			type="email"
			placeholder="請輸入您的電子郵箱"
			v-model="form.email"
			quote="請輸入您的電子郵箱"
			:error-message="formErrors.email"
		/>

		<BaseInput
			id="phone"
			label="手機號碼"
			type="tel"
			placeholder="請輸入您的手機號碼"
			v-model="form.phone"
			quote="10位數字"
			:error-message="formErrors.phone"
		/>
	</div>
</template>

<script setup>
import { reactive } from 'vue';
import BaseInput from '@/components/Form/BaseInput.vue';

const form = reactive({
	email: '',
	phone: ''
});

const formErrors = reactive({
	email: '',
	phone: ''
});

defineProps({
	nowStep: Number
});

function validateForm() {
	// email 格式驗證
	formErrors.email = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(form.email)
		? ''
		: '請輸入有效的電子郵箱';

	// 手機號碼驗證（10 位數字）
	formErrors.phone = /^\d{10}$/.test(form.phone)
		? ''
		: '請輸入 10 位數字的手機號碼';

	// 驗證是否通過
	return !formErrors.email && !formErrors.phone;
}

defineExpose({
	validateForm
});
</script>

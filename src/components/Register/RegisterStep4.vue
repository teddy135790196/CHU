<template>
	<!-- Step 4 -->
	<div :class="['step', nowStep === 4 ? 'active-step' : '']">
		<h4>【肆．確認您的資料並驗證】</h4>

		<p>暱稱：{{ form.nickname }}</p>
		<p>性別：{{ genderText }}</p>
		<p>生日：{{ form.birth }}</p>
		<p>電子郵件：{{ form.email }}</p>
		<p>電話：{{ form.phone }}</p>
	</div>
</template>

<script setup>
const props = defineProps({
	nowStep: Number,
	form: {
		type: Object,
		required: true
	}
});

</script>

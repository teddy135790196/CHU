<template>
	<!-- Step 2 -->
	<div :class="['step', nowStep === 2 ? 'active-step' : '']">
		<h4>【貳．設定您的個人資料】</h4>

		<BaseInput
			id="nickname"
			label="暱稱"
			type="text"
			placeholder="請輸入您的暱稱"
			v-model="form.nickname"
			quote="請輸入您的暱稱"
			:error-message="formErrors.nickname"
		/>

		<!-- 性別 -->
		<div class="inp_modle">
			<p>性別</p>
			<div class="soild"></div>
			<div class="gender">
				<div class="gender-check">
					<input type="radio" id="male" value="male" v-model="form.gender" />
					<label for="male">&nbsp;男性</label>
				</div>
				<div class="gender-check">
					<input type="radio" id="female" value="female" v-model="form.gender" />
					<label for="female">&nbsp;女性</label>
				</div>
				<div class="gender-check">
					<input type="radio" id="hidden" value="hidden" v-model="form.gender" />
					<label for="hidden">&nbsp;隱藏</label>
				</div>
			</div>
			<span class="quote" :style="{ color: formErrors.gender ? 'red' : '' }">
				{{ formErrors.gender || '請選擇您的性別' }}
			</span>
		</div>

		<!-- 生日 -->
		<div class="inp_modle">
			<p>生日</p>
			<div class="soild"></div>
			<input
				v-model="form.birth"
				type="date"
				placeholder="請選擇您的生日"
			/>
			<span class="quote" :style="{ color: formErrors.birth ? 'red' : '' }">
				{{ formErrors.birth || '請選擇您的出生年月' }}
			</span>
		</div>
	</div>
</template>

<script setup>
import { reactive } from 'vue';
import BaseInput from '@/components/Form/BaseInput.vue';

const form = reactive({
	nickname: '',
	gender: '',
	birth: ''
});

const formErrors = reactive({
	nickname: '',
	gender: '',
	birth: ''
});

defineProps({
	nowStep: Number
});

function validateForm() {
	formErrors.nickname = form.nickname ? '' : '暱稱不得為空';
	formErrors.gender = form.gender ? '' : '請選擇性別';
	formErrors.birth = form.birth ? '' : '請選擇生日';

	// 驗證結果回傳
	return !formErrors.nickname && !formErrors.gender && !formErrors.birth;
}

defineExpose({
	validateForm
});
</script>

<style scoped>
.gender {
	display: flex;
	gap: 1em;
	margin: 8px 0;
}
.gender-check {
	display: flex;
	align-items: center;
}
</style>

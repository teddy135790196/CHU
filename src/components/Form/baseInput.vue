<template>
	<div class="inp_modle">
		<p>{{ label }}</p>
		<div class="soild"></div>
		<input :id="id" :type="type" :placeholder="placeholder" :value="modelValue"
			@input="$emit('update:modelValue', $event.target.value)" />
		<span class="quote" :class="{ error: errorMessage }">
			{{ errorMessage || quote }}
		</span>
	</div>
</template>

<script setup>
defineProps({
	id: String,
	label: String,
	type: {
		type: String,
		default: 'text'
	},
	placeholder: String,
	modelValue: String,
	quote: String	// 預設提示
	errorMessage: String // 錯誤訊息（可選）
});
</script>


<!-- scoped 表示只在這個.vue裡面使用 -->
<style scoped>
/* 標準輸入區 */
.inp_modle {

	width: 100%;
	text-align: left;
	line-height: normal;
	margin-bottom: 24px;

	p {
		font-size: 24px;
		color: var(--main-color);
		margin-bottom: 0;
	}

	.soild {
		height: 2px;
		background-color: var(--main-color);
		z-index: 1;
	}

	input {
		width: 100%;
		/* 內陰影 */
		/* box-shadow: inset x-offset y-offset blur-radius color; */
		box-shadow: inset -2px -2px 4px rgba(0, 0, 0, 0.4);
		/* 去除邊框 */
		border: none;
		/* 去除聚焦外框 */
		outline: none;

		&:focus {
			background-color: var(--inputfocus);
		}
	}

	/* 引用區塊樣式 */
	.quote {
		border-left: 2.4px solid #777;
		padding-left: 0.5em;
		font-size: 11px;
		font-style: italic;
		color: #777;
		line-height: 1.6;
	}

	.quote.error {
		color: var(--error);
	}

}
</style>
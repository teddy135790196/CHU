<template>
	<div class="inp_modle">
		<p>{{ label }}</p>
		<div class="soild"></div>
		<input :id="id" :type="type" :placeholder="placeholder" :value="value"
			@input="$emit('input', $event.target.value)" @blur="$emit('blur')" />
		<span class="quote" :class="{ error: errorMessage }">
			{{ errorMessage || quote }}
		</span>
	</div>
</template>

<script>
export default {
	name: 'BaseInput',
	props: {
		id: String,
		label: String,
		type: {
			type: String,
			default: 'text'
		},
		placeholder: String,
		value: String,
		quote: String,
		errorMessage: String,
	},
};
</script>


<!-- scoped 表示只在這個.vue裡面使用 -->
<style>
/* ========================================
   基本全局樣式（適用於所有設備）
   寫好的CSS貼在這區
======================================== */

/* 標準輸入區 */
.inp_modle {
	width: 100%;
	text-align: left;
	line-height: normal;
	margin-bottom: 24px;

	p {
		font-family: '王翰宗顏楷體';
		font-size: 24px;
		color: var(--main-color);
		margin-bottom: 0;
	}

	.soild {
		height: 2px;
		z-index: 1;
		background-color: var(--main-color);
	}

	input {
		padding-left: 6px;
		width: 100%;
		height: 30px;
		/* 內陰影 */
		box-shadow: inset -2px -2px 4px var(--second-back-color-transluc);
		/* 去除邊框 */
		border: none;
		/* 去除聚焦外框 */
		outline: none;

		&:focus {
			background-color: var(--inputfocus);
		}
	}

	/* 針對 date 類型的 input */
	input[type="date"] {
		padding: 1px 6px;
	}

	/* 引用區塊樣式 */
	.quote {
		border-left: 2.4px solid var(--quote-text-color);
		padding-left: 0.5em;
		font-family: '王翰宗中仿宋';
		font-size: 14px;
		font-style: italic;
		color: var(--quote-text-color);
		line-height: 1.6;
	}

	.quote.error {
		color: var(--error);
		/* font-weight: bold; */
	}

}




/* ========================================
   xxl: ≥ 1400px (大桌機、4K 螢幕)
   container 寬度: 1320px
======================================== */
@media (min-width: 1400px) {

	/* 標準輸入區 */
	.inp_modle {
		p {
			font-size: 38px;
		}

		input {
			height: 38px;
			font-size: 24px;
		}

		/* 引用區塊樣式 */
		.quote {
			font-size: 18px;
		}
	}
}




/* ========================================
   xl: 1200px ~ 1399px (一般桌機)
   container 寬度: 1140px
======================================== */
@media (min-width: 1200px) and (max-width: 1399px) {

	/* 標準輸入區 */
	.inp_modle {
		p {
			font-size: 36px;
		}

		input {
			height: 36px;
			font-size: 22px;
		}

		/* 引用區塊樣式 */
		.quote {
			font-size: 18px;
		}
	}
}




/* ========================================
   lg: 992px ~ 1199px (小型桌機、橫向大型平板)
   container 寬度: 960px
======================================== */
@media (min-width: 992px) and (max-width: 1199px) {

	/* 標準輸入區 */
	.inp_modle {
		p {
			font-size: 34px;
		}

		input {
			height: 34px;
			font-size: 20px;
		}

		/* 引用區塊樣式 */
		.quote {
			font-size: 17px;
		}
	}
}




/* ========================================
   md: 768px ~ 991px (橫向 iPad、小型平板)
   container 寬度: 720px
======================================== */
@media (min-width: 768px) and (max-width: 991px) {

	/* 標準輸入區 */
	.inp_modle {
		p {
			font-size: 32px;
		}

		input {
			height: 32px;
			font-size: 18px;
		}

		/* 引用區塊樣式 */
		.quote {
			font-size: 16px;
		}
	}
}




/* ========================================
   sm: 577px ~ 767px (大型手機、直向平板)
   container 寬度: 540px
======================================== */
@media (min-width: 577px) and (max-width: 767px) {

	/* 標準輸入區 */
	.inp_modle {
		p {
			font-size: 30px;
		}

		input {
			height: 30px;
			font-size: 17px;
		}

		/* 引用區塊樣式 */
		.quote {
			font-size: 15px;
		}
	}
}




/* ========================================
   xs: ≤ 576px (手機)
   container 寬度: 100% (fluid)
======================================== */
@media (max-width: 576px) {

	/* 標準輸入區 */
	.inp_modle {
		p {
			font-size: 28px;
		}

		input {
			height: 28px;
			font-size: 16px;
		}

		/* 引用區塊樣式 */
		.quote {
			font-size: 14px;
		}
	}
}
</style>

<template>
  <div class="inp_modle">
    <p>{{ label }}</p>
    <div class="soild"></div>
    <input
			:id="id"
			:type="type"
			:placeholder="placeholder"
			:value="value"
			@input="$emit('input', $event.target.value)"
			@blur="$emit('blur')"
		/>
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
		background-color: var(--main-color);
	}

	input {
		padding-left: 6px;
		width: 100%;
		height: 30px;
		/* 內陰影 */
		box-shadow: inset -2px -2px 4px rgba(0, 0, 0, 0.4);
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
		border-left: 2.4px solid #777;
		padding-left: 0.5em;
		font-family: '王翰宗中仿宋';
		font-size: 14px;
		font-style: italic;
		color: #777;
		line-height: 1.6;
	}

	.quote.error {
		color: var(--error);
		/* font-weight: bold; */
	}

}


/* 標準輸入區 */
@media (max-width: 540px) {
	.inp_modle {

		p {
			font-size: 20px !important;
		}

		input {
			height: 24px;
		}

		/* 針對 date 類型的 input */
		input[type="date"] {
			padding: 1px 0;
		}

		/* 引用區塊樣式 */
		.quote {
			font-size: 12px;
		}

	}
}

</style>

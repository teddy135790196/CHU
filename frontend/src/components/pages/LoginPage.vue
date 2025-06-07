<template>
  <div class="col-sm-12 col-md-6 d-flex align-items-center justify-content-center">
    <div class="content page-login content-right d-flex flex-column">
      <form class="flex-grow-1" @submit.prevent="login">
        <div class="login-box">
          <div class="inp_modle">
            <p>帳號</p>
            <div class="soild"></div>
            <input
              type="text"
              placeholder="請輸入您的帳號或電子郵箱"
              v-model="form.username"
              required
            />
          </div>
        </div>
        <div class="login-box">
          <div class="inp_modle">
            <p>密碼</p>
            <div class="soild"></div>
            <input
              type="password"
              placeholder="請輸入您所設定的密碼"
              v-model="form.password"
              required
            />
          </div>
        </div>
        <button type="submit" class="button">登入</button>
        <div class="other mt-auto">
          <a href="#">忘記密碼</a>
          ｜
					<a href="./register">加入會員</a>
        </div>
      </form>
    </div>
  </div>
</template>


<script>
export default {
	name: "LoginPage",
	data() {
		return {
			form: {
				username: '',
				password: '',
			},
		}
	},
	methods: {
		async login() {
			console.log(this.form)
			try {
				const res = await this.$axios.post('/api/login', this.form);
				console.log('登入成功', res.data);

				this.$router.push('/members');
			} catch (error) {
				alert('帳號或密碼錯誤！');
				console.error('登入失敗', error);
			}
		}
	}
};
</script>

<style scoped>
/* ========================================
   基本全局樣式（適用於所有設備）
   寫好的CSS貼在這區
======================================== */

/* 標準輸入區 */
.inp_modle {
	p {
		font-size: 32px;
	}

	.soild {
		height: 3px;
	}

	input {
		height: 32px;
		font-size: 18px;
	}
}

/* 登入按鈕 */
.button {
	display: block;
	padding: 5px;
	border: 0;
	border-radius: 4px;
	background-color: var(--main-color);

	font-family: '王翰宗粗鋼體';
	font-size: 20px;
	color: var(--main-text-color);
	text-align: center;
	text-decoration: none;
}

/* 超大或 */
.or {
	font-family: '王翰宗中行書';
	font-size: 72px;
	margin: 0;
}

/* 忘記密碼與登入會員 */
.other {
	flex-direction: row;
	justify-content: center;
	gap: 10px;

	a {
		font-size: 18px;

		color: var(--second-color);
		text-decoration: none;


		&:hover {
			font-weight: bold;

			text-decoration: underline solid;
			/* 粗底線 */
			text-decoration-thickness: 2.2px;
			/* 與文字的距離 */
			text-underline-offset: 4px;
		}
	}
}




/* ========================================
   xxl: ≥ 1400px (大桌機、4K 螢幕)
   container 寬度: 1320px
======================================== */
@media (min-width: 1400px) {
	.inp_modle {
		p {
			font-size: 42px;
		}

		input {
			height: 42px;
			font-size: 25px;
		}
	}

	/* 登入按鈕 */
	.button {
		margin-top: 6px;
		font-size: 24px;
	}

	/* 超大或 */
	/* .or {
		font-size: 72px;
	} */

	/* 忘記密碼與登入會員 */
	.other {
		a {
			font-size: 22px;

		}
	}
}




/* ========================================
   xl: 1200px ~ 1399px (一般桌機)
   container 寬度: 1140px
======================================== */
@media (min-width: 1200px) and (max-width: 1399px) {
	.inp_modle {
		p {
			font-size: 38px;
		}

		input {
			height: 38px;
			font-size: 23px;
		}
	}

	/* 登入按鈕 */
	.button {
		margin-top: 4px;
		font-size: 22px;
	}

	/* 超大或 */
	/* .or {
		font-size: 72px;
	} */

	/* 忘記密碼與登入會員 */
	.other {
		a {
			font-size: 20px;

		}
	}
}




/* ========================================
   lg: 992px ~ 1199px (小型桌機、橫向大型平板)
   container 寬度: 960px
======================================== */
@media (min-width: 992px) and (max-width: 1199px) {
	.inp_modle {
		p {
			font-size: 36px;
		}

		input {
			height: 36px;
			font-size: 21px;
		}
	}

	/* 登入按鈕 */
	.button {
		margin-top: 4px;
		font-size: 21px;
	}

	/* 超大或 */
	/* .or {
		font-size: 72px;
	} */

	/* 忘記密碼與登入會員 */
	.other {
		a {
			font-size: 19px;

		}
	}
}




/* ========================================
   md: 768px ~ 991px (橫向 iPad、小型平板)
   container 寬度: 720px
======================================== */
@media (min-width: 768px) and (max-width: 991px) {
	.inp_modle {
		p {
			font-size: 32px;
		}

		input {
			height: 32px;
			font-size: 18px;
		}
	}

	/* 登入按鈕 */
	.button {
		font-size: 18px;
	}

	/* 超大或 */
	/* .or {
		font-size: 72px;
	} */

	/* 忘記密碼與登入會員 */
	.other {
		a {
			font-size: 18px;

		}
	}
}




/* ========================================
   sm: 577px ~ 767px (大型手機、直向平板)
   container 寬度: 540px
======================================== */
@media (min-width: 577px) and (max-width: 767px) {
	.inp_modle {
		p {
			font-size: 36px;
		}

		input {
			height: 36px;
			font-size: 21px;
		}
	}

	/* 登入按鈕 */
	.button {
		font-size: 21px;
	}

	/* 超大或 */
	/* .or {
		font-size: 72px;
	} */

	/* 忘記密碼與登入會員 */
	.other {
		a {
			font-size: 20px;

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
			font-size: 32px;
		}

		input {
			height: 32px;
			font-size: 18px;
		}
	}

	/* 登入按鈕 */
	.button {
		font-size: 20px;
	}

	/* 超大或 */
	/* .or {
		font-size: 72px;
	} */

	/* 忘記密碼與登入會員 */
	.other {
		a {
			font-size: 18px;

		}
	}
}
</style>

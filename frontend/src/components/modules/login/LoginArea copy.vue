<template>
  <div
    class="col-sm-12 col-md-6 d-flex align-items-center justify-content-center"
  >
    <div class="content login content-right d-flex flex-column">
      <div class="login-box d-flex">
        <div class="inp_modle">
          <p>帳號</p>
          <div class="soild"></div>
          <input type="text" placeholder="請輸入您的帳號或電子郵箱" />
        </div>
      </div>
      <div class="login-box d-flex">
        <div class="inp_modle">
          <p>密碼</p>
          <div class="soild"></div>
          <input type="password" placeholder="請輸入您所設定的密碼" />
        </div>
      </div>
      <!-- <button type="button"> -->
        <a href="./membersArea" class="button">登入</a>
      <!-- </button> -->
      <div class="other mt-auto">
        <a href="#">忘記密碼</a>
        ｜
        <a href="./register">加入會員</a>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "LoginArea",
};
</script>

<style scoped>
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

		a{
			font-size: 18px;
			
			color: var(--second-color);
			text-decoration: none;
			

			&:hover{
				font-weight: bold;
				
				text-decoration: underline solid;
				/* 粗底線 */
				text-decoration-thickness: 2.2px;
				/* 與文字的距離 */
				text-underline-offset: 4px; 
			}
		}
	}
</style>

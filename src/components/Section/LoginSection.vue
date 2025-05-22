<template>
  <div
    class="col box-md-6 d-flex align-items-center justify-content-center"
  >
    <div class="content content-right d-flex flex-column">
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
      <button type="button">登入</button>
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
  name: "LoginSection",
};
</script>

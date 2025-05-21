<template>
  <!-- Step 4 -->
  <div id="step4" :class="['step', nowStep === 4 ? 'active-step' : '']">
    <h4>【肆．確認您的資料並驗證】</h4>

    <h5>{{ form.nickname }} 您好</h5>
    <div class="underline"></div>

    <div class="form">
      <div class="col">
        <span class="name">性別：</span>
        <span class="data">{{ genderText }}</span>
      </div>
      <div class="col">
        <span class="name">生日：</span>
      <span class="data">{{ form.birth }}</span>
      </div>
      <div class="col">
        <span class="name">電子郵件：</span>
        <span class="data">{{ form.email }}</span>
      </div>
      <div class="col">
        <span class="name">電話：</span>
        <span class="data">{{ form.phone }}</span>
      </div>
    </div>
    
  </div>
</template>

<script>
export default {
  name: "RegisterStep4",
  props: {
    nowStep: Number,
    form: {
      type: Object,
      required: true
    }
  },
  // 本地資料庫
  data() {
    return {
      localForm: {
        nickname: this.form.nickname,
        gender: this.form.gender,
        birth: this.form.birth,
        email: this.form.email,
        phone: this.form.phone,
      },  // 複製 prop 避免直接改
    };
  },
  computed: {
    genderText() {
      switch (this.form.gender) {
        case 'male': return '男';
        case 'female': return '女';
        case 'hidden': return '隱藏';
        default: return '未選擇';
      }
    }
  },
  methods: {
    validateForm() {
      // 增加驗證碼判斷

      return true;
    }
  }
}
</script>

<style>
#step4 {

  /* 暱稱 */
  h5 {
    font-size: 22px;
    color: var(--main-color);
    text-align: center;
    margin-bottom: 0;
  }

  /* 底線 */
  .underline {
    width: 70%;
    height: 1px;
    background-color: black;
    margin: 18px auto;
  }

  .form{
    padding: 0 24px;

    .col{
      margin-bottom: 10px;
    }

    /* 文字 */
    .name {
      display: inline-block;
      font-weight: bold;
      color: var(--main-color);
      width: 80px;
    }

    /* 資料 */
    .data {
      margin-left: 5px;
      margin-bottom: 10px;
    }
  }
  
}

@media (max-width: 540px) {
  #step4 {

    /* 暱稱 */
    h5 {
      font-size: 20px;
    }

    /* 底線 */
    .underline {
      margin: 14px auto;
    }

    .form{
      padding: 0 10px;

      .col{
      }

      /* 文字 */
      .name {
      }

      /* 資料 */
      .data {
      }
    }
    
  }
}
</style>
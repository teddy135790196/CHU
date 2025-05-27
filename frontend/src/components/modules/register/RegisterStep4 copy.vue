<template>
  <!-- Step 4 -->
  <div id="step4" :class="['step', nowStep === 4 ? 'active-step' : '']">
    <h4>{{ message.stepTitle }}</h4>

    <h5>{{ form.nickname }} 您好</h5>
    <div class="underline"></div>

    <div class="form">
      <div class="col">
        <span class="name">{{ message.labelText.gender }}：</span>
        <span class="data">{{ genderText }}</span>
      </div>
      <div class="col">
        <span class="name">{{ message.labelText.birth }}：</span>
      <span class="data">{{ form.birth }}</span>
      </div>
      <div class="col">
        <span class="name">{{ message.labelText.email }}：</span>
        <span class="data">{{ form.email }}</span>
      </div>
      <div class="col">
        <span class="name">{{ message.labelText.phone }}：</span>
        <span class="data">{{ form.phone }}</span>
      </div>
    </div>
    

    <div class="col">
      <!-- <span class="name">驗證碼：</span> -->
      <div  class="captcha">
        <!-- <input type="text" v-model="captchaInput" placeholder="請輸入驗證碼" style="width: 120px; margin-right: 10px;"> -->
        <BaseInput 
        id="captcha" 
        type="text" 
        label="驗證碼" 
        placeholder="請輸入驗證碼" 
        quote="message.quote.repassword"
        error-message="" 
        v-model="message.captch.input" />
        <img :src="message.captch.image" style="" alt="captcha">
      </div>
    </div>
  </div>
</template>

<script>
import BaseInput from '@/components/common/BaseInput.vue';

export default {
  name: "RegisterStep4",
  // 引入子元件
	components: { BaseInput },
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

      // 修改顯示訊息區
      message: {

        stepTitle: '【肆．確認您的資料並驗證】',

        labelText: {
          gender: '性別',
          birth: '生日',
          email: '電子郵件',
          phone: '電話',
        },

        // 驗證碼(未實作。等連結後端)
        captch:{
          input: '',
          image: '',
        },

      },
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
    font-size: 36px;
    font-family: "王翰宗粗鋼體";
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
      display: flex;
      align-items: center;
      margin-bottom: 10px;
    }

    /* 文字 */
    .name {
      display: inline-block;
      font-size: 20px;
      font-family: "王翰宗中仿宋";
      color: var(--main-color);
      width: 100px;
    }

    /* 資料 */
    .data {
      margin-left: 5px;
      font-weight: bold;
    }

    
  }

  /* 驗證碼區塊 */
  .captcha{
    display: flex;
    flex-direction: row;
    align-items: center;
    transform: translateY(150px);

    margin-top: 30px;
    padding: 0 24px;
    gap: 30px;

    .inp_modle{

      input {
        flex: 1; 
        padding: 8px;
        
        font-size: 16px;
      }
    }
    

    img {
      height: 60px; 
      width: 100%;
      cursor: pointer; 
      border: 1px solid #ccc;
      border-radius: 4px;
    }
  }
  
}

@media (max-width: 540px) {
  #step4 {

    /* 暱稱 */
    h5 {
      font-size: 32px;
    }

    /* 底線 */
    .underline {
      margin: 14px auto;
    }

    .form{
      padding: 0 10px;

      .col {
        flex-direction: column; /* 改為上下排列 */
        align-items: flex-start; /* 讓文字靠左 */
      }

      /* 文字 */
      .name {
        display: block;
        border-bottom: 1px solid var(--main-color);
      }

      /* 資料 */
      .data {
        width: 100%; /* 滿寬，避免折行 */
        margin-bottom: 4px; /* 加點間距 */
        margin-left: 2.4em; /* 或 padding-left: 1em; */
      }
    }

    .captcha{
      transform: translateY(20px);
      margin: 20px 0 !important;
      padding: 0 10px;
    }
    
  }
}
</style>
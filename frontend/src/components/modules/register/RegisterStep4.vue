<template>
  <!-- Step 4 -->
  <div id="step4" :class="['step', nowStep === 4 ? 'active-step' : '']">
    <h4>{{ message.stepTitle }}</h4>

    <h5>{{ form.nickname }} 您好</h5>
    <div class="underline"></div>

    <div class="form">
      <div class="col d-flex flex-column align-items-start">
        <span class="name me-2">{{ message.labelText.gender }}：</span>
        <span class="data">{{ genderText }}</span>
      </div>
      <div class="col d-flex flex-column align-items-start">
        <span class="name me-2">{{ message.labelText.birth }}：</span>
      <span class="data">{{ form.birth }}</span>
      </div>
      <div class="col d-flex flex-column align-items-start">
        <span class="name me-2">{{ message.labelText.email }}：</span>
        <span class="data">{{ form.email }}</span>
      </div>
      <div class="col d-flex flex-column align-items-start">
        <span class="name me-2">{{ message.labelText.phone }}：</span>
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
        :label="message.labelText.captcha" 
        :placeholder="message.labelText.captchaPlahold" 
        :quote="message.labelText.captchaQuote"
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
          captcha: '驗證碼',
          captchaPlahold: '請輸入驗證碼',
          captchaQuote: '點擊圖片可更換',
          errformat: '驗證碼錯誤',
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

/* ========================================
   基本全局樣式（適用於所有設備）
   寫好的CSS貼在這區
======================================== */

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
      margin-bottom: 10px;
    }

    /* 文字 */
    .name {
      display: inline-block;
      font-size: 30px;
      font-family: "王翰宗中仿宋";
      color: var(--main-color);
      width: 150px;
    }

    /* 資料 */
    .data {
      margin-left: 35px;
      font-size: 22px;
      font-weight: bold;
    }

    
  }

  /* 驗證碼區塊 */
  .captcha{
    display: flex;
    flex-direction: row;
    align-items: center;
    transform: translateY(0px);

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



/* ========================================
   xxl: ≥ 1400px (大桌機、4K 螢幕)
   container 寬度: 1320px
======================================== */
@media (min-width: 1400px) {
   
}




/* ========================================
   xl: 1200px ~ 1399px (一般桌機)
   container 寬度: 1140px
======================================== */
@media (min-width: 1200px) and (max-width: 1399px) {
   
}




/* ========================================
   lg: 992px ~ 1199px (小型桌機、橫向大型平板)
   container 寬度: 960px
======================================== */
@media (min-width: 992px) and (max-width: 1199px) {
   
}




/* ========================================
   md: 768px ~ 991px (橫向 iPad、小型平板)
   container 寬度: 720px
======================================== */
@media (min-width: 768px) and (max-width: 991px) {
   
}




/* ========================================
   sm: 577px ~ 767px (大型手機、直向平板)
   container 寬度: 540px
======================================== */
@media (min-width: 577px) and (max-width: 767px) {
  h5 {
    font-size: 32px !important;
  }
  .underline{
    margin: 7px auto !important;
  }
   /* 表單 */
  .form{

    /* 文字 */
    .name {
      font-size: 24px !important;
    }

    /* 資料 */
    .data {
      margin-left: 32px !important;
      font-size: 18px !important;
    }
  }

  /* 驗證碼區塊 */
  .captcha{
    transform: translateY(0px) !important;
    margin-top: 20px !important;
  }
}




/* ========================================
   xs: ≤ 576px (手機)
   container 寬度: 100% (fluid)
======================================== */
@media (max-width: 576px) {
/* 暱稱 */
  h5 {
    font-size: 28px !important;
  }

  .underline{
    margin: 5px auto !important;
  }

  .col{
      margin-bottom: 5px !important;
    }

  /* 表單 */
  .form{

    /* 文字 */
    .name {
      font-size: 22px !important;
    }

    /* 資料 */
    .data {
      margin-left: 30px !important;
      font-size: 17px !important;
    }
  }

  /* 驗證碼區塊 */
  .captcha{
    transform: translateY(0px) !important;
    margin-top: 15px !important;
  }
}
</style>
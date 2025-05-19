<template>
  <div class="container">
    <div class="row">
      <div class="col box d-flex align-items-center justify-content-center">
        <div class="content d-flex flex-column">
          <!-- 進度條 -->
          <div class="progress mb-1">
            <div class="progress-bar" :style="{ width: progressWidth[nowStep - 1] + '%' }"></div>
          </div>

          <!-- 註冊步驟子元件 -->
          <RegisterStep1 v-show="nowStep === 1" ref="step1Ref" :nowStep="nowStep" v-model:form="form" />
          <RegisterStep2 v-show="nowStep === 2" ref="step2Ref" :nowStep="nowStep" v-model:form="form" />
          <RegisterStep3 v-show="nowStep === 3" ref="step3Ref" :nowStep="nowStep" v-model:form="form" />
          <RegisterStep4 v-show="nowStep === 4" :nowStep="nowStep" :form="form" />

          <!-- 按鈕區 -->
          <div class="btn-group mt-auto">
            <button class="btn btn-primary" @click="prevStep">
              {{ nowStep === 1 ? "離開" : "上一頁" }}
            </button>
            <button class="btn btn-success" @click="handleNextStep">
              {{ nowStep === 4 ? "完成" : "下一步" }}
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>


<script setup>
import { ref, reactive } from 'vue';

import RegisterStep1 from './RegisterStep1.vue';
import RegisterStep2 from './RegisterStep2.vue';
import RegisterStep3 from './RegisterStep3.vue';
import RegisterStep4 from './RegisterStep4.vue';

const nowStep = ref(1);
const progressWidth = [40, 70, 90, 100];

// 表單資料統一放這裡（傳給子元件雙向綁定）
const form = reactive({
  username: '',
  password: '',
  repassword: '',
  nickname: '',
  gender: 'hidden',
  birth: '',
  email: '',
  phone: ''
});

// 建立各步驟元件的 ref，供驗證時調用 validateForm()
const step1Ref = ref(null);
const step2Ref = ref(null);
const step3Ref = ref(null);

// 前一步按鈕
function prevStep() {
  if (nowStep.value > 1) {
    nowStep.value--;
  } else {
    if (confirm('您確定要離開註冊流程嗎？')) {
      window.location.href = './login';
    }
  }
}

// 下一步按鈕（含驗證邏輯）
function handleNextStep() {
  if (nowStep.value === 1) {
    if (step1Ref.value?.validateForm()) {
      nowStep.value++;
    }
  } else if (nowStep.value === 2) {
    if (step2Ref.value?.validateForm()) {
      nowStep.value++;
    }
  } else if (nowStep.value === 3) {
    if (step3Ref.value?.validateForm()) {
      nowStep.value++;
    }
  } else if (nowStep.value === 4) {
    // 最後一步提交
    if (confirm('確認資料是否無誤？')) {
      window.location.href = './login'; // 可改為 router.push 或 emit
    }
  }
}
</script>

<style scoped>
@import url("https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css");

/* 你的原本CSS也可以放這 */

.wrap {
  height: 100vh;
}

/* 你原本的 .inp_modle、.soild、.quote、.gender 等樣式也可以帶過來 */

.step {
  display: none;
}

.step.active-step {
  display: block;
}
</style>

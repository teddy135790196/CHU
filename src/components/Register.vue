<template>
  <div class="container">
    <div class="row">
      <div class="col box d-flex align-items-center justify-content-center">
        <div class="content d-flex flex-column">
          <!-- 進度條 -->
          <div class="progress mb-1">
            <div
              class="progress-bar"
              :style="{ width: progressWidth[nowStep - 1] + '%' }"
            ></div>
          </div>

          <!-- 註冊步驟表單 -->
          <div>
            <!-- Step 1 -->
            <div :class="['step', nowStep === 1 ? 'active-step' : '']">
              <h4>【壹．設定您的帳號與密碼】</h4>
              <div class="inp_modle">
                <p>帳號</p>
                <div class="soild"></div>
                <input
                  v-model="form.username"
                  type="text"
                  placeholder="請輸入您的帳號或電子郵箱"
                />
                <span class="quote">請輸入您的帳號</span>
              </div>
              <div class="inp_modle">
                <p>密碼</p>
                <div class="soild"></div>
                <input
                  v-model="form.password"
                  type="password"
                  placeholder="請輸入您的密碼"
                />
                <span class="quote">請輸入8位以上英數混合密碼</span>
              </div>
              <div class="inp_modle">
                <p>確認密碼</p>
                <div class="soild"></div>
                <input
                  v-model="form.repassword"
                  type="password"
                  placeholder="請再次輸入您的密碼"
                />
                <span class="quote">請輸入8位以上英數混合密碼</span>
              </div>
            </div>

            <!-- Step 2 -->
            <div :class="['step', nowStep === 2 ? 'active-step' : '']">
              <h4>【貳．設定您的個人資料】</h4>
              <div class="inp_modle">
                <p>暱稱</p>
                <div class="soild"></div>
                <input
                  v-model="form.nickname"
                  type="text"
                  placeholder="請輸入您的暱稱"
                />
                <span class="quote">請輸入您的暱稱</span>
              </div>
              <div class="inp_modle">
                <p>性別</p>
                <div class="soild"></div>
                <div class="gender">
                  <div class="gender-check">
                    <input
                      type="radio"
                      id="male"
                      value="male"
                      v-model="form.gender"
                    />
                    <label for="male">&nbsp;男性</label>
                  </div>
                  <div class="gender-check">
                    <input
                      type="radio"
                      id="female"
                      value="female"
                      v-model="form.gender"
                    />
                    <label for="female">&nbsp;女性</label>
                  </div>
                  <div class="gender-check">
                    <input
                      type="radio"
                      id="hidden"
                      value="hidden"
                      v-model="form.gender"
                    />
                    <label for="hidden">&nbsp;隱藏</label>
                  </div>
                </div>
                <span class="quote">請選擇您的性別</span>
              </div>
              <div class="inp_modle">
                <p>生日</p>
                <div class="soild"></div>
                <input
                  v-model="form.birth"
                  type="date"
                  placeholder="請選擇您的生日"
                />
                <span class="quote">請選擇您的出生年月</span>
              </div>
            </div>

            <!-- Step 3 -->
            <div :class="['step', nowStep === 3 ? 'active-step' : '']">
              <h4>【參．想知道您的聯絡方式】</h4>
              <div class="inp_modle">
                <p>電子郵件</p>
                <div class="soild"></div>
                <input
                  v-model="form.email"
                  type="email"
                  placeholder="請輸入您的電子郵箱"
                />
                <span class="quote">請輸入您的電子郵箱</span>
              </div>
              <div class="inp_modle">
                <p>手機號碼</p>
                <div class="soild"></div>
                <input
                  v-model="form.phone"
                  type="tel"
                  placeholder="請輸入您的手機號碼"
                />
                <span class="quote">10位數字</span>
              </div>
            </div>

            <!-- Step 4 -->
            <div :class="['step', nowStep === 4 ? 'active-step' : '']">
              <h4>【肆．確認您的資料並驗證】</h4>
              <p>暱稱：{{ form.nickname }}</p>
              <p>性別：{{ form.gender }}</p>
              <p>生日：{{ form.birth }}</p>
              <p>電子郵件：{{ form.email }}</p>
              <p>電話：{{ form.phone }}</p>
            </div>
          </div>

          <!-- 按鈕區 -->
          <div class="btn-group mt-auto">
            <button class="btn btn-primary" @click="prevStep">
              {{ nowStep === 1 ? "離開" : "上一頁" }}
            </button>
            <button class="btn btn-success" @click="nextStep">
              {{ nowStep === 4 ? "完成" : "下一步" }}
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "RegisterPage",
  data() {
    return {
      nowStep: 1,
      progressWidth: [40, 70, 90, 100],
      form: {
        username: "",
        password: "",
        repassword: "",
        nickname: "",
        gender: "hidden",
        birth: "",
        email: "",
        phone: "",
      },
    };
  },
  methods: {
    // showStep(step) {
    //   this.nowStep = step;
    // },
    nextStep() {
      if (this.nowStep < 4) {
        this.nowStep++;
      } else {
        // 完成按鈕點擊行為
        if (confirm("確認資料是否無誤？")) {
          // 這裡可以改成路由跳轉或其他行為
          window.location.href = "./login";
        }
      }
    },
    prevStep() {
      if (this.nowStep > 1) {
        this.nowStep--;
      } else {
        if (confirm("您確定要離開註冊流程嗎？")) {
          window.location.href = "./login";
        }
      }
    },
  },
};
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

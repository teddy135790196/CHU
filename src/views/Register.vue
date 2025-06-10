<template>
  <div class="wrap">
    <div class="container">
      <div class="row">
        <div class="col box d-flex align-items-center justify-content-center">
          <div class="content d-flex flex-column">
            <!-- 進度條 -->
            <div class="progress mb-1">
              <div class="progress-bar" :style="{ width: progressWidth + '%' }">
                {{ currentStep }}/4
              </div>
            </div>

            <!-- 註冊表單 -->
            <div>
              <!-- 步驟1：帳號密碼 -->
              <div v-show="currentStep === 1" class="step">
                <h4>【壹．設定您的帳號與密碼】</h4>
                <div class="inp_modle">
                  <p>帳號</p>
                  <div class="soild"></div>
                  <input 
                    type="text" 
                    v-model="formData.username"
                    placeholder="請輸入您的帳號或電子郵箱"
                    @input="validateUsername"
                  >
                  <span class="error" v-if="errors.username">{{ errors.username }}</span>
                </div>
                <div class="inp_modle">
                  <p>密碼</p>
                  <div class="soild"></div>
                  <input 
                    type="password" 
                    v-model="formData.password"
                    placeholder="請輸入您的密碼"
                    @input="validatePassword"
                  >
                  <span class="error" v-if="errors.password">{{ errors.password }}</span>
                </div>
                <div class="inp_modle">
                  <p>確認密碼</p>
                  <div class="soild"></div>
                  <input 
                    type="password" 
                    v-model="formData.confirmPassword"
                    placeholder="請再次輸入您的密碼"
                    @input="validateConfirmPassword"
                  >
                  <span class="error" v-if="errors.confirmPassword">{{ errors.confirmPassword }}</span>
                </div>
              </div>

              <!-- 步驟2：個人資料 -->
              <div v-show="currentStep === 2" class="step">
                <h4>【貳．設定您的個人資料】</h4>
                <div class="inp_modle">
                  <p>暱稱</p>
                  <div class="soild"></div>
                  <input 
                    type="text" 
                    v-model="formData.nickname"
                    placeholder="請輸入您的暱稱"
                    @input="validateNickname"
                  >
                  <span class="error" v-if="errors.nickname">{{ errors.nickname }}</span>
                </div>
                <div class="gender">
                  <div class="gender-check">
                    <input 
                      class="form-check-input" 
                      type="radio" 
                      name="gender" 
                      id="male"
                      value="male"
                      v-model="formData.gender"
                    >
                    <label class="form-check-label" for="male">男性</label>
                  </div>
                  <div class="gender-check">
                    <input 
                      class="form-check-input" 
                      type="radio" 
                      name="gender" 
                      id="female"
                      value="female"
                      v-model="formData.gender"
                    >
                    <label class="form-check-label" for="female">女性</label>
                  </div>
                  <div class="gender-check">
                    <input 
                      class="form-check-input" 
                      type="radio" 
                      name="gender" 
                      id="hidden"
                      value="hidden"
                      v-model="formData.gender"
                    >
                    <label class="form-check-label" for="hidden">隱藏</label>
                  </div>
                </div>
                <div class="inp_modle">
                  <p>生日</p>
                  <div class="soild"></div>
                  <input 
                    type="date" 
                    v-model="formData.birthday"
                    @input="validateBirthday"
                  >
                  <span class="error" v-if="errors.birthday">{{ errors.birthday }}</span>
                </div>
              </div>

              <!-- 步驟3：聯絡方式 -->
              <div v-show="currentStep === 3" class="step">
                <h4>【參．想知道您的聯絡方式】</h4>
                <div class="inp_modle">
                  <p>電子郵件</p>
                  <div class="soild"></div>
                  <input 
                    type="email" 
                    v-model="formData.email"
                    placeholder="請輸入您的電子郵件"
                    @input="validateEmail"
                  >
                  <span class="error" v-if="errors.email">{{ errors.email }}</span>
                </div>
                <div class="inp_modle">
                  <p>電話</p>
                  <div class="soild"></div>
                  <input 
                    type="tel" 
                    v-model="formData.phone"
                    placeholder="請輸入您的電話號碼"
                    @input="validatePhone"
                  >
                  <span class="error" v-if="errors.phone">{{ errors.phone }}</span>
                </div>
              </div>

              <!-- 步驟4：確認資料 -->
              <div v-show="currentStep === 4" class="step">
                <h4>【肆．確認您的資料並驗證】</h4>
                <div class="summary">
                  <p>暱稱：{{ formData.nickname }}</p>
                  <p>性別：{{ getGenderText(formData.gender) }}</p>
                  <p>生日：{{ formData.birthday }}</p>
                  <p>電子郵件：{{ formData.email }}</p>
                  <p>電話：{{ formData.phone }}</p>
                </div>
              </div>
            </div>

            <!-- 按鈕組 -->
            <div class="btn-group mt-auto">
              <button 
                class="btn btn-primary" 
                @click="prevStep"
                v-if="currentStep > 1"
              >
                上一步
              </button>
              <button 
                class="btn btn-success" 
                @click="nextStep"
                :disabled="!isStepValid"
              >
                {{ currentStep === 4 ? '完成註冊' : '下一步' }}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { authService } from '@/services/authService';

export default {
  name: 'RegisterView',
  data() {
    return {
      currentStep: 1,
      formData: {
        username: '',
        password: '',
        confirmPassword: '',
        nickname: '',
        gender: 'hidden',
        birthday: '',
        email: '',
        phone: ''
      },
      errors: {
        username: '',
        password: '',
        confirmPassword: '',
        nickname: '',
        birthday: '',
        email: '',
        phone: ''
      }
    }
  },
  computed: {
    progressWidth() {
      return (this.currentStep / 4) * 100;
    },
    isStepValid() {
      switch (this.currentStep) {
        case 1:
          return this.validateStep1();
        case 2:
          return this.validateStep2();
        case 3:
          return this.validateStep3();
        case 4:
          return true;
        default:
          return false;
      }
    }
  },
  methods: {
    validateUsername() {
      this.errors.username = authService.validateUsername(this.formData.username);
      return !this.errors.username;
    },
    validatePassword() {
      this.errors.password = authService.validatePassword(this.formData.password);
      return !this.errors.password;
    },
    validateConfirmPassword() {
      this.errors.confirmPassword = authService.validateConfirmPassword(
        this.formData.password,
        this.formData.confirmPassword
      );
      return !this.errors.confirmPassword;
    },
    validateNickname() {
      this.errors.nickname = authService.validateNickname(this.formData.nickname);
      return !this.errors.nickname;
    },
    validateBirthday() {
      this.errors.birthday = authService.validateBirthday(this.formData.birthday);
      return !this.errors.birthday;
    },
    validateEmail() {
      this.errors.email = authService.validateEmail(this.formData.email);
      return !this.errors.email;
    },
    validatePhone() {
      this.errors.phone = authService.validatePhone(this.formData.phone);
      return !this.errors.phone;
    },
    validateStep1() {
      return this.validateUsername() && 
             this.validatePassword() && 
             this.validateConfirmPassword();
    },
    validateStep2() {
      return this.validateNickname() && 
             this.validateBirthday();
    },
    validateStep3() {
      return this.validateEmail() && 
             this.validatePhone();
    },
    prevStep() {
      if (this.currentStep > 1) {
        this.currentStep--;
      }
    },
    nextStep() {
      if (this.currentStep < 4) {
        this.currentStep++;
      } else {
        this.handleSubmit();
      }
    },
    getGenderText(gender) {
      const genderMap = {
        male: '男性',
        female: '女性',
        hidden: '隱藏'
      };
      return genderMap[gender] || '未選擇';
    },
    async handleSubmit() {
      try {
        const response = await authService.register(this.formData);
        if (response.success) {
          alert('註冊成功！');
          this.$router.push('/login');
        }
      } catch (error) {
        console.error('註冊失敗:', error);
        alert('註冊失敗，請稍後再試');
      }
    }
  }
}
</script>

<style scoped>
.wrap {
  min-height: 100vh;
  background-color: #f8f9fa;
  padding: 2rem 0;
}

.box {
  min-height: 80vh;
}

.content {
  width: 100%;
  max-width: 600px;
  background: white;
  padding: 2rem;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
}

.progress {
  height: 8px;
  border-radius: 4px;
}

.progress-bar {
  background-color: #42b983;
  transition: width 0.3s ease;
}

.step {
  margin-bottom: 2rem;
}

.step h4 {
  color: #2c3e50;
  margin-bottom: 1.5rem;
}

.inp_modle {
  margin-bottom: 1.5rem;
}

.inp_modle p {
  margin-bottom: 0.5rem;
  font-weight: 500;
  color: #2c3e50;
}

.soild {
  height: 2px;
  background-color: #42b983;
  margin-bottom: 0.5rem;
}

input {
  width: 100%;
  padding: 0.75rem;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 1rem;
}

input:focus {
  outline: none;
  border-color: #42b983;
}

.error {
  color: #dc3545;
  font-size: 0.875rem;
  margin-top: 0.25rem;
  display: block;
}

.gender {
  display: flex;
  gap: 1rem;
  margin-bottom: 1.5rem;
}

.gender-check {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.btn-group {
  display: flex;
  gap: 1rem;
}

.btn {
  flex: 1;
  padding: 0.75rem;
  font-size: 1rem;
  border-radius: 4px;
  cursor: pointer;
  transition: all 0.3s ease;
}

.btn-primary {
  background-color: #6c757d;
  border-color: #6c757d;
  color: white;
}

.btn-primary:hover {
  background-color: #5a6268;
  border-color: #545b62;
}

.btn-success {
  background-color: #42b983;
  border-color: #42b983;
  color: white;
}

.btn-success:hover {
  background-color: #3aa876;
  border-color: #3aa876;
}

.btn:disabled {
  opacity: 0.65;
  cursor: not-allowed;
}

.summary {
  background-color: #f8f9fa;
  padding: 1rem;
  border-radius: 4px;
}

.summary p {
  margin-bottom: 0.5rem;
  color: #2c3e50;
}

@media (max-width: 768px) {
  .content {
    padding: 1.5rem;
  }
  
  .gender {
    flex-direction: column;
    gap: 0.5rem;
  }
}
</style> 
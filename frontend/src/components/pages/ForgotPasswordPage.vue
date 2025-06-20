<template>
	<div class="col">
		<!-- 垂直置中 -->
		<div class="d-flex justify-content-center align-items-center vh-100">
			<!-- 忘記密碼頁面 -->
			<!-- 使用 box 來包裹內容 -->
			<div class="box w-50 mx-auto">
				<h1 class="text-center">忘記密碼</h1>
				<p class="text-center">請輸入您的電子郵件，我們將會寄送重設密碼的連結給您。</p>
				<form @submit.prevent="sendResetEmail">
					<div class="inp_modle">
						<p>電子郵件</p>
						<div class="soild"></div>
						<input type="email" placeholder="範例：example@example.com" v-model="localForm.email"
							required />
						<span class="error" v-if="formErrors.email">{{ formErrors.email }}</span>
					</div>
					<div class="text-center mt-4">
						<button type="submit" class="btn btn-primary" :disabled="isLoading">
							<span v-if="isLoading" class="spinner-border spinner-border-sm me-2"></span>
							{{ isLoading ? '發送中...' : '發送重設連結' }}
						</button>
					</div>
					<div class="text-center mt-3">
						<router-link to="/login" class="btn btn-outline-secondary">返回登入</router-link>
					</div>
				</form>
			</div>
		</div>
	</div>
</template>


<script>
export default {
	name: "ForgotPasswordPage",
	data() {
		return {
			localForm: {
				email: '',
			},
			message: {
				inputLabel: {
					email: '電子郵件',
				},
				inputPlahold: {
					email: '範例：example@example.com'
				},
				quote: {},
			},
			formErrors: {},
			isLoading: false
		}
	},
	methods: {
		validateEmail() {
			const email = this.localForm.email;
			const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
			
			if (!email || email.trim() === '') {
				this.formErrors.email = '請輸入電子郵件';
				return false;
			} else if (!emailRegex.test(email)) {
				this.formErrors.email = '請輸入有效的電子郵件格式';
				return false;
			} else {
				this.formErrors.email = '';
				return true;
			}
		},
		
		async sendResetEmail() {
			if (!this.validateEmail()) {
				return;
			}
			
			this.isLoading = true;
			
			try {
				const response = await this.$axios.post('/api/forgot-password', {
					email: this.localForm.email
				});
				
				if (response.data.success) {
					alert('重設密碼連結已發送到您的電子郵件，請檢查您的信箱。');
					this.$router.push('/login');
				} else {
					alert(response.data.message || '發送失敗，請稍後再試。');
				}
				
			} catch (error) {
				console.error('發送重設連結失敗:', error);
				if (error.response && error.response.data && error.response.data.message) {
					alert(error.response.data.message);
				} else {
					alert('發送失敗，請稍後再試或聯繫客服。');
				}
			} finally {
				this.isLoading = false;
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

.box{
	padding: 60px;
	background-color: white;
	border-radius: 15px;
	box-shadow: 0 0 20px rgba(0, 0, 0, 0.1);
	border: 1px solid #c41e3a;

	.inp_modle{
		padding-top: 20px;
		
		p {
			color: #c41e3a;
			font-weight: 500;
			margin-bottom: 0.5rem;
		}
		
		.soild {
			height: 2px;
			background-color: #c41e3a;
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
			border-color: #c41e3a;
		}
		
		.error {
			color: #dc3545;
			font-size: 0.875rem;
			margin-top: 0.25rem;
			display: block;
		}
	}
}

.btn-primary {
	background-color: #c41e3a;
	border-color: #c41e3a;
	padding: 0.75rem 2rem;
	font-size: 1rem;
}

.btn-primary:hover {
	background-color: #a01830;
	border-color: #a01830;
}

.btn-primary:disabled {
	background-color: #f3c6cb;
	border-color: #c41e3a;
	opacity: 0.7;
}

.btn-outline-secondary {
	border-color: #6c757d;
	color: #6c757d;
}

.btn-outline-secondary:hover {
	background-color: #6c757d;
	border-color: #6c757d;
}



/* ========================================
   xxl: ≥ 1400px (大桌機、4K 螢幕)
   container 寬度: 1320px
======================================== */
@media (min-width: 1400px) {}




/* ========================================
   xl: 1200px ~ 1399px (一般桌機)
   container 寬度: 1140px
======================================== */
@media (min-width: 1200px) and (max-width: 1399px) {}




/* ========================================
   lg: 992px ~ 1199px (小型桌機、橫向大型平板)
   container 寬度: 960px
======================================== */
@media (min-width: 992px) and (max-width: 1199px) {}




/* ========================================
   md: 768px ~ 991px (橫向 iPad、小型平板)
   container 寬度: 720px
======================================== */
@media (min-width: 768px) and (max-width: 991px) {}




/* ========================================
   sm: 577px ~ 767px (大型手機、直向平板)
   container 寬度: 540px
======================================== */
@media (min-width: 577px) and (max-width: 767px) {}




/* ========================================
   xs: ≤ 576px (手機)
   container 寬度: 100% (fluid)
======================================== */
@media (max-width: 576px) {}
</style>

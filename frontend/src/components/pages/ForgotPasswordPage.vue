<template>
	<div class="col">
		<!-- 垂直置中 -->
		<div class="d-flex justify-content-center align-items-center vh-100">
			<!-- 忘記密碼頁面 -->
			<!-- 使用 box 來包裹內容 -->
			<div class="box w-50 mx-auto">
				<h1 class="text-center">忘記密碼</h1>
				<p class="text-center">請輸入您的電子郵件，我們將會寄送重設密碼的連結給您。</p>
				<div class="inp_modle">
					<p>密碼</p>
					<div class="soild"></div>
					<input type="password" placeholder="範例：retreatbookroom@gmail.com" v-model="localForm.email"
						required />
				</div>
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
			formErrors: {}
		}
	},
	methods: {
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
	background-color: transparent;

	.inp_modle{
		padding-top: 50px;
	}
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

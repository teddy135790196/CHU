<template>
	<div id="app" class="wrap">
		<!-- 背景層 -->
		<!-- <div class="back-img"></div>  -->

		<!-- 頁首區 -->
		<!-- <div class="container-fluid">
			<div class="row">
				<HeaderArea />
			</div>
		</div> -->

		<!-- 回登入頁按鈕 -->
		<div class="container">
			<!-- 忘記密碼區 -->
			<div class="row">
				<ForgotPasswordPage />
			</div>
		</div>

		<!-- 頁尾區 -->
		<!-- <div class="container-fluid">
			<div class="row">
				<FooterArea />
			</div>
		</div> -->

	</div>
</template>

<script>
import ForgotPasswordPage from '@/components/pages/ForgotPasswordPage.vue';
// import HeaderArea from '@/components/common/HeaderArea.vue';
// import FooterArea from '@/components/common/FooterArea.vue';



export default {
	name: "ForgotPasswordView",
	components: {
		ForgotPasswordPage,
		// HeaderArea,
		// FooterArea,
	},
};
</script>

<style scoped></style>

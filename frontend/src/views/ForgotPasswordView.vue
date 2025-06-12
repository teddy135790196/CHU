<template>
	<div id="app" class="wrap">
		<!-- 背景層 -->
		<!-- <div class="back-img"></div>  -->

		<div class="container-fluid">
			<!-- 頁首區 -->
			<div class="row">
				<HeaderArea />
			</div>

			<!-- 回登入頁按鈕 -->
			<div class="row">
				<div class="col-12 text-center">
					<a href="/login" class="btn btn-primary mt-3">回登入頁</a>
				</div>
			</div>
			<!-- 忘記密碼區 -->
			<div class="row">
				<ForgotPasswordPage />
			</div>

			<!-- 頁尾區 -->
			<div class="row">
				<FooterArea />
			</div>

		</div>
	</div>
</template>

<script>
import ForgotPasswordPage from '@/components/pages/ForgotPasswordPage.vue';
import HeaderArea from '@/components/common/HeaderArea.vue';
import FooterArea from '@/components/common/FooterArea.vue';



export default {
	name: "ForgotPasswordView",
	components: {
		ForgotPasswordPage,
		HeaderArea,
		FooterArea,
	},
};
</script>

<style scoped></style>

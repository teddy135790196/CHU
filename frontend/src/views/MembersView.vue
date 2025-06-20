<template>
	<div id="app" class="wrap">
		<!-- 背景層 -->
		<!-- <div class="back-img"></div> -->

		<AccessAlert
  v-if="showAccessAlert"
  :title="access.title"
  :message="access.message"
  :button-text="access.button"
  :showButton="true"
  :closeOnOverlay="false"
  @action="goToPublisherApply" /> 

		<!-- 頁首區 -->
		<!-- <div class="container-fluid">
			<div class="row">
				<HeaderArea />
			</div>
		</div> -->

		<div class="container">
			<div class="row">
				<MembersPage />
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
// 路徑要對應到 components 底下的元件位置
import MembersPage from "@/components/pages/MembersPage.vue";
// import HeaderArea from "@/components/common/HeaderArea.vue";
// import FooterArea from "@/components/common/FooterArea.vue";
import AccessAlert from "@/components/common/AccessAlert.vue";

export default {
	name: "MembersView",
	components: {
		MembersPage,
		// HeaderArea,
		// FooterArea,
		AccessAlert,
	},
	data() {
		return {
			showAccessAlert: true, // 一進來就顯示彈窗
			access: {
				title: '歡迎來到棲遲書屋！',
				message: '您已完成註冊！為保障帳戶安全與完整功能<br>請至個人設定完成【信箱驗證】與【手機驗證】',
				button: '我瞭解了！',
			},
		};
	},
	methods: {
		// 關閉浮窗
		goToPublisherApply() { this.showAccessAlert = false; }
	}
};
</script>

<style scoped>
@import '@/assets/styles/pages/membersPage.css';
</style>

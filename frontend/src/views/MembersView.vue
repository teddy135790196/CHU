<template>
	<div id="app" class="wrap">
		<!-- 背景層 -->
		<div class="back-img"></div> 

		<!-- <AccessAlert
  v-if="showAccessAlert"
  :title="access.title"
  :message="access.message"
  :button-text="access.button"
  :showButton="true"
  :closeOnOverlay="false"
  @action="goToPublisherApply" />  -->

		<!-- 頁首區 -->
		<div class="row">
			<div class="col bg-danger">
				<header>
					【頁首區】
				</header>
				<nav>
					【導覽區】
				</nav>
			</div>
		</div>

		<MembersPage />

		<!-- 頁尾區 -->
		<div class="row">
			<div class="col bg-primary">
				<footer>
					【頁尾區】
				</footer>
			</div>
		</div>
	</div>
</template>

<script>
// 路徑要對應到 components 底下的元件位置
import MembersPage from "@/components/pages/MembersPage.vue";
// import AccessAlert from "@/components/common/AccessAlert.vue";

export default {
	name: "MembersView",
	components: {
		MembersPage,
		// AccessAlert,
	},
data() {
  return {
    showAccessAlert: true, // 一進來就顯示彈窗
	access:{
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
@import url("https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css");
@import '@/assets/styles/pages/membersPage.css';
</style>

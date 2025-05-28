<template>
	<div id="app" class="wrap">
		<div class="back-img"></div> <!-- 背景層 -->

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

		<MembersArea />

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
import MembersArea from "@/components/modules/members/MembersArea.vue";

export default {
	name: "MembersAreaPage",
	components: {
		MembersArea,
	},
};
</script>

<style scoped>
@import url("https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css");
@import '@/assets/styles/pages/membersArea.css';
</style>

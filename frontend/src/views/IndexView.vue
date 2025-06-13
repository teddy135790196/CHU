<template>
	<div id="app" class="wrap">
		<!-- 背景層 -->
		<!-- <div class="back-img"></div>  -->

		<!-- 頁首區 -->
		<div class="container-fluid">
			<div class="row">
				<HeaderArea />
			</div>
		</div>

		<IndexPage />

		<!-- 頁尾區 -->
		<div class="container-fluid">
			<div class="row">
				<FooterArea />
			</div>
		</div>

	</div>
</template>

<script>
// 路徑要對應到 components 底下的元件位置
import IndexPage from "@/components/pages/IndexPage.vue";
import HeaderArea from "@/components/common/HeaderArea.vue";
import FooterArea from "@/components/common/FooterArea.vue";

export default {
	name: "IndexView",
	components: {
		IndexPage,
		HeaderArea,
		FooterArea,
	},
};
</script>

<style scoped></style>

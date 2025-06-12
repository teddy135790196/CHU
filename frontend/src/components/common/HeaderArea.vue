<!-- prettier-ignore -->
<template>
	<!-- 導航欄 -->
	<header class="titleNav">
		<ul class="titleNavIcon">
			<li class="logo">
				<h1>
					<router-link to="/"><img src="@/assets/images/icon.png" alt="棲遲書店" /></router-link>
				</h1>
				<div class="logoUpArror">▲</div>
				<div class="logoDialog">回到首頁</div>
			</li>
			<li class="search">
				<input type="text" v-model="internalSearchValue"
					@keyup.enter="findBookByCondition(internalSearchValue, internalSelectedField)"
					placeholder="右邊欄位可選" />
				<select v-model="internalSelectedField">
					<option value="">全部欄位</option>
					<option value="書名">書名</option>
					<option value="作者">作者</option>
					<option value="ISBN">ISBN</option>
					<option value="分類">分類</option>
					<option value="類型">類型</option>
					<option value="系列名稱">系列名稱</option>
				</select>
				<span class="searchBtn"
					@click="findBookByCondition(internalSearchValue, internalSelectedField)">搜尋</span>
			</li>
			<li class="product">
				<router-link to="/" class="emoji">📚</router-link>
				<div class="productUpArror">▲</div>
				<div class="productDialog">書籍一覽</div>
			</li>
			<li class="titleNavEmoji member">
				<router-link to="/members" class="emoji">🧑</router-link>
				<div class="memberUpArror">▲</div>
				<div class="memberDialog">會員資料</div>
			</li>
			<li class="titleNavEmoji shoppingCart">
				<router-link to="/" class="emoji">🛒</router-link>
				<div class="shoppingCartUpArror">▲</div>
				<div class="shoppingCartDialog">去購物車</div>
			</li>
		</ul>
	</header>
</template>

<!-- prettier-ignore -->
<script>
export default {
	name: "HeaderArea",

	inject: ['selectedField', 'searchValue', 'updateSearch'], // 注入提供的屬性
	data() {
		return {
			internalSelectedField: this.selectedField(), // 初始化內部數據
			internalSearchValue: this.searchValue(),
		};
	},
	watch: {
		selectedField: { // 監聽注入的屬性變化並更新內部數據
			handler(newVal) {
				this.internalSelectedField = newVal;
			},
			deep: true // 如果注入的是響應式對象，可能需要 deep
		},
		searchValue: {
			handler(newVal) {
				this.internalSearchValue = newVal;
			},
			deep: true
		}
	},
	methods: {
		findBookByCondition() {
			this.updateSearch(this.internalSelectedField, this.internalSearchValue); // 呼叫父組件的更新方法
			console.log('搜尋條件:', this.selectedField(), this.searchValue());
		}
	}
};
</script>

<style scoped>
/* 抬頭導航 */
.titleNav {
	width: 80%;
	height: 52px;
	margin: 0 10%;
	/* padding: 0% 10%; */
	position: fixed;
	z-index: 10;
	background-color: hsla(0, 0%, 100%, 0.75);
}

.titleNavIcon {
	display: flex;
	justify-content: space-between;
	align-items: center;

	li {
		list-style: none;

		* {
			text-decoration: none;
		}
	}
}

.titleNav a {
	color: black;
}

.titleNav a:hover {
	text-decoration: none;
}

.search {
	display: none;
	height: 28px;
}

.search select {
	height: 28px;
	color: hsl(36, 50.7%, 71.4%);
}

.searchBtn {
	display: inline-block;
	color: hsl(0, 0%, 100%);
	background-color: hsl(353, 100%, 29.2%);
	height: 28px;
	line-height: 28px;
	padding: 0 5px;
	border-radius: 5px;
}

.searchBtn:hover {
	color: hsl(0, 0%, 70%);
	background-color: hsl(353, 100%, 50%);
}

.searchBtn:active {
	color: hsl(353, 100%, 29.2%);
	background-color: hsl(0, 0%, 100%);
}

@media (min-width: 576px) {
	.search {
		display: flex;
		align-items: center;
		height: 33px;
	}

	.search input {
		width: 7em;
		height: 33px;
		font-size: 20px;
		line-height: 33px;
	}

	.search select {
		height: 33px;
		font-size: 20px;
		line-height: 33px;
	}

	.search span {
		height: 33px;
		font-size: 20px;
		line-height: 33px;
	}
}

/* end of @media (min-width: 576px) */

@media (min-width: 992px) {
	.search {
		display: flex;
		align-items: center;
		height: 44.8px;
	}

	.search input {
		height: 44.8px;
		font-size: 22px;
		line-height: 44.8px;
	}

	.search select {
		height: 44.8px;
		font-size: 22px;
		line-height: 44.8px;
	}

	.search span {
		height: 44.8px;
		font-size: 22px;
		line-height: 44.8px;
	}
}

/* end of @media (min-width: 576px) */

.logo {
	width: 20px;
	position: relative;
}

.logo Img {
	width: 100%;
}

.emoji {
	font-size: 20px;
}

@media (min-width: 576px) {
	.logo {
		width: 33px;
	}

	.emoji {
		font-size: 30px;
	}
}

@media (min-width: 992px) {
	.logo {
		width: 44.8px;
	}

	.emoji {
		font-size: 40px;
	}
}

.logoDialog {
	width: 4em;
}

.logoUpArror,
.logoDialog {
	display: none;
	z-index: 10;
}

.logo:hover .logoUpArror {
	display: block;
	position: absolute;
	top: 30px;
	color: hsl(353, 100%, 29.2%);
}

.logo:hover .logoDialog {
	display: block;
	position: absolute;
	top: 47px;
	left: -25px;
	color: hsl(0, 0%, 100%);
	background-color: hsl(353, 100%, 29.2%);
}

.member,
.shoppingCart,
.product {
	position: relative;
}

.memberDialog,
.shoppingCartDialog,
.productDialog {
	width: 4em;
}

.memberUpArror,
.memberDialog,
.shoppingCartUpArror,
.shoppingCartDialog,
.productUpArror,
.productDialog {
	display: none;
	z-index: 10;
}

.member:hover .memberUpArror,
.shoppingCart:hover .shoppingCartUpArror,
.product:hover .productUpArror {
	display: block;
	position: absolute;
	top: 20px;
	left: 4px;
	color: hsl(353, 100%, 29.2%);
}

.member:hover .memberDialog,
.shoppingCart:hover .shoppingCartDialog,
.product:hover .productDialog {
	display: block;
	position: absolute;
	top: 37px;
	left: -23px;
	color: hsl(0, 0%, 100%);
	background-color: hsl(353, 100%, 29.2%);
}

@media (min-width: 576px) {
	.logo:hover .logoUpArror {
		top: 33px;
		left: 7px;
	}

	.logo:hover .logoDialog {
		top: 50px;
		left: -20px;
	}

	.member:hover .memberUpArror,
	.shoppingCart:hover .shoppingCartUpArror,
	.product:hover .productUpArror {
		top: 30px;
		left: 9px;
	}

	.member:hover .memberDialog,
	.shoppingCart:hover .shoppingCartDialog,
	.product:hover .productDialog {
		top: 47px;
		left: -18px;
	}
}

@media (min-width: 992px) {
	.logo:hover .logoUpArror {
		top: 38px;
		left: 12px;
	}

	.logo:hover .logoDialog {
		top: 55px;
		left: -15px;
	}

	.member:hover .memberUpArror,
	.shoppingCart:hover .shoppingCartUpArror,
	.product:hover .productUpArror {
		top: 45px;
		left: 19px;
	}

	.member:hover .memberDialog,
	.shoppingCart:hover .shoppingCartDialog,
	.product:hover .productDialog {
		top: 62px;
		left: -8px;
	}
}
</style>

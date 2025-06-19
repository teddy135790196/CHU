<!-- vue2中，導航頁組件作為組件插入到App.vue，導航頁組件中有搜尋輸入框和選擇搜尋範圍的選單，按下搜尋後會把搜尋內容和範圍傳送到商品頁面，並使用路由，在網址列顯示搜尋內容和欄位 -->

<!-- prettier-ignore -->
<template>
	<!-- 導航欄 -->
	<header class="titleNav">
		<ul class="titleNavIcon">
			<li class="logo">
				<h1>
					<router-link to="/"><img src="icon/logo.png" alt="棲遲書店" /></router-link>
				</h1>
				<div class="logoUpArror">▲</div>
				<div class="logoDialog">回到首頁</div>
			</li>

			<li class="search">
				<input type="text" v-model="searchText" @keyup.enter="performSearch" placeholder="右邊欄位可選" />
				<select v-model="searchScope">
					<!-- <option value="all" >全部欄位</option> -->
					<option value="name">書名</option>
					<option value="author">作者</option>
					<option value="ISBN_id">ISBN</option>
					<!-- <option value="分類">分類</option>
          <option value="類型">類型</option> -->
					<option value="series">系列名稱</option>
				</select>
				<span class="searchBtn" @click="performSearch">搜尋</span>
			</li>

			<li class="product">
				<router-link to="/products" class="emoji">📚</router-link>
				<div class="productUpArror">▲</div>
				<div class="productDialog">書籍一覽</div>
			</li>
			<li class="titleNavEmoji member">
				<router-link to="/members" class="emojiIcon"><img src="icon/user.png" alt=""></router-link>
				<div class="memberUpArror">▲</div>
				<div class="memberDialog">會員資料</div>
			</li>
			<li class="titleNavEmoji shoppingCart">
				<router-link to="/shoppingCart" class="emoji">
					🛒
					<span v-if="cartCount > 0" class="cart-badge">{{ cartCount }}</span>
				</router-link>
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

	data() {
		return {
			searchText: '',
			searchScope: 'name',
			cartCount: 0
		};
	},
	
	created() {
		this.updateCartCount();
		// 監聽 localStorage 變化
		window.addEventListener('storage', this.updateCartCount);
	},
	
	beforeDestroy() {
		window.removeEventListener('storage', this.updateCartCount);
	},

	methods: {
		// /search/con=:con&kw=:keyWord
		performSearch() {
			if (this.searchText === "") {
				return;
			}

			// 透過路由傳遞搜尋內容和範圍
      // /search?q=ds&scope=name
			this.$router.push({
				name: 'search', // 商品頁面的路由名稱
				query: {
					q: this.searchText,
					scope: this.searchScope
				}
			});

					//重置搜尋框
		this.searchText = "";
		this.searchScope = "name";
	},
	
	updateCartCount() {
		const cartItems = localStorage.getItem('cartItems');
		if (cartItems) {
			const items = JSON.parse(cartItems);
			this.cartCount = items.reduce((total, item) => total + item.count, 0);
		} else {
			this.cartCount = 0;
		}
	},
	}
};
</script>

<style scoped>
a {
  text-decoration: none;
}

li {
  list-style-type: none;
}

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

/* 購物車徽章樣式 */
.cart-badge {
  position: absolute;
  top: 0px;
  right: -8px;
  background-color: #c41e3a;
  color: white;
  border-radius: 50%;
  padding: 2px 6px;
  font-size: 12px;
  font-weight: bold;
  min-width: 18px;
  height: 18px;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
}

.shoppingCart {
  position: relative;
}

.logo {
  width: 20px;
  position: relative;
}

.logo Img {
  width: 100%;
}

.emojiIcon img {
  width: 20px;
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

  .emojiIcon img {
    width: 33px;
  }
}

@media (min-width: 992px) {
  .logo {
    width: 44.8px;
  }

  .emoji {
    font-size: 40px;
  }

  .emojiIcon img {
    width: 44.8px;
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

.member:hover .memberUpArror {
  display: block;
  position: absolute;
  top: 17px;
  left: 2px;
  color: hsl(353, 100%, 29.2%);
}

.shoppingCart:hover .shoppingCartUpArror,
.product:hover .productUpArror {
  display: block;
  position: absolute;
  top: 20px;
  left: 4px;
  color: hsl(353, 100%, 29.2%);
}

.member:hover .memberDialog {
  display: block;
  position: absolute;
  top: 34px;
  left: -23px;
  color: hsl(0, 0%, 100%);
  background-color: hsl(353, 100%, 29.2%);
}

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

  .member:hover .memberUpArror {
    top: 25px;
    left: 9px;
  }

  .shoppingCart:hover .shoppingCartUpArror,
  .product:hover .productUpArror {
    top: 30px;
    left: 9px;
  }

  .member:hover .memberDialog {
    top: 42px;
    left: -18px;
  }

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

  .member:hover .memberUpArror {
    top: 35px;
    left: 15px;
  }

  .shoppingCart:hover .shoppingCartUpArror,
  .product:hover .productUpArror {
    top: 45px;
    left: 19px;
  }

  .shoppingCart:hover .shoppingCartDialog,
  .product:hover .productDialog {
    top: 62px;
    left: -8px;
  }

  .member:hover .memberDialog {
    top: 52px;
    left: -12px;
  }
}
</style>

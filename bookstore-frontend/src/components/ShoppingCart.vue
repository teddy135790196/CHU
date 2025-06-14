<template>
  <div id="app">
    <!-- 導航欄 -->
    <nav class="navbar">
      <div class="logo">
        <h1>購物商城</h1>
      </div>
      <div class="nav-links">
        <a href="#" class="nav-item"><i class="fas fa-user"></i></a>
        <a href="#" class="nav-item"><i class="fas fa-shopping-cart"></i> ({{ itemList.length }})</a>
        <a href="#" class="nav-item"><i class="fas fa-user-plus"></i></a>
      </div>
    </nav>

    <div class="container">
      <div class="item_header">
        <div class="item_detail">商品</div>
        <div class="price">單價</div>
        <div class="count">數量</div>
        <div class="amount">小計</div>
        <div class="operate"></div>
        <div class="clear-cart">
          <button @click="clearCart" class="clear-cart-btn">清空購物車</button>
        </div>
      </div>

      <div
        class="item_container"
        v-for="(item, index) in itemList"
        :key="item.id"
      >
        <div class="item_header item_body">
          <div class="item_detail">
            <img :src="item.imgUrl" alt="" />
            <div class="name">{{ item.itemName }}</div>
          </div>
          <div class="price"><span>$</span>{{ item.price }}</div>
          <div class="count">
            <button @click="handleSub(item)">-</button>
            {{ item.count }}
            <button @click="handlePlus(item)">+</button>
          </div>
          <div class="amount">{{ item.price * item.count }}</div>
          <div class="operate">
            <button @click="handledelete(index)">刪除</button>
          </div>
        </div>
      </div>

      <!-- 結算區域 -->
      <div class="checkout-section" v-if="itemList.length > 0">
        <div class="checkout-summary">
          <div class="summary-item">
            <span>總金額：</span>
            <span>${{ getTotalAmount }}</span>
          </div>
        </div>
        <button class="checkout-button" @click="checkout">結帳去</button>
      </div>
      <div class="empty-cart" v-else>
        <p>購物車是空的，快去選購商品吧！</p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "ShoppingCart",
  data() {
    return {
      itemList: [
        {
          id: 1,
          itemName: "商品 A",
          price: 300,
          count: 1,
          imgUrl: "https://via.placeholder.com/80"
        },
        {
          id: 2,
          itemName: "商品 B",
          price: 500,
          count: 2,
          imgUrl: "https://via.placeholder.com/80"
        }
      ]
    };
  },
  computed: {
    getTotalAmount() {
      return this.itemList.reduce((total, item) => {
        return total + item.price * item.count;
      }, 0);
    }
  },
  methods: {
    handlePlus(item) {
      item.count++;
    },
    handleSub(item) {
      if (item.count > 1) {
        item.count--;
      }
    },
    handledelete(index) {
      this.itemList.splice(index, 1);
    },
    clearCart() {
      this.itemList = [];
    },
    checkout() {
      alert("結帳成功！");
      this.clearCart();
    }
  }
};
</script>

<style scoped>
@import "../assets/style.css"; /* 你的原始 style.css 放這 */

@import url("https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.4/css/all.min.css");
</style>
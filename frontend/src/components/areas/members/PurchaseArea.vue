<!-- frontend/src/components/PurchaseArea.vue -->

<template>
	<!-- 區塊：購買紀錄－始 -->
	<div class="selectContent" id="purchase" style="display: none;">
	  <!-- 動態渲染每一筆訂單 -->
	  <OrderCard
		v-for="order in orders"
		:key="order.id"
		:order="order"
	  />
	</div>
  </template>
  
  <script>
  import axios from 'axios';
  import OrderCard from './OrderCard.vue';
  
  export default {
	name: 'PurchaseArea',
	components: {
	  OrderCard,
	},
	data() {
	  return {
		orders: [], // 存放後端回傳的訂單
	  };
	},
	mounted() {
	  axios.get('/api/orders-all')
		.then(res => {
		  this.orders = res.data.data;
		})
		.catch(err => {
		  console.error('取得訂單失敗：', err);
		});
	}
  };
  </script>
  
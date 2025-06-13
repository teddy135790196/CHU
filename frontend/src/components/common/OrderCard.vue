<!-- 使用方法：
  <OrderCard :order="yourOrderObject" />
-->

<!-- // 訂單編號、下單日期、出貨日期、結算日期、狀態、商品名稱、商品售價、商品數量、小計、折扣、總計
{
	"id": "202405141234569",
	"date": "2024-05-14",
	"shipDate": "2024-05-19",
	"settleDate": "2024-05-24",
	"status": 2,
	"statusText": "已完成",
	"discount": 0,
	"total": 1596,
	"details": [
		{ "id": 1, "name": "春水遊鯉", "price": 399, "qty": 1, "subtotal": 399 },
		{ "id": 2, "name": "冬日翠峰", "price": 399, "qty": 2, "subtotal": 798 },
		...
	]
},
-->

<template>
	<div class="list-group mb-4">
		<!-- 主資料 -->
		<div class="list-group-item">
			<div class="d-flex justify-content-between align-items-start flex-wrap">
				<div>
					<strong>訂單編號：</strong>#{{ order.id }}<br />
					<small>下單日期：{{ order.date }}</small><br v-if="order.shipDate" />
					<small v-if="order.shipDate">出貨日期：{{ order.shipDate }}</small><br v-if="order.settleDate" />
					<small v-if="order.settleDate">結算日期：{{ order.settleDate }}</small>
				</div>
				<div class="text-end mt-2 mt-md-0">
					<span class="badge bg-{{ statusColor }}">{{ order.statusText }}</span><br />
					<button class="btn btn-sm btn-outline-primary mt-2" data-bs-toggle="collapse"
						:data-bs-target="'#collapse' + order.id" aria-expanded="false"
						:aria-controls="'collapse' + order.id">
						{{ isCollapsed ? '收起明細' : '查看明細' }}
					</button>
				</div>
			</div>
		</div>

		<!-- 明細摺疊 -->
		<div :id="'collapse' + order.id" class="collapse list-group-item" @show="isCollapsed = true"
			@hide="isCollapsed = false">
			<div class="d-flex justify-content-between align-items-start flex-wrap">
				<!-- 書名 -->
				<div>
					<p v-for="(item, index) in order.items" :key="'title-' + index">{{ item.title }}</p>
				</div>

				<!-- 售價 -->
				<div>
					<p v-for="(item, index) in order.items" :key="'price-' + index">售價：{{ item.price }}</p>
				</div>

				<!-- 數量 -->
				<div>
					<p v-for="(item, index) in order.items" :key="'qty-' + index">{{ item.qty }}本</p>
				</div>

				<!-- 小計 -->
				<div>
					<p v-for="(item, index) in order.items" :key="'subtotal-' + index">小計：{{ item.price * item.qty }}
					</p>
				</div>
			</div>

			<hr />

			<div class="d-flex justify-content-end">
				<div class="text-end">
					<p>折扣：-{{ order.discount || 0 }}</p>
					<p>總計：{{ order.total }}</p>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
export default {
	name: "OrderCard",
	props: {
		order: {
			type: Object,
			required: true,
		},
	},
	data() {
		return {
			isCollapsed: false,
		};
	},
	computed: {
		statusColor() {
			// 根據狀態文字設定不同 badge 顏色
			switch (this.order.statusText) {
				case "已完成":
					return "success";
				case "已下單":
					return "info";
				case "處理中":
					return "warning";
				case "已取消":
					return "danger";
				default:
					return "secondary";
			}
		},
	},
};
</script>

<style scoped>
.list-group-item p {
	margin-bottom: 0.3rem;
}
</style>
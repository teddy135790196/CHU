<template>
	<div>
		<div class="d-flex justify-content-between mb-2 mt-5">
			<div>
				每頁筆數：
				<select v-model.number="pageSize" class="form-select form-select-sm d-inline-block w-auto">
					<option :value="5">5</option>
					<option :value="10">10</option>
					<option :value="20">20</option>
				</select>
			</div>
			<div>
				<input v-model="searchQuery" type="text" class="form-control w-auto" placeholder="搜尋使用者名稱或訂單ID" />
			</div>
		</div>

		<!-- ✅ responsive 包裝 -->
		<div class="table-responsive">
			<table class="table table-bordered table-hover fixed-table">
				<thead class="table-info">
					<tr>
						<th @click="sortBy('order_id')" class="sortable" style="width: 8%">
							訂單ID <span class="sort-icon">{{ getSortSymbol('order_id') }}</span>
						</th>
						<th @click="sortBy('user_name')" class="sortable" style="width: 12%">
							使用者名稱 <span class="sort-icon">{{ getSortSymbol('user_name') }}</span>
						</th>
						<th @click="sortBy('user_tel')" class="sortable" style="width: 10%">
							電話 <span class="sort-icon">{{ getSortSymbol('user_tel') }}</span>
						</th>
						<th @click="sortBy('user_email')" class="sortable" style="width: 14%">
							Email <span class="sort-icon">{{ getSortSymbol('user_email') }}</span>
						</th>
						<th @click="sortBy('user_address')" class="sortable" style="width: 18%">
							地址 <span class="sort-icon">{{ getSortSymbol('user_address') }}</span>
						</th>
						<th @click="sortBy('payment_method')" class="sortable" style="width: 10%">
							付款方式 <span class="sort-icon">{{ getSortSymbol('payment_method') }}</span>
						</th>
						<th @click="sortBy('status')" class="sortable" style="width: 8%">
							訂單狀態 <span class="sort-icon">{{ getSortSymbol('status') }}</span>
						</th>
						<th @click="sortBy('created_at')" class="sortable" style="width: 12%">
							建立時間 <span class="sort-icon">{{ getSortSymbol('created_at') }}</span>
						</th>
						<th style="width: 8%">操作</th>
					</tr>
				</thead>

				<tbody>
					<tr v-for="order in paginatedFilteredOrders" :key="order.order_id">
						<td @click="toggleDetails(order.order_id)" class="clickable-cell">{{ order.order_id }}</td>
						<td @click="toggleDetails(order.order_id)" class="clickable-cell">{{ order.user_name }}</td>
						<td @click="toggleDetails(order.order_id)" class="clickable-cell">{{ order.user_tel }}</td>
						<td @click="toggleDetails(order.order_id)" class="clickable-cell">{{ order.user_email }}</td>
						<td @click="toggleDetails(order.order_id)" class="clickable-cell">{{ order.user_address }}</td>
						<td @click="toggleDetails(order.order_id)" class="clickable-cell">{{ order.payment_method }}</td>
						<td @click="toggleDetails(order.order_id)" class="clickable-cell">{{ order.status }}</td>
						<td @click="toggleDetails(order.order_id)" class="clickable-cell">{{ formatDate(order.created_at) }}</td>
						<td>
							<button 
								@click="confirmDeleteOrder(order.order_id)" 
								class="btn btn-danger btn-sm" 
								:disabled="isDeleting"
								title="刪除訂單">
								{{ isDeleting ? '刪除中...' : '刪除' }}
							</button>
						</td>
					</tr>
					<tr v-for="n in emptyRows" :key="'empty' + n" class="empty-row">
						<td colspan="9">&nbsp;</td>
					</tr>
				</tbody>
			</table>
		</div>

		<div class="d-flex justify-content-between align-items-center mt-3 mb-5">
			<div class="ms-2">顯示第 {{ pageStart + 1 }} 筆至第 {{ pageEnd }} 筆，共 {{ filteredOrders.length }} 筆</div>
			<nav>
				<ul class="pagination mb-0">
					<li class="page-item" :class="{ disabled: currentPage === 1 }">
						<a class="page-link" href="#" @click.prevent="changePage(currentPage - 1)">上一頁</a>
					</li>
					<li v-for="page in totalPages" :key="page" class="page-item"
						:class="{ active: page === currentPage }">
						<a class="page-link" href="#" @click.prevent="changePage(page)">{{ page }}</a>
					</li>
					<li class="page-item" :class="{ disabled: currentPage === totalPages }">
						<a class="page-link" href="#" @click.prevent="changePage(currentPage + 1)">下一頁</a>
					</li>
				</ul>
			</nav>
		</div>

		<div v-if="expandedOrderId" class="overlay" @click.self="closeDetails">
			<div class="details-card">
				<h3 class="mb-4">訂單 {{ expandedOrderId }} 明細</h3>

				<!-- 新增訂單基本資訊 -->
				<div>
					<div class="row g-2">
						<div class="col-6 col-md-3"><strong>使用者名稱：</strong> {{ getExpandedOrder?.user_name }}</div>
						<div class="col-6 col-md-3"><strong>電話：</strong> {{ getExpandedOrder?.user_tel }}</div>
						<div class="col-6 col-md-3"><strong>Email：</strong> {{ getExpandedOrder?.user_email }}</div>
						<div class="col-6 col-md-3"><strong>建立時間：</strong> {{ formatDate(getExpandedOrder?.created_at)
						}}</div>
						<div class="col-6 col-md-3"><strong>地址：</strong> {{ getExpandedOrder?.user_address }}</div>
						<div class="col-6 col-md-3"><strong>付款方式：</strong> {{ getExpandedOrder?.payment_method }}</div>
						<div class="col-6 col-md-3"><strong>訂單狀態：</strong> {{ getExpandedOrder?.status }}</div>
					</div>
				</div>

				<table class="table table-sm table-bordered mt-4 mb-4">
					<thead>
						<tr>
							<th>明細ID</th>
							<th>ISBN</th>
							<th>書名</th>
							<th>數量</th>
							<th>單價</th>
							<th>小計</th>
						</tr>
					</thead>
					<tbody>
						<tr v-for="item in orderDetails[expandedOrderId] || []" :key="item.order_item_id">
							<td>{{ item.order_item_id }}</td>
							<td>{{ item.ISBN_id }}</td>
							<td>{{ item.book_name }}</td>
							<td>{{ item.quantity }}</td>
							<td>{{ formatPrice(item.price_at_order_time) }}</td>
							<td>{{ formatPrice(item.subtotal) }}</td>
						</tr>
					</tbody>
				</table>

				<!-- 運費和總計 -->
				<div class="d-flex justify-content-end gap-4 mt-3">
					<div><strong>運費：</strong> {{ formatPrice(getExpandedOrder?.shipping_fee || 0) }}</div>
					<div><strong>總計：</strong> {{ formatPrice(calculateTotal()) }}</div>
				</div>
			</div>
		</div>

	</div>
</template>

<script>
import { orderService } from '@/services/orderService'

export default {
	name: 'OrderTableArea',
	props: {
		orders: Array,
		orderDetails: Object,
	},
	data() {
		return {
			currentPage: 1,
			pageSize: 5,
			searchQuery: '',
			sortKey: '',
			sortAsc: true,
			expandedOrderId: null,
			isDeleting: false,
			showDeleteConfirm: false,
			orderToDelete: null,
		}
	},
	computed: {
		filteredOrders() {
			const q = this.searchQuery.trim().toLowerCase()
			return this.orders.filter(o =>
				o.user_name?.toLowerCase().includes(q) || String(o.order_id).includes(q)
			)
		},
		sortedOrders() {
			if (!this.sortKey) return this.filteredOrders
			return [...this.filteredOrders].sort((a, b) => {
				return this.sortAsc
					? (a[this.sortKey] < b[this.sortKey] ? -1 : 1)
					: (a[this.sortKey] > b[this.sortKey] ? -1 : 1)
			})
		},
		paginatedFilteredOrders() {
			const start = (this.currentPage - 1) * this.pageSize
			return this.sortedOrders.slice(start, start + this.pageSize)
		},
		emptyRows() {
			const count = this.pageSize - this.paginatedFilteredOrders.length
			return count > 0 ? Array.from({ length: count }) : []
		},
		totalPages() {
			return Math.ceil(this.filteredOrders.length / this.pageSize) || 1
		},
		pageStart() {
			return (this.currentPage - 1) * this.pageSize
		},
		pageEnd() {
			return Math.min(this.pageStart + this.pageSize, this.filteredOrders.length)
		},
		getExpandedOrder() {
			return this.orders.find(o => o.order_id === this.expandedOrderId) || {}
		},
	},
	methods: {
		formatDate(dateStr) {
			const date = new Date(dateStr)
			const local = new Date(date.getTime() + 8 * 60 * 60 * 1000)
			const yyyy = local.getFullYear()
			const mm = String(local.getMonth() + 1).padStart(2, '0')
			const dd = String(local.getDate()).padStart(2, '0')
			const hh = String(local.getHours()).padStart(2, '0')
			const mi = String(local.getMinutes()).padStart(2, '0')
			return `${yyyy}/${mm}/${dd} ${hh}:${mi}`
		},
		sortBy(key) {
			if (this.sortKey === key) {
				this.sortAsc = !this.sortAsc
			} else {
				this.sortKey = key
				this.sortAsc = true
			}
		},
		changePage(page) {
			if (page < 1 || page > this.totalPages) return
			this.currentPage = page
		},
		toggleDetails(id) {
			this.expandedOrderId = id
		},
		closeDetails() {
			this.expandedOrderId = null
		},
		getSortSymbol(key) {
			if (this.sortKey === key) return this.sortAsc ? '▲' : '▼'
			return '━'
		},

		// 計算總計（含運費）
		calculateTotal() {
			if (!this.orderDetails[this.expandedOrderId]) return 0;
			const itemsTotal = this.orderDetails[this.expandedOrderId].reduce((sum, item) => {
				return sum + Number(item.subtotal || 0);
			}, 0);
			return itemsTotal + Number(this.getExpandedOrder?.shipping_fee || 0);
		},

		// 格式化價格，千分位
		formatPrice(value) {
			const num = Number(value)
			if (Number.isInteger(num)) {
				return `$${num.toLocaleString()}`
			} else {
				return `$${num.toLocaleString(undefined, { minimumFractionDigits: 1, maximumFractionDigits: 2 })}`
			}
		},

		confirmDeleteOrder(orderId) {
			if (confirm(`確定要刪除訂單 ${orderId} 嗎？\n\n⚠️ 此操作將永久刪除訂單資料，無法復原！`)) {
				this.deleteOrder(orderId)
			}
		},

		async deleteOrder(orderId) {
			this.isDeleting = true
			try {
				const response = await orderService.deleteOrder(orderId)
				
				if (response.data.success) {
					// 刪除成功，通知父組件重新載入資料
					this.$emit('order-deleted', orderId)
					alert('訂單刪除成功！')
					
					// 如果刪除的是當前展開的訂單，關閉明細
					if (this.expandedOrderId === orderId) {
						this.expandedOrderId = null
					}
				} else {
					throw new Error(response.data.message || '刪除失敗')
				}
			} catch (error) {
				console.error('刪除訂單錯誤：', error)
				alert(`刪除訂單失敗：${error.message || '未知錯誤'}`)
			} finally {
				this.isDeleting = false
			}
		}
	},
	watch: {
		pageSize() {
			this.currentPage = 1
		}
	}
}
</script>

<style scoped>
.fixed-table {
	width: 100%;
	table-layout: fixed;
}

.fixed-table th,
.fixed-table td {
	white-space: nowrap;
	overflow: hidden;
	text-overflow: ellipsis;
	vertical-align: middle;
}

.sortable {
	cursor: pointer;
	user-select: none;
	position: relative;
	padding-right: 20px;
	transition: background-color 0.3s ease;
}

.sortable:hover {
	background-color: #b6d3ff;
}

.sort-icon {
	position: absolute;
	right: 6px;
	top: 50%;
	transform: translateY(-50%);
	font-weight: 700;
	font-size: 14px;
	pointer-events: none;
}

.clickable-cell {
	cursor: pointer;
	transition: background-color .2s;
}

.clickable-cell:hover {
	background-color: #f1f9ff;
}

.empty-row td {
	background: transparent;
	height: 40px;
	pointer-events: none;
}

.overlay {
	position: fixed;
	inset: 0;
	background: rgba(0, 0, 0, 0.5);
	display: flex;
	justify-content: center;
	align-items: center;
	z-index: 1000;
}

.details-card {
	background: #fff;
	padding: 20px;
	border-radius: 8px;
	width: 80%;
	max-height: 80%;
	overflow-y: auto;
	box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
}

.pagination .page-item.active .page-link {
	background-color: #0d6efd;
	border-color: #0d6efd;
	color: #fff;
}

.pagination .page-link {
	cursor: pointer;
}

.btn-danger:disabled {
	opacity: 0.6;
	cursor: not-allowed;
}



.pagination .page-link {
	cursor: pointer;
}
</style>

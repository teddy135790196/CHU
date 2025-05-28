<template>
	<!-- 區塊：購買紀錄－始 -->
	<div class="selectContent" id="purchase" style="display: none;">
		<h5 class="mb-3">歷史訂單（僅展示效果，未實作。這段會刪掉）</h5>
		<!-- 一筆訂單 -->
		<div class="list-group mb-4">
			<div class="list-group-item">
				<div class="d-flex justify-content-between align-items-center">
					<div>
						<strong>訂單編號：</strong>#202405251234569<br>
						<small>下單日期：2024-05-25</small>
					</div>
					<div>
						<span class="badge bg-info">已下單</span>
						<button class="btn btn-sm btn-outline-primary">查看明細</button>
					</div>
				</div>
			</div>
		</div>
		<!-- 一筆訂單 -->
		<div class="list-group mb-4">
			<div class="list-group-item">
				<div class="d-flex justify-content-between align-items-center">
					<div>
						<strong>訂單編號：</strong>#202405211234569<br>
						<small>出貨日期：2024-05-25</small>
					</div>
					<div>
						<span class="badge bg-warning">運送中</span>
						<button class="btn btn-sm btn-outline-primary">查看明細</button>
					</div>
				</div>
			</div>
		</div>
		<!-- 一筆訂單 -->
		<div class="list-group mb-4">
			<div class="list-group-item">
				<div class="d-flex justify-content-between align-items-center">
					<div>
						<strong>訂單編號：</strong>#202405141234569<br>
						<small>下單日期：2024-05-14</small><br>
						<small>出貨日期：2024-05-19</small><br>
						<small>結算日期：2024-05-24</small>
					</div>
					<div>
						<span class="badge bg-success">已完成</span>
						<button class="btn btn-sm btn-primary">查看明細</button>
					</div>
				</div>
			</div>
			<!-- 明細 -->
			<div class="list-group-item">
				<div class="d-flex justify-content-between align-items-center">
					<div>
						<p>春水遊鯉</p>
						<p>冬日翠峰</p>
						<p>秋山煙嵐</p>
						<p>夏木幽亭</p>
					</div>
					<div>
						<p>售價：399</p>
						<p>售價：399</p>
						<p>售價：399</p>
						<p>售價：399</p>
					</div>
					<div>
						<p>1本</p>
						<p>1本</p>
						<p>1本</p>
						<p>1本</p>
					</div>
					<div>
						<p>小計：399</p>
						<p>小計：798</p>
						<p>小計：1197</p>
						<p>小計：1596</p>
					</div>
				</div>
				<hr>
				<div class="d-flex justify-content-end align-items-center">
					<div>
						<p>折扣：-0</p>
						<p>總計：1596</p>
					</div>
				</div>
			</div>
		</div>
		<!-- 更多訂單 -->
	</div>
</template>

<script>
export default {
	name: "PurchaseSection",
};
</script>
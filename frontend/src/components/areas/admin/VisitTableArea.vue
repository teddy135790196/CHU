<template>
	<table class="table table-bordered text-center visit-table">
		<thead>
			<tr>
				<!-- 左半邊表頭（顏色一致） -->
				<th class="header-left">時段 (小時)</th>
				<th class="header-left">今天 ({{ dateLabels.today }})</th>
				<th class="header-left">昨天 ({{ dateLabels.yesterday }})</th>
				<th class="header-left">前天 ({{ dateLabels.dayBeforeYesterday }})</th>

				<!-- 右半邊表頭（顏色一致） -->
				<th class="header-right">時段 (小時)</th>
				<th class="header-right">今天 ({{ dateLabels.today }})</th>
				<th class="header-right">昨天 ({{ dateLabels.yesterday }})</th>
				<th class="header-right">前天 ({{ dateLabels.dayBeforeYesterday }})</th>
			</tr>
		</thead>
		<tbody>
			<tr v-for="i in 12" :key="i">
				<!-- 左半邊資料 0~11點，時段欄加淺灰底 -->
				<td class="time-col time-cell time-left">
					{{ tableData[i - 1].hour }}:00 - {{ tableData[i - 1].hour }}:59
				</td>
				<td>
					{{ tableData[i - 1].hour >= currentTaipeiHour ? '-' : tableData[i - 1].today }}
				</td>
				<td>{{ tableData[i - 1].yesterday }}</td>
				<td>{{ tableData[i - 1].dayBeforeYesterday }}</td>

				<!-- 右半邊資料 12~23點，時段欄加淺灰底 -->
				<td class="time-col time-cell time-right">
					{{ tableData[i + 11].hour }}:00 - {{ tableData[i + 11].hour }}:59
				</td>
				<td>
					{{ tableData[i + 11].hour >= currentTaipeiHour ? '-' : tableData[i + 11].today }}
				</td>
				<td>{{ tableData[i + 11].yesterday }}</td>
				<td>{{ tableData[i + 11].dayBeforeYesterday }}</td>
			</tr>
		</tbody>
	</table>
</template>

<script>
export default {
	name: 'VisitTableArea',
	props: {
		tableData: { type: Array, required: true },
		dateLabels: { type: Object, required: true },
		currentTaipeiHour: { type: Number, required: true }
	}
};
</script>

<style scoped>
.visit-table {
	table-layout: fixed;
	width: 100%;
	word-break: keep-all;
}

.visit-table td {
	vertical-align: middle;
	padding: 0.5rem;
	font-size: 0.9rem;
}

/* 表頭同色（你說右邊顏色，這裡用淡藍灰色）*/
.header-left {
	background-color: #afd6f8;
	font-weight: 600;
}
/* 表頭同色（你說右邊顏色，這裡用淡藍灰色）*/
.header-right {
	background-color: #e3fdc3;
	font-weight: 600;
}

/* 時段欄淡灰底，左邊 0~11 點 */
.time-left {
	background-color: #f2f2f2;
	font-weight: 600;
	width: 10%;
}

/* 時段欄淡灰底，右邊 12~23 點 */
.time-right {
	background-color: #f2f2f2;
	font-weight: 600;
	width: 10%;
}

</style>

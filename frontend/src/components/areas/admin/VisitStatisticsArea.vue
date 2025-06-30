<template>
	<div class="row mb-5">
		<div class="col-md-6">
			<canvas ref="lineChart"></canvas>
		</div>
		<div class="col-md-6">
			<canvas ref="barChart"></canvas>
		</div>
	</div>
</template>

<script>
// 從 chart.js 套件中導入所需的核心類別與元件
import {
	Chart as ChartJS,           // 主 Chart 類別，建立圖表實例時使用

	// 控制圖表邏輯的控制器（例如如何繪製、互動等）
	LineController,             // 折線圖控制器
	BarController,              // 長條圖 / 橫條圖控制器

	// 負責圖表中每個資料點的視覺元素（顯示的圖形）
	LineElement,                // 折線圖的線條元素
	BarElement,                 // 長條圖/橫條圖的條形元素
	PointElement,               // 折線圖中每個節點（點）的圖形元素

	// 圖表的座標軸類型
	LinearScale,                // 線性比例尺（數值軸，通常用於 y 軸）
	CategoryScale,              // 類別比例尺（分類軸，通常用於 x 軸）

	// 圖表功能性插件
	Title,                      // 圖表標題插件
	Tooltip,                    // 滑鼠懸停顯示提示資訊（tooltip）
	Legend                      // 顯示圖例（legend），用來說明資料集代表什麼
} from 'chart.js';

// 註冊 Chart.js 所需的元件（v4 開始需顯式註冊）
ChartJS.register(
	LineController,
	BarController,
	LineElement,
	BarElement,
	PointElement,
	LinearScale,
	CategoryScale,
	Title,
	Tooltip,
	Legend
);

export default {
	name: 'VisitStatisticsArea',

	// 父層傳入的資料
	props: {
		tableData: { type: Array, required: true },
		dateLabels: { type: Object, required: true },
		currentTaipeiHour: { type: Number, required: true },
		todayHasData: { type: Boolean, required: true },
		monthlyData: { type: Array, required: true }  // 近30天資料
	},

	data() {
		return {
			lineChartInstance: null,
			barChartInstance: null
		};
	},

	// 監聽器：監控指定資料變動，並在變動時重新渲染圖表
	watch: {
		tableData: {  // 監聽 tableData 陣列（每小時瀏覽量資料）
			handler() {
				// 確認折線圖和直條圖的 DOM 元素已掛載（$refs 存在）
				if (this.$refs.lineChart && this.$refs.barChart) {
					this.renderCharts(); // 呼叫方法重新繪製折線圖和直條圖
				}
			},
			deep: true,       // 深度監聽，偵測陣列內物件內容變動
		},
		monthlyData: {
			handler() {
				if (this.$refs.barChart) {
					this.renderBarChart();
				}
			},
			deep: true,
		}

	},

	methods: {
		// 同時呼叫折線圖與直條圖的渲染方法，統一管理圖表更新
		renderCharts() {
			this.renderLineChart(); // 渲染折線圖
			this.renderBarChart();  // 渲染直條圖
		},

		// 📈 折線圖：每小時瀏覽量比對
		renderLineChart() {
			const ctx = this.$refs.lineChart.getContext('2d'); // 取得折線圖畫布的 2D 繪圖上下文
			if (this.lineChartInstance) this.lineChartInstance.destroy(); // 若已存在舊圖表，先銷毀避免重疊

			// 格式化資料為 {x, y} 結構，方便繪製折線圖
			// fieldName: 欲取用的欄位名稱（today, yesterday, dayBeforeYesterday）
			// limitHour: 畫到幾點（預設23，即全天）
			const formatLine = (fieldName, limitHour = 23) => {
				limitHour = Math.max(limitHour, 0); // 避免負數時間

				return this.tableData.map(row => {
					if (row.hour > limitHour) return null; // 超過限制時間的點不顯示
					const value = row[fieldName];
					return {
						x: `${row.hour}:00 - ${row.hour}:59`,           // 時間區間字串，作為 X 軸標籤
						y: typeof value === 'number' ? value : 0        // Y 軸值：瀏覽量，若非數字則視為0
					};
				}).filter(v => v !== null); // 移除空值
			};


			// 根據目前台北時間限制，格式化今日與昨日數據
			const todayLine = formatLine('today', Math.max(this.currentTaipeiHour - 1, 0));
			const yesterdayLine = formatLine('yesterday');

			const limitHour = Math.max(this.currentTaipeiHour - 1, 0);
			// 前天資料只顯示在今天時間之後的部分，其他為 null
			const dayBeforeYesterdayLine = this.tableData.map(row => {
				return row.hour >= limitHour
					? (typeof row.dayBeforeYesterday === 'number' ? row.dayBeforeYesterday : 0)
					: null;
			});


			// 定義三天資料的線條顏色
			const colors = {
				今天: 'rgba(75, 192, 192, 1)',
				昨天: 'rgba(255, 159, 64, 1)',
				前天: 'rgba(153, 102, 255, 1)'
			};

			// 決定要顯示哪幾天的線條
			let daysToShow = ['今天', '昨天', '前天'];

			let datasets = [];

			// 根據 daysToShow 製作對應的 dataset（線條設定）
			if (daysToShow.includes('今天')) {
				datasets.push({
					label: '今天',
					data: todayLine,
					borderColor: colors['今天'],
					backgroundColor: colors['今天'].replace('1)', '0.2)'), // 半透明填色
					tension: 0.4,     // 曲線平滑度
					fill: false,      // 不填滿曲線下方區域
					pointRadius: 3,   // 點大小
					pointHoverRadius: 6 // 滑鼠懸停點大小
				});
			}
			if (daysToShow.includes('昨天')) {
				datasets.push({
					label: '昨天',
					data: yesterdayLine,
					borderColor: colors['昨天'],
					backgroundColor: colors['昨天'].replace('1)', '0.2)'),
					tension: 0.4,
					fill: false,
					pointRadius: 3,
					pointHoverRadius: 6
				});
			}
			if (daysToShow.includes('前天')) {
				datasets.push({
					label: '前天',
					data: dayBeforeYesterdayLine,
					borderColor: colors['前天'],
					backgroundColor: colors['前天'].replace('1)', '0.2)'),
					tension: 0.4,
					fill: false,
					borderDash: [5, 5],  // 虛線效果
					pointRadius: 3,
					pointHoverRadius: 6
				});
			}

			// 使用 Chart.js 建立新圖表
			this.lineChartInstance = new ChartJS(ctx, {
				type: 'line', // 圖表類型為折線圖
				data: {
					datasets  // 直接使用上面製作的 datasets 陣列
				},
				options: {
					responsive: true,
					scales: {
						y: {
							beginAtZero: true,
							title: { display: true, text: '瀏覽量' }
						},
						x: {
							type: 'category',
							title: { display: true, text: '時段' }
						}
					},
					plugins: {
						legend: { position: 'top' },
						title: {
							display: true,
							text: '📈 每日每小時瀏覽量折線圖'
						}
					}
				}
			});
		},


		// 📊 直條圖：近30天瀏覽量展示
		renderBarChart() {
			const ctx = this.$refs.barChart.getContext('2d');

			if (this.barChartInstance) this.barChartInstance.destroy();

			const labels = this.monthlyData.map(item => item.date);
			const dataValues = this.monthlyData.map(item => item.totalViews);

			// 🕛 零時標記插件：自定義插件，用來在圖表中每個「00:00」的時間點畫出一個灰色背景區塊
			const highlightFirstDay = {
				id: 'highlightFirstDay',
				afterDatasetsDraw(chart) {
					const { ctx, chartArea: { left, right, top, bottom }, scales: { x } } = chart;

					const firstDayIndexes = [];
					chart.data.labels.forEach((label, index) => {
						const day = Number(label.split('-')[2]);
						if (day === 1) firstDayIndexes.push(index);
					});

					ctx.save();
					ctx.fillStyle = 'rgba(200, 200, 200, 0.35)'; // 淺灰色半透明背景

					firstDayIndexes.forEach(idx => {
						const xPos = x.getPixelForValue(idx);
						let leftBound = left;
						let rightBound = right;

						// 若不是第一筆資料，則設定左邊界為上一個刻度與當前刻度之中點
						if (idx > 0) {
							const prevX = x.getPixelForValue(idx - 1);
							leftBound = (prevX + xPos) / 2;
						}

						// 若不是最後一筆資料，則設定右邊界為下一個刻度與當前刻度之中點
						if (idx < chart.data.labels.length - 1) {
							const nextX = x.getPixelForValue(idx + 1);
							rightBound = (xPos + nextX) / 2;
						}

						// 在該區間畫出灰色半透明背景
						ctx.fillRect(leftBound, top, rightBound - leftBound, bottom - top);
					});

					ctx.restore();
				}
			};


			this.barChartInstance = new ChartJS(ctx, {
				type: 'bar',
				data: {
					labels: labels,
					datasets: [{
						label: '近30天每日瀏覽量',
						data: dataValues,
						backgroundColor: 'rgba(75, 192, 192, 0.6)',
						barPercentage: 0.7,
						categoryPercentage: 0.7
					}]
				},
				options: {
					responsive: true,
					scales: {
						y: {
							beginAtZero: true,
							title: { display: true, text: '瀏覽量' }
						},
						x: {
							title: { display: true, text: '日期' },
							ticks: {
								maxRotation: 0,
								minRotation: 0,
								autoSkip: false,
								maxTicksLimit: 30,
								callback: (tickValue, index) => {
									const label = labels[index];
									if (!label) return '';
									const day = Number(label.split('-')[2]);
									const pad = (n) => (n < 10 ? '0' + n : n);
									return pad(day);
								}
							}
						}
					},
					plugins: {
						legend: { 
							position: 'top',
							display: false // 🚫 不顯示圖例，因為只有一條線，不需要額外說明
						},
						title: {
							display: true,
							text: '📊 近30天每日瀏覽量直條圖'
						},
					}
				},
				plugins: [highlightFirstDay]
			});
		}


	}
};
</script>

<style scoped>
canvas {
	width: 100% !important;
	height: auto !important;
}
</style>

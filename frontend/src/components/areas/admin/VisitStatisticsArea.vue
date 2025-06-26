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
		todayHasData: { type: Boolean, required: true }
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
			immediate: false  // 不在監聽器建立時立即觸發，改由 mounted 時呼叫初始化
		},

		todayHasData() {  // 監聽 todayHasData（今天是否有資料的布林值）
			// 同樣確保圖表 DOM 元素已存在
			if (this.$refs.lineChart && this.$refs.barChart) {
				this.renderCharts(); // 當 todayHasData 變動時重新繪製圖表
			}
		}
	},

	// Vue 組件生命週期：組件掛載完成後執行
	mounted() {
		// 確保 DOM 元素存在後，執行初始圖表繪製
		this.renderCharts();
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
					label: '今天 瀏覽量',
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
					label: '昨天 瀏覽量',
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
					label: '前天 瀏覽量',
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

		
		// 📊 直條圖：每小時瀏覽量展示
		renderBarChart() {
			// 取得畫布元素的 2D 繪圖上下文
			const ctx = this.$refs.barChart.getContext('2d');

			// 如果已有舊的圖表實例，先銷毀避免重疊
			if (this.barChartInstance) this.barChartInstance.destroy();

			// 定義三天瀏覽量的顏色（帶透明度）
			const colors = {
				今天: 'rgba(75, 192, 192, 0.6)',    // 藍綠色
				昨天: 'rgba(255, 159, 64, 0.6)',    // 橘色
				前天: 'rgba(153, 102, 255, 0.6)'    // 紫色
			};

			// 根據是否有今天資料，決定要顯示哪幾天的資料
			// 有今天資料時顯示「今天」與「昨天」
			// 沒有則顯示「昨天」與「前天」
			let daysToShow = [];
			if (this.todayHasData) {
				daysToShow = ['今天', '昨天'];
			} else {
				daysToShow = ['昨天', '前天'];
			}

			// 針對要顯示的天數產生 datasets，準備給 ChartJS 使用
			const datasets = daysToShow.map(day => ({
				label: `${day} 瀏覽量`,  // 資料標籤，顯示於圖例
				data: this.tableData.map(row =>
					day === '今天'
						? row.today          // 今天的數據
						: day === '昨天'
							? row.yesterday    // 昨天的數據
							: row.dayBeforeYesterday  // 前天的數據
				),
				backgroundColor: colors[day], // 使用對應的顏色
				barPercentage: 0.7,            // 單一條的寬度比例（佔類別寬度的70%）
				categoryPercentage: 0.7        // 類別佔整個軸區域的比例（控制條間距）
			}));

			// 使用 ChartJS 建立新的直條圖實例
			this.barChartInstance = new ChartJS(ctx, {
				type: 'bar',    // 圖表類型為直條圖
				data: {
					// X 軸標籤，顯示每小時的時間區間文字
					labels: this.tableData.map(d => `${d.hour}:00 - ${d.hour}:59`),
					datasets          // 把前面產生的多組資料放入圖表中
				},
				options: {
					responsive: true,  // 圖表自動響應父容器大小
					scales: {
						y: {
							beginAtZero: true,  // Y 軸從 0 開始
							title: { display: true, text: '瀏覽量' }  // Y 軸標題
						},
						x: {
							title: { display: true, text: '時段' }   // X 軸標題
						}
					},
					plugins: {
						legend: { position: 'top' },    // 圖例放在上方
						title: {
							display: true,
							text: '📊 每日每小時瀏覽量直條圖'   // 圖表標題
						}
					}
				}
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

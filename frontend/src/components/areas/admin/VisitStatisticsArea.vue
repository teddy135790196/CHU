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
import {
	Chart as ChartJS,
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
} from 'chart.js';

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
	watch: {
		tableData: {
			handler() {
				this.renderCharts();
			},
			deep: true,
			immediate: true
		},
		todayHasData() {
			this.renderCharts();
		}
	},
	methods: {
		renderCharts() {
			this.renderLineChart();
			this.renderBarChart();
		},

		renderLineChart() {
			const ctx = this.$refs.lineChart.getContext('2d');
			if (this.lineChartInstance) this.lineChartInstance.destroy();

			console.log('台北時間小時:', this.currentTaipeiHour);
			console.log('目前 tableData 資料:', this.tableData);

			// 整理 { x, y } 格式
			const formatLine = (fieldName, limitHour = 23) => {
				limitHour = Math.max(limitHour, 0); // 避免負數
				return this.tableData.map(row => {
					if (row.hour > limitHour) return null;
					const value = row[fieldName];
					return {
						x: `${row.hour}:00 - ${row.hour}:59`,
						y: typeof value === 'number' ? value : 0
					};
				}).filter(v => v !== null); // 排除 null 點
			};

			const todayLine = formatLine('today', Math.max(this.currentTaipeiHour - 1, 0));
			const yesterdayLine = formatLine('yesterday');
			const dayBeforeYesterdayLine = this.tableData.map(row => {
				return row.hour >= this.currentTaipeiHour
					? (typeof row.dayBeforeYesterday === 'number' ? row.dayBeforeYesterday : 0)
					: null; // 過去時段為 null
			});
			const colors = {
				今天: 'rgba(75, 192, 192, 1)',
				昨天: 'rgba(255, 159, 64, 1)',
				前天: 'rgba(153, 102, 255, 1)'
			};

			let daysToShow = ['今天', '昨天', '前天'];

			let datasets = [];

			if (daysToShow.includes('今天')) {
				datasets.push({
					label: '今天 瀏覽量',
					data: todayLine,
					borderColor: colors['今天'],
					backgroundColor: colors['今天'].replace('1)', '0.2)'),
					tension: 0.4,
					fill: false,
					pointRadius: 3,
					pointHoverRadius: 6
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
					borderDash: [5, 5],
					pointRadius: 3,
					pointHoverRadius: 6
				});
			}

			this.lineChartInstance = new ChartJS(ctx, {
				type: 'line',
				data: {
					datasets
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



		renderBarChart() {
			const ctx = this.$refs.barChart.getContext('2d');
			if (this.barChartInstance) this.barChartInstance.destroy();

			const colors = {
				今天: 'rgba(75, 192, 192, 0.6)',
				昨天: 'rgba(255, 159, 64, 0.6)',
				前天: 'rgba(153, 102, 255, 0.6)'
			};

			let daysToShow = [];
			if (this.todayHasData) {
				daysToShow = ['今天', '昨天'];
			} else {
				daysToShow = ['昨天', '前天'];
			}

			const datasets = daysToShow.map(day => ({
				label: `${day} 瀏覽量`,
				data: this.tableData.map(row =>
					day === '今天'
						? row.today
						: day === '昨天'
							? row.yesterday
							: row.dayBeforeYesterday
				),
				backgroundColor: colors[day],
				barPercentage: 0.7,
				categoryPercentage: 0.7
			}));

			this.barChartInstance = new ChartJS(ctx, {
				type: 'bar',
				data: {
					labels: this.tableData.map(d => `${d.hour}:00 - ${d.hour}:59`),
					datasets
				},
				options: {
					responsive: true,
					scales: {
						y: { beginAtZero: true, title: { display: true, text: '瀏覽量' } },
						x: { title: { display: true, text: '時段' } }
					},
					plugins: {
						legend: { position: 'top' },
						title: { display: true, text: '📊 每日每小時瀏覽量直條圖' }
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

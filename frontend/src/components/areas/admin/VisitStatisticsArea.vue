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
	name: 'VisitCharts',
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

			let lastTodayHour = -1;
			this.tableData.forEach(row => {
				if (row.today > 0 && row.hour > lastTodayHour) {
					lastTodayHour = row.hour;
				}
			});

			const todayLine = this.tableData.map(row =>
				row.hour <= lastTodayHour ? row.today : null
			);
			const dayBeforeYesterdayLine = this.tableData.map(row =>
				row.hour > lastTodayHour ? row.dayBeforeYesterday : null
			);
			const yesterdayLine = this.tableData.map(row => row.yesterday);

			const colors = {
				今天: 'rgba(75, 192, 192, 1)',
				昨天: 'rgba(255, 159, 64, 1)',
				前天: 'rgba(153, 102, 255, 1)'
			};

			let daysToShow = [];
			if (this.todayHasData) {
				daysToShow = ['昨天', '今天'];
			} else {
				daysToShow = ['前天', '昨天'];
			}

			let datasets = [];

			if (daysToShow.includes('今天')) {
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
			} else if (daysToShow.includes('前天')) {
				datasets.push({
					label: '前天 瀏覽量',
					data: this.tableData.map(row => row.dayBeforeYesterday),
					borderColor: colors['前天'],
					backgroundColor: colors['前天'].replace('1)', '0.2)'),
					tension: 0.4,
					fill: false,
					pointRadius: 3,
					pointHoverRadius: 6
				});
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

			this.lineChartInstance = new ChartJS(ctx, {
				type: 'line',
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
						title: { display: true, text: '📈 每日每小時瀏覽量折線圖' }
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
				daysToShow = ['昨天', '今天'];
			} else {
				daysToShow = ['前天', '昨天'];
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

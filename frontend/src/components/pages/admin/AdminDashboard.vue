<template>
  <div class="container my-4">
    <h2 class="text-center mb-4">📊 管理後台儀表板</h2>

    <!-- 上方圖表 -->
    <div class="row mb-5">
      <div class="col-md-6">
        <canvas ref="lineChart"></canvas>
      </div>
      <div class="col-md-6">
        <canvas ref="barChart"></canvas>
      </div>
    </div>

    <!-- 下方資料表 -->
    <table class="table table-bordered text-center">
      <thead class="table-dark">
        <tr>
          <th>日期</th>
          <th>瀏覽量</th>
          <th>點擊次數</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="row in tableData" :key="row.date">
          <td>{{ row.date }}</td>
          <td>{{ row.views }}</td>
          <td>{{ row.clicks }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import {
  Chart as ChartJS,
  LineController, BarController,
  LineElement, BarElement,
  PointElement,
  LinearScale, CategoryScale,
  Title, Tooltip, Legend
} from 'chart.js';

ChartJS.register(
  LineController, BarController,
  LineElement, BarElement,
  PointElement,
  LinearScale, CategoryScale,
  Title, Tooltip, Legend
);

export default {
  name: 'AdminDashboard',
  data() {
    return {
      tableData: [
        { date: '2025-06-18', views: 120, clicks: 45 },
        { date: '2025-06-19', views: 150, clicks: 60 },
        { date: '2025-06-20', views: 130, clicks: 55 },
        { date: '2025-06-21', views: 180, clicks: 80 },
        { date: '2025-06-22', views: 160, clicks: 70 }
      ],
      lineChartInstance: null,
      barChartInstance: null
    };
  },
  mounted() {
    this.renderLineChart();
    this.renderBarChart();
  },
  methods: {
    renderLineChart() {
      const ctx = this.$refs.lineChart.getContext('2d');
      if (this.lineChartInstance) this.lineChartInstance.destroy();

      this.lineChartInstance = new ChartJS(ctx, {
        type: 'line',
        data: {
          labels: this.tableData.map(row => row.date),
          datasets: [
            {
              label: '瀏覽量',
              data: this.tableData.map(row => row.views),
              borderColor: 'rgba(75, 192, 192, 1)',
              backgroundColor: 'rgba(75, 192, 192, 0.2)',
              tension: 0.4,
              fill: false,
              yAxisID: 'y'
            },
            {
              label: '點擊次數',
              data: this.tableData.map(row => row.clicks),
              borderColor: 'rgba(255, 99, 132, 1)',
              backgroundColor: 'rgba(255, 99, 132, 0.2)',
              tension: 0.4,
              fill: false,
              yAxisID: 'y1'
            }
          ]
        },
        options: {
          responsive: true,
          interaction: {
            mode: 'index',
            intersect: false
          },
          stacked: false,
          scales: {
            y: {
              type: 'linear',
              display: true,
              position: 'left',
              title: {
                display: true,
                text: '瀏覽量'
              }
            },
            y1: {
              type: 'linear',
              display: true,
              position: 'right',
              grid: {
                drawOnChartArea: false,
              },
              title: {
                display: true,
                text: '點擊次數'
              }
            }
          },
          plugins: {
            legend: {
              position: 'top'
            },
            title: {
              display: true,
              text: '📈 每日瀏覽量與點擊次數 (折線圖)'
            }
          }
        }
      });
    },
    renderBarChart() {
      const ctx = this.$refs.barChart.getContext('2d');
      if (this.barChartInstance) this.barChartInstance.destroy();

      this.barChartInstance = new ChartJS(ctx, {
        type: 'bar',
        data: {
          labels: this.tableData.map(row => row.date),
          datasets: [
            {
              label: '瀏覽量',
              data: this.tableData.map(row => row.views),
              backgroundColor: 'rgba(75, 192, 192, 0.6)',
              yAxisID: 'y'
            },
            {
              label: '點擊次數',
              data: this.tableData.map(row => row.clicks),
              backgroundColor: 'rgba(255, 99, 132, 0.6)',
              yAxisID: 'y1'
            }
          ]
        },
        options: {
          responsive: true,
          scales: {
            y: {
              type: 'linear',
              position: 'left',
              title: {
                display: true,
                text: '瀏覽量'
              }
            },
            y1: {
              type: 'linear',
              position: 'right',
              grid: {
                drawOnChartArea: false
              },
              title: {
                display: true,
                text: '點擊次數'
              }
            }
          },
          plugins: {
            legend: {
              position: 'top'
            },
            title: {
              display: true,
              text: '📊 每日瀏覽量與點擊次數 (直條圖)'
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

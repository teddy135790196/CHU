<template>
  <div class="container my-4">
    <!-- 上方資料統計卡片 -->
    <div class="row mb-4 text-center">
      <div class="col-md-4">
        <div class="card border-info shadow-sm">
          <div class="card-body">
            <h5 class="card-title">今日瀏覽量</h5>
            <p class="card-text display-6 text-info">{{ summary.today }}</p>
          </div>
        </div>
      </div>
      <div class="col-md-4">
        <div class="card border-warning shadow-sm">
          <div class="card-body">
            <h5 class="card-title">近三日瀏覽量</h5>
            <p class="card-text display-6 text-warning">{{ summary.lastThreeDays }}</p>
          </div>
        </div>
      </div>
      <div class="col-md-4">
        <div class="card border-success shadow-sm">
          <div class="card-body">
            <h5 class="card-title">總瀏覽量</h5>
            <p class="card-text display-6 text-success">{{ summary.total }}</p>
          </div>
        </div>
      </div>
    </div>

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
          <th>時段 (小時)</th>
          <th>今天 ({{ dateLabels.today }})</th>
          <th>昨天 ({{ dateLabels.yesterday }})</th>
          <th>前天 ({{ dateLabels.dayBeforeYesterday }})</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="row in tableData" :key="row.hour">
          <td>{{ row.hour }}:00 - {{ row.hour }}:59</td>
          <td>{{ row.hour >= currentTaipeiHour ? '-' : row.today }}</td>
          <td>{{ row.yesterday }}</td>
          <td>{{ row.dayBeforeYesterday }}</td>
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
      tableData: Array.from({ length: 24 }, (_, i) => ({
        hour: i,
        today: 0,
        yesterday: 0,
        dayBeforeYesterday: 0
      })),
      lineChartInstance: null,
      barChartInstance: null,
      dateLabels: {
        today: '',
        yesterday: '',
        dayBeforeYesterday: ''
      },
      summary: {
        today: 0,
        lastThreeDays: 0,
        total: 0
      },
      currentTaipeiHour: 23 // 預設為23，避免尚未取到時間前顯示錯誤
    };
  },
  mounted() {
    this.fetchSummaryData();
  },
  methods: {
    getTaipeiDateStr(date) {
      return date.toLocaleDateString('zh-TW', {
        timeZone: 'Asia/Taipei',
        year: 'numeric',
        month: '2-digit',
        day: '2-digit'
      }).replace(/\//g, '-');
    },

    async fetchSummaryData() {
      try {
        // 取得近三日詳細資料
        const res = await this.$axios.get('/api/trackVisit/visits_summary');
        const data = res.data;

        const now = new Date();

        const taipeiHour = Number(now.toLocaleString('en-US', {
          timeZone: 'Asia/Taipei',
          hour12: false,
          hour: '2-digit'
        }));
        this.currentTaipeiHour = taipeiHour;

        const todayStr = this.getTaipeiDateStr(now);
        const yesterday = new Date(now);
        yesterday.setDate(yesterday.getDate() - 1);
        const yesterdayStr = this.getTaipeiDateStr(yesterday);
        const dayBeforeYesterday = new Date(now);
        dayBeforeYesterday.setDate(dayBeforeYesterday.getDate() - 2);
        const dayBeforeYesterdayStr = this.getTaipeiDateStr(dayBeforeYesterday);

        this.dateLabels.today = todayStr;
        this.dateLabels.yesterday = yesterdayStr;
        this.dateLabels.dayBeforeYesterday = dayBeforeYesterdayStr;

        this.tableData.forEach(row => {
          row.today = 0;
          row.yesterday = 0;
          row.dayBeforeYesterday = 0;
        });

        data.forEach(item => {
          const hour = Number(item.hour);
          if (hour < 0 || hour > 23) return;

          const dateStr = item.visit_date.slice(0, 10);

          if (dateStr === todayStr) {
            this.tableData[hour].today = item.visit_count;
          } else if (dateStr === yesterdayStr) {
            this.tableData[hour].yesterday = item.visit_count;
          } else if (dateStr === dayBeforeYesterdayStr) {
            this.tableData[hour].dayBeforeYesterday = item.visit_count;
          }
        });

        let todaySum = 0;
        let last3DaysSum = 0;
        this.tableData.forEach(row => {
          todaySum += row.today;
          last3DaysSum += row.today + row.yesterday + row.dayBeforeYesterday;
        });

        this.summary.today = todaySum;
        this.summary.lastThreeDays = last3DaysSum;

        // 新增：取得總瀏覽量
        const totalRes = await this.$axios.get('/api/trackVisit/visits_total');
        this.summary.total = totalRes.data.total || 0;

        const todayHasData = this.tableData.some(row => row.today > 0);
        const daysToShow = todayHasData ? ['昨天', '今天'] : ['前天', '昨天'];

        this.renderLineChart(daysToShow);
        this.renderBarChart(daysToShow);
      } catch (err) {
        console.error('讀取統計資料錯誤', err);
        alert('載入訪問統計資料失敗');
      }
    },


    renderLineChart(daysToShow) {
      const ctx = this.$refs.lineChart.getContext('2d');
      if (this.lineChartInstance) this.lineChartInstance.destroy();

      let lastTodayHour = -1;
      this.tableData.forEach(row => {
        if (row.today > 0 && row.hour > lastTodayHour) {
          lastTodayHour = row.hour;
        }
      });

      const todayLine = this.tableData.map(row => (row.hour <= lastTodayHour ? row.today : null));
      const dayBeforeYesterdayLine = this.tableData.map(row => (row.hour > lastTodayHour ? row.dayBeforeYesterday : null));
      const yesterdayLine = this.tableData.map(row => row.yesterday);

      const colors = {
        今天: 'rgba(75, 192, 192, 1)',
        昨天: 'rgba(255, 159, 64, 1)',
        前天: 'rgba(153, 102, 255, 1)'
      };

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
          pointHoverRadius: 6,
        });
        datasets.push({
          label: '今天 瀏覽量',
          data: todayLine,
          borderColor: colors['今天'],
          backgroundColor: colors['今天'].replace('1)', '0.2)'),
          tension: 0.4,
          fill: false,
          pointRadius: 3,
          pointHoverRadius: 6,
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
          pointHoverRadius: 6,
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
          pointHoverRadius: 6,
        });
        datasets.push({
          label: '昨天 瀏覽量',
          data: yesterdayLine,
          borderColor: colors['昨天'],
          backgroundColor: colors['昨天'].replace('1)', '0.2)'),
          tension: 0.4,
          fill: false,
          pointRadius: 3,
          pointHoverRadius: 6,
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

    renderBarChart(daysToShow) {
      const ctx = this.$refs.barChart.getContext('2d');
      if (this.barChartInstance) this.barChartInstance.destroy();

      const colors = {
        今天: 'rgba(75, 192, 192, 0.6)',
        昨天: 'rgba(255, 159, 64, 0.6)',
        前天: 'rgba(153, 102, 255, 0.6)'
      };

      const datasets = daysToShow.map(day => ({
        label: `${day} 瀏覽量`,
        data: this.tableData.map(row => row[
          day === '今天' ? 'today' :
            day === '昨天' ? 'yesterday' :
              'dayBeforeYesterday'
        ]),
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

.card-title {
  font-size: 1.2rem;
  margin-bottom: 0.5rem;
}

.card-text {
  font-weight: bold;
}
</style>

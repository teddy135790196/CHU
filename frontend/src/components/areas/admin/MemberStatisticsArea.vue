<template>
  <div class="row" style="height: 500px;">
    <div class="col-md-4 d-flex flex-column" style="height: 100%;">
      <div class="p-3 bg-white rounded shadow-sm d-flex align-items-center h-100">
        <canvas ref="newUserBarChart" class="w-100" style="max-height: 100%;"></canvas>
      </div>
    </div>

    <div class="col-md-8 d-flex flex-column" style="height: 100%; gap: 1rem;">
      <div class="p-3 bg-white rounded shadow-sm d-flex align-items-center" style="flex-grow: 1; max-height: 60%;">
        <canvas ref="registerChart" class="w-100" style="max-height: 100%;"></canvas>
      </div>

      <div class="card d-flex flex-row justify-content-around p-3 shadow-sm" style="flex-grow: 1; max-height: 40%;">
        <div v-for="card in cards" :key="card.title"
          class="card-item d-flex flex-column justify-content-center align-items-center border-end px-3"
          :style="{ borderRight: card.title === cards[cards.length - 1].title ? 'none' : '' }">
          <h5 class="card-title">{{ card.title }}</h5>
          <p :class="['card-text', 'display-5', card.textClass]">
            {{ card.value }}
          </p>
        </div>
      </div>
    </div>
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
  name: 'MemberSummaryCharts',
  props: {
    todayNewUsers: { type: Number, required: true },
    verifiedUsers: { type: Number, required: true },
    totalUsers: { type: Number, required: true },
    newUserLabels: { type: Array, required: true },
    newUserData: { type: Array, required: true }
  },
  data() {
    return {
      registerChartInstance: null,
      newUserBarChartInstance: null,
      registerLabelsLocal: [],
      registerDataLocal: []
    };
  },
  computed: {
    cards() {
      return [
        { title: '今日新會員數', value: this.todayNewUsers, borderClass: 'border-info', textClass: 'text-info' },
        { title: '已驗證會員數', value: this.verifiedUsers, borderClass: 'border-success', textClass: 'text-success' },
        { title: '會員總數', value: this.totalUsers, borderClass: 'border-primary', textClass: 'text-primary' }
      ];
    }
  },
  watch: {
    todayNewUsers: 'renderCharts',
    verifiedUsers: 'renderCharts',
    totalUsers: 'renderCharts',
    newUserLabels: 'renderCharts',
    newUserData: 'renderCharts'
  },
  mounted() {
    this.fetchActiveUserData();
    this.renderNewUserBarChart();
  },
  methods: {
    // 將 UTC 時間字串加 8 小時並格式化成 YYYY-MM-DD HH:00 字串
    formatTaipeiDateTime(utcDateStr, hour) {
      const utcDate = new Date(utcDateStr);
      const taipeiMs = utcDate.getTime() + 8 * 60 * 60 * 1000;
      const taipeiDate = new Date(taipeiMs);

      // 有時資料會分開給日期和 hour，hour 是 0~23 整點小時
      // 這裡直接用傳來的 hour 填入小時欄位，保險起見
      taipeiDate.setHours(hour);

      const y = taipeiDate.getFullYear();
      const m = String(taipeiDate.getMonth() + 1).padStart(2, '0');
      const d = String(taipeiDate.getDate()).padStart(2, '0');
      const h = String(taipeiDate.getHours()).padStart(2, '0');

      return `${y}-${m}-${d} ${h}:00`;
    },

    fetchActiveUserData() {
      this.$axios.get('/api/trackVisit/active_users_recent')
        .then(res => {
          const data = res.data;
          this.registerLabelsLocal = data.map(item => this.formatTaipeiDateTime(item.visit_date, item.hour));
          this.registerDataLocal = data.map(item => item.active_user_count);
          this.renderRegisterChart();
        })
        .catch(err => {
          console.error('抓取活躍會員資料錯誤:', err);
        });
    },
    renderCharts() {
      this.renderRegisterChart();
      this.renderNewUserBarChart();
    },
    renderRegisterChart() {
      const ctx = this.$refs.registerChart.getContext('2d');
      if (this.registerChartInstance) this.registerChartInstance.destroy();

      const highlightMidnight = {
        id: 'highlightMidnight',
        afterDatasetsDraw(chart) {
          const { ctx, chartArea: { left, right, top, bottom }, scales: { x } } = chart;

          const midnightIndexes = [];
          chart.data.labels.forEach((label, index) => {
            if (label.endsWith('00:00')) {
              midnightIndexes.push(index);
            }
          });

          ctx.save();
          ctx.fillStyle = 'rgba(200, 200, 200, 0.35)';

          midnightIndexes.forEach((idx) => {
            const xPos = x.getPixelForValue(idx);
            let leftBound = left;
            let rightBound = right;
            if (idx > 0) {
              const prevX = x.getPixelForValue(idx - 1);
              leftBound = (prevX + xPos) / 2;
            }
            if (idx < chart.data.labels.length - 1) {
              const nextX = x.getPixelForValue(idx + 1);
              rightBound = (xPos + nextX) / 2;
            }
            ctx.fillRect(leftBound, top, rightBound - leftBound, bottom - top);
          });

          ctx.restore();
        }
      };

      this.registerChartInstance = new ChartJS(ctx, {
        type: 'line',
        data: {
          labels: this.registerLabelsLocal,
          datasets: [{
            label: '活躍會員數（近24小時）',
            data: this.registerDataLocal,
            borderColor: 'rgba(54, 162, 235, 1)',
            backgroundColor: 'rgba(54, 162, 235, 0.2)',
            tension: 0.3,
            fill: true,
            pointRadius: 3,
          }]
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          plugins: {
            title: { display: true, text: '會員活躍度（近24小時）' },
            legend: { display: false },
            highlightMidnight
          },
          scales: {
            x: {
              title: { display: true, text: '時間' },
              ticks: {
                callback(value) {
                  const label = this.getLabelForValue(value);
                  if (label.endsWith('00:00')) {
                    return label.slice(0, 10);
                  } else {
                    return label.slice(11);
                    // 或 return ''; // 不顯示其他時間標籤
                  }
                }
              }

            },
            y: {
              beginAtZero: true,
              title: { display: true, text: '活躍會員數' }
            }
          }
        },
        plugins: [highlightMidnight]
      });
    },


    renderNewUserBarChart() {
      const ctx = this.$refs.newUserBarChart.getContext('2d');
      if (this.newUserBarChartInstance) this.newUserBarChartInstance.destroy();

      this.newUserBarChartInstance = new ChartJS(ctx, {
        type: 'bar',
        data: {
          labels: this.newUserLabels,
          datasets: [{
            label: '新增會員人數',
            data: this.newUserData,
            backgroundColor: '#198754'
          }]
        },
        options: {
          indexAxis: 'y',
          responsive: true,
          maintainAspectRatio: false,
          plugins: {
            title: { display: true, text: '近十五日新會員人數' },
            legend: { display: false }
          },
          scales: {
            x: { beginAtZero: true, title: { display: true, text: '人數' } },
            y: { title: { display: true, text: '日期' } }
          }
        }
      });
    }
  }
};
</script>

<style scoped>
.card-title {
  font-size: 1rem;
  margin-bottom: 0.25rem;
  text-align: center;
}

.card-text {
  font-size: 1.75rem;
  font-weight: bold;
  line-height: 1;
  margin: 0;
  text-align: center;
}

.card {
  min-height: unset;
  border: none;
  background: none;
  box-shadow: none;
}

.card .card-item {
  flex: 1;
  text-align: center;
}

.border-end {
  border-right: 1px solid #b7c3d0 !important;
}
</style>

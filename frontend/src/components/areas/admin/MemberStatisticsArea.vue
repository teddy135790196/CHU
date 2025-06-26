<template>
  <div class="row" style="height: 500px;">

    <div class="col-md-4 d-flex flex-column" style="height: 100%;">
      <!-- 橫條圖 -->
      <div class="p-3 bg-white rounded shadow-sm d-flex align-items-center h-100">
        <canvas ref="newUserBarChart" class="w-100" style="max-height: 100%;"></canvas>
      </div>
    </div>


    <div class="col-md-8 d-flex flex-column" style="height: 100%; gap: 1rem;">

      <!-- 折線圖 -->
      <div class="p-3 bg-white rounded shadow-sm d-flex align-items-center" style="flex-grow: 1; max-height: 60%;">
        <canvas ref="registerChart" class="w-100" style="max-height: 100%;"></canvas>
      </div>

      <!-- 數據卡 -->
      <div class="card d-flex flex-row justify-content-around p-3 shadow-sm" style="flex-grow: 1; max-height: 40%;">
        <div v-for="(card, index) in cards" :key="card.title"
          class="card-item d-flex flex-column justify-content-center align-items-center px-3"
          :class="{ 'with-border': index !== cards.length - 1 }">
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
  name: 'MemberStatisticsArea',
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

    // 繪製折線圖
    renderRegisterChart() {
      const ctx = this.$refs.registerChart.getContext('2d');
      if (this.registerChartInstance) this.registerChartInstance.destroy(); // 如果已經存在圖表實例，就銷毀它

      // 午夜高亮插件
      const highlightMidnight = {
        id: 'highlightMidnight',
        afterDatasetsDraw(chart) {
          const { ctx, chartArea: { left, right, top, bottom }, scales: { x } } = chart;

          // 找出零時的索引
          const midnightIndexes = [];
          chart.data.labels.forEach((label, index) => {
            if (label.endsWith('00:00')) midnightIndexes.push(index);
          });

          ctx.save();
          ctx.fillStyle = 'rgba(200, 200, 200, 0.35)'; // 高亮顏色

          // 在零時位置高亮顯示
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
            ctx.fillRect(leftBound, top, rightBound - leftBound, bottom - top); // 畫出高亮區域
          });

          ctx.restore();
        }
      };

      // new ChartJS 建立圖表
      this.registerChartInstance = new ChartJS(ctx, {
        type: 'line', // 圖表類型：折線圖
        data: {
          labels: this.registerLabelsLocal, // X 軸標籤，顯示時間
          datasets: [{
            label: '活躍會員數（近24小時）', // 數據標籤
            data: this.registerDataLocal, // Y 軸數據，顯示活躍會員數
            borderColor: 'rgba(54, 162, 235, 1)', // 線條顏色
            backgroundColor: 'rgba(54, 162, 235, 0.2)', // 填充顏色
            tension: 0.3, // 線條彎曲度
            fill: true, // 填充顏色
            pointRadius: 3, // 點的半徑
          }]
        },
        options: {
          responsive: true, // 自適應
          maintainAspectRatio: false, // 允許調整圖表比例
          plugins: {
            title: { display: true, text: '會員活躍度（近24小時）' }, // 顯示標題
            legend: { display: false }, // 隱藏圖例
            highlightMidnight // 使用自定義插件
          },
          scales: {
            x: {
              title: { display: true, text: '時間' }, // X 軸標題為 "時間"
              ticks: {
                callback(value) {
                  const label = this.getLabelForValue(value);
                  if (label.endsWith('00:00')) {
                    return label.slice(0, 10); // 零時顯示日期
                  } else {
                    return label.slice(11, 13); // 顯示小時
                  }
                }
              }
            },
            y: {
              beginAtZero: true, // Y 軸從 0 開始
              title: { display: true, text: '活躍會員數' } // Y 軸標題
            }
          }
        },
        plugins: [highlightMidnight] // 使用午夜高亮插件
      });
    },


    // 繪製橫條圖
    renderNewUserBarChart() {
      const ctx = this.$refs.newUserBarChart.getContext('2d');
      if (this.newUserBarChartInstance) this.newUserBarChartInstance.destroy(); // 如果已經存在圖表實例，就銷毀它

      // new ChartJS 建立圖表
      this.newUserBarChartInstance = new ChartJS(ctx, {
        type: 'bar', // 圖表類型：橫條圖
        data: {
          labels: this.newUserLabels, // X 軸標籤，顯示日期
          datasets: [{
            label: '新增會員人數', // 數據的標籤
            data: this.newUserData, // Y 軸數據，顯示新增會員數
            backgroundColor: '#198754' // 條形圖的顏色
          }]
        },
        options: {
          indexAxis: 'y', // 設置為橫向條形圖
          responsive: true, // 自適應大小
          maintainAspectRatio: false, // 允許圖表在大小變化時調整比例
          plugins: {
            title: { display: true, text: '近十五日新會員人數' }, // 顯示圖表標題
            legend: { display: false } // 隱藏圖例
          },
          scales: {
            x: { beginAtZero: true, title: { display: true, text: '人數' } }, // X 軸設定為 0 開始，並顯示 '人數'
            y: { title: { display: true, text: '日期' } } // Y 軸顯示 '日期'
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
  background-color: rgb(243, 244, 221);
  box-shadow: none;
}

.card .card-item {
  flex: 1;
  text-align: center;
}

.card-item.with-border {
  border-right: 1px solid #b7c3d0 !important;
}


.border-end {
  border-right: 1px solid #b7c3d0 !important;
}
</style>

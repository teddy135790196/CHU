<template>
  <div class="p-4">
    <!-- <h2 class="mb-4 text-center">管理後台儀表板</h2> -->

    <div class="dashboard-grid">
      <!-- 今日區塊 -->
      <div class="card big-card today-card">
        <h5>今日網站瀏覽數</h5>
        <p class="display-4">{{ todayViews.toLocaleString() }}</p>
        <small :class="['change-number', changeClass(todayViewsDiff)]">
          {{ formatChange(todayViewsDiff) }}
        </small>
      </div>

      <div class="card mid-card today-card">
        <h5>今日加入會員數</h5>
        <p class="display-4">{{ todaySignups.toLocaleString() }}</p>
        <small :class="['change-number', changeClass(todaySignupsDiff)]">
          {{ formatChange(todaySignupsDiff) }}
        </small>
      </div>

      <div class="card small-card today-card">
        <h5>今日訂單數</h5>
        <p class="display-4">{{ todayOrders.toLocaleString() }}</p>
        <small :class="['change-number', changeClass(todayOrdersDiff)]">
          {{ formatChange(todayOrdersDiff) }}
        </small>
      </div>

      <!-- 本週區塊 -->
      <div class="card big-card week-card">
        <h5>本週網站瀏覽數</h5>
        <p class="display-4">{{ weeklyViews.toLocaleString() }}</p>
        <small :class="['change-number', changeClass(weeklyViewsDiff)]">
          {{ formatChange(weeklyViewsDiff) }}
        </small>
      </div>

      <div class="card mid-card week-card">
        <h5>本週訂單數</h5>
        <p class="display-4">{{ weekOrders.toLocaleString() }}</p>
        <small :class="['change-number', changeClass(weekOrdersDiff)]">
          {{ formatChange(weekOrdersDiff) }}
        </small>
      </div>

      <div class="card small-card week-card">
        <h5>本週新增會員數</h5>
        <p class="display-4">{{ weeklyNewMembers.toLocaleString() }}</p>
        <small :class="['change-number', changeClass(weeklyNewMembersDiff)]">
          {{ formatChange(weeklyNewMembersDiff) }}
        </small>
      </div>

      <!-- 總計區塊 -->
      <div class="card mid-card total-card">
        <h5>會員總數</h5>
        <p class="display-4">{{ totalMembers.toLocaleString() }}</p>
      </div>

      <div class="card mid-card total-card">
        <h5>網站總瀏覽量</h5>
        <p class="display-4">{{ totalViews.toLocaleString() }}</p>
      </div>

      <div class="card mid-card total-card">
        <h5>總訂單數</h5>
        <p class="display-4">{{ totalOrders.toLocaleString() }}</p>
      </div>

      <!-- 圖表 -->
      <div class="card chart-card big-card">
        <canvas ref="viewsChart" height="180"></canvas>
      </div>

      <div class="card chart-card big-card">
        <canvas ref="signupsOrdersChart" height="180"></canvas>
      </div>
    </div>
  </div>
</template>



<script>
import {
  Chart,
  LineController,
  LineElement,
  PointElement,
  LinearScale,
  Title,
  CategoryScale,
  Tooltip,
  Legend,
  BarController,
  BarElement,
} from 'chart.js'

Chart.register(
  LineController,
  LineElement,
  PointElement,
  LinearScale,
  Title,
  CategoryScale,
  Tooltip,
  Legend,
  BarController,
  BarElement
)

export default {
  data() {
    return {
      todayViews: 1800,
      todayViewsDiff: 120,
      todaySignups: 42,
      todaySignupsDiff: -8,
      todayOrders: 80,
      todayOrdersDiff: 3,

      weekOrders: 450,
      weekOrdersDiff: 30,
      weeklyNewMembers: 220,
      weeklyNewMembersDiff: -10,
      weeklyViews: 10000,
      weeklyViewsDiff: 850,

      totalMembers: 12500,
      totalViews: 3500000,
      totalOrders: 3400,

      last7Days: ['6/17', '6/18', '6/19', '6/20', '6/21', '6/22', '6/23'],
      viewsData: [1200, 1340, 1500, 1600, 1580, 1720, 1800],
      signupsData: [30, 28, 35, 40, 45, 38, 42],
      ordersData: [50, 55, 60, 68, 75, 70, 80],
    }
  },
  mounted() {
    this.renderViewsChart()
    this.renderSignupsOrdersChart()
  },
  methods: {
    formatChange(val) {
      return val > 0 ? `▲ +${val}` : `▼ ${Math.abs(val)}`
    },
    changeClass(val) {
      return val > 0 ? 'text-success' : 'text-danger'
    },
    renderViewsChart() {
      const ctx = this.$refs.viewsChart.getContext('2d')
      new Chart(ctx, {
        type: 'line',
        data: {
          labels: this.last7Days,
          datasets: [
            {
              label: '網站瀏覽數',
              data: this.viewsData,
              borderColor: '#007bff',
              backgroundColor: 'rgba(0,123,255,0.2)',
              fill: true,
              tension: 0.3,
              pointRadius: 4,
            },
          ],
        },
        options: {
          responsive: true,
          scales: { y: { beginAtZero: true } },
        },
      })
    },
    renderSignupsOrdersChart() {
      const ctx = this.$refs.signupsOrdersChart.getContext('2d')
      new Chart(ctx, {
        type: 'bar',
        data: {
          labels: this.last7Days,
          datasets: [
            {
              label: '今日加入會員數',
              data: this.signupsData,
              backgroundColor: '#28a745',
            },
            {
              label: '今日訂單數',
              data: this.ordersData,
              backgroundColor: '#ffc107',
            },
          ],
        },
        options: {
          responsive: true,
          scales: { y: { beginAtZero: true } },
        },
      })
    },
  },
}
</script>



<style scoped>
.dashboard-grid {
  display: grid;
  grid-template-columns: repeat(6, 1fr);
  grid-auto-rows: 150px;
  gap: 20px 15px;
}

.big-card {
  grid-column: span 3;
  grid-row: span 2;
  font-size: 1.8rem;
}

.mid-card {
  grid-column: span 2;
  grid-row: span 1;
  font-size: 1.4rem;
}

.small-card {
  grid-column: span 1;
  grid-row: span 1;
  font-size: 1.2rem;
}

.card {
  border-radius: 12px;
  box-shadow: 0 3px 8px rgb(0 0 0 / 0.1);
  padding: 1rem 1.25rem;
  color: #333;
  display: flex;
  flex-direction: column;
  justify-content: center;
  transition: box-shadow 0.3s ease;
  background-color: #f9f9f9;
}

.card:hover {
  box-shadow: 0 6px 15px rgb(0 123 255 / 0.3);
}

.today-card {
  background-color: #e3f2fd;
}

.week-card {
  background-color: #e8f5e9;
}

.total-card {
  background-color: #fff3e0;
}

.chart-card {
  padding: 0.5rem;
  background: #fff8e1;
  color: #856404;
}

.display-4 {
  font-size: 3rem;
  margin: 0.25rem 0 0 0;
  font-weight: 700;
}

.change-number {
  font-size: 1.2rem;
  font-weight: 600;
  margin-top: 0.25rem;
}

.text-success {
  color: #28a745;
}

.text-danger {
  color: #dc3545;
}
</style>

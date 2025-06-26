<template>
  <div class="admin-dashboard">
    <!-- 頁面標題 -->
    <div class="page-header">
      <h1 class="page-title">棲遲書屋後台管理</h1>
      <p class="page-subtitle">系統數據總覽與管理中心</p>
    </div>

    <div class="dashboard-grid">
      <!-- 統計卡片區域 -->
      <div class="stats-container">
        <!-- 今日區塊 -->
        <div class="stat-card today-card">
          <div class="card-header">
            <div class="card-icon">👀</div>
            <h5 class="card-title">今日網站瀏覽數</h5>
          </div>
          <div class="card-body">
            <p class="display-number">{{ todayViews.toLocaleString() }}</p>
            <small :class="['change-indicator', changeClass(todayViewsDiff)]">
              {{ formatChange(todayViewsDiff) }}
            </small>
          </div>
        </div>

        <div class="stat-card today-card">
          <div class="card-header">
            <div class="card-icon">👥</div>
            <h5 class="card-title">今日加入會員數</h5>
          </div>
          <div class="card-body">
            <p class="display-number">{{ todaySignups.toLocaleString() }}</p>
            <small :class="['change-indicator', changeClass(todaySignupsDiff)]">
              {{ formatChange(todaySignupsDiff) }}
            </small>
          </div>
        </div>

        <div class="stat-card today-card">
          <div class="card-header">
            <div class="card-icon">🛒</div>
            <h5 class="card-title">今日訂單數</h5>
          </div>
          <div class="card-body">
            <p class="display-number">{{ todayOrders.toLocaleString() }}</p>
            <small :class="['change-indicator', changeClass(todayOrdersDiff)]">
              {{ formatChange(todayOrdersDiff) }}
            </small>
          </div>
        </div>

        <!-- 本週區塊 -->
        <div class="stat-card week-card">
          <div class="card-header">
            <div class="card-icon">📈</div>
            <h5 class="card-title">本週網站瀏覽數</h5>
          </div>
          <div class="card-body">
            <p class="display-number">{{ weeklyViews.toLocaleString() }}</p>
            <small :class="['change-indicator', changeClass(weeklyViewsDiff)]">
              {{ formatChange(weeklyViewsDiff) }}
            </small>
          </div>
        </div>

        <div class="stat-card week-card">
          <div class="card-header">
            <div class="card-icon">📦</div>
            <h5 class="card-title">本週訂單數</h5>
          </div>
          <div class="card-body">
            <p class="display-number">{{ weekOrders.toLocaleString() }}</p>
            <small :class="['change-indicator', changeClass(weekOrdersDiff)]">
              {{ formatChange(weekOrdersDiff) }}
            </small>
          </div>
        </div>

        <div class="stat-card week-card">
          <div class="card-header">
            <div class="card-icon">🆕</div>
            <h5 class="card-title">本週新增會員數</h5>
          </div>
          <div class="card-body">
            <p class="display-number">{{ weeklyNewMembers.toLocaleString() }}</p>
            <small :class="['change-indicator', changeClass(weeklyNewMembersDiff)]">
              {{ formatChange(weeklyNewMembersDiff) }}
            </small>
          </div>
        </div>

        <!-- 總計區塊 -->
        <div class="stat-card total-card">
          <div class="card-header">
            <div class="card-icon">👨‍👩‍👧‍👦</div>
            <h5 class="card-title">會員總數</h5>
          </div>
          <div class="card-body">
            <p class="display-number">{{ totalMembers.toLocaleString() }}</p>
            <div class="total-badge">累計會員</div>
          </div>
        </div>

        <div class="stat-card total-card">
          <div class="card-header">
            <div class="card-icon">🌐</div>
            <h5 class="card-title">網站總瀏覽量</h5>
          </div>
          <div class="card-body">
            <p class="display-number">{{ totalViews.toLocaleString() }}</p>
            <div class="total-badge">總瀏覽量</div>
          </div>
        </div>

        <div class="stat-card total-card">
          <div class="card-header">
            <div class="card-icon">📋</div>
            <h5 class="card-title">總訂單數</h5>
          </div>
          <div class="card-body">
            <p class="display-number">{{ totalOrders.toLocaleString() }}</p>
            <div class="total-badge">累計訂單</div>
          </div>
        </div>
      </div>

      <!-- 圖表區域 -->
      <div class="charts-container">
        <div class="chart-card">
          <div class="chart-header">
            <h6 class="chart-title">網站瀏覽量趨勢</h6>
          </div>
          <div class="chart-body">
            <canvas ref="viewsChart" height="140"></canvas>
          </div>
        </div>

        <div class="chart-card">
          <div class="chart-header">
            <h6 class="chart-title">會員註冊與訂單趨勢</h6>
          </div>
          <div class="chart-body">
            <canvas ref="signupsOrdersChart" height="140"></canvas>
          </div>
        </div>
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
/* 整體背景 */
.admin-dashboard {
  background: #ffffff;
  padding: 2rem;
  min-height: 100vh;
}

/* 頁面標題區域 */
.page-header {
  text-align: center;
  margin-bottom: 2.5rem;
  padding: 1.5rem 0;
  position: relative;
}

.page-header::before {
  content: '';
  position: absolute;
  bottom: 0;
  left: 50%;
  transform: translateX(-50%);
  width: 80px;
  height: 3px;
  background: linear-gradient(90deg, #3b82f6, #10b981, #f59e0b);
  border-radius: 2px;
}

.page-title {
  font-size: 2.5rem;
  font-weight: 700;
  color: #1e293b;
  margin: 0 0 0.5rem 0;
  letter-spacing: -0.025em;
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  background: linear-gradient(135deg, #1e293b 0%, #334155 50%, #475569 100%);
  -webkit-background-clip: text;
  background-clip: text;
  -webkit-text-fill-color: transparent;
  animation: titleFadeIn 1s ease-out;
}

.page-subtitle {
  font-size: 1rem;
  color: #64748b;
  margin: 0;
  font-weight: 500;
  letter-spacing: 0.025em;
  animation: subtitleFadeIn 1.2s ease-out;
}

@keyframes titleFadeIn {
  from {
    opacity: 0;
    transform: translateY(-20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes subtitleFadeIn {
  from {
    opacity: 0;
    transform: translateY(-10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

/* 主要網格佈局 */
.dashboard-grid {
  max-width: 1400px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  gap: 2rem;
}

/* 統計卡片容器 */
.stats-container {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1.5rem;
}

/* 統計卡片樣式 - 全新設計 */
.stat-card {
  background: linear-gradient(145deg, #ffffff 0%, #f8fafc 100%);
  border-radius: 16px;
  border: 2px solid #e2e8f0;
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  overflow: hidden;
  position: relative;
  height: 180px;
  display: flex;
  flex-direction: column;
}

.stat-card::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: linear-gradient(145deg, transparent 0%, rgba(255, 255, 255, 0.1) 50%, transparent 100%);
  opacity: 0;
  transition: opacity 0.3s ease;
}

.stat-card:hover {
  transform: translateY(-2px) scale(1.02);
  border-color: #cbd5e1;
  box-shadow: 
    0 10px 25px -5px rgba(0, 0, 0, 0.1),
    0 4px 6px -2px rgba(0, 0, 0, 0.05),
    inset 0 1px 0 rgba(255, 255, 255, 0.1);
}

.stat-card:hover::before {
  opacity: 1;
}

/* 卡片頭部 */
.card-header {
  display: flex;
  align-items: center;
  padding: 1.25rem 1.5rem 0.75rem;
  gap: 0.75rem;
  position: relative;
  flex-shrink: 0;
}

.card-icon {
  font-size: 1.6rem;
  width: 44px;
  height: 44px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 12px;
  transition: all 0.3s ease;
  position: relative;
  z-index: 2;
  flex-shrink: 0;
}

.card-icon::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  border-radius: 12px;
  opacity: 0.15;
  transition: all 0.3s ease;
}

.stat-card:hover .card-icon {
  transform: scale(1.1) rotate(5deg);
}

.card-title {
  font-size: 0.85rem;
  font-weight: 600;
  color: #475569;
  margin: 0;
  line-height: 1.3;
  flex: 1;
  letter-spacing: 0.025em;
}

/* 卡片內容 */
.card-body {
  flex: 1;
  padding: 0 1.5rem 1.25rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
  min-height: 0;
}

.display-number {
  font-size: 2rem;
  font-weight: 800;
  margin: 0.3rem 0 0.4rem;
  color: #1e293b;
  letter-spacing: -0.025em;
  line-height: 1.1;
  text-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
}

.change-indicator {
  font-size: 0.7rem;
  font-weight: 600;
  padding: 0.25rem 0.6rem;
  border-radius: 20px;
  display: inline-block;
  margin-top: 0.2rem;
  letter-spacing: 0.025em;
  white-space: nowrap;
  background: #e5e7eb;
  color: #6b7280;
  border: 1px solid #d1d5db;
}

.total-badge {
  font-size: 0.65rem;
  color: #6b7280;
  background: #e5e7eb;
  padding: 0.2rem 0.6rem;
  border-radius: 12px;
  margin-top: 0.2rem;
  border: 1px solid #d1d5db;
  font-weight: 600;
  letter-spacing: 0.025em;
  text-transform: uppercase;
  white-space: nowrap;
}

.text-success {
  background: #e5e7eb;
  color: #6b7280;
  box-shadow: none;
  border: 1px solid #d1d5db;
}

.text-danger {
  background: #e5e7eb;
  color: #6b7280;
  box-shadow: none;
  border: 1px solid #d1d5db;
}

/* 主題色彩 - 今日卡片 */
.today-card {
  background: linear-gradient(145deg, #ffffff 0%, #eff6ff 100%);
}

.today-card .card-icon {
  background: linear-gradient(145deg, #3b82f6, #2563eb);
  color: white;
}

.today-card .card-icon::before {
  background: radial-gradient(circle, rgba(59, 130, 246, 0.3) 0%, transparent 70%);
}

.today-card:hover {
  background: linear-gradient(145deg, #ffffff 0%, #dbeafe 100%);
}

/* 主題色彩 - 本週卡片 */
.week-card {
  background: linear-gradient(145deg, #ffffff 0%, #ecfdf5 100%);
}

.week-card .card-icon {
  background: linear-gradient(145deg, #10b981, #059669);
  color: white;
}

.week-card .card-icon::before {
  background: radial-gradient(circle, rgba(16, 185, 129, 0.3) 0%, transparent 70%);
}

.week-card:hover {
  background: linear-gradient(145deg, #ffffff 0%, #d1fae5 100%);
}

/* 主題色彩 - 總計卡片 */
.total-card {
  background: linear-gradient(145deg, #ffffff 0%, #fffbeb 100%);
}

.total-card .card-icon {
  background: linear-gradient(145deg, #f59e0b, #d97706);
  color: white;
}

.total-card .card-icon::before {
  background: radial-gradient(circle, rgba(245, 158, 11, 0.3) 0%, transparent 70%);
}

.total-card:hover {
  background: linear-gradient(145deg, #ffffff 0%, #fef3c7 100%);
}

/* 圖表容器 */
.charts-container {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 2rem;
}

/* 圖表卡片樣式 */
.chart-card {
  background: #ffffff;
  border-radius: 20px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
  border: none;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  overflow: hidden;
  position: relative;
  min-height: 220px;
}

.chart-card::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 4px;
  background: linear-gradient(90deg, #dc2626, #ef4444);
}

.chart-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 15px 35px rgba(0, 0, 0, 0.12);
}

.chart-header {
  padding: 1.25rem 1.5rem 0.75rem;
  border-bottom: 1px solid #f3f4f6;
}

.chart-title {
  font-size: 1rem;
  font-weight: 600;
  color: #374151;
  margin: 0;
}

.chart-body {
  padding: 1rem 1.5rem 1.25rem;
}

/* 響應式設計 */
@media (max-width: 1200px) {
  .stats-container {
    grid-template-columns: repeat(3, 1fr);
    gap: 1.25rem;
  }
  
  .charts-container {
    grid-template-columns: 1fr;
  }
}

@media (max-width: 968px) {
  .stats-container {
    grid-template-columns: repeat(2, 1fr);
    gap: 1.25rem;
  }
}

@media (max-width: 768px) {
  .admin-dashboard {
    padding: 1rem;
  }
  
  .page-header {
    margin-bottom: 2rem;
    padding: 1rem 0;
  }
  
  .page-title {
    font-size: 2rem;
  }
  
  .page-subtitle {
    font-size: 0.9rem;
  }
  
  .dashboard-grid {
    gap: 1.5rem;
  }
  
  .stats-container {
    grid-template-columns: 1fr;
    gap: 1rem;
  }
  
  .charts-container {
    grid-template-columns: 1fr;
    gap: 1rem;
  }
  
  .stat-card {
    height: 170px;
  }
  
  .card-header {
    padding: 1rem 1.25rem 0.5rem;
    gap: 0.5rem;
  }
  
  .display-number {
    font-size: 1.8rem;
  }
  
  .card-icon {
    width: 40px;
    height: 40px;
    font-size: 1.4rem;
  }
  
  .card-title {
    font-size: 0.8rem;
    line-height: 1.2;
  }
  
  .chart-card {
    min-height: 200px;
  }
}

@media (max-width: 480px) {
  .page-header {
    margin-bottom: 1.5rem;
    padding: 0.75rem 0;
  }
  
  .page-title {
    font-size: 1.75rem;
  }
  
  .page-subtitle {
    font-size: 0.85rem;
  }
  
  .page-header::before {
    width: 60px;
    height: 2px;
  }
  
  .stat-card {
    height: 160px;
  }
  
  .card-header {
    padding: 0.875rem 1rem 0.5rem;
    gap: 0.5rem;
  }
  
  .card-body {
    padding: 0 1rem 1rem;
  }
  
  .display-number {
    font-size: 1.6rem;
    margin: 0.2rem 0 0.3rem;
  }
  
  .card-icon {
    width: 36px;
    height: 36px;
    font-size: 1.3rem;
  }
  
  .card-title {
    font-size: 0.75rem;
    line-height: 1.2;
  }
  
  .change-indicator {
    font-size: 0.65rem;
    padding: 0.2rem 0.5rem;
    margin-top: 0.15rem;
  }
  
  .total-badge {
    font-size: 0.6rem;
    padding: 0.15rem 0.5rem;
    margin-top: 0.15rem;
  }
}

/* 載入動畫 */
.stat-card {
  animation: slideInUp 0.6s ease-out;
}

.chart-card {
  animation: fadeIn 0.8s ease-out;
}

.stat-card:nth-child(1) { animation-delay: 0.1s; }
.stat-card:nth-child(2) { animation-delay: 0.2s; }
.stat-card:nth-child(3) { animation-delay: 0.3s; }
.stat-card:nth-child(4) { animation-delay: 0.4s; }
.stat-card:nth-child(5) { animation-delay: 0.5s; }
.stat-card:nth-child(6) { animation-delay: 0.6s; }
.stat-card:nth-child(7) { animation-delay: 0.7s; }
.stat-card:nth-child(8) { animation-delay: 0.8s; }
.stat-card:nth-child(9) { animation-delay: 0.9s; }

@keyframes slideInUp {
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes fadeIn {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}
</style>


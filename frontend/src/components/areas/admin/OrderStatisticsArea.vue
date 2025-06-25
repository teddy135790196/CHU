<template>
  <div class="container py-4">
    <div class="row">
      <!-- 左邊：上下兩部分 -->
      <div class="col-12 col-md-4 mb-4">
        <div class="row mb-4">
          <div class="col-12">
            <h2 class="text-center mb-3">關鍵數據</h2>
            <div class="card mb-3">
              <div class="card-body text-center">
                <h5 class="card-title">總訂單數</h5>
                <p class="card-text display-6">{{ totalOrders }}</p>
              </div>
            </div>
            <div class="card mb-3">
              <div class="card-body text-center">
                <h5 class="card-title">總銷售額</h5>
                <p class="card-text display-6">NT$ {{ totalSales.toLocaleString() }}</p>
              </div>
            </div>
            <div class="card">
              <div class="card-body text-center">
                <h5 class="card-title">熱門付款方式</h5>
                <p class="card-text">{{ topPaymentMethod }}</p>
              </div>
            </div>
          </div>
        </div>
        <div class="row">
          <h2 class="text-center w-100">付款方式分佈</h2>
          <canvas id="pieChart" style="height: 350px;"></canvas>
        </div>
      </div>

      <!-- 右邊：上下兩個圖 -->
      <div class="col-12 col-md-8">
        <div class="row mb-4">
          <div class="d-flex justify-content-between align-items-center mb-3">
            <h2>訂單數量 & 銷售額趨勢</h2>
            <div class="btn-group" role="group">
              <button 
                type="button" 
                class="btn btn-sm"
                :class="timeRange === 'year' ? 'btn-primary' : 'btn-outline-primary'"
                @click="setTimeRange('year')">
                年
              </button>
              <button 
                type="button" 
                class="btn btn-sm"
                :class="timeRange === 'month' ? 'btn-primary' : 'btn-outline-primary'"
                @click="setTimeRange('month')">
                月
              </button>
              <button 
                type="button" 
                class="btn btn-sm"
                :class="timeRange === 'week' ? 'btn-primary' : 'btn-outline-primary'"
                @click="setTimeRange('week')">
                周
              </button>
              <button 
                type="button" 
                class="btn btn-sm"
                :class="timeRange === 'day' ? 'btn-primary' : 'btn-outline-primary'"
                @click="setTimeRange('day')">
                日
              </button>
            </div>
          </div>
          <canvas id="lineChartOrdersSales" style="height: 300px;"></canvas>
        </div>
        <div class="row">
          <div class="d-flex justify-content-between align-items-center mb-3">
            <h2>熱門書籍銷量排行</h2>
            <div class="btn-group" role="group">
              <button 
                type="button" 
                class="btn btn-sm"
                :class="bookStatsTimeRange === 'year' ? 'btn-success' : 'btn-outline-success'"
                @click="setBookStatsTimeRange('year')">
                年
              </button>
              <button 
                type="button" 
                class="btn btn-sm"
                :class="bookStatsTimeRange === 'month' ? 'btn-success' : 'btn-outline-success'"
                @click="setBookStatsTimeRange('month')">
                月
              </button>
              <button 
                type="button" 
                class="btn btn-sm"
                :class="bookStatsTimeRange === 'week' ? 'btn-success' : 'btn-outline-success'"
                @click="setBookStatsTimeRange('week')">
                周
              </button>
              <button 
                type="button" 
                class="btn btn-sm"
                :class="bookStatsTimeRange === 'day' ? 'btn-success' : 'btn-outline-success'"
                @click="setBookStatsTimeRange('day')">
                日
              </button>
            </div>
          </div>
          <canvas id="barChart" style="height: 350px;"></canvas>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { Chart, registerables } from 'chart.js'
Chart.register(...registerables)

export default {
  props: {
    orders: { type: Array, required: true },
    orderDetails: { type: Object, required: true },
  },
  data() {
    return {
      barChartInstance: null,
      pieChartInstance: null,
      lineChartOrdersSalesInstance: null,
      timeRange: 'day',
      bookStatsTimeRange: 'day',
    }
  },
  computed: {
    totalOrders() {
      return this.orders.length
    },
    totalSales() {
      return this.orders.reduce((acc, order) => {
        const details = this.orderDetails[order.order_id] || []
        return acc + details.reduce((sum, item) => sum + (item.price_at_order_time * item.quantity), 0)
      }, 0)
    },
    topPaymentMethod() {
      const countMap = {}
      this.orders.forEach(o => {
        countMap[o.payment_method] = (countMap[o.payment_method] || 0) + 1
      })
      const sorted = Object.entries(countMap).sort((a, b) => b[1] - a[1])
      return sorted.length ? `${sorted[0][0]} (${sorted[0][1]}筆訂單)` : '無資料'
    },
    
    // 根據時間範圍過濾的訂單
    filteredOrdersForBookStats() {
      return this.getFilteredOrdersByTimeRange(this.bookStatsTimeRange)
    },
    
    bookSalesData() {
      const salesMap = {}
      this.filteredOrdersForBookStats.forEach(order => {
        const details = this.orderDetails[order.order_id] || []
        details.forEach(item => {
          salesMap[item.book_name] = (salesMap[item.book_name] || 0) + item.quantity
        })
      })
      const sortedBooks = Object.entries(salesMap)
        .sort((a, b) => b[1] - a[1])
        .slice(0, 10)
      return {
        labels: sortedBooks.map(i => i[0]),
        datasets: [{
          label: '銷量',
          backgroundColor: '#42A5F5',
          data: sortedBooks.map(i => i[1]),
        }]
      }
    },
    
    paymentMethodData() {
      const countMap = {}
      this.orders.forEach(o => {
        countMap[o.payment_method] = (countMap[o.payment_method] || 0) + 1
      })
      return {
        labels: Object.keys(countMap),
        datasets: [{
          label: '訂單數',
          backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0', '#9966FF'],
          data: Object.values(countMap),
        }]
      }
    },
    
    orderAndSalesTrendData() {
      const dateCountMap = {}
      const dateSalesMap = {}
      const filteredOrders = this.getFilteredOrdersByTimeRange(this.timeRange)

      // 根據時間範圍聚合資料
      filteredOrders.forEach(o => {
        const timeKey = this.getTimeKey(new Date(o.created_at), this.timeRange)
        dateCountMap[timeKey] = (dateCountMap[timeKey] || 0) + 1

        const details = this.orderDetails[o.order_id] || []
        const total = details.reduce((sum, item) => sum + (item.price_at_order_time * item.quantity), 0)
        dateSalesMap[timeKey] = (dateSalesMap[timeKey] || 0) + total
      })

      // 生成時間標籤和資料
      const { labels, counts, totals } = this.generateTimeSeriesData(dateCountMap, dateSalesMap, this.timeRange)

      return {
        labels: labels,
        datasets: [
          {
            label: '訂單數',
            borderColor: '#1976D2',
            backgroundColor: 'rgba(25, 118, 210, 0.3)',
            fill: false,
            yAxisID: 'yOrders',
            data: counts,
            tension: 0.3,
          },
          {
            label: '銷售額',
            borderColor: '#388E3C',
            backgroundColor: 'rgba(56, 142, 60, 0.3)',
            fill: false,
            yAxisID: 'ySales',
            data: totals,
            tension: 0.3,
          }
        ]
      }
    }
  },
  mounted() {
    this.initCharts()
  },
  watch: {
    bookSalesData: {
      handler() { this.updateChart(this.barChartInstance, this.bookSalesData) },
      deep: true,
    },
    paymentMethodData: {
      handler() { this.updateChart(this.pieChartInstance, this.paymentMethodData) },
      deep: true,
    },
    orderAndSalesTrendData: {
      handler() { this.updateChart(this.lineChartOrdersSalesInstance, this.orderAndSalesTrendData) },
      deep: true,
    }
  },
  methods: {
    initCharts() {
      const pieCtx = document.getElementById('pieChart').getContext('2d')
      this.pieChartInstance = new Chart(pieCtx, {
        type: 'pie',
        data: this.paymentMethodData,
        options: {
          responsive: true,
          maintainAspectRatio: false,
        }
      })

      const lineCtx = document.getElementById('lineChartOrdersSales').getContext('2d')
      this.lineChartOrdersSalesInstance = new Chart(lineCtx, {
        type: 'line',
        data: this.orderAndSalesTrendData,
        options: {
          responsive: true,
          maintainAspectRatio: false,
          interaction: {
            mode: 'index',
            intersect: false,
          },
          stacked: false,
          scales: {
            x: {
              display: true,
              title: { display: true, text: '日期' }
            },
            // 訂單數軸（左）
            yOrders: {
              type: 'linear',
              display: true,
              position: 'left',
              title: { display: true, text: '訂單數' },
              beginAtZero: true,
            },
            // 銷售額軸（右）
            ySales: {
              type: 'linear',
              display: true,
              position: 'right',
              title: { display: true, text: '銷售額' },
              beginAtZero: true,
              grid: { drawOnChartArea: false },
              // 新增下面兩行：
              suggestedMax: this.getSuggestedMaxSales(), // 建議最大值
            }
          }
        }
      })



      const barCtx = document.getElementById('barChart').getContext('2d')
      this.barChartInstance = new Chart(barCtx, {
        type: 'bar',
        data: this.bookSalesData,
        options: {
          responsive: true,
          maintainAspectRatio: false,
          scales: {
            y: { beginAtZero: true }
          }
        }
      })
    },

    getSuggestedMaxSales() {
      // 取得最大銷售額
      const maxSales = Math.max(...this.orderAndSalesTrendData.datasets[1].data)
      // 例如上調10%，或往上補齊到最近的百位數
      const margin = maxSales * 0.1
      const suggested = maxSales + margin
      // 或者用下面的方法向上取整到最接近的1000：
      // const suggested = Math.ceil(maxSales / 1000) * 1000
      return suggested
    },

    updateChart(chart, newData) {
      if (!chart) return
      chart.data = newData
      chart.update()
    },

    setTimeRange(range) {
      this.timeRange = range
    },

    setBookStatsTimeRange(range) {
      this.bookStatsTimeRange = range
    },

    // 根據時間範圍過濾訂單
    getFilteredOrdersByTimeRange(range) {
      const now = new Date()
      const cutoffDate = new Date()

      switch (range) {
        case 'year': {
          cutoffDate.setFullYear(now.getFullYear() - 5)
          break
        }
        case 'month': {
          cutoffDate.setMonth(now.getMonth() - 12)
          break
        }
        case 'week': {
          cutoffDate.setDate(now.getDate() - (12 * 7))
          break
        }
        case 'day':
        default: {
          cutoffDate.setDate(now.getDate() - 30)
          break
        }
      }

      return this.orders.filter(order => {
        const orderDate = new Date(order.created_at)
        return orderDate >= cutoffDate
      })
    },

    // 根據時間範圍生成時間標籤
    getTimeKey(date, range) {
      const year = date.getFullYear()
      const month = String(date.getMonth() + 1).padStart(2, '0')
      const day = String(date.getDate()).padStart(2, '0')

      switch (range) {
        case 'year': {
          return `${year}`
        }
        case 'month': {
          return `${year}-${month}`
        }
        case 'week': {
          // 計算該日期是該年的第幾週
          const firstDayOfYear = new Date(year, 0, 1)
          const pastDaysOfYear = (date - firstDayOfYear) / 86400000
          const weekNumber = Math.ceil((pastDaysOfYear + firstDayOfYear.getDay() + 1) / 7)
          return `${year}-W${String(weekNumber).padStart(2, '0')}`
        }
        case 'day':
        default: {
          return `${year}-${month}-${day}`
        }
      }
    },

    // 生成時間序列資料
    generateTimeSeriesData(dateCountMap, dateSalesMap, range) {
      const labels = []
      const counts = []
      const totals = []
      
      let periods = 30 // 預設 30 天
      let stepFunction = null

      const now = new Date()

      switch (range) {
        case 'year': {
          periods = 5
          stepFunction = (i) => {
            const year = now.getFullYear() - (periods - 1 - i)
            return `${year}`
          }
          break
        }
        case 'month': {
          periods = 12
          stepFunction = (i) => {
            const date = new Date(now)
            date.setMonth(now.getMonth() - (periods - 1 - i))
            const year = date.getFullYear()
            const month = String(date.getMonth() + 1).padStart(2, '0')
            return `${year}-${month}`
          }
          break
        }
        case 'week': {
          periods = 12
          stepFunction = (i) => {
            const date = new Date(now)
            date.setDate(now.getDate() - (periods - 1 - i) * 7)
            return this.getTimeKey(date, 'week')
          }
          break
        }
        case 'day':
        default: {
          periods = 30
          stepFunction = (i) => {
            const date = new Date(now)
            date.setDate(now.getDate() - (periods - 1 - i))
            const year = date.getFullYear()
            const month = String(date.getMonth() + 1).padStart(2, '0')
            const day = String(date.getDate()).padStart(2, '0')
            return `${year}-${month}-${day}`
          }
          break
        }
      }

      for (let i = 0; i < periods; i++) {
        const key = stepFunction(i)
        labels.push(this.formatTimeLabel(key, range))
        counts.push(dateCountMap[key] || 0)
        totals.push(dateSalesMap[key] || 0)
      }

      return { labels, counts, totals }
    },

    // 格式化時間標籤顯示
    formatTimeLabel(key, range) {
      switch (range) {
        case 'year': {
          return key
        }
        case 'month': {
          return key
        }
        case 'week': {
          return key
        }
        case 'day':
        default: {
          // 將 YYYY-MM-DD 轉換為 MM/DD 格式
          const parts = key.split('-')
          return `${parts[1]}/${parts[2]}`
        }
      }
    }
  }
}
</script>

<style scoped>
h2 {
  margin-bottom: 15px;
}

canvas {
  width: 100% !important;
  max-height: 350px;
}

.card-title {
  font-weight: 700;
}

.btn-group {
  display: flex;
  width: 100%;
  gap: 2px;
}

.btn-group .btn {
  flex: 1;
  min-width: 45px;
  font-size: 0.875rem;
  border-radius: 0;
}

.btn-group .btn:first-child {
  border-top-left-radius: 0.375rem;
  border-bottom-left-radius: 0.375rem;
}

.btn-group .btn:last-child {
  border-top-right-radius: 0.375rem;
  border-bottom-right-radius: 0.375rem;
}

.btn-group .btn:focus {
  box-shadow: none;
}

.d-flex h2 {
  margin-bottom: 0;
  font-size: 1.5rem;
}

@media (max-width: 768px) {
  .d-flex {
    flex-direction: column;
    align-items: flex-start !important;
  }
  
  .d-flex h2 {
    margin-bottom: 10px;
  }
  
  .btn-group {
    width: 100%;
  }
  
  .btn-group .btn {
    flex: 1;
    min-width: 35px;
    font-size: 0.75rem;
    padding: 0.25rem 0.5rem;
  }
}
</style>


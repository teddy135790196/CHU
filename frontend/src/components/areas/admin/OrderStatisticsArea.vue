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
          <h2 class="text-center w-100">訂單數量 & 銷售額趨勢</h2>
          <canvas id="lineChartOrdersSales" style="height: 300px;"></canvas>
        </div>
        <div class="row">
          <h2 class="text-center w-100">熱門書籍銷量排行</h2>
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
    bookSalesData() {
      const salesMap = {}
      Object.values(this.orderDetails).flat().forEach(item => {
        salesMap[item.book_name] = (salesMap[item.book_name] || 0) + item.quantity
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

      this.orders.forEach(o => {
        const date = new Date(o.created_at)
        const y = date.getFullYear()
        const m = String(date.getMonth() + 1).padStart(2, '0')
        const d = String(date.getDate()).padStart(2, '0')
        const ymd = `${y}-${m}-${d}`

        dateCountMap[ymd] = (dateCountMap[ymd] || 0) + 1

        const details = this.orderDetails[o.order_id] || []
        const total = details.reduce((sum, item) => sum + (item.price_at_order_time * item.quantity), 0)
        dateSalesMap[ymd] = (dateSalesMap[ymd] || 0) + total
      })

      const dates = []
      const counts = []
      const totals = []
      for (let i = 29; i >= 0; i--) {
        const d = new Date()
        d.setDate(d.getDate() - i)
        const y = d.getFullYear()
        const m = String(d.getMonth() + 1).padStart(2, '0')
        const day = String(d.getDate()).padStart(2, '0')
        const key = `${y}-${m}-${day}`
        dates.push(key)
        counts.push(dateCountMap[key] || 0)
        totals.push(dateSalesMap[key] || 0)
      }

      return {
        labels: dates,
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
</style>

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
    registerLabels: { type: Array, required: true },
    registerData: { type: Array, required: true },
    newUserLabels: { type: Array, required: true },
    newUserData: { type: Array, required: true }
  },
  data() {
    return {
      registerChartInstance: null,
      newUserBarChartInstance: null
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
    registerLabels: 'renderCharts',
    registerData: 'renderCharts',
    newUserLabels: 'renderCharts',
    newUserData: 'renderCharts'
  },
  mounted() {
    this.renderCharts();
  },
  methods: {
    renderCharts() {
      this.renderRegisterChart();
      this.renderNewUserBarChart();
    },
    renderRegisterChart() {
      const ctx = this.$refs.registerChart.getContext('2d');
      if (this.registerChartInstance) this.registerChartInstance.destroy();

      this.registerChartInstance = new ChartJS(ctx, {
        type: 'line',
        data: {
          labels: this.registerLabels,  // 日期陣列
          datasets: [{
            label: '每日活躍會員數',
            data: this.registerData,   // 每日活躍會員數
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
            title: { display: true, text: '會員活躍度 (每日最後登入人數)' },
            legend: { display: false }
          },
          scales: {
            x: { title: { display: true, text: '日期' } },
            y: { beginAtZero: true, title: { display: true, text: '活躍會員數' } }
          }
        }
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
  border-right: 1px solid #dee2e6 !important;
}
</style>

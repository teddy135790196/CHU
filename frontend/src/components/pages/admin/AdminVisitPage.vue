<template>
  <div class="container my-4">
    <!-- 上方資料統計卡片 -->
    <div class="row mb-4 text-center">
      <div class="col-md-4" v-for="(value, key) in summary" :key="key">
        <div class="card shadow-sm" :class="{
          'border-info': key === 'today',
          'border-warning': key === 'lastThreeDays',
          'border-success': key === 'total'
        }">
          <div class="card-body">
            <h5 class="card-title">
              {{
                key === 'today'
                  ? '今日瀏覽量'
                  : key === 'lastThreeDays'
                    ? '近三日瀏覽量'
                    : '總瀏覽量'
              }}
            </h5>
            <p class="card-text display-6" :class="{
              'text-info': key === 'today',
              'text-warning': key === 'lastThreeDays',
              'text-success': key === 'total'
            }">
              {{ value }}
            </p>
          </div>
        </div>
      </div>
    </div>

    <!-- 圖表子元件 -->
    <VisitStatisticsArea :table-data="tableData" :date-labels="dateLabels" :current-taipei-hour="currentTaipeiHour"
      :today-has-data="todayHasData" />

    <!-- 資料表子元件 -->
    <VisitTableArea :table-data="tableData" :date-labels="dateLabels" :current-taipei-hour="currentTaipeiHour" />
  </div>
</template>

<script>
import VisitStatisticsArea from '@/components/areas/admin/VisitStatisticsArea.vue';
import VisitTableArea from '@/components/areas/admin/VisitTableArea.vue';

export default {
  name: 'AdminDashboard',
  components: { VisitStatisticsArea, VisitTableArea },
  data() {
    return {
      tableData: Array.from({ length: 24 }, (_, i) => ({
        hour: i,
        today: 0,
        yesterday: 0,
        dayBeforeYesterday: 0
      })),
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
      currentTaipeiHour: 23,
      todayHasData: false
    };
  },
  mounted() {
    this.fetchSummaryData();
  },
  methods: {
    getTaipeiDateStr(date) {
      return date
        .toLocaleDateString('zh-TW', {
          timeZone: 'Asia/Taipei',
          year: 'numeric',
          month: '2-digit',
          day: '2-digit'
        })
        .replace(/\//g, '-');
    },

    async fetchSummaryData() {
      try {
        const res = await this.$axios.get('/api/trackVisit/visits_summary');
        const data = res.data;

        const now = new Date();

        const taipeiHour = Number(
          now.toLocaleString('en-US', {
            timeZone: 'Asia/Taipei',
            hour12: false,
            hour: '2-digit'
          })
        );
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
          row.today = null;
          row.yesterday = null;
          row.dayBeforeYesterday = null;
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
          todaySum += row.today ?? 0;
          last3DaysSum += (row.today ?? 0) + (row.yesterday ?? 0) + (row.dayBeforeYesterday ?? 0);
        });

        this.summary.today = todaySum;
        this.summary.lastThreeDays = last3DaysSum;

        // 取得總瀏覽量
        const totalRes = await this.$axios.get('/api/trackVisit/visits_total');
        this.summary.total = totalRes.data.total || 0;

        this.todayHasData = this.tableData.some(row => row.today > 0);
      } catch (err) {
        console.error('讀取統計資料錯誤', err);
        alert('載入訪問統計資料失敗');
      }
    }
  }
};
</script>

<style scoped>
/* 保留父元件樣式 */
</style>

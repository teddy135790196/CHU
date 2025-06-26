<template>
  <div class="row g-3">
    <!-- 左邊 -->
    <div class="col-md-4 d-flex flex-column">
      <div class="p-3 bg-white rounded shadow-sm flex-grow-1 d-flex align-items-center">
        <canvas ref="newUserBarChart" class="w-100" style="max-height: 100%;"></canvas>
      </div>
    </div>

    <!-- 右邊 -->
    <div class="col-md-8 d-flex flex-column" style="gap: 1rem;">
      <div class="p-3 bg-white rounded shadow-sm flex-grow-1 d-flex align-items-center">
        <canvas ref="registerChart" class="w-100" style="max-height: 100%;"></canvas>
      </div>

      <div class="card d-flex flex-row justify-content-around p-3 shadow-sm">
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
// 從 chart.js 套件中導入所需的核心類別與元件
import {
  Chart as ChartJS,           // 主 Chart 類別，建立圖表實例時使用

  // 控制圖表邏輯的控制器（例如如何繪製、互動等）
  LineController,             // 折線圖控制器
  BarController,              // 長條圖 / 橫條圖控制器

  // 負責圖表中每個資料點的視覺元素（顯示的圖形）
  LineElement,                // 折線圖的線條元素
  BarElement,                 // 長條圖/橫條圖的條形元素
  PointElement,               // 折線圖中每個節點（點）的圖形元素

  // 圖表的座標軸類型
  LinearScale,                // 線性比例尺（數值軸，通常用於 y 軸）
  CategoryScale,              // 類別比例尺（分類軸，通常用於 x 軸）

  // 圖表功能性插件
  Title,                      // 圖表標題插件
  Tooltip,                    // 滑鼠懸停顯示提示資訊（tooltip）
  Legend                      // 顯示圖例（legend），用來說明資料集代表什麼
} from 'chart.js';
// import {
//   Chart as ChartJS,
//   LineController, BarController,
//   LineElement, BarElement,
//   PointElement,
//   LinearScale, CategoryScale,
//   Title, Tooltip, Legend
// } from 'chart.js';


// 註冊 Chart.js 所需的元件（v4 開始需顯式註冊）
ChartJS.register(
  LineController, BarController,
  LineElement, BarElement,
  PointElement,
  LinearScale, CategoryScale,
  Title, Tooltip, Legend
);

export default {
  name: 'MemberStatisticsArea',

  // 父層傳入的資料
  props: {
    todayNewUsers: { type: Number, required: true },      // 今日新增會員數
    verifiedUsers: { type: Number, required: true },      // 已驗證會員數
    totalUsers: { type: Number, required: true },         // 總會員數
    newUserLabels: { type: Array, required: true },       // 橫條圖的標籤（日期）
    newUserData: { type: Array, required: true }          // 橫條圖的資料（每天新增數）
  },

  data() {
    return {
      registerChartInstance: null,     // 折線圖 Chart 實例
      newUserBarChartInstance: null,   // 橫條圖 Chart 實例
      registerLabelsLocal: [],         // 折線圖的標籤（時間）
      registerDataLocal: []            // 折線圖的資料（活躍會員數）
    };
  },

  // 計算出要顯示在數據卡上的資訊
  computed: {
    cards() {
      return [
        {
          title: '今日新會員數',
          value: this.todayNewUsers,
          borderClass: 'border-info',
          textClass: 'text-info'
        },
        {
          title: '已驗證會員數',
          value: this.verifiedUsers,
          borderClass: 'border-success',
          textClass: 'text-success'
        },
        {
          title: '會員總數',
          value: this.totalUsers,
          borderClass: 'border-primary',
          textClass: 'text-primary'
        }
      ];
    }
  },

  // 監聽 props 變動，當數據更新時重新繪製圖表
  watch: {
    todayNewUsers: 'renderCharts',
    verifiedUsers: 'renderCharts',
    totalUsers: 'renderCharts',
    newUserLabels: 'renderCharts',
    newUserData: 'renderCharts'
  },

  // 組件載入完成時初始化：抓活躍會員資料、畫橫條圖
  mounted() {
    this.fetchActiveUserData();      // 折線圖活躍度資料從 API 抓
    this.renderNewUserBarChart();    // 橫條圖新會員資料從 props 抓
  },

  methods: {
    // 🔄 UTC 時間字串轉成台北時區，並格式化為 "YYYY-MM-DD HH:00"
    formatTaipeiDateTime(utcDateStr, hour) {
      const utcDate = new Date(utcDateStr);                  // 將 UTC 字串轉為 Date 物件
      const taipeiMs = utcDate.getTime() + 8 * 60 * 60 * 1000; // 加上 8 小時（台北時間）
      const taipeiDate = new Date(taipeiMs);

      taipeiDate.setHours(hour);  // 套用後端給的 hour（0~23）

      const y = taipeiDate.getFullYear();
      const m = String(taipeiDate.getMonth() + 1).padStart(2, '0');
      const d = String(taipeiDate.getDate()).padStart(2, '0');
      const h = String(taipeiDate.getHours()).padStart(2, '0');

      return `${y}-${m}-${d} ${h}:00`; // 格式化結果
    },

    // 🚀 從後端 API 抓取近 24 小時的活躍會員資料
    fetchActiveUserData() {
      this.$axios.get('/api/trackVisit/active_users_recent')
        .then(res => {
          const data = res.data;

          // 處理 label 與 data（時間 & 人數）
          this.registerLabelsLocal = data.map(item =>
            this.formatTaipeiDateTime(item.visit_date, item.hour)
          );
          this.registerDataLocal = data.map(item => item.active_user_count);

          this.renderRegisterChart(); // 重新繪製折線圖
        })
        .catch(err => {
          console.error('抓取活躍會員資料錯誤:', err);
        });
    },

    // 🔁 重新渲染兩張圖（由 watch 呼叫）
    renderCharts() {
      this.renderRegisterChart();
      this.renderNewUserBarChart();
    },

    // 📈 折線圖：顯示近 24 小時活躍會員數
    renderRegisterChart() {
      const ctx = this.$refs.registerChart.getContext('2d');
      if (this.registerChartInstance) this.registerChartInstance.destroy(); // 銷毀舊圖表

      // 🕛 零時標記插件：自定義插件，用來在圖表中每個「00:00」的時間點畫出一個灰色背景區塊
      const highlightMidnight = {
        id: 'highlightMidnight', // 插件 ID
        afterDatasetsDraw(chart) { // 圖表資料繪製完成後執行此函式
          const { ctx, chartArea: { left, right, top, bottom }, scales: { x } } = chart;

          // 找出所有 label 中以 "00:00" 結尾的 index（即每一天的午夜）
          const midnightIndexes = [];
          chart.data.labels.forEach((label, index) => {
            if (label.endsWith('00:00')) midnightIndexes.push(index);
          });

          ctx.save(); // 儲存畫布狀態
          ctx.fillStyle = 'rgba(200, 200, 200, 0.35)'; // 設定灰色半透明作為背景區塊顏色

          // 為每個「00:00」索引畫出灰色區塊（佔據兩個 x 軸刻度之間的區間）
          midnightIndexes.forEach(idx => {
            const xPos = x.getPixelForValue(idx); // 該 label 在 x 軸的位置
            let leftBound = left; // 預設左邊界
            let rightBound = right; // 預設右邊界

            // 若不是第一筆資料，則設定左邊界為上一個刻度與當前刻度之中點
            if (idx > 0) {
              const prevX = x.getPixelForValue(idx - 1);
              leftBound = (prevX + xPos) / 2;
            }

            // 若不是最後一筆資料，則設定右邊界為下一個刻度與當前刻度之中點
            if (idx < chart.data.labels.length - 1) {
              const nextX = x.getPixelForValue(idx + 1);
              rightBound = (xPos + nextX) / 2;
            }

            // 在該區間畫出灰色半透明背景
            ctx.fillRect(leftBound, top, rightBound - leftBound, bottom - top);
          });

          ctx.restore(); // 還原畫布狀態
        }
      };

      // 📊 建立折線圖：活躍會員數（近 24 小時）
      this.registerChartInstance = new ChartJS(ctx, {
        type: 'line', // 圖表類型為折線圖

        // ✅ 圖表的資料內容
        data: {
          labels: this.registerLabelsLocal, // X 軸標籤，格式為 "YYYY-MM-DD HH:00"
          datasets: [{
            label: '活躍會員數（近24小時）', // 圖表圖例說明
            data: this.registerDataLocal,   // Y 軸資料：每個時間點的活躍會員數

            // 圖表外觀樣式設定
            borderColor: 'rgba(54, 162, 235, 1)',      // 線條顏色（藍）
            backgroundColor: 'rgba(54, 162, 235, 0.2)',// 曲線下方填滿區域顏色（淡藍）
            tension: 0.3,      // 線條平滑度（0 是直線，1 是非常彎）
            fill: true,        // 是否填滿曲線下方區域
            pointRadius: 3     // 資料點的半徑大小
          }]
        },

        // ⚙️ 圖表的顯示與互動設定
        options: {
          responsive: true,             // 圖表會隨容器大小自動縮放
          maintainAspectRatio: false,  // 不強制維持寬高比，允許填滿容器

          // ✅ 圖表插件設定區塊：控制標題、圖例等附加元素
          plugins: {
            title: {
              display: true, // ✅ 是否顯示圖表標題
              text: '會員活躍度（近24小時）' // 📌 圖表上方顯示的文字標題
            },
            legend: {
              display: false // 🚫 不顯示圖例，因為只有一條線，不需要額外說明
            }
          },

          // ✅ 座標軸設定區塊：控制 X 軸和 Y 軸的標籤、刻度、格式
          scales: {
            x: {
              title: {
                display: true,
                text: '時間' // 🕓 X 軸標題，顯示為「時間」
              },
              ticks: {
                // 🛠 自定義 X 軸刻度顯示方式
                callback(value) {
                  const label = this.getLabelForValue(value);
                  // 若為整點午夜（00:00），則顯示「日期」
                  // 其他時間點只顯示「小時」
                  return label.endsWith('00:00')
                    ? label.slice(0, 10)     // 顯示 YYYY-MM-DD
                    : label.slice(11, 13);   // 顯示 HH（小時）
                }
              }
            },
            y: {
              beginAtZero: true, // Y 軸從 0 開始
              title: {
                display: true,
                text: '活躍會員數' // 📈 Y 軸標題，顯示為「活躍會員數」
              }
            }
          }
        },
        plugins: [highlightMidnight] // 使用自定義的零時標記插件
      });

    },

    // 📊 橫條圖：顯示近十五日的新增會員數
    renderNewUserBarChart() {
      // 取得 canvas 元素的繪圖上下文
      const ctx = this.$refs.newUserBarChart.getContext('2d');

      // 若先前已有圖表實例，先清除以避免重複繪製或記憶體洩漏
      if (this.newUserBarChartInstance) this.newUserBarChartInstance.destroy();

      // 使用 Chart.js 建立新圖表
      this.newUserBarChartInstance = new ChartJS(ctx, {
        type: 'bar', // 📌 指定圖表類型為「柱狀圖」

        // ✅ 圖表的資料內容
        data: {
          labels: this.newUserLabels,   // Y 軸的分類標籤（15 天的日期）
          datasets: [{
            label: '新增會員人數',       // 圖例名稱（不顯示，但仍需設定）
            data: this.newUserData,     // 每天對應的會員數量資料（X 軸數值）
            backgroundColor: '#198754'  // 每個 bar 的顏色（Bootstrap 成功綠）
          }]
        },

        // ⚙️ 圖表的顯示與互動設定
        options: {
          indexAxis: 'y', // 📌 設為 y → 將柱狀圖轉為「橫條圖」

          responsive: true,           // 圖表是否會隨容器大小自適應
          maintainAspectRatio: false, // 是否維持原始比例（設 false 方便彈性高度調整）

          plugins: {
            title: {
              display: true,
              text: '近十五日新會員人數' // 🏷️ 圖表上方的標題
            },
            legend: {
              display: false // ❌ 不顯示圖例，因為只有一組資料
            }
          },

          scales: {
            x: {
              beginAtZero: true, // X 軸（人數）從 0 開始
              title: {
                display: true,
                text: '人數' // X 軸標題
              }
            },
            y: {
              title: {
                display: true,
                text: '日期' // Y 軸標題，對應 15 天日期
              }
            }
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

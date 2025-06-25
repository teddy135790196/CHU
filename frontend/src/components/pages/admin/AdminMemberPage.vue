<template>
  <div class="container my-4">
    <MemberStatisticsArea :todayNewUsers="todayNewUsers" :verifiedUsers="summary.verifiedUsers"
      :totalUsers="summary.totalUsers" :registerLabels="registerLabels" :registerData="registerData"
      :newUserLabels="newUserLabels" :newUserData="newUserData" />

    <MemberTableArea :users="users" :currentSortKey="sortKey" :sortAsc="sortAsc" @sort="handleSort" />
  </div>
</template>

<script>
import MemberStatisticsArea from '@/components/areas/admin/MemberStatisticsArea.vue';
import MemberTableArea from '@/components/areas/admin/MemberTableArea.vue';

export default {
  name: 'MemberDashboard',
  components: {
    MemberStatisticsArea,
    MemberTableArea
  },
  data() {
    return {
      users: [],
      summary: {
        totalUsers: 0,
        verifiedUsers: 0,
        unverifiedUsers: 0,
        others: 0
      },
      todayNewUsers: 0,
      registerLabels: [],
      registerData: [],
      newUserLabels: [],
      newUserData: [],
      statusCount: { 正常: 0, 停權: 0, 封鎖: 0 },

      sortKey: 'id',
      sortAsc: true
    };
  },
  mounted() {
    this.fetchMemberData();
  },
  methods: {
    async fetchMemberData() {
      // 本地日期格式化函式：回傳 YYYY-MM-DD（台灣時區）
      function formatLocalDate(date) {
        const y = date.getFullYear();
        const m = (date.getMonth() + 1).toString().padStart(2, '0');
        const d = date.getDate().toString().padStart(2, '0');
        return `${y}-${m}-${d}`;
      }

      try {
        const res = await this.$axios.get('/api/adminMember');
        console.log('會員資料結構與內容：', res.data);

        this.users = res.data.users.map(u => ({
          id: u.user_id,
          name: u.nickname || u.username || '',
          tel: u.phone,
          email: u.email,
          address: [u.city, u.district, u.street, u.alley].filter(Boolean).join(' '),
          status: u.status || '正常',
          isEmailVerified: Boolean(u.isEmailVerified),
          registration_time: u.registration_time,
        }));

        this.summary.totalUsers = this.users.length;
        this.summary.verifiedUsers = this.users.filter(u => u.isEmailVerified).length;
        this.summary.unverifiedUsers = this.summary.totalUsers - this.summary.verifiedUsers;
        this.summary.others = this.users.filter(u => u.status === '停權' || u.status === '封鎖').length;

        // 取得今天日期（本地時間）
        const today = formatLocalDate(new Date());

        this.todayNewUsers = this.users.filter(u => {
          if (!u.registration_time) return false;
          // 用本地日期字串比較
          const regDate = u.registration_time.slice(0, 10);
          return regDate === today;
        }).length;

        // 取有日期的註冊時間，過濾空值，並排序
        const dates = this.users
          .map(u => u.registration_time?.slice(0, 10))
          .filter(date => !!date)
          .sort();

        // 如果沒有日期資料，避免錯誤
        if (dates.length === 0) {
          this.registerLabels = [];
          this.registerData = [];
          this.newUserLabels = [];
          this.newUserData = [];
          return;
        }

        // 只取最近15天（或從最早日期開始）
        const endDate = new Date(today);
        const startDate = new Date(endDate);
        startDate.setDate(endDate.getDate() - 14); // 包含今天，共15天

        // 產生連續日期陣列（本地時間格式）
        const completeDates = [];
        for (let d = new Date(startDate); d <= endDate; d.setDate(d.getDate() + 1)) {
          completeDates.push(formatLocalDate(d));
        }

        // 統計每天註冊數
        const regMap = {};
        this.users.forEach(u => {
          const date = u.registration_time?.slice(0, 10);
          if (date) {
            regMap[date] = (regMap[date] || 0) + 1;
          }
        });

        this.registerLabels = completeDates;
        this.registerData = completeDates.map(date => regMap[date] || 0);

        // 新增每日新會員資料，跟註冊數一樣
        this.newUserLabels = completeDates;
        this.newUserData = completeDates.map(date => regMap[date] || 0);

        // 狀態統計
        const statusCount = { 正常: 0, 停權: 0, 封鎖: 0 };
        this.users.forEach(u => {
          if (Object.prototype.hasOwnProperty.call(statusCount, u.status)) statusCount[u.status]++;
          else statusCount['正常']++;
        });
        this.statusCount = statusCount;

      } catch (err) {
        console.error('資料取得錯誤', err);
        alert('載入會員資料失敗');
      }
    },


    handleSort(key) {
      if (this.sortKey === key) {
        this.sortAsc = !this.sortAsc;
      } else {
        this.sortKey = key;
        this.sortAsc = true;
      }
    }
  }
};
</script>

<template>
  <div class="col-12 col-sm-10 offset-sm-1 col-md-8 offset-md-2 d-flex justify-content-center">
    <div class="content members d-flex flex-column">

      <!-- 個人資訊區 -->
      <div class="userInformation">
        <div class="row">
          <!-- 頭像 -->
          <div class="col-12 col-md-4 col-lg-3">
            <div class="userAvatar d-flex justify-content-center">
              <img :src="profileImg" @error="setDefaultImage" alt="用戶頭像">
            </div>
          </div>

          <!-- 暱稱 -->
          <div class="col-12 col-md-8 col-lg-9 d-flex justify-content-between align-items-start">
            <div class="userNick">
              <h3 class="mb-0">{{ nickname }}</h3>
            </div>
            <!-- <a class="bg-warning" href="./publisherArea.html">我要出版！</a> -->
          </div>
        </div>
      </div>

      <!-- 個人資料 - 手風琴 -->
      <div class="accordion accordion-custom" id="userAccordion">
        <div class="row">
          <div class="col-12 col-md-8 offset-md-4 col-lg-9 offset-lg-3">
            <div class="accordion-item">
              <h2 class="accordion-header fixed-header" id="headingSummary">
                <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse"
                  data-bs-target="#collapseSummary" aria-expanded="false" aria-controls="collapseSummary">
                  查看個人簡介
                </button>
              </h2>
              <div id="collapseSummary" class="accordion-collapse collapse" aria-labelledby="headingSummary"
                data-bs-parent="#userAccordion">
                <div class="accordion-body">
                  {{ summary }}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- 管理選單 -->
      <div class="menu">
        <div class="menu-item active" data-section="bookcase">收藏書櫃</div>
        <div class="menu-item" data-section="purchase">消費紀錄</div>
        <div class="menu-item" data-section="settings">個人設定</div>
      </div>

      <BookcaseArea />
      <PurchaseArea />
      <SettingsArea />

      <!-- 遮罩 -->
      <div class="overlay" id="overlay"></div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
import BookcaseArea from '@/components/areas/members/BookcaseArea.vue';
import PurchaseArea from '@/components/areas/members/PurchaseArea.vue';
import SettingsArea from '@/components/areas/members/SettingsArea.vue';

export default {
  name: "MembersPage",
  components: {
    BookcaseArea,
    PurchaseArea,
    SettingsArea,
  },
  data() {
    return {
      profileImg: 'profile.jpg',
      activeSection: 'wishlist',
      nickname: '',    // 使用者暱稱
      summary: '',     // 個人簡介
    };
  },
  mounted() {
    // 登入檢查（畫面還沒載入前就處理）
    const userId = localStorage.getItem('user_id');
    // const token = localStorage.getItem('token');

    if (!userId /*|| !token*/) {
      alert('請先登入會員才能查看此頁面！');
      this.$router.push('/login');
    }

    this.initializeMenu();
    this.bindMenuEvents();
    this.fetchUserData();
  },
  methods: {
    // 設定預設頭像
    setDefaultImage(event) {
      event.target.src = require('@/assets/images/userAvatar_default.jpg');
    },

    // 初始化選單顯示
    initializeMenu() {
      this.$nextTick(() => {
        const menuItems = this.$el.querySelectorAll('.menu-item');
        const sections = this.$el.querySelectorAll('.selectContent');
        menuItems[0]?.classList.add('active');
        sections.forEach((section, index) => {
          section.style.display = index === 0 ? 'block' : 'none';
        });
      });
    },

    // 綁定選單點擊事件
    bindMenuEvents() {
      this.$nextTick(() => {
        const menuItems = this.$el.querySelectorAll('.menu-item');
        const sections = this.$el.querySelectorAll('.selectContent');

        menuItems.forEach(item => {
          item.addEventListener('click', function () {
            menuItems.forEach(i => i.classList.remove('active'));
            this.classList.add('active');

            const sectionId = this.dataset.section;
            sections.forEach(section => {
              section.style.display = section.id === sectionId ? 'block' : 'none';
            });
          });
        });
      });
    },

    // 從後端取得會員暱稱與簡介
    async fetchUserData() {
      try {
        const user_id = localStorage.getItem('user_id'); // ← 若有登入資訊，改成從 localStorage 或 Vuex 拿

        if (!user_id) {
          console.log("尚未登入，user_id 為 null，略過資料請求。");
          return;
        }

        const res = await axios.get(`http://localhost:3000/api/memberSetting/${user_id}`);
        this.nickname = res.data.data.nickname || '（未命名）';
        this.summary = res.data.data.summary || '（尚未填寫個人簡介）';
      } catch (error) {
        console.error('取得會員資料失敗：', error);
        this.nickname = '（載入錯誤）';
        this.summary = '（無法載入個人簡介）';
      }
    }
  }
};
</script>



<style scoped>
/* ========================================
   基本全局樣式（適用於所有設備）
   寫好的CSS貼在這區
======================================== */



/* 上方－會員資訊 | 出版按鈕 */
.userInformation {
  align-items: center;

  /* 會員頭像 */
  .userAvatar img {
    /* margin-right: 30px; */
    border: 2px solid var(--quote-text-color);
    border-radius: 50%;

    min-width: 160px;
    width: 160px;
    height: 160px;
  }

  /* 會員暱稱 */
  .userNick {
    display: flex;
    align-items: center;
    height: 100%;

    /* 暱稱 */
    h3 {
      margin-left: -10px;
      font-family: '標楷體';
      font-size: 52px;
    }



  }

  /* 按鈕－出版專區 */
  a {
    display: block;
    padding: 5px;
    /* margin-left: auto; */
    border-radius: 5px;
    width: 120px;
    background-color: var(--second-color);

    /* transform: translate(-20px, -150px); */

    color: var(--second-text-color);
    text-align: center;
    text-decoration: none;
  }



}

/* 手風琴 - 個人資料 */
.accordion {
  margin-top: -40px !important;

  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  width: 100%;

  /* 整個手風琴區塊 */
  .accordion-item {
    margin-bottom: 30px;

    background-color: transparent;
    border: none;

    /* 調整手風琴位置對齊暱稱 */
    .accordion-button,
    .accordion-body {
      box-shadow: none;
      padding-left: 3px;
    }

    /* 手風琴點擊區塊 */
    .accordion-header .accordion-button {

      /* padding-top: 0; */
      padding-bottom: 0.5rem auto;
      background-color: transparent;

      font-family: '標楷體';
      font-size: 24px;

      /* 改變 hr 顏色 */
      &:not(.collapsed) {
        border-bottom: 2px solid var(--quote-text-color);
        /* 設定線條顏色 */
      }
    }

    /* 手風琴內容區塊 */
    .accordion-collapse {
      font-family: '王翰宗中仿宋';
      /* position: static; */
    }
  }

}

.accordion-custom {
  --dynamic-margin: 0px;
  margin-top: var(--dynamic-margin);

  /* 下拉式選單顏色 */
  .accordion-button {
    /* 這是未展開（預設） */
    color: var(--second-text-color);

    &:not(.collapsed) {
      /* 展開後顏色 */
      color: var(--second-text-color);
    }
  }

}


/* 下方－功能選單區塊 */
.menu {
  display: flex;
  gap: 30px;
  margin-bottom: 20px;

  /* 選項區塊 */
  .menu-item {
    flex: 1;
    padding: 10px 0;
    /* 防止選取 */
    user-select: none;
    /* 游標變手指 */
    cursor: pointer;

    font-family: '王翰宗中仿宋';
    font-size: 24px;
    text-align: center;
    row-gap: 10px;

    &:hover {
      border-top: 2px solid var(--main-color);

      font-size: 26px;
      color: var(--main-color);
    }
  }

  /* 當前選中 */
  /* 同時有 menu-item 與 active 的類別才套用該樣式 */
  .menu-item.active {
    border-top: 2px solid var(--main-color);

    font-family: '王翰宗中仿宋';
    font-size: 26px;
    font-weight: bold;
    color: var(--main-color);
  }
}

.menu-item.active {
  font-weight: bold;
  /* 或其他選中樣式 */
}




/* ========================================
   xxl: ≥ 1400px (大桌機、4K 螢幕)
   container 寬度: 1320px
======================================== */
@media (min-width: 1400px) {}




/* ========================================
   xl: 1200px ~ 1399px (一般桌機)
   container 寬度: 1140px
======================================== */
@media (min-width: 1200px) and (max-width: 1399px) {}




/* ========================================
   lg: 992px ~ 1199px (小型桌機、橫向大型平板)
   container 寬度: 960px
======================================== */
@media (min-width: 992px) and (max-width: 1199px) {

  /* 上方－會員資訊 | 出版按鈕 */
  .userInformation {
    padding-left: 24px;

    /* 圖片 */
    .userAvatar {
      margin-left: 0px;
      width: 140px;
      height: 140px;

      img {}
    }

    /* 會員暱稱 */
    .userNick {

      /* 暱稱 */
      h3 {
        margin-left: -30px;
        font-size: 50px;
      }
    }
  }

  /* 手風琴 - 個人資料 */
  .accordion {
    margin-top: -50px;
    margin-left: -30px;
    padding-left: 24px;
  }
}




/* ========================================
   md: 768px ~ 991px (橫向 iPad、小型平板)
   container 寬度: 720px
======================================== */
@media (min-width: 768px) and (max-width: 991px) {

  /* 上方－會員資訊 | 出版按鈕 */
  .userInformation {

    /* 圖片 */
    .userAvatar {
      margin-left: 20px;
      min-width: 140px;
      width: 140px;
      height: 140px;

      img {}
    }

    /* 會員暱稱 */
    .userNick {

      /* 暱稱 */
      h3 {
        margin-left: -60px;
        font-size: 42px;
      }
    }

    /* 按鈕－出版專區 */
    a {}

  }

  /* 手風琴 - 個人資料 */
  .accordion {
    margin-top: -40px;
    margin-left: -60px;

    /* 手風琴點擊區塊 */
    .accordion-header .accordion-button {
      font-size: 22px !important;
    }
  }
}




/* ========================================
   sm: 577px ~ 767px (大型手機、直向平板)
   container 寬度: 540px
======================================== */
@media (min-width: 577px) and (max-width: 767px) {

  /* 上方－會員資訊 | 出版按鈕 */
  .userInformation {

    /* 圖片 */
    .userAvatar img {
      margin-right: 0px;
      /* width: 140px; */
      /* height: 140px; */
    }

    /* 會員暱稱 */
    .userNick {
      /* 置中對齊用 */
      display: flex;
      justify-content: center;
      align-items: center;

      margin-top: 12px;
      width: 100%;

      /* 暱稱 */
      h3 {
        font-size: 40px;
      }
    }


    /* 按鈕－出版專區 */
    a {}



  }

  /* 手風琴 - 個人資料 */
  .accordion {

    /* 整個手風琴區塊 */
    .accordion-item {
      margin-top: 60px;
      margin-bottom: 20px;

      /* 手風琴點擊區塊 */
      .accordion-header .accordion-button {

        padding: 0.5rem 35%;
        font-size: 20px;
      }

      /* 手風琴內容區塊 */
      .accordion-body {
        padding-left: 30px;
        padding-right: 30px;
      }
    }

  }
}




/* ========================================
   xs: ≤ 576px (手機)
   container 寬度: 100% (fluid)
======================================== */
@media (max-width: 576px) {

  /* 上方－會員資訊 | 出版按鈕 */
  .userInformation {

    /* 圖片 */
    .userAvatar img {
      margin-right: 0px;
      /* width: 140px;
		height: 140px; */
    }

    /* 會員暱稱 */
    .userNick {
      display: flex;
      justify-content: center;
      align-items: center;

      width: 100%;
      margin-top: 10px;

      /* 暱稱 */
      h3 {
        font-size: 38px;
      }
    }

    /* 按鈕－出版專區 */
    a {}
  }

  /* 手風琴 - 個人資料 */
  .accordion {

    /* 整個手風琴區塊 */
    .accordion-item {
      margin-top: 50px;
      margin-bottom: 18px;

      /* 手風琴點擊區塊 */
      .accordion-header .accordion-button {
        padding: 0.5rem 34%;
        font-size: 20px;
      }

      /* 手風琴內容區塊 */
      .accordion-body {
        padding-left: 30px;
        padding-right: 30px;
      }
    }

  }

  /* 下方－功能選單區塊 */
  .menu {

    /* 選項區塊 */
    .menu-item {
      font-family: '王翰宗中仿宋';
      font-size: 18px;
      text-align: center;
      row-gap: 10px;

      &:hover {
        border-top: 2px solid var(--main-color);

        font-size: 20px;
        color: var(--main-color);
      }
    }

    /* 當前選中 */
    /* 同時有 menu-item 與 active 的類別才套用該樣式 */
    .menu-item.active {
      border-top: 2px solid var(--main-color);

      font-family: '王翰宗中仿宋';
      font-size: 20px;
      font-weight: bold;
      color: var(--main-color);
    }
  }
}
</style>
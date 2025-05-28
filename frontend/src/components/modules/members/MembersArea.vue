<template>
  <div class="row">
    <div class="col-12 col-sm-10 offset-sm-1 col-md-8 offset-md-2 d-flex justify-content-center">
      <div class="content members d-flex flex-column">

        <!-- 個人資訊區 -->
        <div class="userInformation">
          <div class="row">

            <!-- 頭像 -->
            <div class="col-12 col-md-3">
              <div class="userAvatar d-flex justify-content-center">
                <img :src="profileImg" @error="setDefaultImage" alt="用戶頭像">
              </div>
            </div>

            <!-- 暱稱 -->
            <div class="col-12 col-md-9 d-flex justify-content-between align-items-start">
              <div class="userNick">
                <h3 class="mb-0">長安不問</h3>
              </div>
              <!-- 出版按鈕 -->
              <a class="bg-warning" href="./publisherArea.html">我要出版！</a>
            </div>


          </div>
        </div>


        <!-- 個人資料 - 手風琴 -->
        <div class="accordion accordion-custom" id="userAccordion">
          <div class="row">

            <!-- 對齊用 -->
            <!-- <div class="col-3"></div> -->
            <!-- offset-3 會產生和 .col-3 一樣的空間，但語意是「向右偏移 3 欄」，這是更推薦的做法。 -->

            <!-- 個人簡介 -->
            <div class="col-12 col-md-9 offset-md-3">
              <div class="accordion-item">

                <!-- 固定位置的手風琴標題 -->
                <h2 class="accordion-header fixed-header" id="headingOne">
                  <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse"
                    data-bs-target="#collapseOne" aria-expanded="false" aria-controls="collapseOne">
                    查看個人簡介
                  </button>
                </h2>

                <!-- 展開內容區塊 -->
                <div id="collapseOne" class="accordion-collapse collapse" aria-labelledby="headingOne"
                  data-bs-parent="#userAccordion">
                  <div class="accordion-body">
                    天地玄黃，宇宙洪荒。日月盈昃，辰宿列張。寒來暑往，秋收冬藏。閏餘成歲，律召調陽。雲騰致雨，露結為霜。金生麗水，玉出崑岡。劍號巨闕，珠稱夜光。果珍李柰，菜重芥薑。海鹹河淡，鱗潛羽翔。龍師火帝，鳥官人皇。始制文字，乃服衣裳。推位讓國，有虞陶唐。弔民伐罪，周發殷湯。坐朝問道，垂拱平章。愛育黎首，臣伏戎羌。遐邇一體，率賓歸王。鳴鳳在樹，白駒食場。化被草木，賴及萬方。蓋此身髮，四大五常。恭惟鞠養，豈敢毀傷。女慕貞絜，男效才良。知過必改，得能莫忘。罔談彼短，靡恃己長。信使可覆，器欲難量。墨悲絲淬，詩讚羔羊。
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

        <BookcaseSection></BookcaseSection>
        <PurchaseSection></PurchaseSection>
        <SettingsSection></SettingsSection>

        <!-- 遮罩 -->
        <div class="overlay" id="overlay"></div>
      </div>
    </div>
  </div>
</template>

<script>
import BookcaseSection from '@/components/modules/members/BookcaseSection.vue';
import PurchaseSection from '@/components/modules/members/PurchaseSection.vue';
import SettingsSection from '@/components/modules/members/SettingsSection.vue';

export default {
  name: "MembersArea",
  components: {
    BookcaseSection,
    PurchaseSection,
    SettingsSection,
  },
  data() {
    return {
      profileImg: 'profile.jpg',
      // 控制選單狀態
      activeSection: 'wishlist',

      // 控制各區塊的編輯狀態
      editingSections: {
        infoSection: false,
        contactSection: false,
        accountSection: false,
        passwordSection: false
      },

      // 存儲動態 margin
      dynamicMargin: 0
    };
  },
  beforeUnmount() {
    window.removeEventListener('resize', this.updateAccordionMargin);
  },
  mounted() {
    this.updateAccordionMargin();
    this.initializeMenu();
    this.bindMenuEvents();
    window.addEventListener('resize', this.updateAccordionMargin);
  },
  methods: {
    setActiveSection(section) {
      this.activeSection = section;
    },
    // 圖片丟失使用預設圖片
    setDefaultImage(event) {
      event.target.src = require('@/assets/images/userAvatar_default.jpg');
    },
    updateAccordionMargin() {
      this.$nextTick(() => {
        const rowElement = this.$el.querySelector('.userInformation .row');
        const accordion = this.$el.querySelector('.accordion-custom');
        if (!rowElement || !accordion) return;
        const rowHeight = rowElement.offsetHeight;
        this.dynamicMargin = window.innerWidth >= 768 ? Math.max(-rowHeight / 3, -40) : 0;
        accordion.style.setProperty('--dynamic-margin', `${this.dynamicMargin}px`);
      });
    },
    toggleEdit(sectionKey) {
      this.editingSections[sectionKey] = !this.editingSections[sectionKey];
    },

    // ✅ 選單初始化
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

    // ✅ 綁定選單點擊事件
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
    }
  }
};

</script>


<style scoped>

/* ========================================
   基本全局樣式（適用於所有設備）
   寫好的CSS貼在這區
======================================== */

.accordion-custom {
  --dynamic-margin: 0px;
  margin-top: var(--dynamic-margin);
}

.menu-item.active {
  font-weight: bold;
  /* 或其他選中樣式 */
}




/* ========================================
   xxl: ≥ 1400px (大桌機、4K 螢幕)
   container 寬度: 1320px
======================================== */
@media (min-width: 1400px) {
   
}




/* ========================================
   xl: 1200px ~ 1399px (一般桌機)
   container 寬度: 1140px
======================================== */
@media (min-width: 1200px) and (max-width: 1399px) {
   
}




/* ========================================
   lg: 992px ~ 1199px (小型桌機、橫向大型平板)
   container 寬度: 960px
======================================== */
@media (min-width: 992px) and (max-width: 1199px) {
   
}




/* ========================================
   md: 768px ~ 991px (橫向 iPad、小型平板)
   container 寬度: 720px
======================================== */
@media (min-width: 768px) and (max-width: 991px) {
   
}




/* ========================================
   sm: 577px ~ 767px (大型手機、直向平板)
   container 寬度: 540px
======================================== */
@media (min-width: 577px) and (max-width: 767px) {
   
}




/* ========================================
   xs: ≤ 576px (手機)
   container 寬度: 100% (fluid)
======================================== */
@media (max-width: 576px) {
   
}
</style>
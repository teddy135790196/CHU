
<template>
  <div>
    <!-- 個人資訊、手風琴等 -->
    <div class="accordion accordion-custom" id="userAccordion">
      <div class="row">
        <div class="col-12 col-md-9 offset-md-3">
          <div class="accordion-item">
            <h2 class="accordion-header fixed-header" id="headingOne">
              <button class="accordion-button collapsed" type="button"
                      data-bs-toggle="collapse" data-bs-target="#collapseOne"
                      aria-expanded="false" aria-controls="collapseOne">
                查看個人簡介
              </button>
            </h2>
            <div id="collapseOne" class="accordion-collapse collapse"
                 aria-labelledby="headingOne" data-bs-parent="#userAccordion">
              <div class="accordion-body">
                天地玄黃……
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- 管理選單 -->
    <div class="menu">
      <div
        v-for="section in ['wishlist', 'purchase', 'settings']"
        :key="section"
        :class="['menu-item', { active: activeSection === section }]"
        @click="setActiveSection(section)"
        :data-section="section"
      >
        {{ section === 'wishlist' ? '收藏書櫃' : section === 'purchase' ? '消費紀錄' : '個人設定' }}
      </div>
    </div>

    <!-- 對應內容顯示 -->
    <div v-show="activeSection === 'wishlist'" class="selectContent" id="wishlist">...</div>
    <div v-show="activeSection === 'purchase'" class="selectContent" id="purchase">...</div>
    <div v-show="activeSection === 'settings'" class="selectContent" id="settings">
      <button @click="toggleEdit('infoSection')">
        {{ editingSections.infoSection ? '完成修改' : '編輯資料' }}
      </button>
      <div v-if="editingSections.infoSection">
        <!-- 編輯輸入 -->
      </div>
      <div v-else>
        <!-- 顯示資料 -->
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
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
  mounted() {
    this.updateAccordionMargin();
    window.addEventListener('resize', this.updateAccordionMargin);
  },
  beforeUnmount() {
    window.removeEventListener('resize', this.updateAccordionMargin);
  },
  methods: {
    // 切換選單
    setActiveSection(section) {
      this.activeSection = section;
    },

    // 更新手風琴的 margin
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

    // 切換編輯狀態
    toggleEdit(sectionKey) {
      this.editingSections[sectionKey] = !this.editingSections[sectionKey];
    }
  }
};
</script>


<style scoped>
.accordion-custom {
  --dynamic-margin: 0px;
  margin-top: var(--dynamic-margin);
}
.menu-item.active {
  font-weight: bold;
  /* 或其他選中樣式 */
}
</style>
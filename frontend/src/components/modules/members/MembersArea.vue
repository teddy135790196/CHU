<template>
  <div class="row">
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
                <h3 class="mb-0">長安不問與小僧無名與東流</h3>
              </div>
              <!-- 出版按鈕 -->
              <!-- <a class="bg-warning" href="./publisherArea.html">我要出版！</a> -->
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
            <div class="col-12 col-md-8 offset-md-4 col-lg-9 offset-lg-3">
              <div class="accordion-item">

                <!-- 固定位置的手風琴標題 -->
                <h2 class="accordion-header fixed-header" id="headingSummary">
                  <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse"
                    data-bs-target="#collapseSummary" aria-expanded="false" aria-controls="collapseSummary">
                    查看個人簡介
                  </button>
                </h2>

                <!-- 展開內容區塊 -->
                <div id="collapseSummary" class="accordion-collapse collapse" aria-labelledby="headingSummary"
                  data-bs-parent="#userAccordion">
                  <!-- 限制120字 -->
                  <div class="accordion-body">
                    天地玄黃，宇宙洪荒。日月盈昃，辰宿列張。寒來暑往，秋收冬藏。閏餘成歲，律召調陽。雲騰致雨，露結為霜。金生麗水，玉出崑岡。劍號巨闕，珠稱夜光。果珍李柰，菜重芥薑。海鹹河淡，鱗潛羽翔。龍師火帝，鳥官人皇。始制文字，乃服衣裳。推位讓國，有虞陶唐。
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
      // editingSections: {
      //   infoSection: false,
      //   contactSection: false,
      //   accountSection: false,
      //   passwordSection: false
      // },

      // 存儲動態 margin
      // dynamicMargin: 0
    };
  },
  // beforeUnmount() {
    // window.removeEventListener('resize', this.updateAccordionMargin);
  // },
  mounted() {
    this.initializeMenu();
    this.bindMenuEvents();

    // window.addEventListener('resize', this.updateAccordionMargin);

    // this.updateAccordionMargin();
  },
  methods: {
    // setActiveSection(section) {
    //   this.activeSection = section;
    // },

    // 圖片丟失使用預設圖片
    setDefaultImage(event) {
      event.target.src = require('@/assets/images/userAvatar_default.jpg');
    },

    // 視窗變動時重新計算個人簡介位置
    // updateAccordionMargin() {
    //   this.$nextTick(() => {
    //     const rowElement = this.$el.querySelector('.userInformation .row');
    //     const accordion = this.$el.querySelector('.accordion-custom');
    //     if (!rowElement || !accordion) return;
    //     const rowHeight = rowElement.offsetHeight;
    //     this.dynamicMargin = window.innerWidth >= 768 ? Math.max(-rowHeight / 3, -40) : 0;
    //     accordion.style.setProperty('--dynamic-margin', `${this.dynamicMargin}px`);
    //   });
    // },
    // toggleEdit(sectionKey) {
    //   this.editingSections[sectionKey] = !this.editingSections[sectionKey];
    // },

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
			font-family: '王翰宗粗鋼體';
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

			font-family: '王翰宗顏楷體';
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

		font-family: '王翰宗粗鋼體';
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
/* 上方－會員資訊 | 出版按鈕 */
.userInformation {
  padding-left: 24px;

	/* 圖片 */
    .userAvatar {
        margin-left: 0px;
        width: 140px;
        height: 140px;
      img {
        
      }
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
      img {
        
      }
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
    a {
    }

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
	a {
	}



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
	a {
	}
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
		font-family: '王翰宗粗鋼體';
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
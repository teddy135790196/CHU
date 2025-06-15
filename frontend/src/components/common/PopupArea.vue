<template>
  <!-- 彈出視窗，重開網頁才會再次彈出 -->
  <div class="popup" v-show="showPopup">
    <!-- popupBackground為了讓背景半透明，也為了能夠點擊空白處關閉視窗 -->
    <div class="popupBackground" @click="showPopupFunction"></div>
    <!-- 可以嘗試用阻止冒泡方式改寫，就不用上面一行。不過這樣又遇到X在popupBody裡面的問題 -->
    <div class="popupBody">
      <div class="popupClose" @click="showPopupFunction">X</div>
      <h2 class="popupHeader">重要說明</h2>
      <p class="popupMain">
        本網頁一切內容皆為虛購，與現實的人、事、物皆無關連。
        實際上沒有這間書店；網頁裡呈現的商品也只為展示，一切皆為虛構。
      </p>
      <div class="popupFooter">棲遲書店</div>
    </div>
  </div>
</template>

<script>
export default {
  name: "MyPopup.vue",

  data() {
    return {
      showPopup: true, //是否顯示彈出視窗
    };
  },

  created() {
    // 在組件創建時，從 sessionStorage 中讀取數據
    const savedShowPopup = sessionStorage.getItem("showPopup");
    if (savedShowPopup) {
      this.showPopup = parseInt(savedShowPopup);
    }
  },
  methods: {
    showPopupFunction() {
      this.showPopup = !this.showPopup;
      // 每當數據改變時，將其保存到 sessionStorage
      sessionStorage.setItem("showPopup", this.showPopup);
    },
  },
};
</script>

<style scoped>
/* 彈出視窗 */
.popup {
  position: fixed;
  z-index: 20;
}
.popupBackground {
  background-color: rgba(0, 0, 0, 0.5);
  width: 100vw;
  height: 100vh;
}
.popupBody {
  background-color: white;
  width: 80%;
  position: fixed;
  top: 40%;
  left: 10%;
  z-index: 11;
}
.popupClose {
  position: absolute;
  right: 0px;
}
.popupClose:hover,
.popupBackground:hover {
  cursor: pointer;
}
</style>

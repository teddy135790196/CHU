<!-- 複製用標準模板
<AccessAlert
  v-if="showAccessAlert"
  title="'訊息標題'"
  message="'訊息文字'"
  button-text="按鈕文字"
  :showButton="true"
  :closeOnOverlay="false"
  @action="goToPublisherApply" /> 

components: {
  AccessAlert,
},
data() {
  return {
    showAccessAlert: true, // 一進來就顯示彈窗
  };
},
methods: {
  // 關閉浮窗
  goToPublisherApply() { this.showAccessAlert = false; }
}
-->


<template>
  <div class="overlay" @click="handleOverlayClick">
    <div class="modal-box" @click.stop>
      <h3 class="title">{{ title }}</h3>
      <p class="message" v-html="message"></p>
      <button
        v-if="showButton"
        @click="$emit('action')"
        class="action-btn"
      >
        {{ buttonText }}
      </button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'AccessAlert',
  props: {
    title: { type: String, required: true },
    message: { type: String, required: true },
    showButton: { type: Boolean, default: false },
    buttonText: { type: String },
    closeOnOverlay: { type: Boolean, default: true } // 加入控制開關
  },
  methods: {
    handleOverlayClick() {
      if (this.closeOnOverlay) {
        this.$emit('action');
      }
    }
  }
}
</script>

<style scoped>

/* 背景遮罩 */
.overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: var(--back-color-blackTransluc); /* 半透明黑色遮罩 */
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000; /* 蓋住其他內容 */
}

/* 訊息框 */
.modal-box {
  background: var(--back-color-white);
  padding: 30px;
  border-radius: 8px;
  text-align: center;
  box-shadow: 0 8px 16px var(--back-color-blackTransluc);
  max-width: 400px;
  width: 80%;
}

/* 顯示標題 */
.title {
  font-size: 28px;
  font-weight: bold;
  color: var(--second-color);
  margin-bottom: 16px;
}

/* 顯示訊息 */
.message {
  font-size: 16px;
  color: var(--second-text-color);
  margin-bottom: 24px;
}

/* 按鈕 */
.action-btn {
  padding: 10px 20px;
  background-color: var(--main-color);
  border: none;
  color: var(--main-text-color);
  font-weight: bold;
  border-radius: 5px;
  cursor: pointer;
}
</style>
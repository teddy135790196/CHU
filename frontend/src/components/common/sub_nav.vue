<template>
  <div>
    <!-- <img src="/images/loadGo.svg" width="150px" /> -->
    <div id="pubBC">
      <h4 v-on:click="showPub" class="cat">
        出版類型
        <i v-if="isVisible == true" class="fa-solid fa-chevron-down"></i>
        <i v-else class="fa-solid fa-chevron-up"></i>
      </h4>

      <ul>
        <li
          v-for="pub in pubType"
          :key="pub.name"
          v-show="isVisible"
          class="subA"
        >
          <a href="">{{ pub.name }}</a>
        </li>
      </ul>
    </div>

    <hr />
    <h3>分類</h3>
    <div id="bookSC">
      <!-- 書分類大標題 -->
      <ul class="nav flex-column" v-for="item in bookItems" v-bind:key="item">
        <li
          class="cat"
          v-bind:class="{ select: BkBigCat === item }"
          v-on:click="BkBigCat = item"
        >
          {{ item }}
          <!-- <i class="fa-solid fa-plus"></i> -->
          <!-- <i class="fa-solid fa-minus"></i> -->
          <!-- 切換圖示 -->
          <i
            :class="['fa-solid', BkBigCat === item ? 'fa-minus' : 'fa-plus']"
          ></i>
        </li>
        <!-- 書的分類細項 -->
        <ul v-show="BkBigCat === item">
          <li
            v-for="bk in BkSubCat"
            v-bind:key="bk.name"
            v-show="bk.type == BkBigCat"
          >
            <!-- <a @click="sub=bk.name" class="subA">{{ bk.name }}</a> -->
            <router-link
              :to="`/${encodeURIComponent(bk.name)}`"
              class="subA"
              >{{ bk.name }}</router-link
            >
          </li>
        </ul>
      </ul>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      // 出版選項
      pubType: [
        { name: "書籍" },
        { name: "漫畫" },
        { name: "雜誌" },
        { name: "繪本" },
        { name: "其他出版物" },
      ],
      isVisible: false, // 預設不顯示
      // 大分類項目
      BkBigCat: "",
      // 大分類選項
      bookItems: [
        "文學類",
        "科學類",
        "社會與科學類",
        "歷史與地理",
        "藝術與設計類",
        "生活與休閒類",
        "商業與管理類",
        "宗教與哲學類",
      ],
      // 小分類選項
      BkSubCat: [
        { name: "小說", type: "文學類" },
        { name: "散文與詩詞", type: "文學類" },
        { name: "自然科學", type: "科學類" },
        { name: "科普讀物", type: "科學類" },
        { name: "心理與教育", type: "社會與科學類" },
        { name: "政治與經濟", type: "社會與科學類" },
        { name: "世界與區域歷史", type: "歷史與地理" },
        { name: "地理與文化探索", type: "歷史與地理" },
        { name: "美術與攝影", type: "藝術與設計類" },
        { name: "設計與建築", type: "藝術與設計類" },
        { name: "飲食與健康", type: "生活與休閒類" },
        { name: "旅遊與手作", type: "生活與休閒類" },
        { name: "行銷與創業", type: "商業與管理類" },
        { name: "財經與職場技能", type: "商業與管理類" },
        { name: "哲學與思辨", type: "宗教與哲學類" },
        { name: "宗教信仰與靈修", type: "宗教與哲學類" },
      ],
    };
  },
  methods: {
    showPub() {
      this.isVisible = !this.isVisible; //=!為相反  是跟之前的顯示為相反的意思
    },
  },
};
</script>
<style scoped>
/* nav的css */
*{
  text-decoration: none;
  list-style: none;
}
/* 左側分類 */
.cat:hover {
  background-color: hsla(36, 51%, 50%, 0.3);
  border-radius: 20px;
}
.cat {
  padding: 10px;
  margin: 3px 0;
  transition: all 0.7s;
}
#bookSC li {
  font-size: 20px;
}
#bookSC a {
  font-size: 18px;
}
/* 改icon大小 */
.fa-solid {
  scale: 0.7;
  color: hsl(36, 50.7%, 50%);
}
/* 細項的li整體往左移 */
.subA {
  display: block;
  margin-left: 10px;
  padding: 10px 0;
  font-size: 20px;
}
.subA,
.subA a {
  color: hsl(353, 51%, 33%);
  transition: all 0.55s;
}
.subA:hover,
.subA a:hover {
  color: hsl(36, 50.7%, 50%);
}

/* 子標籤隱藏 */
#litShow {
  display: none;
}
</style>

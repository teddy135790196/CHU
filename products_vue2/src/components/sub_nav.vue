<template>
    <div>
        <img src="/images/loadGo.svg" width="150px"/>
        <div id="pubBC">
            <h4 v-on:click="showPub"
             class="cat">
                出版類型
                <i v-if="isVisible == true" 
                class="fa-solid fa-chevron-down"></i>
                <i v-else class="fa-solid fa-chevron-up"></i>
            </h4>

            <ul>
                <li v-for="pub in pubType" :key="pub.name"
                 v-show="isVisible" class="subA">
                    <a href="">{{ pub.name }}</a>
                </li>
            </ul>
        </div>

        <hr />
        <h3>分類</h3>
        <div id="bookSC">
            <!-- 書分類大標題 -->
            <ul class="nav flex-column" 
            v-for="item in bookItems"
             v-bind:key="item">
                <li class="cat" 
                v-bind:class="{ select: BkBigCat === item }"
                 v-on:click="BkBigCat = item">
                    {{ item }}
                    <!-- <i class="fa-solid fa-plus"></i> -->
                    <!-- <i class="fa-solid fa-minus"></i> -->
                    <!-- 切換圖示 -->
                    <i :class="['fa-solid', BkBigCat === item ? 'fa-minus' : 'fa-plus']"></i>
                </li>
                <!-- 書的分類細項 -->
                <ul v-show="BkBigCat === item">
                    <li v-for="bk in BkSubCat" v-bind:key="bk.name" v-show="bk.type == BkBigCat">
                        <!-- <a @click="sub=bk.name" class="subA">{{ bk.name }}</a> -->
                        <router-link :to="`/sub/${encodeURIComponent(bk.name)}`" class="subA">{{ bk.name }}</router-link>
                    </li>
                </ul>
            </ul>
        </div>
        <subBlock :category="sub"/>
    </div>
</template>
<script>

// 匯入block的cat
import subBlock from '@/components/sub_block.vue'


export default {
    components:{subBlock},
    data() {
        return {
            sub:'',
            // 出版選項
            pubType: [
                { name: "書籍", url: "#" },
                { name: "漫畫", url: "#" },
                { name: "雜誌", url: "#" },
                { name: "繪本", url: "#" },
                { name: "其他出版物", url: "#" },
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
                { name: "小說", type: "文學類", url: "#"},
                { name: "散文與詩詞", type: "文學類", url: "" },
                { name: "自然科學", type: "科學類", url: "" },
                { name: "科普讀物", type: "科學類", url: "" },
                { name: "心理與經濟", type: "社會與科學類", url: "#" },
                { name: "政治與經濟", type: "社會與科學類", url: "#" },
                { name: "世界與區域歷史", type: "歷史與地理", url: "#" },
                { name: "地理與文化探索", type: "歷史與地理", url: "#" },
                { name: "美術與攝影", type: "藝術與設計類", url: "#" },
                { name: "設計與建築", type: "藝術與設計類", url: "" },
                { name: "飲食與健康", type: "生活與休閒類", url: "" },
                { name: "旅遊與手作", type: "生活與休閒類", url: "" },
                { name: "行銷與創業", type: "商業與管理類", url: "" },
                { name: "財經與職場技能", type: "商業與管理類", url: "" },
                { name: "哲學與思辯", type: "宗教與哲學類", url: "" },
                { name: "宗教信仰與靈修", type: "宗教與哲學類", url: "" },
            ]
        };},
    methods: {
        showPub() {
            this.isVisible = !this.isVisible; //=!為相反  是跟之前的顯示為相反的意思
        }
    }
};

</script>

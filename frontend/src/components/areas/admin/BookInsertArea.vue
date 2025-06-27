<template>
    <div>
        <div class="card text-center">
            <div class="card-body">
                <form v-on:submit.prevent="inserToProduct">
                    <div class="rowl">
                        <div>
                            <img :src="Book.img">
                            <p>封面預覽</p>
                        </div>
                        <div class="right-text">
                            <span class="red-color">*</span>書名 <input v-model="Book.name" placeholder="書名" required>
                            <span class="red-color">*</span>書號: <input v-model="Book.ISBN" placeholder="例:999-000-012345-6" required>
                            <p>封面連結:<input v-model="Book.img" placeholder="請輸入網址"></p>
                            <p>
                            <span class="red-color">*</span>作者: <input v-model="Book.author" placeholder="" required>
                              系列:<BookSelectOther v-model="Book.series" :options="typeSet('series')"
                                    placeholderStr="請輸入系列名" />
                            </p>
                            <p><span class="red-color">*</span> 價格:<input v-model="Book.price" placeholder="請輸入數字" required>
                               <span class="red-color">*</span> 庫存:<input v-model="Book.stock" placeholder="請輸入數字" required>
                            </p>
                            頁數:<input v-model="Book.page" placeholder="請輸入數字">
                            <h5>簡介</h5>
                            <textarea class="descr-text" v-model="Book.desc" placeholder="書內簡介"></textarea>
                        </div>
                    </div>

                    <table class="table table-hover table-bordered">
                        <thead class="table-dark ">
                            <tr>
                                <th>書號id</th>
                                <th>書名</th>
                                <th>系列</th>
                                <th>作者</th>
                                <th>價格</th>

                                <th>庫存</th>
                                <th>頁數</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>{{ Book.ISBN }}</td>
                                <td>{{ Book.name }}</td>
                                <td>{{ Book.series }}</td>
                                <td>{{ Book.author }}</td>
                                <td>{{ Book.price }}</td>
                                <td>{{ Book.stock }}</td>
                                <td>{{ Book.page }}</td>

                            </tr>

                        </tbody>
                    </table>
                    <table class="table table-hover table-bordered">
                        <thead class="table-dark ">
                            <tr>

                                <th>出版商</th>
                                <th>大分類</th>
                                <th>小分類</th>
                                <th>書本原文</th>
                                <th>出版類型</th>
                                <th>獎項</th>


                            </tr>
                        </thead>
                        <tbody>

                            <tr>

                                <!-- 出版社 -->
                                <td> <select v-model="Book.publisher">
                                        <option disabled value="">請選擇出版社</option>
                                        <!-- <option v-for="o in publishers" :key="o" :value="o">{{ o }}</option> -->
                                        <option v-for="bg in typeSet('publisher')" :key="bg" :value="bg">{{ bg }}
                                        </option>
                                    </select>
                                </td>
                                <!-- type -->
                                <td><select v-model="Book.major_category">
                                        <option disabled value="">請選擇分類大項</option>
                                        <option v-for="bg in majorTypes" :key="bg" :value="bg">{{ bg }}</option>
                                    </select>
                                </td>
                                <!-- 根據type過濾出的name選單 -->
                                <!-- 若是大項是空值就不能選:disabled="!Book.major_category" -->
                                <td> <select v-model="Book.minor_category" :disabled="!Book.major_category">
                                        <option disabled value="">請選擇分類小項</option>
                                        <option v-for="sm in filteredSubCategories" :key="sm.name" :value="sm.name">{{
                                            sm.name }}</option>

                                    </select>
                                </td>
                                <!-- 語言 -->
                                <td>
                                    <BookSelectOther v-model="Book.original_language"
                                        :options="typeSet('original_language')" placeholderStr="請輸入語言" />
                                </td>

                                <!-- 出版類型 -->
                                <td><select v-model="Book.pub_type">
                                        <option v-for="p in pubTypes" :key="p" :value="p">{{ p }}</option>

                                    </select>
                                </td>
                                <!-- 獎項 -->
                                <td>
                                    <BookSelectOther v-model="Book.award" :options="typeSet('award')"
                                        placeholderStr="請輸入獎項" />
                                </td>


                            </tr>

                        </tbody>
                    </table>


                    <button class="btn btn-danger btn-sm" @click="truncBook()">
                        清空
                    </button>
                    <button type="submit" class="btn btn-info btn-sm">
                        新增
                    </button>
                </form>
            </div>
        </div>

    </div>

</template>
<script>
import BookSelectOther from '@/components/areas/admin/BookSelectOther.vue';


export default {
    props: {
        books: { type: Array, required: true }//required: true保證必須傳入prop，否則警告

    }, components: { BookSelectOther },
    data() {
        return {
            Book: {
                ISBN: '',
                name: '',
                desc:'',
                img: '',
                series: '', price: '',
                author: '', stock: '',
                publisher: '', page: '',
                major_category: '', minor_category: '',
                original_language: '',
                pub_type: '',
                award: '',
            }, pubTypes: ['書籍', '小說', '漫畫', '繪本', '雜誌', '其他出版物'],

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
    }, methods: {

        truncBook() {
            this.Book = {
                ISBN: '',
                desc:'',
                name: '',
                img: '',
                series: '', price: '',
                author: '', stock: '',
                publisher: '', page: '',
                major_category: '', minor_category: '',
                original_language: '',
                pub_type: '',
                award: ''
            };
        }, typeSet(SQLwhere) { //獎項選項
            //如果是api回傳空值或不是陣列則回傳空值
            if (!this.books || !Array.isArray(this.books)) return [];
            return [...new Set(this.books.map(item => item[SQLwhere]))]
        }, inserToProduct() {
            //傳書本資料到資料庫上
            // console.log(this.Book.ISBN)
            this.$axios.post('/api/bookinsert', this.Book)// 直接送整個 Book 物件
                .then(res => {
                    console.log("新增成功", res.data);
                    alert("✅ 新增成功！");
                })
                .catch(err => {
                    console.error("新增失敗", err);
                    alert("❌ 新增失敗：" + (err.response?.data?.error || err.message));
                });
        }
    }, computed: {
        majorTypes() { //new Set 只保留不重複的值 ...陣列或物件打開攤平
            return [...new Set(this.BkSubCat.map(item => item.type))]//this.BkSubCat.map(item=>item.type)取出type
        }, filteredSubCategories() {
            return this.BkSubCat.filter(item => item.type === this.Book.major_category);
        }

    }
}


</script>
<style scoped>
.red-color {
    color: hsl(353, 100%, 29.2%);
}

.overlay {
    position: fixed;
    inset: 0;
    background: rgba(0, 0, 0, 0.5);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 1000;
}

.rowl {
    padding: 0 15px;
    display: flex;
    justify-content: center;
    /* 水平置中 */
    align-items: center;
    /* 垂直置中 */

}

.rowl button {
    margin-top: 20px;
}

.card-body img {
    height: 300px;
}

.right-text {
    margin: 30px;
    width: 100%;
}

.descr-text {
    width: 100%;
    height: 250px;
}
</style>
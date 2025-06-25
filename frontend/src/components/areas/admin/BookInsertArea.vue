<template>
    <div>

        <div>
            <div class="card text-center">

                <div class="card-body">

                    <div class="rowl">
                        <div>
                            <img :src="Book.img">
                            <p>封面預覽</p>
                        </div>
                        <div class="right-text">
                            <h1 class="card-title">書名 <input v-model="Book.name" placeholder="書名"></h1>
                            書號: <input v-model="Book.ISBN" placeholder="例:999-000-012345-6	">
                            封面連結:<input v-model="Book.img" placeholder="請輸入網址">
                            <p>作者: <input v-model="Book.author" placeholder="">

                                系列: <input v-model="Book.series" placeholder="若無可填空">
                            </p>
                            <p> 價格:<input v-model="Book.price" placeholder="請輸入數字">

                                庫存:<input v-model="Book.stock" placeholder="請輸入數字">
                            </p>

                            頁數:<input v-model="Book.page" placeholder="請輸入數字">


                            <h5>簡介</h5>
                            <textarea class="descr-text" v-model="Book.desc" placeholder="書內簡介"></textarea>
                            <div>

                                <button>修改</button>
                            </div>
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


                                <td> <select v-model="Book.publisher">
                                        <option disabled value="">請選擇出版社</option>
                                        <option v-for="o in publishers" :key="o" :value="o">{{ o }}</option>
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
                                <td><select v-model="Book.original_language">
                                        <option disabled value="">語言</option>
                                        <option>中文</option>
                                        <option>英文</option>
                                        <option>日文</option>
                                    </select>
                                </td>
                                <td><select v-model="Book.pub_type">
                                    <option v-for="p in pubSet" :key="p" :value="p">{{ p }}</option>
                                    
                                </select>
                                </td>
                                <td><select v-model="Book.award">
                                        <option disabled value=""></option>
                                        <option>中文</option>
                                        <option>英文</option>
                                        <option>日文</option><option>其他</option>
                                    </select></td>

                            </tr>

                        </tbody>
                    </table>
                    <button class="btn btn-danger btn-sm" @click="confirmDeleteBook(selectBook.ISBN_id)">
                        {{ '刪除' }}
                    </button>

                </div>
            </div>
        </div>
    </div>

</template>
<script>
export default {
    props: {
        books: { type: Array, required: true }//required: true保證必須傳入prop，否則警告

    },
    data() {
        return {
            Book: {
                ISBN: '',
                name: '',
                img: '',
                series: '', price: '',
                author: '', stock: '',
                publisher: '', page: '',
                major_category: '', minor_category: '',
                original_language: '', pub_type: '',
                award: ''
            }, publishers: ['出版社0', '出版社1', '出版社2'],

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

        confirmDeleteBook(isbn) {
            if (confirm(`確定要刪除書本 ${isbn} 嗎？\n\n⚠️ 此操作將永久刪除書本資料，無法復原！`)) {
                //執行刪除的函數
                console.log(`刪除書本 ${isbn} `);
            }
        }
    }, computed: {
        majorTypes() { //new Set 只保留不重複的值 ...陣列或物件打開攤平
            return [...new Set(this.BkSubCat.map(item => item.type))]//this.BkSubCat.map(item=>item.type)取出type
        }, filteredSubCategories() {
            return this.BkSubCat.filter(item => item.type === this.Book.major_category);
        }, pubSet() {
            //如果是api回傳空值或不是陣列則回傳空值
            if (!this.books || !Array.isArray(this.books)) return [];
            return [...new Set(this.books.map(item => item.pub_type))]
        }
    }

}
</script>
<style scoped>
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
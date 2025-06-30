<template>
    <div>
        <table class="table table-hover table-bordered">
            <thead class="table-dark ">
                <tr>
                    <th>#</th>
                    <th>書號id</th>
                    <th>書名</th>
                    <!-- <th>系列</th> -->
                    <th>簡介</th>
                    <th>價格</th>
                    <th>作者</th>
                    <th>庫存</th>
                    <th>出版商</th>
                    <!-- <th>獎項</th> -->
                    <!-- <th>書本原文</th> -->
                    <!-- <th>出版類型</th> -->
                    <th>大分類</th>
                    <th>小分類</th>
                    <th>上傳日期</th>
                    <th>修改日期</th>
                    <th>頁數</th>
                    <!-- <th>封面圖片</th> -->
                    <th>人氣/點擊率</th>
                    <th>操作</th>


                </tr>
            </thead>
            <tbody>

                <tr v-for="(n, index) in books" :key="index" @click="showBookDetail(n.ISBN_id)">
                    <td>{{ index + 1 }}</td>
                    <td>{{ n.ISBN_id }}</td>
                    <td>{{ n.name }}</td>
                    <!-- <td>{{ n.series }}</td> -->
                    <td>{{ n.description ? n.description.slice(0, 25) + '...' : '' }}</td>
                    <td>{{ n.price }}</td>
                    <td>{{ n.author }}</td>
                    <td>{{ n.stock }}</td>
                    <td>{{ n.publisher }}</td>
                    <td>{{ n.major_category }}</td>
                    <td>{{ n.minor_category }}</td>
                    <td>{{ n.created_at }}</td>
                    <!-- <td>{{ formatToLocalTime(n.created_at) }}</td> -->
                    <td>{{ formatToLocalTime(n.updated_at) }}</td>
                    <td>{{ n.page }}</td>
                    <td>{{ n.hit }}</td>
                    <td><button class="btn btn-danger btn-sm" @click.stop="confirmDeleteBook(n.ISBN_id)">
                            <!-- {{ isDeleting ? '刪除中...' : '刪除' }} -->
                            刪除
                        </button></td>
                </tr>

            </tbody>
        </table>
        <div v-if="selectBook" class="overlay">
            <div class="card text-center">

                <div class="card-body">

                    <div class="rowl">
                        <div>
                            <img :src="selectBook.imgUrl"><button>更換封面</button>
                        </div>
                        <div class="right-text">
                            <div>
                                <h1 class="card-title">
                                    <div v-if="isEdit"><input v-model="selectBook.name">
                                    </div>
                                    <div v-else>{{ selectBook.name }}</div>
                                </h1>
                                <button @click="toggleEdit(selectBook.ISBN_id)">{{ isEdit ? '儲存' : '修改' }}</button>
                            </div>
                            <h5>簡介</h5>
                            <div v-if="isEdit"><textarea class="descr" v-model="selectBook.description"></textarea>
                            </div>
                            <div v-else class="descr">{{ selectBook.description }}</div>


                        </div>
                    </div>

                    <table class="table table-hover table-bordered">
                        <thead class="table-dark ">
                            <tr>
                                <th>書號id</th>
                                <th>書名</th>

                                <th>價格</th>
                                <th>庫存</th>
                                <th>作者</th>
                                <th>系列</th>

                                <th>出版商</th>

                                <th>頁數</th>
                                <th>大分類</th>
                                <th>小分類</th>
                                <th>書本原文</th>
                                <th>出版類型</th>
                                <th>獎項</th>


                            </tr>
                        </thead>
                        <tbody>

                            <tr>

                                <td>{{ selectBook.ISBN_id }}</td>
                                <td>{{ selectBook.name }}
                                </td>

                                <td>
                                    <div v-if="isEdit"><input v-model="selectBook.price">
                                    </div>
                                    <div v-else>{{ selectBook.price }}</div>
                                </td>
                                <td>
                                    <div v-if="isEdit"><input v-model="selectBook.stock">
                                    </div>
                                    <div v-else>{{ selectBook.stock }}</div>
                                </td>
                                <td>
                                    <div v-if="isEdit"><input v-model="selectBook.author">
                                    </div>
                                    <div v-else>{{ selectBook.author }}</div>
                                </td>
                                <td>{{ selectBook.series }}</td>
                                <td>{{ selectBook.publisher }}</td>

                                <td>
                                    <div v-if="isEdit"><input v-model="selectBook.page">
                                    </div>
                                    <div v-else>{{ selectBook.page }}</div>
                                </td>
                                <td>
                                    <div v-if="isEdit">
                                        <select v-model="selectBook.major_category">
                                            <option disabled :value="selectBook.major_category" hidden>
                                                {{ selectBook.major_category }}</option>
                                            <option v-for="bg in majorTypes" :key="bg" :value="bg">{{ bg }}</option>
                                        </select>
                                    </div>
                                    <div v-else>
                                        {{ selectBook.major_category }}</div>
                                </td>
                                <td>
                                    <div v-if="isEdit">
                                        <select v-model="selectBook.minor_category" :disabled="!selectBook.major_category">
                                            <option disabled :value="selectBook.minor_category" hidden> {{
                                                selectBook.minor_category }}</option>
                                            <option v-for="sm in filteredSubCategories" :key="sm.name" :value="sm.name">
                                                {{
                                                    sm.name }}</option>

                                        </select>
                                    </div>
                                    <div v-else>
                                        {{ selectBook.minor_category }}</div>
                                </td>
                                <td>
                                    <div v-if="isEdit">
                                        <BookSelectOther v-model="selectBook.original_language"
                                            :options="typeSet('original_language')" placeholderStr="請輸入語言" />
                                    </div>
                                    <div v-else>{{ selectBook.original_language }}</div>
                                </td>
                                <td>{{ selectBook.pub_type }}</td>
                                <td>{{ selectBook.award }}</td>

                            </tr>

                        </tbody>
                    </table>
                    <p>人氣/點擊率:{{ selectBook.hit }}</p>
                    <p>上傳日期:{{ formatToLocalTime(selectBook.created_at) }} || 修改日期:{{
                        formatToLocalTime(selectBook.updated_at) }}</p><button class="btn btn-danger btn-sm"
                        @click="confirmDeleteBook(selectBook.ISBN_id)">刪除</button>
                    <button class="btn btn-secondary btn-sm" @click="selectBook = null">關閉</button>

                </div>
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
            selectBook: null,
            isEdit: false //是否編輯
        , pubTypes: ['書籍', '小說', '漫畫', '繪本', '雜誌', '其他出版物'],

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
        //將utc世界時區轉成台灣時區
        formatToLocalTime(dateString) {
            const date = new Date(dateString);
            return date.toLocaleString('zh-TW', {
                timeZone: 'Asia/Taipei',
                year: 'numeric',
                month: '2-digit',
                day: '2-digit',
                hour: '2-digit',
                minute: '2-digit',
                //   second: '2-digit',
                hour12: false
            });
        },//刪除書
        confirmDeleteBook(isbn) {
            if (confirm(`確定要刪除書本 ${isbn} 嗎？\n\n⚠️ 此操作將永久刪除書本資料，無法復原！`)) {
                //執行刪除的函數
                console.log(`刪除書本 ${isbn} `);
                this.$axios.delete(`/api/bookinsert/${isbn}`)
                    .then(res => {
                        console.log(res.data);
                        alert("刪除成功");
                        // 通知父元件刷新書本列表
                        this.$emit('reFreshBooks');
                    })
                    .catch(err => {
                        alert("刪除失敗" + (err.response?.data?.error || err.message));

                    });
            }
        },//我點了他就取得他的isbn
        showBookDetail(isbn) {
            
            this.selectBook =
                this.books.find(n => n.ISBN_id === isbn);
            let ppp = this.selectBook.name;
            console.log(`點書本 ${ppp} `);
        },//獎項選項
        typeSet(SQLwhere) { 
            //如果是api回傳空值或不是陣列則回傳空值
            if (!this.books || !Array.isArray(this.books)) return [];
            return [...new Set(this.books.map(item => item[SQLwhere]))]
        },
        //save或更新
        toggleEdit(isbn) {
            if (this.isEdit === true) {
                console.log('儲存', this.selectBook)
                this.$axios.put(`/api/bookinsert/update/${isbn}`, this.selectBook)
                .then(res => {
                    console.log("修改成功", res.data);
                    alert("✅ 修改成功！");
                    // 通知父元件刷新書本列表
                    this.$emit('reFreshBooks');
                })
                .catch(err => {
                    console.error("新增失敗", err);
                    alert("❌ 新增失敗：" + (err.response?.data?.error || err.message));
                });
            }
            this.isEdit = !this.isEdit;
        }
    }, computed: {
        majorTypes() { //new Set 只保留不重複的值 ...陣列或物件打開攤平
            return [...new Set(this.BkSubCat.map(item => item.type))]//this.BkSubCat.map(item=>item.type)取出type
        }, filteredSubCategories() {
            return this.BkSubCat.filter(item => item.type === this.selectBook.major_category);
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

.descr {

    width: 100%;
    height: 250px;
}

#descr-text {
    display: block;
    width: 80%;
}
</style>
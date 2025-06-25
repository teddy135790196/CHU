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
                    <td>{{ n.description.slice(0, 25) }}...</td>
                    <td>{{ n.price }}</td>
                    <td>{{ n.author }}</td>
                    <td>{{ n.stock }}</td>
                    <td>{{ n.publisher }}</td>
                    <td>{{ n.major_category }}</td>
                    <td>{{ n.minor_category }}</td>
                    <td>{{ formatToLocalTime(n.created_at) }}</td>
                    <td>{{ formatToLocalTime(n.updated_at) }}</td>
                    <td>{{ n.page }}</td>
                    <td>{{ n.hit }}</td>
                    <td><button class="btn btn-danger btn-sm" @click.stop="confirmDeleteBook(n.ISBN_id)">
                            {{ isDeleting ? '刪除中...' : '刪除' }}
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
                            <h1 class="card-title">{{ selectBook.name }}</h1>
                            <h5>簡介</h5>
                            <textarea class="descr-text" v-model="selectBook.description"></textarea>
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
                                <th>價格</th>
                                <th>作者</th>
                                <th>庫存</th>
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
                                <td>{{ selectBook.name }}</td>
                                <td>{{ selectBook.series }}</td>
                                <td>{{ selectBook.price }}</td>
                                <td>{{ selectBook.author }}</td>
                                <td>{{ selectBook.stock }}</td>
                                <td>{{ selectBook.publisher }}</td>
                                <td>{{ selectBook.page }}</td>
                                <td>{{ selectBook.major_category }}</td>
                                <td>{{ selectBook.minor_category }}</td>
                                <td>{{ selectBook.original_language }}</td>
                                <td>{{ selectBook.pub_type }}</td>
                                <td>{{ selectBook.award }}</td>

                            </tr>

                        </tbody>
                    </table>
                    <p>人氣/點擊率:{{ selectBook.hit }}</p>
                    <p>上傳日期:{{ formatToLocalTime(selectBook.created_at) }}</p>
                    <p>修改日期:{{ formatToLocalTime(selectBook.updated_at) }}</p><button class="btn btn-danger btn-sm"
                        @click="confirmDeleteBook(selectBook.ISBN_id)">
                        {{ isDeleting ? '刪除中...' : '刪除' }}
                    </button>
                    <button class="btn btn-secondary btn-sm" @click="selectBook = null">關閉</button>

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
            selectBook: null
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
        },
        confirmDeleteBook(isbn) {
            if (confirm(`確定要刪除書本 ${isbn} 嗎？\n\n⚠️ 此操作將永久刪除書本資料，無法復原！`)) {
                //執行刪除的函數
                console.log(`刪除書本 ${isbn} `);
            }
        }, showBookDetail(isbn) {
            //我點了他就取得他的isbn


            this.selectBook =
                this.books.find(n => n.ISBN_id === isbn);
            let ppp = this.selectBook.name;
            console.log(`點書本 ${ppp} `);
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
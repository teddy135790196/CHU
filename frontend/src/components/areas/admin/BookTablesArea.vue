<template>
    <div class="row">
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

                <tr v-for="(n, index) in books" :key="index">
                    <td>{{ index + 1 }}</td>
                    <td>{{ n.ISBN_id }}</td>
                    <td>{{ n.name }}</td>
                    <!-- <td>{{ n.series }}</td> -->
                    <td>{{ n.description.slice(0,25) }}...</td>
            <td>{{ n.price }}</td>
                <td>{{ n.author}}</td>
                    <td>{{ n.stock }}</td>
                    <td>{{ n.publisher }}</td> 
                    <td>{{ n.major_category }}</td>
                    <td>{{ n.minor_category }}</td>
                <td>{{ formatToLocalTime(n.created_at) }}</td>
                    <td>{{ formatToLocalTime(n.updated_at) }}</td>
                    <td>{{ n.page }}</td> 
                    <td>{{ n.hit }}</td>
               <td><button>刪除</button></td>
               
               
               
               
                </tr>

            </tbody>
        </table>
    </div>
</template>
<script>
export default {
    props: {
        books: { type: Array, required: true }//required: true保證必須傳入prop，否則警告
    },
    data() {
        return {}
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
  }
    }
}
</script>
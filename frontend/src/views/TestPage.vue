<template>
<div>
<h2>📚 商品清單</h2>
<table>
<tr>
<th>ISBN</th><th>書名</th><th>價格</th><th>庫存</th>
</tr>
<tr v-for="item in products" :key="item.ISBN_id">
<td>{{ item.ISBN_id }}</td>
<td>{{ item.name }}</td>
<td>{{ item.price }}</td>
<td>{{ item.stock }}</td>
</tr>
</table>
</div>
</template>

<script>
import axios from 'axios';

export default {
	name: "TestPage",
data() {
return {
products: []
};
},
mounted() {
axios.get("https://cors-anywhere.herokuapp.com/https://bookstore-backend-production-f711.up.railway.app/books")
  .then(res => {
    console.log("書籍資料：", res.data);
  })
  .catch(err => {
    console.error("API 錯誤：", err);
  });
}
};
</script>
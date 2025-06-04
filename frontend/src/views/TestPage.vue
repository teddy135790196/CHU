<template>
  <div>
    <table>
      <thead>
        <tr>
          <th v-for="key in keys" :key="key">{{ key }}</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(book, index) in books" :key="index">
          <td v-for="key in keys" :key="key" :class="{ desc: key === 'bookDescribe' }">
            <img
              v-if="isImageField(key) && book[key]"
              :src="book[key]"
              :alt="book['bookName'] || '圖片'"
              style="max-width: 120px; height: auto; display: block;"
            />
            <span v-else>{{ book[key] }}</span>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
export default {
  name: 'BookTable',
  data() {
    return {
      books: [],
      keys: []
    };
  },
  mounted() {
    this.fetchBooks();
  },
  methods: {
    async fetchBooks() {
      const apiURL = 'https://bookstore-backend-production-f711.up.railway.app/books';
      try {
        const response = await fetch(apiURL);
        if (!response.ok) throw new Error('網路錯誤: ' + response.status);
        const data = await response.json();

        if (!Array.isArray(data)) {
          alert('資料格式錯誤，應該是陣列');
          return;
        }

        this.books = data;
        this.keys = [...new Set(data.flatMap(Object.keys))];
      } catch (error) {
        alert('讀取資料失敗，請看 console');
        console.error('讀取資料失敗:', error);
      }
    },
    isImageField(key) {
      return key.toLowerCase().includes('img');
    }
  }
};
</script>

<style scoped>
table {
  border-collapse: collapse;
  width: 100%;
  max-width: 900px;
  margin: 20px auto;
}

th,
td {
  border: 1px solid #ccc;
  padding: 8px 12px;
  text-align: left;
  vertical-align: top;
}

th {
  background: #f0f0f0;
}

td:not(.desc) {
  white-space: nowrap;
}

td.desc {
  white-space: normal;
}
</style>

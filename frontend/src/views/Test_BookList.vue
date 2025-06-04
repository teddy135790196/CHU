<template>
  <div>
    <h2>書籍列表</h2>
    <ul>
      <li v-for="book in books" :key="book.id">
        {{ book.title }} - {{ book.author }}
      </li>
    </ul>
  </div>
</template>

<script>
// view import controller
import { getBooks } from '../controllers/test_bookController';

export default {
  name: 'BookList',
  data() {
    return {
      books: []
    };
  },
  created() {
    getBooks().then(books => {
      this.books = books;
    });
  }
};
</script>

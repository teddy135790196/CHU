<template>
  <div
    class="col3"
    @click="goToDetail(book.ISBN_id)"
    @mouseenter="isHovered = true"
    @mouseleave="isHovered = false"
  >
    <div id="block" class="card-block">
      <div
        class="delete-btn"
        v-if="showDelete && isHovered"
        @click.stop="deleteBook"
      >×</div>
      <div class="container-fluid">
        <img
          class="lazy-img"
          :src="book.imgUrl || require('@/assets/images/book3.png')"
          :alt="book.name"
        />
      </div>
      <div v-if="book.name && book.name.length > 15">
        <h4><span>{{ book.name.slice(0, 15) }}...</span></h4>
      </div>
      <div v-else>
        <h4><span>{{ book.name || '無書名' }}</span></h4>
      </div>
    </div>

    <author_a :name="book.author" class="authorColor">
      {{ book.author ? (book.author.length > 17 ? book.author.slice(0, 17) + '...' : book.author) : '' }}
    </author_a>

    <div class="PandChartBtn">
      <i><h3><small>$</small>{{ intPrice(book.price) }}</h3></i>
      <button @click.stop="putInCart(book.ISBN_id)">加入購物車</button>
    </div>
  </div>
</template>

<script>
import author_a from '@/components/pages/authorA.vue';

export default {
  name: 'BookCard',
  components: { author_a },
  props: {
    book: Object,
    showDelete: {
      type: Boolean,
      default: false,
    }
  },
  data() {
    return {
      isHovered: false,
    };
  },
  methods: {
    intPrice(price) {
      return Math.floor(price);
    },
    goToDetail(ISBN_id) {
      this.$emit('select_isbn', ISBN_id);
    },
    putInCart(ISBN_id) {
      this.$emit('buy_isbn', ISBN_id);
    },
    deleteBook() {
      this.$emit('delete_book', this.book.ISBN_id);
    }
  }
};
</script>

<style scoped>
.col3 {
  display: flex;
  flex-direction: column;
  flex-shrink: 0;
  width: 200px;
  height: 390px;
  padding: 0 auto;
  position: relative;
}

/* 右上角刪除叉叉按鈕 */
.delete-btn {
  position: absolute;
  top: 6px;
  right: 18px;
  font-size: 22px;
  color: #fff;
  background-color: rgba(0,0,0,0.6);
  border-radius: 50%;
  width: 28px;
  height: 28px;
  line-height: 28px;
  text-align: center;
  cursor: pointer;
  user-select: none;
  opacity: 0;
  transition: opacity 0.3s;
  z-index: 10;
}

.col3:hover .delete-btn {
  opacity: 1;
}

.authorColor {
  color: hsl(36, 50.7%, 50%);
  transition: all 0.55s;
}

.authorColor:hover {
  color: hsl(38, 74%, 24%);
}

.PandChartBtn {
  margin-top: auto !important;
  display: flex;
  justify-content: space-between;
  align-items: end;
}

.PandChartBtn h3 {
  font-weight: bold;
  font-family: "標楷體";
  color: hsl(353, 100%, 29.2%);
  transition: all 1s;
}

.PandChartBtn button {
  color: white;
  background-color: hsl(36, 50.7%, 71.4%);
  border: none;
  padding: 10px 15px;
  border-radius: 20px;
  transition: all 0.7s;
}

.PandChartBtn button:hover {
  background-color: hsl(353, 100%, 29.2%);
}

#block img {
  width: 100%;
  height: 200px; /* ✅ 固定高度讓卡片更小一致 */
  object-fit: cover;
  transition: all 0.5s;
}

#block:hover img {
  scale: 1.03;
  border-radius: 20px;
  z-index: 2;
}

#block:hover span {
  color: hsl(353, 100%, 29.2%);
}

h4 span {
  font-size: 20px;
  color: rgb(34, 34, 34);
  display: inline-block;
  white-space: normal; 
  padding-bottom: 10px;
  transition: all 0.55s;
}

h4::after {
  background-color: hsl(353, 100%, 29.2%);
  content: "";
  display: block;
  width: 30%;
  height: 2px;
  transition: all 0.4s;
}

#block:hover h4::after {
  width: 100%;
}
</style>

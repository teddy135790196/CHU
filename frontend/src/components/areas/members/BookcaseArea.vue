<template>
  <div class="selectContent" id="bookcase">
    <div class="section-divider mb-4">
      <h5 class="section-title">我的最愛</h5>
    </div>

    <div class="row mb-5 g-3 position-relative">
      <!-- 左右按鈕 -->
      <button
        class="scroll-btn left btn btn-light position-absolute top-50 start-0 translate-middle-y"
        @click="scrollLeft"
      >←</button>
      <button
        class="scroll-btn right btn btn-light position-absolute top-50 end-0 translate-middle-y"
        @click="scrollRight"
      >→</button>

      <!-- 捲動容器 -->
      <div
        ref="scrollContainer"
        class="d-flex overflow-auto gap-3 px-4 scroll-container"
      >
        <book-card
          v-for="book in favorites"
          :key="book.ISBN_id"
          :book="book"
          :showDelete="true"
          @select_isbn="goToDetail"
          @buy_isbn="addToCart"
          @delete_book="removeFromFavorites"
        />
        <div v-if="favorites.length === 0" class="text-center p-4 w-100">目前沒有收藏書籍</div>
      </div>
    </div>
  </div>
</template>

<script>
import BookCard from '@/components/common/BookCard.vue';

export default {
  name: "BookcaseArea",
  components: { BookCard },
  data() {
    return {
      favorites: [],
      scrollAmount: 200,
    };
  },
  mounted() {
    this.fetchFavorites();
  },
  methods: {
    async fetchFavorites() {
      const user_id = localStorage.getItem('user_id');
      if (!user_id) {
        // alert('請先登入');
        return;
      }
      try {
        const response = await this.$axios.get(`/api/memberBookCase/favorites/${user_id}`);
        this.favorites = response.data.favorites.map(item => ({
          ISBN_id: item.ISBN_id,
          name: item.name || '無書名',
          author: item.author || '未知作者',
          imgUrl: item.imgUrl || '',
          price: item.price || 0,
          status: item.status || 'wish',
        }));
      } catch (error) {
        console.error('讀取收藏失敗:', error);
        alert('讀取收藏失敗，請稍後再試');
      }
    },
    scrollLeft() {
      this.$refs.scrollContainer.scrollLeft -= this.scrollAmount;
    },
    scrollRight() {
      this.$refs.scrollContainer.scrollLeft += this.scrollAmount;
    },
    goToDetail(ISBN_id) {
      this.$router.push(`/book/${encodeURIComponent(ISBN_id)}`);
      console.log('前往書籍詳細:', ISBN_id);
    },
    addToCart(ISBN_id) {
      const book = this.favorites.find(b => b.ISBN_id === ISBN_id);
      if (book) {
        let cartItems = JSON.parse(localStorage.getItem('cartItems') || '[]');

        const existingIndex = cartItems.findIndex(item => item.id === ISBN_id);
        if (existingIndex > -1) {
          cartItems[existingIndex].count++;
          alert('商品數量已增加！');
        } else {
          cartItems.push({
            id: book.ISBN_id,
            itemName: book.name,
            price: book.price,
            count: 1,
            imgUrl: book.imgUrl || 'https://via.placeholder.com/100x100?text=書籍封面'
          });
          alert('商品已加入購物車！');
        }

        localStorage.setItem('cartItems', JSON.stringify(cartItems));
        window.dispatchEvent(new Event('storage'));
      }
    },
    async removeFromFavorites(ISBN_id) {
      if (!confirm('確定要從我的最愛移除這本書嗎？')) return;

      const user_id = localStorage.getItem('user_id');
      if (!user_id) {
        // alert('請先登入');
        return;
      }

      try {
        await this.$axios.delete(`/api/memberBookCase/favorites/${user_id}/${encodeURIComponent(ISBN_id)}`);
        // 刪除成功後再從 favorites 移除該書
        this.favorites = this.favorites.filter(book => book.ISBN_id !== ISBN_id);
        alert('已從我的最愛移除');
      } catch (error) {
        console.error('刪除失敗:', error);
        alert('刪除失敗，請稍後再試');
        // 失敗時重新抓一次清單
        this.fetchFavorites();
      }
    }
  }
};
</script>


<style scoped>
#bookcase {
  padding: 20px;
}

.section-divider {
  display: flex;
  align-items: center;
  text-align: center;
}

.section-divider h5 {
  line-height: 28px;
  margin: 0;
  color: var(--second-color);
  font-family: "王翰宗中仿宋";
}

.section-divider::before,
.section-divider::after {
  content: "";
  flex: 1;
  border-top: 3px solid var(--second-color);
}

.section-title {
  padding: 0 1rem;
  white-space: nowrap;
}

.scroll-container {
  scroll-behavior: smooth;
  padding-top: 10px;
  padding-bottom: 10px;
  min-height: 250px;
  white-space: nowrap;
  overflow-x: auto;
}

.scroll-container > * {
  /* display: inline-block; */
  vertical-align: top;
}

.card {
  width: 200px;
  flex: 0 0 auto;
  margin-right: 12px;
}


.scroll-btn {
  z-index: 10;
  width: 40px;
  height: 40px;
  font-size: 20px;
  opacity: 0.8;
  transition: all 0.2s;
}

.scroll-btn:hover {
  opacity: 1;
  transform: scale(1.1);
}
</style>

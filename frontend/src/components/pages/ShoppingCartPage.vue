<template>
  <div id="app">
    <div class="container py-5">
      <div class="row">
        <div class="col-md-8">
          <div class="d-flex justify-content-between align-items-center mb-4">
            <h2 class="cart-title">購物車</h2>
            <!-- <button class="btn btn-primary add-product-btn" @click="addTestProduct">
              <i class="bi bi-plus-circle me-2"></i>添加測試商品
            </button> -->
          </div>
          
          <div v-if="itemList.length === 0" class="empty-cart text-center py-5">
            <i class="bi bi-cart-x empty-cart-icon"></i>
            <p class="mt-3 text-muted">購物車是空的</p>
          </div>

          <div v-else class="cart-items mb-4">
            <div v-for="item in itemList" :key="item.id" class="cart-item">
              <div class="cart-item-content">
                <img :src="item.imgUrl" :alt="item.itemName" class="cart-item-image" @error="handleImageError">
                <div class="cart-item-details">
                  <h5 class="cart-item-title">{{ item.itemName }}</h5>
                  <p class="cart-item-price">單價：${{ item.price }}</p>
                  <div class="cart-item-actions">
                    <button class="btn btn-sm btn-outline-secondary quantity-btn" @click="updateQuantity(item.id, -1)">-</button>
                    <span class="quantity">{{ item.count }}</span>
                    <button class="btn btn-sm btn-outline-secondary quantity-btn" @click="updateQuantity(item.id, 1)">+</button>
                    <button class="btn btn-sm btn-danger remove-btn" @click="removeItem(item.id)">
                      <i class="bi bi-trash me-1"></i>刪除
                    </button>
                  </div>
                </div>
                <div class="cart-item-total">
                  <h5>${{ item.price * item.count }}</h5>
                </div>
              </div>
            </div>
          </div>

          <div class="cart-actions d-flex justify-content-between align-items-center">
            <div>
              <button class="btn btn-outline-primary continue-shopping-btn me-2" @click="$router.push('/products')">
                <i class="bi bi-arrow-left me-2"></i>繼續購物
              </button>

            </div>
            <button class="btn btn-primary checkout-btn" @click="goToCheckout" :disabled="itemList.length === 0">
              <i class="bi bi-cart-check me-2"></i>前往結帳
            </button>
          </div>
        </div>

        <div class="col-md-4">
          <div class="order-summary">
            <h5 class="summary-title">訂單摘要</h5>
            <div class="summary-content">
              <div class="summary-item">
                <span>商品總數</span>
                <span>{{ totalItems }} 件</span>
              </div>
              <div class="summary-item">
                <span>商品總額</span>
                <span>${{ totalPrice }}</span>
              </div>
              <hr>
              <div class="summary-total">
                <strong>總計</strong>
                <strong>${{ totalPrice }}</strong>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "ShoppingCartPage",
  data() {
    return {
      itemList: []
    };
  },
  computed: {
    totalItems() {
      return this.itemList.reduce((total, item) => total + item.count, 0);
    },
    totalPrice() {
      return this.itemList.reduce((total, item) => total + (item.price * item.count), 0);
    }
  },
  methods: {
    addTestProduct() {
      const testProduct = {
        id: Date.now(),
        itemName: '測試商品 ' + (this.itemList.length + 1),
        price: Math.floor(Math.random() * 1000) + 100,
        count: 1,
        imgUrl: 'https://via.placeholder.com/100x100?text=商品圖片'
      };
      this.itemList.push(testProduct);
      this.saveCartToStorage();
    },
    updateQuantity(id, change) {
      const item = this.itemList.find(item => item.id === id);
      if (item) {
        item.count = Math.max(1, item.count + change);
        this.saveCartToStorage();
      }
    },
    removeItem(id) {
      this.itemList = this.itemList.filter(item => item.id !== id);
      this.saveCartToStorage();
    },
    goToCheckout() {
      if (this.itemList.length === 0) {
        alert('購物車是空的！');
        return;
      }
      this.saveCartToStorage();
      this.$router.push('/checkout-info');
    },
    saveCartToStorage() {
      localStorage.setItem('cartItems', JSON.stringify(this.itemList));
      // 觸發 storage 事件來通知其他組件更新購物車數量
      window.dispatchEvent(new Event('storage'));
    },
    loadCartFromStorage() {
      const savedCart = localStorage.getItem('cartItems');
      if (savedCart) {
        this.itemList = JSON.parse(savedCart);
        // 檢查並修復缺少圖片URL的商品
        this.itemList.forEach(item => {
          if (!item.imgUrl || item.imgUrl === 'undefined') {
            item.imgUrl = 'https://via.placeholder.com/100x100?text=書籍封面';
          }
        });
        this.saveCartToStorage(); // 保存修復後的數據
      }
    },
    handleImageError(event) {
      // 當圖片加載失敗時，設置預設圖片
      event.target.src = 'https://via.placeholder.com/100x100?text=書籍封面';
    }
  },
  created() {
    this.loadCartFromStorage();
  }
};
</script>

<style scoped>
.cart-title {
  color: #c41e3a;
  font-weight: 600;
  margin: 0;
}

.add-product-btn {
  background-color: #c41e3a;
  border-color: #c41e3a;
  transition: all 0.3s ease;
  color: #fff;
}

.add-product-btn:hover {
  background-color: #a01830;
  border-color: #a01830;
  transform: translateY(-1px);
}

.empty-cart {
  background: #f8f9fa;
  border-radius: 8px;
  padding: 3rem;
}

.empty-cart-icon {
  font-size: 4rem;
  color: #6c757d;
}

.cart-items {
  background: #fff;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0,0,0,0.05);
}

.cart-item {
  padding: 1.5rem;
  border-bottom: 1px solid #eee;
  transition: all 0.3s ease;
  background: #fff;
}

.cart-item:last-child {
  border-bottom: none;
}

.cart-item:hover {
  background-color: #f8f9fa;
}

.cart-item-content {
  display: flex;
  align-items: center;
  gap: 1.5rem;
}

.cart-item-image {
  width: 100px;
  height: 100px;
  object-fit: cover;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
  border: 2px solid #c41e3a;
}

.cart-item-details {
  flex-grow: 1;
}

.cart-item-title {
  color: #c41e3a;
  margin-bottom: 0.5rem;
  font-weight: 500;
}

.cart-item-price {
  color: #6c757d;
  margin-bottom: 0.5rem;
}

.cart-item-actions {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.quantity-btn {
  width: 32px;
  height: 32px;
  padding: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 4px;
}

.quantity {
  min-width: 40px;
  text-align: center;
  font-weight: 500;
}

.remove-btn {
  padding: 0.25rem 0.5rem;
  margin-left: 1rem;
}

.cart-item-total {
  font-weight: 600;
  color: #2c3e50;
}

.order-summary {
  background: #fff;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0,0,0,0.05);
  padding: 1.5rem;
  border: 1px solid #c41e3a;
}

.summary-title {
  color: #c41e3a;
  font-weight: bold;
  margin-bottom: 1.5rem;
  padding-bottom: 0.5rem;
  border-bottom: 2px solid #eee;
}

.summary-content {
  padding: 0.5rem 0;
}

.summary-item {
  display: flex;
  justify-content: space-between;
  margin-bottom: 1rem;
  color: #6c757d;
}

.summary-total {
  display: flex;
  justify-content: space-between;
  margin-top: 1rem;
  padding-top: 1rem;
  border-top: 1px solid #eee;
  color: #2c3e50;
  font-size: 1.1rem;
}

.summary-total strong {
  color: #c41e3a;
}

.continue-shopping-btn {
  color: #c41e3a;
  border-color: #c41e3a;
  background: #fff;
}

.continue-shopping-btn:hover {
  background: #c41e3a;
  color: #fff;
}

.checkout-btn {
  background-color: #c41e3a;
  border-color: #c41e3a;
  color: #fff;
}

.checkout-btn:hover {
  background-color: #a01830;
  border-color: #a01830;
}

.checkout-btn:disabled {
  background-color: #f3c6cb;
  border-color: #c41e3a;
  color: #fff;
  opacity: 0.7;
  cursor: not-allowed;
}

@media (max-width: 768px) {
  .cart-item-content {
    flex-direction: column;
    text-align: center;
  }
  
  .cart-item-actions {
    justify-content: center;
  }
  
  .cart-item-total {
    margin-top: 1rem;
  }
  
  .cart-actions {
    flex-direction: column;
    gap: 1rem;
  }
  
  .cart-actions .btn {
    width: 100%;
  }
}
</style>

<template>
  <div class="list-group mb-4">
    <!-- 主資料 -->
    <div class="list-group-item">
      <div class="d-flex justify-content-between align-items-start flex-wrap">
        <div>
          <strong>訂單編號：</strong>#{{ order.id }}<br />
          <small>下單日期：{{ order.date }}</small><br v-if="order.shipDate" />
          <small v-if="order.shipDate">出貨日期：{{ order.shipDate }}</small><br v-if="order.settleDate" />
          <small v-if="order.settleDate">結算日期：{{ order.settleDate }}</small>
        </div>
        <div class="text-end mt-2 mt-md-0">
          <!-- 這裡改成 v-bind:class -->
          <span :class="['badge', 'bg-' + statusColor]">{{ order.statusText }}</span><br />
          <button
            class="btn btn-sm btn-outline-primary mt-2"
            data-bs-toggle="collapse"
            :data-bs-target="'#collapse' + order.id"
            aria-expanded="false"
            :aria-controls="'collapse' + order.id"
          >
            {{ isCollapsed ? '收起明細' : '查看明細' }}
          </button>
        </div>
      </div>
    </div>

    <!-- 明細摺疊 -->
    <div
      :id="'collapse' + order.id"
      class="collapse list-group-item"
      @show="isCollapsed = true"
      @hide="isCollapsed = false"
    >
      <div class="d-flex justify-content-between align-items-start flex-wrap">
        <!-- 書名 -->
        <div>
          <p v-for="(item, index) in order.items" :key="'title-' + index">{{ item.title }}</p>
        </div>

        <!-- 售價 -->
        <div>
          <p v-for="(item, index) in order.items" :key="'price-' + index">售價：{{ item.price }}</p>
        </div>

        <!-- 數量 -->
        <div>
          <p v-for="(item, index) in order.items" :key="'qty-' + index">{{ item.qty }}本</p>
        </div>

        <!-- 小計 -->
        <div>
          <p v-for="(item, index) in order.items" :key="'subtotal-' + index">小計：{{ item.price * item.qty }}</p>
        </div>
      </div>

      <hr />

      <div class="d-flex justify-content-end">
        <div class="text-end">
          <p>折扣：-{{ order.discount || 0 }}</p>
          <p>總計：{{ order.total }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

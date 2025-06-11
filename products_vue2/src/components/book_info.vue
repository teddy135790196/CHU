<template>
  <div>
    <div class="row">
      <!-- 商品圖 -->
      <div class="col-md-6">
        <div class="prodP">
          <img
            src="https://lh3.googleusercontent.com/pw/AP1GczPUymPfxPh2YFqzUYpfXHR7o0O1fzvZqlnFaghV_iigdqWrYaOne1IYdY25YVgEmUGYa-2_X4dvulD4OLQqqssAx2ihzFWRjuTXD8A8aFda3sHSwmYJwgg6i6XJAhqiuCXrVw0LJVcuoYrgkMDYsvmg=w460-h580-s-no-gm?authuser=0"
            alt=""
          />
        </div>
      </div>
      <!-- 再從6裡切作者資訊跟價格 -->
      <div class="col-md-6">
        <h1 class="bookTitle">紅樓夢</h1>
        <hr />
        <div class="row prodFlex">
          <div>
            <ul>
              <li>作者/ <a href="#">石心寺</a></li>
              <li>出版社/ <a href="">知返</a></li>
              <li>出版日期/ 2025.1.10</li>

              <li>庫存狀態/ <span class="Stock">有貨</span></li>
            </ul>
          </div>
          <div>
            <h2 class="price">$750</h2>
          </div>
        </div>
        <hr />
        <!-- 內文說明 -->
        <div class="describe">
          <h4><i>人情冷暖盡現，盛衰榮枯皆在其中。</i></h4>
          <p>
            這部經典小說以賈、史、王、薛四大家族的興衰為主線，描繪了一個鐘鳴鼎食、詩禮簪纓的貴族家庭由盛轉衰的歷史圖景。故事聚焦於賈寶玉與林黛玉、薛寶釵之間纏綿悱惻的愛情糾葛，以及大觀園中眾多閨閣女兒的悲歡離合。曹雪芹以精湛的筆法，塑造了賈寶玉的叛逆與深情、林黛玉的敏感與才華、薛寶釵的端莊與世故等一系列鮮活的人物形象。書中不僅細緻入微地展現了清代社會的風俗人情、飲食服飾、詩詞歌賦，更深刻揭示了封建社會的弊端與人性的複雜多變。這是一部百科全書式的巨著。
          </p>
        </div>
      </div>
   
    </div>
    <hr />
    <!-- 卡片 -->
     <div id="card-1">
                <!-- 1 -->
                <div class="card" id="card_spe">
                  <div class="card-header">
                    <a
                      class="card-link"
                      data-toggle="collapse"
                      data-parent="#card-1"
                      href="#card-element-2"
                      >商品規格▼</a
                    >
                  </div>
                  <div id="card-element-2" class="collapse show">
                    <div class="card-body">
                      <p><span>ISBN：</span>999-000-984157-7</p>
                      <p><span>頁數：</span>962</p>
                      <p><span>語言：</span>中文</p>
                    </div>
                  </div>
                </div>

                <!-- 3 -->
                <div class="card" id="card_del">
                  <div class="card-header">
                    <a
                      class="collapsed card-link"
                      data-toggle="collapse"
                      data-parent="#card-1"
                      href="#card-element-3"
                    >
                      運送與售後▼</a
                    >
                  </div>
                  <div id="card-element-3" class="collapse">
                    <div class="card-body">
                      <dl>
                        <dt>配送範圍</dt>
                        <dd>
                          -前僅提供台灣本島地區配送服務，外島及海外地區暫不開放配送，敬請見諒。
                        </dd>
                        <dt>出貨時間</dt>
                        <dd>
                          -訂單確認後一般於 1–3
                          個工作天內出貨（不含例假日與國定假日）。<br>
                          -如遇特殊促銷或物流旺季，出貨時間可能延長，還請耐心等候。
                        </dd>
                        <dt>配送方式與時間</dt>
                        <dd>
                          -我們採用合作物流夥伴配送，配送時間依各地區及物流狀況而異，通常於出貨後
                          1–3 天送達。
                        </dd>
                        <dt>訂單查詢</dt>
                        <dd>
                          -出貨後將以電子郵件通知物流單號，您可透過該單號查詢配送進度。<br>-如未收到通知信，請先檢查垃圾郵件匣，或聯絡客服協助處理。
                        </dd>
                        <dt>退換貨說明</dt>
                        <dd>
                          -若收到商品有破損、缺頁、印刷錯誤等情況，請於收到商品
                          7
                          天內聯絡我們，提供照片及訂單資訊，我們將盡快為您處理退換貨。<br>-退換貨僅限商品本身有瑕疵，恕不接受因個人因素（如不喜歡內容）申請退貨。
                        </dd>
                        <dt>客服聯絡方式</dt>
                        <dd>
                          -如有任何問題，歡迎透過客服信箱或網站聯絡表單與我們聯繫，我們將儘速回覆您。
                        </dd>
                      </dl>
                    </div>
                  </div>
                </div>
              </div>
  </div>
</template>
<script>
// import
export default {};
</script>
<!-- css -->
<style scoped>
/* 商品頁 */

/* 產品頁面 */
.prodP {
  margin: 0 auto;
}
.prodP img {
  width: 100%;
}
.prodFlex {
  display: flex;
  justify-content: space-around;
}
/* 書標題 */
.bookTitle {
  margin-bottom: 12px;
  /* border-bottom: 1px solid black; */
}
/* 價格 */
.price {
  font-weight: bold;
  color: white;
  background-color: hsl(36, 50.7%, 50%);
  padding: 15px 45px;
  border-radius: 0px 30px;
  margin-top: 40px;
}

/* 庫存 */
.Stock {
  color: hsl(353, 100%, 29.2%);
  font-weight: bold;
  font-size: 20px;
}
/* 商品頁的作者跟出版商 */
.prodFlex {
  font-size: 20px;
}
.prodFlex a {
  color: hsl(353, 100%, 29.2%);
}
/* 商品頁的內文描述 */
.describe i {
  color: hsl(353, 100%, 29.2%);
}
/* 商品頁的商品規格 */
#card-1 {
  display: flex;
  justify-content: space-around;
}
#card_spe {
  width: 300px;
}
#card_del {
  width: 1250px;
}
.card a {
  font-size: 20px;
  color: white;
}
.card-header {
  background-color: hsl(353, 100%, 29.2%);
}
.card-body {
  margin: 10px 30px;
}
.card-body dt {
  color: hsl(353, 100%, 29.2%);
}

</style>
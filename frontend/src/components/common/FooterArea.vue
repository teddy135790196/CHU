<!-- prettier-ignore -->
<template>
  <!-- 頁尾資訊 -->
  <footer class="footer">
    <div class="community">
      <h3>社群連結</h3>
      <div class="communityIcon">
        <a href="#"><img src="icon/big-youtube-logo_81131.png" alt="youtube" /></a>
        <a href="#"><img src="icon/camera_919613.png" alt="ig" /></a>
        <a href="#"><img src="icon/facebook_3488299.png" alt="fb" /></a>
        <a href="#"><img src="icon/line_3992580.png" alt="line" /></a>
      </div>
    </div>
    <div class="termsOfService">
      <h3>服務條款</h3>
      <a href="#">服務條款</a>
      <a href="#">隱私權條款</a>
    </div>
    <p class="copyright">版權所有 © 2025 棲遲書屋 Web design by 卓俊良、彭雲錕、康亘翔、尤乙淳</p>
  </footer>
</template>

<script>
export default {
  name: "FooterArea",
};
</script>

<style scoped>
/* 頁尾 */
/* 直接用footer標籤無法使用flex */
.footer {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
  margin-top: 1em;
}
.community {
  margin-top: 1em;
  padding: 0 5vw;
  flex-basis: 100%;
}
.community h3 {
  margin-bottom: 0.5em;
  text-align: center;
}
.community a + a {
  margin-left: 2vw;
}
.communityIcon {
  text-align: center;
}
.communityIcon img {
  width: 25px;
}
.termsOfService {
  margin-top: 1em;
  padding: 0 5vw;
  flex-basis: 100%;
}
.termsOfService h3 {
  margin-bottom: 0.5em;
  text-align: center;
}
.termsOfService {
  text-align: center;
}
.termsOfService a + a {
  margin-left: 2vw;
}
footer p {
  padding: 0.5em 5vw;
}
@media (min-width: 576px) {
  .community {
    flex-basis: 50%;
    margin-top: 0px;
  }
  .termsOfService {
    flex-basis: 50%;
    margin-top: 0px;
  }
}
@media (min-width: 992px) {
  .community {
    flex-basis: 30%;
  }
  .termsOfService {
    flex-basis: 30%;
  }
  footer p {
    flex-basis: 30%;
  }
}
</style>

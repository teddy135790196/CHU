<template>
	<!-- 區塊：個人設定－始 -->
	<div class="selectContent" id="settings" style="display: none;">
		<!-- 🌈 個人化設定 -->
		<section class="mb-4">
			<h5>個人化設定</h5>
			<div class="soild"></div>
			<!-- <div class="form-check form-switch">
									<input class="form-check-input" type="checkbox" id="darkModeToggle">
									<label class="form-check-label" for="darkModeToggle">深色模式</label>
								</div> -->
			<div class="inp_modle mt-2">
				<label class="form-label">主題風格</label>
				<select id="themeSelector">
					<option value="default" selected>經典金虹</option>
					<option value="ocean">海青嵐（測試主題）</option>
					<option value="dark">墨韻黑（測試主題）</option>
				</select>
			</div>
		</section>

		<!-- 個人資料管理 -->
		<section id="infoSection" class="mb-4 personal-info-section">
			<h5>個人資料管理</h5>
			<div class="soild"></div>
			<div class="inp_modle">
				<label>暱稱</label>
				<input type="text" value="長安不問" class="edit-input" style="display:none;">
				<p class="display-text">長安不問</p>
			</div>
			<div class="inp_modle">
				<label class="form-label">性別</label>
				<select class="edit-input" style="display:none;">
					<option>男性</option>
					<option>女性</option>
					<option>其他 / 不透露</option>
				</select>
				<p class="display-text">男性</p>
			</div>
			<div class="inp_modle">
				<label class="form-label">生日</label>
				<input type="date" value="2000-01-01" class="edit-input" style="display:none;">
				<p class="display-text">2000-01-01</p>
			</div>

			<button id="toggleEditBtn" data-edit-text="修改個人資訊"
				class="btn btn-sm btn-outline-primary mt-2">修改個人資訊</button>
		</section>

		<!-- 📱 聯繫方式 -->
		<section id="contactSection" class="mb-4 personal-info-section">
			<h5 class="mb-3">聯繫方式</h5>
			<div class="soild"></div>

			<div class="inp_modle towline">
				<div class="label-badge">
					<label>電子信箱</label>
					<span class="badge bg-success">已驗證</span>
				</div>
				<div class="d-flex align-items-center w-100">
					<input type="email" value="user@example.com" class="edit-input" style="display:none;">
					<p class="display-text">user@example.com</p>
					<!-- <button
											class="display-text btn btn-sm btn-outline-secondary ms-2">寄送驗證信</button> -->
				</div>
			</div>

			<div class="inp_modle towline">
				<div class="label-badge">
					<label>手機號碼</label>
					<span class="badge bg-warning text-dark">未驗證</span>
				</div>
				<div class="d-flex align-items-center w-100">
					<input type="text" value="0912345678" class="edit-input" style="display:none;">
					<p class="display-text">0912345678</p>
					<button class="display-text btn btn-sm btn-outline-secondary ms-2">寄送驗證信</button>
				</div>
			</div>

			<button id="toggleContactEditBtn" data-edit-text="修改聯繫方式"
				class="btn btn-sm btn-outline-primary mt-2">修改聯繫方式</button>
		</section>

		<!-- 🔐 隱私與安全性 -->
		<section class="mb-4">
			<h5>隱私與安全性</h5>
			<div class="soild"></div>

			<div id="accountSection" class="inp_modle towline personal-info-section">
				<label class="form-label">帳號</label>
				<div class="d-flex align-items-center w-100">
					<input type="email" value="myusername" class="edit-input" style="display:none;">
					<p class="display-text">myusername</p>
					<button id="toggleAccountEditBtn" class="btn btn-sm btn-outline-primary ms-2"
						data-edit-text="修改帳號">修改帳號</button>
				</div>
			</div>

			<div id="passwordSection" class="inp_modle towline personal-info-section">
				<label class="form-label">密碼</label>
				<div class="d-flex align-items-center w-100">
					<input type="email" value="a***************a" class="edit-input" style="display:none;">
					<p class="display-text">a***************a</p>
					<button id="togglePasswordEditBtn" class="btn btn-sm btn-outline-primary ms-2"
						data-edit-text="修改密碼">修改密碼</button>
				</div>
			</div>

			<div class="d-flex justify-content-end mt-5">
				<button class="btn btn-outline-dark">帳號登出</button>
				<button class="btn btn-danger">刪除帳號</button>要有浮窗輸入DELETE才能刪除
			</div>
		</section>
	</div>
</template>

<script>
export default {
  name: "SettingsSection",
  mounted() {
    // 初始化編輯控制區塊
    this.setupToggleEdit("infoSection", "toggleEditBtn", "overlay");
    this.setupToggleEdit("contactSection", "toggleContactEditBtn", "overlay");
    this.setupToggleEdit("accountSection", "toggleAccountEditBtn", "overlay");
    this.setupToggleEdit("passwordSection", "togglePasswordEditBtn", "overlay");

    // 初始化主題設定
    this.setupThemeSelector();
  },
  methods: {
    setupToggleEdit(sectionId, toggleBtnId, overlayId = null) {
      const section = document.getElementById(sectionId);
      const toggleBtn = document.getElementById(toggleBtnId);
      const overlay = overlayId ? document.getElementById(overlayId) : null;

      const inputs = section.querySelectorAll(".edit-input");
      const texts = section.querySelectorAll(".display-text");

      let isEditing = false;

      toggleBtn.addEventListener("click", () => {
        isEditing = !isEditing;

        inputs.forEach((input) => {
          input.style.display = isEditing ? "block" : "none";
          if (!isEditing) {
            const p = input.nextElementSibling;
            if (p) {
              if (input.tagName === "SELECT") {
                p.textContent = input.options[input.selectedIndex].text;
              } else {
                p.textContent = input.value;
              }
            }
          }
        });

        texts.forEach((p) => {
          p.style.display = isEditing ? "none" : "block";
        });

        toggleBtn.textContent = isEditing
          ? "完成修改"
          : toggleBtn.getAttribute("data-edit-text");
        toggleBtn.classList.toggle("btn-outline-primary", !isEditing);
        toggleBtn.classList.toggle("btn-primary", isEditing);

        if (overlay) {
          overlay.style.display = isEditing ? "block" : "none";
        }

        section.classList.toggle("editing", isEditing);
      });
    },

    setupThemeSelector() {
      const themeSelector = document.getElementById("themeSelector");

      // 套用已儲存的主題
      const savedTheme = localStorage.getItem("theme");
      if (savedTheme) {
        document.documentElement.setAttribute("data-theme", savedTheme);
        themeSelector.value = savedTheme;
      }

      // 使用者切換主題時儲存
      themeSelector.addEventListener("change", function () {
        const selected = this.value;

        if (selected === "default") {
          document.documentElement.removeAttribute("data-theme");
          localStorage.removeItem("theme");
        } else {
          document.documentElement.setAttribute("data-theme", selected);
          localStorage.setItem("theme", selected);
        }
      });
    },
  },
};
</script>

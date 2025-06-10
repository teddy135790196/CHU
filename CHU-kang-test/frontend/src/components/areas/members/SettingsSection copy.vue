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
				<!-- BS5樣式 -->
				<select id="themeSelector" class="form-select">
					<option value="default" selected>經典金虹</option>
					<option value="ocean">海青嵐（測試主題）</option>
					<option value="dark">墨韻黑（測試主題）</option>
				</select>
			</div>
		</section>

		<!-- 個人資料管理 -->
		<section id="infoSection" class="mb-4 edit-section">
			<h5>個人資料管理</h5>
			<div class="soild"></div>
			<div class="inp_modle">
				<label>暱稱</label>
				<input type="text" value="長安不問" class="edit-input" style="display:none;">
				<p class="display-text">長安不問</p>
			</div>
			<div class="inp_modle">
				<label class="form-label">性別</label>
				<select class="edit-input form-select" style="display:none;">
					<option>男性</option>
					<option>女性</option>
					<option>隱藏</option>
				</select>
				<p class="display-text">男性</p>
			</div>
			<div class="inp_modle">
				<label class="form-label">生日</label>
				<input type="date" value="2000-01-01" class="edit-input" style="display:none;">
				<p class="display-text">2000-01-01</p>
			</div>
			<div class="inp_modle">
				<label class="form-label">個人簡介</label>
				<textarea class="edit-input"
					style="display:none; resize: none;">天地玄黃，宇宙洪荒。日月盈昃，辰宿列張。寒來暑往，秋收冬藏。閏餘成歲，律召調陽。雲騰致雨，露結為霜。金生麗水，玉出崑岡。劍號巨闕，珠稱夜光。果珍李柰，菜重芥薑。海鹹河淡，鱗潛羽翔。龍師火帝，鳥官人皇。始制文字，乃服衣裳。推位讓國，有虞陶唐。弔民伐罪，周發殷湯。坐朝問道，垂拱平章。愛育黎首，臣伏戎羌。遐邇一體，率賓歸王。鳴鳳在樹，白駒食場。化被草木，賴及萬方。蓋此身髮，四大五常。恭惟鞠養，豈敢毀傷。女慕貞絜，男效才良。知過必改，得能莫忘。罔談彼短，靡恃己長。信使可覆，器欲難量。墨悲絲淬，詩讚羔羊。</textarea>
				<p class="display-text  text-truncate">
					或者直接在上面改。天地玄黃，宇宙洪荒。日月盈昃，辰宿列張。寒來暑往，秋收冬藏。閏餘成歲，律召調陽。雲騰致雨，露結為霜。金生麗水，玉出崑岡。劍號巨闕，珠稱夜光。果珍李柰，菜重芥薑。海鹹河淡，鱗潛羽翔。龍師火帝，鳥官人皇。始制文字，乃服衣裳。推位讓國，有虞陶唐。弔民伐罪，周發殷湯。坐朝問道，垂拱平章。愛育黎首，臣伏戎羌。遐邇一體，率賓歸王。鳴鳳在樹，白駒食場。化被草木，賴及萬方。蓋此身髮，四大五常。恭惟鞠養，豈敢毀傷。女慕貞絜，男效才良。知過必改，得能莫忘。罔談彼短，靡恃己長。信使可覆，器欲難量。墨悲絲淬，詩讚羔羊。
				</p>
			</div>

			<button id="toggleEditBtn" data-edit-text="修改個人資訊"
				class="btn btn-sm btn-outline-primary mt-2">修改個人資訊</button>
		</section>

		<!-- 📱 聯繫方式 -->
		<section id="contactSection" class="mb-4 edit-section">
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
					<button class="display-text btn btn-sm btn-outline-success ms-2">寄送驗證信</button>
				</div>
			</div>

			<div class="inp_modle towline">
				<div class="label-badge">
					<label>通訊地址</label>
				</div>
				<div class="d-flex align-items-center w-100">
					<input type="text" value="320桃園市中壢區健行路229號" class="edit-input" style="display:none;">
					
					<!-- 分離式輸入(目前失敗) -->
					<!-- <div id="address" class="edit-input" style="display:none;">
						<div class="row mt-2 g-2">
<div class="col-12 col-md-4 d-flex align-items-center">
  <span for="county" class="mb-0" style="white-space: nowrap;">縣市</span>
  <input type="text" id="county" class="form-control" placeholder="如：桃園市" v-model="addressData.county">
</div>

<div class="col-12 col-md-4 d-flex align-items-center">
  <span for="district" class="form-label">鄉鎮市區</span>
  <input type="text" id="district" class="form-control" placeholder="如：中壢區" v-model="addressData.district">
</div>

<div class="col-12 col-md-4 d-flex align-items-center">
  <span for="street" class="form-label">路街名稱</span>
  <input type="text" id="street" class="form-control" placeholder="如：健行路" v-model="addressData.street">
</div>

<div class="col-12 col-md-4 d-flex align-items-center">
  <span for="lane" class="form-label">巷弄</span>
  <input type="text" id="lane" class="form-control" placeholder="如：12巷3弄" v-model="addressData.lane">
</div>

<div class="col-12 col-md-6 d-flex align-items-center">
  <span for="number" class="form-label">門牌號碼</span>
  <input type="text" id="number" class="form-control" placeholder="如：229號" v-model="addressData.number">
</div>

<div class="col-12 col-md-2 d-flex align-items-center">
  <span for="zip" class="form-label">郵遞區號</span>
  <input type="text" id="zip" class="form-control" placeholder="如：320" v-model="addressData.zip">
</div>
						</div>
					</div> -->
					<p class="display-text">320桃園市中壢區健行路229號</p>
				</div>
			</div>


			<button id="toggleContactEditBtn" data-edit-text="修改聯繫方式"
				class="btn btn-sm btn-outline-primary mt-2">修改聯繫方式</button>
		</section>

		<!-- 🔐 隱私與安全性 -->
		<section class="mb-4">
			<h5>隱私與安全性</h5>
			<div class="soild"></div>

			<div id="accountSection" class="inp_modle towline edit-section">
				<label class="form-label">帳號</label>
				<div class="d-flex align-items-center w-100">
					<input type="email" value="myusername" class="edit-input" style="display:none;">
					<p class="display-text">myusername</p>
					<button id="toggleAccountEditBtn" class="btn btn-sm btn-outline-primary ms-2"
						data-edit-text="修改帳號">修改帳號</button>
				</div>
			</div>

			<div id="passwordSection" class="inp_modle towline edit-section">
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
	data() {
  return {
	info: {
        nickname: '長安不問',
        gender: '男性',
        birthday: '2000-01-01',
        intro: '天地玄黃，宇宙洪荒...',
      },
    
	contact: {
        email: 'user@example.com',
        phone: '0912345678',
		addressData: {
			county: "桃園市",
			district: "中壢區",
			street: "健行路",
			lane: "12巷3弄",
			number: "229號",
			zip: "320"
		},
      },
  };
},
// computed: {
//   fullAddress() {
//     const { county, district, street, lane, number, zip } = this.addressData;
//     // 先檢查每個欄位是否有填，避免空值產生多餘空格
//     return [zip, county, district, street, lane, number]
//       .filter(part => part && part.trim() !== '')
//       .join('');
//   }
// },
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
	// 編輯項目
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
						// 或許把這個換掉就可以在inp_model下抓多個輸入框
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

<style scoped>
/* 資訊管理 */
#settings {

	/* 留出左右空白 */
	section {
		padding: 0 30px;
	}

	/* 小區標題 */
	h5 {
		margin: 0;
		font-size: 28px;
		font-family: "王翰宗粗鋼體";
		color: var(--main-color);
	}

	.soild {
		margin: 10px 0;
		height: 2px;
		background-color: var(--main-color);
	}

	/* 各項資料顯示修改區 */
	.inp_modle {
		display: flex;
		align-items: center;
		margin-bottom: 10px;

		/* 左邊名稱 */
		label {
			/* 不允許縮小 */
			flex-shrink: 0;
			margin: 0;
			width: 118px;
			height: 40px;
			font-size: 22px;
			font-family: "王翰宗顏楷體";
			color: var(--second-color);
			line-height: 40px;
		}

		/* 右邊內容 */
		p {
			height: 40px;
			font-size: 22px;
			font-family: initial;
			color: var(--second-text-color);
			line-height: 40px;
		}

		/* 輸入框高度 */
		input,
		select {
			height: 40px;
		}

		/* 個人簡介 */
		textarea {
			align-items: start;
			height: 100px;
		}

		/* 細調下拉式文字位置 */
		select {
			padding-left: 5px;
		}

	}

	/* 各項資料顯示修改區－兩行式 */
	.inp_modle.towline {
		flex-direction: column;
		align-items: flex-start;

		/* 上方文字行 */
		.label-badge {
			display: flex;
			align-items: center;
		}

		input,
		p {
			width: 100%;
		}

		button {
			width: 120px;
		}
	}

	/* 清除 .form-select 的圓角和 focus 樣式 */
	.form-select {
		border-radius: 0;

		&:focus {
			/* 邊框顏色 */
			border-color: var(--quote-text-color);
			/* 去掉點選時的藍色光暈改成內陰影 */
			box-shadow: inset -2px -2px 4px var(--second-back-color-transluc);
		}
	}

	/* 編輯區塊 */
	.edit-section {
		z-index: 100;
		padding-top: 10px;
		padding-bottom: 20px;
	}

	/* 編輯區塊－編輯時白色高亮 */
	.edit-section.editing {
		position: relative;
		z-index: 999;

		background-color: var(--back-color-white);
		box-shadow: 0 0 15px var(--second-back-color-transluc);

		font-family: none;
	}

	/* 帳號密碼 */
	#accountSection.edit-section,
	#passwordSection.edit-section {
		margin-bottom: -20px;
	}

	/* 帳號密碼編輯狀態增加左右白色區域 */
	#accountSection.edit-section.editing,
	#passwordSection.edit-section.editing {
		&::before {
			content: "";
			position: absolute;
			top: 0;
			bottom: 0;
			left: -40px;
			right: -40px;
			background-color: var(--back-color-white);
			box-shadow: 0 0 15px var(--second-back-color-transluc);
			z-index: -1;
		}
	}

	/* 地址排版設定 */
	#address {

		/* 郵遞區號 */
		#zip {}

		/* 縣市 */
		#county {}

		/* 區/鄉/鎮 */
		#district {}

		/* 街路 */
		#street {}

		/* 巷弄 */
		#lane {}

		/* 門牌號碼 */
		#number {}
	}
}
</style>
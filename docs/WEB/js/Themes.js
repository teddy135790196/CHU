// 切換主題
document.addEventListener("DOMContentLoaded", function () {
	const themeSelector = document.getElementById("themeSelector");

	// 初次載入時套用已儲存的主題
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
});
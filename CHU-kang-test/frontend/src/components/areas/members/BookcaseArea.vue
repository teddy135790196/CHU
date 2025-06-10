<template>
	<!-- 區塊：書櫃管理－始 -->
	<div class="selectContent" id="bookcase">
		<!-- <h5 class="mb-3">書櫃展示（僅展示效果，未實作，等設計好的商品卡片。這段會刪掉）</h5> -->
		<div class="section-divider mb-4">
			<h5 class="section-title accordion-header" id="headingOne">
				<button class="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#collapseOne" aria-expanded="true" aria-controls="collapseOne">
					我的最愛
				</button>
			</h5>
		</div>
		<div id="collapseOne" class="accordion-collapse collapse show" aria-labelledby="headingOne" >
			<div class="accordion-body">
				<div class="row mb-5 g-3">
					<div class="position-relative">
						<!-- 左右按鈕 -->
						<button
							class="scroll-btn left btn btn-light position-absolute top-50 start-0 translate-middle-y z-3">←</button>
						<button
							class="scroll-btn right btn btn-light position-absolute top-50 end-0 translate-middle-y z-3">→</button>

						<!-- 可水平捲動的容器 -->
						<div class="d-flex overflow-auto gap-3 px-4 scroll-container" style="scroll-behavior: smooth;">
							<!-- 一本書 -->
							<div class="card" style="width: 12rem; flex: 0 0 auto;">
								<img src="@/assets/images/book3.png" class="card-img-top" alt="書封">
								<div class="card-body">
									<h5 class="card-title fw-bold text-truncate">秋山煙嵐</h5>
									<p class="card-text text-end text-truncate"><small>清笛吹夜</small></p>
									<div class="d-flex justify-content-between align-items-center">
										<select class="form-select form-select-sm w-auto">
											<option>❤想看</option>
											<option>👁在讀</option>
											<option selected>🏅已讀</option>
										</select>
										<button class="btn btn-sm btn-outline-danger">移除</button>
									</div>
								</div>
							</div>
							<!-- 加更多卡片 -->
						</div>
					</div>
				</div>
			</div>
		</div>


		<div class="section-divider mb-4">
			<h5 class="section-title accordion-header" id="headingTwo">
				<button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseTwo" aria-expanded="false" aria-controls="collapseTwo">
					願望清單書籍
				</button>
			</h5>
		</div>
		<div id="collapseTwo" class="accordion-collapse collapse" aria-labelledby="headingTwo" >
			<div class="accordion-body">
				<div class="row mb-5 g-3">
					<div class="position-relative">
						<!-- 左右按鈕 -->
						<button
							class="scroll-btn left btn btn-light position-absolute top-50 start-0 translate-middle-y z-3">←</button>
						<button
							class="scroll-btn right btn btn-light position-absolute top-50 end-0 translate-middle-y z-3">→</button>

						<!-- 可水平捲動的容器 -->
						<div class="d-flex overflow-auto gap-3 px-4 scroll-container" style="scroll-behavior: smooth;">
							<!-- 一本書 -->
							<div class="card" style="width: 12rem; flex: 0 0 auto;">
								<img src="@/assets/images/book5.png" class="card-img-top" alt="書封">
								<div class="card-body">
									<h5 class="card-title fw-bold text-truncate">信仰的仰望：在光與影中追尋</h5>
									<p class="card-text text-end text-truncate"><small>薇薇安·夜歌</small>
									</p>
									<div class="d-flex justify-content-between align-items-center">
										<select class="form-select form-select-sm w-auto">
											<option>❤想看</option>
											<option>👁在讀</option>
											<option>🏅已讀</option>
										</select>
										<button class="btn btn-sm btn-outline-danger">移除</button>
									</div>
								</div>
							</div>
							<!-- 一本書 -->
							<div class="card" style="width: 12rem; flex: 0 0 auto;">
								<img src="@/assets/images/book6.png" class="card-img-top" alt="書封">
								<div class="card-body">
									<h5 class="card-title fw-bold text-truncate">潮汐的印記：探尋古老信仰的邊界</h5>
									<p class="card-text text-end text-truncate"><small>薇薇安·夜歌</small>
									</p>
									<div class="d-flex justify-content-between align-items-center">
										<select class="form-select form-select-sm w-auto">
											<option>❤想看</option>
											<option>👁在讀</option>
											<option>🏅已讀</option>
										</select>
										<button class="btn btn-sm btn-outline-danger">移除</button>
									</div>
								</div>
							</div>
							<!-- 加更多卡片 -->
						</div>
					</div>
				</div>
			</div>
		</div>


		<div class="section-divider mb-4">
			<h5 class="section-title accordion-header" id="headingThree">
				<button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseThree" aria-expanded="false" aria-controls="collapseThree">
					擁有書籍
				</button>
			</h5>
		</div>
		<div id="collapseThree" class="accordion-collapse collapse" aria-labelledby="headingTwo" >
			<div class="accordion-body">
				<div class="row mb-5 g-3">
					<div class="position-relative">
						<!-- 左右按鈕 -->
						<button
							class="scroll-btn left btn btn-light position-absolute top-50 start-0 translate-middle-y z-3">←</button>
						<button
							class="scroll-btn right btn btn-light position-absolute top-50 end-0 translate-middle-y z-3">→</button>

						<!-- 可水平捲動的容器 -->
						<div class="d-flex overflow-auto gap-3 px-4 scroll-container" style="scroll-behavior: smooth;">
							<!-- 一本書 -->
							<div class="card" style="width: 12rem; flex: 0 0 auto;">
								<img src="@/assets/images/book1.png" class="card-img-top" alt="書封">
								<div class="card-body">
									<h5 class="card-title fw-bold text-truncate">春水遊鯉</h5>
									<p class="card-text text-end text-truncate"><small>清笛吹夜</small></p>
									<div class="d-flex justify-content-between align-items-center">
										<select class="form-select form-select-sm w-auto">
											<option>❤想看</option>
											<option selected>👁在讀</option>
											<option>🏅已讀</option>
										</select>
										<button class="btn btn-sm btn-outline-danger">移除</button>
									</div>
								</div>
							</div>
							<!-- 一本書 -->
							<div class="card" style="width: 12rem; flex: 0 0 auto;">
								<img src="@/assets/images/book2.png" class="card-img-top" alt="書封">
								<div class="card-body">
									<h5 class="card-title fw-bold text-truncate">夏木幽亭</h5>
									<p class="card-text text-end text-truncate"><small>清笛吹夜</small></p>
									<div class="d-flex justify-content-between align-items-center">
										<select class="form-select form-select-sm w-auto">
											<option>❤想看</option>
											<option>👁在讀</option>
											<option selected>🏅已讀</option>
										</select>
										<button class="btn btn-sm btn-outline-danger">移除</button>
									</div>
								</div>
							</div>
							<!-- 一本書 -->
							<div class="card" style="width: 12rem; flex: 0 0 auto;">
								<img src="@/assets/images/book3.png" class="card-img-top" alt="書封">
								<div class="card-body">
									<h5 class="card-title fw-bold text-truncate">秋山煙嵐</h5>
									<p class="card-text text-end text-truncate"><small>清笛吹夜</small></p>
									<div class="d-flex justify-content-between align-items-center">
										<select class="form-select form-select-sm w-auto">
											<option>❤想看</option>
											<option>👁在讀</option>
											<option selected>🏅已讀</option>
										</select>
										<button class="btn btn-sm btn-outline-danger">移除</button>
									</div>
								</div>
							</div>
							<!-- 一本書 -->
							<div class="card" style="width: 12rem; flex: 0 0 auto;">
								<img src="@/assets/images/book4.png" class="card-img-top" alt="書封">
								<div class="card-body">
									<h5 class="card-title fw-bold text-truncate">冬日翠峰</h5>
									<p class="card-text text-end text-truncate"><small>清笛吹夜</small></p>
									<div class="d-flex justify-content-between align-items-center">
										<select class="form-select form-select-sm w-auto">
											<option>❤想看</option>
											<option>👁在讀</option>
											<option selected>🏅已讀</option>
										</select>
										<button class="btn btn-sm btn-outline-danger">移除</button>
									</div>
								</div>
							</div>
							<!-- 加更多卡片 -->
						</div>
					</div>
				</div>
			</div>
		</div>

		
		<div class="section-divider mb-4">
			<h5 class="section-title accordion-header" id="headingFour">
				<button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseFour" aria-expanded="false" aria-controls="collapseFour">
					閱讀紀錄
				</button>
			</h5>
		</div>
		<div id="collapseFour" class="accordion-collapse collapse" aria-labelledby="headingTwo" >
			<div class="accordion-body">
				<div class="row mb-5 g-3">
					<div class="position-relative">
						<!-- 左右按鈕 -->
						<button
							class="scroll-btn left btn btn-light position-absolute top-50 start-0 translate-middle-y z-3">←</button>
						<button
							class="scroll-btn right btn btn-light position-absolute top-50 end-0 translate-middle-y z-3">→</button>

						<!-- 可水平捲動的容器 -->
						<div class="d-flex overflow-auto gap-3 px-4 scroll-container" style="scroll-behavior: smooth;">
							<!-- 一本書 -->
							<div class="card" style="width: 12rem; flex: 0 0 auto;">
								<img src="@/assets/images/book1.png" class="card-img-top" alt="書封">
								<div class="card-body">
									<h5 class="card-title fw-bold text-truncate">春水遊鯉</h5>
									<p class="card-text text-end text-truncate"><small>清笛吹夜</small></p>
									<div class="d-flex justify-content-end align-items-center">
										<button class="btn btn-sm btn-outline-danger">移除</button>
									</div>
								</div>
							</div>
							<!-- 一本書 -->
							<div class="card" style="width: 12rem; flex: 0 0 auto;">
								<img src="@/assets/images/book2.png" class="card-img-top" alt="書封">
								<div class="card-body">
									<h5 class="card-title fw-bold text-truncate">夏木幽亭</h5>
									<p class="card-text text-end text-truncate"><small>清笛吹夜</small></p>
									<div class="d-flex justify-content-end align-items-center">
										<button class="btn btn-sm btn-outline-danger">移除</button>
									</div>
								</div>
							</div>
							<!-- 一本書 -->
							<div class="card" style="width: 12rem; flex: 0 0 auto;">
								<img src="@/assets/images/book3.png" class="card-img-top" alt="書封">
								<div class="card-body">
									<h5 class="card-title fw-bold text-truncate">秋山煙嵐</h5>
									<p class="card-text text-end text-truncate"><small>清笛吹夜</small></p>
									<div class="d-flex justify-content-end align-items-center">
										<button class="btn btn-sm btn-outline-danger">移除</button>
									</div>
								</div>
							</div>
							<!-- 一本書 -->
							<div class="card" style="width: 12rem; flex: 0 0 auto;">
								<img src="@/assets/images/book4.png" class="card-img-top" alt="書封">
								<div class="card-body">
									<h5 class="card-title fw-bold text-truncate">冬日翠峰</h5>
									<p class="card-text text-end text-truncate"><small>清笛吹夜</small></p>
									<div class="d-flex justify-content-end align-items-center">
										<button class="btn btn-sm btn-outline-danger">移除</button>
									</div>
								</div>
							</div>
							<!-- 加更多卡片 -->
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
export default {
	name: "BookcaseArea",
	mounted() {
		this.setupScrollButtons();
	},
	methods: {
		setupScrollButtons() {
			this.$nextTick(() => {
				const scrollBlocks = this.$el.querySelectorAll('.position-relative');

				scrollBlocks.forEach(block => {
					const container = block.querySelector('.scroll-container');
					const btnLeft = block.querySelector('.scroll-btn.left');
					const btnRight = block.querySelector('.scroll-btn.right');
					const scrollAmount = 200;

					if (btnLeft && btnRight && container) {
						btnLeft.addEventListener('click', () => {
							container.scrollLeft -= scrollAmount;
						});

						btnRight.addEventListener('click', () => {
							container.scrollLeft += scrollAmount;
						});
					}
				});
			});
		}
	}
};
</script>

<style scoped>
.section-divider {
	display: flex;
	align-items: center;
	text-align: center;
}

/* 置中 */
.section-divider h5 {
	line-height: 28px;
	margin: 0;
	color: var(--second-color);
	font-family: "王翰宗中行書";

	button{
		font-size: 30px;
	}
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
</style>
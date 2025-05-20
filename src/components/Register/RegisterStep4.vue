<template>
	<!-- Step 4 -->
	<div :class="['step', nowStep === 4 ? 'active-step' : '']">
		<h4>【肆．確認您的資料並驗證】</h4>

		<p>暱稱：{{ form.nickname }}</p>
		<p>性別：{{ genderText }}</p>
		<p>生日：{{ form.birth }}</p>
		<p>電子郵件：{{ form.email }}</p>
		<p>電話：{{ form.phone }}</p>
	</div>
</template>

<script>
export default {
	name: "RegisterStep4",
  props: {
    nowStep: Number,
    form: {
      type: Object,
      required: true
    }
  },
  computed: {
  genderText() {
    switch (this.form.gender) {
      case 'male': return '男';
      case 'female': return '女';
      case 'hidden': return '隱藏';
      default: return '未選擇';
    }
  }
}
}
</script>


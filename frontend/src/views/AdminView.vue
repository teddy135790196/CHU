<template>
	<div class="container d-flex justify-content-center align-items-center vh-100">
		<div class="card p-4 shadow" style="max-width: 400px; width: 100%;">
			<h3 class="text-center mb-4">後台登入</h3>
			<form @submit.prevent="login">
				<div class="mb-3">
					<label for="username" class="form-label">帳號</label>
					<input type="text" id="username" v-model="username" class="form-control" required />
				</div>
				<div class="mb-3">
					<label for="password" class="form-label">密碼</label>
					<input type="password" id="password" v-model="password" class="form-control" required />
				</div>
				<button type="submit" class="btn btn-primary w-100">登入</button>
			</form>
			<div v-if="error" class="alert alert-danger mt-3">{{ error }}</div>
		</div>
	</div>
</template>

<script>
export default {
	name: 'AdminView',
	data() {
		return {
			username: '',
			password: '',
			error: ''
		};
	},
	methods: {
		login() {
			// 簡單驗證，實際可連接API
			if (this.username === 'admin' && this.password === '1234') {
				// 設定登入狀態 (這邊用localStorage模擬)
				localStorage.setItem('isAdmin', 'true');
				// 導向管理首頁
				this.$router.push('/admin/home');
			} else {
				this.error = '帳號或密碼錯誤';
			}
		}
	}
};
</script>

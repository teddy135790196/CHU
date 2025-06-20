const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  publicPath: '/', // 確保部署路徑正確

  devServer: {
    allowedHosts: 'all', // 允許所有主機頭，解決部署時 "Invalid Host header" 的問題
    proxy: {
      '/api': { // 將 /api 的請求代理到後端服務
        target: 'http://localhost:3000',
        changeOrigin: true,
        pathRewrite: { '^/api': '' },
      }
    }
  }
})

const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  publicPath: '/', // 確保部署路徑正確

  devServer: {
    proxy: {
      '/api': { // 將 /api 的請求代理到後端服務
        target: 'http://localhost:3000',
        changeOrigin: true,
        pathRewrite: { '^/api': '' },
      }
    }
  }
})

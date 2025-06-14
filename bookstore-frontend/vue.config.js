// vue.config.js
module.exports = {
  transpileDependencies: [],  // ✅ 正確寫法（必須是陣列）
  publicPath: './',
  devServer: {
    proxy: {
      '/api': {
        target: 'https://bookstore-backend-production.up.railway.app',
        changeOrigin: true
      }
    }
  }
};

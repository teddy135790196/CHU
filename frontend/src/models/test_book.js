// 模擬從 API 取得書籍資料
export function fetchBooks() {
  // 這裡改成真實 API 也行
  return Promise.resolve([
    { id: 1, title: 'Vue.js 入門', author: '小明' },
    { id: 2, title: 'JavaScript 高手', author: '小華' },
  ]);
}

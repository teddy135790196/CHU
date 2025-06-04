// controller import model
import { fetchBooks } from '../models/book';

export function getBooks() {
  return fetchBooks()
    .catch(err => {
      console.error('取得書籍失敗:', err);
      return [];
    });
}

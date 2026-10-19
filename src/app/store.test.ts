import { store } from './store'
import { borrowBook, fetchBooks } from '../features/books/booksSlice'
import type { Book } from '../types/books'

const books: Book[] = ['1', '2', '3', '4'].map((id) => ({
  id,
  title: `Sách ${id}`,
  author: 'Tác giả',
  category: 'CNTT',
  year: 2024,
  available: 1,
  total: 1,
  cover: 'cover-cream',
  coverText: `SÁCH ${id}`,
  accent: '#395b58'
}))

test('middleware chặn cuốn thứ tư và hiện cảnh báo', () => {
  store.dispatch(fetchBooks.fulfilled(books, 'request-id', undefined))
  books.forEach((book) => store.dispatch(borrowBook(book.id)))
  expect(store.getState().books.borrowedIds).toEqual(['1', '2', '3'])
  expect(store.getState().books.items[3].available).toBe(1)
  expect(store.getState().books.warning).toMatch(/tối đa 3 cuốn/)
})

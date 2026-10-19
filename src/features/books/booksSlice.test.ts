import reducer, { borrowBook, clearWarning, fetchBooks, initialState, returnBook, setWarning } from './booksSlice'
import type { Book } from '../../types/books'

const book: Book = { id: 'b1', title: 'Clean Code', author: 'Robert C. Martin', category: 'CNTT', year: 2008, available: 2, total: 3, cover: 'cover-cream', coverText: 'CLEAN CODE', accent: '#395b58' }
const loadedState = { ...initialState, items: [book], status: 'succeeded' as const }

describe('booksSlice', () => {
  test('chuyển sang trạng thái loading khi bắt đầu tải', () => {
    const state = reducer(initialState, fetchBooks.pending('request-id', undefined))
    expect(state.status).toBe('loading')
    expect(state.error).toBeNull()
  })

  test('lưu danh sách khi tải thành công', () => {
    const state = reducer(initialState, fetchBooks.fulfilled([book], 'request-id', undefined))
    expect(state.status).toBe('succeeded')
    expect(state.items).toEqual([book])
  })

  test('lưu thông báo khi tải thất bại', () => {
    const state = reducer(initialState, fetchBooks.rejected(null, 'request-id', undefined, 'Lỗi API'))
    expect(state.status).toBe('failed')
    expect(state.error).toBe('Lỗi API')
  })

  test('mượn sách giảm số bản và thêm vào danh sách đang mượn', () => {
    const state = reducer(loadedState, borrowBook('b1'))
    expect(state.items[0].available).toBe(1)
    expect(state.borrowedIds).toEqual(['b1'])
  })

  test('không mượn lại cùng một cuốn', () => {
    const borrowed = reducer(loadedState, borrowBook('b1'))
    const state = reducer(borrowed, borrowBook('b1'))
    expect(state.items[0].available).toBe(1)
    expect(state.borrowedIds).toEqual(['b1'])
  })

  test('trả sách tăng số bản và xóa khỏi danh sách đang mượn', () => {
    const borrowed = reducer(loadedState, borrowBook('b1'))
    const state = reducer(borrowed, returnBook('b1'))
    expect(state.items[0].available).toBe(2)
    expect(state.borrowedIds).toEqual([])
  })

  test('có thể xóa cảnh báo', () => {
    const warned = reducer(initialState, setWarning('Giới hạn'))
    expect(reducer(warned, clearWarning()).warning).toBeNull()
  })
})

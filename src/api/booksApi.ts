import type { ApiResult, Book } from '../types/books'

const books: Book[] = [
  { id: 'b1', title: 'Clean Code', author: 'Robert C. Martin', category: 'CNTT', year: 2008, available: 3, total: 4, cover: 'cover-cream', coverText: 'CLEAN\nCODE', accent: '#395b58' },
  { id: 'b2', title: 'Đắc Nhân Tâm', author: 'Dale Carnegie', category: 'Kinh tế', year: 1936, available: 2, total: 3, cover: 'cover-coral', coverText: 'ĐẮC\nNHÂN TÂM', accent: '#9f4f3f' },
  { id: 'b3', title: 'English Grammar in Use', author: 'Raymond Murphy', category: 'Ngoại ngữ', year: 2019, available: 4, total: 5, cover: 'cover-blue', coverText: 'ENGLISH\nGRAMMAR', accent: '#375775' },
  { id: 'b4', title: 'Design Patterns', author: 'Erich Gamma', category: 'CNTT', year: 1994, available: 1, total: 2, cover: 'cover-navy', coverText: 'DESIGN\nPATTERNS', accent: '#d5bb80' },
  { id: 'b5', title: 'Tư Duy Nhanh và Chậm', author: 'Daniel Kahneman', category: 'Kinh tế', year: 2011, available: 2, total: 3, cover: 'cover-yellow', coverText: 'TƯ DUY\nNHANH & CHẬM', accent: '#4d4b40' },
  { id: 'b6', title: 'Minna no Nihongo I', author: '3A Corporation', category: 'Ngoại ngữ', year: 2013, available: 0, total: 2, cover: 'cover-mint', coverText: 'みんなの\n日本語', accent: '#397168' },
  { id: 'b7', title: 'The Pragmatic Programmer', author: 'Andrew Hunt', category: 'CNTT', year: 2019, available: 2, total: 3, cover: 'cover-purple', coverText: 'PRAGMATIC\nPROGRAMMER', accent: '#e5caa2' },
  { id: 'b8', title: 'Atomic Habits', author: 'James Clear', category: 'Kinh tế', year: 2018, available: 3, total: 3, cover: 'cover-white', coverText: 'ATOMIC\nHABITS', accent: '#8a7047' },
  { id: 'b9', title: 'Oxford Word Skills', author: 'Ruth Gairns', category: 'Ngoại ngữ', year: 2020, available: 2, total: 2, cover: 'cover-sky', coverText: 'WORD\nSKILLS', accent: '#356d87' },
  { id: 'b10', title: 'Introduction to Algorithms', author: 'Thomas H. Cormen', category: 'CNTT', year: 2022, available: 1, total: 2, cover: 'cover-red', coverText: 'ALGORITHMS', accent: '#f1dbc4' },
  { id: 'b11', title: 'Nhà Đầu Tư Thông Minh', author: 'Benjamin Graham', category: 'Kinh tế', year: 1949, available: 2, total: 2, cover: 'cover-green', coverText: 'NHÀ ĐẦU TƯ\nTHÔNG MINH', accent: '#e3dcbb' },
  { id: 'b12', title: 'Từ Điển Hàn Việt', author: 'Lê Huy Khoa', category: 'Ngoại ngữ', year: 2017, available: 1, total: 2, cover: 'cover-pink', coverText: '한국어\nVIỆT', accent: '#804b5b' }
]

export function getBooks(shouldFail = false): Promise<ApiResult<Book[]>> {
  return new Promise((resolve) => {
    setTimeout(() => {
      if (shouldFail) {
        resolve({ ok: false, error: 'Không thể tải danh sách sách. Vui lòng thử lại.' })
        return
      }
      resolve({ ok: true, data: books.map((book) => ({ ...book })) })
    }, 500)
  })
}

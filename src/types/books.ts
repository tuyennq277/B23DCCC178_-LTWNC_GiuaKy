export const categories = ['CNTT', 'Kinh tế', 'Ngoại ngữ'] as const

export type Category = (typeof categories)[number]
export type CategoryFilter = Category | 'Tất cả'

export interface Book {
  id: string
  title: string
  author: string
  category: Category
  year: number
  available: number
  total: number
  cover: string
  coverText: string
  accent: string
}

export type BookInventory = Readonly<Pick<Book, 'id' | 'available' | 'total'>>

export function isBookAvailable(book: BookInventory): boolean {
  return book.available > 0
}

export type ApiResult<T> = { ok: true; data: T } | { ok: false; error: string }

export function isApiSuccess<T>(result: ApiResult<T>): result is { ok: true; data: T } {
  return result.ok === true
}

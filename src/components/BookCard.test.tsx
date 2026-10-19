import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { BookCard } from './BookCard'
import type { Book } from '../types/books'

const book: Book = { id: 'book-1', title: 'Clean Code', author: 'Robert C. Martin', category: 'CNTT', year: 2008, available: 2, total: 3, cover: 'cover-cream', coverText: 'CLEAN CODE', accent: '#395b58' }

describe('BookCard', () => {
  test('hiển thị đầy đủ thông tin cuốn sách', () => {
    render(<BookCard book={book} borrowed={false} onBorrow={jest.fn()} onReturn={jest.fn()} />)
    expect(screen.getByRole('heading', { name: 'Clean Code' })).toBeInTheDocument()
    expect(screen.getAllByText('Robert C. Martin')).toHaveLength(2)
    expect(screen.getByText('CNTT')).toBeInTheDocument()
    expect(screen.getByText('2008')).toBeInTheDocument()
    expect(screen.getByText('Còn 2/3 cuốn')).toBeInTheDocument()
  })

  test('nhấn Mượn gọi đúng hàm với đúng id', async () => {
    const onBorrow = jest.fn()
    render(<BookCard book={book} borrowed={false} onBorrow={onBorrow} onReturn={jest.fn()} />)
    await userEvent.click(screen.getByRole('button', { name: 'Mượn Clean Code' }))
    expect(onBorrow).toHaveBeenCalledTimes(1)
    expect(onBorrow).toHaveBeenCalledWith('book-1')
  })

  test('vô hiệu hóa nút Mượn khi hết bản', () => {
    render(<BookCard book={{ ...book, available: 0 }} borrowed={false} onBorrow={jest.fn()} onReturn={jest.fn()} />)
    expect(screen.getByRole('button', { name: 'Mượn Clean Code' })).toBeDisabled()
    expect(screen.getByText('Đã hết sách')).toBeInTheDocument()
  })

  test('nhấn Trả gọi đúng hàm với đúng id', async () => {
    const onReturn = jest.fn()
    render(<BookCard book={book} borrowed onBorrow={jest.fn()} onReturn={onReturn} />)
    await userEvent.click(screen.getByRole('button', { name: 'Trả Clean Code' }))
    expect(onReturn).toHaveBeenCalledWith('book-1')
  })
})

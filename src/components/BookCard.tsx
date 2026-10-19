import { memo } from 'react'
import { ArrowUpRight, Check, RotateCcw } from 'lucide-react'
import { isBookAvailable, type Book } from '../types/books'

interface BookCardProps {
  book: Book
  borrowed: boolean
  onBorrow: (id: string) => void
  onReturn: (id: string) => void
}

function BookCardComponent({ book, borrowed, onBorrow, onReturn }: BookCardProps) {
  const unavailable = !isBookAvailable(book)

  return (
    <article className="book-card">
      <div className={`book-cover ${book.cover}`} aria-hidden="true">
        <div className="cover-topline">MINI LIBRARY · COLLECTION</div>
        <div className="cover-title" style={{ color: book.accent }}>{book.coverText}</div>
        <div className="cover-bottomline">{book.author}</div>
      </div>
      <div className="book-body">
        <div className="book-meta"><span>{book.category}</span><span className="meta-dot" />{book.year}</div>
        <h3 title={book.title}>{book.title}</h3>
        <p className="book-author">{book.author}</p>
        <div className="book-bottom">
          <span className={`availability ${unavailable ? 'availability-empty' : ''}`}>
            <span className="availability-dot" />
            {unavailable ? 'Đã hết sách' : `Còn ${book.available}/${book.total} cuốn`}
          </span>
          {borrowed ? (
            <button className="book-action return-action" onClick={() => onReturn(book.id)} aria-label={`Trả ${book.title}`}>
              <RotateCcw size={15} /> Trả
            </button>
          ) : (
            <button className="book-action borrow-action" onClick={() => onBorrow(book.id)} disabled={unavailable} aria-label={`Mượn ${book.title}`}>
              {unavailable ? <Check size={15} /> : <ArrowUpRight size={16} />} Mượn
            </button>
          )}
        </div>
      </div>
    </article>
  )
}

export const BookCard = memo(BookCardComponent)

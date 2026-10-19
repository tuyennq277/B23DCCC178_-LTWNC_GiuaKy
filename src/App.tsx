import { lazy, Suspense, useCallback, useEffect, useMemo, useState } from 'react'
import { Link, NavLink, Route, Routes } from 'react-router-dom'
import { ArrowRight, BookOpen, ChartNoAxesCombined, ChevronDown, CircleAlert, LibraryBig, Menu, Moon, Search, Sun, X } from 'lucide-react'
import { useAppDispatch, useAppSelector } from './app/store'
import { BookCard } from './components/BookCard'
import { useTheme } from './context/ThemeContext'
import { borrowBook, clearWarning, fetchBooks, returnBook } from './features/books/booksSlice'
import { useFilterStore } from './features/filters/filterStore'
import { useDebounce } from './hooks/useDebounce'
import { categories, type CategoryFilter } from './types/books'

const StatsPage = lazy(() => import('./pages/StatsPage'))
const categoryOptions: CategoryFilter[] = ['Tất cả', ...categories]

function Header() {
  const { theme, toggleTheme } = useTheme()
  const borrowedCount = useAppSelector((state) => state.books.borrowedIds.length)
  const [menuOpen, setMenuOpen] = useState(false)

  return (
    <header className="site-header">
      <div className="header-inner page-width">
        <Link className="brand" to="/" onClick={() => setMenuOpen(false)}>
          <span className="brand-mark"><BookOpen size={24} strokeWidth={2.1} /></span>
          <span>mini<span className="brand-light">library</span><span className="brand-period">.</span></span>
        </Link>
        <nav className={`main-nav ${menuOpen ? 'nav-open' : ''}`} aria-label="Điều hướng chính">
          <NavLink to="/" end onClick={() => setMenuOpen(false)} className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}>Khám phá sách</NavLink>
          <NavLink to="/stats" onClick={() => setMenuOpen(false)} className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}>Thống kê</NavLink>
          <a className="nav-link" href="/#borrowed" onClick={() => setMenuOpen(false)}>Sách của tôi <span className="nav-count">{borrowedCount}</span></a>
        </nav>
        <div className="header-actions">
          <button className="theme-button" onClick={toggleTheme} aria-label={theme === 'light' ? 'Chuyển sang giao diện tối' : 'Chuyển sang giao diện sáng'} title={theme === 'light' ? 'Giao diện tối' : 'Giao diện sáng'}>
            {theme === 'light' ? <Moon size={19} /> : <Sun size={19} />}
          </button>
          <div className="profile"><span className="profile-avatar">SV</span><span className="profile-name">Sinh viên <ChevronDown size={14} /></span></div>
          <button className="mobile-menu-button" onClick={() => setMenuOpen((open) => !open)} aria-label="Mở menu">{menuOpen ? <X size={21} /> : <Menu size={21} />}</button>
        </div>
      </div>
    </header>
  )
}

function HomePage() {
  const dispatch = useAppDispatch()
  const { items, borrowedIds, status, error, warning } = useAppSelector((state) => state.books)
  const query = useFilterStore((state) => state.query)
  const category = useFilterStore((state) => state.category)
  const setQuery = useFilterStore((state) => state.setQuery)
  const setCategory = useFilterStore((state) => state.setCategory)
  const debouncedQuery = useDebounce(query, 300)
  const [showBorrowedOnly, setShowBorrowedOnly] = useState(false)

  const filteredBooks = useMemo(() => {
    const normalizedQuery = debouncedQuery.trim().toLocaleLowerCase('vi')
    return items.filter((book) =>
      (category === 'Tất cả' || book.category === category) &&
      (!showBorrowedOnly || borrowedIds.includes(book.id)) &&
      (book.title.toLocaleLowerCase('vi').includes(normalizedQuery) || book.author.toLocaleLowerCase('vi').includes(normalizedQuery))
    )
  }, [items, category, debouncedQuery, showBorrowedOnly, borrowedIds])

  const handleBorrow = useCallback((id: string) => { dispatch(borrowBook(id)) }, [dispatch])
  const handleReturn = useCallback((id: string) => { dispatch(returnBook(id)) }, [dispatch])
  const handleRetry = useCallback(() => { void dispatch(fetchBooks()) }, [dispatch])
  const handleReset = useCallback(() => {
    setQuery('')
    setCategory('Tất cả')
    setShowBorrowedOnly(false)
  }, [setQuery, setCategory])

  useEffect(() => {
    if (!warning) return
    const timer = window.setTimeout(() => dispatch(clearWarning()), 2000)
    return () => window.clearTimeout(timer)
  }, [warning, dispatch])

  const availableTitles = items.filter((book) => book.available > 0).length

  return (
    <>
      <section className="hero">
        <div className="page-width hero-inner">
          <div className="hero-copy">
            <div className="eyebrow"><span className="eyebrow-line" /> KHÔNG GIAN TRI THỨC CỦA BẠN</div>
            <h1>Mỗi cuốn sách,<br /><em>một cánh cửa mới.</em></h1>
            <p>Khám phá kho sách chuyên ngành, tìm cuốn bạn cần và mượn ngay chỉ trong vài thao tác.</p>
            <a href="#catalog" className="hero-cta">Khám phá thư viện <ArrowRight size={17} /></a>
          </div>
          <div className="hero-art" aria-hidden="true">
            <div className="hero-circle circle-outer" /><div className="hero-circle circle-inner" />
            <div className="hero-book hero-book-back"><span>THE ART OF<br />LEARNING</span><small>MINI LIBRARY</small></div>
            <div className="hero-book hero-book-front"><span>GROW<br />YOUR<br />MIND<span className="hero-book-star">✳</span></span><small>READ · DISCOVER · GROW</small></div>
            <div className="hero-spark spark-one">✳</div><div className="hero-spark spark-two">✦</div>
            <div className="hero-label"><BookOpen size={16} /> Học hỏi mỗi ngày</div>
          </div>
        </div>
      </section>

      <main className="page-width main-content">
        <section className="overview" aria-label="Tổng quan thư viện">
          <div className="overview-intro"><span className="small-kicker">THƯ VIỆN TRONG TẦM TAY</span><strong>Tri thức luôn sẵn sàng<br />cho hành trình của bạn.</strong></div>
          <div className="overview-stat"><span className="stat-icon stat-icon-green"><LibraryBig size={21} /></span><div><strong>{items.length.toString().padStart(2, '0')}</strong><span>Đầu sách</span></div></div>
          <div className="overview-stat"><span className="stat-icon stat-icon-orange"><BookOpen size={21} /></span><div><strong>{availableTitles.toString().padStart(2, '0')}</strong><span>Sách còn bản</span></div></div>
          <div className="overview-stat"><span className="stat-icon stat-icon-blue"><ChartNoAxesCombined size={21} /></span><div><strong>{borrowedIds.length.toString().padStart(2, '0')}<small>/03</small></strong><span>Đang mượn</span></div></div>
        </section>

        {warning && <div className="warning-banner warning-toast" role="alert"><CircleAlert size={21} /><div className="warning-copy"><strong>Đã đạt giới hạn mượn</strong><span>{warning}</span></div><button onClick={() => dispatch(clearWarning())} aria-label="Đóng cảnh báo"><X size={18} /></button></div>}

        <section className="catalog" id="catalog">
          <div className="section-heading"><div><span className="small-kicker">BỘ SƯU TẬP CỦA CHÚNG TÔI</span><h2>Khám phá kho sách<span>.</span></h2><p>Tìm cảm hứng mới từ những đầu sách được tuyển chọn cho bạn.</p></div><Link to="/stats" className="text-link">Xem thống kê <ArrowRight size={17} /></Link></div>
          <div className="catalog-toolbar">
            <div className="category-tabs" role="group" aria-label="Lọc theo thể loại">
              {categoryOptions.map((option) => <button key={option} className={category === option && !showBorrowedOnly ? 'tab active' : 'tab'} onClick={() => { setCategory(option); setShowBorrowedOnly(false) }}>{option}</button>)}
              <button className={showBorrowedOnly ? 'tab active' : 'tab'} onClick={() => setShowBorrowedOnly(true)}>Đang mượn <span className="tab-count">{borrowedIds.length}</span></button>
            </div>
            <label className="search-box"><Search size={19} /><input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Tìm tên sách, tác giả..." aria-label="Tìm sách theo tên hoặc tác giả" />{query && <button onClick={() => setQuery('')} aria-label="Xóa tìm kiếm"><X size={16} /></button>}</label>
          </div>
          <div className="result-line"><span>Hiển thị <strong>{filteredBooks.length}</strong> cuốn sách</span><span className="result-note">Chọn cuốn sách phù hợp với bạn <span>✳</span></span></div>

          {status === 'loading' || status === 'idle' ? <div className="state-box" role="status"><div className="loader" />Đang tải...</div> : status === 'failed' ? <div className="state-box error-box" role="alert"><CircleAlert size={28} /><h3>Không thể tải sách</h3><p>{error}</p><button className="primary-button" onClick={handleRetry}>Thử lại</button></div> : filteredBooks.length > 0 ? <div className="books-grid">{filteredBooks.map((book) => <BookCard key={book.id} book={book} borrowed={borrowedIds.includes(book.id)} onBorrow={handleBorrow} onReturn={handleReturn} />)}</div> : <div className="state-box empty-box"><Search size={30} /><h3>Chưa tìm thấy cuốn sách nào</h3><p>Thử từ khóa hoặc thể loại khác nhé.</p><button className="primary-button" onClick={handleReset}>Xóa bộ lọc</button></div>}
        </section>

        <section className="borrowed-panel" id="borrowed"><div><span className="small-kicker">GÓC HỌC TẬP CỦA BẠN</span><h2>Sách bạn đang mượn</h2><p>{borrowedIds.length === 0 ? 'Bạn chưa mượn cuốn nào. Hãy chọn một cuốn sách để bắt đầu nhé!' : `Bạn đang mượn ${borrowedIds.length}/3 cuốn sách. Chúc bạn đọc thật vui!`}</p></div><button onClick={() => { setShowBorrowedOnly(true); document.getElementById('catalog')?.scrollIntoView({ behavior: 'smooth' }) }}>Xem sách của tôi <ArrowRight size={17} /></button></section>
      </main>
    </>
  )
}

function Footer() {
  return <footer className="site-footer"><div className="page-width footer-inner"><span className="footer-brand"><BookOpen size={18} /> minilibrary.</span><span>Không gian đọc sách dành cho sinh viên · 2026</span><span>Đọc nhiều hơn, khám phá xa hơn ✳</span></div></footer>
}

export default function App() {
  const dispatch = useAppDispatch()
  useEffect(() => { void dispatch(fetchBooks()) }, [dispatch])

  return <div className="app-shell"><Header /><Routes><Route path="/" element={<HomePage />} /><Route path="/stats" element={<Suspense fallback={<div className="page-width state-box" role="status">Đang tải...</div>}><StatsPage /></Suspense>} /></Routes><Footer /></div>
}

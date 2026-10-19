import { Link } from 'react-router-dom'
import { ArrowLeft, ArrowRight, BookOpen, ChartNoAxesCombined, LibraryBig } from 'lucide-react'
import { useAppDispatch, useAppSelector } from '../app/store'
import { fetchBooks } from '../features/books/booksSlice'
import { categories } from '../types/books'

const categoryStyles: Record<(typeof categories)[number], string> = {
  CNTT: 'category-tech',
  'Kinh tế': 'category-business',
  'Ngoại ngữ': 'category-language'
}

export default function StatsPage() {
  const dispatch = useAppDispatch()
  const { items, borrowedIds, status, error } = useAppSelector((state) => state.books)
  const total = items.length
  const availableCopies = items.reduce((sum, book) => sum + book.available, 0)

  return <main className="page-width stats-page">
    <Link to="/" className="back-link"><ArrowLeft size={17} /> Quay lại thư viện</Link>
    <div className="stats-heading"><div><span className="small-kicker">THƯ VIỆN QUA NHỮNG CON SỐ</span><h1>Góc thống kê<span>.</span></h1><p>Một cái nhìn tổng quan về kho sách và hành trình đọc của bạn.</p></div><div className="stats-heading-icon"><ChartNoAxesCombined size={38} /></div></div>
    {status === 'loading' || status === 'idle' ? <div className="state-box" role="status">Đang tải...</div> : status === 'failed' ? <div className="state-box error-box" role="alert"><h3>Không thể tải thống kê</h3><p>{error}</p><button className="primary-button" onClick={() => { void dispatch(fetchBooks()) }}>Thử lại</button></div> : <>
      <div className="stats-summary"><div className="summary-card"><span className="summary-icon"><LibraryBig size={23} /></span><span>Tổng đầu sách</span><strong>{total.toString().padStart(2, '0')}</strong><small>đầu sách trong thư viện</small></div><div className="summary-card"><span className="summary-icon orange"><BookOpen size={23} /></span><span>Số bản còn lại</span><strong>{availableCopies.toString().padStart(2, '0')}</strong><small>sẵn sàng để mượn</small></div><div className="summary-card"><span className="summary-icon blue"><ChartNoAxesCombined size={23} /></span><span>Bạn đang mượn</span><strong>{borrowedIds.length.toString().padStart(2, '0')}<em>/03</em></strong><small>cuốn sách cùng lúc</small></div></div>
      <section className="category-section"><div className="section-heading"><div><span className="small-kicker">PHÂN LOẠI KHO SÁCH</span><h2>Sách theo thể loại<span>.</span></h2><p>Khám phá các lĩnh vực tri thức đang chờ bạn.</p></div></div><div className="category-grid">{categories.map((category, index) => { const count = items.filter((book) => book.category === category).length; return <div className={`category-card ${categoryStyles[category]}`} key={category}><div className="category-card-top"><span>0{index + 1} / THỂ LOẠI</span><BookOpen size={24} /></div><div><strong>{count.toString().padStart(2, '0')}</strong><h3>{category}</h3><p>{count} đầu sách để khám phá</p></div><div className="category-progress"><span style={{ width: `${total ? count / total * 100 : 0}%` }} /></div></div> })}</div></section>
      <div className="stats-bottom"><span>Đã sẵn sàng tìm cuốn sách tiếp theo?</span><Link to="/">Khám phá sách <ArrowRight size={17} /></Link></div>
    </>}
  </main>
}

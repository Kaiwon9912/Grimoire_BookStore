import { useEffect, useState } from 'react'
import { useFetch } from '../hooks/useFetch'
import { supabase } from '../lib/supabaseClient'
import BookCard from '../components/bookCard'
import { Search } from 'lucide-react'
import Chatbot from '../components/chatbot'
const LIMIT = 24

const CategoriesPage = () => {
  const { data: categories, loading: loadingCategories } = useFetch('Categories')
  const [selectedCategory, setSelectedCategory] = useState(null)
  const [books, setBooks] = useState([])
  const [page, setPage] = useState(1)
  const [totalBooks, setTotalBooks] = useState(0)
  const [sort, setSort] = useState('newest')
 

  useEffect(() => {
    fetchBooks()
  }, [selectedCategory, page, sort])

  const fetchBooks = async () => {
    let query = supabase.from('Book').select('*', { count: 'exact' })

    if (selectedCategory) {
      query = query.eq('category_id', selectedCategory)
    }

    // Apply sorting
    switch (sort) {
      case 'name':
        query = query.order('title', { ascending: true })
        break
      case 'price':
        query = query.order('price', { ascending: true })
        break
      case 'price-desc':
        query = query.order('price', { ascending: false })
        break
      default:
        query = query.order('created_at', { ascending: false })
    }

    query = query.range((page - 1) * LIMIT, page * LIMIT - 1)

    const { data, count } = await query
    setBooks(data || [])
    setTotalBooks(count || 0)
  }

  const totalPages = Math.ceil(totalBooks / LIMIT)

  return (
    <div className="flex px-4 md:px-16 py-10 gap-8 bg-gray-900">
      <Chatbot/>
      {/* Left sidebar */}
      <aside className="w-1/4  space-y-3 bg-gradient-to-br from-black to-green-900/50 rounded-lg">
        <h2 className="text-xl font-bangers text-left p-4 border-green text-white border-b-2"> Thể loại</h2>
        <button onClick={() => setSelectedCategory(null)} className={`text-left block w-full px-4 py-2 rounded-lg font-bangers ${selectedCategory === null ? 'bg-green-800 text-white' : 'hover:bg-green-700 text-gray-300'}`}>
          Tất cả
        </button>
        {loadingCategories ? (
          <p className="text-white">Đang tải...</p>
        ) : (
          categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => {
                setSelectedCategory(cat.id)
                setPage(1)
              }}
              className={`block text- w-full px-4 py-2 rounded-lg  text-left  ${selectedCategory === cat.id ? 'bg-green-800 text-white' : 'hover:bg-green-700 text-gray-300'}`}
            >
              {cat.name}
            </button>
          ))
        )}
      </aside>

      {/* Right content */}
      <main className="w-3/4">
        <div className="flex justify-between items-center mb-4  rounded-lg py-4">
        <div className="relative flex items-center w-full mx-4 ">
          <input
            type="text"
            placeholder="Tìm kiếm..."
            className="bg-gray-900 text-white rounded-full py-2 pl-5 pr-4 w-full border border-green-600 focus:outline-none focus:ring-2 focus:ring-green-600"
          />
          <Search size={20} className="absolute right-4 top-1/2 transform -translate-y-1/2 text-green-400" />
        </div>

          {/* Sort Dropdown */}
          <select
            value={sort}
            onChange={(e) => {
              setSort(e.target.value)
              setPage(1)
            }}
            className="bg-black text-white border border-gray-600 px-3 py-1 rounded-lg"
          >
            <option value="newest">Mới nhất</option>
            <option value="price">Giá tăng dần</option>
            <option value="price-desc">Giá giảm dần</option>
          </select>
        </div>

        {/* Books */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {books.map((book) => (
            <BookCard  key={book.id} book={book} />
          ))}
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
  <div className="flex justify-center mt-6 space-x-2">
    {(() => {
      const pages = [];
      if (totalPages <= 7) {
        // Nếu tổng số trang ít, hiển thị tất cả
        for (let i = 1; i <= totalPages; i++) pages.push(i);
      } else {
        // Luôn hiển thị trang đầu
        pages.push(1);

        // Hiển thị ... nếu cần
        if (page > 4) pages.push('...');

        // Các trang xung quanh trang hiện tại
        const start = Math.max(2, page - 2);
        const end = Math.min(totalPages - 1, page + 2);

        for (let i = start; i <= end; i++) {
          pages.push(i);
        }

        if (page < totalPages - 3) pages.push('...');

        // Trang cuối cùng
        pages.push(totalPages);
      }

      return pages.map((p, idx) =>
        p === '...' ? (
          <span key={`dots-${idx}`} className="px-2 py-2 text-gray-400">
            ...
          </span>
        ) : (
          <button
            key={p}
            onClick={() => setPage(p)}
            className={`px-4 py-2 rounded-lg ${
              page === p
                ? 'bg-green-700 text-white'
                : 'bg-gray-700 text-gray-300 hover:bg-green-600'
            }`}
          >
            {p}
          </button>
        )
      );
    })()}
  </div>
)}

      </main>
    </div>
  )
}

export default CategoriesPage

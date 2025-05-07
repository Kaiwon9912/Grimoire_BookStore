import { useEffect, useState } from 'react'
import { useFetch } from '../hooks/useFetch'
import { supabase } from '../lib/supabaseClient'
import BookCard from '../components/bookCard'

const LIMIT = 16

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
    <div className="flex px-4 md:px-16 py-10 gap-8">
      {/* Left sidebar */}
      <aside className="w-1/4 space-y-3 bg-gradient-to-br from-black to-green-900 rounded-lg">
        <h2 className="text-2xl font-bangers text-left p-4  text-white"> Thể loại</h2>
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
              className={`block w-full px-4 py-2 rounded-lg font-bangers text-left  ${selectedCategory === cat.id ? 'bg-green-800 text-white' : 'hover:bg-green-700 text-gray-300'}`}
            >
              {cat.name}
            </button>
          ))
        )}
      </aside>

      {/* Right content */}
      <main className="w-3/4">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-3xl font-bangers text-white">
            {selectedCategory ? '📚 Sách theo thể loại' : '📚 Tất cả sách'}
          </h2>

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
            <BookCard key={book.id} book={book} />
          ))}
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex justify-center mt-6 space-x-2">
            {Array.from({ length: totalPages }, (_, i) => (
              <button
                key={i + 1}
                onClick={() => setPage(i + 1)}
                className={`px-4 py-2 rounded-lg ${
                  page === i + 1 ? 'bg-green-700 text-white' : 'bg-gray-700 text-gray-300 hover:bg-green-600'
                }`}
              >
                {i + 1}
              </button>
            ))}
          </div>
        )}
      </main>
    </div>
  )
}

export default CategoriesPage

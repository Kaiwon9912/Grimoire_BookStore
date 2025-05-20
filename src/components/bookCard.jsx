import { Link } from 'react-router-dom'

const BookCard = ({ book }) => (
  <Link to={`/book/${book.book_id}`} className="relative w-32 group transition skew-y-3  border-t-4 border-r-8 border-gray-200  ">
    <div className="book-card-container h-48 relative">

      <div className="absolute inset-0 bg-slate-50 flex flex-col justify-between p-3 space-y-1 z-10">
        <h3 className="font-semibold text-xs text-black">{book.title}</h3>
        <p className="text-blue-600 font-bold">{book.price?.toLocaleString()} ₫</p>
      </div>

      <div className="book-cover absolute inset-0 z-20 group-hover:-translate-x-[120px] group-hover:-scale-x-100 transition-transform duration-300">
        <img
          src={book.cover_url}
          alt={book.title}
          className="h-full w-full object-cover"
        />
      </div>
    </div>
  </Link>
)

export default BookCard
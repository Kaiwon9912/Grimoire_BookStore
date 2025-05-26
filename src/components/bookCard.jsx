import { Link } from 'react-router-dom'

const BookCard = ({ book }) => (
  <Link
    to={`/book/${book.book_id}`}
    className="relative w-32 group transition duration-300 border-t-4 border-r-8 border-gray-200"
  >
    {/* Responsive card container */}
    <div className="book-card-container h-48 relative hidden lg:block">
      {/* Overlay title & price */}
      <div className="absolute inset-0 bg-slate-50 flex flex-col justify-between p-3 space-y-1 z-10">
        <h3 className="font-semibold text-xs text-black">{book.title}</h3>
        <p className="text-blue-600 font-bold">{book.price?.toLocaleString('de-DE')}₫</p>
      </div>

      {/* Cover image with flip animation */}
      <div className="book-cover absolute inset-0 z-20 group-hover:-translate-x-[120px] group-hover:-scale-x-100 transition-transform duration-300">
        <img
          src={book.cover_url}
          alt={book.title}
          className="h-full w-full object-cover"
        />
      </div>
    </div>

    {/* For md and up (no flip) */}
    <div className="block lg:hidden">
      <img
        src={book.cover_url}
        alt={book.title}
        className="h-48 w-full object-cover rounded-t"
      />
      <div className="bg-white p-2 text-center space-y-1 rounded-b shadow-md">
        <h3 className="font-semibold text-sm text-gray-900 truncate">{book.title}</h3>
        <p className="text-blue-600 font-bold text-sm">{book.price?.toLocaleString()} ₫</p>
      </div>
    </div>
  </Link>
)

export default BookCard

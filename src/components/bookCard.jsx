import { Link } from 'react-router-dom'

const BookCard = ({ book }) => (
  <Link to={`/book/${book.id}`} className="relative w-40 group transition rounded-xl overflow-hidden border-r-2">
    <img
      src={book.cover_url}
      alt={book.title}
      className="h-64 w-full object-cover group-hover: transition-transform duration-300"
    />
    
    {/* Overlay hiển thị khi hover */}
    <div className="absolute inset-0 bg-black/60 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-3 space-y-1">
      <h3 className="font-semibold text-base">{book.title}</h3>
      <p className="text-sm text-gray-200">{book.author}</p>
      <p className="text-blue-400 font-bold">{book.price?.toLocaleString()} ₫</p>
    </div>
  </Link>
)

export default BookCard

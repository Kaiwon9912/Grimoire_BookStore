import { motion } from 'framer-motion';
import { useNavigate, useParams } from 'react-router-dom';
import Chatbot from '../components/chatbot';
import { useFetch } from '../hooks/useFetch';
import { useCart } from './cartContext';
import { Star } from 'lucide-react'
import { useAuth } from '../context/authContext';
import ReviewSection from '../features/reviews/reviewSection';
const BookDetail = () => {

  const { book_id } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const { user } = useAuth();
  const {
    data: book,
    loading,
    error,
  } = useFetch('Book', {
    match: { book_id },
    single: true,
  });

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen bg-[#0a0a0a]">
        <p className="text-xl text-[#aaaaaa] font-bangers">Đang tải...</p>
      </div>
    );
  }

  if (error || !book) {
    return (
      <div className="flex justify-center items-center h-screen bg-[#0a0a0a]">
        <p className="text-xl text-red-500 font-bangers">
          {error || 'Không tìm thấy sách'}
        </p>
      </div>
    );
  }

  // Sample rating (replace with book.rating if available)
  const rating = book.rating || 4.5;
  const maxStars = 5;

  return (
    <>
      <div className="max-w-7xl text-sm m-auto  mt-5 p-2 text-white font-bold tracking-wide ">

        Trang chủ  {book.categoryId || 'Không xác định'}

      </div>

      <motion.div
        className="m-4 mt-3"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
      >
        <div className="max-w-7xl m-auto flex flex-col md:flex-row gap-8 border-green-500 border p-6 rounded-xl shadow-lg bg-[#1a1a1a] h-[600px]">

          {/* Bên trái: Hình ảnh và nút */}
          <motion.div
            className="w-full md:w-1/3 flex flex-col items-center justify-between"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <img
              src={book.cover_url || 'https://via.placeholder.com/200x300.png?text=No+Cover'}
              alt={book.title}
              className="w-60 h-[400px] object-cover rounded-lg shadow-lg"
            />
            <div className="flex flex-col gap-4 w-full mt-6">
              <motion.button
                className="bg-green-700 text-white py-2 px-4 rounded-lg font-semibold hover:bg-green-800 transition-colors w-full"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => addToCart({
                  id: book.book_id,
                  title: book.title,
                  price: book.price,
                  cover_url: book.cover_url,
                })}
              >
                Thêm vào giỏ hàng
              </motion.button>
              <motion.button
                className="bg-white text-green-800 border border-green-700 py-2 px-4 rounded-lg font-semibold hover:bg-gray-200 transition-colors w-full"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Mua ngay
              </motion.button>
            </div>
          </motion.div>


          <div
            className="w-full md:w-2/3 overflow-y-auto pr-4 no-scrollbar"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            {book.title && <Chatbot book={book} />}
            <h1 className="text-3xl font-bold text-white font-bangers tracking-wide">
              {book.title || 'Không có tiêu đề'}
            </h1>
            <p className="text-lg text-[#aaaaaa] mt-2">{book.author || 'Tác giả không xác định'}</p>

            <div className="flex items-center mt-2">
              {[...Array(maxStars)].map((_, i) => (
                <Star
                  key={i}
                  size={20}
                  className={i < Math.round(rating) ? 'text-yellow-400' : 'text-[#aaaaaa]'}
                  fill={i < Math.round(rating) ? '#facc15' : 'none'}
                />
              ))}
              <span className="ml-2 text-[#aaaaaa] font-bangers">{rating.toFixed(1)}</span>
            </div>

            <p className="text-2xl text-green-500 font-semibold mt-4 font-bangers">
              {book.price ? `${book.price.toLocaleString('de-DE')} ₫` : 'Liên hệ'}
            </p>

            <div className="grid grid-cols-2 mt-4 text-white  rounded-lg p-4">
              <div className="text-left space-y-2 font-bold ">
                {book.publisher && <p>Nhà xuất bản</p>}
                {book.published_year && <p>Ngày xuất bản</p>}
                {book.size && <p>Kích thước</p>}
                {book.pages && <p>Số trang</p>}
              </div>
              <div className="text-left space-y-2">
                {book.publisher && <p>{book.publisher}</p>}
                {book.published_year && <p>{book.published_year}</p>}
                {book.size && <p>{book.size}</p>}
                {book.pages && <p>{book.pages}</p>}
              </div>
            </div>

            <div className="mt-6">
              <h2 className="text-xl text-white font-bangers mb-2">Mô tả</h2>
              <p className="text-gray-300" style={{ whiteSpace: "pre-line" }}>
                {book.description || 'Không có mô tả'}
              </p>
            </div>
          </div>

        </div>

        <div className='m-4'>
          <ReviewSection bookId={book.book_id} isLoggedIn={!!user} />
        </div>
      </motion.div>
    </>
  );
};

export default BookDetail;

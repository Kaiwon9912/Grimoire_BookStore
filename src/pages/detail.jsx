import { useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useFetch } from '../hooks/useFetch';
import Chatbot from '../components/chatbot';
import { Star } from 'lucide-react';

const BookDetail = () => {
  const { book_id } = useParams();

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
    <motion.div
      className="m-4 p-6 mt-10 bg-[#0a0a0a]"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
    >
      <div className="relative max-w-7xl mx-auto flex flex-col md:flex-row gap-8 bg-[#1c2526] border-2 border-[#006400] p-6 rounded-xl shadow-lg">
        {/* Hình ảnh sách */}
        <motion.div
          className="w-72 rounded-xl overflow-hidden shadow-md"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <img
            src={book.cover_url || 'https://via.placeholder.com/200x300.png?text=No+Cover'}
            alt={book.title}
            className="w-full h-[400px] object-cover"
          />
        </motion.div>

        {/* Nội dung */}
        <motion.div
          className="flex flex-col justify-between m-auto"
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          {book.title && <Chatbot book={book} />}
          <div>
            <h1 className="text-3xl font-bold text-white font-bangers tracking-wide">
              {book.title || 'Không có tiêu đề'}
            </h1>
            <p className="text-lg text-[#aaaaaa] mt-2">
              {book.author || 'Tác giả không xác định'}
            </p>
            <div className="flex items-center mt-2">
              {[...Array(maxStars)].map((_, i) => (
                <Star
                  key={i}
                  size={20}
                  className={i < Math.round(rating) ? 'text-yellow-400' : 'text-[#aaaaaa]'}
                  fill={i < Math.round(rating) ? '#facc15' : 'none'}
                />
              ))}
              <span className="ml-2 text-[#aaaaaa] font-bangers">
                {rating.toFixed(1)}
              </span>
            </div>
            <p className="text-2xl text-[#006400] font-semibold mt-4 font-bangers">
              {book.price ? `${book.price.toLocaleString()} ₫` : 'Liên hệ'}
            </p>

            <div className="grid grid-cols-2 mt-4 text-white bg-[#2a2a2a] rounded-lg p-4">
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
          </div>

          <motion.button
            className="mt-6 bg-gradient-to-br from-[#006400] to-[#1c2526] border-2 border-[#006400] text-white py-3 px-6 rounded-lg hover:bg-[#004d00] transition-colors font-bangers"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => alert('Đã thêm vào giỏ hàng!')}
          >
            Thêm vào giỏ hàng
          </motion.button>
        </motion.div>
      </div>

      {/* Phần bổ sung: Mô tả chi tiết */}
      <motion.div
        className="mt-12 max-w-7xl mx-auto border-2 border-[#006400] p-6 rounded-xl bg-[#1c2526]"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.4 }}
      >
        <h2 className="text-xl font-bold text-[#006400] font-bangers">Mô tả sách</h2>
        <p className="whitespace-pre-line text-[#aaaaaa] mt-4">
          {book.description || 'Không có mô tả cho sách này.'}
        </p>
      </motion.div>
    </motion.div>
  );
};

export default BookDetail;
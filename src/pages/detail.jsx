import { motion } from 'framer-motion';
import { useNavigate, useParams } from 'react-router-dom';
import Chatbot from '../components/chatbot';
import { useFetch } from '../hooks/useFetch';
import { useCart } from './cartContext';
import { Star } from 'lucide-react'
import { useState } from 'react';
import ReviewModal from '../components/ReviewModal';

const BookDetail = () => {
  const { book_id } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const [isReviewModalOpen, setIsReviewModalOpen] = useState(false);

  const {
    data: book,
    loading,
    error,
  } = useFetch('Book', {
    match: { book_id },
    single: true,
  });  const {
    data: reviews = [],
    loading: loadingReviews,
    error: reviewsError
  } = useFetch('Reviews', {
    match: { book_id },
  });

  console.log('Reviews:', reviews); // Để debug

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
  // Calculate average rating from reviews
  const calculateAverageRating = () => {
    if (!reviews || reviews.length === 0) return 0;
    const sum = reviews.reduce((acc, review) => acc + review.rating, 0);
    return sum / reviews.length;
  };

  const rating = calculateAverageRating();
  const maxStars = 5;

  return (
    <>
      <div className="flex justify-start px-4 mt-4">
        <button
          onClick={() => navigate(-1)}
          className="bg-gray-800 text-white px-4 py-2 rounded hover:bg-gray-700 transition-colors font-semibold"
        >
          ← Quay trở lại
        </button>
      </div>


      <motion.div
        className="m-4 p-6 mt-10"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
      >
        <div className="relative  max-w-7xl m-auto flex flex-col md:flex-row gap-8  border-green-500 border p-6 rounded-xl shadow-lg">
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
                ))}                <span className="ml-2 text-[#aaaaaa] font-bangers">
                  {rating ? rating.toFixed(1) : "Chưa có đánh giá"}
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
              onClick={() => addToCart({
                id: book.id,
                title: book.title,
                price: book.price,
                cover_url: book.cover_url, 
              })}
            >
              Thêm vào giỏ hàng
            </motion.button>

            <motion.button
              className="mt-6 bg-[#2a2a2a] text-white py-2 px-4 rounded-lg hover:bg-[#3a3a3a] transition-colors"
              onClick={() => setIsReviewModalOpen(true)}
            >
              Viết đánh giá
            </motion.button>
          </motion.div>
        </div>

        {/* Phần bổ sung: Mô tả chi tiết */}        <motion.div
          className="mt-12 max-w-7xl m-auto border-green-500 border p-6 rounded-xl"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <p className="text-gray-300 mt-4">{book.description}</p>
        </motion.div>

        {/* Phần đánh giá từ người dùng */}
        <motion.div
          className="mt-12 max-w-7xl m-auto border-green-500 border p-6 rounded-xl"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.5 }}
        >
          <h2 className="text-2xl font-bangers text-white mb-6">Đánh giá từ độc giả</h2>
            <div className="space-y-8">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <h3 className="text-lg text-white font-bangers">
                  {reviews.length} đánh giá
                </h3>
                <div className="flex items-center gap-1">
                  <span className="text-4xl font-bold text-white">{rating}</span>
                  <div className="flex">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        size={20}
                        className={i < Math.round(rating) ? 'text-yellow-400' : 'text-gray-600'}
                        fill={i < Math.round(rating) ? '#facc15' : 'none'}
                      />
                    ))}
                  </div>
                </div>
              </div>
              <motion.button
                className="px-6 py-2 bg-green-700 hover:bg-green-600 text-white rounded-lg font-bangers transition-colors"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setIsReviewModalOpen(true)}
              >
                Viết đánh giá
              </motion.button>
            </div>

            {loadingReviews ? (
              <div className="flex justify-center py-8">
                <p className="text-gray-400 animate-pulse">Đang tải đánh giá...</p>
              </div>
            ) : reviews.length === 0 ? (
              <div className="text-center py-12 bg-[#1a1a1a] rounded-lg">
                <p className="text-gray-400 mb-4">Chưa có đánh giá nào. Hãy là người đầu tiên đánh giá!</p>
                <motion.button
                  className="px-6 py-2 bg-green-700 hover:bg-green-600 text-white rounded-lg font-bangers transition-colors"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setIsReviewModalOpen(true)}
                >
                  Viết đánh giá ngay
                </motion.button>
              </div>
            ) : (
              <div className="grid gap-6">
                {reviews.map((review) => (
                  <motion.div
                    key={review.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="bg-[#1a1a1a] p-6 rounded-lg border border-green-800/30 hover:border-green-700/50 transition-colors"
                  >
                    <div className="flex items-center justify-between mb-4">
                      <div>
                        <p className="text-lg text-white font-semibold font-bangers tracking-wide">
                          {review.review_name}
                        </p>
                        <p className="text-sm text-gray-400 mt-1">
                          {new Date(review.created_at).toLocaleDateString('vi-VN', {
                            year: 'numeric',
                            month: 'long',
                            day: 'numeric'
                          })}
                        </p>
                      </div>
                      <div className="flex gap-1">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            size={18}
                            className={i < review.rating ? 'text-yellow-400' : 'text-gray-600'}
                            fill={i < review.rating ? '#facc15' : 'none'}
                          />
                        ))}
                      </div>
                    </div>
                    <p className="text-gray-300 leading-relaxed">{review.comment}</p>
                  </motion.div>
                ))}
              </div>
            )}
          </div>
        </motion.div>
      </motion.div>      <ReviewModal
        isOpen={isReviewModalOpen}
        onClose={() => setIsReviewModalOpen(false)}
        book_id={book_id}
      />
    </>
  );
};

export default BookDetail;

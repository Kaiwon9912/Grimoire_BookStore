import { useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import { supabase } from '../lib/supabaseClient';

const BookDetail = () => {
  const { id } = useParams();
  const [book, setBook] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchBook = async () => {
      try {
        setLoading(true);
        const { data, error } = await supabase
          .from('Book')
          .select('*')
          .eq('id', id)
          .single();

        if (error) throw error;
        setBook(data);
      } catch (err) {
        setError('Failed to fetch book details');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchBook();
  }, [id]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p className="text-xl text-gray-500 font-bangers">Loading...</p>
      </div>
    );
  }

  if (error || !book) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p className="text-xl text-red-500 font-bangers">
          {error || 'Book Not Found'}
        </p>
      </div>
    );
  }

  return (
    <motion.div
      className="m-4 p-6 mt-10"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
    >
      <div className="relative flex flex-col md:flex-row gap-8">
        {/* Hình ảnh sách - góc trái */}
        <motion.div
          className="absolute top-0 left-0 w-80 md:w-80 rounded-xl overflow-hidden shadow-lg z-10"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <img
            src={book.cover_url || 'https://via.placeholder.com/200x300.png?text=No+Cover'}
            alt={book.title}
            className="w-full h-[400px] object-cover"
            aria-label={`Cover of ${book.title} by ${book.author}`}
          />
        </motion.div>

        {/* Thông tin sách */}
        <motion.div
          className="md:ml-96 mt-96 md:mt-0 flex flex-col justify-between"
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <div>
            <h1 className="text-3xl font-bold text-white font-bangers tracking-wide">
              {book.title}
            </h1>
            <p className="text-lg text-gray-300 mt-2">by {book.author}</p>
            <p className="text-2xl text-blue-400 font-semibold mt-4 font-bangers">
              {book.price.toLocaleString()} ₫
            </p>
            <p className="text-gray-300 mt-4 leading-relaxed">{book.description}</p>
          </div>

          {/* Nút hành động */}
          <motion.button
            className="mt-6 bg-blue-600 text-white py-3 px-6 rounded-lg hover:bg-blue-700 transition-colors font-bangers"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            aria-label={`Add ${book.title} to cart`}
            onClick={() => alert('Added to cart!')} // Thay bằng logic thật
          >
            Add to Cart
          </motion.button>
        </motion.div>
      </div>

      {/* Phần bổ sung: Mô tả chi tiết */}
      <motion.div
        className="mt-12"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.4 }}
      >
        <h2 className="text-2xl font-semibold text-white font-bangers tracking-wide">
          About This Book
        </h2>
        <p className="text-gray-300 mt-4">{book.description}</p>
      </motion.div>
    </motion.div>
  );
};

export default BookDetail;
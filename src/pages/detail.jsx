import { useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useFetch } from '../hooks/useFetch';
import Chatbot from '../components/chatbot';
const BookDetail = () => {
  const { id } = useParams();


  
  const {
    data: book,
    loading,
    error,
  } = useFetch('Book', {
    match: { id },
    single: true,
  });
 
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
        {book.title}
      </h1>
      <p className="text-lg text-gray-300 mt-2"> {book.author}</p>
      ⭐⭐⭐⭐⭐
      <p className="text-2xl text-green-500 font-semibold mt-4 font-bangers">
        {book.price.toLocaleString()} ₫
      </p>


      <div className="grid grid-cols-2 mt-4 text-white">
        <div className="text-left p-4 space-y-2 font-bold">
          {book.publisher && <p>Nhà xuất bản</p>}
          {book.publish_date && <p>Ngày xuất bản</p>}
          {book.size && <p>Kích thước</p>}
          {book.page && <p>Số trang</p>}
          {book.translator && <p>Dịch giả</p>}
        </div>
        <div className="text-left p-4 space-y-2">
          {book.publisher && <p>{book.publisher}</p>}
          {book.publish_date && <p>{book.publish_date}</p>}
          {book.size && <p>{book.size}</p>}
          {book.page && <p>{book.page}</p>}
          {book.translator && <p>{book.translator}</p>}
        </div>
      </div>

    </div>

    <motion.button
      className="mt-6 bg-gradient-to-br from-green-900 to-black border-green-500 border-2 text-white py-3 px-6 rounded-lg hover:bg-blue-700 transition-colors font-bangers"
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      onClick={() => alert('Added to cart!')}
    >
      Add to Cart
    </motion.button>
  </motion.div>
</div>


      {/* Phần bổ sung: Mô tả chi tiết */}
      <motion.div
        className="mt-12 max-w-7xl m-auto border-green-500 border p-6 rounded-xl"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.4 }}
      >
        <p className="whitespace-pre-line text-ellipsis  text-gray-300 mt-4">{book.description}</p>

      </motion.div>
    </motion.div>
    
  );
};

export default BookDetail;
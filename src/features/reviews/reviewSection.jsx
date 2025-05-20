import { useState } from 'react';
import { Star } from 'lucide-react';

import { useFetch } from '../../hooks/useFetch';

const ReviewSection = ({ bookId, isLoggedIn }) => {
  const { data: reviews, loading, error } = useFetch('Review', {
    match: { book_id: bookId },
    orderBy: { column: 'created_at', ascending: false },
  });

  const [newReview, setNewReview] = useState('');
  const [rating, setRating] = useState(5);
  const [refresh, setRefresh] = useState(false); // kích hoạt lại useFetch nếu cần

  const handleSubmit = async () => {
    const { data: userData } = await supabase.auth.getUser();
    if (!userData?.user?.email) return;

    const { error } = await supabase.from('Review').insert({
      content: newReview,
      rating,
      book_id: bookId,
      user_email: userData.user.email,
    });

    if (!error) {
      setNewReview('');
      setRating(5);
      setRefresh((r) => !r); // trigger re-fetch bằng cách thay đổi key
    }
  };

  const avgRating =
    reviews?.length > 0
      ? reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length
      : 0;

  return (
    <div className="bg-slate-800 border-green-500 border p-6 rounded-xl shadow mt-10 max-w-7xl m-auto ">
     <div className='flex'>
      

      {/* Tổng sao */}
      <div className="items-start px-5 flex text-white">
         <div className='w-52'>
         <h2 className="text-xl font-bold mb-4">Đánh giá sản phẩm</h2>
        <div className="text-4xl font-bold mr-4">{avgRating.toFixed(1)}/5</div>
        <div className='mt-5'>
          <div className="flex mb-1 space-x-1">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                size={20}
                className={i < Math.round(avgRating) ? 'text-yellow-400' : 'text-gray-300'}
                fill={i < Math.round(avgRating) ? '#facc15' : 'none'}
              />
            ))}
          </div>
          <div className="text-gray-600 text-sm">({reviews?.length || 0} đánh giá)</div>
        </div>
          
        </div>
        <div className='mt-12 space-y-5'>
                  <div className='w-44 rounded-full overflow-hidden bg-gray-400 h-2'><div className='w-32 h-2 bg-yellow-300'></div> </div>
                  <div className='w-44 rounded-full overflow-hidden bg-gray-400 h-2'><div className='w-32 h-2 bg-yellow-300'></div> </div>
                  <div className='w-44 rounded-full overflow-hidden bg-gray-400 h-2'><div className='w-32 h-2 bg-yellow-300'></div> </div>
                  <div className='w-44 rounded-full overflow-hidden bg-gray-400 h-2'><div className='w-32 h-2 bg-yellow-300'></div> </div>
                  <div className='w-44 rounded-full overflow-hidden bg-gray-400 h-2'><div className='w-32 h-2 bg-yellow-300'></div> </div>
            
          </div>
      </div>

      {/* Form đánh giá */}
      {isLoggedIn ? (
        <div className="mb-6 w-full mt-2 px-5">
            <div className="flex items-center mb-3">
            {[...Array(5)].map((_, i) => (
              <button key={i} onClick={() => setRating(i + 1)} type="button">
                <Star
                  size={24}
                  className={i < rating ? 'text-yellow-400' : 'text-gray-300'}
                  fill={i < rating ? '#facc15' : 'none'}
                />
              </button>
            ))}
            <span className="ml-2 text-sm text-gray-600">{rating} sao</span>
          </div>
          <textarea
            value={newReview}
            onChange={(e) => setNewReview(e.target.value)}
            placeholder="Chia sẻ cảm nhận của bạn..."
            className="w-full p-3 border rounded mb-3"
            rows={4}
          />
          
          <button
            onClick={handleSubmit}
            className="bg-green-700 text-white px-4 py-2 rounded hover:bg-green-800"
          >
            Gửi đánh giá
          </button>
        </div>
      ) : (
        <p className="text-gray-500 mb-6">
          Chỉ có thành viên mới có thể viết nhận xét. Vui lòng{' '}
          <a href="/login" className="text-blue-500 underline">đăng nhập</a> hoặc{' '}
          <a href="/register" className="text-blue-500 underline">đăng ký</a>.
        </p>
      )}

     </div>
      {/* Hiển thị đánh giá */}
      {loading ? (
        <p>Đang tải đánh giá...</p>
      ) : error ? (
        <p className="text-red-500">Lỗi khi tải đánh giá: {error}</p>
      ) : (
        <div className="space-y-4">
          {reviews?.map((review, idx) => (
            <div key={idx} className="border-t pt-4">
              <div className="text-sm font-semibold text-gray-700">
                {review.user_email?.replace(/(.{2}).+(@.+)/, '$1******$2')}
              </div>
              <div className="text-gray-400 text-xs">{new Date(review.created_at).toLocaleDateString()}</div>
              <div className="flex my-1">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    size={16}
                    className={i < review.rating ? 'text-yellow-400' : 'text-gray-300'}
                    fill={i < review.rating ? '#facc15' : 'none'}
                  />
                ))}
              </div>
              <p className="text-gray-700">{review.content}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ReviewSection;

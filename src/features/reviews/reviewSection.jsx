import { useState, useEffect } from 'react';
import { Star } from 'lucide-react';
import { useFetch } from '../../hooks/useFetch';
import { supabase } from '../../lib/supabaseClient';

const ReviewSection = ({ bookId, isLoggedIn }) => {
  const [limit, setLimit] = useState(2);
  const [refresh, setRefresh] = useState(false); // để kích hoạt lại fetch
  const { data: reviews, loading, error } = useFetch('reviews2', {
    match: { book_id: bookId },
    limit,
    orderBy: { column: 'created_at', ascending: false },
    select: '*, customers(full_name)' // lấy thông tin người dùng
  }, [limit, refresh]); // thêm dependency để re-fetch

  const [newReview, setNewReview] = useState('');
  const [rating, setRating] = useState(5);

  const handleSubmit = async () => {
    const { data: userData } = await supabase.auth.getUser();
    if (!userData?.user?.email) return;

    const { error } = await supabase.from('reviews2').insert({
      user_id: userData.user.id,
      comment: newReview,
      rating,
      book_id: bookId
    });

    if (!error) {
      setNewReview('');
      setRating(5);
      setRefresh(r => !r); // reload dữ liệu
    }
  };

  const avgRating =
    reviews?.length > 0
      ? reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length
      : 0;

  // Đếm sao
  const starCounts = [0, 0, 0, 0, 0];
  reviews?.forEach(r => {
    if (r.rating >= 1 && r.rating <= 5) {
      starCounts[r.rating - 1]++;
    }
  });

  const totalReviews = reviews?.length || 0;
  const starPercents = starCounts.map(count =>
    totalReviews > 0 ? Math.round((count / totalReviews) * 100) : 0
  );

  return (
    <div className="from-[#0a0a0a] bg-gradient-to-tr to-green-900/50  k p-6 rounded-xl shadow mt-10 max-w-7xl m-auto">
      <div className='flex flex-col lg:flex-row'>

        {/* Tổng sao + biểu đồ sao */}
        <div className="px-5 text-white lg:w-96 ">
          <h2 className="text-center text-xl font-bold mb-4">Đánh giá sản phẩm</h2>
          <div className="text-center text-4xl font-bold">{avgRating.toFixed(1)}/5</div>
          <div className="mt-5 text-center">
            <div className="flex mb-2 justify-center space-x-1">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  size={20}
                  className={i < Math.round(avgRating) ? 'text-yellow-400' : 'text-gray-300'}
                  fill={i < Math.round(avgRating) ? '#facc15' : 'none'}
                />
              ))}
            </div>
            <div className="text-gray-400 text-sm">({totalReviews} đánh giá)</div>
          </div>

          <div className='mt-6 space-y-3 text-sm'>
            {[5, 4, 3, 2, 1].map((star, idx) => {
              const percent = starPercents[5 - star];
              const count = starCounts[5 - star];
              return (
                <div key={star} className="flex items-center space-x-2">
                  <span className="w-6">{star}★</span>
                  <div className="flex-1 bg-gray-400 rounded-full h-2 overflow-hidden">
                    <div
                      className="bg-yellow-300 h-full"
                      style={{ width: `${percent}%` }}
                    ></div>
                  </div>
                  <span className="w-12 text-right">{percent}%</span>
                  <span className="w-20 text-right text-gray-300">{count} đánh giá</span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Form đánh giá */}
        <div className="w-full lg:w-1/2 mt-6 lg:mt-0 px-5">
          {isLoggedIn ? (
            <>
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
                <span className="ml-2 text-sm text-gray-400">{rating} sao</span>
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
            </>
          ) : (
            <div>
                          <p className="text-gray-500  ">
              Chỉ có thành viên mới có thể viết nhận xét. Vui lòng{' '}
              <a href="/login" className="text-blue-500 underline">đăng nhập</a> hoặc{' '}
              <a href="/register" className="text-blue-500 underline">đăng ký</a>.
            </p>
              </div>
          )}
        </div>
      </div>

      {/* Danh sách đánh giá */}
      <div className="mt-8 space-y-4">
        {loading ? (
          <p>Đang tải đánh giá...</p>
        ) : error ? (
          <p className="text-red-500">Lỗi khi tải đánh giá: {error}</p>
        ) : (
          <>
            {reviews?.map((review, idx) => (
              <div key={idx} className="border-t pt-4">
                <div className="text-sm font-semibold text-gray-300">
                  {review.customers?.full_name || 'Ẩn danh'}
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
                <p className="text-white">{review.comment}</p>
              </div>
            ))}

           
            {totalReviews >= limit && (
              <div className="text-center mt-4">
                <button
                  className="text-blue-400 hover:underline"
                  onClick={() => setLimit(prev => prev + 10)}
                >
                  Xem thêm đánh giá
                </button>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default ReviewSection;

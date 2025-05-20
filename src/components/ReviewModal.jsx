import { useState } from 'react';
import { Star } from 'lucide-react';
import { supabase } from '../lib/supabaseClient';
import { useAuth } from '../context/authContext';

const ReviewModal = ({ isOpen, onClose, book_id }) => {
  const [rating, setRating] = useState(5);
  const [review, setReview] = useState('');
  const [reviewerName, setReviewerName] = useState('');
  const { user } = useAuth();
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!user) {
      alert('Vui lòng đăng nhập để đánh giá');
      return;
    }

    if (!reviewerName.trim()) {
      alert('Vui lòng nhập tên của bạn');
      return;
    }

    if (!review.trim()) {
      alert('Vui lòng nhập nhận xét của bạn');
      return;
    }

    setIsSubmitting(true);    try {      
      const { error } = await supabase.from('Reviews').insert([
        {
          book_id, // No need to parse as integer anymore
          user_id: user.id,
          rating: parseInt(rating), // Still need to parse rating as integer
          comment: review,
          review_name: reviewerName
        },
      ]);

      if (error) throw error;

      alert('Cảm ơn bạn đã đánh giá!');
      onClose();
    } catch (error) {
      alert('Có lỗi xảy ra khi gửi đánh giá: ' + error.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-[#1a1a1a] border border-green-500 rounded-xl p-6 w-[500px] relative">
        <button 
          onClick={onClose}
          className="absolute right-4 top-4 text-gray-400 hover:text-white"
        >
          ✕
        </button>
        
        <h2 className="text-2xl font-bangers text-white mb-4">VIẾT ĐÁNH GIÁ SẢN PHẨM</h2>
        
        

        <div className="flex justify-center mb-6">
          {[1, 2, 3, 4, 5].map((star) => (
            <Star
              key={star}
              size={32}
              className={`cursor-pointer ${
                star <= rating ? 'text-yellow-400 fill-yellow-400' : 'text-gray-400'
              }`}
              onClick={() => setRating(star)}
            />
          ))}
        </div>

        <div className="space-y-4">
          <div>            <input
              type="text"
              value={reviewerName}
              onChange={(e) => setReviewerName(e.target.value)}
              placeholder="Nhập tên sẽ hiển thị khi đánh giá"
              className="w-full p-3 rounded-lg bg-[#2a2a2a] text-white border border-gray-600"
            />
          </div>

          <textarea
            value={review}
            onChange={(e) => setReview(e.target.value)}
            placeholder="Nhập nhận xét của bạn về sản phẩm"
            className="w-full p-3 rounded-lg bg-[#2a2a2a] text-white border border-gray-600 min-h-[150px]"
          />

          <div className="flex gap-4 justify-end">
            <button
              onClick={onClose}
              className="px-6 py-2 rounded-lg border border-gray-600 text-white hover:bg-gray-700"
            >
              Hủy
            </button>            <button
              onClick={handleSubmit}
              disabled={isSubmitting}
              className={`px-6 py-2 rounded-lg ${
                isSubmitting 
                  ? 'bg-gray-600 cursor-not-allowed' 
                  : 'bg-red-600 hover:bg-red-700'
              } text-white`}
            >
              {isSubmitting ? 'Đang gửi...' : 'Gửi nhận xét'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReviewModal;
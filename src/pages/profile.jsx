import { useState, useEffect } from 'react';
import { useAuth } from '../context/authContext';
import { supabase } from '../lib/supabaseClient';
import { motion } from 'framer-motion';

const Profile = () => {
  const { user } = useAuth();
  const [profile, setProfile] = useState({
    full_name: '',
    email: '',
    address: '',
  });
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (user) {
      setProfile({
        full_name: user.user_metadata?.full_name || '',
        email: user.email,
        address: user.user_metadata?.address || '',
      });
    }
  }, [user]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProfile((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const { error } = await supabase.auth.updateUser({
        data: {
          full_name: profile.full_name,
          address: profile.address,
        },
      });

      if (error) throw error;

      setIsEditing(false);
      alert('Cập nhật thông tin thành công!');
    } catch (error) {
      alert('Lỗi khi cập nhật thông tin: ' + error.message);
    } finally {
      setLoading(false);
    }
  };

  if (!user) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center">
        <p className="text-white text-xl">Vui lòng đăng nhập để xem thông tin</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-900 py-12 px-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-2xl mx-auto bg-black rounded-xl shadow-lg p-8 border border-green-600"
      >
        <h1 className="text-3xl font-bangers text-green-400 mb-8 text-center">
          Thông tin cá nhân
        </h1>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-gray-400 mb-2 font-bangers">Email</label>
            <input
              type="email"
              value={profile.email}
              disabled
              className="w-full bg-gray-800 text-gray-300 rounded-lg px-4 py-2 border border-gray-700"
            />
          </div>

          <div>
            <label className="block text-gray-400 mb-2 font-bangers">Họ và tên</label>
            <input
              type="text"
              name="full_name"
              value={profile.full_name}
              onChange={handleInputChange}
              disabled={!isEditing}
              className="w-full bg-gray-800 text-white rounded-lg px-4 py-2 border border-gray-700 focus:border-green-500 focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-gray-400 mb-2 font-bangers">Địa chỉ</label>
            <textarea
              name="address"
              value={profile.address}
              onChange={handleInputChange}
              disabled={!isEditing}
              rows="3"
              className="w-full bg-gray-800 text-white rounded-lg px-4 py-2 border border-gray-700 focus:border-green-500 focus:outline-none"
            />
          </div>

          <div className="flex justify-end gap-4">
            {!isEditing ? (
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                type="button"
                onClick={() => setIsEditing(true)}
                className="px-6 py-2 bg-green-700 text-white rounded-lg hover:bg-green-600 font-bangers"
              >
                Chỉnh sửa
              </motion.button>
            ) : (
              <>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  type="button"
                  onClick={() => setIsEditing(false)}
                  className="px-6 py-2 bg-gray-700 text-white rounded-lg hover:bg-gray-600 font-bangers"
                >
                  Hủy
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  type="submit"
                  disabled={loading}
                  className="px-6 py-2 bg-green-700 text-white rounded-lg hover:bg-green-600 font-bangers disabled:bg-gray-600"
                >
                  {loading ? 'Đang lưu...' : 'Lưu thay đổi'}
                </motion.button>
              </>
            )}
          </div>
        </form>

        {/* Order History Section */}
        <div className="mt-12">
          <h2 className="text-2xl font-bangers text-green-400 mb-6">Lịch sử đơn hàng</h2>
          <div className="bg-gray-800 rounded-lg p-4 text-center">
            <p className="text-gray-400">Chưa có đơn hàng nào</p>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default Profile;

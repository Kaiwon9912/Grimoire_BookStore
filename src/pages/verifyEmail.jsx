// src/pages/VerifyEmail.jsx
import { Link } from 'react-router-dom';

export default function VerifyEmail() {
  return (
    <div className="flex items-center justify-center h-screen bg-[url(/src/assets/mailbox.jpg)] bg-cover bg-center">
      <div className="bg-black bg-opacity-70 p-10 rounded-lg text-white text-center shadow-lg max-w-md">
        <h1 className="text-3xl font-bold mb-4">📧 Xác nhận email</h1>
        <p className="mb-6">
          Một email xác nhận đã được gửi đến hộp thư của bạn. <br />
          Vui lòng kiểm tra và nhấp vào liên kết để kích hoạt tài khoản.
        </p>
        <p className="text-sm text-gray-400 mb-6">
          Nếu bạn chưa thấy email, hãy kiểm tra thư mục Spam hoặc thử lại sau vài phút.
        </p>
        <Link
          to="/login"
          className="inline-block px-6 py-2 bg-green-500 text-white rounded hover:bg-green-600 font-semibold transition"
        >
          Quay lại đăng nhập
        </Link>
      </div>
    </div>
  );
}

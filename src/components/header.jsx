import { Link } from 'react-router-dom';
import { BookText, Search, ShoppingCart } from 'lucide-react';
import { useCart } from '../pages/cartContext';
const Header = () => {
  const { cartItems } = useCart();
  const totalQuantity = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <header className="bg-black shadow px-16 py-4 flex justify-between items-center border-b-2 border-green-600">
      <Link to="/" className="text-3xl font-bold flex items-center font-bangers text-green-400">
        <BookText size={28} className="inline mr-4" />Grimoire
      </Link>

      <div className="relative flex items-center w-96 mx-4">
        <input
          type="text"
          placeholder="Tìm kiếm..."
          className="bg-gray-900 text-white rounded-full py-2 pl-5 pr-4 w-full border border-green-600 focus:outline-none focus:ring-2 focus:ring-green-600"
        />
        <Search size={20} className="absolute right-4 top-1/2 transform -translate-y-1/2 text-green-400" />
      </div>

      <nav className="space-x-10 text-white font-semibold font-bangers tracking-wider text-lg flex items-center">
        <Link to="/" className="hover:underline">Trang chủ</Link>
        <Link to="/categories" className="hover:underline">Thể loại</Link>

        <Link to="/cart" className="relative inline-block">
          <ShoppingCart className="text-green-400" size={28} />
          {totalQuantity > 0 && (
            <span className="absolute -top-2 -right-2 bg-red-600 text-white text-xs font-bold px-2 py-0.5 rounded-full">
              {totalQuantity}
            </span>
          )}
        </Link>

        <Link to="/login" className="hover:underline">Đăng nhập</Link>
      </nav>
    </header>
  );
};

export default Header;

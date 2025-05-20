import { Link } from 'react-router-dom';
import { BookText, Search, ShoppingBag, CircleUserRound } from 'lucide-react';
import { useAuth } from '../context/authContext';
import { supabase } from '../lib/supabaseClient';
import { useCart } from '../pages/cartContext';

const Header = () => {
  const getLastName = (name) => {
    if (!name) return "";
    const parts = name.trim().split(" ");
    return parts[parts.length - 1];
  };
  const { cartItems } = useCart();
  const totalQuantity = cartItems.reduce((sum, item) => sum + item.quantity, 0);
  const { user } = useAuth();

  const handleLogout = async () => {
    await supabase.auth.signOut();
    window.location.reload()
  };
  return (
    <header className="bg-black shadow px-16 py-4 flex justify-between items-center border-b-2 border-green-600">
      <Link to="/" className="text-3xl font-bold flex items-center font-bangers text-green-400">
        <BookText size={28} className="inline mr-4" /> Grimoire
      </Link>
      <div className='flex'>
        <nav className="space-x-10 text-white font-semibold font-bangers tracking-wider text-lg flex">
          <Link to="/home" className="hover:underline">Trang chủ</Link>
          <Link to="/categories" className="hover:underline">Thể loại</Link>
          <Link to="/" className="hover:underline">Chatbook</Link>
          {
            user == null && (
              <Link to="/login" className="hover:underline text-green-400 hover:text-green-500 animate-bounce">Đăng nhập</Link>
            )
          }
        </nav>

        {user && (
          <div className="ml-8 space-x-4 relative text-white flex items-center">
            <Link to="/cart" className="relative inline-block">
              <ShoppingBag className="text-green-400" size={28} />
              {totalQuantity > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-600 text-white text-xs font-bold px-2 py-0.5 rounded-full">
                  {totalQuantity}
                </span>
              )}
            </Link>

            <div className='group '>
              <CircleUserRound className='inline-block' />
              <p className='w-18 inline-block ml-2 font-bold'> {getLastName(user.user_metadata?.full_name) || user.email}</p>              <ul className='h-0 z-50 overflow-hidden absolute group-hover:h-24 transtion duration-300 bg-black  w-full text-center '>
                <Link to="/profile">
                  <li className='p-2 border-green-600 border-b-1 hover:bg-slate-600'>Thông tin</li>
                </Link>
                <li className='p-2 hover:bg-red-600' onClick={handleLogout}>Đăng xuất</li>
              </ul>

            </div>
          </div>
        )}
      </div>



    </header>
  );
};

export default Header;

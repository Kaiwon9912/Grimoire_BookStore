import { Link } from 'react-router-dom'
import { BookText, Search } from 'lucide-react'

const Header = () => (
  <header className=" bg-black shadow px-16 py-4 flex justify-between items-center border-b-2 border-green-600">
    <Link to="/" className="text-3xl font-bold flex items-center font-bangers text-green-400">
      <BookText size={28} className='inline mr-4' />Grimoire
    </Link>
   
    <nav className="space-x-10 text-white font-semibold font-bangers tracking-wider text-lg">
      <Link to="/home" className="hover:underline">Trang chủ</Link>
      <Link to="/categories" className="hover:underline">Thể loại</Link>
      <Link to="/login" className="hover:underline">Đăng nhập</Link>
    </nav>
  </header>
)

export default Header
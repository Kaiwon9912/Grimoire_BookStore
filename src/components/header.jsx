import { Link } from 'react-router-dom'
import { BookText, Search } from 'lucide-react'

const Header = () => (
  <header className=" bg-black shadow px-16 py-4 flex justify-between items-center border-b-2 border-green-600">
    <Link to="/" className="text-3xl font-bold flex items-center font-bangers text-green-400">
      <BookText size={28} className='inline mr-4' />Grimoire
    </Link>
    <div className="relative flex items-center w-96 mx-4 ">
      <input
        type="text"
        placeholder="Tìm kiếm..."
        className="bg-gray-900 text-white rounded-full py-2 pl-5 pr-4 w-full border border-green-600 focus:outline-none focus:ring-2 focus:ring-green-600"
      />
      <Search size={20} className="absolute right-4 top-1/2 transform -translate-y-1/2 text-green-400" />
    </div>
    <nav className="space-x-10 text-white font-semibold font-bangers tracking-wider text-lg">
      <Link to="/" className="hover:underline">Trang chủ</Link>
      <Link to="/categories" className="hover:underline">Thể loại</Link>
      <Link to="/login" className="hover:underline">Đăng nhập</Link>
    </nav>
  </header>
)

export default Header
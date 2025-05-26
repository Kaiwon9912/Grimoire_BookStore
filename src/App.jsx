
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Header from './components/header';
import Footer from './components/footer';
import Home from './pages/home';
import BookDetail from './pages/detail';
import CategoriesPage from './pages/categories';
import LandingPage from './pages/landing';
import Auth from './pages/auth'; 
import VerifyEmail from './pages/verifyEmail';
import { AuthProvider, useAuth } from './context/authContext';
import { AnimatePresence } from 'framer-motion';
import CheckoutPage from './pages/checkoutPage'
import CartPage from'./pages/cart'
import ChatPage from './pages/chatPage';
function AppContent() {
  const location = useLocation();
  const hideLayoutRoutes = ['/login', '/verify-email', '/chatbook']; // Add any other routes to hide header/footer
  const hideLayout = hideLayoutRoutes.includes(location.pathname);

  return (
    <div className="min-h-screen flex flex-col bg-gray-900">
      {!hideLayout && <Header />}
      <main className="flex-grow">
        <AnimatePresence mode="wait">
          <Routes location={location} key={location.pathname}>
            <Route path="/" element={<LandingPage />} />
            <Route path="/home" element={<Home />} />
            <Route path="/book/:book_id" element={<BookDetail />} />
            <Route path="/categories" element={<CategoriesPage />} />
            <Route path="/login" element={<Auth />} />
            <Route path="/verify-email" element={<VerifyEmail />} />
            <Route path="/cart" element={<CartPage />} />
            <Route path="/checkout" element={<CheckoutPage />} />
             <Route path="/chatbook" element={<ChatPage />} />
          </Routes>
        </AnimatePresence>
      </main>
      {!hideLayout && <Footer />}
    </div>
  );
}

function App() {
  return (
    <AuthProvider>
     <Router>
      <AppContent />
     </Router>
    </AuthProvider>
  );
}

export default App;

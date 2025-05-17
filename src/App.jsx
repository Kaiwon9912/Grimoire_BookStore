import React from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Header from './components/header';
import Footer from './components/footer';
import Home from './pages/home';
import BookDetail from './pages/detail';
import CategoriesPage from './pages/categories';
import LandingPage from './pages/landing';
import Auth from './pages/auth'; // Assuming this is your login page
import './App.css';
import { AnimatePresence } from 'framer-motion';

function AppContent() {
  const location = useLocation();
  const hideLayoutRoutes = ['/login']; // Add any other routes to hide header/footer

  const hideLayout = hideLayoutRoutes.includes(location.pathname);

  return (
    <div className="min-h-screen flex flex-col">
      {!hideLayout && <Header />}
      <main className="flex-grow">
        <AnimatePresence mode="wait">
          <Routes location={location} key={location.pathname}>
            <Route path="/" element={<LandingPage />} />
            <Route path="/home" element={<Home />} />
            <Route path="/book/:id" element={<BookDetail />} />
            <Route path="/categories" element={<CategoriesPage />} />
            <Route path="/login" element={<Auth />} />
          </Routes>
        </AnimatePresence>
      </main>
      {!hideLayout && <Footer />}
    </div>
  );
}

function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}

export default App;

import { AnimatePresence } from 'framer-motion'
import React from 'react'
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom'
import './App.css'
import Footer from './components/footer'
import Header from './components/header'
import Chatbot from './components/chatbot'
import CartPage from './pages/cart'
import CategoriesPage from './pages/categories'
import BookDetail from './pages/detail'
import Home from './pages/home'
import CheckoutPage from './pages/checkoutPage'

function App() {


  return (
    <>
      <Router>
        <div className="min-h-screen  flex flex-col">
          <Header />
          <main className="flex-grow">
            <AnimatePresence mode="wait">
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/book/:id" element={<BookDetail />} />
                <Route path="/categories" element={<CategoriesPage />} />
                <Route path="/cart" element={<CartPage />} />
                <Route path="/checkout" element={<CheckoutPage />} />
              </Routes>
            </AnimatePresence>
          </main>
          <Footer />
        </div>
      </Router>
    </>
  )
}

export default App

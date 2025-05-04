import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Header from './components/header'
import Footer from './components/footer'
import Home from './pages/home'
import BookDetail from './pages/detail'
import './App.css'
import { AnimatePresence } from 'framer-motion';
import Chatbot from './components/chatbot'
function App() {


  return (
    <>
     <Router>
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-grow">
        <AnimatePresence mode="wait">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/book/:id" element={<BookDetail />} />
            {/* Bạn có thể thêm: categories, login, v.v. */}
          </Routes>
          </AnimatePresence>
          <Chatbot />
        </main>
        <Footer />
      </div>
    </Router>
    </>
  )
}

export default App

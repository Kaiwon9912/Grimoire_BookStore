import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const Chatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    { id: 1, text: 'Chào bạn! Tôi là Grimoire Bot. Hôm nay tôi có thể giúp gì?', isBot: true },
  ]);
  const [inputText, setInputText] = useState('');

  // Xử lý gửi tin nhắn
  const handleSendMessage = () => {
    if (!inputText.trim()) return;
    
    // Thêm tin nhắn người dùng
    const userMessage = { id: messages.length + 1, text: inputText, isBot: false };
    setMessages((prev) => [...prev, userMessage]);
    
    // Giả lập phản hồi bot
    setTimeout(() => {
      const botMessage = {
        id: messages.length + 2,
        text: 'Cảm ơn bạn! Tôi đang tìm kiếm sách phù hợp. Bạn muốn tìm sách về chủ đề gì?',
        isBot: true,
      };
      setMessages((prev) => [...prev, botMessage]);
    }, 500);
    
    setInputText('');
  };

  return (
    <>
      {/* Floating Button */}
      <motion.button
        className="fixed bottom-4 right-4 w-12 h-12 bg-blue-600 text-white rounded-full flex items-center justify-center shadow-lg z-50"
        onClick={() => setIsOpen(!isOpen)}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        animate={{ scale: isOpen ? 0.9 : [1, 1.05, 1] }}
        transition={{ repeat: isOpen ? 0 : Infinity, repeatType: 'reverse', duration: 1.5 }}
        aria-label="Toggle chatbot"
      >
        <svg
          className="w-6 h-6"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
          />
        </svg>
      </motion.button>

      {/* Chatbot Modal */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="fixed bottom-16 right-4 w-80 md:w-96 h-[400px] bg-gray-900 rounded-xl shadow-lg z-50 flex flex-col overflow-hidden"
            initial={{ x: '100%', opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: '100%', opacity: 0 }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
          >
            {/* Header */}
            <div className="bg-blue-600 p-4 flex justify-between items-center">
              <h3 className="text-xl font-bangers text-white">Grimoire Bot</h3>
              <motion.button
                className="text-white"
                onClick={() => setIsOpen(false)}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                aria-label="Close chatbot"
              >
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </motion.button>
            </div>

            {/* Khu vực tin nhắn */}
            <div className="flex-1 p-4 overflow-y-auto bg-gray-800">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`mb-4 flex ${
                    message.isBot ? 'justify-start' : 'justify-end'
                  }`}
                >
                  <div
                    className={`max-w-[70%] p-2 rounded-lg ${
                      message.isBot
                        ? 'bg-gray-700 text-gray-300'
                        : 'bg-blue-600 text-white'
                    } font-bangers`}
                  >
                    {message.text}
                  </div>
                </div>
              ))}
            </div>

            {/* Input gửi tin nhắn */}
            <div className="p-4 bg-gray-900 flex items-center space-x-2">
              <input
                type="text"
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                className="flex-1 bg-gray-700 text-white rounded-lg p-2 font-bangers focus:outline-none focus:ring-2 focus:ring-blue-400"
                placeholder="Type your message..."
                aria-label="Chat input"
              />
              <motion.button
                className="bg-blue-600 text-white p-2 rounded-lg"
                onClick={handleSendMessage}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                aria-label="Send message"
              >
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"
                  />
                </svg>
              </motion.button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Chatbot;
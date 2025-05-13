import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { BookA, X, Send } from 'lucide-react';
import { getGroqResponse } from '../services/groqService';

const Chatbot = ({ context }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    { id: 1, text: 'Chào bạn! Tôi là Grimoire Bot. Hôm nay tôi có thể giúp gì?', isBot: true },
  ]);
  const [inputText, setInputText] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const chatEndRef = useRef(null);

  const suggestions = [
    'Tóm tắt nội dung cuốn sách này',
    'Sách này thuộc thể loại gì?',
    'Ai là tác giả?',
    'Cuốn này có phù hợp với trẻ em không?',
  ];

  const scrollToBottom = () => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = async (presetText) => {
    const textToSend = presetText || inputText;
    if (!textToSend.trim()) return;

    const userMessage = {
      id: messages.length + 1,
      text: textToSend,
      isBot: false,
    };

    setMessages((prev) => [...prev, userMessage]);
    setInputText('');
    setIsLoading(true);

    const groqMessages = [
      {
        role: 'system',
        content: `Bạn là trợ lý chuyên về sách. Đây là thông tin sách người dùng đang xem: 
        Tiêu đề: ${context?.title || 'Không rõ'}
        Mô tả: ${context?.description || 'Không có mô tả'}
        
        Hãy trả lời các câu hỏi dựa trên thông tin này.`,
      },
      ...messages.map((msg) => ({
        role: msg.isBot ? 'assistant' : 'user',
        content: msg.text,
      })),
      { role: 'user', content: textToSend },
    ];

    const botReply = await getGroqResponse(groqMessages);

    const botMessage = {
      id: messages.length + 2,
      text: botReply,
      isBot: true,
    };
    setMessages((prev) => [...prev, botMessage]);
    setIsLoading(false);
  };

  return (
    <>
      {/* Floating Button */}
      <motion.button
        className="fixed bottom-4 right-4 w-12 h-12 bg-amber-900 text-white rounded-full flex items-center justify-center shadow-lg z-50"
        onClick={() => setIsOpen(!isOpen)}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        animate={{ scale: isOpen ? 0.9 : [1, 1.05, 1] }}
        transition={{ repeat: isOpen ? 0 : Infinity, repeatType: 'reverse', duration: 1.5 }}
        aria-label="Toggle chatbot"
      >
        <BookA />
      </motion.button>

      {/* Chatbot Modal */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="fixed bottom-16 right-4 w-80 md:w-[600px] h-[600px] z-50 flex flex-col"
            initial={{ x: '100%', opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: '100%', opacity: 0 }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
          >
            <div className="flex-1 flex bg-amber-900 rounded-lg shadow-2xl p-4 transform rotate-1">
              <div className="w-8 bg-amber-800 rounded-l-lg shadow-inner"></div>

              <div className="flex-1 bg-amber-100 rounded-lg p-4 shadow-inner">
                {/* Header */}
                <div className="bg-amber-900 p-3 rounded-t-lg flex justify-between items-center">
                  <h3 className="text-xl font-luckiest text-white">Grimoire Bot</h3>
                  <motion.button
                    className="text-white"
                    onClick={() => setIsOpen(false)}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    aria-label="Close chatbot"
                  >
                    <X className="w-6 h-6" />
                  </motion.button>
                </div>

                {/* Suggestions */}
                {suggestions.length > 0 && (
                  <div className="px-2 pt-3 pb-1 flex flex-wrap gap-2">
                    {suggestions.map((text, idx) => (
                      <motion.button
                        key={idx}
                        className="text-sm bg-amber-200 text-gray-800 px-3 py-1 rounded-full hover:bg-amber-300 transition"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => handleSendMessage(text)}
                      >
                        {text}
                      </motion.button>
                    ))}
                  </div>
                )}

                {/* Chat Messages */}
                <div className="flex-1 p-4 overflow-y-scroll h-96 rounded-b-lg space-y-2">
                  {messages.map((message) => (
                    <motion.div
                      key={message.id}
                      className={`flex ${message.isBot ? 'justify-start' : 'justify-end'}`}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      <div
                        className={`max-w-[70%] p-2 rounded-lg font-mono ${
                          message.isBot
                            ? 'bg-amber-200 text-gray-800'
                            : 'bg-amber-800 text-white'
                        }`}
                      >
                        {message.text}
                      </div>
                    </motion.div>
                  ))}

                  {isLoading && (
                    <div className="flex justify-start">
                      <div className="max-w-[70%] p-2 rounded-lg font-pp bg-amber-200 text-gray-800 animate-pulse">
                        Đang soạn phản hồi...
                      </div>
                    </div>
                  )}

                  <div ref={chatEndRef} />
                </div>

                {/* Input */}
                <div className="p-4 bg-amber-100 flex items-center space-x-2">
                  <input
                    type="text"
                    value={inputText}
                    onChange={(e) => setInputText(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
                    className="flex-1 bg-amber-50 text-gray-800 rounded-lg p-2 font-serif focus:outline-none focus:ring-2 focus:ring-amber-600"
                    placeholder="Type your message..."
                    aria-label="Chat input"
                  />
                  <motion.button
                    className="bg-amber-800 text-white p-2 rounded-lg"
                    onClick={() => handleSendMessage()}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    aria-label="Send message"
                  >
                    <Send className="w-5 h-5" />
                  </motion.button>
                </div>
              </div>

              <div className="w-8 bg-amber-800 rounded-r-lg shadow-inner"></div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Chatbot;
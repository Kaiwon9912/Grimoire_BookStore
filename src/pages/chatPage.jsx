import { useState, useRef, useEffect } from 'react';
import { Send } from 'lucide-react';
import { motion } from 'framer-motion';
import { House,BookText,ShoppingCart, BookHeart} from 'lucide-react'
const ChatPage = () => {
  const [messages, setMessages] = useState([
    { role: 'assistant', content: 'Xin chào! Tôi có thể giúp gì cho bạn?' }
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const bottomRef = useRef(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, loading]);

  const sendMessage = async () => {
    if (!input.trim()) return;

    const newMessage = { role: 'user', content: input };
    setMessages((prev) => [...prev, newMessage]);
    setInput('');
    setLoading(true);

    // Gọi API chatbot ở đây (giả lập delay)
    const response = await fetch('/api/chat', {
      method: 'POST',
      body: JSON.stringify({ messages: [...messages, newMessage] }),
      headers: { 'Content-Type': 'application/json' }
    });

    const data = await response.json();

    setMessages((prev) => [...prev, { role: 'assistant', content: data.reply }]);
    setLoading(false);
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  return (
    <div className='flex'>

    <div className="flex flex-col w-screen h-screen bg-gray-900 text-white">
      {/* Header */}
      <div className="p-4 text-lg font-semibold bg-gray-800 border-b border-gray-700">
        Trợ lý AI
      
    
            
        </div>
      {/* Message area */}
      <div className="flex-1 overflow-y-auto px-14 py-2 space-y-4">
        {messages.map((msg, idx) => (
          <div
            key={idx}
            className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            <div className={`rounded-lg px-4 py-2 max-w-md whitespace-pre-wrap ${
              msg.role === 'user'
                ? 'bg-blue-600 text-white'
                : 'bg-gray-700 text-white'
            }`}>
              {msg.content}
            </div>
          </div>
        ))}

        {loading && (
          <motion.div
            className="text-gray-400 text-sm italic"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            Đang trả lời...
          </motion.div>
        )}

        <div ref={bottomRef}></div>
      </div>

      {/* Input */}
      <div className="border-t border-gray-700 p-4">
        <div className="flex items-center bg-gray-800 rounded-lg px-3 py-2">
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Nhập tin nhắn..."
            rows={1}
            className="flex-1 bg-transparent resize-none outline-none text-white"
          />
          <button onClick={sendMessage} className="ml-2 text-blue-500 hover:text-blue-400">
            <Send size={20} />
          </button>
        </div>
      </div>

    </div>
    <div className='w-3/5 text-white bg-gray-800 p-4'>
        <p>Danh sách sách đề xuất</p>
    </div>
    </div>
  );
};

export default ChatPage;

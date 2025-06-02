import { useState, useRef, useEffect } from 'react';
import { Send } from 'lucide-react';
import { motion } from 'framer-motion';
import { handleQuery } from '../services/chatbotService';
import ReactMarkdown from 'react-markdown';

const suggestions = [
  'Tóm tắt nội dung cuốn sách này',
  'Sách này thuộc thể loại gì?',
  'Ai là tác giả?',
  'Cuốn này có phù hợp với trẻ em không?',
];

const ChatPage = ({ book }) => {
  const [messages, setMessages] = useState([
    { id: 1, text: 'Xin chào! Tôi là Grimoire Bot. Bạn muốn tìm sách gì?', isBot: true },
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const bottomRef = useRef(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, loading]);

  const sendMessage = async (presetText) => {
    const textToSend = presetText || input;
    if (!textToSend.trim()) return;

    const userMessage = {
      id: messages.length + 1,
      text: textToSend,
      isBot: false,
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput('');
    setLoading(true);

    try {
      const botReply = await handleQuery(textToSend, book);

      const botMessage = {
        id: messages.length + 2,
        text: botReply,
        isBot: true,
      };

      setMessages((prev) => [...prev, botMessage]);
    } catch (error) {
      setMessages((prev) => [
        ...prev,
        {
          id: messages.length + 2,
          text: '❌ Có lỗi xảy ra khi gửi câu hỏi.',
          isBot: true,
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  return (
    <div className="flex h-screen">
      {/* Chat Section */}
      <div className="flex flex-col w-full md:w-2/3 bg-gray-900 text-white">
        {/* Header */}
        <div className="p-4 text-lg font-semibold bg-gray-800 border-b border-gray-700">
          Grimoire Bot
        </div>

        {/* Suggestions */}
        <div className="px-4 pt-3 pb-2 flex flex-wrap gap-2 bg-gray-900">
          {suggestions.map((text, idx) => (
            <button
              key={idx}
              className="text-sm bg-gray-700 text-white px-3 py-1 rounded-full hover:bg-gray-600 transition"
              onClick={() => sendMessage(text)}
            >
              {text}
            </button>
          ))}
        </div>

        {/* Chat Messages */}
        <div className="flex-1 overflow-y-auto px-6 py-4 space-y-4">
          {messages.map((msg) => (
            <div
              key={msg.id}
              className={`flex ${msg.isBot ? 'justify-start' : 'justify-end'}`}
            >
              <div
                className={`rounded-lg px-4 py-2 max-w-xl whitespace-pre-wrap font-playwrite ${
                  msg.isBot ? 'bg-gray-700 text-white' : 'bg-blue-600 text-white'
                }`}
              >
                {msg.isBot ? (
                  <ReactMarkdown
                    components={{
                      p: ({ children }) => <p className="mb-2">{children}</p>,
                      a: ({ href, children }) => (
                        <a
                          href={href}
                          className="underline text-blue-300 hover:text-blue-500"
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          {children}
                        </a>
                      ),
                    }}
                  >
                    {msg.text}
                  </ReactMarkdown>
                ) : (
                  msg.text
                )}
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
            <button
              onClick={() => sendMessage()}
              className="ml-2 text-blue-500 hover:text-blue-400"
            >
              <Send size={20} />
            </button>
          </div>
        </div>
      </div>

      {/* Suggested Books Section */}
      <div className="hidden md:block w-1/3 text-white bg-gray-800 p-4">
        <p className="text-lg font-semibold mb-2">📚 Danh sách sách đề xuất</p>
        {/* Nội dung sách có thể thay đổi tùy vào prop `book` */}
        <div className="bg-gray-700 p-3 rounded-lg">
          {book ? (
            <>
              <p className="font-bold">{book.title}</p>
              <p className="text-sm">{book.author}</p>
              <p className="text-xs mt-2">{book.description}</p>
            </>
          ) : (
            <p>Chưa có sách nào được chọn.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default ChatPage;

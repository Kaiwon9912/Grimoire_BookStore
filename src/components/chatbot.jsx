import { useState, useEffect, useRef } from 'react';
import { BookA, X, Send } from 'lucide-react';
import { askBookQuestion, searchBooks } from '../services/groqService';
import ReactMarkdown from 'react-markdown';


const Chatbot = ({ book }) => {
  const [mode, setMode] = useState('ask'); // 'ask' hoặc 'search'

  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    { id: 1, text: 'Chào bạn! Tôi là Grimoire Bot. Hôm nay tôi có thể giúp gì?', isBot: true },
  ]);
  const [inputText, setInputText] = useState('');
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

    try {
      let botReply;

      if (mode === 'ask') {
        botReply = await askBookQuestion(textToSend, book);
      } else {
        const result = await searchBooks(textToSend);
        botReply = result.answer;
      }

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
    }
  };


  return (
    <>
      <button
        className="fixed bottom-4 right-4 w-12 h-12 bg-amber-900 text-white rounded-full flex items-center justify-center shadow-lg z-50"
        onClick={() => setIsOpen(!isOpen)}
        aria-label="Toggle chatbot"
      >
        <BookA />
      </button>

      {isOpen && (
        <div className="fixed bottom-16 right-4 w-80 md:w-[600px] h-[600px] z-50 flex flex-col">
          <div className="flex-1 flex bg-amber-900 rounded-lg shadow-2xl p-4">
            <div className="w-8 bg-amber-800 rounded-l-lg shadow-inner"></div>

            <div className="flex-1 bg-amber-100 rounded-lg p-4 shadow-inner">
              {/* Header */}
              <div className="bg-amber-900 p-3 rounded-t-lg flex justify-between items-center">
                <h3 className="text-xl font-serif text-white">Grimoire Bot</h3>
                <button
                  className="text-white"
                  onClick={() => setIsOpen(false)}
                  aria-label="Close chatbot"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>

              {/* Suggestions */}
              <div className="px-2 pt-3 pb-1 flex flex-wrap gap-2">
                {suggestions.map((text, idx) => (
                  <button
                    key={idx}
                    className="text-sm bg-amber-200 text-gray-800 px-3 py-1 rounded-full hover:bg-amber-300 transition"
                    onClick={() => handleSendMessage(text)}
                  >
                    {text}
                  </button>
                ))}
              </div>

              {/* Chat Messages */}
              <div className="flex-1 p-4 overflow-y-scroll h-96 rounded-b-lg space-y-2">
                {messages.map((message) => (
                  <div
                    key={message.id}
                    className={`flex ${message.isBot ? 'justify-start' : 'justify-end'}`}
                  >
                    <div
                      className={`max-w-[70%] p-2 rounded-lg font-playwrite ${message.isBot ? 'bg-amber-200 text-gray-800' : 'bg-amber-800 text-white'
                        }`}
                    >
                      {message.isBot ? (
                        <ReactMarkdown
                          components={{
                            p: ({ children }) => <p className="mb-2">{children}</p>,
                            a: ({ href, children }) => (
                              <a
                                href={href}
                                className="underline text-blue-700 hover:text-blue-900"
                                target="_blank"
                                rel="noopener noreferrer"
                              >
                                {children}
                              </a>
                            ),
                          }}
                        >
                          {message.text}
                        </ReactMarkdown>
                      ) : (
                        <>{message.text}</>
                      )}
                    </div>
                  </div>
                ))}
                <div ref={chatEndRef} />
              </div>



              {/* Input */}
              <div className="py-4 bg-amber-100 flex items-center space-x-2">
                <div className="">
                  <select
                    value={mode}
                    onChange={(e) => setMode(e.target.value)}
                    className="bg-orange-900 text-white p-2"
                  >
                    <option value="ask">Hỏi</option>
                    <option value="search">Tìm</option>
                  </select>
                </div>
                <input
                  type="text"
                  value={inputText}
                  onChange={(e) => setInputText(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
                  className="flex-1 bg-amber-50 text-gray-800 rounded-lg p-2 font-serif focus:outline-none focus:ring-2 focus:ring-amber-600"
                  placeholder="Type your message..."
                  aria-label="Chat input"
                />
                <button
                  className="bg-amber-800 text-white p-2 rounded-lg"
                  onClick={() => handleSendMessage()}
                  aria-label="Send message"
                >
                  <Send className="w-5 h-5" />
                </button>
              </div>
            </div>

            <div className="w-8 bg-amber-800 rounded-r-lg shadow-inner"></div>
          </div>
        </div>
      )}
    </>
  );
};

export default Chatbot;

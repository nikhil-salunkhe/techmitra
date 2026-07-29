import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiMessageSquare, FiX, FiSend, FiUser, FiChevronRight } from 'react-icons/fi';
import { FaRobot } from 'react-icons/fa';

// Training Q&A knowledge base
const trainingQA = {
  'hello': { answer: 'Hello! 👋 Welcome to TechMitra Training Support. How can I help you today? You can ask me about our training program, fees, duration, technologies, or enrollment process.', suggestions: ['What is the fee?', 'How long is training?', 'What technologies do you teach?'] },
  'hi': { answer: 'Hi there! 👋 Welcome to TechMitra. I\'m here to answer all your questions about our 2-month intensive training program. What would you like to know?', suggestions: ['Tell me about the program', 'How to enroll?', 'Is there mentorship?'] },
  'fee': { answer: '💰 Our training program costs just ₹3,999 (one-time payment) for the complete 2-month program. This includes live sessions, project development, 1-on-1 mentorship, certificate, and more. No hidden charges!', suggestions: ['What\'s included?', 'How to pay?', 'Other programs?'] },
  'price': { answer: '💰 The total fee for our 2-month intensive training program is ₹3,999 only. This is a one-time payment with no installment or hidden fees.', suggestions: ['What do I get?', 'Duration of training?', 'Enroll now'] },
  'cost': { answer: '💵 Our training program is priced at just ₹3,999 for the complete 2-month duration. This includes all learning materials, live sessions, mentorship, and certificate.', suggestions: ['Is there a refund policy?', 'What is covered?', 'How to join?'] },
  'duration': { answer: '📅 The training program runs for 2 months (8 weeks) with live online sessions. You can choose from morning (8-10 AM), day (11-1 PM), evening (4-6 PM), or weekend batches.', suggestions: ['What batch timings?', 'What will I learn?', 'Fee details'] },
  'month': { answer: '⏱️ Our program is 2 months long - designed to be intensive and comprehensive. You\'ll complete a real-world project in this time with 1-on-1 mentorship.', suggestions: ['What technologies?', 'Project work?', 'Certificate?'] },
  'technology': { answer: '💻 We offer training in the following technologies:\n\n1️⃣ MERN Web Project Development\n2️⃣ Java Application Project Development\n3️⃣ Python Application Project Development\n4️⃣ React Native Mobile App Project Development\n\nAll programs include project development and placement preparation.', suggestions: ['Which is best for me?', 'MERN details', 'Python details'] },
  'mern': { answer: '⚛️ MERN Web Project Development includes: HTML5, CSS3, JavaScript, React.js, Node.js, Express.js, MongoDB, REST APIs, Git and GitHub. You\'ll build a complete web project from scratch during the 2-month program!', suggestions: ['Fee details', 'Duration', 'Enroll now'] },
  'python': { answer: '🐍 Python Application Project Development covers: Python, Python OOP, Exception Handling, MySQL, Flask or Django basics, REST API basics, Git and GitHub. You\'ll build real-world applications with industry-standard practices.', suggestions: ['MERN details', 'Java details', 'Fee'] },
  'java': { answer: '☕ Java Application Project Development includes: Core Java, OOP, Java Collections, Exception Handling, JDBC, MySQL, Spring Boot basics, REST API basics, Git and GitHub. Enterprise-grade application development with best practices.', suggestions: ['Python details', 'MERN details', 'Duration'] },
  'react native': { answer: '📱 React Native Mobile App Project Development: JavaScript, React Native, Expo, Navigation, Forms and Validation, API Integration, Firebase or MongoDB backend, Android application development. Build cross-platform mobile apps!', suggestions: ['MERN details', 'Fee', 'Duration'] },
  'enroll': { answer: '✅ To enroll, simply fill out the registration form on our Enrollment page. The process is:\n\n1️⃣ Fill the enrollment form\n2️⃣ Pay ₹3,999 (one-time)\n3️⃣ Get onboarded with welcome kit\n4️⃣ Start learning!\n\nA confirmation email will be sent to you after successful enrollment.', suggestions: ['Fee details', 'What do I get?', 'Contact support'] },
  'register': { answer: '📝 Registration is easy! Visit our Enrollment page, fill in your details (name, email, phone, college, technology preference), and submit. Our team will contact you within 24 hours to confirm your batch.', suggestions: ['Fee', 'Batch timings', 'Contact'] },
  'certificate': { answer: '🎓 Yes! Upon successful completion of the 2-month program and your project, you will receive a verified completion certificate from TechMitra that you can add to your LinkedIn profile and resume.', suggestions: ['What projects?', 'Placement help?', 'Enroll now'] },
  'mentor': { answer: '👨‍🏫 All students get 1-on-1 mentorship from industry experts. You\'ll have dedicated mentors for:\n• Code reviews & feedback\n• Project guidance\n• Career counseling\n• Interview preparation', suggestions: ['Fee includes?', 'Duration', 'Projects'] },
  'project': { answer: '🛠️ You\'ll build your own final year project from scratch! This includes:\n• Project planning & architecture\n• Frontend & Backend development\n• Database design\n• Deployment\n• GitHub portfolio setup\nAll with mentor guidance!', suggestions: ['Technologies', 'Certificate', 'Placement'] },
  'placement': { answer: '💼 Yes! Our program includes placement preparation:\n• Resume & LinkedIn profile review\n• Mock interviews\n• Aptitude training\n• Technical interview preparation\n• Portfolio building with GitHub', suggestions: ['Fee', 'Duration', 'Certificate'] },
  'batch': { answer: '🕐 We offer flexible batch timings:\n🌅 Morning: 8-10 AM\n☀️ Day: 11-1 PM\n🌆 Evening: 4-6 PM\n🎯 Weekend batches also available\nYou can choose your preferred batch during enrollment!', suggestions: ['Duration', 'Fee', 'Enroll now'] },
  'contact': { answer: '📞 You can reach us at:\n• Phone: +91 97641 49564\n• Email: techmitrofficial@gmail.com\n• WhatsApp: +91 97641 49564\n• Or visit our Contact page for more info!', suggestions: ['Enroll now', 'Fee details', 'Program info'] },
  'refund': { answer: '🔒 Please contact our support team directly for any refund-related queries. You can reach us at techmitrofficial@gmail.com or call +91 97641 49564 for assistance.', suggestions: ['Fee', 'Contact', 'Enroll'] },
  'help': { answer: '🤖 I\'m TechMitra AI Assistant! I can help you with:\n\n• 💰 Training fee & payment (₹3,999)\n• 📅 Program duration (2 months)\n• 💻 Technologies offered\n• 📝 Enrollment process\n• 🎓 Certificate & placement\n• 👨‍🏫 Mentorship details\n• 🕐 Batch timings\n\nJust type your question!', suggestions: ['What is the fee?', 'How to enroll?', 'What technologies?'] },
};

// Default response
const defaultResponse = {
  answer: 'I\'m not sure I understand. 🤔 Try asking me about:\n\n• 💰 Training fee (₹3,999)\n• 📅 Duration (2 months)\n• 💻 Technologies we teach\n• 📝 How to enroll\n• 🎓 Certificate & placement\n• 🕐 Batch timings',
  suggestions: ['What is the fee?', 'How to enroll?', 'What technologies?', 'Training duration?', 'Contact support'],
};

function findBestMatch(message) {
  const msg = message.toLowerCase().trim();
  
  // Direct matches
  for (const [key, value] of Object.entries(trainingQA)) {
    if (msg.includes(key) || key.includes(msg)) {
      return value;
    }
  }
  
  // Partial matches
  const words = msg.split(' ');
  for (const word of words) {
    if (word.length > 2) {
      for (const [key, value] of Object.entries(trainingQA)) {
        if (key.includes(word) || word.includes(key)) {
          return value;
        }
      }
    }
  }
  
  // Check for common combinations
  if (msg.includes('what') && (msg.includes('include') || msg.includes('covered') || msg.includes('get'))) {
    return trainingQA['fee'];
  }
  if (msg.includes('how') && (msg.includes('long') || msg.includes('much time'))) {
    return trainingQA['duration'];
  }
  if (msg.includes('which') && (msg.includes('tech') || msg.includes('language') || msg.includes('stack'))) {
    return trainingQA['technology'];
  }
  if (msg.includes('how') && (msg.includes('enroll') || msg.includes('register') || msg.includes('join'))) {
    return trainingQA['enroll'];
  }
  if (msg.includes('how') && (msg.includes('pay') || msg.includes('much'))) {
    return trainingQA['fee'];
  }
  
  return defaultResponse;
}

const Chatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    { role: 'bot', content: '👋 Hi! I\'m the TechMitra AI Assistant. Ask me anything about our training program!' }
  ]);
  const [input, setInput] = useState('');
  const [showSuggestions, setShowSuggestions] = useState(true);
  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);

  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages]);

  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isOpen]);

  const handleSend = (text) => {
    const message = text || input;
    if (!message.trim()) return;

    setMessages(prev => [...prev, { role: 'user', content: message }]);
    setInput('');
    setShowSuggestions(false);

    // Simulate typing delay
    setTimeout(() => {
      const response = findBestMatch(message);
      setMessages(prev => [...prev, { role: 'bot', content: response.answer }]);
      
      // Show suggestions after response
      if (response.suggestions) {
        setTimeout(() => {
          setMessages(prev => [...prev, { role: 'suggestions', suggestions: response.suggestions }]);
        }, 500);
      }
    }, 600);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSend();
    }
  };

  const handleSuggestionClick = (suggestion) => {
    handleSend(suggestion);
  };

  return (
    <>
      {/* Chat Button */}
      <button
        onClick={() => setIsOpen(true)}
        className={`fixed bottom-6 right-6 z-50 w-14 h-14 rounded-full bg-gradient-to-r from-primary-500 to-primary-700 text-white shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center ${isOpen ? 'scale-0 opacity-0' : 'scale-100 opacity-100'}`}
      >
        <FiMessageSquare className="w-6 h-6" />
      </button>

      {/* Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="fixed bottom-6 right-6 z-50 w-[380px] max-w-[calc(100vw-2rem)] bg-white rounded-2xl shadow-2xl border border-gray-100 overflow-hidden"
            style={{ maxHeight: '600px', height: 'calc(100vh - 120px)' }}
          >
            {/* Header */}
            <div className="bg-gradient-to-r from-primary-600 to-primary-800 p-4 text-white">
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center mr-3">
                    <FaRobot className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-sm">TechMitra AI</h3>
                    <p className="text-xs text-blue-200">Training Assistant</p>
                  </div>
                </div>
                <button onClick={() => setIsOpen(false)} className="p-1.5 hover:bg-white/10 rounded-lg transition-colors">
                  <FiX className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-3" style={{ height: 'calc(100% - 130px)' }}>
              {messages.map((msg, idx) => (
                <div key={idx}>
                  {msg.role === 'suggestions' ? (
                    <div className="flex flex-wrap gap-2 mt-2">
                      {msg.suggestions.map((suggestion, sIdx) => (
                        <button
                          key={sIdx}
                          onClick={() => handleSuggestionClick(suggestion)}
                          className="px-3 py-1.5 bg-gray-100 hover:bg-primary-50 hover:text-primary-700 text-dark-600 rounded-full text-xs font-medium transition-colors flex items-center"
                        >
                          {suggestion} <FiChevronRight className="w-3 h-3 ml-1" />
                        </button>
                      ))}
                    </div>
                  ) : (
                    <div className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                      <div className={`flex items-start max-w-[85%] ${msg.role === 'user' ? 'flex-row-reverse' : ''}`}>
                        <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${msg.role === 'user' ? 'bg-primary-100 ml-2' : 'bg-gray-100 mr-2'}`}>
                          {msg.role === 'user' ? <FiUser className="w-4 h-4 text-primary-600" /> : <FaRobot className="w-4 h-4 text-dark-600" />}
                        </div>
                        <div className={`rounded-xl px-4 py-2.5 text-sm leading-relaxed whitespace-pre-line ${
                          msg.role === 'user' 
                            ? 'bg-primary-500 text-white rounded-tr-sm' 
                            : 'bg-gray-100 text-dark-700 rounded-tl-sm'
                        }`}>
                          {msg.content}
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              ))}
              <div ref={messagesEndRef} />
            </div>

            {/* Input */}
            <div className="border-t border-gray-100 p-3 bg-white">
              <div className="flex items-center gap-2">
                <input
                  ref={inputRef}
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder="Ask about training..."
                  className="flex-1 px-4 py-2.5 rounded-xl border border-gray-200 focus:border-primary-500 focus:outline-none bg-gray-50 text-sm"
                />
                <button
                  onClick={() => handleSend()}
                  disabled={!input.trim()}
                  className="p-2.5 bg-primary-500 text-white rounded-xl hover:bg-primary-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <FiSend className="w-4 h-4" />
                </button>
              </div>
              <p className="text-[10px] text-dark-400 mt-1.5 text-center">
                AI assistant for training-related queries
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Chatbot;
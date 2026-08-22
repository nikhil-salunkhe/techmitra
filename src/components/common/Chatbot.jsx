import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiMessageSquare, FiX, FiSend, FiUser, FiChevronRight } from 'react-icons/fi';
import { FaRobot } from 'react-icons/fa';

// Training Q&A knowledge base
const trainingQA = {
  'hello': { answer: 'Hello! 👋 Welcome to TechMitra Training Support. How can I help you today? You can ask me about our training programs, fees, duration, technologies, projects, or enrollment process.', suggestions: ['What programs do you offer?', 'What is the fee?', 'How to enroll?'] },
  'hi': { answer: 'Hi there! 👋 Welcome to TechMitra. I\'m here to answer all your questions about our training programs. We have 5 different programs including AI, MERN, Java, Python, and React Native. What would you like to know?', suggestions: ['Tell me about programs', 'What is the fee?', 'How to enroll?', 'Services for my business'] },

  // Business Services Information
  'business': { answer: '💼 TechMitra now serves BUSINESSES too! We build:\n\n🌐 Business Websites\n🧾 GST Billing Software\n📊 Management Systems\n\nWe serve banks, shops, schools, classes, hotels, malls and all types of businesses.\n\n👉 Visit our Services page or fill the Business Enquiry form - our expert will call you within 24 hours with a FREE consultation and custom quote!', suggestions: ['Website cost for shop?', 'Billing software details', 'Fill enquiry form'] },
  'website cost': { answer: '🌐 Business Website Packages:\n\n✅ Basic Website\n• Mobile-friendly design\n• Contact & enquiry forms\n• WhatsApp button + Google Maps\n• SEO-friendly structure\n\n✅ Advanced Website\n• Booking systems, admin panels\n• Payment integration\n• Photo galleries\n\nAll websites include 1 month FREE support! Pricing is customized per project - fill our Business Enquiry form for a free exact quotation.', suggestions: ['Delivery time?', 'See examples', 'Fill enquiry form'] },
  'billing': { answer: '🧾 Billing Software Details:\n\n• GST Invoice Generation\n• Inventory / Stock Management\n• Customer Records & History\n• Daily / Monthly Sales Reports\n• Thermal Printer Support\n• Barcode Scanning Support\n• Multi-user Access & Data Backup\n\nPerfect for shops, hotels, restaurants and classes. One-time payment - own it forever! Fill the enquiry form for a free custom quote.', suggestions: ['Delivery time?', 'Is training provided?', 'Fill enquiry form'] },
  'delivery time': { answer: '⏱️ Our Delivery Timelines:\n\n🌐 Simple Business Website: 7-14 days\n🧾 Billing Software: 2-3 weeks\n📊 Management Systems: 3-6 weeks\n\nWe deliver fast without compromising quality. Need it urgently? Mention it in your enquiry form and we will prioritize!', suggestions: ['Fill enquiry form', 'Pricing details', 'WhatsApp us'] },
  'training provided': { answer: '🎓 YES! We provide FREE training when we deliver your website or software:\n\n• Complete walkthrough of all features\n• Training in Marathi, Hindi or English\n• Staff training included\n• Written user guides\n• 1 month free support after delivery\n\nYour team will be comfortable using everything before we leave!', suggestions: ['Fill enquiry form', 'Maintenance charges?', 'WhatsApp us'] },
  'maintenance': { answer: '🔧 Maintenance & Support:\n\n✅ First 1 month: FREE support included\n\nAfter that (optional annual plans):\n• Updates & security patches\n• Regular data backups\n• Priority support on WhatsApp/Call\n\nNo forced subscriptions - pay only if you want ongoing support. One-time projects remain yours forever!', suggestions: ['Fill enquiry form', 'Pricing details', 'WhatsApp us'] },
  'fill enquiry form': { answer: '📝 Filling our Business Enquiry form takes less than 2 minutes!\n\nJust click the "For Business" button in the top menu or visit the Services page and tap "Get Free Consultation".\n\nYou tell us:\n• Your business name & type\n• What service you need (Website / Billing / Both)\n• Your budget range (optional)\n\nOur expert calls you within 24 hours with a FREE consultation! 📞', suggestions: ['Services for my business', 'Pricing details', 'WhatsApp us'] },
  'whatsapp': { answer: '💬 Chat with us on WhatsApp for instant replies!\n\n📱 +91 97641 49564\n\nTap here to start: wa.me/919764149564\n\nWe usually reply within a few hours during business hours (Mon-Sat, 9 AM - 8 PM). You can also fill the Business Enquiry form for a callback within 24 hours.', suggestions: ['Fill enquiry form', 'Services for my business'] },
  'see examples': { answer: '🏢 Solutions we build for businesses:\n\n🛒 Shops & Retail - GST billing software with inventory\n🏫 Coaching Classes - Website + fee management system\n🏨 Hotels - Booking website with photo gallery\n🎓 Schools - Complete school management system\n🏦 Banks & Finance - Customer portals & dashboards\n\nThese are examples of what we deliver! Fill the Business Enquiry form, tell us what YOUR business needs, and we will show you a free demo plan!', suggestions: ['Fill enquiry form', 'Website cost for shop?', 'Billing software details'] },
  'pricing details': { answer: '💰 Free Consultation - No Hidden Charges:\n\n🌐 Business Website\n🧾 GST Billing Software\n📊 Management Systems\n\n✅ One-time payment - own it forever\n✅ Free consultation & custom quotation\n✅ 1 month free support + free staff training\n\nEvery project is quoted based on your exact requirements - fill the enquiry form and get your free quote within 24 hours!', suggestions: ['Fill enquiry form', 'Delivery time?', 'Maintenance'] },

  // Program Information
  'program': { answer: '🎯 We offer 5 comprehensive training programs:\n\n1️⃣ AI Through Development (1 Month - ₹1,499)\n   Learn AI-powered development with GitHub Copilot, Cline AI, and VS Code\n\n2️⃣ MERN Web Development (2 Months - ₹3,999)\n   Build full-stack web apps with MongoDB, Express, React, Node.js\n\n3️⃣ Java Application Development (2 Months - ₹3,999)\n   Enterprise-grade Java apps with Spring Boot, MySQL, JDBC\n\n4️⃣ Python Application Development (2 Months - ₹3,999)\n   Python backend development with Django/Flask, MySQL, APIs\n\n5️⃣ React Native Mobile Apps (2 Months - ₹3,999)\n   Cross-platform mobile app development for Android\n\nAll programs include live sessions, project development, and certificate!', suggestions: ['Which is best for beginners?', 'Tell me about MERN', 'Tell me about AI program'] },
  
  'ai program': { answer: '🤖 AI Through Development (1 Month - ₹1,499)\n\nThis is our newest program! Learn to use AI tools to code faster and smarter.\n\n📚 What you\'ll learn:\n• VS Code Setup & Productivity\n• GitHub Copilot for AI code suggestions\n• Cline AI & Claude AI for intelligent coding\n• AI-powered debugging & refactoring\n• Prompt engineering for code\n• Git & GitHub with AI assistance\n\n🛠️ Projects you\'ll build:\n• AI-Powered Chatbot\n• Smart Code Assistant\n• AI Content Generator\n\nPerfect for: Students who want to boost productivity with AI tools!\nNo prior AI experience needed.', suggestions: ['Fee details', 'Duration', 'How to enroll?'] },
  
  'mern': { answer: '⚛️ MERN Web Project Development (2 Months - ₹3,999)\n\nBuild complete web applications using modern technologies!\n\n📚 Technologies covered:\n• HTML5, CSS3, JavaScript (ES6+)\n• React.js (Components, Hooks, Router)\n• Node.js & Express.js\n• MongoDB & Mongoose\n• REST APIs & Authentication\n• Git & GitHub\n\n🛠️ Projects you\'ll build:\n• E-Commerce Platform (with cart & payments)\n• Hospital Management System\n• Real-time Chat Application\n\nPerfect for: Students interested in web development and full-stack careers.', suggestions: ['Fee details', 'Duration', 'Prerequisites'] },
  
  'java': { answer: '☕ Java Application Project Development (2 Months - ₹3,999)\n\nBuild enterprise-grade Java applications with modern frameworks!\n\n📚 Technologies covered:\n• Core Java & OOP Concepts\n• Java Collections & Streams\n• Exception Handling\n• JDBC & MySQL\n• Spring Boot Basics\n• REST APIs & JPA/Hibernate\n• Git & GitHub\n\n🛠️ Projects you\'ll build:\n• Banking Application (with transactions)\n• College Management System\n• Inventory Management System\n\nPerfect for: Students targeting enterprise software development roles.', suggestions: ['Fee details', 'Duration', 'Prerequisites'] },
  
  'python': { answer: '🐍 Python Application Project Development (2 Months - ₹3,999)\n\nBuild real-world Python applications with backend frameworks!\n\n📚 Technologies covered:\n• Python Programming & OOP\n• Exception Handling & Modules\n• MySQL Database\n• Django or Flask Framework\n• REST API Development\n• JSON & Third-party APIs\n• Git & GitHub\n\n🛠️ Projects you\'ll build:\n• AI Chatbot with NLP\n• E-Learning Platform\n• Expense Tracker with Analytics\n\nPerfect for: Students interested in backend development and data applications.', suggestions: ['Fee details', 'Duration', 'Prerequisites'] },
  
  'react native': { answer: '📱 React Native Mobile App Development (2 Months - ₹3,999)\n\nBuild cross-platform mobile apps for Android and iOS!\n\n📚 Technologies covered:\n• JavaScript & React Basics\n• React Native & Expo\n• Navigation (Tab, Drawer, Stack)\n• Forms & Validation\n• API Integration\n• Firebase or MongoDB Backend\n• Android Build & APK Generation\n\n🛠️ Projects you\'ll build:\n• Food Delivery App (with real-time tracking)\n• Fitness Tracker App\n• Social Media App\n\nPerfect for: Students wanting to build mobile applications!', suggestions: ['Fee details', 'Duration', 'Prerequisites'] },
  
  // Fee Information
  'fee': { answer: '💰 Our Training Fees:\n\n🤖 AI Through Development: ₹1,499 (1 Month)\n\n💻 All Other Programs (2 Months each):\n• MERN Web Development: ₹3,999\n• Java Application Development: ₹3,999\n• Python Application Development: ₹3,999\n• React Native Mobile Apps: ₹3,999\n\n✅ One-time payment - No hidden charges!\n✅ Includes all learning materials\n✅ Live sessions + project development\n✅ Certificate of completion\n✅ Placement preparation', suggestions: ['What\'s included?', 'Payment options?', 'Is there a refund?'] },
  
  'price': { answer: '💰 Pricing Details:\n\n1️⃣ AI Program: ₹1,499 (1 month)\n2️⃣ All Other Programs: ₹3,999 (2 months)\n\n💳 Payment: One-time payment only\n🎓 What\'s included:\n• Live online sessions\n• Hands-on project development\n• 1-on-1 mentorship\n• Code reviews & feedback\n• Course materials & resources\n• Certificate of completion\n• Placement preparation\n\nNo EMI or installment options available currently.', suggestions: ['How to pay?', 'Refund policy?', 'Enroll now'] },
  
  'cost': { answer: '💵 Program Costs:\n\n• AI Through Development: ₹1,499\n• MERN, Java, Python, React Native: ₹3,999 each\n\nThis is a complete package with no additional charges. Everything you need is included in the fee!', suggestions: ['What is included?', 'How to enroll?', 'Contact support'] },
  
  // Duration Information
  'duration': { answer: '📅 Program Durations:\n\n🤖 AI Through Development: 1 Month (4 weeks)\n💻 All Other Programs: 2 Months (8 weeks)\n\n⏰ Schedule:\n• Live online sessions\n• Flexible batch timings\n• Choose your preferred time slot\n\nBatch Options:\n🌅 Morning: 8-10 AM\n☀️ Day: 11-1 PM\n🌆 Evening: 4-6 PM\n🎯 Weekend: Also available', suggestions: ['Batch timings', 'What will I learn?', 'Fee details'] },
  
  'month': { answer: '⏱️ Program Length:\n\n• AI Program: 1 month intensive training\n• Other Programs: 2 months (8 weeks)\n\nDesigned to be comprehensive yet efficient. You\'ll complete a real-world project with 1-on-1 mentorship in this timeframe!', suggestions: ['What technologies?', 'Project work?', 'Certificate?'] },
  
  // Technology Information
  'technology': { answer: '💻 We offer training in 5 technology stacks:\n\n1️⃣ AI Through Development (1 month)\n   GitHub Copilot, Cline AI, VS Code, AI tools\n\n2️⃣ MERN Web Development\n   MongoDB, Express, React, Node.js\n\n3️⃣ Java Application Development\n   Core Java, Spring Boot, MySQL, JDBC\n\n4️⃣ Python Application Development\n   Python, Django/Flask, MySQL, REST APIs\n\n5️⃣ React Native Mobile Apps\n   JavaScript, React Native, Expo, Firebase\n\nWhich technology interests you?', suggestions: ['Which is best for beginners?', 'MERN details', 'AI program details'] },
  
  // Detailed Technology Responses
  'mern stack': { answer: '⚛️ MERN Stack Web Development (2 Months - ₹3,999)\n\nComplete web development with modern stack:\n\n📚 Technologies:\n• HTML5, CSS3, JavaScript ES6+\n• React.js (Hooks, Router, State Management)\n• Node.js & Express.js\n• MongoDB & Mongoose ODM\n• REST APIs & JWT Authentication\n• Git & GitHub\n\n🛠️ Projects:\n• E-Commerce Platform\n• Hospital Management System\n• Real-time Chat App\n\n🎓 Certificate included | 💼 Placement prep included', suggestions: ['Fee', 'Duration', 'Prerequisites'] },
  
  'mern web': { answer: '⚛️ MERN Web Development Details:\n\nDuration: 2 Months | Fee: ₹3,999\n\n📖 Curriculum:\nWeek 1-2: JavaScript & HTML/CSS\nWeek 3-4: React.js\nWeek 5-6: Node.js, Express, MongoDB\nWeek 7-8: Project & Deployment\n\n🛠️ Real Projects:\n• E-Commerce Platform\n• Hospital Management System\n• Real-time Chat Application\n\nSkills: HTML5, CSS3, JavaScript, React, Node.js, Express, MongoDB, Git', suggestions: ['Enroll now', 'What is included?', 'Batch timings'] },
  
  // Enrollment Information
  'enroll': { answer: '✅ How to Enroll:\n\n📝 Step 1: Fill Registration Form\n   Visit our Enrollment page and fill in:\n   • Full Name, Email, Phone\n   • College, Course, Year\n   • Technology preference\n   • Preferred batch timing\n\n💳 Step 2: Make Payment\n   Pay ₹3,999 (or ₹1,499 for AI program)\n\n🎓 Step 3: Get Onboarded\n   Receive welcome kit and access\n\n🚀 Step 4: Start Learning!\n   Join live sessions and build projects\n\n📧 You\'ll get a confirmation email after enrollment!', suggestions: ['Fee details', 'What do I get?', 'Batch timings'] },
  
  'register': { answer: '📝 Registration Process:\n\n1. Go to Enrollment page\n2. Select your training program\n3. Fill in your details:\n   - Full Name\n   - Email Address\n   - Phone Number (10 digits)\n   - College/University\n   - Course & Year\n   - City\n   - Technology preference\n   - Preferred batch\n4. Submit the form\n5. Our team contacts you within 24 hours!\n\nSimple and easy! 🎉', suggestions: ['Fee', 'Batch timings', 'Contact support'] },
  
  'join': { answer: '🎯 How to Join TechMitra:\n\n1️⃣ Choose your training program\n2️⃣ Fill the enrollment form\n3️⃣ Pay the fee (one-time)\n4️⃣ Get onboarded\n5️⃣ Start learning!\n\nVisit: techmitr.netlify.app/enrollment\n\nNeed help? Call +91 97641 49564', suggestions: ['Fee details', 'Programs offered', 'What is included?'] },
  
  // Certificate & Placement
  'certificate': { answer: '🎓 Yes! You get a verified certificate!\n\n✅ Certificate of Completion from TechMitra\n✅ Can be added to LinkedIn & Resume\n✅ Industry-recognized\n✅ Verifiable credential\n\nRequirements:\n• Complete the 2-month program\n• Submit your final project\n• Attend required sessions\n\n💼 Plus placement preparation:\n• Resume & LinkedIn review\n• Mock interviews\n• Technical interview prep\n• Portfolio building', suggestions: ['Placement help?', 'What projects?', 'Enroll now'] },
  
  'placement': { answer: '💼 Yes! We provide placement preparation:\n\n📋 Placement Support Includes:\n• Resume review & optimization\n• LinkedIn profile enhancement\n• Mock interviews (technical & HR)\n• Aptitude training\n• Technical interview preparation\n• GitHub portfolio building\n• Soft skills training\n\n🎯 Goal: Make you job-ready!\n\nNote: We prepare you for placements but don\'t guarantee job placement.', suggestions: ['Fee', 'Certificate', 'What companies?'] },
  
  'job': { answer: '💼 Placement Preparation:\n\nWe prepare you for job interviews:\n• Resume & LinkedIn review\n• Mock interviews\n• Technical interview prep\n• Aptitude training\n• Portfolio development\n\n🎓 Certificate provided on completion\n\nWhile we don\'t guarantee placement, our training makes you industry-ready for various tech roles!', suggestions: ['What roles?', 'Salary expectations?', 'Enroll now'] },
  
  // Mentorship
  'mentor': { answer: '👨‍🏫 1-on-1 Mentorship Included!\n\nEvery student gets dedicated mentor support:\n\n🎯 Code Reviews & Feedback\n   Get your code reviewed by experts\n\n🛠️ Project Guidance\n   Mentors help with project architecture\n\n💼 Career Counseling\n   Guidance on career paths\n\n🎤 Interview Preparation\n   Mock interviews & tips\n\n🤝 Doubt Solving\n   Clear doubts in live sessions\n\nAll mentors are industry professionals!', suggestions: ['Fee includes?', 'Duration', 'How to enroll?'] },
  
  // Projects
  'project': { answer: '🛠️ You\'ll Build Real-World Projects!\n\nEach program has 3 major projects:\n\n🤖 AI Program:\n• AI-Powered Chatbot\n• Smart Code Assistant\n• AI Content Generator\n\n⚛️ MERN:\n• E-Commerce Platform\n• Hospital Management System\n• Real-time Chat App\n\n☕ Java:\n• Banking Application\n• College Management System\n• Inventory Management\n\n🐍 Python:\n• AI Chatbot with NLP\n• E-Learning Platform\n• Expense Tracker\n\n📱 React Native:\n• Food Delivery App\n• Fitness Tracker\n• Social Media App\n\nAll projects go into your GitHub portfolio!', suggestions: ['Technologies used?', 'Certificate?', 'Placement help?'] },
  
  // Batch Timings
  'batch': { answer: '🕐 Flexible Batch Timings:\n\nChoose your preferred time:\n\n🌅 Morning Batch: 8:00 AM - 10:00 AM\n   Perfect for early birds!\n\n☀️ Day Batch: 11:00 AM - 1:00 PM\n   Great for afternoon learners\n\n🌆 Evening Batch: 4:00 PM - 6:00 PM\n   Ideal for college students\n\n🎯 Weekend Batch: Available on request\n   For working professionals\n\n💻 All batches are live online sessions\n📹 Recordings provided if you miss a session', suggestions: ['Duration', 'Fee', 'How to enroll?'] },
  
  'timing': { answer: '⏰ Batch Timings:\n\n🌅 Morning: 8-10 AM\n☀️ Day: 11 AM - 1 PM\n🌆 Evening: 4-6 PM\n🎯 Weekend: Available\n\nAll sessions are live online via Zoom/Google Meet\nRecordings shared after each session\nChoose your preferred batch during enrollment!', suggestions: ['Duration', 'Fee', 'Enroll now'] },
  
  // Contact Information
  'contact': { answer: '📞 Contact TechMitra:\n\n📱 Phone: +91 97641 49564\n📧 Email: techmitrofficial@gmail.com\n💬 WhatsApp: +91 97641 49564\n🌐 Website: www.techmitr.netlify.app\n\n📍 Location: India (Online Training)\n\n🕐 Support Hours: 9 AM - 7 PM (Mon-Sat)\n\nWe typically respond within a few hours!', suggestions: ['Enroll now', 'Fee details', 'Program info'] },
  
  'phone': { answer: '📞 Contact Numbers:\n\n• Phone: +91 97641 49564\n• WhatsApp: +91 97641 49564\n\nYou can call or WhatsApp us for:\n• Enrollment queries\n• Program information\n• Technical support\n• Career guidance\n\nAvailable: 9 AM - 7 PM (Monday to Saturday)', suggestions: ['Email', 'Address', 'How to enroll?'] },
  
  'email': { answer: '📧 Email Us:\n\n• techmitrofficial@gmail.com\n\nUse email for:\n• Detailed queries\n• Official documentation\n• Support requests\n• Partnership inquiries\n\nWe respond within 24 hours!', suggestions: ['Phone', 'WhatsApp', 'Enroll now'] },
  
  // Prerequisites
  'prerequisite': { answer: '📚 Prerequisites by Program:\n\n🤖 AI Through Development:\n   • No prior AI experience needed\n   • Basic computer knowledge\n   • We teach everything from scratch!\n\n💻 MERN, Java, Python, React Native:\n   • Basic programming knowledge\n   • Understanding of OOP concepts (for Java/Python)\n   • HTML/CSS basics (for web/mobile)\n\n💡 Don\'t worry if you don\'t meet all requirements - we start from fundamentals and help everyone learn!', suggestions: ['Which program for beginners?', 'Fee details', 'How to enroll?'] },
  
  'requirement': { answer: '📋 Program Requirements:\n\n🤖 AI Program: No prerequisites\n   (Basic computer knowledge sufficient)\n\n💻 Other Programs:\n   • Basic programming understanding\n   • Familiarity with computers\n   • Willingness to learn!\n\n🎓 We start from basics and gradually advance\n💪 No need to be an expert - we\'ll make you one!', suggestions: ['Which program for me?', 'Fee', 'Duration'] },
  
  // What's Included
  'include': { answer: '✅ What\'s Included in Every Program:\n\n🎓 Learning:\n• Live online sessions\n• Hands-on project development\n• Code reviews & feedback\n• Course materials & resources\n• Session recordings\n\n👨‍🏫 Support:\n• 1-on-1 mentorship\n• Doubt clearing sessions\n• Project guidance\n• Career counseling\n\n🎁 Bonus:\n• Certificate of completion\n• GitHub portfolio\n• Placement preparation\n• LinkedIn profile review\n\nEverything you need to succeed!', suggestions: ['Fee', 'Duration', 'Enroll now'] },
  
  // Refund Policy
  'refund': { answer: '💰 Refund Policy:\n\nPlease contact our support team directly for refund-related queries.\n\n📧 Email: techmitrofficial@gmail.com\n📞 Phone: +91 97641 49564\n\nThey will assist you with:\n• Refund eligibility\n• Refund process\n• Timeline for refunds\n\nWe recommend reviewing all program details before enrollment.', suggestions: ['Fee', 'Contact', 'Enroll'] },
  
  // General Help
  'help': { answer: '🤖 I\'m TechMitra AI Assistant!\n\nI can help you with:\n\n🎯 Programs:\n• AI Through Development (1 month)\n• MERN, Java, Python, React Native (2 months each)\n\n💰 Fees: ₹1,499 to ₹3,999\n📅 Duration: 1-2 months\n💻 Technologies: 5 different stacks\n📝 Enrollment: Online registration\n🎓 Certificate: Yes, provided\n👨‍🏫 Mentorship: 1-on-1 support\n🕐 Batches: Flexible timings\n\nJust ask me anything!', suggestions: ['What programs?', 'What is the fee?', 'How to enroll?'] },
  
  'about': { answer: '🏢 About TechMitra:\n\nTechMitra Training Solutions - Building Future Tech Leaders!\n\n🎯 Mission:\nTo provide quality tech education with hands-on project experience and industry-relevant skills.\n\n💼 What we offer:\n• 5 comprehensive training programs\n• Live online sessions\n• Real-world project development\n• 1-on-1 mentorship\n• Placement preparation\n\n🌟 Vision:\nEmpower students with practical skills to excel in their tech careers.\n\n📍 India (Online Training)', suggestions: ['Programs', 'Fee', 'How to enroll?'] },
  
  'who': { answer: '👥 Who Should Join TechMitra:\n\n✅ Final year students (project help)\n✅ Students wanting practical skills\n✅ Career changers\n✅ Freshers seeking jobs\n✅ Anyone interested in tech\n\n🎓 All skill levels welcome:\n• Beginners (we start from basics)\n• Intermediate (enhance your skills)\n• Advanced (master new technologies)\n\n💪 No experience? No problem! We\'ll teach you everything.', suggestions: ['Which program?', 'Fee', 'How to enroll?'] },
  
  'why': { answer: '⭐ Why Choose TechMitra:\n\n🎯 Practical Learning:\n• Build real projects, not just theory\n• Hands-on coding experience\n• Industry-standard tools\n\n👨‍🏫 Expert Mentors:\n• 1-on-1 guidance\n• Code reviews\n• Career counseling\n\n💼 Career Focused:\n• Placement preparation\n• Resume & LinkedIn review\n• Interview prep\n\n🚀 Fresh Startup Advantage:\n• Launched Jan 2026 - modern 2026-ready curriculum\n• Small batches = extra personal attention\n• Early-bird launch pricing - lowest you will find\n\n💰 Affordable:\n• Quality education at low cost\n• One-time payment\n• No hidden charges', suggestions: ['Fee', 'Programs', 'Enroll now'] },
};

// Default response
const defaultResponse = {
  answer: 'I\'m not sure I understand. 🤔 Try asking me about:\n\n• 🎯 Training programs (AI, MERN, Java, Python, React Native)\n• 💰 Course fees (₹1,499 to ₹3,999)\n• 💼 Business services (Websites & Billing Software)\n• 📝 Enrollment / Enquiry process\n• 🎓 Certificate & placement\n• 👨‍🏫 1-on-1 mentorship\n• 🕐 Batch timings\n• 📞 Contact information',
  suggestions: ['What programs do you offer?', 'What is the fee?', 'How to enroll?', 'Services for my business', 'Contact support'],
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
  if (msg.includes('what') && (msg.includes('include') || msg.includes('covered') || msg.includes('get') || msg.includes('included'))) {
    return trainingQA['include'];
  }
  if (msg.includes('how') && (msg.includes('long') || msg.includes('much time') || msg.includes('duration'))) {
    return trainingQA['duration'];
  }
  if (msg.includes('which') && (msg.includes('tech') || msg.includes('language') || msg.includes('stack') || msg.includes('program'))) {
    return trainingQA['technology'];
  }
  if (msg.includes('how') && (msg.includes('enroll') || msg.includes('register') || msg.includes('join') || msg.includes('apply'))) {
    return trainingQA['enroll'];
  }
  if (msg.includes('how') && (msg.includes('pay') || msg.includes('much') || msg.includes('cost') || msg.includes('fee'))) {
    return trainingQA['fee'];
  }
  if (msg.includes('what') && (msg.includes('project') || msg.includes('build'))) {
    return trainingQA['project'];
  }
  if (msg.includes('certificate') || msg.includes('certification')) {
    return trainingQA['certificate'];
  }
  if (msg.includes('placement') || msg.includes('job') || msg.includes('career')) {
    return trainingQA['placement'];
  }
  if (msg.includes('mentor') || msg.includes('guidance') || msg.includes('support')) {
    return trainingQA['mentor'];
  }
  if (msg.includes('batch') || msg.includes('timing') || msg.includes('schedule') || msg.includes('time')) {
    return trainingQA['batch'];
  }
  if (msg.includes('contact') || msg.includes('phone') || msg.includes('email') || msg.includes('reach') || msg.includes('call')) {
    return trainingQA['contact'];
  }
  if (msg.includes('prerequisite') || msg.includes('requirement') || msg.includes('need to know') || msg.includes('background')) {
    return trainingQA['prerequisite'];
  }
  if (msg.includes('refund') || msg.includes('money back') || msg.includes('cancel')) {
    return trainingQA['refund'];
  }
  if (msg.includes('about') || msg.includes('who are you') || msg.includes('tell me about')) {
    return trainingQA['about'];
  }
  if (msg.includes('why') && (msg.includes('choose') || msg.includes('techmitra') || msg.includes('join'))) {
    return trainingQA['why'];
  }
  if (msg.includes('who') && (msg.includes('join') || msg.includes('suitable') || msg.includes('can'))) {
    return trainingQA['who'];
  }
  
  // Business services queries
  if (msg.includes('shop') || msg.includes('hotel') || msg.includes('school') || msg.includes('mall') || msg.includes('bank') || msg.includes('gst') || msg.includes('invoice') || msg.includes('my business') || msg.includes('enquiry form')) {
    return trainingQA['business'];
  }

  // Program-specific queries
  if (msg.includes('ai') && (msg.includes('program') || msg.includes('course') || msg.includes('training'))) {
    return trainingQA['ai program'];
  }
  if (msg.includes('mern') || msg.includes('web development') || msg.includes('full stack')) {
    return trainingQA['mern'];
  }
  if (msg.includes('java') && (msg.includes('program') || msg.includes('course') || msg.includes('training'))) {
    return trainingQA['java'];
  }
  if (msg.includes('python') && (msg.includes('program') || msg.includes('course') || msg.includes('training'))) {
    return trainingQA['python'];
  }
  if (msg.includes('react native') || msg.includes('mobile') || msg.includes('android') || msg.includes('app development')) {
    return trainingQA['react native'];
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
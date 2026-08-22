export const navLinks = [
  { name: 'Home', path: '/' },
  {
    name: 'Programs',
    path: '/programs',
    megaMenu: [
      {
        category: 'AI & Development',
        items: [
          { name: 'AI Through Development - 1 Month', path: '/programs/ai', icon: 'SiPython' },
        ],
      },
      {
        category: 'Web Development',
        items: [
          { name: 'MERN Web Project Development', path: '/programs/mern', icon: 'SiMongodb' },
          { name: 'Java Application Project Development', path: '/programs/java', icon: 'SiJava' },
          { name: 'Python Application Project Development', path: '/programs/python', icon: 'SiPython' },
        ],
      },
      {
        category: 'Mobile Development',
        items: [
          { name: 'React Native Mobile App Project Development', path: '/programs/react-native', icon: 'SiReact' },
        ],
      },
    ],
  },
  { name: 'About', path: '/about' },
  { name: 'Services', path: '/services' },
  { name: 'Enrollment', path: '/enrollment' },
  { name: 'Contact', path: '/contact' },
];

export const stats = [
  { value: '5', label: 'Technology Programs' },
  { value: '3', label: 'Business Services' },
  { value: '1:1', label: 'Mentor Support' },
  { value: '100%', label: 'Practical Learning' },
];

export const whyTechMitra = [
  {
    icon: 'SiPython',
    title: 'Industry Oriented Training',
    description: 'Learn what companies actually use. Our curriculum is designed by industry experts with real-world project experience.',
    color: 'from-blue-500 to-cyan-500',
  },
  {
    icon: 'SiGooglemeet',
    title: 'Live Online Sessions',
    description: 'Attend interactive live sessions from anywhere. Get real-time doubt clearing and direct mentorship.',
    color: 'from-purple-500 to-pink-500',
  },
  {
    icon: 'SiCodefactor',
    title: 'Real Project Development',
    description: 'Build your own final year project from scratch. Learn requirement analysis to deployment.',
    color: 'from-green-500 to-emerald-500',
  },
  {
    icon: 'SiTeachable',
    title: 'Expert Mentors',
    description: 'Learn from senior developers with 5+ years of industry experience from top tech companies.',
    color: 'from-orange-500 to-red-500',
  },
  {
    icon: 'SiCodefactor',
    title: 'Code Reviews',
    description: 'Get your code reviewed by industry professionals. Learn best practices and coding standards.',
    color: 'from-indigo-500 to-violet-500',
  },
  {
    icon: 'SiGooglemeet',
    title: 'Weekly Mentor Meetings',
    description: 'One-on-one weekly meetings with your mentor. Track progress and get personalized guidance.',
    color: 'from-teal-500 to-cyan-500',
  },
  {
    icon: 'SiVercel',
    title: 'Deployment Guidance',
    description: 'Learn to deploy your projects on cloud platforms. Make your project live and accessible.',
    color: 'from-rose-500 to-pink-500',
  },
  {
    icon: 'SiGoogleclassroom',
    title: 'Mock Viva',
    description: 'Prepare for your college viva with mock sessions. Get confident in presenting your project.',
    color: 'from-amber-500 to-yellow-500',
  },
  {
    icon: 'SiGithub',
    title: 'GitHub Portfolio',
    description: 'Build a professional GitHub profile with your project. Showcase your work to recruiters.',
    color: 'from-sky-500 to-blue-500',
  },
  {
    icon: 'SiGoogleclassroom',
    title: 'Certificate',
    description: 'Get a verified certificate after completion. Boost your resume and LinkedIn profile.',
    color: 'from-lime-500 to-green-500',
  },
];

export const techPrograms = [
  {
    id: 'ai',
    name: 'AI Through Development',
    tagline: '1 Month Live Project Training Program',
    icon: 'SiPython',
    color: 'from-purple-500 to-pink-600',
    duration: '1 Month',
    projects: ['AI-Powered Chatbot', 'Smart Code Assistant', 'AI Content Generator'],
    skills: ['GitHub Copilot', 'Cline AI', 'VS Code Setup', 'AI Code Generation', 'Debugging with AI', 'Refactoring with AI', 'Build & Deploy Live Projects', 'Git & GitHub'],
    fee: '₹1,499',
    enrolled: 'Limited',
  },
  {
    id: 'mern',
    name: 'MERN Web Project Development',
    tagline: 'Practical Web Project Development',
    icon: 'SiMongodb',
    color: 'from-green-500 to-emerald-600',
    duration: '2 Months',
    projects: ['E-Commerce Platform', 'Hospital Management System', 'Real-time Chat Application'],
    skills: ['HTML5', 'CSS3', 'JavaScript', 'React.js', 'Node.js', 'Express.js', 'MongoDB', 'REST APIs', 'Git and GitHub', 'Project Development', 'Basic Deployment'],
    fee: '₹3,999',
    enrolled: 'Limited',
  },
  {
    id: 'java',
    name: 'Java Application Project Development',
    tagline: 'Practical Java Application Development',
    icon: 'SiJava',
    color: 'from-red-500 to-orange-600',
    duration: '2 Months',
    projects: ['Banking Application', 'College Management System', 'Inventory Management'],
    skills: ['Core Java', 'OOP', 'Java Collections', 'Exception Handling', 'JDBC', 'MySQL', 'Spring Boot Basics', 'REST API Basics', 'Git and GitHub', 'Project Development'],
    fee: '₹3,999',
    enrolled: 'Limited',
  },
  {
    id: 'python',
    name: 'Python Application Project Development',
    tagline: 'Practical Python Application Development',
    icon: 'SiPython',
    color: 'from-blue-500 to-indigo-600',
    duration: '2 Months',
    projects: ['AI Chatbot', 'E-Learning Platform', 'Expense Tracker'],
    skills: ['Python', 'Python OOP', 'Exception Handling', 'MySQL', 'Flask or Django Basics', 'REST API Basics', 'Git and GitHub', 'Project Development'],
    fee: '₹3,999',
    enrolled: 'Limited',
  },
  {
    id: 'react-native',
    name: 'React Native Mobile App Project Development',
    tagline: 'Practical Mobile App Development',
    icon: 'SiReact',
    color: 'from-cyan-500 to-blue-600',
    duration: '2 Months',
    projects: ['Food Delivery App', 'Fitness Tracker', 'Social Media App'],
    skills: ['JavaScript', 'React Native', 'Expo', 'React Native Components', 'Navigation', 'Forms and Validation', 'API Integration', 'Firebase or MongoDB', 'Android Development', 'Project Development'],
    fee: '₹3,999',
    enrolled: 'Limited',
  },
];

export const projectLifecycle = [
  { step: 1, title: 'Idea', description: 'Choose your project idea based on your interests and career goals' },
  { step: 2, title: 'Requirement Analysis', description: 'Analyze project requirements, scope and technical feasibility' },
  { step: 3, title: 'Planning', description: 'Create project roadmap, timeline and resource allocation' },
  { step: 4, title: 'UI Design', description: 'Design beautiful user interfaces using Figma and modern design principles' },
  { step: 5, title: 'Database', description: 'Design database architecture, schemas and relationships' },
  { step: 6, title: 'Development', description: 'Write clean, efficient code following industry best practices' },
  { step: 7, title: 'Testing', description: 'Test application thoroughly with unit, integration and E2E tests' },
  { step: 8, title: 'Deployment', description: 'Deploy your project to cloud platforms like AWS, Vercel, Netlify' },
  { step: 9, title: 'Documentation', description: 'Create comprehensive project documentation and API docs' },
  { step: 10, title: 'Presentation', description: 'Prepare professional presentation for your college viva' },
  { step: 11, title: 'Viva', description: 'Face mock viva sessions and get ready for the final evaluation' },
];

export const studentJourney = [
  { step: 1, title: 'Registration', description: 'Sign up and complete your enrollment' },
  { step: 2, title: 'Technology Selection', description: 'Choose your preferred technology stack' },
  { step: 3, title: 'Project Selection', description: 'Pick a project aligned with your interests' },
  { step: 4, title: 'Training', description: 'Learn through live sessions and hands-on practice' },
  { step: 5, title: 'Project Development', description: 'Build your project step by step with mentor guidance' },
  { step: 6, title: 'Testing', description: 'Test and debug your application thoroughly' },
  { step: 7, title: 'Deployment', description: 'Deploy your project to production' },
  { step: 8, title: 'Presentation', description: 'Present your project professionally' },
  { step: 9, title: 'Certificate', description: 'Receive your completion certificate' },
];

export const featuredProjects = [
  { title: 'E-Commerce Platform', tech: 'MERN Stack', image: 'EC', description: 'Full-featured online store with payment gateway' },
  { title: 'Hospital Management', tech: 'Java Application', image: 'HM', description: 'Complete hospital administration system' },
  { title: 'College Management', tech: 'Python Application', image: 'CM', description: 'College administration and student portal' },
  { title: 'Inventory Management', tech: 'MERN Stack', image: 'IM', description: 'Real-time inventory tracking system' },
  { title: 'Attendance System', tech: 'Python Application', image: 'AS', description: 'Face recognition attendance system' },
  { title: 'Restaurant Management', tech: 'Java Application', image: 'RM', description: 'Complete restaurant POS system' },
  { title: 'AI Chatbot', tech: 'Python Application', image: 'AI', description: 'Intelligent customer support chatbot' },
  { title: 'Expense Tracker', tech: 'MERN Stack', image: 'ET', description: 'Personal finance management app' },
  { title: 'Cricket Tournament', tech: 'React Native', image: 'CT', description: 'Cricket tournament management app' },
  { title: 'Booking System', tech: 'MERN Stack', image: 'BS', description: 'Online appointment booking platform' },
];

export const faqData = [
  { q: 'What is TechMitra?', a: 'TechMitra is an online technology training company that helps BCA, BCS, BSc CS, BSc IT, MCA and MSc students build industry-oriented final year projects. We also build websites, apps and billing software for businesses.' },
  { q: 'How is TechMitra different from other platforms?', a: 'Unlike other platforms that provide ready-made projects, we teach you to build projects from scratch. You learn the complete development lifecycle including requirement analysis, planning, design, development, testing, deployment and documentation.' },
  { q: 'Who can join TechMitra programs?', a: 'Any college student pursuing BCA, BCS, BSc CS, BSc IT, MCA, MSc or equivalent degrees can join our programs.' },
  { q: 'Which technologies do you teach?', a: 'We offer programs in AI Through Development, MERN Web Project Development, Java Application Project Development, Python Application Project Development, and React Native Mobile App Project Development.' },
  { q: 'How are classes conducted?', a: 'All classes are conducted online via live interactive sessions. You can attend from anywhere and get real-time doubt clearing.' },
  { q: 'Will I build my own project?', a: 'Yes! Under mentor guidance, you will build your own final year project from scratch. This ensures you understand every aspect of your project.' },
  { q: 'How long is the program?', a: 'We offer 1-month (AI Through Development) and 2-month programs, designed to be intensive and comprehensive.' },
  { q: 'What kind of projects can I build?', a: 'You can choose from 10+ project categories including E-Commerce, Hospital Management, AI Chatbot, Social Media App, AI-Powered Tools, and more.' },
  { q: 'Do I get a certificate?', a: 'Yes, you receive a verified certificate after successfully completing the program and your project.' },
  { q: 'Is there any placement assistance?', a: 'We provide resume guidance, LinkedIn profile optimization, GitHub portfolio building, and mock interview preparation.' },
  { q: 'What is the fee structure?', a: 'Our course fee starts at ₹1,499 for the AI Through Development program and ₹3,999 for 2-month programs. Check our Enrollment page for detailed pricing.' },
  { q: 'Can I pay in installments?', a: 'Yes, we offer flexible installment options. Contact us for more details.' },
  { q: 'Do I need prior coding experience?', a: 'Basic programming knowledge is helpful but not mandatory. We start from fundamentals and build up to advanced concepts.' },
  { q: 'How are mentors assigned?', a: 'You are assigned a dedicated mentor based on your technology choice. Mentors are industry professionals with 5+ years of experience.' },
  { q: 'What if I miss a live session?', a: 'All sessions are recorded and made available in your dashboard. You can watch them anytime.' },
  { q: 'How do I track my progress?', a: 'You get a personalized dashboard showing your progress, upcoming sessions, tasks, and project milestones.' },
  { q: 'Is there a free trial?', a: 'Yes, we offer a free seminar session where you can experience our teaching methodology before enrolling.' },
  { q: 'Can I change my technology after enrollment?', a: 'Yes, you can switch technologies within the first week of enrollment.' },
  { q: 'How do I contact support?', a: 'You can reach us via email, phone, WhatsApp, or our contact form. We respond within 24 hours.' },
  { q: 'When does the next batch start?', a: 'New batches start every month. Check our website for upcoming batch schedules.' },
];

// ==================== BUSINESS SERVICES DATA ====================

export const businessNavLinks = [
  { name: 'Services', path: '/services' },
  { name: 'Business Enquiry', path: '/business-enquiry' },
];

export const businessStats = [
  { value: '30+', label: 'Businesses Served' },
  { value: '50+', label: 'Websites Delivered' },
  { value: '15+', label: 'Billing Softwares' },
  { value: '24hrs', label: 'Response Time' },
];

export const businessServices = [
  {
    id: 'website',
    title: 'Business Website Development',
    tagline: 'Your Business, Online & Professional',
    icon: 'FiGlobe',
    color: 'from-emerald-500 to-teal-600',
    description: 'Modern, fast and mobile-responsive websites that build trust and bring customers to your business.',
    features: ['Responsive Design (Mobile/Tablet/Desktop)', 'Contact & Enquiry Forms', 'Google Maps Integration', 'WhatsApp Chat Button', 'SEO Friendly Structure', 'Fast Loading Speed', 'Free Domain Setup Guidance', '1 Month Free Support'],
    startingPrice: 'Custom Quote',
  },
  {
    id: 'billing',
    title: 'Billing Software Development',
    tagline: 'Simplify Your Daily Billing',
    icon: 'FiPrinter',
    color: 'from-blue-500 to-indigo-600',
    description: 'Easy-to-use billing and GST invoice software customized for shops, hotels, classes and more.',
    features: ['GST Invoice Generation', 'Inventory / Stock Management', 'Customer Records & History', 'Daily / Monthly Sales Reports', 'Thermal Printer Support', 'Barcode Scanning Support', 'Multi-user Access', 'Data Backup & Security'],
    startingPrice: 'Custom Quote',
  },
  {
    id: 'management',
    title: 'Management Systems',
    tagline: 'Run Your Business Smartly',
    icon: 'FiLayers',
    color: 'from-purple-500 to-pink-600',
    description: 'Complete management systems for schools, classes, hotels and institutions to manage everything digitally.',
    features: ['Student / Staff Management', 'Fee Collection & Receipts', 'Attendance Tracking', 'Exam Results Management', 'Room / Table Booking (Hotels)', 'SMS / Email Notifications', 'Admin Dashboard & Reports', 'Cloud Data Storage'],
    startingPrice: 'Custom Quote',
  },
];

export const businessTypesWeServe = [
  {
    name: 'Banks & Finance',
    icon: 'FiBriefcase',
    color: 'from-blue-500 to-cyan-500',
    solutions: 'Loan calculators, customer portals, accounting dashboards and secure data management systems.',
  },
  {
    name: 'Shops & Retail',
    icon: 'FiShoppingCart',
    color: 'from-orange-500 to-red-500',
    solutions: 'Billing software, inventory tracking, online catalogs and GST-ready invoicing systems.',
  },
  {
    name: 'Schools & Colleges',
    icon: 'FiBookOpen',
    color: 'from-green-500 to-emerald-500',
    solutions: 'School websites, admission forms, student management and result publishing systems.',
  },
  {
    name: 'Classes & Coaching',
    icon: 'FiUsers',
    color: 'from-purple-500 to-pink-500',
    solutions: 'Class websites, fee management, attendance tracking and batch scheduling software.',
  },
  {
    name: 'Hotels & Restaurants',
    icon: 'FiHome',
    color: 'from-amber-500 to-yellow-500',
    solutions: 'Hotel booking sites, room management, restaurant POS billing and menu display systems.',
  },
  {
    name: 'Malls & Complexes',
    icon: 'FiGrid',
    color: 'from-teal-500 to-cyan-500',
    solutions: 'Directory websites, shop listing portals, parking management and event promotion platforms.',
  },
];

export const businessProcessSteps = [
  { number: '01', title: 'Fill Enquiry Form', desc: 'Tell us about your business and what you need - takes less than 2 minutes.' },
  { number: '02', title: 'Free Consultation Call', desc: 'Our expert contacts you within 24 hours to understand your exact requirements.' },
  { number: '03', title: 'Get Quotation & Timeline', desc: 'Receive a transparent price quote and delivery timeline. No hidden charges.' },
  { number: '04', title: 'We Build & Deliver', desc: 'We develop your solution, provide training to your staff and offer ongoing support.' },
];

export const whyChooseForBusiness = [
  {
    icon: 'FiDollarSign',
    title: 'Affordable Pricing',
    description: 'Startup-friendly pricing designed for local businesses. Pay once, own it forever - no heavy monthly subscriptions.',
    color: 'from-emerald-500 to-teal-500',
  },
  {
    icon: 'FiClock',
    title: 'Fast Delivery',
    description: 'Most websites delivered in 7-14 days and billing software in 2-3 weeks without compromising quality.',
    color: 'from-blue-500 to-indigo-500',
  },
  {
    icon: 'FiShield',
    title: 'Secure & Reliable',
    description: 'Industry-standard security practices, regular backups and reliable performance for your business data.',
    color: 'from-purple-500 to-pink-500',
  },
  {
    icon: 'FiHeadphones',
    title: 'Local Language Support',
    description: 'We speak your language. Get support in Marathi, Hindi and English whenever you need help.',
    color: 'from-orange-500 to-red-500',
  },
  {
    icon: 'FiSmartphone',
    title: 'Mobile First Design',
    description: 'Over 70% of customers browse on mobile. Every solution we build works perfectly on phones.',
    color: 'from-teal-500 to-cyan-500',
  },
  {
    icon: 'FiTrendingUp',
    title: 'Grow Your Business',
    description: 'Get found on Google, accept enquiries online and manage operations digitally to grow faster.',
    color: 'from-lime-500 to-green-500',
  },
];

export const businessFaqData = [
  { q: 'How much does a business website cost?', a: 'The cost depends on your requirements - features like contact forms, booking systems or admin panels. Fill our enquiry form and our expert will call you within 24 hours with a free, exact quotation.' },
  { q: 'How much does billing software cost?', a: 'Billing software is quoted based on the features you need - GST invoicing, inventory, reports and printer support. It is a one-time payment and remains yours forever. Fill our enquiry form for a free customized quotation.' },
  { q: 'How long does it take to deliver?', a: 'Simple business websites take 7-14 days, billing software takes 2-3 weeks, and complete management systems take 3-6 weeks depending on complexity.' },
  { q: 'Do you provide training to use the software?', a: 'Yes! We provide free training to you and your staff on how to use the website admin panel or billing software. Training is given in Marathi, Hindi or English as per your comfort.' },
  { q: 'Is there any maintenance or yearly charge?', a: 'We provide 1 month of free support after delivery. After that, optional annual maintenance plans are available for updates, backups and priority support - completely optional.' },
  { q: 'Can I see a demo before ordering?', a: 'Absolutely! We show live demos of similar projects we have built so you can see exactly what you will get before making any payment.' },
  { q: 'Will my website appear on Google?', a: 'Yes, all our websites are built with SEO-friendly structure and we guide you through Google Business Profile setup so local customers can find you easily.' },
  { q: 'Do you work with businesses outside my city?', a: 'Yes! We work with businesses across India remotely via phone, WhatsApp and video calls. Everything from requirement gathering to training is done online.' },
];



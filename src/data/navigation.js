export const navLinks = [
  { name: 'Home', path: '/' },
  {
    name: 'Programs',
    path: '/programs',
    megaMenu: [
      {
        category: 'Full Stack Development',
        items: [
          { name: 'MERN Stack', path: '/programs/mern', icon: 'SiMongodb' },
          { name: 'Java Full Stack', path: '/programs/java', icon: 'SiJava' },
          { name: 'Python Full Stack', path: '/programs/python', icon: 'SiPython' },
        ],
      },
      {
        category: 'Mobile Development',
        items: [
          { name: 'React Native', path: '/programs/react-native', icon: 'SiReact' },
        ],
      },
    ],
  },
  { name: 'About', path: '/about' },
  { name: 'Enrollment', path: '/enrollment' },
  { name: 'Contact', path: '/contact' },
];

export const stats = [
  { value: '500+', label: 'Students Trained' },
  { value: '100+', label: 'Projects Completed' },
  { value: '4', label: 'Technology Programs' },
  { value: '100%', label: 'Online' },
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
    id: 'mern',
    name: 'MERN Stack',
    tagline: 'Full Stack JavaScript Development',
    icon: 'SiMongodb',
    color: 'from-green-500 to-emerald-600',
    duration: '2 Months',
    projects: ['E-Commerce Platform', 'Hospital Management System', 'Real-time Chat Application'],
    skills: ['React', 'Node.js', 'MongoDB', 'Express.js', 'Redux', 'REST APIs', 'JWT', 'WebSockets'],
    fee: '₹4,999',
    enrolled: '200+',
  },
  {
    id: 'java',
    name: 'Java Full Stack',
    tagline: 'Enterprise Application Development',
    icon: 'SiJava',
    color: 'from-red-500 to-orange-600',
    duration: '2 Months',
    projects: ['Banking Application', 'College Management System', 'Inventory Management'],
    skills: ['Core Java', 'Spring Boot', 'Hibernate', 'MySQL', 'React', 'Microservices', 'JWT', 'Docker'],
    fee: '₹4,999',
    enrolled: '150+',
  },
  {
    id: 'python',
    name: 'Python Full Stack',
    tagline: 'Data-Driven Web Development',
    icon: 'SiPython',
    color: 'from-blue-500 to-indigo-600',
    duration: '2 Months',
    projects: ['AI Chatbot', 'E-Learning Platform', 'Expense Tracker'],
    skills: ['Python', 'Django', 'Flask', 'PostgreSQL', 'React', 'Machine Learning', 'REST APIs', 'Docker'],
    fee: '₹4,999',
    enrolled: '180+',
  },
  {
    id: 'react-native',
    name: 'React Native',
    tagline: 'Cross-Platform Mobile Apps',
    icon: 'SiReact',
    color: 'from-cyan-500 to-blue-600',
    duration: '2 Months',
    projects: ['Food Delivery App', 'Fitness Tracker', 'Social Media App'],
    skills: ['React Native', 'Expo', 'Firebase', 'Redux', 'Navigation', 'Push Notifications', 'APIs', 'App Store'],
    fee: '₹4,999',
    enrolled: '120+',
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
  { title: 'Hospital Management', tech: 'Java Full Stack', image: 'HM', description: 'Complete hospital administration system' },
  { title: 'College Management', tech: 'Python Full Stack', image: 'CM', description: 'College administration and student portal' },
  { title: 'Inventory Management', tech: 'MERN Stack', image: 'IM', description: 'Real-time inventory tracking system' },
  { title: 'Attendance System', tech: 'Python Full Stack', image: 'AS', description: 'Face recognition attendance system' },
  { title: 'Restaurant Management', tech: 'Java Full Stack', image: 'RM', description: 'Complete restaurant POS system' },
  { title: 'AI Chatbot', tech: 'Python Full Stack', image: 'AI', description: 'Intelligent customer support chatbot' },
  { title: 'Expense Tracker', tech: 'MERN Stack', image: 'ET', description: 'Personal finance management app' },
  { title: 'Cricket Tournament', tech: 'React Native', image: 'CT', description: 'Cricket tournament management app' },
  { title: 'Booking System', tech: 'MERN Stack', image: 'BS', description: 'Online appointment booking platform' },
];

export const testimonials = [
  {
    name: 'Priya Sharma',
    college: 'Pune University',
    project: 'E-Commerce Platform',
    review: 'TechMitra completely transformed my approach to project development. The mentors guided me through every step, from requirement analysis to deployment. I built a production-ready e-commerce platform.',
    rating: 5,
  },
  {
    name: 'Rahul Verma',
    college: 'Delhi University',
    project: 'Hospital Management System',
    review: 'The live sessions were incredibly helpful. The mentor explained everything in detail and helped me understand the industry standards. I got an internship because of my project!',
    rating: 5,
  },
  {
    name: 'Ananya Patel',
    college: 'Mumbai University',
    project: 'AI Chatbot',
    review: 'I was scared of coding before joining TechMitra. But the way they teach and support you, I built an AI chatbot for my final year project. Best decision ever!',
    rating: 5,
  },
  {
    name: 'Arun Kumar',
    college: 'Bangalore University',
    project: 'Banking Application',
    review: 'The Java Full Stack program was excellent. I learned Spring Boot, Hibernate, and React in depth. The mock viva sessions prepared me well for college viva.',
    rating: 5,
  },
  {
    name: 'Neha Singh',
    college: 'Kolkata University',
    project: 'Food Delivery App',
    review: 'TechMitra is the best platform for final year projects. They don\'t just give you a ready-made project, they teach you how to build it yourself. The React Native course was amazing!',
    rating: 5,
  },
  {
    name: 'Vikram Joshi',
    college: 'Hyderabad University',
    project: 'College Management System',
    review: 'The deployment guidance was super helpful. My project is now live on AWS and I show it to every recruiter. Got placed in a top MNC!',
    rating: 5,
  },
];

export const faqData = [
  { q: 'What is TechMitra?', a: 'TechMitra is an online technology training company that helps BCA, BCS, BSc CS, BSc IT, MCA and MSc students build industry-oriented final year projects.' },
  { q: 'How is TechMitra different from other platforms?', a: 'Unlike other platforms that provide ready-made projects, we teach you to build projects from scratch. You learn the complete development lifecycle including requirement analysis, planning, design, development, testing, deployment and documentation.' },
  { q: 'Who can join TechMitra programs?', a: 'Any college student pursuing BCA, BCS, BSc CS, BSc IT, MCA, MSc or equivalent degrees can join our programs.' },
  { q: 'Which technologies do you teach?', a: 'We offer programs in MERN Stack, Java Full Stack, Python Full Stack, and React Native App Development.' },
  { q: 'How are classes conducted?', a: 'All classes are conducted online via live interactive sessions. You can attend from anywhere and get real-time doubt clearing.' },
  { q: 'Will I build my own project?', a: 'Yes! Under mentor guidance, you will build your own final year project from scratch. This ensures you understand every aspect of your project.' },
  { q: 'How long is the program?', a: 'Our programs are 2 months (8 weeks) long, designed to be intensive and comprehensive.' },
  { q: 'What kind of projects can I build?', a: 'You can choose from 10+ project categories including E-Commerce, Hospital Management, AI Chatbot, Social Media App, and more.' },
  { q: 'Do I get a certificate?', a: 'Yes, you receive a verified certificate after successfully completing the program and your project.' },
  { q: 'Is there any placement assistance?', a: 'We provide resume guidance, LinkedIn profile optimization, GitHub portfolio building, and mock interview preparation.' },
  { q: 'What is the fee structure?', a: 'We offer Standard and Premium packages starting from ₹4,999. Check our Enrollment page for detailed pricing.' },
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
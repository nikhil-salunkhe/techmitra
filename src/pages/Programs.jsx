import React, { useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { FiCheck, FiClock, FiUsers, FiStar, FiArrowRight, FiBook, FiTool, FiAward, FiCalendar, FiMonitor } from 'react-icons/fi';
import { FaReact, FaJava, FaPython, FaNodeJs } from 'react-icons/fa';

const programsData = [
  {
    id: 'mern',
    name: 'MERN Web Project Development',
    tagline: 'Practical Web Project Development',
    icon: FaNodeJs,
    color: 'from-green-500 to-emerald-600',
    bgColor: 'from-green-50 to-emerald-50',
    duration: '2 Months',
    durationWeeks: 8,
    fee: '₹3,999',
    premiumFee: '₹3,999',
    enrolled: '200+',
    overview: 'Learn modern web development technologies and build a practical, real-world web project using the MERN technology ecosystem. This 2-month training focuses on hands-on development, API integration, database connectivity, GitHub, and project completion.',
    curriculum: [
      { week: 'Week 1-2', title: 'JavaScript & HTML/CSS Fundamentals', topics: ['ES6+ Features', 'Async/Await', 'Promises', 'DOM Manipulation', 'HTML5', 'CSS3'] },
      { week: 'Week 3-4', title: 'React.js', topics: ['Components & Props', 'State & Hooks', 'React Router', 'REST API Integration', 'Forms & Validation', 'Custom Hooks'] },
      { week: 'Week 5-6', title: 'Node.js, Express.js & MongoDB', topics: ['REST APIs', 'Middleware', 'Authentication (JWT)', 'CRUD Operations', 'Mongoose ODM', 'Database Design'] },
      { week: 'Week 7-8', title: 'Project & Deployment', topics: ['Project Architecture', 'Git and GitHub', 'Basic Deployment', 'Code Review', 'Documentation', 'Presentation'] },
    ],
    projects: [
      { name: 'E-Commerce Platform', desc: 'Full-featured online store with cart, payments, and admin panel' },
      { name: 'Hospital Management System', desc: 'Patient management, appointment booking, and billing system' },
      { name: 'Real-time Chat Application', desc: 'Messaging app with WebSocket, rooms, and file sharing' },
    ],
    skills: ['HTML5', 'CSS3', 'JavaScript', 'React.js', 'Node.js', 'Express.js', 'MongoDB', 'REST APIs', 'Git and GitHub', 'Project Development', 'Basic Deployment'],
    prerequisites: 'Basic knowledge of HTML, CSS, and JavaScript fundamentals',
    includes: 'Live Sessions, Code Reviews, Project Support, Certificate, Resume Guidance',
  },
  {
    id: 'java',
    name: 'Java Application Project Development',
    tagline: 'Practical Java Application Development',
    icon: FaJava,
    color: 'from-red-500 to-orange-600',
    bgColor: 'from-red-50 to-orange-50',
    duration: '2 Months',
    durationWeeks: 8,
    fee: '₹3,999',
    premiumFee: '₹3,999',
    enrolled: '150+',
    overview: 'Build a practical Java-based application while learning important Core Java concepts, database connectivity, MySQL, JDBC, and basic backend development concepts. The training is focused on project development and practical implementation.',
    curriculum: [
      { week: 'Week 1-2', title: 'Core Java & OOP', topics: ['Java Fundamentals', 'OOP Concepts', 'Collections Framework', 'Exception Handling', 'Streams & Lambda', 'File I/O'] },
      { week: 'Week 3-4', title: 'Database Connectivity & JDBC', topics: ['MySQL', 'JDBC', 'CRUD Operations', 'Connection Pooling', 'SQL Queries', 'Database Design'] },
      { week: 'Week 5-6', title: 'Spring Boot & REST APIs', topics: ['Spring Boot Basics', 'REST Controllers', 'REST API Basics', 'JPA & Hibernate', 'Spring Security', 'API Testing'] },
      { week: 'Week 7-8', title: 'Final Project & Deployment', topics: ['Git and GitHub', 'Project Architecture', 'Code Review', 'Documentation', 'Project Deployment', 'Presentation'] },
    ],
    projects: [
      { name: 'Banking Application', desc: 'Secure banking system with transactions, accounts, and admin dashboard' },
      { name: 'College Management System', desc: 'Complete college administration with student portal and analytics' },
      { name: 'Inventory Management', desc: 'Real-time inventory tracking with reporting system' },
    ],
    skills: ['Core Java', 'OOP', 'Java Collections', 'Exception Handling', 'JDBC', 'MySQL', 'Spring Boot Basics', 'REST API Basics', 'Git and GitHub', 'Project Development'],
    prerequisites: 'Basic understanding of Java and object-oriented programming',
    includes: 'Live Sessions, Code Reviews, Project Support, Certificate, Placement Prep',
  },
  {
    id: 'python',
    name: 'Python Application Project Development',
    tagline: 'Practical Python Application Development',
    icon: FaPython,
    color: 'from-blue-500 to-indigo-600',
    bgColor: 'from-blue-50 to-indigo-50',
    duration: '2 Months',
    durationWeeks: 8,
    fee: '₹3,999',
    premiumFee: '₹3,999',
    enrolled: '180+',
    overview: 'Learn Python programming through practical project development. Students will work with Python, databases, backend framework basics, APIs, and GitHub while developing a real-world application.',
    curriculum: [
      { week: 'Week 1-2', title: 'Python Programming & OOP', topics: ['Python Basics', 'OOP in Python', 'Exception Handling', 'Functions & Modules', 'File Handling', 'Data Structures'] },
      { week: 'Week 3-4', title: 'Database & Django/Flask Basics', topics: ['MySQL with Python', 'Django or Flask Setup', 'Models & ORM', 'Views & Templates', 'Forms & Validation', 'URL Routing'] },
      { week: 'Week 5-6', title: 'APIs & Integration', topics: ['REST API Basics', 'API Development', 'JSON Handling', 'Third-party APIs', 'Authentication', 'API Testing'] },
      { week: 'Week 7-8', title: 'Project & Deployment', topics: ['Git and GitHub', 'Project Architecture', 'Code Review', 'Deployment Basics', 'Documentation', 'Presentation'] },
    ],
    projects: [
      { name: 'AI Chatbot', desc: 'Intelligent chatbot using NLP for customer support' },
      { name: 'E-Learning Platform', desc: 'Online learning platform with quizzes and progress tracking' },
      { name: 'Expense Tracker', desc: 'Personal finance app with data visualization' },
    ],
    skills: ['Python', 'Python OOP', 'Exception Handling', 'MySQL', 'Flask or Django Basics', 'REST API Basics', 'Git and GitHub', 'Project Development'],
    prerequisites: 'Basic knowledge of Python and web concepts',
    includes: 'Live Sessions, Code Reviews, Project Support, Certificate, GitHub Portfolio',
  },
  {
    id: 'react-native',
    name: 'React Native Mobile App Project Development',
    tagline: 'Practical Mobile App Development',
    icon: FaReact,
    color: 'from-cyan-500 to-blue-600',
    bgColor: 'from-cyan-50 to-blue-50',
    duration: '2 Months',
    durationWeeks: 8,
    fee: '₹3,999',
    premiumFee: '₹3,999',
    enrolled: '120+',
    overview: 'Learn mobile application development using React Native and build a practical Android application. The training focuses on UI development, navigation, API integration, backend connectivity, and completing a working mobile application.',
    curriculum: [
      { week: 'Week 1-2', title: 'JavaScript & React Native Fundamentals', topics: ['JavaScript Basics', 'JSX & Components', 'State & Props', 'Navigation', 'Styling', 'Expo Setup'] },
      { week: 'Week 3-4', title: 'UI & Navigation & Forms', topics: ['React Navigation', 'Tab/Bottom Nav', 'Drawer Navigation', 'Forms & Validation', 'AsyncStorage', 'UI Components'] },
      { week: 'Week 5-6', title: 'API Integration & Backend', topics: ['API Integration', 'Firebase or MongoDB', 'Authentication', 'Data Management', 'Error Handling', 'State Management'] },
      { week: 'Week 7-8', title: 'Android App & Deployment', topics: ['Android Build', 'APK Generation', 'App Testing', 'Git and GitHub', 'Documentation', 'Presentation'] },
    ],
    projects: [
      { name: 'Food Delivery App', desc: 'Full-featured food delivery app with real-time tracking' },
      { name: 'Fitness Tracker', desc: 'Health and fitness app with workout tracking and goals' },
      { name: 'Social Media App', desc: 'Social networking app with posts, chat, and notifications' },
    ],
    skills: ['JavaScript', 'React Native', 'Expo', 'React Native Components', 'Navigation', 'Forms and Validation', 'API Integration', 'Firebase or MongoDB', 'Android Development', 'Project Development'],
    prerequisites: 'Basic knowledge of React or JavaScript',
    includes: 'Live Sessions, Code Reviews, App Development Support, Certificate, App Portfolio',
  },
];

const Programs = () => {
  const { tech } = useParams();
  const [activeProgram, setActiveProgram] = useState(tech || 'mern');

  return (
    <div className="pt-20">
      {/* Hero */}
      <section className="relative py-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary-900 via-dark-900 to-dark-800" />
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-20 right-20 w-96 h-96 bg-primary-400 rounded-full blur-3xl" />
        </div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-display font-bold text-white mb-4" data-aos="fade-up">
            Our Training Programs
          </h1>
          <p className="text-xl text-blue-200/80 max-w-2xl mx-auto" data-aos="fade-up" data-aos-delay="100">
            Choose your technology stack and start building real-world projects with expert guidance
          </p>
        </div>
      </section>

      {/* Program Tabs */}
      <section className="py-12 bg-gray-50 border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap justify-center gap-3">
            {programsData.map((program) => (
              <button
                key={program.id}
                onClick={() => setActiveProgram(program.id)}
                className={`flex items-center space-x-2 px-5 py-3 rounded-xl font-medium text-sm transition-all duration-300 ${
                  activeProgram === program.id
                    ? `bg-gradient-to-r ${program.color} text-white shadow-lg`
                    : 'bg-white text-dark-600 hover:text-dark-900 hover:shadow border border-gray-200'
                }`}
              >
                <program.icon className="w-5 h-5" />
                <span>{program.name}</span>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Program Detail */}
      <AnimatePresence mode="wait">
        {programsData.filter(p => p.id === activeProgram).map((program) => (
          <ProgramDetail key={program.id} program={program} />
        ))}
      </AnimatePresence>
    </div>
  );
};

const ProgramDetail = ({ program }) => {
  const [showFullCurriculum, setShowFullCurriculum] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.3 }}
    >
      {/* Overview */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div data-aos="fade-right">
              <div className={`inline-flex items-center px-4 py-2 rounded-full bg-gradient-to-r ${program.bgColor} text-sm font-medium text-dark-700 mb-4`}>
                <program.icon className="w-4 h-4 mr-2" />
                {program.name}
              </div>
              <h2 className="text-3xl md:text-4xl font-display font-bold text-dark-900 mb-4">{program.tagline}</h2>
              <p className="text-dark-500 leading-relaxed mb-6">{program.overview}</p>
            
              <div className="grid grid-cols-2 gap-4 mb-6">
                <div className="card p-4 text-center">
                  <FiClock className="w-5 h-5 text-primary-500 mx-auto mb-2" />
                  <p className="text-lg font-display font-bold text-dark-900">{program.duration}</p>
                  <p className="text-xs text-dark-400">Duration</p>
                </div>
                <div className="card p-4 text-center">
                  <FiUsers className="w-5 h-5 text-primary-500 mx-auto mb-2" />
                  <p className="text-lg font-display font-bold text-dark-900">{program.enrolled}</p>
                  <p className="text-xs text-dark-400">Students Enrolled</p>
                </div>
              </div>

              <Link to="/enrollment" className="btn-primary inline-flex items-center">
                Enroll Now <FiArrowRight className="ml-2 w-4 h-4" />
              </Link>
            </div>
            <div className="grid grid-cols-2 gap-3" data-aos="fade-left">
              {program.skills.map((skill, index) => (
                <motion.div
                  key={skill}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.03 }}
                  className="bg-gray-50 rounded-xl p-3 text-center hover:bg-primary-50 transition-colors"
                >
                  <span className="text-sm font-medium text-dark-700">{skill}</span>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Curriculum */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12" data-aos="fade-up">
            <h2 className="section-title">Curriculum</h2>
            <p className="section-subtitle mx-auto">Structured learning path designed by industry experts</p>
          </div>
          <div className="max-w-4xl mx-auto">
            {(showFullCurriculum ? program.curriculum : program.curriculum.slice(0, 4)).map((week, index) => (
              <motion.div
                key={week.week}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.05 }}
                className="flex mb-4"
              >
                <div className="flex-shrink-0 w-28 text-right pr-4 pt-2">
                  <span className={`text-sm font-bold bg-gradient-to-r ${program.color} bg-clip-text text-transparent`}>
                    {week.week}
                  </span>
                </div>
                <div className="flex-shrink-0 w-4 relative flex flex-col items-center">
                  <div className={`w-4 h-4 rounded-full bg-gradient-to-r ${program.color} z-10`} />
                  <div className="w-0.5 flex-1 bg-gray-300 mt-1" />
                </div>
                <div className="ml-4 pb-8 flex-1">
                  <div className="bg-white rounded-xl p-5 shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
                    <h3 className="font-display font-semibold text-dark-900 mb-2">{week.title}</h3>
                    <div className="flex flex-wrap gap-2">
                      {week.topics.map(topic => (
                        <span key={topic} className="inline-flex items-center px-2.5 py-1 bg-gray-50 text-dark-600 text-xs rounded-lg">
                          {topic}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
            {program.curriculum.length > 4 && (
              <div className="text-center mt-4">
                <button
                  onClick={() => setShowFullCurriculum(!showFullCurriculum)}
                  className="text-primary-600 font-medium hover:text-primary-700 text-sm"
                >
                  {showFullCurriculum ? 'Show Less' : `Show All ${program.curriculum.length} Weeks`}
                </button>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Projects */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12" data-aos="fade-up">
            <h2 className="section-title">Projects You Will Build</h2>
            <p className="section-subtitle mx-auto">Real-world projects that make your portfolio stand out</p>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {program.projects.map((project, index) => (
              <motion.div
                key={project.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="card group"
              >
                <div className={`w-14 h-14 rounded-2xl bg-gradient-to-r ${program.color} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                  <FiMonitor className="w-7 h-7 text-white" />
                </div>
                <h3 className="text-lg font-display font-semibold text-dark-900 mb-2">{project.name}</h3>
                <p className="text-dark-500 text-sm">{project.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Tools & Includes */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="card p-8"
            >
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary-500 to-primary-700 flex items-center justify-center mb-4">
                <FiTool className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-xl font-display font-semibold text-dark-900 mb-4">Tools & Technologies</h3>
              <div className="flex flex-wrap gap-2">
                {program.skills.map(skill => (
                  <span key={skill} className={`inline-flex items-center px-3 py-1.5 rounded-lg bg-gradient-to-r ${program.bgColor} text-dark-700 text-sm font-medium`}>
                    {skill}
                  </span>
                ))}
              </div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="card p-8"
            >
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-accent-500 to-accent-700 flex items-center justify-center mb-4">
                <FiAward className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-xl font-display font-semibold text-dark-900 mb-4">What's Included</h3>
              <ul className="space-y-2">
                {program.includes.split(', ').map(item => (
                  <li key={item} className="flex items-center text-dark-600 text-sm">
                    <FiCheck className="w-4 h-4 text-green-500 mr-2 flex-shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Prerequisites */}
      <section className="py-12 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-gradient-to-r from-primary-50 to-accent-50 rounded-2xl p-8 text-center" data-aos="fade-up">
            <FiBook className="w-8 h-8 text-primary-600 mx-auto mb-3" />
            <h3 className="text-xl font-display font-semibold text-dark-900 mb-2">Prerequisites</h3>
            <p className="text-dark-500">{program.prerequisites}</p>
            <p className="text-dark-400 text-sm mt-2">Don't worry if you don't meet all requirements - we start from fundamentals!</p>
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12" data-aos="fade-up">
            <h2 className="section-title">Choose Your Plan</h2>
            <p className="section-subtitle mx-auto">Select the package that best fits your needs</p>
          </div>
          <div className="grid md:grid-cols-2 gap-8 max-w-3xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="card p-8 text-center border-2 border-gray-100"
            >
              <h3 className="text-xl font-display font-bold text-dark-900 mb-2">Standard</h3>
              <div className="text-4xl font-display font-bold text-primary-600 mb-4">{program.fee}</div>
              <p className="text-dark-500 text-sm mb-6">Perfect for students who want core training</p>
              <ul className="space-y-3 mb-8 text-left">
                {['Live Online Sessions', 'Project Development', 'Code Reviews', 'Course Materials', 'GitHub Portfolio', 'Certificate'].map(item => (
                  <li key={item} className="flex items-center text-dark-600 text-sm">
                    <FiCheck className="w-4 h-4 text-green-500 mr-2 flex-shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
              <Link to="/enrollment" className="btn-primary block text-center">Enroll Now</Link>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="card p-8 text-center border-2 border-primary-200 relative overflow-hidden"
            >
              <div className="absolute top-0 right-0 bg-gradient-to-r from-primary-500 to-primary-700 text-white text-xs font-bold px-4 py-1 rounded-bl-xl">
                POPULAR
              </div>
              <h3 className="text-xl font-display font-bold text-dark-900 mb-2">Premium</h3>
              <div className="text-4xl font-display font-bold text-primary-600 mb-4">{program.premiumFee}</div>
              <p className="text-dark-500 text-sm mb-6">Everything in Standard plus extra benefits</p>
              <ul className="space-y-3 mb-8 text-left">
                {['1-on-1 Mentor Sessions', 'Priority Code Reviews', 'Mock Interview Prep', 'Resume & LinkedIn Review', 'Deployment Support', 'Placement Assistance'].map(item => (
                  <li key={item} className="flex items-center text-dark-600 text-sm">
                    <FiStar className="w-4 h-4 text-yellow-500 mr-2 flex-shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
              <Link to="/enrollment" className="btn-accent block text-center">Enroll Now</Link>
            </motion.div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 relative overflow-hidden">
        <div className={`absolute inset-0 bg-gradient-to-r ${program.color}`} />
        <div className="relative max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl font-display font-bold text-white mb-4">
              Ready to Start Your {program.name.split(' ')[0]} Journey?
            </h2>
            <p className="text-lg text-white/80 mb-8">
              Join the next batch and build your dream project with expert guidance
            </p>
            <Link to="/enrollment" className="inline-flex items-center px-8 py-4 bg-white text-dark-900 font-bold text-lg rounded-2xl hover:shadow-2xl hover:-translate-y-1 transition-all duration-300">
              Enroll Now - {program.fee} <FiArrowRight className="ml-2 w-5 h-5" />
            </Link>
          </motion.div>
        </div>
      </section>
    </motion.div>
  );
};

export default Programs;
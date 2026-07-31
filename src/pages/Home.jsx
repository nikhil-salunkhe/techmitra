import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import { FiArrowRight, FiCheck, FiStar, FiPlay, FiCode, FiServer, FiSmartphone, FiCloud, FiBook, FiUsers, FiAward, FiTrendingUp, FiClock, FiCpu } from 'react-icons/fi';
import { FaReact, FaJava, FaPython, FaNodeJs, FaGithub, FaRobot } from 'react-icons/fa';
import { whyTechMitra, techPrograms, projectLifecycle, studentJourney, featuredProjects, faqData } from '../data/navigation';

// Section Wrapper
const Section = ({ children, className = '', id = '' }) => (
  <section id={id} className={`section-padding ${className}`}>
    {children}
  </section>
);

// Section Header
const SectionHeader = ({ title, subtitle, light = false }) => (
  <div className="text-center mb-10 sm:mb-16 px-4" data-aos="fade-up">
    <h2 className={`section-title ${light ? 'text-white' : ''}`}>{title}</h2>
    <p className={`section-subtitle mx-auto ${light ? 'text-dark-300' : ''}`}>{subtitle}</p>
  </div>
);

// ==================== HOME PAGE ====================
const Home = () => {
  return (
    <>
      {/* 1. Hero Section */}
      <HeroSection />

      {/* 2. Why TechMitra */}
      <Section className="bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader
            title="Why TechMitra?"
            subtitle="We don't just teach coding. We teach you how to build real-world projects like industry professionals."
          />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            {whyTechMitra.map((item, index) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.05, duration: 0.5 }}
                className="card group cursor-default"
              >
                <div className={`w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-gradient-to-br ${item.color} flex items-center justify-center mb-3 sm:mb-4 group-hover:scale-110 transition-transform duration-300`}>
                  <FiCode className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
                </div>
                <h3 className="text-base sm:text-lg font-display font-semibold text-dark-900 mb-1 sm:mb-2">{item.title}</h3>
                <p className="text-dark-500 text-xs sm:text-sm leading-relaxed">{item.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </Section>

      {/* 3. Project Development Lifecycle */}
      <Section className="bg-gradient-to-b from-dark-900 to-dark-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader
            title="Project Development Lifecycle"
            subtitle="Learn how professional software projects are built from idea to deployment"
            light
          />
          <div className="relative">
            {/* Timeline Line */}
            <div className="absolute left-4 sm:left-8 md:left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-primary-500 via-accent-500 to-primary-500 transform md:-translate-x-1/2" />
            
            <div className="space-y-6 sm:space-y-8">
              {projectLifecycle.map((step, index) => (
                <motion.div
                  key={step.step}
                  initial={{ opacity: 0, x: index % 2 === 0 ? -30 : 30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1, duration: 0.5 }}
                  className={`relative flex items-center ${index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'} flex-row`}
                >
                  {/* Content */}
                  <div className={`ml-12 sm:ml-16 md:ml-0 md:w-[calc(50%-40px)] ${index % 2 === 0 ? 'md:pr-12 md:text-right' : 'md:pl-12'}`}>
                    <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl sm:rounded-2xl p-4 sm:p-5 hover:bg-white/10 transition-all duration-300">
                      <span className="text-[10px] sm:text-xs font-semibold text-primary-400 uppercase tracking-wider">Step {step.step}</span>
                      <h3 className="text-base sm:text-lg font-display font-semibold text-white mt-1">{step.title}</h3>
                      <p className="text-dark-300 text-xs sm:text-sm mt-1">{step.description}</p>
                    </div>
                  </div>

                  {/* Circle */}
                  <div className="absolute left-4 sm:left-8 md:left-1/2 w-4 h-4 sm:w-6 sm:h-6 bg-gradient-to-br from-primary-500 to-accent-500 rounded-full border-2 sm:border-4 border-dark-900 transform -translate-x-1/2 z-10 flex items-center justify-center">
                    <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-white rounded-full" />
                  </div>

                  {/* Empty space for alignment */}
                  <div className="hidden md:block md:w-[calc(50%-40px)]" />
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </Section>

      {/* 4. Technology Programs */}
      <Section className="bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader
            title="Our Technology Programs"
            subtitle="Choose your path and build real-world projects with expert guidance"
          />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4 sm:gap-6">
            {techPrograms.map((program, index) => (
              <motion.div
                key={program.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
                className="card group"
              >
                <div className={`w-12 h-12 sm:w-14 sm:h-14 rounded-xl sm:rounded-2xl bg-gradient-to-br ${program.color} flex items-center justify-center mb-3 sm:mb-4 group-hover:scale-110 transition-transform duration-300`}>
                  {program.id === 'ai' && <FaRobot className="w-6 h-6 sm:w-7 sm:h-7 text-white" />}
                  {program.id === 'mern' && <FaNodeJs className="w-6 h-6 sm:w-7 sm:h-7 text-white" />}
                  {program.id === 'java' && <FaJava className="w-6 h-6 sm:w-7 sm:h-7 text-white" />}
                  {program.id === 'python' && <FaPython className="w-6 h-6 sm:w-7 sm:h-7 text-white" />}
                  {program.id === 'react-native' && <FaReact className="w-6 h-6 sm:w-7 sm:h-7 text-white" />}
                </div>
                <h3 className="text-lg sm:text-xl font-display font-bold text-dark-900 mb-1">{program.name}</h3>
                <p className="text-dark-400 text-xs sm:text-sm mb-3 sm:mb-4">{program.tagline}</p>
                
                <div className="flex items-center space-x-3 sm:space-x-4 mb-3 sm:mb-4 text-xs sm:text-sm text-dark-500">
                  <span className="flex items-center">
                    <FiClock className="w-3.5 h-3.5 sm:w-4 sm:h-4 mr-1 text-primary-500" />
                    {program.duration}
                  </span>
                  <span className="flex items-center">
                    <FiUsers className="w-3.5 h-3.5 sm:w-4 sm:h-4 mr-1 text-primary-500" />
                    {program.enrolled}
                  </span>
                </div>

                <div className="mb-3 sm:mb-4">
                  <p className="text-[10px] sm:text-xs font-semibold text-dark-400 uppercase tracking-wider mb-1 sm:mb-2">Sample Projects</p>
                  <div className="space-y-1">
                    {program.projects.slice(0, 2).map((proj) => (
                      <div key={proj} className="flex items-center text-xs sm:text-sm text-dark-600">
                        <FiCheck className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-green-500 mr-1.5 sm:mr-2 flex-shrink-0" />
                        <span className="truncate">{proj}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="flex items-center justify-between pt-3 sm:pt-4 border-t border-gray-100">
                  <span className="text-xl sm:text-2xl font-display font-bold text-primary-600">{program.fee}</span>
                  <Link to={`/programs/${program.id}`} className="btn-primary text-xs sm:text-sm px-3 sm:px-4 py-1.5 sm:py-2">
                    View Details
                  </Link>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </Section>

      {/* 5. Training Features */}
      <Section className="bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader
            title="Everything You Get"
            subtitle="Complete training package designed to make you industry-ready"
          />
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4">
            {[
              { icon: FiPlay, title: 'Interactive Live Classes', desc: 'Real-time learning with expert instructors' },
              { icon: FiBook, title: 'Weekly Tasks', desc: 'Practice with real-world assignments' },
              { icon: FiCode, title: 'Assignments', desc: 'Hands-on coding exercises' },
              { icon: FiCheck, title: 'Code Reviews', desc: 'Get feedback from industry experts' },
              { icon: FiServer, title: 'Project Reviews', desc: 'Detailed project code review' },
              { icon: FaGithub, title: 'GitHub', desc: 'Build your developer portfolio' },
              { icon: FiCloud, title: 'Deployment', desc: 'Deploy projects to cloud' },
              { icon: FiUsers, title: 'Resume Guidance', desc: 'Professional resume building' },
              { icon: FiTrendingUp, title: 'LinkedIn', desc: 'Optimize your LinkedIn profile' },
              { icon: FiAward, title: 'Mock Viva', desc: 'Prepare for college viva' },
              { icon: FiStar, title: 'Digital Certificate', desc: 'Verified completion certificate' },
              { icon: FiSmartphone, title: 'Mentor Support', desc: '24/7 doubt clearing support' },
            ].map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.03, duration: 0.3 }}
                className="card text-center p-3 sm:p-5"
              >
                <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-lg sm:rounded-xl bg-gradient-to-br from-primary-500 to-primary-700 flex items-center justify-center mx-auto mb-2 sm:mb-3">
                  <feature.icon className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
                </div>
                <h3 className="text-xs sm:text-sm font-display font-semibold text-dark-900 mb-0.5 sm:mb-1">{feature.title}</h3>
                <p className="text-[10px] sm:text-xs text-dark-400">{feature.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </Section>

      {/* 6. Student Journey */}
      <Section className="bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader
            title="Your Journey with TechMitra"
            subtitle="From registration to certification - we guide you every step of the way"
          />
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 sm:gap-4">
            {studentJourney.map((step, index) => (
              <motion.div
                key={step.step}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.05, duration: 0.4 }}
                className="relative text-center group"
              >
                <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-xl sm:rounded-2xl bg-gradient-to-br from-primary-500 to-accent-500 flex items-center justify-center mx-auto mb-2 sm:mb-3 group-hover:scale-110 transition-transform duration-300 shadow-lg shadow-primary-500/20">
                  <span className="text-xl sm:text-2xl font-display font-bold text-white">{step.step}</span>
                </div>
                <h3 className="text-xs sm:text-sm font-display font-semibold text-dark-900 mb-0.5 sm:mb-1">{step.title}</h3>
                <p className="text-[10px] sm:text-xs text-dark-400">{step.description}</p>
                {index < studentJourney.length - 1 && (
                  <div className="hidden lg:block absolute top-7 sm:top-8 left-[60%] w-[80%] h-0.5 bg-gradient-to-r from-primary-300 to-accent-300" />
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </Section>

      {/* 7. Featured Projects */}
      <Section className="bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader
            title="Featured Projects"
            subtitle="Explore the types of projects our students build"
          />
          <Swiper
            modules={[Autoplay, Pagination]}
            spaceBetween={16}
            slidesPerView={1.2}
            breakpoints={{
              480: { slidesPerView: 1.5, spaceBetween: 16 },
              640: { slidesPerView: 2, spaceBetween: 20 },
              768: { slidesPerView: 3, spaceBetween: 20 },
              1024: { slidesPerView: 4, spaceBetween: 20 },
            }}
            autoplay={{ delay: 3000, disableOnInteraction: false }}
            pagination={{ clickable: true }}
            className="pb-10 sm:pb-12"
          >
            {featuredProjects.map((project, index) => (
              <SwiperSlide key={project.title}>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  className="card group cursor-pointer h-full"
                >
                  <div className="w-full h-32 sm:h-40 rounded-lg sm:rounded-xl bg-gradient-to-br from-primary-100 to-accent-100 flex items-center justify-center mb-3 sm:mb-4 overflow-hidden">
                    <span className="text-3xl sm:text-4xl font-display font-bold text-primary-600/30 group-hover:scale-150 transition-transform duration-500">
                      {project.image}
                    </span>
                  </div>
                  <h3 className="text-base sm:text-lg font-display font-semibold text-dark-900 mb-1">{project.title}</h3>
                  <p className="text-dark-400 text-xs sm:text-sm mb-2 sm:mb-3">{project.description}</p>
                  <span className="inline-block px-2 sm:px-3 py-0.5 sm:py-1 bg-primary-50 text-primary-600 text-[10px] sm:text-xs font-semibold rounded-full">
                    {project.tech}
                  </span>
                </motion.div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </Section>

      {/* 9. FAQ */}
      <Section className="bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader
            title="Frequently Asked Questions"
            subtitle="Everything you need to know about TechMitra"
          />
          <div className="space-y-3">
            {faqData.map((faq, index) => (
              <FaqItem key={index} question={faq.q} answer={faq.a} index={index} />
            ))}
          </div>
        </div>
      </Section>

      {/* 10. Final CTA */}
      <Section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary-600 via-primary-700 to-accent-600" />
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-10 left-10 w-72 h-72 bg-white rounded-full blur-3xl" />
          <div className="absolute bottom-10 right-10 w-96 h-96 bg-white rounded-full blur-3xl" />
        </div>
        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-display font-bold text-white mb-4">
              Ready to Build Your Final Year Project?
            </h2>
            <p className="text-lg sm:text-xl text-blue-100 mb-6 sm:mb-8 max-w-2xl mx-auto">
              Join TechMitra today and build your project from idea to deployment with expert mentors.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center space-y-3 sm:space-y-0 sm:space-x-4">
              <Link
                to="/enrollment"
                className="w-full sm:w-auto px-6 sm:px-8 py-3 sm:py-4 bg-white text-primary-700 font-display font-bold text-base sm:text-lg rounded-2xl hover:shadow-2xl hover:shadow-black/20 hover:-translate-y-1 transition-all duration-300 text-center"
              >
                Enroll Now - from ₹1,499
               </Link>
              <Link
                to="/contact"
                className="w-full sm:w-auto px-6 sm:px-8 py-3 sm:py-4 border-2 border-white/30 text-white font-display font-semibold text-base sm:text-lg rounded-2xl hover:bg-white/10 hover:border-white/50 transition-all duration-300 text-center"
              >
                Talk to Advisor
              </Link>
            </div>
            <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3 mt-4 sm:mt-6 text-xs sm:text-sm">
              <span className="px-3 py-1.5 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full text-blue-100">
                🚀 AI Through Development - ₹1,499 / 1 Month
              </span>
              <span className="px-3 py-1.5 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full text-blue-100">
                💻 Project Development - ₹3,999 / 2 Months
              </span>
            </div>
            <p className="text-blue-200 text-xs sm:text-sm mt-4 sm:mt-6">
              Limited seats available for the next batch. Enroll now!
            </p>
          </motion.div>
        </div>
      </Section>
    </>
  );
};

// ==================== HERO SECTION ====================
const HeroSection = () => {
  return (
    <section className="relative min-h-[90vh] sm:min-h-screen flex items-center overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary-900 via-primary-800 to-dark-900" />
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-20 left-20 w-48 h-48 sm:w-96 sm:h-96 bg-primary-400 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-20 right-20 w-48 h-48 sm:w-80 sm:h-80 bg-accent-500 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
      </div>
      
      {/* Grid Pattern */}
      <div className="absolute inset-0 opacity-5" style={{
        backgroundImage: 'linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)',
        backgroundSize: '40px 40px',
      }} />

      <div className="relative w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 sm:pt-32 pb-16 sm:pb-20">
        <div className="grid lg:grid-cols-2 gap-8 sm:gap-12 items-center">
          {/* Left Content */}
          <div data-aos="fade-right" className="text-center sm:text-left">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <div className="inline-flex items-center px-3 sm:px-4 py-1.5 sm:py-2 bg-white/10 backdrop-blur-sm rounded-full border border-white/10 mb-4 sm:mb-6">
                <span className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-green-400 rounded-full animate-pulse mr-1.5 sm:mr-2" />
                <span className="text-blue-200 text-xs sm:text-sm font-medium">🔥 Limited Admissions Open - Enroll Now</span>
              </div>
              
              {/* Plan Banners - Show Both New & Old Plans */}
              <div className="space-y-2 sm:space-y-4 mb-4 sm:mb-6">
                {/* New AI Plan Banner */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                  className="bg-gradient-to-r from-purple-500/20 via-pink-500/20 to-purple-500/20 backdrop-blur-sm border border-purple-400/30 rounded-lg sm:rounded-2xl p-2.5 sm:p-4"
                >
                  <div className="flex flex-col gap-2">
                    <div className="flex items-start sm:items-center">
                      <FaRobot className="w-4 h-4 sm:w-6 sm:h-6 text-purple-300 mr-2 sm:mr-3 flex-shrink-0 mt-0.5 sm:mt-0" />
                      <div className="text-left">
                        <p className="text-white font-display font-bold text-xs sm:text-base leading-tight sm:leading-normal">🚀 AI THROUGH DEVELOPMENT – 1 MONTH LIVE PROJECT TRAINING!</p>
                        <p className="text-purple-200 text-[10px] sm:text-sm mt-0.5 sm:mt-1">Learn AI-Powered Development with GitHub Copilot & Cline AI | Build, Test & Deploy Live Projects</p>
                      </div>
                    </div>
                    <div className="flex items-center justify-between pl-6 sm:pl-9">
                      <span className="text-white font-display font-bold text-base sm:text-xl">₹1,499</span>
                      <Link to="/programs/ai" className="px-3 sm:px-4 py-1.5 sm:py-2 bg-white text-purple-700 font-semibold text-xs sm:text-sm rounded-lg hover:shadow-lg hover:bg-purple-50 transition-all whitespace-nowrap">
                        LEARN MORE
                      </Link>
                    </div>
                  </div>
                </motion.div>

                {/* Existing Project Plan Banner */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.35 }}
                  className="bg-gradient-to-r from-blue-500/20 via-cyan-500/20 to-blue-500/20 backdrop-blur-sm border border-blue-400/30 rounded-lg sm:rounded-2xl p-2.5 sm:p-4"
                >
                  <div className="flex flex-col gap-2">
                    <div className="flex items-start sm:items-center">
                      <FiCode className="w-4 h-4 sm:w-6 sm:h-6 text-blue-300 mr-2 sm:mr-3 flex-shrink-0 mt-0.5 sm:mt-0" />
                      <div className="text-left">
                        <p className="text-white font-display font-bold text-xs sm:text-base leading-tight sm:leading-normal">💻 PROJECT DEVELOPMENT – 2 MONTHS LIVE TRAINING</p>
                        <p className="text-blue-200 text-[10px] sm:text-sm mt-0.5 sm:mt-1">Build Real-World Projects with MERN, Java, Python, React Native | Final Year Project Assistance</p>
                      </div>
                    </div>
                    <div className="flex items-center justify-between pl-6 sm:pl-9">
                      <span className="text-white font-display font-bold text-base sm:text-xl">₹3,999</span>
                      <Link to="/programs" className="px-3 sm:px-4 py-1.5 sm:py-2 bg-white text-blue-700 font-semibold text-xs sm:text-sm rounded-lg hover:shadow-lg hover:bg-blue-50 transition-all whitespace-nowrap">
                        LEARN MORE
                      </Link>
                    </div>
                  </div>
                </motion.div>
              </div>
              
              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-display font-bold text-white leading-tight mb-4 sm:mb-6">
                Become Industry Ready with{' '}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-300 to-accent-300">
                  Real Project Development
                </span>
              </h1>
              
              <p className="text-base sm:text-lg md:text-xl text-blue-200/80 mb-6 sm:mb-8 max-w-xl mx-auto sm:mx-0">
                Build your Final Year Project from Idea to Deployment with Expert Mentors. 
                Learn the complete software development lifecycle.
              </p>

              <div className="flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-4 mb-8 sm:mb-12 max-w-md sm:max-w-none mx-auto sm:mx-0">
                <Link to="/enrollment" className="btn-accent text-base sm:text-lg px-6 sm:px-8 py-3 sm:py-4 text-center">
                  Enroll Now - from ₹1,499
                  <FiArrowRight className="inline ml-2 w-4 h-4 sm:w-5 sm:h-5" />
                </Link>
                <Link to="/programs" className="px-6 sm:px-8 py-3 sm:py-4 border-2 border-white/30 text-white font-semibold rounded-xl hover:bg-white/10 hover:border-white/50 transition-all duration-300 text-center text-base sm:text-lg">
                  Explore Programs
                </Link>
              </div>
            </motion.div>
          </div>

          {/* Right Illustration */}
          <div className="hidden lg:block" data-aos="fade-left">
            <div className="relative">
              {/* Main Code Window */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.3 }}
                className="bg-dark-800/80 backdrop-blur-sm border border-white/10 rounded-2xl p-4 sm:p-6 shadow-2xl"
              >
                <div className="flex items-center space-x-2 mb-3 sm:mb-4">
                  <div className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-red-500" />
                  <div className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-yellow-500" />
                  <div className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-green-500" />
                  <span className="ml-2 sm:ml-3 text-dark-400 text-xs sm:text-sm">project-dashboard</span>
                </div>
                <div className="space-y-1.5 sm:space-y-2 font-mono text-xs sm:text-sm">
                  <div className="flex">
                    <span className="text-dark-500 w-4 sm:w-6">1</span>
                    <span className="text-blue-400">import</span>
                    <span className="text-white ml-1 sm:ml-2">{'{ App }'}</span>
                    <span className="text-purple-400 ml-1 sm:ml-2">from</span>
                    <span className="text-green-400 ml-1 sm:ml-2">'./App'</span>
                  </div>
                  <div className="flex">
                    <span className="text-dark-500 w-4 sm:w-6">2</span>
                    <span className="text-blue-400">const</span>
                    <span className="text-yellow-400 ml-1 sm:ml-2">project</span>
                    <span className="text-white ml-1 sm:ml-2">=</span>
                    <span className="text-purple-400 ml-1 sm:ml-2">new</span>
                    <span className="text-blue-400 ml-1 sm:ml-2">Project</span>
                    <span className="text-white">()</span>
                  </div>
                  <div className="flex">
                    <span className="text-dark-500 w-4 sm:w-6">3</span>
                    <span className="text-yellow-400">project.</span>
                    <span className="text-blue-400">build</span>
                    <span className="text-white">()</span>
                  </div>
                  <div className="flex">
                    <span className="text-dark-500 w-4 sm:w-6">4</span>
                    <span className="text-dark-400">// Deploying...</span>
                  </div>
                  <div className="flex">
                    <span className="text-dark-500 w-4 sm:w-6">5</span>
                    <span className="text-green-400">✓</span>
                    <span className="text-green-300 ml-1 sm:ml-2">Deployment successful!</span>
                  </div>
                </div>
              </motion.div>

              {/* Floating Cards */}
              <motion.div
                animate={{ y: [0, -15, 0] }}
                transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
                className="absolute -top-6 sm:-top-8 -right-6 sm:-right-8 w-14 h-14 sm:w-20 sm:h-20 bg-gradient-to-br from-primary-500 to-primary-700 rounded-xl sm:rounded-2xl flex items-center justify-center shadow-xl"
              >
                <FaReact className="w-7 h-7 sm:w-10 sm:h-10 text-white" />
              </motion.div>

              <motion.div
                animate={{ y: [0, -20, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut', delay: 0.5 }}
                className="absolute -bottom-3 sm:-bottom-4 -left-6 sm:-left-8 w-12 h-12 sm:w-16 sm:h-16 bg-gradient-to-br from-accent-500 to-accent-700 rounded-xl sm:rounded-2xl flex items-center justify-center shadow-xl"
              >
                <FaGithub className="w-6 h-6 sm:w-8 sm:h-8 text-white" />
              </motion.div>

              <motion.div
                animate={{ y: [0, -12, 0] }}
                transition={{ duration: 3.5, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
                className="absolute top-1/2 -right-8 sm:-right-12 w-10 h-10 sm:w-14 sm:h-14 bg-gradient-to-br from-green-500 to-emerald-600 rounded-xl sm:rounded-2xl flex items-center justify-center shadow-xl"
              >
                <FiCloud className="w-5 h-5 sm:w-7 sm:h-7 text-white" />
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

// ==================== FAQ ITEM ====================
const FaqItem = ({ question, answer, index }) => {
  const [isOpen, setIsOpen] = React.useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.02 }}
      className="bg-white rounded-xl sm:rounded-2xl border border-gray-100 overflow-hidden hover:shadow-md transition-shadow duration-300"
    >
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between p-4 sm:p-5 text-left"
      >
        <span className="text-dark-800 font-medium text-sm sm:text-base pr-3 sm:pr-4">{question}</span>
        <motion.svg
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.3 }}
          className="w-4 h-4 sm:w-5 sm:h-5 text-primary-500 flex-shrink-0"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </motion.svg>
      </button>
      <motion.div
        initial={false}
        animate={{ height: isOpen ? 'auto' : 0, opacity: isOpen ? 1 : 0 }}
        transition={{ duration: 0.3 }}
        className="overflow-hidden"
      >
        <p className="px-4 sm:px-5 pb-4 sm:pb-5 text-dark-500 text-xs sm:text-sm leading-relaxed">{answer}</p>
      </motion.div>
    </motion.div>
  );
};

export default Home;
import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FiCheck, FiAward, FiTarget, FiEye, FiHeart, FiCode, FiUsers, FiBook, FiStar, FiArrowRight } from 'react-icons/fi';
import { FaReact, FaJava, FaPython, FaNodeJs, FaGithub } from 'react-icons/fa';

const About = () => {
  const milestones = [
    { year: '2024', title: 'TechMitra Founded', description: 'Started with a vision to transform final year project development' },
    { year: '2024 Q1', title: 'First Batch Launched', description: 'Launched MERN Stack program with 50 students' },
    { year: '2024 Q2', title: 'Expanded Programs', description: 'Added Java and Python application development programs' },
    { year: '2024 Q3', title: '100+ Projects', description: 'Celebrated 100+ successfully completed student projects' },
    { year: '2024 Q4', title: 'React Native Added', description: 'Launched mobile app development program' },
    { year: '2025', title: '500+ Students', description: '500+ students trained across all programs' },
  ];

  const values = [
    { icon: FiStar, title: 'Excellence', description: 'We strive for the highest quality in everything we do' },
    { icon: FiUsers, title: 'Student First', description: 'Every decision we make prioritizes our students success' },
    { icon: FiCode, title: 'Industry Relevance', description: 'Our curriculum matches current industry standards' },
    { icon: FiHeart, title: 'Passion for Teaching', description: 'We love what we do and it shows in our teaching' },
    { icon: FiAward, title: 'Integrity', description: 'We believe in honest, transparent education' },
    { icon: FiTarget, title: 'Innovation', description: 'Constantly evolving to provide the best learning experience' },
  ];

  return (
    <div className="pt-20">
      {/* Hero Section */}
      <section className="relative py-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary-900 via-dark-900 to-primary-800" />
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-20 left-20 w-96 h-96 bg-primary-400 rounded-full blur-3xl" />
          <div className="absolute bottom-20 right-20 w-80 h-80 bg-accent-500 rounded-full blur-3xl" />
        </div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto" data-aos="fade-up">
            <h1 className="text-4xl md:text-6xl font-display font-bold text-white mb-6">
              About <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-300 to-accent-300">TechMitra</span>
            </h1>
            <p className="text-xl text-blue-200/80 leading-relaxed">
              We are on a mission to transform how college students approach final year projects. 
              We believe in teaching real skills, not just theory.
            </p>
          </div>
        </div>
      </section>

      {/* Story Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div data-aos="fade-right">
              <h2 className="text-3xl md:text-4xl font-display font-bold text-dark-900 mb-6">
                Our Story
              </h2>
              <div className="space-y-4 text-dark-500 leading-relaxed">
                <p>
                  TechMitra was born from a simple observation: college students struggle with final year projects 
                  not because they lack intelligence, but because they lack practical, industry-oriented training.
                </p>
                <p>
                  We saw that students were either given ready-made projects or left to figure things out on their own. 
                  Neither approach prepared them for real-world software development.
                </p>
                <p>
                  So we created TechMitra - a platform where students learn how software companies actually build projects. 
                  From requirement analysis to deployment, we teach the complete development lifecycle.
                </p>
                <p>
                  Today, we've helped 500+ students build production-ready projects and kickstart their careers in technology.
                </p>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4" data-aos="fade-left">
              {[
                { icon: FiAward, value: '500+', label: 'Students Trained' },
                { icon: FiCode, value: '100+', label: 'Projects Built' },
                { icon: FiUsers, value: '4', label: 'Tech Programs' },
                { icon: FiStar, value: '100%', label: 'Online' },
              ].map((item) => (
                <div key={item.label} className="card text-center p-6">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary-500 to-primary-700 flex items-center justify-center mx-auto mb-3">
                    <item.icon className="w-6 h-6 text-white" />
                  </div>
                  <div className="text-3xl font-display font-bold text-primary-600">{item.value}</div>
                  <p className="text-dark-500 text-sm">{item.label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Vision Mission */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="card p-8"
            >
              <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-primary-500 to-primary-700 flex items-center justify-center mb-4">
                <FiEye className="w-7 h-7 text-white" />
              </div>
              <h3 className="text-2xl font-display font-bold text-dark-900 mb-3">Our Vision</h3>
              <p className="text-dark-500 leading-relaxed">
                To become India's most trusted platform for final year project training, 
                bridging the gap between academic learning and industry requirements. We envision 
                a future where every college graduate is industry-ready from day one.
              </p>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="card p-8"
            >
              <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-accent-500 to-accent-700 flex items-center justify-center mb-4">
                <FiTarget className="w-7 h-7 text-white" />
              </div>
              <h3 className="text-2xl font-display font-bold text-dark-900 mb-3">Our Mission</h3>
              <p className="text-dark-500 leading-relaxed">
                To provide every college student with industry-oriented project training through 
                live mentorship, hands-on learning, and real-world project development. We are 
                committed to making project building a learning experience, not a burden.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16" data-aos="fade-up">
            <h2 className="section-title">Our Values</h2>
            <p className="section-subtitle mx-auto">The principles that guide everything we do</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {values.map((value, index) => (
              <motion.div
                key={value.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.05 }}
                className="card group"
              >
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary-500 to-primary-700 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                  <value.icon className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-lg font-display font-semibold text-dark-900 mb-2">{value.title}</h3>
                <p className="text-dark-500 text-sm">{value.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Teaching Methodology */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16" data-aos="fade-up">
            <h2 className="section-title">Our Teaching Methodology</h2>
            <p className="section-subtitle mx-auto">How we ensure every student succeeds</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { step: '01', title: 'Learn by Doing', description: 'No boring lectures. You learn by building real projects with hands-on guidance.' },
              { step: '02', title: 'Mentor-Led Training', description: 'Every student gets a dedicated mentor who guides them throughout the program.' },
              { step: '03', title: 'Industry Standards', description: 'We teach you how software companies actually build and deploy projects.' },
            ].map((item, index) => (
              <motion.div
                key={item.step}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="text-center"
              >
                <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-primary-500 to-accent-500 flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl font-display font-bold text-white">{item.step}</span>
                </div>
                <h3 className="text-xl font-display font-semibold text-dark-900 mb-2">{item.title}</h3>
                <p className="text-dark-500">{item.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16" data-aos="fade-up">
            <h2 className="section-title">Our Journey</h2>
            <p className="section-subtitle mx-auto">Key milestones in our growth</p>
          </div>
          <div className="space-y-6">
            {milestones.map((milestone, index) => (
              <motion.div
                key={milestone.year}
                initial={{ opacity: 0, x: index % 2 === 0 ? -20 : 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="flex items-start space-x-4"
              >
                <div className="flex-shrink-0 w-24 text-right">
                  <span className="text-sm font-bold text-primary-600">{milestone.year}</span>
                </div>
                <div className="flex-shrink-0 w-4 h-4 rounded-full bg-gradient-to-br from-primary-500 to-accent-500 mt-1" />
                <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100 flex-1">
                  <h3 className="font-display font-semibold text-dark-900">{milestone.title}</h3>
                  <p className="text-dark-500 text-sm">{milestone.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary-600 to-accent-600" />
        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl font-display font-bold text-white mb-4">
              Start Your Journey Today
            </h2>
            <p className="text-xl text-blue-100 mb-8">
              Join 500+ students who have transformed their careers with TechMitra
            </p>
            <Link to="/enrollment" className="inline-flex items-center px-8 py-4 bg-white text-primary-700 font-bold text-lg rounded-2xl hover:shadow-2xl hover:shadow-black/20 hover:-translate-y-1 transition-all duration-300">
              Enroll Now <FiArrowRight className="ml-2 w-5 h-5" />
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default About;

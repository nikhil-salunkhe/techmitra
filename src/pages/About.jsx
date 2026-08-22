import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FiCheck, FiAward, FiTarget, FiEye, FiHeart, FiCode, FiUsers, FiBook, FiStar, FiArrowRight, FiBriefcase, FiGlobe, FiPrinter, FiLayers } from 'react-icons/fi';
import { FaReact, FaJava, FaPython, FaNodeJs, FaGithub } from 'react-icons/fa';

const About = () => {
  const milestones = [
    { year: 'Jan 2026', title: 'TechMitra Founded', description: 'Launched as a fresh startup with a vision to transform final year project training in India' },
    { year: 'Jan 2026', title: 'Training Programs Live', description: 'AI Through Development, MERN, Java, Python and React Native live project training opened for admissions' },
    { year: 'Jan 2026', title: 'Business Services Launched', description: 'Started building websites, GST billing software & management systems for shops, schools, classes, hotels, banks and malls' },
    { year: 'Today', title: 'Admissions & Projects Open', description: 'First batches filling fast - limited seats for quality mentorship' },
    { year: 'Next', title: 'Your Success Story', description: 'Join us at the beginning and grow with us - early students get extra personal attention!' },
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
              And we don't just teach — we also build websites, apps &amp; billing software for local businesses.
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
                  So in January 2026, we launched TechMitra - a platform where students learn how software companies
                  actually build projects. From requirement analysis to deployment, we teach the complete development lifecycle.
                </p>
                <p>
                  And we didn't stop at teaching. From day one, we also build modern websites, GST billing software
                  and management systems for shops, schools, classes, hotels, banks and malls - bringing the same
                  quality we teach our students to real businesses.
                </p>
                <p>
                  We are a young, energetic startup - and that's exactly why every student and every client gets
                  our complete attention. Join us at the beginning and grow with us!
                </p>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4" data-aos="fade-left">
              {[
                { icon: FiBook, value: '5', label: 'Tech Programs' },
                { icon: FiBriefcase, value: '3', label: 'Business Services' },
                { icon: FiUsers, value: '1:1', label: 'Mentorship' },
                { icon: FiStar, value: '2026', label: 'Fresh Startup' },
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

      {/* Business Services */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 sm:mb-16" data-aos="fade-up">
            <div className="inline-flex items-center px-4 py-2 bg-emerald-50 border border-emerald-200 rounded-full mb-4">
              <FiBriefcase className="w-4 h-4 text-emerald-600 mr-2" />
              <span className="text-emerald-700 text-xs sm:text-sm font-semibold">For Businesses</span>
            </div>
            <h2 className="section-title">Beyond Training — We Build for Businesses</h2>
            <p className="section-subtitle mx-auto">
              The same expertise we teach our students is what we use to build digital solutions for local businesses
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8 mb-10 sm:mb-12">
            {[
              {
                icon: FiGlobe,
                color: 'from-emerald-500 to-teal-600',
                title: 'Business Websites',
                description: 'Modern, fast and mobile-responsive websites with enquiry forms, WhatsApp chat and Google Maps integration that bring customers to your business.',
              },
              {
                icon: FiPrinter,
                color: 'from-blue-500 to-indigo-600',
                title: 'GST Billing Software',
                description: 'Easy-to-use billing software with GST invoicing, inventory management, sales reports, thermal printer and barcode support — customized for your shop or business.',
              },
              {
                icon: FiLayers,
                color: 'from-purple-500 to-pink-600',
                title: 'Management Systems',
                description: 'Complete digital systems for schools, classes, hotels and institutions — fee collection, attendance, bookings, notifications and admin dashboards.',
              },
            ].map((service, index) => (
              <motion.div
                key={service.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="card group"
              >
                <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${service.color} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}>
                  <service.icon className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-lg font-display font-semibold text-dark-900 mb-2">{service.title}</h3>
                <p className="text-dark-500 text-sm">{service.description}</p>
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-white rounded-2xl p-6 sm:p-8 shadow-sm border border-gray-100"
          >
            <div className="flex flex-col lg:flex-row lg:items-center gap-6">
              <div className="flex-1">
                <h3 className="text-lg sm:text-xl font-display font-semibold text-dark-900 mb-3">Who We Serve</h3>
                <div className="flex flex-wrap gap-2">
                  {['Banks & Finance', 'Shops & Retail', 'Schools', 'Coaching Classes', 'Hotels', 'Malls', 'Restaurants', 'And More'].map((type) => (
                    <span
                      key={type}
                      className="inline-flex items-center px-3 py-1.5 bg-gray-50 border border-gray-200 rounded-full text-dark-600 text-xs sm:text-sm font-medium"
                    >
                      <FiCheck className="w-3.5 h-3.5 text-emerald-500 mr-1.5" />
                      {type}
                    </span>
                  ))}
                </div>
              </div>
              <Link
                to="/business-enquiry"
                className="inline-flex items-center justify-center px-6 py-3 bg-gradient-to-r from-emerald-500 to-teal-500 text-white font-semibold rounded-xl hover:shadow-lg hover:shadow-emerald-500/30 hover:-translate-y-0.5 transition-all duration-300 whitespace-nowrap"
              >
                Get a Free Consultation <FiArrowRight className="ml-2 w-4 h-4" />
              </Link>
            </div>
          </motion.div>
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
              Be among our first students — or let us build the digital solution your business needs
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4">
              <Link to="/enrollment" className="w-full sm:w-auto inline-flex items-center justify-center px-8 py-4 bg-white text-primary-700 font-bold text-lg rounded-2xl hover:shadow-2xl hover:shadow-black/20 hover:-translate-y-1 transition-all duration-300">
                Enroll Now <FiArrowRight className="ml-2 w-5 h-5" />
              </Link>
              <Link to="/business-enquiry" className="w-full sm:w-auto inline-flex items-center justify-center px-8 py-4 border-2 border-white/40 text-white font-bold text-lg rounded-2xl hover:bg-white/10 hover:border-white/60 hover:-translate-y-1 transition-all duration-300">
                <FiBriefcase className="mr-2 w-5 h-5" /> Business Enquiry
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default About;

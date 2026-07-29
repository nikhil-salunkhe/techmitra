import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FiMail, FiPhone, FiMapPin, FiArrowUp, FiCheck } from 'react-icons/fi';
import { FaWhatsapp, FaInstagram, FaLinkedinIn, FaFacebookF, FaYoutube } from 'react-icons/fa';

const Footer = () => {
  const [email, setEmail] = useState('');
  const [subStatus, setSubStatus] = useState({ loading: false, message: '', success: false });

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSubscribe = async (e) => {
    e.preventDefault();
    if (!email.trim()) return;

    setSubStatus({ loading: true, message: '', success: false });

    const API_URL = import.meta.env.VITE_API_URL || '';
    try {
      const res = await fetch(`${API_URL}/api/subscribe`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });
      const data = await res.json();
      setSubStatus({ loading: false, message: data.message, success: data.success });
      if (data.success) setEmail('');
    } catch (err) {
      setSubStatus({ loading: false, message: 'Server not running. Please try again later.', success: false });
    }

    setTimeout(() => setSubStatus({ loading: false, message: '', success: false }), 4000);
  };

  const quickLinks = [
    { name: 'Home', path: '/' },
    { name: 'About Us', path: '/about' },
    { name: 'Programs', path: '/programs' },
    { name: 'Enrollment', path: '/enrollment' },
    { name: 'Contact', path: '/contact' },
  ];

  const programs = [
    { name: 'MERN Web Project Development', path: '/programs/mern' },
    { name: 'Java Application Project Development', path: '/programs/java' },
    { name: 'Python Application Project Development', path: '/programs/python' },
    { name: 'React Native Mobile App Project Development', path: '/programs/react-native' },
  ];

  return (
    <footer className="bg-dark-900 text-white relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-0 left-0 w-96 h-96 bg-primary-500 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2" />
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-accent-500 rounded-full blur-3xl translate-x-1/2 translate-y-1/2" />
      </div>

      {/* Scroll to Top */}
      <button
        onClick={scrollToTop}
        className="absolute -top-5 left-1/2 -translate-x-1/2 w-10 h-10 bg-gradient-to-r from-primary-600 to-primary-700 rounded-full flex items-center justify-center shadow-lg shadow-primary-500/30 hover:-translate-y-1 transition-all duration-300"
      >
        <FiArrowUp className="w-5 h-5" />
      </button>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 sm:pt-16 pb-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 sm:gap-10">
          {/* Brand */}
          <div>
            <Link to="/" className="flex items-center space-x-2 mb-4">
              <div className="w-10 h-10 bg-gradient-to-br from-primary-500 to-accent-500 rounded-xl flex items-center justify-center">
                <span className="text-white font-display font-bold text-lg">TM</span>
              </div>
              <div className="flex flex-col">
                <span className="font-display font-bold text-xl text-white">TechMitra</span>
                <span className="text-[10px] text-primary-400 font-medium tracking-widest uppercase">
                  Learn. Build. Launch.
                </span>
              </div>
            </Link>
            <p className="text-dark-300 text-sm leading-relaxed mb-6">
              We help college students build industry-oriented final year projects. 
              Learn from experts and become job-ready with real project experience.
            </p>
            <div className="flex flex-wrap gap-2 sm:gap-3">
              <a href="https://wa.me/919764149564" target="_blank" rel="noopener noreferrer" 
                className="w-9 h-9 sm:w-10 sm:h-10 rounded-lg sm:rounded-xl bg-dark-700 hover:bg-green-600 flex items-center justify-center transition-all duration-300 hover:-translate-y-1">
                <FaWhatsapp className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
              </a>
              <a href="https://instagram.com/techmitra" target="_blank" rel="noopener noreferrer"
                className="w-9 h-9 sm:w-10 sm:h-10 rounded-lg sm:rounded-xl bg-dark-700 hover:bg-pink-600 flex items-center justify-center transition-all duration-300 hover:-translate-y-1">
                <FaInstagram className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
              </a>
              <a href="https://linkedin.com/company/techmitra" target="_blank" rel="noopener noreferrer"
                className="w-9 h-9 sm:w-10 sm:h-10 rounded-lg sm:rounded-xl bg-dark-700 hover:bg-blue-600 flex items-center justify-center transition-all duration-300 hover:-translate-y-1">
                <FaLinkedinIn className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
              </a>
              <a href="https://facebook.com/techmitra" target="_blank" rel="noopener noreferrer"
                className="w-9 h-9 sm:w-10 sm:h-10 rounded-lg sm:rounded-xl bg-dark-700 hover:bg-blue-700 flex items-center justify-center transition-all duration-300 hover:-translate-y-1">
                <FaFacebookF className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
              </a>
              <a href="https://youtube.com/@techmitra" target="_blank" rel="noopener noreferrer"
                className="w-9 h-9 sm:w-10 sm:h-10 rounded-lg sm:rounded-xl bg-dark-700 hover:bg-red-600 flex items-center justify-center transition-all duration-300 hover:-translate-y-1">
                <FaYoutube className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-white font-display font-semibold text-lg mb-4">Quick Links</h3>
            <ul className="space-y-3">
              {quickLinks.map((link) => (
                <li key={link.name}>
                  <Link
                    to={link.path}
                    className="text-dark-300 hover:text-primary-400 text-sm transition-colors duration-200 flex items-center"
                  >
                    <span className="w-1 h-1 bg-primary-500 rounded-full mr-2" />
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Programs */}
          <div>
            <h3 className="text-white font-display font-semibold text-lg mb-4">Programs</h3>
            <ul className="space-y-3">
              {programs.map((program) => (
                <li key={program.name}>
                  <Link
                    to={program.path}
                    className="text-dark-300 hover:text-primary-400 text-sm transition-colors duration-200 flex items-center"
                  >
                    <span className="w-1 h-1 bg-accent-500 rounded-full mr-2" />
                    {program.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-white font-display font-semibold text-lg mb-4">Contact Us</h3>
            <ul className="space-y-4">
              <li className="flex items-start space-x-3">
                <FiMail className="w-5 h-5 text-primary-400 mt-0.5" />
                <div>
                  <p className="text-sm text-dark-300">Email</p>
                  <a href="mailto:techmitrofficial@gmail.com" className="text-white hover:text-primary-400 text-sm transition-colors">
                    techmitrofficial@gmail.com
                  </a>
                </div>
              </li>
              <li className="flex items-start space-x-3">
                <FiPhone className="w-5 h-5 text-primary-400 mt-0.5" />
                <div>
                  <p className="text-sm text-dark-300">Phone</p>
                  <a href="tel:+919764149564" className="text-white hover:text-primary-400 text-sm transition-colors">
                    +91 97641 49564
                  </a>
                </div>
              </li>
              <li className="flex items-start space-x-3">
                <FiMapPin className="w-5 h-5 text-primary-400 mt-0.5" />
                <div>
                  <p className="text-sm text-dark-300">Location</p>
                  <p className="text-white text-sm">India (Online)</p>
                </div>
              </li>
            </ul>

            {/* Newsletter */}
            <div className="mt-6">
              <h4 className="text-sm font-semibold text-white mb-2">Stay Updated</h4>
              <form onSubmit={handleSubscribe} className="flex">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Your email"
                  required
                  className="flex-1 px-3 py-2 bg-dark-700 border border-dark-600 rounded-l-xl text-white text-sm focus:outline-none focus:border-primary-500 placeholder-dark-400"
                />
                <button
                  type="submit"
                  disabled={subStatus.loading}
                  className="px-4 py-2 bg-gradient-to-r from-primary-600 to-primary-700 text-white text-sm font-medium rounded-r-xl hover:shadow-lg hover:shadow-primary-500/30 transition-all duration-300 disabled:opacity-50"
                >
                  {subStatus.loading ? '...' : 'Subscribe'}
                </button>
              </form>
              {subStatus.message && (
                <p className={`text-xs mt-2 ${subStatus.success ? 'text-green-400' : 'text-yellow-400'} flex items-center`}>
                  {subStatus.success && <FiCheck className="w-3 h-3 mr-1" />}
                  {subStatus.message}
                </p>
              )}
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-8 sm:mt-12 pt-6 sm:pt-8 border-t border-dark-700">
          <div className="flex flex-col md:flex-row items-center justify-between space-y-4 md:space-y-0">
            <p className="text-dark-400 text-sm">
              © {new Date().getFullYear()} TechMitra. All rights reserved.
            </p>
            <div className="flex space-x-6">
              <Link to="/" className="text-dark-400 hover:text-primary-400 text-sm transition-colors">
                Privacy Policy
              </Link>
              <Link to="/" className="text-dark-400 hover:text-primary-400 text-sm transition-colors">
                Terms of Service
              </Link>
              <Link to="/" className="text-dark-400 hover:text-primary-400 text-sm transition-colors">
                Refund Policy
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
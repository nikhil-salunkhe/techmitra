import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { HiMenu, HiX } from 'react-icons/hi';
import { FiChevronDown } from 'react-icons/fi';
import { navLinks } from '../../data/navigation';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [megaOpen, setMegaOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setIsOpen(false);
    setMegaOpen(false);
  }, [location]);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? 'bg-white/95 backdrop-blur-md shadow-lg shadow-gray-200/50'
          : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2 group">
            <div className="w-10 h-10 bg-gradient-to-br from-primary-600 to-accent-500 rounded-xl flex items-center justify-center transform group-hover:rotate-6 transition-transform duration-300">
              <span className="text-white font-display font-bold text-lg">TM</span>
            </div>
            <div className="flex flex-col">
              <span className={`font-display font-bold text-xl transition-colors duration-300 ${
                scrolled ? 'text-dark-900' : 'text-white'
              }`}>
                TechMitra
              </span>
              <span className={`text-[10px] font-medium tracking-widest uppercase transition-colors duration-300 ${
                scrolled ? 'text-primary-600' : 'text-blue-200'
              }`}>
                Learn. Build. Launch.
              </span>
            </div>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden lg:flex items-center space-x-1">
            {navLinks.map((link) => (
              <div key={link.path} className="relative group">
                {link.megaMenu ? (
                  <button
                    onMouseEnter={() => setMegaOpen(true)}
                    onMouseLeave={() => setMegaOpen(false)}
                    className={`flex items-center px-4 py-2 rounded-xl text-sm font-medium transition-all duration-300 ${
                      scrolled
                        ? 'text-dark-700 hover:text-primary-600 hover:bg-primary-50'
                        : 'text-white/90 hover:text-white hover:bg-white/10'
                    }`}
                  >
                    {link.name}
                    <FiChevronDown className="ml-1 w-4 h-4" />
                  </button>
                ) : (
                  <Link
                    to={link.path}
                    className={`flex items-center px-4 py-2 rounded-xl text-sm font-medium transition-all duration-300 ${
                      location.pathname === link.path
                        ? scrolled
                          ? 'text-primary-600 bg-primary-50'
                          : 'text-white bg-white/15'
                        : scrolled
                        ? 'text-dark-700 hover:text-primary-600 hover:bg-primary-50'
                        : 'text-white/90 hover:text-white hover:bg-white/10'
                    }`}
                  >
                    {link.name}
                  </Link>
                )}

                {/* Mega Menu */}
                {link.megaMenu && (
                  <div
                    onMouseEnter={() => setMegaOpen(true)}
                    onMouseLeave={() => setMegaOpen(false)}
                    className={`absolute top-full left-0 mt-1 w-[500px] bg-white rounded-2xl shadow-2xl shadow-primary-500/10 border border-gray-100 p-6 transition-all duration-300 ${
                      megaOpen
                        ? 'opacity-100 visible translate-y-0'
                        : 'opacity-0 invisible translate-y-2'
                    }`}
                  >
                    <div className="grid grid-cols-2 gap-6">
                      {link.megaMenu.map((category) => (
                        <div key={category.category}>
                          <h3 className="text-xs font-semibold text-dark-400 uppercase tracking-wider mb-3">
                            {category.category}
                          </h3>
                          <div className="space-y-2">
                            {category.items.map((item) => (
                              <Link
                                key={item.path}
                                to={item.path}
                                className="flex items-center space-x-3 px-3 py-2.5 rounded-xl hover:bg-primary-50 group/item transition-all duration-200"
                              >
                                <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-primary-500 to-primary-700 flex items-center justify-center text-white text-xs font-bold">
                                  {item.icon?.replace('Si', '').charAt(0)}
                                </div>
                                <div>
                                  <p className="text-sm font-medium text-dark-800 group-hover/item:text-primary-600">
                                    {item.name}
                                  </p>
                                  <p className="text-xs text-dark-400">
                                    View program details
                                  </p>
                                </div>
                              </Link>
                            ))}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ))}

            {/* CTA Buttons */}
            <Link
              to="/business-enquiry"
              className="ml-4 px-4 lg:px-5 py-2.5 bg-gradient-to-r from-emerald-500 to-teal-500 text-white text-sm font-semibold rounded-xl hover:shadow-lg hover:shadow-emerald-500/30 hover:-translate-y-0.5 transition-all duration-300"
            >
              For Business
            </Link>
            <Link
              to="/enrollment"
              className="px-4 lg:px-5 py-2.5 bg-gradient-to-r from-primary-600 to-primary-700 text-white text-sm font-semibold rounded-xl hover:shadow-lg hover:shadow-primary-500/30 hover:-translate-y-0.5 transition-all duration-300"
            >
              Enroll Now
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className={`lg:hidden p-2 rounded-xl transition-colors ${
              scrolled
                ? 'text-dark-700 hover:bg-gray-100'
                : 'text-white hover:bg-white/10'
            }`}
          >
            {isOpen ? <HiX className="w-6 h-6" /> : <HiMenu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden bg-white border-t border-gray-100 shadow-xl overflow-hidden"
          >
            <div className="px-4 py-4 space-y-1">
              {navLinks.map((link) => (
                <div key={link.path}>
                  {link.megaMenu ? (
                    <div className="space-y-1">
                      <p className="px-3 py-2 text-sm font-semibold text-dark-400 uppercase tracking-wider">
                        {link.name}
                      </p>
                      <div className="pl-4 space-y-1">
                        {link.megaMenu.map((cat) => (
                          <div key={cat.category} className="mb-3">
                            <p className="px-3 py-1 text-xs text-dark-400">{cat.category}</p>
                            {cat.items.map((item) => (
                              <Link
                                key={item.path}
                                to={item.path}
                                className="block px-3 py-2 text-sm text-dark-700 hover:text-primary-600 hover:bg-primary-50 rounded-xl transition-all"
                              >
                                {item.name}
                              </Link>
                            ))}
                          </div>
                        ))}
                      </div>
                    </div>
                  ) : (
                    <Link
                      to={link.path}
                      className={`block px-3 py-2.5 text-sm font-medium rounded-xl transition-all ${
                        location.pathname === link.path
                          ? 'text-primary-600 bg-primary-50'
                          : 'text-dark-700 hover:text-primary-600 hover:bg-gray-50'
                      }`}
                    >
                      {link.name}
                    </Link>
                  )}
                </div>
              ))}
              <div className="pt-2 grid grid-cols-2 gap-3">
                <Link
                  to="/business-enquiry"
                  className="block w-full text-center px-4 py-3 bg-gradient-to-r from-emerald-500 to-teal-500 text-white font-semibold rounded-xl text-sm"
                >
                  For Business
                </Link>
                <Link
                  to="/enrollment"
                  className="block w-full text-center px-4 py-3 bg-gradient-to-r from-primary-600 to-primary-700 text-white font-semibold rounded-xl text-sm"
                >
                  Enroll Now
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;
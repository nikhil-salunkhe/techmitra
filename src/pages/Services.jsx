import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  FiArrowRight, FiCheck, FiStar, FiGlobe, FiPrinter, FiLayers,
  FiBriefcase, FiShoppingCart, FiBookOpen, FiUsers, FiHome, FiGrid,
  FiDollarSign, FiClock, FiShield, FiHeadphones, FiSmartphone, FiTrendingUp,
  FiPhone, FiMail, FiChevronDown,
} from 'react-icons/fi';
import { FaWhatsapp, FaBuilding } from 'react-icons/fa';
import {
  businessStats,
  businessServices,
  businessTypesWeServe,
  businessProcessSteps,
  whyChooseForBusiness,
  businessFaqData,
} from '../data/navigation';

// Icon resolver for data-driven icons
const iconMap = {
  FiGlobe, FiPrinter, FiLayers, FiBriefcase, FiShoppingCart, FiBookOpen,
  FiUsers, FiHome, FiGrid, FiDollarSign, FiClock, FiShield, FiHeadphones,
  FiSmartphone, FiTrendingUp,
};

const ServiceIcon = ({ name, className }) => {
  const Icon = iconMap[name] || FiGlobe;
  return <Icon className={className} />;
};

const Services = () => {
  return (
    <div>
      <Hero />
      <StatsStrip />
      <ServicesGrid />
      <BusinessTypes />
      <WhyChooseBusiness />
      <ProcessSteps />
      <FaqSection />
      <CtaBanner />
    </div>
  );
};

// ==================== HERO ====================
const Hero = () => (
  <section className="relative min-h-[80vh] flex items-center overflow-hidden">
    {/* Background */}
    <div className="absolute inset-0 bg-gradient-to-br from-emerald-900 via-teal-800 to-dark-900" />
    <div className="absolute inset-0 opacity-20">
      <div className="absolute top-20 left-20 w-48 h-48 sm:w-96 sm:h-96 bg-emerald-400 rounded-full blur-3xl animate-pulse" />
      <div className="absolute bottom-20 right-20 w-48 h-48 sm:w-80 sm:h-80 bg-cyan-500 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
    </div>
    {/* Grid Pattern */}
    <div className="absolute inset-0 opacity-5" style={{
      backgroundImage: 'linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)',
      backgroundSize: '40px 40px',
    }} />

    <div className="relative w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 sm:pt-32 pb-16 sm:pb-20 text-center">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        data-aos="fade-up"
      >
        <div className="inline-flex items-center px-3 sm:px-4 py-1.5 sm:py-2 bg-white/10 backdrop-blur-sm rounded-full border border-white/10 mb-4 sm:mb-6">
          <span className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-emerald-400 rounded-full animate-pulse mr-1.5 sm:mr-2" />
          <span className="text-emerald-100 text-xs sm:text-sm font-medium">💼 Now Serving Local Businesses Across India</span>
        </div>

        <h1 className="text-3xl sm:text-5xl lg:text-6xl font-display font-bold text-white leading-tight mb-4 sm:mb-6">
          Digital Solutions for Your{' '}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-300 to-cyan-300">
            Business Growth
          </span>
        </h1>

        <p className="text-base sm:text-xl text-emerald-100/90 max-w-3xl mx-auto mb-8 sm:mb-10 leading-relaxed">
          We build professional websites, GST billing software and management systems for
          banks, shops, schools, classes, hotels, malls and every growing business.
          Affordable pricing. Fast delivery. Lifetime support.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4">
          <Link
            to="/business-enquiry"
            className="w-full sm:w-auto inline-flex items-center justify-center px-6 sm:px-8 py-3 sm:py-4 bg-gradient-to-r from-emerald-500 to-teal-500 text-white font-bold text-sm sm:text-lg rounded-2xl hover:shadow-2xl hover:shadow-emerald-500/30 hover:-translate-y-1 transition-all duration-300"
          >
            Get Free Consultation <FiArrowRight className="ml-2 w-4 h-4 sm:w-5 sm:h-5" />
          </Link>
          <a
            href="https://wa.me/919764149564?text=Hi%20TechMitra%2C%20I%20want%20a%20website%2Fbilling%20software%20for%20my%20business"
            target="_blank"
            rel="noopener noreferrer"
            className="w-full sm:w-auto inline-flex items-center justify-center px-6 sm:px-8 py-3 sm:py-4 bg-white/10 backdrop-blur-sm border border-white/20 text-white font-semibold text-sm sm:text-lg rounded-2xl hover:bg-white/20 hover:-translate-y-1 transition-all duration-300"
          >
            <FaWhatsapp className="mr-2 w-5 h-5 text-green-400" /> Chat on WhatsApp
          </a>
        </div>
      </motion.div>
    </div>
  </section>
);

// ==================== STATS STRIP ====================
const StatsStrip = () => (
  <section className="bg-white py-10 sm:py-14 border-b border-gray-100">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6 sm:gap-8">
        {businessStats.map((stat, index) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.08 }}
            className="text-center"
            data-aos="fade-up"
          >
            <p className="text-3xl sm:text-4xl lg:text-5xl font-display font-bold text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 to-teal-600">
              {stat.value}
            </p>
            <p className="text-dark-500 text-xs sm:text-base mt-1">{stat.label}</p>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);

// ==================== SERVICES GRID ====================
const ServicesGrid = () => (
  <section className="section-padding bg-gray-50">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="text-center mb-10 sm:mb-16 px-4" data-aos="fade-up">
        <h2 className="section-title">What We Build For You</h2>
        <p className="section-subtitle mx-auto">
          Complete digital solutions designed for local businesses - simple to use, easy to afford.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-8">
        {businessServices.map((service, index) => (
          <motion.div
            key={service.id}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.1, duration: 0.5 }}
            className="bg-white rounded-2xl p-5 sm:p-7 shadow-lg shadow-gray-200/50 border border-gray-100 hover:shadow-2xl hover:shadow-emerald-500/10 hover:-translate-y-1.5 transition-all duration-300 flex flex-col"
          >
            <div className={`w-12 h-12 sm:w-14 sm:h-14 rounded-2xl bg-gradient-to-br ${service.color} flex items-center justify-center mb-4 shadow-lg`}>
              <ServiceIcon name={service.icon} className="w-6 h-6 sm:w-7 sm:h-7 text-white" />
            </div>

            <h3 className="text-lg sm:text-xl font-display font-bold text-dark-900 mb-1">{service.title}</h3>
            <p className={`text-xs sm:text-sm font-semibold mb-3 text-transparent bg-clip-text bg-gradient-to-r ${service.color}`}>
              {service.tagline}
            </p>
            <p className="text-dark-500 text-xs sm:text-sm leading-relaxed mb-5">{service.description}</p>

            <ul className="space-y-2 mb-6 flex-1">
              {service.features.map((feature) => (
                <li key={feature} className="flex items-start text-dark-600 text-xs sm:text-sm">
                  <FiCheck className="w-4 h-4 text-emerald-500 mr-2 mt-0.5 flex-shrink-0" />
                  {feature}
                </li>
              ))}
            </ul>

            <div className="pt-4 border-t border-gray-100 flex items-center justify-between">
              <div>
                <p className="text-[10px] sm:text-xs text-dark-400 uppercase tracking-wide">Pricing</p>
                <p className="text-lg sm:text-2xl font-display font-bold text-dark-900">{service.startingPrice}</p>
              </div>
              <Link
                to="/business-enquiry"
                className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-emerald-500 to-teal-500 text-white text-xs sm:text-sm font-semibold rounded-xl hover:shadow-lg hover:shadow-emerald-500/30 hover:-translate-y-0.5 transition-all duration-300"
              >
                Enquire Now <FiArrowRight className="ml-1 w-3 h-3 sm:w-4 sm:h-4" />
              </Link>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);

// ==================== BUSINESS TYPES ====================
const BusinessTypes = () => (
  <section className="section-padding bg-gradient-to-b from-dark-900 to-dark-800">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="text-center mb-10 sm:mb-16 px-4" data-aos="fade-up">
        <h2 className="section-title text-white">Industries We Serve</h2>
        <p className="section-subtitle mx-auto text-dark-300">
          Whatever your business type, we have a digital solution ready for you.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
        {businessTypesWeServe.map((type, index) => (
          <motion.div
            key={type.name}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.06, duration: 0.5 }}
            className="glass-dark rounded-2xl p-5 sm:p-6 hover:bg-white/10 transition-all duration-300 group"
          >
            <div className="flex items-center mb-3">
              <div className={`w-10 h-10 sm:w-11 sm:h-11 rounded-xl bg-gradient-to-br ${type.color} flex items-center justify-center mr-3 group-hover:scale-110 transition-transform duration-300`}>
                <ServiceIcon name={type.icon} className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
              </div>
              <h3 className="text-base sm:text-lg font-display font-semibold text-white">{type.name}</h3>
            </div>
            <p className="text-dark-300 text-xs sm:text-sm leading-relaxed">{type.solutions}</p>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);

// ==================== WHY CHOOSE (BUSINESS) ====================
const WhyChooseBusiness = () => (
  <section className="section-padding bg-white">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="text-center mb-10 sm:mb-16 px-4" data-aos="fade-up">
        <h2 className="section-title">Why Businesses Choose TechMitra</h2>
        <p className="section-subtitle mx-auto">
          We understand local business needs and deliver solutions that actually help you grow.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
        {whyChooseForBusiness.map((item, index) => (
          <motion.div
            key={item.title}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.05, duration: 0.5 }}
            className="bg-white rounded-2xl p-5 sm:p-6 shadow-lg shadow-gray-200/50 border border-gray-100 hover:shadow-xl hover:shadow-emerald-500/10 hover:-translate-y-1 transition-all duration-300 group"
          >
            <div className={`w-11 h-11 sm:w-12 sm:h-12 rounded-xl bg-gradient-to-br ${item.color} flex items-center justify-center mb-3 sm:mb-4 group-hover:scale-110 transition-transform duration-300`}>
              <ServiceIcon name={item.icon} className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
            </div>
            <h3 className="text-base sm:text-lg font-display font-semibold text-dark-900 mb-1.5">{item.title}</h3>
            <p className="text-dark-500 text-xs sm:text-sm leading-relaxed">{item.description}</p>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);

// ==================== PROCESS STEPS ====================
const ProcessSteps = () => (
  <section className="section-padding bg-gradient-to-br from-emerald-50 via-teal-50 to-cyan-50">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="text-center mb-10 sm:mb-16 px-4" data-aos="fade-up">
        <h2 className="section-title">How It Works</h2>
        <p className="section-subtitle mx-auto">
          From enquiry to delivery in 4 simple steps - no technical knowledge needed from your side.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 sm:gap-6">
        {businessProcessSteps.map((step, index) => (
          <motion.div
            key={step.number}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.1 }}
            className="relative text-center bg-white rounded-2xl p-5 sm:p-6 shadow-md border border-emerald-100"
          >
            {index < businessProcessSteps.length - 1 && (
              <div className="hidden lg:block absolute top-10 -right-3 w-6 h-0.5 bg-gradient-to-r from-emerald-400 to-teal-400" />
            )}
            <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-emerald-500 to-teal-600 flex items-center justify-center mx-auto mb-4 shadow-lg shadow-emerald-500/30">
              <span className="text-xl font-display font-bold text-white">{step.number}</span>
            </div>
            <h3 className="text-base sm:text-lg font-display font-semibold text-dark-900 mb-2">{step.title}</h3>
            <p className="text-dark-500 text-xs sm:text-sm leading-relaxed">{step.desc}</p>
          </motion.div>
        ))}
      </div>

      <div className="text-center mt-10" data-aos="fade-up">
        <Link
          to="/business-enquiry"
          className="inline-flex items-center px-7 sm:px-8 py-3 sm:py-4 bg-gradient-to-r from-emerald-500 to-teal-500 text-white font-bold text-sm sm:text-base rounded-2xl hover:shadow-2xl hover:shadow-emerald-500/30 hover:-translate-y-1 transition-all duration-300"
        >
          Start With a Free Enquiry <FiArrowRight className="ml-2 w-4 h-4 sm:w-5 sm:h-5" />
        </Link>
      </div>
    </div>
  </section>
);

// ==================== FAQ ====================
const FaqSection = () => {
  const [openIndex, setOpenIndex] = useState(null);

  return (
    <section className="section-padding bg-white">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10 sm:mb-12" data-aos="fade-up">
          <h2 className="section-title">Business Service FAQs</h2>
          <p className="section-subtitle mx-auto">Common questions from business owners like you</p>
        </div>
        <div className="space-y-3">
          {businessFaqData.map((faq, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.03 }}
              className="bg-gray-50 rounded-xl sm:rounded-2xl border border-gray-100 overflow-hidden hover:shadow-md transition-shadow duration-300"
            >
              <button
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
                className="w-full flex items-center justify-between p-4 sm:p-5 text-left"
              >
                <span className="text-dark-800 font-medium text-sm sm:text-base pr-3 sm:pr-4">{faq.q}</span>
                <FiChevronDown
                  className={`w-4 h-4 sm:w-5 sm:h-5 text-emerald-600 flex-shrink-0 transition-transform duration-300 ${openIndex === index ? 'rotate-180' : ''}`}
                />
              </button>
              <motion.div
                initial={false}
                animate={{ height: openIndex === index ? 'auto' : 0, opacity: openIndex === index ? 1 : 0 }}
                transition={{ duration: 0.3 }}
                className="overflow-hidden"
              >
                <p className="px-4 sm:px-5 pb-4 sm:pb-5 text-dark-500 text-xs sm:text-sm leading-relaxed">{faq.a}</p>
              </motion.div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

// ==================== CTA BANNER ====================
const CtaBanner = () => (
  <section className="py-16 relative overflow-hidden">
    <div className="absolute inset-0 bg-gradient-to-br from-emerald-600 via-teal-600 to-cyan-700" />
    <div className="absolute inset-0 opacity-10">
      <div className="absolute top-0 left-1/4 w-72 h-72 bg-white rounded-full blur-3xl" />
      <div className="absolute bottom-0 right-1/4 w-72 h-72 bg-white rounded-full blur-3xl" />
    </div>
    <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
      >
        <FaBuilding className="w-12 h-12 text-emerald-200 mx-auto mb-4" />
        <h2 className="text-3xl md:text-4xl font-display font-bold text-white mb-4">
          Ready to Take Your Business Online?
        </h2>
        <p className="text-lg text-emerald-100 mb-8 max-w-2xl mx-auto">
          Fill a simple enquiry form and our expert will call you within 24 hours with a free consultation and quotation.
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4">
          <Link
            to="/business-enquiry"
            className="w-full sm:w-auto inline-flex items-center justify-center px-8 py-4 bg-white text-emerald-700 font-bold text-base sm:text-lg rounded-2xl hover:shadow-2xl hover:shadow-black/20 hover:-translate-y-1 transition-all duration-300"
          >
            Get Free Consultation <FiArrowRight className="ml-2 w-5 h-5" />
          </Link>
          <a
            href="tel:+919764149564"
            className="w-full sm:w-auto inline-flex items-center justify-center px-8 py-4 bg-white/10 backdrop-blur-sm border border-white/30 text-white font-semibold text-base rounded-2xl hover:bg-white/20 hover:-translate-y-1 transition-all duration-300"
          >
            <FiPhone className="mr-2 w-5 h-5" /> Call: +91 97641 49564
          </a>
        </div>
      </motion.div>
    </div>
  </section>
);

export default Services;

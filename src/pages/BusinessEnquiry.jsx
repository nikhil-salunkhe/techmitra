import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  FiCheckCircle, FiArrowRight, FiPhone, FiMail, FiShield, FiClock,
  FiDollarSign, FiMessageSquare, FiGlobe, FiPrinter, FiLayers,
} from 'react-icons/fi';
import { FaWhatsapp } from 'react-icons/fa';
import { useFormik } from 'formik';
import * as Yup from 'yup';

const API_URL = import.meta.env.VITE_API_URL || '';

const BUSINESS_TYPES = ['Bank', 'Shop', 'School', 'Classes', 'Hotel', 'Mall', 'Restaurant', 'Other'];

const SERVICE_TYPES = [
  { value: 'Website Development', icon: FiGlobe, desc: 'Professional website for your business' },
  { value: 'Billing Software', icon: FiPrinter, desc: 'GST billing & inventory software' },
  { value: 'Both Website & Billing', icon: FiLayers, desc: 'Complete digital package' },
  { value: 'Custom Application', icon: FiCheckCircle, desc: 'Something specific? Tell us!' },
];

const BUDGET_RANGES = [
  'Under ₹5,000',
  '₹5,000 - ₹10,000',
  '₹10,000 - ₹25,000',
  '₹25,000 - ₹50,000',
  'Above ₹50,000',
  'Not sure yet - need guidance',
];

const TIMELINES = [
  'As soon as possible',
  'Within 1 month',
  '1-3 months',
  'Just exploring options',
];

const validationSchema = Yup.object({
  businessName: Yup.string().required('Business name is required').min(2, 'Business name must be at least 2 characters'),
  contactPerson: Yup.string().required('Your name is required').min(3, 'Name must be at least 3 characters'),
  email: Yup.string().email('Invalid email address').required('Email is required'),
  phone: Yup.string().required('Phone number is required').matches(/^[0-9]{10}$/, 'Phone number must be exactly 10 digits'),
  businessType: Yup.string().required('Please select your business type'),
  serviceType: Yup.string().required('Please select a service you need'),
});

const BusinessEnquiry = () => {
  const [submitted, setSubmitted] = useState(false);
  const [enquiryData, setEnquiryData] = useState(null);
  const [submitError, setSubmitError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const formik = useFormik({
    initialValues: {
      businessName: '',
      contactPerson: '',
      email: '',
      phone: '',
      city: '',
      businessType: '',
      serviceType: '',
      budget: '',
      timeline: '',
      description: '',
    },
    validationSchema,
    onSubmit: async (values, { resetForm }) => {
      setIsSubmitting(true);
      setSubmitError('');
      try {
        const response = await fetch(`${API_URL}/api/business-enquiry`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(values),
        });
        const data = await response.json();
        if (data.success) {
          setEnquiryData(data.enquiry);
          setSubmitted(true);
          resetForm();
        } else {
          setSubmitError(data.message || 'Something went wrong. Please try again.');
        }
      } catch (error) {
        setSubmitError('Server error. Please make sure the backend server is running or WhatsApp us directly.');
      } finally {
        setIsSubmitting(false);
      }
    },
  });

  const showError = (field) => formik.touched[field] && formik.errors[field] ? (
    <p className="text-red-500 text-xs mt-1">{formik.errors[field]}</p>
  ) : null;

  if (submitted) {
    return (
      <div className="pt-20 min-h-screen flex items-center justify-center bg-gradient-to-br from-emerald-50 to-teal-50">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          className="max-w-lg mx-auto px-4 text-center"
        >
          <div className="w-24 h-24 rounded-full bg-gradient-to-br from-emerald-400 to-teal-600 flex items-center justify-center mx-auto mb-6 shadow-xl shadow-emerald-500/30">
            <FiCheckCircle className="w-12 h-12 text-white" />
          </div>
          <h2 className="text-3xl font-display font-bold text-dark-900 mb-3">Enquiry Submitted!</h2>
          {enquiryData && (
            <p className="inline-block bg-emerald-100 text-emerald-700 text-sm font-bold px-4 py-1.5 rounded-full mb-4">
              Enquiry ID: {enquiryData.id}
            </p>
          )}
          <p className="text-dark-500 mb-2 leading-relaxed">
            Thank you for your interest in TechMitra business services. Our expert will
            contact you within <strong className="text-dark-800">24 hours</strong> with a free
            consultation and quotation.
          </p>
          <p className="text-dark-400 text-sm mb-6">
            A confirmation email has been sent to your email address.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <a
              href="https://wa.me/919764149564?text=Hi%20TechMitra%2C%20I%20just%20submitted%20my%20business%20enquiry"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary inline-flex items-center justify-center"
            >
              <FaWhatsapp className="mr-2 w-5 h-5" /> WhatsApp Us Now
            </a>
            <Link to="/services" className="btn-outline inline-flex items-center justify-center">
              Explore Services <FiArrowRight className="ml-2 w-4 h-4" />
            </Link>
          </div>
        </motion.div>
      </div>
    );
  }

  return (
    <div>
      {/* Hero */}
      <section className="relative py-16 sm:py-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-emerald-900 via-teal-800 to-dark-900" />
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-10 left-16 w-64 h-64 bg-emerald-400 rounded-full blur-3xl animate-pulse" />
          <div className="absolute bottom-10 right-16 w-56 h-56 bg-cyan-500 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
        </div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} data-aos="fade-up">
            <div className="inline-flex items-center px-3 sm:px-4 py-1.5 bg-white/10 backdrop-blur-sm rounded-full border border-white/10 mb-4">
              <span className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-emerald-400 rounded-full animate-pulse mr-1.5 sm:mr-2" />
              <span className="text-emerald-100 text-xs sm:text-sm font-medium">💼 Free Consultation - No Obligation</span>
            </div>
            <h1 className="text-3xl sm:text-5xl font-display font-bold text-white leading-tight mb-4">
              Business Enquiry Form
            </h1>
            <p className="text-emerald-100/90 text-sm sm:text-lg max-w-2xl mx-auto">
              Websites, billing software & management systems for your business.
              Fill the form - we call you within 24 hours.
            </p>
          </motion.div>
        </div>
      </section>

      <section className="section-padding bg-gray-50 pt-8 sm:pt-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-5 gap-8 lg:gap-12">
            {/* Left Info Panel */}
            <div className="lg:col-span-2" data-aos="fade-right">
              <h2 className="text-2xl sm:text-3xl font-display font-bold text-dark-900 mb-3">
                Tell Us About Your Business
              </h2>
              <p className="text-dark-500 text-sm leading-relaxed mb-6">
                Takes less than 2 minutes. Our expert will call you with a free consultation,
                live demo of similar work and a transparent quotation.
              </p>

              <div className="space-y-4 mb-6">
                {[
                  { icon: FiClock, title: '24 Hours Response', desc: 'Our team contacts you quickly after your enquiry.' },
                  { icon: FiShield, title: 'No Obligation', desc: 'Free consultation - pay only when you decide to proceed.' },
                  { icon: FiDollarSign, title: 'Transparent Pricing', desc: 'Clear quotation upfront. No hidden charges ever.' },
                  { icon: FiMessageSquare, title: 'Local Language Support', desc: 'We speak Marathi, Hindi and English.' },
                ].map((item) => (
                  <div key={item.title} className="flex items-start bg-white rounded-xl p-4 shadow-sm border border-gray-100">
                    <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-emerald-500 to-teal-600 flex items-center justify-center mr-3 flex-shrink-0">
                      <item.icon className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <h4 className="font-display font-semibold text-dark-900 text-sm">{item.title}</h4>
                      <p className="text-dark-500 text-xs leading-relaxed mt-0.5">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Quick Contact */}
              <div className="bg-gradient-to-br from-emerald-600 to-teal-700 rounded-2xl p-5">
                <p className="text-emerald-100 text-xs font-semibold uppercase tracking-wider mb-3">Need urgent help?</p>
                <a href="https://wa.me/919764149564?text=Hi%20TechMitra%2C%20I%20need%20a%20website%2Fbilling%20software%20for%20my%20business" target="_blank" rel="noopener noreferrer" className="flex items-center text-white font-semibold hover:text-emerald-200 transition-colors mb-2 text-sm sm:text-base">
                  <FaWhatsapp className="w-5 h-5 mr-2" /> +91 97641 49564 (WhatsApp)
                </a>
                <a href="mailto:techmitrofficial@gmail.com" className="flex items-center text-white font-semibold hover:text-emerald-200 transition-colors text-sm sm:text-base">
                  <FiMail className="w-5 h-5 mr-2" /> techmitrofficial@gmail.com
                </a>
              </div>
            </div>

            {/* Right Form Panel */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="lg:col-span-3"
            >
              <div className="bg-white rounded-2xl shadow-xl border border-gray-100 p-5 sm:p-8">
                <form onSubmit={formik.handleSubmit} className="space-y-5">
                  {submitError && (
                    <div className="p-3 bg-red-50 border border-red-200 rounded-xl text-red-700 text-sm">
                      {submitError}
                    </div>
                  )}

                  {/* Business & Contact Info */}
                  <h3 className="text-xs font-semibold text-dark-400 uppercase tracking-wider">Business Details</h3>
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-dark-700 mb-1.5">Business Name *</label>
                      <input
                        type="text"
                        name="businessName"
                        placeholder="Your business / shop name"
                        className={`w-full px-4 py-3 rounded-xl border bg-gray-50 focus:bg-white focus:outline-none transition-colors ${formik.touched.businessName && formik.errors.businessName ? 'border-red-300' : 'border-gray-200 focus:border-emerald-500'}`}
                        {...formik.getFieldProps('businessName')}
                      />
                      {showError('businessName')}
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-dark-700 mb-1.5">Your Name *</label>
                      <input
                        type="text"
                        name="contactPerson"
                        placeholder="Owner / Manager name"
                        className={`w-full px-4 py-3 rounded-xl border bg-gray-50 focus:bg-white focus:outline-none transition-colors ${formik.touched.contactPerson && formik.errors.contactPerson ? 'border-red-300' : 'border-gray-200 focus:border-emerald-500'}`}
                        {...formik.getFieldProps('contactPerson')}
                      />
                      {showError('contactPerson')}
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-dark-700 mb-1.5">Email Address *</label>
                      <input
                        type="email"
                        name="email"
                        placeholder="you@example.com"
                        className={`w-full px-4 py-3 rounded-xl border bg-gray-50 focus:bg-white focus:outline-none transition-colors ${formik.touched.email && formik.errors.email ? 'border-red-300' : 'border-gray-200 focus:border-emerald-500'}`}
                        {...formik.getFieldProps('email')}
                      />
                      {showError('email')}
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-dark-700 mb-1.5">Phone Number * (WhatsApp preferred)</label>
                      <input
                        type="tel"
                        name="phone"
                        placeholder="10-digit mobile number"
                        maxLength={10}
                        className={`w-full px-4 py-3 rounded-xl border bg-gray-50 focus:bg-white focus:outline-none transition-colors ${formik.touched.phone && formik.errors.phone ? 'border-red-300' : 'border-gray-200 focus:border-emerald-500'}`}
                        {...formik.getFieldProps('phone')}
                      />
                      {showError('phone')}
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-dark-700 mb-1.5">City</label>
                      <input
                        type="text"
                        name="city"
                        placeholder="e.g. Pune, Maharashtra"
                        className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-gray-50 focus:bg-white focus:outline-none focus:border-emerald-500 transition-colors"
                        {...formik.getFieldProps('city')}
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-dark-700 mb-1.5">Business Type *</label>
                      <select
                        name="businessType"
                        className={`w-full px-4 py-3 rounded-xl border bg-gray-50 focus:bg-white focus:outline-none transition-colors ${formik.touched.businessType && formik.errors.businessType ? 'border-red-300' : 'border-gray-200 focus:border-emerald-500'}`}
                        {...formik.getFieldProps('businessType')}
                      >
                        <option value="">Select your business type</option>
                        {BUSINESS_TYPES.map((type) => (
                          <option key={type} value={type}>{type}</option>
                        ))}
                      </select>
                      {showError('businessType')}
                    </div>
                  </div>

                  {/* Service Selection */}
                  <h3 className="text-xs font-semibold text-dark-400 uppercase tracking-wider pt-2">What Do You Need? *</h3>
                  <div className="grid sm:grid-cols-2 gap-3">
                    {SERVICE_TYPES.map((service) => (
                      <button
                        key={service.value}
                        type="button"
                        onClick={() => formik.setFieldValue('serviceType', service.value)}
                        className={`flex items-start p-4 rounded-xl border-2 text-left transition-all duration-200 ${
                          formik.values.serviceType === service.value
                            ? 'border-emerald-500 bg-emerald-50 shadow-md shadow-emerald-100'
                            : 'border-gray-200 bg-white hover:border-emerald-300 hover:bg-emerald-50/40'
                        }`}
                      >
                        <div className={`w-10 h-10 rounded-lg flex items-center justify-center mr-3 flex-shrink-0 ${
                          formik.values.serviceType === service.value
                            ? 'bg-gradient-to-br from-emerald-500 to-teal-600'
                            : 'bg-gray-100'
                        }`}>
                          <service.icon className={`w-5 h-5 ${formik.values.serviceType === service.value ? 'text-white' : 'text-dark-400'}`} />
                        </div>
                        <div>
                          <p className={`font-semibold text-sm ${formik.values.serviceType === service.value ? 'text-emerald-700' : 'text-dark-700'}`}>
                            {service.value}
                          </p>
                          <p className="text-xs text-dark-400 mt-0.5">{service.desc}</p>
                        </div>
                        {formik.values.serviceType === service.value && (
                          <FiCheckCircle className="w-5 h-5 text-emerald-600 ml-auto flex-shrink-0" />
                        )}
                      </button>
                    ))}
                  </div>
                  {showError('serviceType')}

                  {/* Budget & Timeline */}
                  <h3 className="text-xs font-semibold text-dark-400 uppercase tracking-wider pt-2">Budget & Timeline (Optional)</h3>
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-dark-700 mb-1.5">Approximate Budget</label>
                      <select
                        name="budget"
                        className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-gray-50 focus:bg-white focus:outline-none focus:border-emerald-500 transition-colors"
                        {...formik.getFieldProps('budget')}
                      >
                        <option value="">Select budget range</option>
                        {BUDGET_RANGES.map((range) => (
                          <option key={range} value={range}>{range}</option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-dark-700 mb-1.5">Expected Timeline</label>
                      <select
                        name="timeline"
                        className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-gray-50 focus:bg-white focus:outline-none focus:border-emerald-500 transition-colors"
                        {...formik.getFieldProps('timeline')}
                      >
                        <option value="">Select timeline</option>
                        {TIMELINES.map((time) => (
                          <option key={time} value={time}>{time}</option>
                        ))}
                      </select>
                    </div>
                  </div>

                  {/* Description */}
                  <div>
                    <label className="block text-sm font-medium text-dark-700 mb-1.5">
                      Tell Us About Your Requirement (Optional)
                    </label>
                    <textarea
                      name="description"
                      rows={4}
                      placeholder="e.g. I run a grocery shop and need GST billing with stock management. Also want a simple website so customers can find us on Google..."
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-gray-50 focus:bg-white focus:outline-none focus:border-emerald-500 transition-colors resize-none"
                      {...formik.getFieldProps('description')}
                    />
                  </div>

                  {/* Submit */}
                  <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-4 border-t border-gray-100">
                    <div className="flex items-center text-xs sm:text-sm text-dark-400 order-2 sm:order-1">
                      <FiShield className="w-4 h-4 mr-1.5 flex-shrink-0" />
                      Your business information is 100% secure with us
                    </div>
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="order-1 sm:order-2 w-full sm:w-auto inline-flex items-center justify-center px-6 py-3 bg-gradient-to-r from-emerald-500 to-teal-500 text-white font-semibold rounded-xl hover:shadow-lg hover:shadow-emerald-500/30 hover:-translate-y-0.5 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:translate-y-0"
                    >
                      {isSubmitting ? (
                        <>Submitting...</>
                      ) : (
                        <>Submit Enquiry - Free <FiArrowRight className="ml-2 w-4 h-4" /></>
                      )}
                    </button>
                  </div>
                </form>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default BusinessEnquiry;
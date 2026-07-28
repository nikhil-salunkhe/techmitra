import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FiPhone, FiMail, FiMapPin, FiClock, FiSend, FiMessageCircle } from 'react-icons/fi';
import { FaWhatsapp, FaInstagram, FaLinkedinIn, FaFacebookF, FaYoutube } from 'react-icons/fa';
import { useFormik } from 'formik';
import * as Yup from 'yup';

const Contact = () => {
  const [submitted, setSubmitted] = useState(false);

  const formik = useFormik({
    initialValues: {
      name: '',
      email: '',
      phone: '',
      subject: '',
      message: '',
    },
    validationSchema: Yup.object({
      name: Yup.string().required('Name is required'),
      email: Yup.string().email('Invalid email').required('Email is required'),
      phone: Yup.string().matches(/^[0-9]{10}$/, 'Phone must be 10 digits'),
      subject: Yup.string().required('Subject is required'),
      message: Yup.string().required('Message is required').min(10, 'Message must be at least 10 characters'),
    }),
    onSubmit: (values, { resetForm }) => {
      console.log('Contact form:', values);
      setSubmitted(true);
      resetForm();
    },
  });

  const contactInfo = [
    { icon: FiMail, label: 'Email', value: 'techmitrofficial@gmail.com', href: 'mailto:techmitrofficial@gmail.com' },
    { icon: FiPhone, label: 'Phone', value: '+91 97641 49564', href: 'tel:+919764149564' },
    { icon: FaWhatsapp, label: 'WhatsApp', value: '+91 97641 49564', href: 'https://wa.me/919764149564' },
    { icon: FiMapPin, label: 'Location', value: 'India (Online)', href: null },
    { icon: FiClock, label: 'Business Hours', value: 'Mon-Sat: 9 AM - 8 PM', href: null },
  ];

  const socialLinks = [
    { icon: FaWhatsapp, href: 'https://wa.me/9764149564', color: 'hover:bg-green-600' },
    { icon: FaInstagram, href: 'https://instagram.com/techmitra', color: 'hover:bg-pink-600' },
    { icon: FaLinkedinIn, href: 'https://linkedin.com/company/techmitra', color: 'hover:bg-blue-600' },
    { icon: FaFacebookF, href: 'https://facebook.com/techmitra', color: 'hover:bg-blue-700' },
    { icon: FaYoutube, href: 'https://youtube.com/@techmitra', color: 'hover:bg-red-600' },
  ];

  const faqs = [
    { q: 'How can I enroll in a program?', a: 'You can enroll by filling the enrollment form on our website. Our team will contact you within 24 hours.' },
    { q: 'What is the class schedule?', a: 'We offer morning, day, evening, and weekend batches to accommodate different schedules.' },
    { q: 'How do I make payment?', a: 'We accept UPI, bank transfer, and card payments. Installment options are also available.' },
    { q: 'Can I get a demo class?', a: 'Yes! We offer a free seminar session. Contact us to schedule your demo.' },
  ];

  if (submitted) {
    return (
      <div className="pt-20 min-h-screen flex items-center justify-center bg-gradient-to-br from-primary-50 to-accent-50">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          className="max-w-lg mx-auto px-4 text-center"
        >
          <div className="w-24 h-24 rounded-full bg-gradient-to-br from-green-400 to-green-600 flex items-center justify-center mx-auto mb-6">
            <FiSend className="w-12 h-12 text-white" />
          </div>
          <h2 className="text-3xl font-display font-bold text-dark-900 mb-4">Message Sent!</h2>
          <p className="text-dark-500 mb-6">
            Thank you for reaching out! We'll get back to you within 24 hours.
          </p>
          <button onClick={() => setSubmitted(false)} className="btn-primary">
            Send Another Message
          </button>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="pt-20">
      {/* Hero */}
      <section className="relative py-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary-900 via-dark-900 to-primary-800" />
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-20 left-20 w-96 h-96 bg-primary-400 rounded-full blur-3xl" />
        </div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-display font-bold text-white mb-4" data-aos="fade-up">
            Get in <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-300 to-accent-300">Touch</span>
          </h1>
          <p className="text-xl text-blue-200/80 max-w-2xl mx-auto" data-aos="fade-up" data-aos-delay="100">
            Have questions? We'd love to hear from you. Send us a message and we'll respond as soon as possible.
          </p>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-3 gap-12">
            {/* Left - Contact Info */}
            <div className="lg:col-span-1">
              <div className="space-y-6">
                {contactInfo.map((info, index) => (
                  <motion.div
                    key={info.label}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.05 }}
                    className="card p-5"
                  >
                    <div className="flex items-start">
                      <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary-500 to-primary-700 flex items-center justify-center flex-shrink-0">
                        <info.icon className="w-5 h-5 text-white" />
                      </div>
                      <div className="ml-4">
                        <h3 className="text-sm font-semibold text-dark-400">{info.label}</h3>
                        {info.href ? (
                          <a href={info.href} target={info.href.startsWith('http') ? '_blank' : ''} rel="noopener noreferrer" className="text-dark-900 font-medium hover:text-primary-600 transition-colors">
                            {info.value}
                          </a>
                        ) : (
                          <p className="text-dark-900 font-medium">{info.value}</p>
                        )}
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>

              {/* Social Links */}
              <div className="mt-8">
                <h3 className="text-lg font-display font-semibold text-dark-900 mb-4">Follow Us</h3>
                <div className="flex space-x-3">
                  {socialLinks.map((social, index) => (
                    <a
                      key={index}
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`w-12 h-12 rounded-xl bg-gray-100 flex items-center justify-center text-dark-600 ${social.color} hover:text-white transition-all duration-300 hover:-translate-y-1`}
                    >
                      <social.icon className="w-5 h-5" />
                    </a>
                  ))}
                </div>
              </div>
            </div>

            {/* Right - Contact Form */}
            <div className="lg:col-span-2">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="card p-8"
              >
                <h2 className="text-2xl font-display font-bold text-dark-900 mb-2">Send Us a Message</h2>
                <p className="text-dark-500 text-sm mb-8">Fill the form below and we'll get back to you</p>

                <form onSubmit={formik.handleSubmit} className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-dark-700 mb-2">Name *</label>
                      <input
                        type="text"
                        name="name"
                        placeholder="Your name"
                        className={`w-full px-4 py-3 rounded-xl border ${formik.touched.name && formik.errors.name ? 'border-red-400' : 'border-gray-200'} bg-gray-50 focus:bg-white focus:outline-none focus:border-primary-500 transition-colors`}
                        {...formik.getFieldProps('name')}
                      />
                      {formik.touched.name && formik.errors.name && (
                        <p className="text-red-500 text-xs mt-1">{formik.errors.name}</p>
                      )}
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-dark-700 mb-2">Email *</label>
                      <input
                        type="email"
                        name="email"
                        placeholder="your@email.com"
                        className={`w-full px-4 py-3 rounded-xl border ${formik.touched.email && formik.errors.email ? 'border-red-400' : 'border-gray-200'} bg-gray-50 focus:bg-white focus:outline-none focus:border-primary-500 transition-colors`}
                        {...formik.getFieldProps('email')}
                      />
                      {formik.touched.email && formik.errors.email && (
                        <p className="text-red-500 text-xs mt-1">{formik.errors.email}</p>
                      )}
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-dark-700 mb-2">Phone</label>
                      <input
                        type="tel"
                        name="phone"
                        placeholder="10 digit number"
                        className={`w-full px-4 py-3 rounded-xl border ${formik.touched.phone && formik.errors.phone ? 'border-red-400' : 'border-gray-200'} bg-gray-50 focus:bg-white focus:outline-none focus:border-primary-500 transition-colors`}
                        {...formik.getFieldProps('phone')}
                      />
                      {formik.touched.phone && formik.errors.phone && (
                        <p className="text-red-500 text-xs mt-1">{formik.errors.phone}</p>
                      )}
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-dark-700 mb-2">Subject *</label>
                      <input
                        type="text"
                        name="subject"
                        placeholder="Subject"
                        className={`w-full px-4 py-3 rounded-xl border ${formik.touched.subject && formik.errors.subject ? 'border-red-400' : 'border-gray-200'} bg-gray-50 focus:bg-white focus:outline-none focus:border-primary-500 transition-colors`}
                        {...formik.getFieldProps('subject')}
                      />
                      {formik.touched.subject && formik.errors.subject && (
                        <p className="text-red-500 text-xs mt-1">{formik.errors.subject}</p>
                      )}
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-dark-700 mb-2">Message *</label>
                    <textarea
                      name="message"
                      rows={5}
                      placeholder="Write your message..."
                      className={`w-full px-4 py-3 rounded-xl border ${formik.touched.message && formik.errors.message ? 'border-red-400' : 'border-gray-200'} bg-gray-50 focus:bg-white focus:outline-none focus:border-primary-500 transition-colors resize-none`}
                      {...formik.getFieldProps('message')}
                    />
                    {formik.touched.message && formik.errors.message && (
                      <p className="text-red-500 text-xs mt-1">{formik.errors.message}</p>
                    )}
                  </div>
                  <button type="submit" className="btn-primary inline-flex items-center">
                    <FiSend className="mr-2 w-4 h-4" /> Send Message
                  </button>
                </form>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* Map Section */}
      <section className="py-12 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-2xl overflow-hidden shadow-sm border border-gray-100">
            <div className="h-80 bg-gradient-to-br from-primary-100 to-accent-100 flex items-center justify-center">
              <div className="text-center">
                <FiMapPin className="w-12 h-12 text-primary-600 mx-auto mb-3" />
                <h3 className="text-xl font-display font-semibold text-dark-900 mb-2">TechMitra Headquarters</h3>
                <p className="text-dark-500">India (Online - Serving Students Nationwide)</p>
                <p className="text-dark-400 text-sm mt-2">100% Online Training Platform</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12" data-aos="fade-up">
            <h2 className="section-title">Quick Answers</h2>
            <p className="section-subtitle mx-auto">Frequently asked questions about contacting us</p>
          </div>
          <div className="space-y-3">
            {faqs.map((faq, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.05 }}
                className="bg-gray-50 rounded-2xl p-5 hover:bg-primary-50 transition-colors"
              >
                <h3 className="font-medium text-dark-900 mb-2">{faq.q}</h3>
                <p className="text-dark-500 text-sm">{faq.a}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary-600 to-accent-600" />
        <div className="relative max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <FiMessageCircle className="w-12 h-12 text-white mx-auto mb-4" />
            <h2 className="text-3xl md:text-4xl font-display font-bold text-white mb-4">
              Prefer to Talk Directly?
            </h2>
            <p className="text-lg text-blue-100 mb-8">
              Chat with us on WhatsApp for instant responses
            </p>
            <a
              href="https://wa.me/919764149564"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center px-8 py-4 bg-white text-green-700 font-bold text-lg rounded-2xl hover:shadow-2xl hover:-translate-y-1 transition-all duration-300"
            >
              <FaWhatsapp className="mr-2 w-6 h-6" /> Chat on WhatsApp
            </a>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Contact;
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { FiCheck, FiArrowRight, FiSend, FiPhone, FiMail, FiShield, FiBook, FiAward, FiClock, FiCode, FiDollarSign, FiCalendar, FiUserCheck } from 'react-icons/fi';
import { FaWhatsapp } from 'react-icons/fa';
import { useFormik } from 'formik';
import * as Yup from 'yup';

const API_URL = import.meta.env.VITE_API_URL || '/api';

const Enrollment = () => {
  const [submitted, setSubmitted] = useState(false);
  const [enrollmentData, setEnrollmentData] = useState(null);
  const [submitError, setSubmitError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const formik = useFormik({
    initialValues: {
      fullName: '',
      email: '',
      phone: '',
      college: '',
      course: '',
      year: '',
      city: '',
      technology: '',
      projectIdea: '',
      previousKnowledge: '',
      preferredBatch: '',
      message: '',
    },
    validationSchema: Yup.object({
      fullName: Yup.string().required('Full name is required').min(3, 'Name must be at least 3 characters'),
      email: Yup.string().email('Invalid email address').required('Email is required'),
      phone: Yup.string().required('Phone number is required').matches(/^[0-9]{10}$/, 'Phone number must be 10 digits'),
      college: Yup.string().required('College name is required'),
      course: Yup.string().required('Course is required'),
      year: Yup.string().required('Year is required'),
      city: Yup.string().required('City is required'),
      technology: Yup.string().required('Please select a technology'),
    }),
    onSubmit: async (values, { resetForm }) => {
      setIsSubmitting(true);
      setSubmitError('');
      try {
        const response = await fetch(`${API_URL}/api/enroll`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(values),
        });
        const data = await response.json();
        if (data.success) {
          setEnrollmentData(data.enrollment);
          setSubmitted(true);
          resetForm();
        } else {
          setSubmitError(data.message || 'Something went wrong. Please try again.');
        }
      } catch (error) {
        setSubmitError('Server error. Please make sure the backend server is running.');
      } finally {
        setIsSubmitting(false);
      }
    },
  });

  const benefits = [
    'Build your own final year project from scratch',
    'Learn complete development lifecycle in 2 months',
    'Get 1-on-1 mentorship from industry experts',
    'Receive verified completion certificate',
    'Build GitHub portfolio with live projects',
    'Get placement and interview preparation',
  ];

  const steps = [
    { number: '01', title: 'Fill Enrollment Form', desc: 'Complete the registration form with your details' },
    { number: '02', title: 'Pay ₹4,999', desc: 'One-time payment for the complete 2-month program' },
    { number: '03', title: 'Get Onboarded', desc: 'Receive welcome kit and access to learning dashboard' },
    { number: '04', title: 'Start Learning', desc: 'Begin your 2-month journey with live sessions and project development' },
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
            <FiCheck className="w-12 h-12 text-white" />
          </div>
          <h2 className="text-3xl font-display font-bold text-dark-900 mb-2">Enrollment Successful!</h2>
          <div className="bg-white rounded-xl p-4 mb-4 inline-block">
            <span className="text-sm text-dark-500">Your Enrollment ID:</span>
            <p className="text-xl font-bold text-primary-600">{enrollmentData?.id}</p>
          </div>
          <p className="text-dark-500 mb-6">
            Thank you for enrolling in the <strong>2-Month Training Program (₹4,999)</strong> at TechMitra! 
            A confirmation email has been sent to <strong>{enrollmentData?.email}</strong>. 
            Our team will contact you within 24 hours to confirm your batch schedule.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center space-y-3 sm:space-y-0 sm:space-x-3">
            <Link to="/" className="btn-primary">Back to Home</Link>
            <a href="https://wa.me/919764149564" target="_blank" rel="noopener noreferrer" className="btn-outline inline-flex items-center">
              <FaWhatsapp className="mr-2 w-4 h-4" /> Chat on WhatsApp
            </a>
          </div>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="pt-20">
      {/* Hero */}
      <section className="relative py-16 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary-900 via-dark-900 to-primary-800" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-display font-bold text-white mb-4" data-aos="fade-up">
            Enroll at <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-300 to-accent-300">TechMitra</span>
          </h1>
          <p className="text-xl text-blue-200/80 max-w-2xl mx-auto" data-aos="fade-up" data-aos-delay="100">
            Start your journey to becoming industry-ready. Fill the form below and we'll guide you through the enrollment process.
          </p>
        </div>
      </section>

      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-3 gap-12">
            {/* Left Sidebar */}
            <div className="lg:col-span-1">
              {/* Training Plan Card */}
              <div className="card p-6 mb-6 border-2 border-primary-200 relative overflow-hidden" data-aos="fade-right">
                <div className="absolute top-0 right-0 bg-gradient-to-r from-primary-500 to-primary-700 text-white text-xs font-bold px-4 py-1 rounded-bl-xl">
                  BEST VALUE
                </div>
                <h3 className="text-lg font-display font-semibold text-dark-900 mb-2 flex items-center">
                  <FiDollarSign className="w-5 h-5 text-primary-500 mr-2" />
                  Training Plan
                </h3>
                <div className="text-3xl font-display font-bold text-primary-600 mb-1">₹4,999</div>
                <p className="text-dark-400 text-sm mb-4">Complete 2-month intensive training program</p>
                <ul className="space-y-2 mb-4">
                  {[
                    '2 Months Live Online Sessions',
                    'Complete Project Development',
                    '1-on-1 Mentorship',
                    'Code Reviews & Feedback',
                    'Course Materials & Resources',
                    'GitHub Portfolio Building',
                    'Placement Preparation',
                    'Verified Certificate',
                  ].map(item => (
                    <li key={item} className="flex items-start text-sm text-dark-600">
                      <FiCheck className="w-4 h-4 text-green-500 mt-0.5 mr-2 flex-shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>
                <div className="flex items-center text-xs text-dark-400 bg-gray-50 rounded-lg p-3">
                  <FiClock className="w-4 h-4 mr-2 text-primary-500" />
                  <span>Limited seats available. Enroll now!</span>
                </div>
              </div>

              {/* Benefits */}
              <div className="card p-6 mb-6" data-aos="fade-right" data-aos-delay="100">
                <h3 className="text-lg font-display font-semibold text-dark-900 mb-4 flex items-center">
                  <FiAward className="w-5 h-5 text-primary-500 mr-2" />
                  Why Join TechMitra?
                </h3>
                <ul className="space-y-3">
                  {benefits.map((benefit) => (
                    <li key={benefit} className="flex items-start text-sm text-dark-600">
                      <FiCheck className="w-4 h-4 text-green-500 mt-0.5 mr-2 flex-shrink-0" />
                      {benefit}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Steps */}
              <div className="card p-6 mb-6" data-aos="fade-right" data-aos-delay="200">
                <h3 className="text-lg font-display font-semibold text-dark-900 mb-4 flex items-center">
                  <FiBook className="w-5 h-5 text-primary-500 mr-2" />
                  Enrollment Steps
                </h3>
                <div className="space-y-4">
                  {steps.map((step) => (
                    <div key={step.number} className="flex items-start">
                      <span className="flex-shrink-0 w-8 h-8 rounded-lg bg-gradient-to-br from-primary-500 to-primary-700 flex items-center justify-center text-white text-xs font-bold">
                        {step.number}
                      </span>
                      <div className="ml-3">
                        <h4 className="text-sm font-semibold text-dark-900">{step.title}</h4>
                        <p className="text-xs text-dark-400">{step.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Contact */}
              <div className="card p-6" data-aos="fade-right" data-aos-delay="300">
                <h3 className="text-lg font-display font-semibold text-dark-900 mb-4">Need Help?</h3>
                <div className="space-y-3">
                  <a href="tel:+919764149564" className="flex items-center text-sm text-dark-600 hover:text-primary-600 transition-colors">
                    <FiPhone className="w-4 h-4 mr-2 text-primary-500" />
                    +91 97641 49564
                  </a>
                  <a href="mailto:techmitrofficial@gmail.com" className="flex items-center text-sm text-dark-600 hover:text-primary-600 transition-colors">
                    <FiMail className="w-4 h-4 mr-2 text-primary-500" />
                    techmitrofficial@gmail.com
                  </a>
                  <a href="https://wa.me/919764149564" target="_blank" rel="noopener noreferrer" className="flex items-center text-sm text-dark-600 hover:text-green-600 transition-colors">
                    <FaWhatsapp className="w-4 h-4 mr-2 text-green-500" />
                    WhatsApp Us
                  </a>
                </div>
              </div>
            </div>

            {/* Registration Form */}
            <div className="lg:col-span-2">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="card p-8"
              >
                <h2 className="text-2xl font-display font-bold text-dark-900 mb-2">Registration Form</h2>
                <p className="text-dark-500 text-sm mb-8">Complete all required fields to enroll in our 2-month training program (₹4,999)</p>

                {submitError && (
                  <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-xl text-red-700 text-sm">
                    {submitError}
                  </div>
                )}

                <form onSubmit={formik.handleSubmit} className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-6">
                    {/* Full Name */}
                    <div>
                      <label className="block text-sm font-medium text-dark-700 mb-2">Full Name *</label>
                      <input
                        type="text"
                        name="fullName"
                        placeholder="Enter your full name"
                        className={`w-full px-4 py-3 rounded-xl border ${formik.touched.fullName && formik.errors.fullName ? 'border-red-400 focus:border-red-500' : 'border-gray-200 focus:border-primary-500'} bg-gray-50 focus:bg-white focus:outline-none transition-colors`}
                        {...formik.getFieldProps('fullName')}
                      />
                      {formik.touched.fullName && formik.errors.fullName && (
                        <p className="text-red-500 text-xs mt-1">{formik.errors.fullName}</p>
                      )}
                    </div>

                    {/* Email */}
                    <div>
                      <label className="block text-sm font-medium text-dark-700 mb-2">Email Address *</label>
                      <input
                        type="email"
                        name="email"
                        placeholder="your@email.com"
                        className={`w-full px-4 py-3 rounded-xl border ${formik.touched.email && formik.errors.email ? 'border-red-400 focus:border-red-500' : 'border-gray-200 focus:border-primary-500'} bg-gray-50 focus:bg-white focus:outline-none transition-colors`}
                        {...formik.getFieldProps('email')}
                      />
                      {formik.touched.email && formik.errors.email && (
                        <p className="text-red-500 text-xs mt-1">{formik.errors.email}</p>
                      )}
                    </div>

                    {/* Phone */}
                    <div>
                      <label className="block text-sm font-medium text-dark-700 mb-2">Phone Number *</label>
                      <input
                        type="tel"
                        name="phone"
                        placeholder="10 digit mobile number"
                        className={`w-full px-4 py-3 rounded-xl border ${formik.touched.phone && formik.errors.phone ? 'border-red-400 focus:border-red-500' : 'border-gray-200 focus:border-primary-500'} bg-gray-50 focus:bg-white focus:outline-none transition-colors`}
                        {...formik.getFieldProps('phone')}
                      />
                      {formik.touched.phone && formik.errors.phone && (
                        <p className="text-red-500 text-xs mt-1">{formik.errors.phone}</p>
                      )}
                    </div>

                    {/* College */}
                    <div>
                      <label className="block text-sm font-medium text-dark-700 mb-2">College/University *</label>
                      <input
                        type="text"
                        name="college"
                        placeholder="Your college name"
                        className={`w-full px-4 py-3 rounded-xl border ${formik.touched.college && formik.errors.college ? 'border-red-400 focus:border-red-500' : 'border-gray-200 focus:border-primary-500'} bg-gray-50 focus:bg-white focus:outline-none transition-colors`}
                        {...formik.getFieldProps('college')}
                      />
                      {formik.touched.college && formik.errors.college && (
                        <p className="text-red-500 text-xs mt-1">{formik.errors.college}</p>
                      )}
                    </div>

                    {/* Course */}
                    <div>
                      <label className="block text-sm font-medium text-dark-700 mb-2">Course/Degree *</label>
                      <select
                        name="course"
                        className={`w-full px-4 py-3 rounded-xl border ${formik.touched.course && formik.errors.course ? 'border-red-400 focus:border-red-500' : 'border-gray-200 focus:border-primary-500'} bg-gray-50 focus:bg-white focus:outline-none transition-colors`}
                        {...formik.getFieldProps('course')}
                      >
                        <option value="">Select your course</option>
                        <option value="BCA">BCA</option>
                        <option value="BCS">BCS</option>
                        <option value="BSc CS">BSc Computer Science</option>
                        <option value="BSc IT">BSc Information Technology</option>
                        <option value="MCA">MCA</option>
                        <option value="MSc CS">MSc Computer Science</option>
                        <option value="B.Tech">B.Tech</option>
                        <option value="Other">Other</option>
                      </select>
                      {formik.touched.course && formik.errors.course && (
                        <p className="text-red-500 text-xs mt-1">{formik.errors.course}</p>
                      )}
                    </div>

                    {/* Year */}
                    <div>
                      <label className="block text-sm font-medium text-dark-700 mb-2">Year of Study *</label>
                      <select
                        name="year"
                        className={`w-full px-4 py-3 rounded-xl border ${formik.touched.year && formik.errors.year ? 'border-red-400 focus:border-red-500' : 'border-gray-200 focus:border-primary-500'} bg-gray-50 focus:bg-white focus:outline-none transition-colors`}
                        {...formik.getFieldProps('year')}
                      >
                        <option value="">Select year</option>
                        <option value="1st Year">1st Year</option>
                        <option value="2nd Year">2nd Year</option>
                        <option value="3rd Year">3rd Year</option>
                        <option value="Final Year">Final Year</option>
                        <option value="Graduated">Graduated</option>
                      </select>
                      {formik.touched.year && formik.errors.year && (
                        <p className="text-red-500 text-xs mt-1">{formik.errors.year}</p>
                      )}
                    </div>

                    {/* City */}
                    <div>
                      <label className="block text-sm font-medium text-dark-700 mb-2">City *</label>
                      <input
                        type="text"
                        name="city"
                        placeholder="Your city"
                        className={`w-full px-4 py-3 rounded-xl border ${formik.touched.city && formik.errors.city ? 'border-red-400 focus:border-red-500' : 'border-gray-200 focus:border-primary-500'} bg-gray-50 focus:bg-white focus:outline-none transition-colors`}
                        {...formik.getFieldProps('city')}
                      />
                      {formik.touched.city && formik.errors.city && (
                        <p className="text-red-500 text-xs mt-1">{formik.errors.city}</p>
                      )}
                    </div>

                    {/* Technology */}
                    <div>
                      <label className="block text-sm font-medium text-dark-700 mb-2">Technology *</label>
                      <select
                        name="technology"
                        className={`w-full px-4 py-3 rounded-xl border ${formik.touched.technology && formik.errors.technology ? 'border-red-400 focus:border-red-500' : 'border-gray-200 focus:border-primary-500'} bg-gray-50 focus:bg-white focus:outline-none transition-colors`}
                        {...formik.getFieldProps('technology')}
                      >
                        <option value="">Select technology</option>
                        <option value="MERN Stack">MERN Stack</option>
                        <option value="Java Full Stack">Java Full Stack</option>
                        <option value="Python Full Stack">Python Full Stack</option>
                        <option value="React Native">React Native</option>
                      </select>
                      {formik.touched.technology && formik.errors.technology && (
                        <p className="text-red-500 text-xs mt-1">{formik.errors.technology}</p>
                      )}
                    </div>

                    {/* Batch */}
                    <div>
                      <label className="block text-sm font-medium text-dark-700 mb-2">Preferred Batch</label>
                      <select
                        name="preferredBatch"
                        className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-gray-50 focus:bg-white focus:outline-none focus:border-primary-500 transition-colors"
                        {...formik.getFieldProps('preferredBatch')}
                      >
                        <option value="">Select batch</option>
                        <option value="Morning Batch (8-10 AM)">Morning Batch (8-10 AM)</option>
                        <option value="Day Batch (11-1 PM)">Day Batch (11-1 PM)</option>
                        <option value="Evening Batch (4-6 PM)">Evening Batch (4-6 PM)</option>
                        <option value="Weekend Batch">Weekend Batch</option>
                      </select>
                    </div>

                    {/* Project Idea */}
                    <div>
                      <label className="block text-sm font-medium text-dark-700 mb-2">Project Idea (Optional)</label>
                      <input
                        type="text"
                        name="projectIdea"
                        placeholder="Do you have any project idea?"
                        className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-gray-50 focus:bg-white focus:outline-none focus:border-primary-500 transition-colors"
                        {...formik.getFieldProps('projectIdea')}
                      />
                    </div>

                    {/* Previous Knowledge */}
                    <div>
                      <label className="block text-sm font-medium text-dark-700 mb-2">Previous Knowledge (Optional)</label>
                      <select
                        name="previousKnowledge"
                        className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-gray-50 focus:bg-white focus:outline-none focus:border-primary-500 transition-colors"
                        {...formik.getFieldProps('previousKnowledge')}
                      >
                        <option value="">Select level</option>
                        <option value="Beginner">Beginner (No coding experience)</option>
                        <option value="Basic">Basic (Some coding knowledge)</option>
                        <option value="Intermediate">Intermediate (Comfortable with basics)</option>
                        <option value="Advanced">Advanced (Good coding skills)</option>
                      </select>
                    </div>
                  </div>

                  {/* Message */}
                  <div>
                    <label className="block text-sm font-medium text-dark-700 mb-2">Message (Optional)</label>
                    <textarea
                      name="message"
                      rows={3}
                      placeholder="Any specific requirements or questions..."
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-gray-50 focus:bg-white focus:outline-none focus:border-primary-500 transition-colors resize-none"
                      {...formik.getFieldProps('message')}
                    />
                  </div>

                  {/* Plan Summary */}
                  <div className="bg-gradient-to-r from-primary-50 to-blue-50 rounded-xl p-4 border border-primary-100">
                    <div className="flex items-center justify-between flex-wrap gap-2">
                      <div className="flex items-center">
                        <FiUserCheck className="w-5 h-5 text-primary-600 mr-2" />
                        <span className="text-sm font-medium text-dark-700">Training Plan</span>
                      </div>
                      <div className="flex items-center">
                        <FiCalendar className="w-5 h-5 text-primary-600 mr-2" />
                        <span className="text-sm font-medium text-dark-700">2 Months Duration</span>
                      </div>
                      <div className="flex items-center">
                        <FiDollarSign className="w-5 h-5 text-primary-600 mr-2" />
                        <span className="text-sm font-bold text-primary-700">₹4,999 (One-time)</span>
                      </div>
                    </div>
                  </div>

                  {/* Submit */}
                  <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                    <div className="flex items-center text-sm text-dark-400">
                      <FiShield className="w-4 h-4 mr-1" />
                      Your information is secure
                    </div>
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="btn-primary inline-flex items-center disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {isSubmitting ? (
                        <>Processing...</>
                      ) : (
                        <>Enroll Now - ₹4,999 <FiSend className="ml-2 w-4 h-4" /></>
                      )}
                    </button>
                  </div>
                </form>
              </motion.div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Enrollment;
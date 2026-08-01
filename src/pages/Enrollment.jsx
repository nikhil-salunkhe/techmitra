import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { FiCheck, FiArrowRight, FiSend, FiPhone, FiMail, FiShield, FiBook, FiAward, FiClock, FiCode, FiDollarSign, FiCalendar, FiUserCheck, FiCpu } from 'react-icons/fi';
import { FaWhatsapp } from 'react-icons/fa';
import { useFormik } from 'formik';
import * as Yup from 'yup';

const API_URL = import.meta.env.VITE_API_URL || '';

const PLAN_TYPES = {
  ai: {
    id: 'ai',
    label: 'AI Through Development',
    shortLabel: 'AI Program',
    fee: 1499,
    feeLabel: '₹1,499',
    duration: '1 Month',
    description: '1-Month Live Project Training Program',
    badge: '🔥 NEW',
    techLabel: 'AI Technology Track',
    benefits: [
      'Build, Test & Deploy Live Projects with AI',
      'Learn AI-Assisted Coding with GitHub Copilot',
      'Smart Development with Cline AI',
      'VS Code Setup & Productivity Booster',
      'Code Generation, Debugging & Refactoring with AI',
      'Git & GitHub for Version Control & Collaboration',
      'Certificate of Completion',
    ],
    technologies: ['AI Through Development'],
    steps: [
      { number: '01', title: 'Fill Enrollment Form', desc: 'Complete the registration form with your details' },
      { number: '02', title: 'Pay ₹1,499', desc: 'One-time payment for the complete 1-month program' },
      { number: '03', title: 'Get Onboarded', desc: 'Receive welcome kit and join the AI training community' },
      { number: '04', title: 'Start Learning', desc: 'Begin your 1-month AI journey with live sessions' },
    ],
  },
  project: {
    id: 'project',
    label: 'Project Development',
    shortLabel: '2-Month Program',
    fee: 3999,
    feeLabel: '₹3,999',
    duration: '2 Months',
    description: 'Complete 2-month intensive training program',
    badge: 'BEST VALUE',
    techLabel: 'Technology Stack',
    benefits: [
      '2 Months Live Online Sessions',
      'Complete Project Development',
      '1-on-1 Mentorship',
      'Code Reviews & Feedback',
      'Course Materials & Resources',
      'GitHub Portfolio Building',
      'Placement Preparation',
      'Verified Certificate',
    ],
    technologies: ['MERN Web Project Development', 'Java Application Project Development', 'Python Application Project Development', 'React Native Mobile App Project Development'],
    steps: [
      { number: '01', title: 'Fill Enrollment Form', desc: 'Complete the registration form with your details' },
      { number: '02', title: 'Pay ₹3,999', desc: 'One-time payment for the complete 2-month program' },
      { number: '03', title: 'Get Onboarded', desc: 'Receive welcome kit and access to learning dashboard' },
      { number: '04', title: 'Start Learning', desc: 'Begin your 2-month journey with live sessions and project development' },
    ],
  },
};

const Enrollment = () => {
  const [submitted, setSubmitted] = useState(false);
  const [enrollmentData, setEnrollmentData] = useState(null);
  const [submitError, setSubmitError] = useState('');
  const [emailWarning, setEmailWarning] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState('project');

  const plan = PLAN_TYPES[selectedPlan];

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
      message: '',
      planId: 'project',
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
        const payload = {
          ...values,
          planId: selectedPlan,
          plan: plan.label,
          duration: plan.duration,
        };
        const response = await fetch(`${API_URL}/api/enroll`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload),
        });
        const data = await response.json();
        if (data.success) {
          setEnrollmentData(data.enrollment);
          setSubmitted(true);
          setEmailWarning(data.emailWarning || null);
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

  const handlePlanChange = (planId) => {
    setSelectedPlan(planId);
    formik.setFieldValue('planId', planId);
    formik.setFieldValue('technology', '');
    const selectedTechnologies = PLAN_TYPES[planId].technologies;
    if (selectedTechnologies.length === 1) {
      formik.setFieldValue('technology', selectedTechnologies[0]);
    }
  };

  const benefits = [
    'Build your own final year project from scratch',
    'Learn complete development lifecycle',
    'Get 1-on-1 mentorship from industry experts',
    'Receive verified completion certificate',
    'Build GitHub portfolio with live projects',
    'Get placement and interview preparation',
  ];

  if (submitted) {
    const submittedPlan = enrollmentData?.plan || 'Training Plan';
    const submittedFee = enrollmentData?.amount ? `₹${enrollmentData.amount.toLocaleString('en-IN')}` : 'Training Fee';
    const submittedDuration = enrollmentData?.duration || 'Training Program';
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
            Thank you for enrolling in the <strong>{submittedPlan} ({submittedFee} / {submittedDuration})</strong> at TechMitra! 
            {!emailWarning && <span>A confirmation email has been sent to <strong>{enrollmentData?.email}</strong>. </span>}
            Our team will contact you within 24 hours to provide further details and schedule information.
          </p>
          
          {emailWarning && (
            <div className="mb-6 p-4 bg-yellow-50 border border-yellow-200 rounded-xl text-left">
              <h4 className="text-yellow-800 font-semibold mb-2 flex items-center">
                <span className="text-xl mr-2">⚠️</span>
                {emailWarning.message}
              </h4>
              <div className="bg-white rounded-lg p-3 mb-3 border border-yellow-100">
                <pre className="text-xs text-gray-700 whitespace-pre-wrap font-mono">{emailWarning.details}</pre>
              </div>
              <p className="text-sm text-yellow-700">{emailWarning.note}</p>
            </div>
          )}
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
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-20 right-20 w-96 h-96 bg-primary-400 rounded-full blur-3xl" />
        </div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-display font-bold text-white mb-4" data-aos="fade-up">
            Enroll at <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-300 to-accent-300">TechMitra</span>
          </h1>
          <p className="text-xl text-blue-200/80 max-w-2xl mx-auto" data-aos="fade-up" data-aos-delay="100">
            Start your journey to becoming industry-ready. Choose your training plan and fill the form below to enroll.
          </p>
        </div>
      </section>

      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Plan Selector */}
          <div className="max-w-3xl mx-auto mb-12" data-aos="fade-up">
            <h2 className="text-2xl font-display font-bold text-dark-900 text-center mb-6">Choose Your Training Plan</h2>
            <div className="grid sm:grid-cols-2 gap-4">
              {Object.values(PLAN_TYPES).map((p) => (
                <button
                  key={p.id}
                  onClick={() => handlePlanChange(p.id)}
                  className={`relative p-6 rounded-2xl border-2 text-left transition-all duration-300 ${
                    selectedPlan === p.id
                      ? 'border-primary-500 bg-primary-50 shadow-lg'
                      : 'border-gray-200 bg-white hover:border-primary-200 hover:shadow'
                  }`}
                >
                  {p.badge && (
                    <span className={`absolute top-0 right-0 text-white text-xs font-bold px-4 py-1 rounded-bl-xl ${
                      p.id === 'ai' ? 'bg-gradient-to-r from-purple-500 to-pink-600' : 'bg-gradient-to-r from-primary-500 to-primary-700'
                    }`}>
                      {p.badge}
                    </span>
                  )}
                  <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${p.id === 'ai' ? 'from-purple-500 to-pink-600' : 'from-primary-500 to-primary-700'} flex items-center justify-center mb-3`}>
                    {p.id === 'ai' ? <FiCpu className="w-6 h-6 text-white" /> : <FiCode className="w-6 h-6 text-white" />}
                  </div>
                  <h3 className="text-lg font-display font-bold text-dark-900">{p.label}</h3>
                  <p className="text-dark-400 text-sm mb-3">{p.description}</p>
                  <div className="flex items-center justify-between">
                    <span className="text-2xl font-display font-bold text-primary-600">{p.feeLabel}</span>
                    <span className="flex items-center text-dark-500 text-sm">
                      <FiClock className="w-4 h-4 mr-1" />
                      {p.duration}
                    </span>
                  </div>
                </button>
              ))}
            </div>
          </div>

          <div className="grid lg:grid-cols-3 gap-12">
            {/* Left Sidebar */}
            <div className="lg:col-span-1">
              {/* Training Plan Card */}
              <div className={`card p-6 mb-6 border-2 relative overflow-hidden ${selectedPlan === 'ai' ? 'border-purple-200' : 'border-primary-200'}`} data-aos="fade-right">
                <div className={`absolute top-0 right-0 text-white text-xs font-bold px-4 py-1 rounded-bl-xl ${selectedPlan === 'ai' ? 'bg-gradient-to-r from-purple-500 to-pink-600' : 'bg-gradient-to-r from-primary-500 to-primary-700'}`}>
                  {plan.badge}
                </div>
                <h3 className="text-lg font-display font-semibold text-dark-900 mb-2 flex items-center">
                  <FiDollarSign className={`w-5 h-5 mr-2 ${selectedPlan === 'ai' ? 'text-purple-500' : 'text-primary-500'}`} />
                  {plan.label}
                </h3>
                <div className="text-3xl font-display font-bold text-primary-600 mb-1">{plan.feeLabel}</div>
                <p className="text-dark-400 text-sm mb-4">{plan.description}</p>
                <ul className="space-y-2 mb-4">
                  {plan.benefits.map(item => (
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
                  {plan.steps.map((step) => (
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
                  <a href="https://techmitr.netlify.app" target="_blank" rel="noopener noreferrer" className="flex items-center text-sm text-dark-600 hover:text-primary-600 transition-colors">
                    <FiCode className="w-4 h-4 mr-2 text-primary-500" />
                    www.techmitr.netlify.app
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
                <p className="text-dark-500 text-sm mb-8">Complete all required fields to enroll in the <strong>{plan.label}</strong> ({plan.feeLabel} / {plan.duration})</p>

                {/* Selected Plan Summary */}
                <div className={`mb-8 p-4 rounded-xl border ${selectedPlan === 'ai' ? 'bg-purple-50 border-purple-100' : 'bg-primary-50 border-primary-100'}`}>
                  <div className="flex items-center justify-between flex-wrap gap-2">
                    <div className="flex items-center">
                      {selectedPlan === 'ai' ? <FiCpu className="w-5 h-5 text-purple-600 mr-2" /> : <FiUserCheck className="w-5 h-5 text-primary-600 mr-2" />}
                      <span className="text-sm font-medium text-dark-700">Selected Plan: <strong>{plan.label}</strong></span>
                    </div>
                    <div className="flex items-center">
                      <FiCalendar className="w-5 h-5 text-primary-600 mr-2" />
                      <span className="text-sm font-medium text-dark-700">{plan.duration} Duration</span>
                    </div>
                    <div className="flex items-center">
                      <FiDollarSign className="w-5 h-5 text-primary-600 mr-2" />
                      <span className="text-sm font-bold text-primary-700">{plan.feeLabel} (One-time)</span>
                    </div>
                  </div>
                </div>

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
                      <label className="block text-sm font-medium text-dark-700 mb-2">{plan.techLabel} *</label>
                      <select
                        name="technology"
                        className={`w-full px-4 py-3 rounded-xl border ${formik.touched.technology && formik.errors.technology ? 'border-red-400 focus:border-red-500' : 'border-gray-200 focus:border-primary-500'} bg-gray-50 focus:bg-white focus:outline-none transition-colors`}
                        {...formik.getFieldProps('technology')}
                      >
                        <option value="">Select technology</option>
                        {plan.technologies.map(tech => (
                          <option key={tech} value={tech}>{tech}</option>
                        ))}
                      </select>
                      {formik.touched.technology && formik.errors.technology && (
                        <p className="text-red-500 text-xs mt-1">{formik.errors.technology}</p>
                      )}
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
                  <div className={`rounded-xl p-4 border ${selectedPlan === 'ai' ? 'bg-purple-50 border-purple-100' : 'bg-gradient-to-r from-primary-50 to-blue-50 border-primary-100'}`}>
                    <div className="flex items-center justify-between flex-wrap gap-2">
                      <div className="flex items-center">
                        {selectedPlan === 'ai' ? <FiCpu className="w-5 h-5 text-purple-600 mr-2" /> : <FiUserCheck className="w-5 h-5 text-primary-600 mr-2" />}
                        <span className="text-sm font-medium text-dark-700">{plan.label}</span>
                      </div>
                      <div className="flex items-center">
                        <FiCalendar className="w-5 h-5 text-primary-600 mr-2" />
                        <span className="text-sm font-medium text-dark-700">{plan.duration} Duration</span>
                      </div>
                      <div className="flex items-center">
                        <FiDollarSign className="w-5 h-5 text-primary-600 mr-2" />
                        <span className="text-sm font-bold text-primary-700">{plan.feeLabel} (One-time)</span>
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
                        <>Enroll Now - {plan.feeLabel} <FiSend className="ml-2 w-4 h-4" /></>
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
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FiUsers, FiSearch, FiTrash2, FiRefreshCw, FiCheckCircle, FiXCircle, FiClock, FiMail, FiPhone, FiMapPin, FiBook, FiCalendar, FiDollarSign, FiChevronDown, FiChevronUp, FiDownload } from 'react-icons/fi';

const API_URL = import.meta.env.VITE_API_URL || '';

const Admin = () => {
  const [enrollments, setEnrollments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [expandedId, setExpandedId] = useState(null);
  const [filterStatus, setFilterStatus] = useState('all');
  const [stats, setStats] = useState({ total: 0, active: 0, completed: 0, totalRevenue: 0 });

  useEffect(() => {
    fetchEnrollments();
  }, []);

  const fetchEnrollments = async () => {
    try {
      const response = await fetch(`${API_URL}/api/enrollments`);
      const data = await response.json();
      if (data.success) {
        setEnrollments(data.enrollments);
        calculateStats(data.enrollments);
      }
    } catch (error) {
      console.error('Failed to fetch enrollments:', error);
    } finally {
      setLoading(false);
    }
  };

  const calculateStats = (data) => {
    const total = data.length;
    const active = data.filter(e => e.status === 'active').length;
    const completed = data.filter(e => e.status === 'completed').length;
    const totalRevenue = total * 4999;
    setStats({ total, active, completed, totalRevenue });
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this enrollment?')) return;
    try {
      const response = await fetch(`${API_URL}/api/enrollments/${id}`, { method: 'DELETE' });
      const data = await response.json();
      if (data.success) {
        fetchEnrollments();
      }
    } catch (error) {
      console.error('Delete failed:', error);
    }
  };

  const handleStatusChange = async (id, newStatus) => {
    try {
      const response = await fetch(`${API_URL}/api/enrollments/${id}/status`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: newStatus }),
      });
      const data = await response.json();
      if (data.success) {
        fetchEnrollments();
      }
    } catch (error) {
      console.error('Status update failed:', error);
    }
  };

  const filteredEnrollments = enrollments.filter(e => {
    const matchesSearch = 
      e.fullName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      e.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      e.id?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      e.phone?.includes(searchTerm) ||
      e.technology?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      e.college?.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = filterStatus === 'all' || e.status === filterStatus;
    
    return matchesSearch && matchesStatus;
  });

  const getStatusBadge = (status) => {
    switch (status) {
      case 'active':
        return <span className="px-2 py-1 bg-green-100 text-green-700 text-xs rounded-full font-medium flex items-center"><FiCheckCircle className="w-3 h-3 mr-1" />Active</span>;
      case 'completed':
        return <span className="px-2 py-1 bg-blue-100 text-blue-700 text-xs rounded-full font-medium flex items-center"><FiCheckCircle className="w-3 h-3 mr-1" />Completed</span>;
      case 'cancelled':
        return <span className="px-2 py-1 bg-red-100 text-red-700 text-xs rounded-full font-medium flex items-center"><FiXCircle className="w-3 h-3 mr-1" />Cancelled</span>;
      default:
        return <span className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded-full font-medium flex items-center"><FiClock className="w-3 h-3 mr-1" />{status}</span>;
    }
  };

  const exportToCSV = () => {
    const headers = ['ID', 'Name', 'Email', 'Phone', 'College', 'Course', 'Year', 'City', 'Technology', 'Plan', 'Amount', 'Duration', 'Batch', 'Status', 'Date'];
    const rows = enrollments.map(e => [
      e.id, e.fullName, e.email, e.phone, e.college, e.course, e.year, e.city, 
      e.technology, e.plan, e.amount, e.duration, e.preferredBatch, e.status, 
      new Date(e.createdAt).toLocaleDateString()
    ]);
    
    const csvContent = [headers.join(','), ...rows.map(row => row.join(','))].join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `enrollments-${new Date().toISOString().split('T')[0]}.csv`;
    a.click();
    window.URL.revokeObjectURL(url);
  };

  if (loading) {
    return (
      <div className="pt-20 min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600 mx-auto mb-4"></div>
          <p className="text-dark-500">Loading enrollments...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="pt-20 min-h-screen bg-gray-50">
      {/* Header */}
      <section className="bg-gradient-to-br from-primary-900 via-dark-900 to-primary-800 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-display font-bold text-white flex items-center">
                <FiUsers className="mr-3 w-8 h-8" />
                Admin Dashboard
              </h1>
              <p className="text-blue-200/80 mt-1">Manage student enrollments</p>
            </div>
            <button onClick={fetchEnrollments} className="p-2 bg-white/10 rounded-lg text-white hover:bg-white/20 transition-colors">
              <FiRefreshCw className="w-5 h-5" />
            </button>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-6 mb-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { label: 'Total Enrollments', value: stats.total, icon: FiUsers, color: 'from-blue-500 to-blue-600' },
            { label: 'Active Students', value: stats.active, icon: FiCheckCircle, color: 'from-green-500 to-green-600' },
            { label: 'Completed', value: stats.completed, icon: FiBook, color: 'from-purple-500 to-purple-600' },
            { label: 'Revenue (₹)', value: `₹${stats.totalRevenue.toLocaleString()}`, icon: FiDollarSign, color: 'from-amber-500 to-amber-600' },
          ].map((stat, idx) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1 }}
              className="bg-white rounded-xl p-4 shadow-sm border border-gray-100"
            >
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs text-dark-400 font-medium">{stat.label}</span>
                <div className={`w-8 h-8 rounded-lg bg-gradient-to-br ${stat.color} flex items-center justify-center`}>
                  <stat.icon className="w-4 h-4 text-white" />
                </div>
              </div>
              <p className="text-2xl font-bold text-dark-900">{stat.value}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Filters and Search */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-6">
        <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
          <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
            <div className="relative flex-1 w-full">
              <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-dark-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search by name, email, ID, phone, technology..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 rounded-lg border border-gray-200 focus:border-primary-500 focus:outline-none bg-gray-50 text-sm"
              />
            </div>
            <div className="flex gap-3 w-full md:w-auto">
              <select
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
                className="px-4 py-2.5 rounded-lg border border-gray-200 focus:border-primary-500 focus:outline-none bg-gray-50 text-sm"
              >
                <option value="all">All Status</option>
                <option value="active">Active</option>
                <option value="completed">Completed</option>
                <option value="cancelled">Cancelled</option>
              </select>
              <button onClick={exportToCSV} className="px-4 py-2.5 bg-primary-600 text-white rounded-lg text-sm font-medium hover:bg-primary-700 transition-colors flex items-center">
                <FiDownload className="w-4 h-4 mr-2" /> Export CSV
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Enrollments List */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-12">
        {filteredEnrollments.length === 0 ? (
          <div className="bg-white rounded-xl p-12 text-center shadow-sm border border-gray-100">
            <FiUsers className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-dark-900 mb-2">No Enrollments Found</h3>
            <p className="text-dark-500">No students have enrolled yet or no results match your search.</p>
          </div>
        ) : (
          <div className="space-y-3">
            {filteredEnrollments.map((enrollment, idx) => (
              <motion.div
                key={enrollment.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.03 }}
                className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-md transition-shadow"
              >
                {/* Card Header */}
                <div className="p-4 md:p-6">
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 rounded-full bg-gradient-to-br from-primary-500 to-primary-700 flex items-center justify-center text-white font-bold text-lg flex-shrink-0">
                        {enrollment.fullName?.charAt(0)?.toUpperCase()}
                      </div>
                      <div>
                        <div className="flex items-center flex-wrap gap-2">
                          <h3 className="text-lg font-semibold text-dark-900">{enrollment.fullName}</h3>
                          {getStatusBadge(enrollment.status)}
                        </div>
                        <p className="text-sm text-dark-500 mt-0.5">{enrollment.email} | {enrollment.phone}</p>
                        <div className="flex items-center flex-wrap gap-3 mt-2 text-xs text-dark-400">
                          <span className="flex items-center"><FiBook className="w-3 h-3 mr-1" />{enrollment.technology}</span>
                          <span className="flex items-center"><FiCalendar className="w-3 h-3 mr-1" />{new Date(enrollment.createdAt).toLocaleDateString()}</span>
                          <span className="flex items-center bg-primary-50 text-primary-700 px-2 py-0.5 rounded-full font-medium">
                            {enrollment.id}
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => setExpandedId(expandedId === enrollment.id ? null : enrollment.id)}
                        className="p-2 text-dark-400 hover:text-primary-600 hover:bg-primary-50 rounded-lg transition-colors"
                      >
                        {expandedId === enrollment.id ? <FiChevronUp className="w-5 h-5" /> : <FiChevronDown className="w-5 h-5" />}
                      </button>
                    </div>
                  </div>
                </div>

                {/* Expanded Details */}
                {expandedId === enrollment.id && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    className="border-t border-gray-100 bg-gray-50/50"
                  >
                    <div className="p-4 md:p-6">
                      <div className="grid md:grid-cols-3 gap-4">
                        <div className="space-y-2">
                          <h4 className="text-xs font-semibold text-dark-400 uppercase tracking-wider">Personal Info</h4>
                          <div className="space-y-1.5">
                            <p className="text-sm flex items-center text-dark-600"><FiMail className="w-3.5 h-3.5 mr-2 text-primary-500" />{enrollment.email}</p>
                            <p className="text-sm flex items-center text-dark-600"><FiPhone className="w-3.5 h-3.5 mr-2 text-primary-500" />{enrollment.phone}</p>
                            <p className="text-sm flex items-center text-dark-600"><FiMapPin className="w-3.5 h-3.5 mr-2 text-primary-500" />{enrollment.city}</p>
                          </div>
                        </div>
                        <div className="space-y-2">
                          <h4 className="text-xs font-semibold text-dark-400 uppercase tracking-wider">Education</h4>
                          <div className="space-y-1.5">
                            <p className="text-sm text-dark-600"><span className="font-medium">College:</span> {enrollment.college}</p>
                            <p className="text-sm text-dark-600"><span className="font-medium">Course:</span> {enrollment.course} - {enrollment.year}</p>
                            <p className="text-sm text-dark-600"><span className="font-medium">Knowledge:</span> {enrollment.previousKnowledge || 'Not specified'}</p>
                          </div>
                        </div>
                        <div className="space-y-2">
                          <h4 className="text-xs font-semibold text-dark-400 uppercase tracking-wider">Training Details</h4>
                          <div className="space-y-1.5">
                            <p className="text-sm text-dark-600"><span className="font-medium">Plan:</span> {enrollment.plan} - ₹{enrollment.amount}</p>
                            <p className="text-sm text-dark-600"><span className="font-medium">Duration:</span> {enrollment.duration}</p>
                            <p className="text-sm text-dark-600"><span className="font-medium">Batch:</span> {enrollment.preferredBatch || 'Not specified'}</p>
                          </div>
                        </div>
                      </div>
                      {enrollment.projectIdea && (
                        <div className="mt-3 pt-3 border-t border-gray-200">
                          <p className="text-sm"><span className="font-medium text-dark-700">Project Idea:</span> <span className="text-dark-500">{enrollment.projectIdea}</span></p>
                        </div>
                      )}
                      {enrollment.message && (
                        <div className="mt-2">
                          <p className="text-sm"><span className="font-medium text-dark-700">Message:</span> <span className="text-dark-500">{enrollment.message}</span></p>
                        </div>
                      )}
                      
                      {/* Actions */}
                      <div className="mt-4 pt-4 border-t border-gray-200 flex flex-wrap gap-2">
                        <button onClick={() => handleStatusChange(enrollment.id, 'active')} className="px-3 py-1.5 bg-green-50 text-green-700 rounded-lg text-xs font-medium hover:bg-green-100 transition-colors flex items-center">
                          <FiCheckCircle className="w-3 h-3 mr-1" /> Mark Active
                        </button>
                        <button onClick={() => handleStatusChange(enrollment.id, 'completed')} className="px-3 py-1.5 bg-blue-50 text-blue-700 rounded-lg text-xs font-medium hover:bg-blue-100 transition-colors flex items-center">
                          <FiCheckCircle className="w-3 h-3 mr-1" /> Mark Completed
                        </button>
                        <button onClick={() => handleStatusChange(enrollment.id, 'cancelled')} className="px-3 py-1.5 bg-red-50 text-red-700 rounded-lg text-xs font-medium hover:bg-red-100 transition-colors flex items-center">
                          <FiXCircle className="w-3 h-3 mr-1" /> Mark Cancelled
                        </button>
                        <button onClick={() => handleDelete(enrollment.id)} className="px-3 py-1.5 bg-gray-100 text-gray-600 rounded-lg text-xs font-medium hover:bg-red-100 hover:text-red-600 transition-colors flex items-center ml-auto">
                          <FiTrash2 className="w-3 h-3 mr-1" /> Delete
                        </button>
                      </div>
                    </div>
                  </motion.div>
                )}
              </motion.div>
            ))}
          </div>
        )}
      </section>
    </div>
  );
};

export default Admin;
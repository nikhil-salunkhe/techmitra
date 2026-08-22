import React, { useEffect } from 'react';
import { Routes, Route, useLocation, Navigate } from 'react-router-dom';
import AOS from 'aos';
import 'aos/dist/aos.css';
import Navbar from './components/common/Navbar';
import Footer from './components/common/Footer';
import Chatbot from './components/common/Chatbot';
import Home from './pages/Home';
import About from './pages/About';
import Programs from './pages/Programs';
import Enrollment from './pages/Enrollment';
import Contact from './pages/Contact';
import Services from './pages/Services';
import BusinessEnquiry from './pages/BusinessEnquiry';
import Admin from './pages/Admin';
import AdminLogin from './pages/AdminLogin';

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
}

// Protected Route Component
function ProtectedRoute({ children }) {
  const isAuthenticated = sessionStorage.getItem('techmitra_admin') === 'authenticated';
  if (!isAuthenticated) {
    return <Navigate to="/admin/login" replace />;
  }
  return children;
}

function App() {
  useEffect(() => {
    AOS.init({
      duration: 800,
      once: true,
      offset: 100,
      easing: 'ease-out-cubic',
    });
  }, []);

  return (
    <div className="min-h-screen bg-white">
      <ScrollToTop />
      <Navbar />
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/programs" element={<Programs />} />
          <Route path="/programs/:tech" element={<Programs />} />
          <Route path="/enrollment" element={<Enrollment />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/services" element={<Services />} />
          <Route path="/business-enquiry" element={<BusinessEnquiry />} />
          <Route path="/admin/login" element={<AdminLogin />} />
          <Route
            path="/admin"
            element={
              <ProtectedRoute>
                <Admin />
              </ProtectedRoute>
            }
          />
        </Routes>
        <Chatbot />
      </main>
      <Footer />
    </div>
  );
}

export default App;
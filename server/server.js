import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import mongoose from 'mongoose';
import nodemailer from 'nodemailer';
import Enrollment from './models/Enrollment.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = 5000;

// MongoDB Connection
const MONGO_URI = 'mongodb+srv://nsalunkhe803_db_user:SEzMYjvKV5EKiTRj@cluster0.quefgcd.mongodb.net/techmitra?retryWrites=true&w=majority&appName=Cluster0';

mongoose.connect(MONGO_URI)
  .then(() => console.log('✅ Connected to MongoDB Atlas'))
  .catch(err => console.error('❌ MongoDB connection error:', err));

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Path to subscriptions data file (keep JSON for subscriptions)
const SUBSCRIPTION_FILE = path.join(__dirname, 'data', 'subscriptions.json');

// Ensure data directory exists
const dataDir = path.join(__dirname, 'data');
if (!fs.existsSync(dataDir)) {
  fs.mkdirSync(dataDir, { recursive: true });
}

// Initialize subscription file if it doesn't exist
if (!fs.existsSync(SUBSCRIPTION_FILE)) {
  fs.writeFileSync(SUBSCRIPTION_FILE, JSON.stringify([], null, 2));
}

// Helper: Read subscriptions
function readSubscriptions() {
  try {
    const data = fs.readFileSync(SUBSCRIPTION_FILE, 'utf-8');
    return JSON.parse(data);
  } catch (err) {
    return [];
  }
}

// Helper: Write subscriptions
function writeSubscriptions(subscriptions) {
  fs.writeFileSync(SUBSCRIPTION_FILE, JSON.stringify(subscriptions, null, 2));
}

// Email transporter configuration
const transporter = nodemailer.createTransport({
  host: 'smtp.gmail.com',
  port: 587,
  secure: false,
  auth: {
    user: 'nsalunkhe803@gmail.com', 
    pass: 'lnigofxvhntzawtq',    // App password
  },
});

// Send enrollment confirmation email to student
async function sendEnrollmentEmail(student) {
  const mailOptions = {
    from: '"TechMitra Training" <noreply@techmitra.com>',
    to: student.email,
    subject: '🎉 Enrollment Successful - Welcome to TechMitra Training!',
    html: `
      <!DOCTYPE html>
      <html>
      <head>
        <style>
          body { font-family: Arial, sans-serif; background: #f4f7fa; margin: 0; padding: 0; }
          .container { max-width: 600px; margin: 20px auto; background: #ffffff; border-radius: 12px; overflow: hidden; box-shadow: 0 4px 15px rgba(0,0,0,0.1); }
          .header { background: linear-gradient(135deg, #1e3a5f, #2563eb); padding: 30px; text-align: center; }
          .header h1 { color: #ffffff; margin: 0; font-size: 24px; }
          .header p { color: #bfdbfe; margin: 8px 0 0; }
          .body { padding: 30px; }
          .body h2 { color: #1e3a5f; font-size: 20px; margin-top: 0; }
          .details { background: #f8fafc; border-radius: 8px; padding: 20px; margin: 20px 0; }
          .details table { width: 100%; border-collapse: collapse; }
          .details td { padding: 8px 12px; border-bottom: 1px solid #e2e8f0; font-size: 14px; }
          .details td:first-child { font-weight: 600; color: #475569; width: 40%; }
          .details td:last-child { color: #1e293b; }
          .badge { display: inline-block; background: #2563eb; color: #ffffff; padding: 6px 16px; border-radius: 20px; font-size: 14px; font-weight: 600; }
          .footer { background: #f1f5f9; padding: 20px; text-align: center; color: #64748b; font-size: 13px; }
          .btn { display: inline-block; background: #2563eb; color: #ffffff; text-decoration: none; padding: 10px 24px; border-radius: 6px; font-weight: 600; margin-top: 15px; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>🎉 Welcome to TechMitra!</h1>
            <p>Your training journey begins now</p>
          </div>
          <div class="body">
            <h2>Hello ${student.fullName},</h2>
            <p>Thank you for enrolling in our <strong>2-Month Intensive Training Program</strong>. We're excited to have you on board!</p>
            
            <div class="details">
              <table>
                <tr><td>Enrollment ID</td><td><span class="badge">${student.id}</span></td></tr>
                <tr><td>Plan</td><td>Training Plan - ₹4,999</td></tr>
                <tr><td>Duration</td><td>2 Months</td></tr>
                <tr><td>Technology</td><td>${student.technology}</td></tr>
                <tr><td>Preferred Batch</td><td>${student.preferredBatch || 'To be confirmed'}</td></tr>
                <tr><td>Status</td><td style="color: #16a34a; font-weight: 600;">✅ Active</td></tr>
              </table>
            </div>

            <h3>📋 What's Next?</h3>
            <ol style="color: #334155; line-height: 1.8;">
              <li>Our team will contact you within 24 hours to confirm your batch schedule.</li>
              <li>You'll receive access to our learning dashboard and course materials.</li>
              <li>Live sessions will begin as per your preferred batch timing.</li>
              <li>Start building your project with 1-on-1 mentorship.</li>
            </ol>

            <p style="text-align: center;">
              <a href="https://techmitra.com/dashboard" class="btn">Access Dashboard</a>
            </p>

            <p style="color: #64748b; font-size: 14px; margin-top: 20px;">
              If you have any questions, feel free to reply to this email or contact us at techmitrofficial@gmail.com
            </p>
          </div>
          <div class="footer">
            <p>TechMitra Training Solutions | Building Future Tech Leaders</p>
            <p>📍 Mumbai, India | 📧 techmitrofficial@gmail.com | 📞 +91 97641 49564</p>
          </div>
        </div>
      </body>
      </html>
    `,
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log(`✅ Enrollment email sent to ${student.email}`);
    return true;
  } catch (error) {
    console.log(`⚠️ Email sending failed: ${error.message}`);
    return false;
  }
}

// Send enrollment notification to admin
async function sendEnrollmentNotificationToAdmin(student) {
  const mailOptions = {
    from: '"TechMitra System" <noreply@techmitra.com>',
    to: 'techmitrofficial@gmail.com',
    subject: `🆕 New Enrollment - ${student.fullName} (${student.id})`,
    html: `
      <!DOCTYPE html>
      <html>
      <head>
        <style>
          body { font-family: Arial, sans-serif; background: #f4f7fa; margin: 0; padding: 0; }
          .container { max-width: 600px; margin: 20px auto; background: #ffffff; border-radius: 12px; overflow: hidden; box-shadow: 0 4px 15px rgba(0,0,0,0.1); }
          .header { background: linear-gradient(135deg, #059669, #2563eb); padding: 30px; text-align: center; }
          .header h1 { color: #ffffff; margin: 0; font-size: 24px; }
          .header p { color: #d1fae5; margin: 8px 0 0; }
          .body { padding: 30px; }
          .body h2 { color: #1e3a5f; font-size: 20px; margin-top: 0; }
          .section-title { background: #f8fafc; padding: 10px 16px; border-radius: 8px; font-weight: 600; color: #1e293b; margin: 20px 0 10px; font-size: 14px; }
          .details { background: #f8fafc; border-radius: 8px; padding: 20px; margin: 10px 0; }
          .details table { width: 100%; border-collapse: collapse; }
          .details td { padding: 8px 12px; border-bottom: 1px solid #e2e8f0; font-size: 14px; }
          .details td:first-child { font-weight: 600; color: #475569; width: 35%; }
          .details td:last-child { color: #1e293b; }
          .badge { display: inline-block; background: #059669; color: #ffffff; padding: 6px 16px; border-radius: 20px; font-size: 14px; font-weight: 600; }
          .tag { display: inline-block; background: #dbeafe; color: #1d4ed8; padding: 2px 10px; border-radius: 12px; font-size: 12px; font-weight: 500; }
          .footer { background: #f1f5f9; padding: 20px; text-align: center; color: #64748b; font-size: 13px; }
          .highlight { background: #fef3c7; border-left: 4px solid #f59e0b; padding: 12px 16px; border-radius: 4px; margin: 15px 0; font-size: 13px; color: #92400e; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>🆕 New Enrollment Received</h1>
            <p>A student has just enrolled at TechMitra</p>
          </div>
          <div class="body">
            <div style="text-align: center; margin-bottom: 20px;">
              <span class="badge">${student.id}</span>
              <span class="tag" style="margin-left: 8px;">${student.technology}</span>
              <span class="tag" style="margin-left: 4px; background: #d1fae5; color: #059669;">₹4,999</span>
            </div>

            <div class="section-title">👤 Personal Information</div>
            <div class="details">
              <table>
                <tr><td>Full Name</td><td><strong>${student.fullName}</strong></td></tr>
                <tr><td>Email</td><td><a href="mailto:${student.email}" style="color: #2563eb;">${student.email}</a></td></tr>
                <tr><td>Phone</td><td><a href="tel:${student.phone}" style="color: #2563eb;">${student.phone}</a></td></tr>
                <tr><td>City</td><td>${student.city}</td></tr>
              </table>
            </div>

            <div class="section-title">🎓 Academic Details</div>
            <div class="details">
              <table>
                <tr><td>College/University</td><td>${student.college}</td></tr>
                <tr><td>Course/Degree</td><td>${student.course}</td></tr>
                <tr><td>Year of Study</td><td>${student.year}</td></tr>
              </table>
            </div>

            <div class="section-title">📋 Program Details</div>
            <div class="details">
              <table>
                <tr><td>Technology</td><td><strong>${student.technology}</strong></td></tr>
                <tr><td>Plan</td><td>Training Plan - ₹4,999</td></tr>
                <tr><td>Duration</td><td>2 Months</td></tr>
                <tr><td>Preferred Batch</td><td>${student.preferredBatch || 'Not specified'}</td></tr>
                <tr><td>Previous Knowledge</td><td>${student.previousKnowledge || 'Not specified'}</td></tr>
                <tr><td>Project Idea</td><td>${student.projectIdea || 'Not specified'}</td></tr>
                <tr><td>Message</td><td>${student.message || 'No message'}</td></tr>
                <tr><td>Enrolled At</td><td>${new Date(student.createdAt).toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' })}</td></tr>
              </table>
            </div>

            ${student.message ? `<div class="highlight">📝 <strong>Student Message:</strong> ${student.message}</div>` : ''}

            <div style="text-align: center; margin-top: 20px;">
              <a href="http://localhost:5173/admin" style="display: inline-block; background: #2563eb; color: #ffffff; text-decoration: none; padding: 10px 24px; border-radius: 6px; font-weight: 600;">View in Admin Panel</a>
            </div>
          </div>
          <div class="footer">
            <p>TechMitra Training Solutions | Building Future Tech Leaders</p>
            <p>📍 Mumbai, India | 📧 techmitrofficial@gmail.com | 📞 +91 97641 49564</p>
          </div>
        </div>
      </body>
      </html>
    `,
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log(`✅ Admin notification sent for ${student.fullName} (${student.id})`);
    return true;
  } catch (error) {
    console.log(`⚠️ Admin email notification failed: ${error.message}`);
    return false;
  }
}

// ============ SUBSCRIPTION ============

// Send subscription notification to admin
async function sendSubscriptionNotification(subscriber) {
  const mailOptions = {
    from: '"TechMitra Website" <noreply@techmitra.com>',
    to: 'techmitrofficial@gmail.com',
    subject: '🎯 New Newsletter Subscription - TechMitra',
    html: `
      <!DOCTYPE html>
      <html>
      <head>
        <style>
          body { font-family: Arial, sans-serif; background: #f4f7fa; margin: 0; padding: 0; }
          .container { max-width: 600px; margin: 20px auto; background: #ffffff; border-radius: 12px; overflow: hidden; box-shadow: 0 4px 15px rgba(0,0,0,0.1); }
          .header { background: linear-gradient(135deg, #1e3a5f, #2563eb); padding: 30px; text-align: center; }
          .header h1 { color: #ffffff; margin: 0; font-size: 24px; }
          .header p { color: #bfdbfe; margin: 8px 0 0; }
          .body { padding: 30px; }
          .body h2 { color: #1e3a5f; font-size: 20px; margin-top: 0; }
          .details { background: #f8fafc; border-radius: 8px; padding: 20px; margin: 20px 0; }
          .details table { width: 100%; border-collapse: collapse; }
          .details td { padding: 8px 12px; border-bottom: 1px solid #e2e8f0; font-size: 14px; }
          .details td:first-child { font-weight: 600; color: #475569; width: 30%; }
          .details td:last-child { color: #1e293b; }
          .badge { display: inline-block; background: #2563eb; color: #ffffff; padding: 6px 16px; border-radius: 20px; font-size: 14px; font-weight: 600; }
          .footer { background: #f1f5f9; padding: 20px; text-align: center; color: #64748b; font-size: 13px; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>🎯 New Subscriber!</h1>
            <p>Someone just subscribed to TechMitra newsletter</p>
          </div>
          <div class="body">
            <h2>Newsletter Subscription Details</h2>
            <div class="details">
              <table>
                <tr><td>Email</td><td><span class="badge">${subscriber.email}</span></td></tr>
                <tr><td>Subscribed At</td><td>${new Date(subscriber.subscribedAt).toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' })}</td></tr>
                <tr><td>Total Subscribers</td><td>${readSubscriptions().length}</td></tr>
              </table>
            </div>
            <p style="color: #64748b; font-size: 14px; margin-top: 20px;">
              This subscriber has joined the TechMitra mailing list. They will receive updates about new programs, offers, and tech insights.
            </p>
          </div>
          <div class="footer">
            <p>TechMitra Training Solutions | Building Future Tech Leaders</p>
            <p>📍 Mumbai, India | 📧 techmitrofficial@gmail.com</p>
          </div>
        </div>
      </body>
      </html>
    `,
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log(`✅ Subscription notification sent to admin for ${subscriber.email}`);
    return true;
  } catch (error) {
    console.log(`⚠️ Email notification failed: ${error.message}`);
    return false;
  }
}

// POST /api/subscribe - New newsletter subscription
app.post('/api/subscribe', async (req, res) => {
  try {
    const { email } = req.body;

    if (!email) {
      return res.status(400).json({ success: false, message: 'Email is required' });
    }

    // Check if already subscribed
    const subscriptions = readSubscriptions();
    const existing = subscriptions.find(s => s.email === email);
    if (existing) {
      return res.json({ success: true, message: 'You are already subscribed!' });
    }

    const subscriber = {
      id: `SUB-${Date.now()}`,
      email,
      subscribedAt: new Date().toISOString(),
    };

    subscriptions.push(subscriber);
    writeSubscriptions(subscriptions);

    // Send notification to admin (non-blocking)
    sendSubscriptionNotification(subscriber);

    res.status(201).json({
      success: true,
      message: '🎉 Thanks for subscribing! Stay tuned for updates.',
    });
  } catch (error) {
    console.error('Subscription error:', error);
    res.status(500).json({ success: false, message: 'Server error. Please try again.' });
  }
});

// GET /api/subscriptions - Get all subscribers (for admin)
app.get('/api/subscriptions', (req, res) => {
  try {
    const subscriptions = readSubscriptions();
    subscriptions.sort((a, b) => new Date(b.subscribedAt) - new Date(a.subscribedAt));
    res.json({ success: true, subscriptions });
  } catch (error) {
    console.error('Fetch subscriptions error:', error);
    res.status(500).json({ success: false, message: 'Server error' });
  }
});

// ============ ENROLLMENT ROUTES (MongoDB) ============

// POST /api/enroll - Create new enrollment
app.post('/api/enroll', async (req, res) => {
  try {
    const { fullName, email, phone, college, course, year, city, technology, projectIdea, previousKnowledge, preferredBatch, message } = req.body;

    // Validation
    if (!fullName || !email || !phone || !college || !course || !year || !city || !technology) {
      return res.status(400).json({ success: false, message: 'All required fields must be filled' });
    }

    // Count existing enrollments to generate ID
    const count = await Enrollment.countDocuments();
    const id = `ENR-${1000 + count + 1}`;

    const enrollment = new Enrollment({
      id,
      fullName,
      email,
      phone,
      college,
      course,
      year,
      city,
      technology,
      projectIdea: projectIdea || '',
      previousKnowledge: previousKnowledge || '',
      preferredBatch: preferredBatch || '',
      message: message || '',
      plan: 'Training Plan',
      amount: 4999,
      duration: '2 Months',
      status: 'active',
      createdAt: new Date(),
    });

    // Save to MongoDB
    await enrollment.save();

    // Send emails (non-blocking)
    sendEnrollmentEmail(enrollment);
    sendEnrollmentNotificationToAdmin(enrollment);

    res.status(201).json({
      success: true,
      message: 'Enrollment successful! Check your email for confirmation.',
      enrollment,
    });
  } catch (error) {
    console.error('Enrollment error:', error);
    res.status(500).json({ success: false, message: 'Server error. Please try again.' });
  }
});

// GET /api/enrollments - Get all enrollments (for admin)
app.get('/api/enrollments', async (req, res) => {
  try {
    const enrollments = await Enrollment.find().sort({ createdAt: -1 });
    res.json({ success: true, enrollments });
  } catch (error) {
    console.error('Fetch enrollments error:', error);
    res.status(500).json({ success: false, message: 'Server error' });
  }
});

// GET /api/enrollments/:id - Get single enrollment
app.get('/api/enrollments/:id', async (req, res) => {
  try {
    const enrollment = await Enrollment.findOne({ id: req.params.id });
    if (!enrollment) {
      return res.status(404).json({ success: false, message: 'Enrollment not found' });
    }
    res.json({ success: true, enrollment });
  } catch (error) {
    console.error('Fetch enrollment error:', error);
    res.status(500).json({ success: false, message: 'Server error' });
  }
});

// PUT /api/enrollments/:id/status - Update enrollment status
app.put('/api/enrollments/:id/status', async (req, res) => {
  try {
    const { status } = req.body;
    const enrollment = await Enrollment.findOneAndUpdate(
      { id: req.params.id },
      { status },
      { new: true }
    );
    if (!enrollment) {
      return res.status(404).json({ success: false, message: 'Enrollment not found' });
    }
    res.json({ success: true, enrollment });
  } catch (error) {
    console.error('Update status error:', error);
    res.status(500).json({ success: false, message: 'Server error' });
  }
});

// DELETE /api/enrollments/:id - Delete enrollment
app.delete('/api/enrollments/:id', async (req, res) => {
  try {
    const enrollment = await Enrollment.findOneAndDelete({ id: req.params.id });
    if (!enrollment) {
      return res.status(404).json({ success: false, message: 'Enrollment not found' });
    }
    res.json({ success: true, message: 'Enrollment deleted successfully' });
  } catch (error) {
    console.error('Delete enrollment error:', error);
    res.status(500).json({ success: false, message: 'Server error' });
  }
});

// Start server
app.listen(PORT, () => {
  console.log(`🚀 TechMitra API Server running on http://localhost:${PORT}`);
  console.log(`📦 MongoDB: techmitra database`);
});
import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import mongoose from 'mongoose';
import { Resend } from 'resend';
import Enrollment from './models/Enrollment.js';
import Counter from './models/Counter.js';
import Subscription from './models/Subscription.js';

const resend = new Resend(process.env.RESEND_API_KEY);

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 5000;

// MongoDB Connection
const MONGO_URI = 'mongodb+srv://nsalunkhe803_db_user:SEzMYjvKV5EKiTRj@cluster0.quefgcd.mongodb.net/techmitra?retryWrites=true&w=majority&appName=Cluster0';

mongoose.connect(MONGO_URI)
  .then(() => console.log('✅ Connected to MongoDB Atlas'))
  .catch(err => console.error('❌ MongoDB connection error:', err));

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Helper: Get next sequence number (atomic operation)
async function getNextSequence(name) {
  const counter = await Counter.findOneAndUpdate(
    { _id: name },
    { $inc: { seq: 1 } },
    { returnDocument: 'after', upsert: true }
  );
  return counter.seq;
}

// Initialize enrollment counter from existing data
async function initializeEnrollmentCounter() {
  try {
    // Find the highest existing enrollment ID
    const highestEnrollment = await Enrollment.findOne().sort({ id: -1 });
    
    if (highestEnrollment) {
      // Extract numeric part from ID (e.g., "ENR-1003" -> 1003)
      const highestId = highestEnrollment.id;
      const match = highestId.match(/ENR-(\d+)/);
      
      if (match) {
        const highestNumber = parseInt(match[1], 10);
        
        // Check if counter exists
        const counter = await Counter.findById('enrollmentId');
        
        // Only initialize if counter doesn't exist
        if (!counter) {
          await Counter.create({
            _id: 'enrollmentId',
            seq: highestNumber,
          });
          console.log(`✅ Initialized enrollment counter to ${highestNumber} (from existing enrollment ${highestId})`);
        } else {
          console.log(`ℹ️  Enrollment counter already exists at ${counter.seq}`);
        }
      }
    } else {
      console.log('ℹ️  No existing enrollments found, counter will start from 1000');
    }
  } catch (error) {
    console.error('⚠️  Error initializing enrollment counter:', error);
  }
}

// Initialize counter after MongoDB connection
mongoose.connection.once('open', () => {
  initializeEnrollmentCounter();
});

// Site URLs
const FRONTEND_URL = 'https://techmitr.netlify.app';
const API_URL = 'https://techmitra-ggae.onrender.com';

// Email configuration
// IMPORTANT: Resend requires a verified domain for custom "from" addresses.
// Until a domain is verified in Resend, use 'onboarding@resend.dev' as the sender.
const RESEND_FROM = 'onboarding@resend.dev';
const ADMIN_EMAIL = 'techmitrofficial@gmail.com';  // Correct admin contact email

// Format amount in Indian Rupees format
function formatINR(amount) {
  return `₹${Number(amount || 0).toLocaleString('en-IN')}`;
}

// Generate HTML for a detail row (email-safe with inline styles)
function detailRow(label, value, isLast = false) {
  return `
    <tr>
      <td style="padding: 10px 12px; border-bottom: ${isLast ? 'none' : '1px solid #e5e7eb'}; font-size: 14px; font-weight: 600; color: #6b7280; width: 40%; vertical-align: top;">${label}</td>
      <td style="padding: 10px 12px; border-bottom: ${isLast ? 'none' : '1px solid #e5e7eb'}; font-size: 14px; color: #1f2937; vertical-align: top; word-break: break-word;">${value}</td>
    </tr>
  `;
}

// Send enrollment confirmation email to student
async function sendEnrollmentEmail(student) {
  const mailOptions = {
    from: RESEND_FROM,
    to: student.email,
    subject: `🎉 Enrollment Confirmed - ${student.plan} (${student.id})`,
    html: `<!DOCTYPE html>
<html lang="en" xmlns="http://www.w3.org/xhtml" xmlns:v="urn:schemas-microsoft-com:vml" xmlns:o="urn:schemas-microsoft-com:office:office">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="x-apple-disable-message-reformatting">
  <title>Enrollment Confirmed - TechMitra</title>
  <!--[if mso]>
    <noscript>
      <xml>
        <o:OfficeDocumentSettings>
          <o:PixelsPerInch>96</o:PixelsPerInch>
        </o:OfficeDocumentSettings>
      </xml>
    </noscript>
  <![endif]-->
  <style>
    @media only screen and (max-width: 620px) {
      .container { width: 100% !important; }
      .inner-body { width: 100% !important; padding: 0 10px !important; }
      .content { padding: 15px !important; }
      .header { padding: 20px 15px !important; }
      .btn { display: block !important; width: 100% !important; text-align: center !important; box-sizing: border-box !important; margin-bottom: 8px !important; }
      .footer { padding: 15px !important; }
      .logo-text { font-size: 20px !important; }
    }
    @media only screen and (max-width: 480px) {
      .plan-box { padding: 12px !important; }
      .details-table td { padding: 8px 10px !important; font-size: 13px !important; }
      .next-box { padding: 12px !important; font-size: 13px !important; }
      .header h1 { font-size: 22px !important; }
      .header p { font-size: 13px !important; }
    }
  </style>
</head>
<body style="margin:0; padding:0; background-color:#e8edf3; font-family:'Segoe UI', Arial, Helvetica, sans-serif; -webkit-text-size-adjust:100%; -ms-text-size-adjust:100%;">
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="background-color:#e8edf3; padding:20px 0;">
    <tr>
      <td align="center" style="padding:20px 10px;">
        <!-- Outer Container -->
        <table role="presentation" class="container" width="600" cellpadding="0" cellspacing="0" border="0" style="width:600px; max-width:100%; margin:0 auto; background-color:#ffffff; border-radius:16px; overflow:hidden; box-shadow:0 6px 30px rgba(0,0,0,0.08);">
          <tr>
            <td>
              <!-- Header -->
              <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="background:#1e3a8a; background:linear-gradient(135deg, #1e3a5f 0%, #2563eb 100%);">
                <tr>
                  <td align="center" style="padding:30px 20px;">
                    <table role="presentation" cellpadding="0" cellspacing="0" border="0">
                      <tr>
                        <td align="center">
                          <div style="display:inline-block; width:56px; height:56px; background:#ffffff; border-radius:14px; text-align:center; line-height:56px; margin-bottom:10px;">
                            <span style="color:#2563eb; font-size:26px; font-weight:800;">TM</span>
                          </div>
                        </td>
                      </tr>
                      <tr>
                        <td align="center">
                          <h1 style="color:#ffffff; font-size:24px; font-weight:700; margin:10px 0 4px 0;">🎉 Enrollment Confirmed!</h1>
                          <p style="color:#bfdbfe; font-size:14px; margin:0;">Your training journey with TechMitra begins now</p>
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>
              </table>
              
              <!-- Body -->
              <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" class="content" style="padding:30px;">
                <tr>
                  <td style="padding:30px; font-size:15px; line-height:1.7; color:#374151;">
                    <h2 style="color:#1e3a5f; font-size:20px; margin:0 0 12px 0;">Hello ${student.fullName},</h2>
                    <p style="margin:0 0 16px 0;">Thank you for enrolling in <strong style="color:#2563eb;">${student.plan}</strong> at TechMitra. Your seat has been successfully reserved!</p>
                    
                    <!-- Plan Summary Box -->
                    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="background:linear-gradient(135deg, #eff6ff 0%, #f0f9ff 100%); border:2px solid #bfdbfe; border-radius:12px; margin-bottom:20px;">
                      <tr>
                        <td style="padding:16px 20px;">
                          <h3 style="margin:0 0 10px 0; color:#1e3a5f; font-size:15px; font-weight:700;">✅ Your Enrollment Summary</h3>
                          <p style="margin:4px 0; color:#1e3a5f; font-size:14px;">📋 <strong>Plan:</strong> ${student.plan}</p>
                          <p style="margin:4px 0; color:#1e3a5f; font-size:14px;">💰 <strong>Training Fee:</strong> <span style="font-size:16px; font-weight:700; color:#059669;">${formatINR(student.amount)}</span></p>
                          <p style="margin:4px 0; color:#1e3a5f; font-size:14px;">⏳ <strong>Duration:</strong> ${student.duration}</p>
                        </td>
                      </tr>
                    </table>
                    
                    <!-- Details Table -->
                    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" class="details-table" style="width:100%; background:#f8fafc; border:1px solid #e2e8f0; border-radius:10px; margin-bottom:20px; border-collapse:collapse;">
                      <tr>
                        <td style="padding:14px 16px; background:#f1f5f9; border-bottom:1px solid #e2e8f0;">
                          <strong style="color:#1e293b; font-size:14px;">📋 Enrollment Details</strong>
                        </td>
                      </tr>
                      <tr><td><table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="border-collapse:collapse; padding:0;">
                        ${detailRow('Enrollment ID', `<span style="display:inline-block; background:#2563eb; color:#ffffff; padding:4px 12px; border-radius:20px; font-size:13px; font-weight:700;">${student.id}</span>`)}
                        ${detailRow('Plan', `<strong>${student.plan}</strong>`)}
                        ${detailRow('Training Fee', `<strong>${formatINR(student.amount)}</strong>`)}
                        ${detailRow('Duration', student.duration)}
                        ${detailRow('Technology / Track', `<strong>${student.technology}</strong>`)}
                        ${detailRow('Full Name', student.fullName)}
                        ${detailRow('Email', student.email)}
                        ${detailRow('Phone', student.phone)}
                        ${detailRow('College/University', student.college)}
                        ${detailRow('Course/Degree', `${student.course} - ${student.year}`)}
                        ${detailRow('City', student.city)}
                        ${detailRow('Preferred Batch', student.preferredBatch || 'To be confirmed')}
                        ${detailRow('Learning Mode', '100% Live Online Sessions')}
                        ${detailRow('Status', `<span style="display:inline-block; background:#d1fae5; color:#059669; padding:2px 10px; border-radius:20px; font-size:12px; font-weight:700;">✅ ACTIVE</span>`, true)}
                      </table></td></tr>
                    </table>

                    <!-- Next Steps -->
                    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" class="next-box" style="background:#fffbeb; border-left:4px solid #f59e0b; border-radius:8px; margin-bottom:20px;">
                      <tr>
                        <td style="padding:16px 20px; font-size:14px; color:#78350f; line-height:1.8;">
                          <strong style="font-size:14px;">📋 What's Next?</strong>
                          <ol style="margin:8px 0 0 0; padding-left:20px;">
                            <li>Our team will contact you within <strong>24 hours</strong> to confirm your batch.</li>
                            <li>You'll receive access to learning materials and session links.</li>
                            <li>Live sessions will begin as per your preferred batch timing.</li>
                            <li>Start building your project with 1-on-1 mentorship.</li>
                          </ol>
                        </td>
                      </tr>
                    </table>

                    <!-- Buttons -->
                    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0">
                      <tr>
                        <td align="center" style="padding:8px 0;">
                          <table role="presentation" cellpadding="0" cellspacing="0" border="0" style="margin:0 auto;">
                            <tr>
                              <td style="border-radius:8px;">
                                <a href="${FRONTEND_URL}/enrollment" class="btn" style="display:inline-block; background:#2563eb; color:#ffffff; text-decoration:none; padding:12px 28px; border-radius:8px; font-weight:600; font-size:14px; margin-right:6px;">🌐 Visit Website</a>
                              </td>
                              <td style="border-radius:8px;">
                                <a href="https://wa.me/919764149564" class="btn" style="display:inline-block; background:#059669; color:#ffffff; text-decoration:none; padding:12px 28px; border-radius:8px; font-weight:600; font-size:14px; margin-left:6px;">💬 WhatsApp Us</a>
                              </td>
                            </tr>
                          </table>
                        </td>
                      </tr>
                    </table>

                    <p style="color:#6b7280; font-size:13px; margin:20px 0 0 0; line-height:1.6;">
                      If you have any questions, feel free to reply to this email, call us at <strong>+91 97641 49564</strong>, or email us at <strong>techmitrofficial@gmail.com</strong>.
                    </p>
                  </td>
                </tr>
              </table>

              <!-- Footer -->
              <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" class="footer" style="background:#f1f5f9; padding:24px;">
                <tr>
                  <td align="center" style="padding:24px 20px; font-size:13px; color:#64748b; line-height:1.8;">
                    <p style="margin:0; font-weight:600; color:#1e293b;">TechMitra Training Solutions | Building Future Tech Leaders</p>
                    <p style="margin:4px 0;">📍 India (Online) | 📧 techmitrofficial@gmail.com | 📞 +91 97641 49564</p>
                    <p style="margin:4px 0;">🌐 <a href="${FRONTEND_URL}" style="color:#2563eb; text-decoration:none;">${FRONTEND_URL.replace('https://', '')}</a></p>
                    <p style="margin:8px 0 0 0; font-size:11px; color:#94a3b8;">You received this email because you enrolled in a TechMitra training program.</p>
                  </td>
                </tr>
              </table>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>`,
  };

  try {
    await resend.emails.send({
      from: mailOptions.from,
      to: mailOptions.to,
      subject: mailOptions.subject,
      html: mailOptions.html,
    });
    console.log(`✅ Enrollment confirmation email sent to ${student.email}`);
    return { success: true };
  } catch (error) {
    console.log(`⚠️ Email sending failed: ${error.message}`);
    return { 
      success: false, 
      error: error.message,
      fullError: `We were unable to send a confirmation email to ${student.email}.\n\nError details: ${error.message}`
    };
  }
}

// Send enrollment notification to admin
async function sendEnrollmentNotificationToAdmin(student) {
  const adminUrl = `${FRONTEND_URL}/admin`;
  const mailOptions = {
    from: RESEND_FROM,
    to: ADMIN_EMAIL,
    subject: `🆕 New Enrollment - ${student.fullName} (${student.id}) - ${student.plan}`,
    html: `<!DOCTYPE html>
<html lang="en" xmlns="http://www.w3.org/xhtml">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="x-apple-disable-message-reformatting">
  <title>New Enrollment Notification - TechMitra</title>
  <style>
    @media only screen and (max-width: 620px) {
      .container { width: 100% !important; }
      .content { padding: 15px !important; }
      .header { padding: 20px 15px !important; }
      .section-title { padding: 8px 12px !important; font-size: 13px !important; }
      .admin-box { padding: 15px !important; }
      .btn { display: block !important; width: 100% !important; text-align: center !important; box-sizing: border-box !important; }
      .footer { padding: 15px !important; }
      .tag-row { display: block !important; margin-bottom: 8px !important; margin-left: 0 !important; }
    }
  </style>
</head>
<body style="margin:0; padding:0; background-color:#e8edf3; font-family:'Segoe UI', Arial, Helvetica, sans-serif; -webkit-text-size-adjust:100%; -ms-text-size-adjust:100%;">
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="background-color:#e8edf3; padding:20px 0;">
    <tr>
      <td align="center" style="padding:20px 10px;">
        <table role="presentation" class="container" width="600" cellpadding="0" cellspacing="0" border="0" style="width:600px; max-width:100%; margin:0 auto; background-color:#ffffff; border-radius:16px; overflow:hidden; box-shadow:0 6px 30px rgba(0,0,0,0.08);">
          <tr>
            <td>
              <!-- Header -->
              <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="background:#059669; background:linear-gradient(135deg, #059669 0%, #2563eb 100%);">
                <tr>
                  <td align="center" class="header" style="padding:30px 20px;">
                    <h1 style="color:#ffffff; font-size:24px; font-weight:700; margin:0 0 4px 0;">🆕 New Enrollment Received</h1>
                    <p style="color:#d1fae5; font-size:14px; margin:0;">A new student has just enrolled at TechMitra</p>
                  </td>
                </tr>
              </table>

              <!-- Body -->
              <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" class="content" style="padding:30px;">
                <tr>
                  <td style="padding:30px; font-size:15px; color:#374151;">
                    <!-- Tags Row -->
                    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="margin-bottom:16px;">
                      <tr>
                        <td align="center" style="padding:8px 0;">
                          <span style="display:inline-block; background:#059669; color:#ffffff; padding:6px 16px; border-radius:20px; font-size:14px; font-weight:700; margin-right:4px;">${student.id}</span>
                          <span class="tag-row" style="display:inline-block; background:#dbeafe; color:#1d4ed8; padding:4px 12px; border-radius:12px; font-size:12px; font-weight:500; margin-left:4px;">${student.technology}</span>
                          <span class="tag-row" style="display:inline-block; background:#d1fae5; color:#059669; padding:4px 12px; border-radius:12px; font-size:12px; font-weight:600; margin-left:4px;">${formatINR(student.amount)}</span>
                        </td>
                      </tr>
                    </table>

                    <!-- Personal Information -->
                    <p class="section-title" style="background:#f1f5f9; padding:10px 16px; border-radius:8px; font-weight:700; color:#1e293b; margin:20px 0 10px 0; font-size:14px;">👤 Personal Information</p>
                    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="background:#f8fafc; border-radius:8px; padding:0; border:1px solid #e2e8f0; border-collapse:collapse;">
                      <tr><td><table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="border-collapse:collapse;">
                        ${detailRow('Full Name', `<strong>${student.fullName}</strong>`)}
                        ${detailRow('Email', `<a href="mailto:${student.email}" style="color:#2563eb;">${student.email}</a>`)}
                        ${detailRow('Phone', `<a href="tel:${student.phone}" style="color:#2563eb;">${student.phone}</a>`)}
                        ${detailRow('City', student.city, true)}
                      </table></td></tr>
                    </table>

                    <!-- Academic Details -->
                    <p class="section-title" style="background:#f1f5f9; padding:10px 16px; border-radius:8px; font-weight:700; color:#1e293b; margin:20px 0 10px 0; font-size:14px;">🎓 Academic Details</p>
                    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="background:#f8fafc; border-radius:8px; padding:0; border:1px solid #e2e8f0; border-collapse:collapse;">
                      <tr><td><table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="border-collapse:collapse;">
                        ${detailRow('College/University', student.college)}
                        ${detailRow('Course/Degree', student.course)}
                        ${detailRow('Year of Study', student.year, true)}
                      </table></td></tr>
                    </table>

                    <!-- Program Details -->
                    <p class="section-title" style="background:#f1f5f9; padding:10px 16px; border-radius:8px; font-weight:700; color:#1e293b; margin:20px 0 10px 0; font-size:14px;">📋 Program & Plan Details</p>
                    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="background:#f8fafc; border-radius:8px; padding:0; border:1px solid #e2e8f0; border-collapse:collapse;">
                      <tr><td><table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="border-collapse:collapse;">
                        ${detailRow('Plan', `<strong>${student.plan}</strong>`)}
                        ${detailRow('Technology / Track', `<strong>${student.technology}</strong>`)}
                        ${detailRow('Training Fee', `<strong style="color:#059669;">${formatINR(student.amount)}</strong>`)}
                        ${detailRow('Duration', student.duration)}
                        ${detailRow('Preferred Batch', student.preferredBatch || 'Not specified')}
                        ${detailRow('Previous Knowledge', student.previousKnowledge || 'Not specified')}
                        ${detailRow('Project Idea', student.projectIdea || 'Not specified')}
                        ${detailRow('Message', student.message || 'No message')}
                        ${detailRow('Enrolled At', new Date(student.createdAt).toLocaleString('en-IN', { timeZone: 'Asia/Kolkata', dateStyle: 'full', timeStyle: 'short' }))}
                        ${detailRow('Status', `<span style="display:inline-block; background:#d1fae5; color:#059669; padding:2px 10px; border-radius:20px; font-size:12px; font-weight:700;">✅ ACTIVE</span>`, true)}
                      </table></td></tr>
                    </table>

                    ${student.message ? `<table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="margin:15px 0;"><tr><td style="background:#fef3c7; border-left:4px solid #f59e0b; padding:12px 16px; border-radius:4px; font-size:13px; color:#92400e;">📝 <strong>Student Message:</strong> ${student.message}</td></tr></table>` : ''}

                    <!-- Admin Login Box -->
                    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" class="admin-box" style="margin-top:24px; background:#eff6ff; border:2px solid #bfdbfe; border-radius:10px;">
                      <tr>
                        <td align="center" style="padding:20px;">
                          <p style="margin:0 0 8px 0; color:#1e3a5f; font-weight:700; font-size:14px;">🔐 Admin Login to Manage This Enrollment</p>
                          <p style="margin:0 0 12px 0; font-size:12px; color:#475569;">Use the button below to open the Admin Panel. If you're not logged in, you'll be redirected to the login page.</p>
                          <a href="${adminUrl}" class="btn" style="display:inline-block; background:#2563eb; color:#ffffff; text-decoration:none; padding:12px 32px; border-radius:8px; font-weight:700; font-size:14px;">🔐 View in Admin Panel</a>
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>
              </table>

              <!-- Footer -->
              <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" class="footer" style="background:#f1f5f9; padding:24px;">
                <tr>
                  <td align="center" style="padding:24px 20px; font-size:13px; color:#64748b; line-height:1.8;">
                    <p style="margin:0; font-weight:600; color:#1e293b;">TechMitra Training Solutions | Building Future Tech Leaders</p>
                    <p style="margin:4px 0;">📍 India (Online) | 📧 techmitrofficial@gmail.com | 📞 +91 97641 49564</p>
                    <p style="margin:4px 0;">🌐 <a href="${FRONTEND_URL}" style="color:#2563eb; text-decoration:none;">${FRONTEND_URL.replace('https://', '')}</a></p>
                  </td>
                </tr>
              </table>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>`,
  };

  try {
    await resend.emails.send({
      from: mailOptions.from,
      to: mailOptions.to,
      subject: mailOptions.subject,
      html: mailOptions.html,
    });
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
    from: RESEND_FROM,
    to: ADMIN_EMAIL,
    subject: '🎯 New Newsletter Subscription - TechMitra',
    html: `<!DOCTYPE html>
<html lang="en" xmlns="http://www.w3.org/xhtml">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <title>New Subscriber - TechMitra</title>
</head>
<body style="margin:0; padding:0; background-color:#e8edf3; font-family:'Segoe UI', Arial, Helvetica, sans-serif;">
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="background-color:#e8edf3; padding:20px 0;">
    <tr>
      <td align="center" style="padding:20px 10px;">
        <table role="presentation" width="600" cellpadding="0" cellspacing="0" border="0" style="width:600px; max-width:100%; margin:0 auto; background-color:#ffffff; border-radius:16px; overflow:hidden; box-shadow:0 6px 30px rgba(0,0,0,0.08);">
          <tr>
            <td>
              <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="background:linear-gradient(135deg, #1e3a5f 0%, #2563eb 100%);">
                <tr>
                  <td align="center" style="padding:30px 20px;">
                    <h1 style="color:#ffffff; font-size:24px; font-weight:700; margin:0 0 4px 0;">🎯 New Subscriber!</h1>
                    <p style="color:#bfdbfe; font-size:14px; margin:0;">Someone just subscribed to TechMitra newsletter</p>
                  </td>
                </tr>
              </table>
              <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0">
                <tr>
                  <td style="padding:30px;">
                    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="background:#f8fafc; border:1px solid #e2e8f0; border-radius:10px; border-collapse:collapse;">
                      <tr><td><table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="border-collapse:collapse;">
                        <tr>
                          <td style="padding:10px 12px; border-bottom:1px solid #e5e7eb; font-size:14px; font-weight:600; color:#6b7280; width:30%;">Email</td>
                          <td style="padding:10px 12px; border-bottom:1px solid #e5e7eb; font-size:14px; color:#1f2937;"><strong>${subscriber.email}</strong></td>
                        </tr>
                        <tr>
                          <td style="padding:10px 12px; border-bottom:1px solid #e5e7eb; font-size:14px; font-weight:600; color:#6b7280; width:30%;">Subscribed At</td>
                          <td style="padding:10px 12px; border-bottom:1px solid #e5e7eb; font-size:14px; color:#1f2937;">${new Date(subscriber.subscribedAt).toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' })}</td>
                        </tr>
                        <tr>
                          <td style="padding:10px 12px; font-size:14px; font-weight:600; color:#6b7280; width:30%;">Total Subscribers</td>
                          <td style="padding:10px 12px; font-size:14px; color:#1f2937;"><strong>${await Subscription.countDocuments()}</strong></td>
                        </tr>
                      </table></td></tr>
                    </table>
                    <p style="color:#6b7280; font-size:14px; margin:20px 0 0 0; line-height:1.6;">This subscriber has joined the TechMitra mailing list. They will receive updates about new programs, offers, and tech insights.</p>
                  </td>
                </tr>
              </table>
              <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="background:#f1f5f9;">
                <tr>
                  <td align="center" style="padding:20px; font-size:13px; color:#64748b;">
                    <p style="margin:0; font-weight:600; color:#1e293b;">TechMitra Training Solutions</p>
                    <p style="margin:4px 0;">📍 India (Online) | 📧 techmitrofficial@gmail.com</p>
                  </td>
                </tr>
              </table>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>`,
  };

  try {
    await resend.emails.send({
      from: mailOptions.from,
      to: mailOptions.to,
      subject: mailOptions.subject,
      html: mailOptions.html,
    });
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
    const existing = await Subscription.findOne({ email: email.toLowerCase() });
    if (existing) {
      return res.json({ success: true, message: 'You are already subscribed!' });
    }

    // Create new subscription
    const subscriber = new Subscription({
      email: email.toLowerCase(),
    });

    await subscriber.save();

    // Send notification to admin (non-blocking)
    sendSubscriptionNotification(subscriber).catch(error => {
      console.log(`⚠️ Background subscription notification failed: ${error.message}`);
    });

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
app.get('/api/subscriptions', async (req, res) => {
  try {
    const subscriptions = await Subscription.find().sort({ subscribedAt: -1 });
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
    const { fullName, email, phone, college, course, year, city, technology, projectIdea, previousKnowledge, preferredBatch, message, planId, plan, duration } = req.body;

    // Validation
    if (!fullName || !email || !phone || !college || !course || !year || !city || !technology) {
      return res.status(400).json({ success: false, message: 'All required fields must be filled' });
    }

    // Check for duplicate email
    const existingEmail = await Enrollment.findOne({ email: email.toLowerCase() });
    if (existingEmail) {
      return res.status(400).json({ 
        success: false, 
        message: 'This email address is already enrolled. Please use a different email or contact support if you need to update your enrollment.' 
      });
    }

    // Check for duplicate phone
    const existingPhone = await Enrollment.findOne({ phone });
    if (existingPhone) {
      return res.status(400).json({ 
        success: false, 
        message: 'This phone number is already enrolled. Please use a different phone number or contact support if you need to update your enrollment.' 
      });
    }

    // Determine plan details based on planId
    let selectedPlan = 'Training Plan';
    let selectedAmount = 3999;
    let selectedDuration = '2 Months';

    if (planId === 'ai') {
      selectedPlan = plan || 'AI Through Development';
      selectedAmount = 1499;
      selectedDuration = duration || '1 Month';
    } else if (planId === 'project') {
      selectedPlan = plan || 'Project Development';
      selectedAmount = 3999;
      selectedDuration = duration || '2 Months';
    } else {
      selectedPlan = plan || 'Training Plan';
      selectedAmount = 3999;
      selectedDuration = duration || '2 Months';
    }

    // Get next enrollment ID using atomic counter
    const nextSeq = await getNextSequence('enrollmentId');
    const id = `ENR-${1000 + nextSeq}`;

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
      plan: selectedPlan,
      amount: selectedAmount,
      duration: selectedDuration,
      status: 'active',
      createdAt: new Date(),
    });

    // Save to MongoDB
    await enrollment.save();

    // Send emails in background (non-blocking)
    sendEnrollmentEmail(enrollment).catch(error => {
      console.log(`⚠️ Background email sending failed: ${error.message}`);
    });
    sendEnrollmentNotificationToAdmin(enrollment).catch(error => {
      console.log(`⚠️ Background admin notification failed: ${error.message}`);
    });

    // Send response immediately without waiting for emails
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
  console.log(`🌐 Frontend URL: ${FRONTEND_URL}`);
});
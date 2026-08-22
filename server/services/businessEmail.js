import { resend } from './resendClient.js';

const RESEND_FROM = process.env.RESEND_FROM || 'onboarding@resend.dev';
const ADMIN_EMAIL = process.env.ADMIN_EMAIL || 'techmitrofficial@gmail.com';
const FRONTEND_URL = process.env.FRONTEND_URL || 'https://techmitr.netlify.app';

function detailRow(label, value, isLast = false) {
  return `
    <tr>
      <td style="padding: 10px 12px; border-bottom: ${isLast ? 'none' : '1px solid #e5e7eb'}; font-size: 14px; font-weight: 600; color: #6b7280; width: 40%; vertical-align: top;">${label}</td>
      <td style="padding: 10px 12px; border-bottom: ${isLast ? 'none' : '1px solid #e5e7eb'}; font-size: 14px; color: #1f2937; vertical-align: top; word-break: break-word;">${value}</td>
    </tr>
  `;
}

export async function sendBusinessEnquiryEmail(enquiry) {
  const mailOptions = {
    from: RESEND_FROM,
    to: enquiry.email,
    subject: `✅ Enquiry Received - ${enquiry.serviceType} for ${enquiry.businessName} | TechMitra`,
    html: `<!DOCTYPE html><html><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"></head><body style="font-family: Arial, Helvetica, sans-serif; background:#e8edf3; margin:0; padding:20px;">
      <div style="max-width:600px; margin:0 auto; background:#fff; border-radius:8px; overflow:hidden;">
        <div style="background:linear-gradient(135deg,#059669 0%,#0d9488 100%); padding:28px; color:#fff; text-align:center;"><h1 style="margin:0;font-size:20px;">🏢 Thank You, ${enquiry.contactPerson}!</h1><p style="margin:6px 0 0 0;">Your enquiry has been received. Our team will contact you within 24 hours.</p></div>
        <div style="padding:20px; color:#111827;">
          <table width="100%" style="border-collapse:collapse;">
            ${detailRow('Enquiry ID', `<strong>${enquiry.id}</strong>`) }
            ${detailRow('Business Name', `<strong>${enquiry.businessName}</strong>`) }
            ${detailRow('Contact Person', enquiry.contactPerson) }
            ${detailRow('Phone', enquiry.phone) }
            ${detailRow('Email', enquiry.email) }
            ${detailRow('City', enquiry.city || 'Not specified') }
            ${detailRow('Business Type', enquiry.businessType) }
            ${detailRow('Service Required', `<strong>${enquiry.serviceType}</strong>`) }
            ${detailRow('Budget', enquiry.budget || 'To be discussed') }
            ${detailRow('Timeline', enquiry.timeline || 'Flexible') }
            ${detailRow('Description', enquiry.description || 'Not provided', true) }
          </table>
          <p style="margin-top:16px;color:#6b7280;">For urgent queries WhatsApp us at <a href="https://wa.me/919764149564" style="color:#059669; text-decoration:none;">+91 97641 49564</a></p>
          <p style="margin-top:10px; font-size:13px; color:#6b7280;">Visit <a href="${FRONTEND_URL}" style="color:#059669;">${FRONTEND_URL}</a></p>
        </div>
      </div>
    </body></html>`
  };

  try {
    await resend.emails.send({
      from: mailOptions.from,
      to: mailOptions.to,
      subject: mailOptions.subject,
      html: mailOptions.html,
    });
    console.log(`✅ Business enquiry email sent to ${enquiry.email} (${enquiry.id})`);
    return true;
  } catch (error) {
    console.error('⚠️ Business enquiry email failed:', error?.message || error);
    return false;
  }
}

export async function sendBusinessEnquiryNotificationToAdmin(enquiry) {
  const mailOptions = {
    from: RESEND_FROM,
    to: ADMIN_EMAIL,
    subject: `💼 New Business Enquiry - ${enquiry.businessName} (${enquiry.id}) - ${enquiry.serviceType}`,
    html: `<!DOCTYPE html><html><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"></head><body style="font-family: Arial, Helvetica, sans-serif; background:#e8edf3; margin:0; padding:20px;">
      <div style="max-width:700px; margin:0 auto; background:#fff; border-radius:8px; overflow:hidden;">
        <div style="background:linear-gradient(135deg,#059669 0%,#2563eb 100%); padding:22px; color:#fff;text-align:center;"><h1 style="margin:0;font-size:20px;">💼 New Business Enquiry!</h1></div>
        <div style="padding:18px; color:#111827;">
          <table width="100%" style="border-collapse:collapse;">
            ${detailRow('Business Name', `<strong>${enquiry.businessName}</strong>`) }
            ${detailRow('Contact Person', `<strong>${enquiry.contactPerson}</strong>`) }
            ${detailRow('Phone', `<a href="tel:${enquiry.phone}" style="color:#2563eb">${enquiry.phone}</a>`) }
            ${detailRow('Email', `<a href="mailto:${enquiry.email}" style="color:#2563eb">${enquiry.email}</a>`) }
            ${detailRow('City', enquiry.city || 'Not specified') }
            ${detailRow('Business Type', enquiry.businessType) }
            ${detailRow('Service Required', `<strong>${enquiry.serviceType}</strong>`) }
            ${detailRow('Budget', enquiry.budget || 'To be discussed') }
            ${detailRow('Timeline', enquiry.timeline || 'Flexible') }
            ${detailRow('Description', enquiry.description || 'Not provided', true) }
          </table>
          <p style="margin-top:14px;font-size:13px;color:#6b7280;">Open Admin: <a href="${FRONTEND_URL}/admin" style="color:#2563eb">${FRONTEND_URL}/admin</a></p>
        </div>
      </div>
    </body></html>`
  };

  try {
    await resend.emails.send({
      from: mailOptions.from,
      to: mailOptions.to,
      subject: mailOptions.subject,
      html: mailOptions.html,
    });
    console.log(`✅ Business enquiry admin notification sent (${enquiry.id})`);
    return true;
  } catch (error) {
    console.error('⚠️ Business enquiry admin notification failed:', error?.message || error);
    return false;
  }
}

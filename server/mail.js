const nodemailer = require('nodemailer');

const RESEND_API_KEY = process.env.RESEND_API_KEY || '';
const EMAILJS_SERVICE_ID = process.env.EMAILJS_SERVICE_ID || '';
const EMAILJS_TEMPLATE_ID = process.env.EMAILJS_TEMPLATE_ID || '';
const EMAILJS_PUBLIC_KEY = process.env.EMAILJS_PUBLIC_KEY || '';
const SMTP_HOST = process.env.SMTP_HOST || 'smtp.gmail.com';
const SMTP_PORT = process.env.SMTP_PORT ? Number(process.env.SMTP_PORT) : 587;
const SMTP_USER = process.env.SMTP_USER || 'youssefkallel2999@gmail.com';
const SMTP_PASS = process.env.SMTP_PASS || 'fazghdpwtewjmppx';
const FROM_EMAIL = process.env.FROM_EMAIL || SMTP_USER || 'youssefkallel2999@gmail.com';

let LAST_EMAIL_ERROR = null;
let LAST_EMAIL_ATTEMPT = null;

function provider() {
  // Prefer SMTP whenever it's configured
  if (SMTP_HOST && SMTP_USER && SMTP_PASS) return 'smtp';
  if (EMAILJS_SERVICE_ID && EMAILJS_TEMPLATE_ID && EMAILJS_PUBLIC_KEY) return 'emailjs';
  if (RESEND_API_KEY) return 'resend';
  return 'none';
}

async function sendEmail({ to, subject, text }) {
  const prov = provider();
  LAST_EMAIL_ATTEMPT = { primary: prov, tried: [] };
  if (prov === 'emailjs') {
    try {
      const res = await fetch('https://api.emailjs.com/api/v1.0/email/send', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'origin': 'http://localhost' },
        body: JSON.stringify({
          service_id: EMAILJS_SERVICE_ID,
          template_id: EMAILJS_TEMPLATE_ID,
          user_id: EMAILJS_PUBLIC_KEY,
          template_params: {
            to_email: to,
            subject,
            message: text,
            message_html: text,
            from_email: FROM_EMAIL,
          },
        }),
      });
      if (!res.ok) {
        const body = await res.text().catch(() => '');
        LAST_EMAIL_ERROR = { provider: 'emailjs', status: res.status, body };
        LAST_EMAIL_ATTEMPT.tried.push({ provider: 'emailjs', ok: false });
      } else {
        LAST_EMAIL_ERROR = null;
        LAST_EMAIL_ATTEMPT.tried.push({ provider: 'emailjs', ok: true });
        return true;
      }
    } catch {
      LAST_EMAIL_ERROR = { provider: 'emailjs', error: 'network_error' };
      LAST_EMAIL_ATTEMPT.tried.push({ provider: 'emailjs', ok: false });
    }
  }
  // Fallback to Resend if configured
  if (RESEND_API_KEY) {
    try {
      // Lightweight fetch to Resend HTTP API
      const res = await fetch('https://api.resend.com/emails', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${RESEND_API_KEY}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ from: FROM_EMAIL, to, subject, text })
      });
      if (!res.ok) {
        const body = await res.text().catch(() => '');
        LAST_EMAIL_ERROR = { provider: 'resend', status: res.status, body };
        LAST_EMAIL_ATTEMPT.tried.push({ provider: 'resend', ok: false });
      } else {
        LAST_EMAIL_ERROR = null;
        LAST_EMAIL_ATTEMPT.tried.push({ provider: 'resend', ok: true });
        return true;
      }
    } catch {
      LAST_EMAIL_ERROR = { provider: 'resend', error: 'network_error' };
      LAST_EMAIL_ATTEMPT.tried.push({ provider: 'resend', ok: false });
    }
  }
  // Fallback to SMTP if configured
  if (SMTP_HOST && SMTP_USER && SMTP_PASS) {
    try {
      const transporter = nodemailer.createTransport({
        host: SMTP_HOST,
        port: SMTP_PORT,
        secure: SMTP_PORT === 465,
        auth: { user: SMTP_USER, pass: SMTP_PASS }
      });
      await transporter.sendMail({ from: FROM_EMAIL, to, subject, text });
      LAST_EMAIL_ERROR = null;
      LAST_EMAIL_ATTEMPT.tried.push({ provider: 'smtp', ok: true });
      return true;
    } catch {
      LAST_EMAIL_ERROR = { provider: 'smtp', error: 'smtp_error' };
      LAST_EMAIL_ATTEMPT.tried.push({ provider: 'smtp', ok: false });
    }
  }
  return false;
}

function getEmailDiagnostics() {
  return {
    provider: provider(),
    emailjsConfigured: Boolean(EMAILJS_SERVICE_ID && EMAILJS_TEMPLATE_ID && EMAILJS_PUBLIC_KEY),
    smtpConfigured: Boolean(SMTP_HOST && SMTP_USER && SMTP_PASS),
    from: FROM_EMAIL,
    adminEmail: process.env.ADMIN_EMAIL || 'admin@maison.com',
    lastError: LAST_EMAIL_ERROR,
    lastAttempt: LAST_EMAIL_ATTEMPT
  };
}

module.exports = { sendEmail, getEmailDiagnostics };



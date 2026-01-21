import sgMail from '@sendgrid/mail';
import { ENV } from '../lib/env.js';

// Configure SendGrid
if (!ENV.SENDGRID_API_KEY) {
  console.error('SENDGRID_API_KEY is not set. Email delivery will not work.');
} else {
  sgMail.setApiKey(ENV.SENDGRID_API_KEY);
}

const sendMail = async ({ to, subject, text, html }) => {
  const msg = {
    to,
    from: ENV.SMTP_USER,
    subject,
    text,
    html
  };

  try {
    const result = await sgMail.send(msg);
    console.log('sendMail sent:', (result && result[0] && result[0].statusCode) || 'ok');
    return result;
  } catch (err) {
    console.error('sendMail failed:', err && err.message ? err.message : err);
    throw err;
  }
};

const forgetPasswordTemplate = (name, token) => `
  <h1>Hello ${name}</h1>
  <h3>Please click on the link below to reset your SilkRoad account password</h3>
  <a href="${ENV.CORS_ORIGIN}/reset-password?token=${token}">Reset Password</a>
  <p>This link will expire in 1 hour</p>
  <p>If you did not request for password reset, please ignore this email</p>
  <p>Thank you!</p>
`;

export { sendMail, forgetPasswordTemplate };
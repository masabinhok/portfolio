import nodemailer from 'nodemailer';

// Gmail Configuration
export const gmailTransporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS, // Use App Password
  },
});


// Email Templates
export const emailTemplates = {
  jobOffer: (recruiter: string, offerMessage: string) => ({
    subject: `Job Offer: Backend Developer Position`,
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h1 style="color: #2563eb;">Congratulations! 🎉</h1>
        <p>Dear Sabin Shrestha,</p>
        <p>We are pleased to offer you the position of <strong>Backend Developer</strong></p>
        
        <div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 20px; border-radius: 8px; margin: 20px 0;">
          <p style="margin: 5px 0;">${offerMessage}</p>
        </div>
        
        <p>We look forward to welcoming you to our team!</p>
        <p>Best regards,<br>${recruiter}</p>
      </div>
    `,
  }),
};
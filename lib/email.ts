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
  
  contact: (name: string, email: string, message: string) => ({
    subject: `New Contact Form Message from ${name}`,
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
        <h1 style="color: #059669;">New Contact Message 📨</h1>
        <p>Hello Sabin,</p>
        <p>You have received a new message through your portfolio contact form:</p>
        
        <div style="background: #f0fdf4; border-left: 4px solid #059669; padding: 20px; margin: 20px 0; border-radius: 4px;">
          <h3 style="margin-top: 0; color: #065f46;">Contact Details:</h3>
          <p><strong>Name:</strong> ${name}</p>
          <p><strong>Email:</strong> ${email}</p>
          <p><strong>Message:</strong></p>
          <div style="background: white; padding: 15px; border-radius: 6px; border: 1px solid #d1fae5;">
            ${message.replace(/\n/g, '<br>')}
          </div>
        </div>
        
        <p style="color: #6b7280; font-size: 14px;">
          This message was sent from your portfolio website contact form.
        </p>
      </div>
    `,
  }),
};
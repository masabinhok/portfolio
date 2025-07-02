// app/api/send-email/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { gmailTransporter, emailTemplates } from '../../../lib/email';

export async function POST(request: NextRequest) {
  try {
    const { to, type, data } = await request.json();

    let emailContent;
    
    switch (type) {
      case 'job-offer':
        emailContent = emailTemplates.jobOffer(data.recruiter, data.offerMessage);
        break;
      case 'contact':
        emailContent = emailTemplates.contact(data.name, data.email, data.message);
        break;
      default:
        return NextResponse.json({ message: 'Invalid email type' }, { status: 400 });
    }

    const mailOptions = {
      from: process.env.EMAIL_FROM,
      to: to,
      subject: emailContent.subject,
      html: emailContent.html,
    };

    const info = await gmailTransporter.sendMail(mailOptions);
    
    return NextResponse.json({ 
      message: 'Email sent successfully', 
      messageId: info.messageId 
    });
  } catch (error) {
    console.error('Email sending error:', error);
    return NextResponse.json({ 
      message: 'Failed to send email', 
      error: error instanceof Error ? error.message : 'Unknown error' 
    }, { status: 500 });
  }
}
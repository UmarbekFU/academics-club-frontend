import nodemailer from 'nodemailer';
import { ApiErrorHandler } from './error-handler';

// Email configuration
const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST || 'smtp.gmail.com',
  port: parseInt(process.env.SMTP_PORT || '587'),
  secure: process.env.SMTP_SECURE === 'true',
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});

// Email templates
const emailTemplates = {
  applicationConfirmation: (data: {
    name: string;
    program: string;
  }) => ({
    subject: 'Application Received - The Academics Club',
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2 style="color: #002445;">Thank You for Your Application!</h2>
        <p>Dear ${data.name},</p>
        <p>We have received your application for our <strong>${data.program}</strong> program.</p>
        <p>Our team will review your application and contact you within 24 hours to discuss your goals and how we can help you succeed.</p>
        <p>In the meantime, feel free to explore our <a href="${process.env.NEXT_PUBLIC_SITE_URL}/resources">free resources</a> to get started.</p>
        <p>Best regards,<br>The Academics Club Team</p>
      </div>
    `,
  }),
  
  newsletterWelcome: (email: string) => ({
    subject: 'Welcome to The Academics Club Newsletter!',
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2 style="color: #002445;">Welcome to Our Newsletter!</h2>
        <p>Thank you for subscribing to The Academics Club newsletter.</p>
        <p>You'll receive weekly tips on:</p>
        <ul>
          <li>College essay writing strategies</li>
          <li>Admissions insights from former officers</li>
          <li>Success stories from our students</li>
          <li>Exclusive resources and templates</li>
        </ul>
        <p>Your first essay tip is coming soon!</p>
        <p>Best regards,<br>The Academics Club Team</p>
      </div>
    `,
  }),
  
  adminNotification: (data: {
    name: string;
    email: string;
    program: string;
    message?: string;
  }) => ({
    subject: 'New Application Received - The Academics Club',
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2 style="color: #002445;">New Application Received</h2>
        <p><strong>Name:</strong> ${data.name}</p>
        <p><strong>Email:</strong> ${data.email}</p>
        <p><strong>Program:</strong> ${data.program}</p>
        ${data.message ? `<p><strong>Message:</strong> ${data.message}</p>` : ''}
        <p>Please review this application in the admin dashboard.</p>
      </div>
    `,
  }),
};

// Email service class
export class EmailService {
  static async sendApplicationConfirmation(data: {
    name: string;
    email: string;
    program: string;
  }) {
    try {
      const template = emailTemplates.applicationConfirmation(data);
      
      await transporter.sendMail({
        from: process.env.SMTP_FROM || process.env.SMTP_USER,
        to: data.email,
        ...template,
      });
      
      console.log(`Application confirmation sent to ${data.email}`);
    } catch (error) {
      console.error('Failed to send application confirmation:', error);
      throw new Error('Failed to send confirmation email');
    }
  }
  
  static async sendNewsletterWelcome(email: string) {
    try {
      const template = emailTemplates.newsletterWelcome(email);
      
      await transporter.sendMail({
        from: process.env.SMTP_FROM || process.env.SMTP_USER,
        to: email,
        ...template,
      });
      
      console.log(`Newsletter welcome sent to ${email}`);
    } catch (error) {
      console.error('Failed to send newsletter welcome:', error);
      throw new Error('Failed to send welcome email');
    }
  }
  
  static async sendAdminNotification(data: {
    name: string;
    email: string;
    program: string;
    message?: string;
  }) {
    try {
      const template = emailTemplates.adminNotification(data);
      const adminEmail = process.env.ADMIN_EMAIL || process.env.SMTP_USER;
      
      if (!adminEmail) {
        console.warn('No admin email configured for notifications');
        return;
      }
      
      await transporter.sendMail({
        from: process.env.SMTP_FROM || process.env.SMTP_USER,
        to: adminEmail,
        ...template,
      });
      
      console.log(`Admin notification sent for application from ${data.email}`);
    } catch (error) {
      console.error('Failed to send admin notification:', error);
      // Don't throw error for admin notifications to avoid breaking the main flow
    }
  }
  
  static async sendBulkNewsletter(emails: string[], subject: string, content: string) {
    try {
      const promises = emails.map(email => 
        transporter.sendMail({
          from: process.env.SMTP_FROM || process.env.SMTP_USER,
          to: email,
          subject,
          html: content,
        })
      );
      
      await Promise.all(promises);
      console.log(`Bulk newsletter sent to ${emails.length} subscribers`);
    } catch (error) {
      console.error('Failed to send bulk newsletter:', error);
      throw new Error('Failed to send newsletter');
    }
  }
  
  static async testConnection(): Promise<boolean> {
    try {
      await transporter.verify();
      return true;
    } catch (error) {
      console.error('Email service connection failed:', error);
      return false;
    }
  }
}

// Email validation
export function validateEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return emailRegex.test(email) && email.length <= 255
}

// Rate limiting for email sending
const emailRateLimit = new Map<string, { count: number; resetTime: number }>()

export function checkEmailRateLimit(email: string): boolean {
  const now = Date.now()
  const key = `email:${email}`
  const current = emailRateLimit.get(key)
  
  if (!current || now > current.resetTime) {
    emailRateLimit.set(key, { count: 1, resetTime: now + 60 * 60 * 1000 }) // 1 hour
    return true
  }
  
  if (current.count >= 5) { // Max 5 emails per hour per email
    return false
  }
  
  current.count++
  emailRateLimit.set(key, current)
  return true
}

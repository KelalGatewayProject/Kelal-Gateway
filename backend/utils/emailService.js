const nodemailer = require("nodemailer");
const dotenv = require("dotenv");

dotenv.config();

// Create reusable transporter object using SMTP transport
const transporter = nodemailer.createTransport({
  host: process.env.EMAIL_HOST || "smtp.gmail.com",
  port: process.env.EMAIL_PORT || 587,
  secure: process.env.EMAIL_SECURE === "true", // true for 465, false for other ports
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASSWORD,
  },
});

// Verify connection configuration
transporter.verify(function (error, success) {
  if (error) {
    console.log("Email service error:", error);
  } else {
    console.log("Email server is ready to send messages");
  }
});

/**
 * Send an email
 * @param {Object} options - Email options
 * @param {string} options.to - Recipient email
 * @param {string} options.subject - Email subject
 * @param {string} options.text - Plain text version of the message
 * @param {string} options.html - HTML version of the message
 */
const sendEmail = async (options) => {
  try {
    // Send mail with defined transport object
    const info = await transporter.sendMail({
      from: `"${process.env.EMAIL_FROM_NAME || "Ticket System"}" <${process.env.EMAIL_FROM || "noreply@ticketsystem.com"}>`,
      to: options.to,
      subject: options.subject,
      text: options.text,
      html: options.html,
    });

    console.log("Message sent: %s", info.messageId);
    return info;
  } catch (error) {
    console.error("Error sending email:", error);
    throw error;
  }
};

/**
 * Send a verification email
 * @param {string} email - User's email
 * @param {string} name - User's name
 * @param {string} token - Verification token
 */
const sendVerificationEmail = async (email, name, token) => {
  const verificationUrl = `${process.env.FRONTEND_URL || "http://localhost:5173"}/verify-email?token=${token}`;

  const html = `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
      <h2>Verify Your Email Address</h2>
      <p>Hello ${name},</p>
      <p>Thank you for registering with our Ticket System. Please verify your email address by clicking the button below:</p>
      <div style="text-align: center; margin: 30px 0;">
        <a href="${verificationUrl}" style="background-color: #4CAF50; color: white; padding: 12px 24px; text-decoration: none; border-radius: 4px; font-weight: bold;">Verify Email</a>
      </div>
      <p>If the button doesn't work, you can also copy and paste the following link into your browser:</p>
      <p>${verificationUrl}</p>
      <p>This link will expire in 24 hours.</p>
      <p>If you didn't create an account, you can safely ignore this email.</p>
      <p>Best regards,<br>The Ticket System Team</p>
    </div>
  `;

  return sendEmail({
    to: email,
    subject: "Verify Your Email Address",
    text: `Hello ${name}, please verify your email by visiting: ${verificationUrl}`,
    html,
  });
};

/**
 * Send a password reset email
 * @param {string} email - User's email
 * @param {string} name - User's name
 * @param {string} token - Reset token
 */
const sendPasswordResetEmail = async (email, name, token) => {
  const resetUrl = `${process.env.FRONTEND_URL || "http://localhost:5173"}/reset-password?token=${token}`;

  const html = `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
      <h2>Reset Your Password</h2>
      <p>Hello ${name},</p>
      <p>You requested a password reset. Please click the button below to set a new password:</p>
      <div style="text-align: center; margin: 30px 0;">
        <a href="${resetUrl}" style="background-color: #4CAF50; color: white; padding: 12px 24px; text-decoration: none; border-radius: 4px; font-weight: bold;">Reset Password</a>
      </div>
      <p>If the button doesn't work, you can also copy and paste the following link into your browser:</p>
      <p>${resetUrl}</p>
      <p>This link will expire in 1 hour.</p>
      <p>If you didn't request a password reset, you can safely ignore this email.</p>
      <p>Best regards,<br>The Ticket System Team</p>
    </div>
  `;

  return sendEmail({
    to: email,
    subject: "Reset Your Password",
    text: `Hello ${name}, please reset your password by visiting: ${resetUrl}`,
    html,
  });
};

/**
 * Send a ticket purchase confirmation email
 * @param {string} email - User's email
 * @param {string} name - User's name
 * @param {Object} ticket - Ticket details
 * @param {Object} event - Event details
 */
const sendTicketPurchaseEmail = async (email, name, ticket, event) => {
  const ticketUrl = `${process.env.FRONTEND_URL || "http://localhost:5173"}/tickets/${ticket._id}`;

  const html = `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
      <h2>Ticket Purchase Confirmation</h2>
      <p>Hello ${name},</p>
      <p>Thank you for purchasing a ticket for <strong>${event.title}</strong>.</p>
      <div style="background-color: #f8f9fa; border-radius: 8px; padding: 20px; margin: 20px 0;">
        <h3 style="margin-top: 0;">Event Details</h3>
        <p><strong>Event:</strong> ${event.title}</p>
        <p><strong>Date:</strong> ${new Date(event.startDate).toLocaleDateString()} at ${event.startTime}</p>
        <p><strong>Location:</strong> ${event.venue}</p>
        <p><strong>Ticket Type:</strong> ${ticket.type}</p>
        <p><strong>Ticket ID:</strong> ${ticket._id}</p>
      </div>
      <div style="text-align: center; margin: 30px 0;">
        <a href="${ticketUrl}" style="background-color: #4CAF50; color: white; padding: 12px 24px; text-decoration: none; border-radius: 4px; font-weight: bold;">View Ticket</a>
      </div>
      <p>You can access your ticket at any time by logging into your account.</p>
      <p>We look forward to seeing you at the event!</p>
      <p>Best regards,<br>The Ticket System Team</p>
    </div>
  `;

  return sendEmail({
    to: email,
    subject: `Ticket Confirmation: ${event.title}`,
    text: `Hello ${name}, thank you for purchasing a ticket for ${event.title}. Your ticket ID is ${ticket._id}. View your ticket at: ${ticketUrl}`,
    html,
  });
};

/**
 * Send an event update email
 * @param {string} email - User's email
 * @param {string} name - User's name
 * @param {Object} event - Event details
 * @param {string} updateType - Type of update (e.g., 'cancelled', 'rescheduled', 'updated')
 * @param {string} message - Custom message about the update
 */
const sendEventUpdateEmail = async (
  email,
  name,
  event,
  updateType,
  message,
) => {
  const eventUrl = `${process.env.FRONTEND_URL || "http://localhost:5173"}/events/${event._id}`;

  let subject = `Event Update: ${event.title}`;
  if (updateType === "cancelled") {
    subject = `Event Cancelled: ${event.title}`;
  } else if (updateType === "rescheduled") {
    subject = `Event Rescheduled: ${event.title}`;
  }

  const html = `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
      <h2>Event Update: ${event.title}</h2>
      <p>Hello ${name},</p>
      <p>We're writing to inform you about an update to an event you're registered for.</p>
      <div style="background-color: #f8f9fa; border-radius: 8px; padding: 20px; margin: 20px 0;">
        <h3 style="margin-top: 0;">Event Details</h3>
        <p><strong>Event:</strong> ${event.title}</p>
        <p><strong>Date:</strong> ${new Date(event.startDate).toLocaleDateString()} at ${event.startTime}</p>
        <p><strong>Location:</strong> ${event.venue}</p>
        <p><strong>Update Type:</strong> ${updateType.charAt(0).toUpperCase() + updateType.slice(1)}</p>
        <p><strong>Message:</strong> ${message}</p>
      </div>
      <div style="text-align: center; margin: 30px 0;">
        <a href="${eventUrl}" style="background-color: #4CAF50; color: white; padding: 12px 24px; text-decoration: none; border-radius: 4px; font-weight: bold;">View Event Details</a>
      </div>
      <p>If you have any questions, please contact the event organizer.</p>
      <p>Best regards,<br>The Ticket System Team</p>
    </div>
  `;

  return sendEmail({
    to: email,
    subject,
    text: `Hello ${name}, there has been an update to the event ${event.title}. Update type: ${updateType}. Message: ${message}. View event details at: ${eventUrl}`,
    html,
  });
};

module.exports = {
  sendEmail,
  sendVerificationEmail,
  sendPasswordResetEmail,
  sendTicketPurchaseEmail,
  sendEventUpdateEmail,
};

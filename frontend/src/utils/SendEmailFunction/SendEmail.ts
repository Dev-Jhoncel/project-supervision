import nodemailer, { TransportOptions } from "nodemailer";
import {
  EMAIL_HOST,
  EMAIL_PASS,
  EMAIL_PORT,
  EMAIL_USER,
  EMAIL_SECURE,
  EMAIL_FROM,
} from "@/constants/config";

const transporter = nodemailer.createTransport({
  host: EMAIL_HOST,
  port: EMAIL_PORT,
  secure: EMAIL_SECURE,
  auth: {
    user: EMAIL_USER,
    pass: EMAIL_PASS,
  },
} as TransportOptions);

export const SendEmail = async (options: {
  to: string;
  subject: string;
  text: string;
  html?: string;
}) => {
  try {
    await transporter.sendMail({
      from: EMAIL_FROM, // Replace with your email address
      to: options.to,
      subject: options.subject,
      text: options.text,
      html: options.html, // Optional: you can send HTML-formatted emails
    });
    console.log("Email sent successfully");
  } catch (error) {
    console.error("Error sending email:", error);
    throw error;
  }
};

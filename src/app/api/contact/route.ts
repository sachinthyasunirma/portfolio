// app/api/contact/route.ts
import { NextRequest, NextResponse } from "next/server";
import nodemailer from "nodemailer";

export async function POST(request: NextRequest) {
  console.log("🔵 API route called via POST");

  try {
    const body = await request.json();
    console.log("📨 Form data received:", body);

    const { name, email, message } = body;

    // Validate required fields
    if (!name || !email || !message) {
      console.log("❌ Missing required fields");
      return NextResponse.json(
        {
          error:
            "Missing required fields: name, email, and message are required",
        },
        { status: 400 }
      );
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: "Invalid email format" },
        { status: 400 }
      );
    }

    console.log("✅ Validation passed");

    // Check if environment variables are set
    if (
      !process.env.SMTP_HOST ||
      !process.env.SMTP_USER ||
      !process.env.SMTP_PASS
    ) {
      console.error("❌ Missing SMTP environment variables");
      return NextResponse.json(
        { error: "Email service not configured" },
        { status: 500 }
      );
    }

    console.log("📧 Attempting to send email...");

    // Create email transporter
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: Number(process.env.SMTP_PORT) || 587,
      secure: process.env.SMTP_SECURE === "true",
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    });

    // Verify connection configuration
    await transporter.verify();
    console.log("✅ SMTP connection verified");

    const toEmail = process.env.TO_EMAIL || "ssrathnavibushana@gmail.com";
    const fromEmail = process.env.FROM_EMAIL || process.env.SMTP_USER;

    const mailOptions = {
      from: `"${name}" <${fromEmail}>`,
      replyTo: email,
      to: toEmail,
      subject: `New contact form message from ${name}`,
      text: `Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`,
      html: `
      <div style="
        background: #ffffff;
        border: 1px solid #e0e0e0;
        border-radius: 8px;
        padding: 30px;
        font-family: 'Inter', 'Segoe UI', sans-serif;
        max-width: 600px;
        margin: 20px auto;
      ">
      <div style="text-align: center; margin-bottom: 30px;">
        <div style="
          background: #2563eb;
          color: white;
          padding: 10px 20px;
          border-radius: 6px;
          display: inline-block;
          font-weight: 600;
          font-size: 18px;
        ">
      📨 New Contact Form Submission
      </div>
      </div>
  </div>

  <table style="width: 100%; border-collapse: collapse;">
    <tr>
      <td style="padding: 12px; background: #f8fafc; border: 1px solid #e2e8f0;">
        <strong>Name:</strong>
      </td>
      <td style="padding: 12px; border: 1px solid #e2e8f0;">
        ${name}
      </td>
    </tr>
    <tr>
      <td style="padding: 12px; background: #f8fafc; border: 1px solid #e2e8f0;">
        <strong>Email:</strong>
      </td>
      <td style="padding: 12px; border: 1px solid #e2e8f0;">
        <a href="mailto:${email}" style="color: #2563eb; text-decoration: none;">
          ${email}
        </a>
      </td>
    </tr>
    <tr>
      <td colspan="2" style="padding: 12px; background: #f8fafc; border: 1px solid #e2e8f0;">
        <strong>Message:</strong>
      </td>
    </tr>
    <tr>
      <td colspan="2" style="padding: 20px; border: 1px solid #e2e8f0; line-height: 1.6;">
        ${message.replace(/\n/g, "<br/>")}
      </td>
    </tr>
  </table>

  <div style="
    margin-top: 25px;
    padding: 15px;
    background: #f0f9ff;
    border-radius: 6px;
    border-left: 4px solid #2563eb;
    font-size: 14px;
    color: #475569;
  ">
    <strong>⏰ Received:</strong> ${new Date().toLocaleString()} 
    <br>
    <strong>🔗 Source:</strong> Portfolio Website Contact Form
  </div>
</div>
      `,
    };

    // Send email
    const info = await transporter.sendMail(mailOptions);
    console.log("✅ Email sent successfully! Message ID:", info.messageId);

    return NextResponse.json({
      ok: true,
      message: "Message sent successfully!",
    });
  } catch (error: any) {
    console.error("❌ Error:", error);

    // More specific error messages
    if (error.code === "EAUTH") {
      return NextResponse.json(
        { error: "Email authentication failed - check your credentials" },
        { status: 500 }
      );
    } else if (error.code === "ECONNECTION") {
      return NextResponse.json(
        { error: "Cannot connect to email server" },
        { status: 500 }
      );
    } else {
      return NextResponse.json(
        { error: "Failed to send message: " + error.message },
        { status: 500 }
      );
    }
  }
}

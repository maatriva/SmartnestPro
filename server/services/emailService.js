import { Resend } from "resend";
import dotenv from "dotenv";

// Initialize Resend lazily or using current env
const getResendClient = () => {
  // Freshly reload .env in case user updated it while server is running
  dotenv.config({ override: true });
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey || apiKey.trim() === "" || apiKey === "re_your_api_key_here") {
    return null;
  }
  return new Resend(apiKey);
};

// Sanitize & format sender
const getFromEmail = () => {
  const customFrom = process.env.EMAIL_FROM?.trim();
  if (customFrom) {
    return customFrom.includes("<") && customFrom.includes(">")
      ? customFrom
      : `Maatriva <${customFrom}>`;
  }
  return "Maatriva <onboarding@resend.dev>";
};

// Admin recipient
const getAdminEmail = () => {
  return process.env.ADMIN_EMAIL?.trim() || "admin@maatriva.co.in";
};

// Base HTML wrapper with Maatriva MedTech styling
const renderBaseTemplate = ({ title, preheader, content }) => {
  return `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${title}</title>
  <style>
    body {
      margin: 0;
      padding: 0;
      background-color: #f8fafc;
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;
      color: #1e293b;
      -webkit-font-smoothing: antialiased;
    }
    .wrapper {
      width: 100%;
      background-color: #f8fafc;
      padding: 36px 16px;
    }
    .container {
      max-width: 580px;
      margin: 0 auto;
      background-color: #ffffff;
      border-radius: 16px;
      overflow: hidden;
      border: 1px solid #e2e8f0;
      box-shadow: 0 4px 14px rgba(0, 0, 0, 0.04);
    }
    .header {
      background: linear-gradient(135deg, #4f46e5 0%, #5A78D6 100%);
      padding: 32px 36px;
      text-align: center;
    }
    .logo {
      color: #ffffff;
      font-size: 24px;
      font-weight: 700;
      letter-spacing: 0.5px;
      margin: 0;
    }
    .tagline {
      color: rgba(255, 255, 255, 0.85);
      font-size: 13px;
      margin-top: 6px;
      margin-bottom: 0;
      font-weight: 400;
    }
    .body-content {
      padding: 36px 36px 28px;
    }
    .heading {
      color: #0f172a;
      font-size: 20px;
      font-weight: 700;
      margin: 0 0 16px;
    }
    .paragraph {
      color: #475569;
      font-size: 15px;
      line-height: 1.6;
      margin: 0 0 16px;
    }
    .data-card {
      background-color: #f8fafc;
      border: 1px solid #e2e8f0;
      border-radius: 12px;
      padding: 18px 20px;
      margin: 20px 0;
    }
    .data-row {
      display: flex;
      padding: 8px 0;
      border-bottom: 1px solid #edf2f7;
      font-size: 14px;
    }
    .data-row:last-child {
      border-bottom: none;
    }
    .data-label {
      font-weight: 600;
      color: #334155;
      width: 140px;
      min-width: 140px;
    }
    .data-value {
      color: #0f172a;
      word-break: break-word;
    }
    .badge {
      display: inline-block;
      padding: 4px 10px;
      border-radius: 9999px;
      font-size: 12px;
      font-weight: 600;
      background-color: #e0e7ff;
      color: #4338ca;
    }
    .btn {
      display: inline-block;
      background: linear-gradient(135deg, #4f46e5 0%, #5A78D6 100%);
      color: #ffffff !important;
      text-decoration: none;
      padding: 12px 24px;
      border-radius: 10px;
      font-weight: 600;
      font-size: 14px;
      margin-top: 8px;
    }
    .footer {
      background-color: #f1f5f9;
      padding: 24px 36px;
      text-align: center;
      border-top: 1px solid #e2e8f0;
    }
    .footer-text {
      color: #64748b;
      font-size: 12px;
      line-height: 1.5;
      margin: 0;
    }
  </style>
</head>
<body>
  <div style="display:none;font-size:1px;color:#f8fafc;line-height:1px;max-height:0px;max-width:0px;opacity:0;overflow:hidden;">
    ${preheader || title}
  </div>
  <div class="wrapper">
    <div class="container">
      <div class="header">
        <h1 class="logo">MAATRIVA</h1>
        <p class="tagline">Next-Gen AI Healthcare Ecosystem</p>
      </div>
      <div class="body-content">
        ${content}
      </div>
      <div class="footer">
        <p class="footer-text">
          &copy; ${new Date().getFullYear()} Maatriva Healthcare Inc. All rights reserved.<br>
          Transforming maternal & infant healthcare with intelligent technology.<br>
          <a href="https://maatriva.co.in" style="color: #5A78D6; text-decoration: none; font-weight: 600; font-size: 11px;">maatriva.co.in</a> &bull; <a href="mailto:support@maatriva.co.in" style="color: #5A78D6; text-decoration: none; font-weight: 600; font-size: 11px;">support@maatriva.co.in</a>
        </p>
      </div>
    </div>
  </div>
</body>
</html>
  `.trim();
};

/**
 * Generic internal sender with logging and safe fallback
 */
export const sendEmail = async ({ to, subject, html, text }) => {
  const resend = getResendClient();

  if (!resend) {
    console.warn(
      `[Resend Email] Skipping email to <${to}>: RESEND_API_KEY is not configured in .env.`
    );
    return { success: false, skipped: true, error: "RESEND_API_KEY not configured" };
  }

  const from = getFromEmail();

  try {
    const data = await resend.emails.send({
      from,
      to: Array.isArray(to) ? to : [to],
      subject,
      html,
      text: text || subject,
    });

    console.log(`[Resend Email] Email sent successfully to ${to}. ID: ${data?.data?.id || "OK"}`);
    return { success: true, data };
  } catch (err) {
    console.error(`[Resend Email] Failed to send email to ${to}:`, err?.message || err);
    return { success: false, error: err?.message || err };
  }
};

/**
 * 1. Contact Form - Notify Admin & Acknowledge User
 */
export const sendContactEmails = async ({ name, email, organization, message }) => {
  const formattedDate = new Date().toLocaleString("en-US", {
    dateStyle: "medium",
    timeStyle: "short",
  });

  // Admin Notification
  const adminHtml = renderBaseTemplate({
    title: `New Contact Inquiry: ${name}`,
    preheader: `New message received from ${name} on Maatriva`,
    content: `
      <h2 class="heading">New Contact Form Submission</h2>
      <p class="paragraph">A visitor submitted an inquiry through the Maatriva website:</p>
      
      <div class="data-card">
        <div class="data-row">
          <span class="data-label">Sender Name:</span>
          <span class="data-value">${name}</span>
        </div>
        <div class="data-row">
          <span class="data-label">Email:</span>
          <span class="data-value"><a href="mailto:${email}">${email}</a></span>
        </div>
        ${
          organization
            ? `<div class="data-row">
                <span class="data-label">Organization:</span>
                <span class="data-value">${organization}</span>
              </div>`
            : ""
        }
        <div class="data-row">
          <span class="data-label">Received At:</span>
          <span class="data-value">${formattedDate}</span>
        </div>
      </div>

      <div style="margin-top: 16px;">
        <p style="font-weight: 600; color: #334155; margin-bottom: 8px;">Message:</p>
        <div style="background-color: #f1f5f9; padding: 14px 16px; border-radius: 8px; font-size: 14px; line-height: 1.6; color: #1e293b; white-space: pre-wrap;">${message}</div>
      </div>
    `,
  });

  // User Acknowledgment
  const userHtml = renderBaseTemplate({
    title: `We received your message | Maatriva`,
    preheader: `Thank you for reaching out to Maatriva. We will get back to you shortly.`,
    content: `
      <h2 class="heading">Thank You for Contacting Us, ${name}</h2>
      <p class="paragraph">
        We have received your message and our team is already reviewing it.
        We strive to respond to all inquiries within 24 to 48 hours.
      </p>

      <div class="data-card">
        <div class="data-row">
          <span class="data-label">Your Message:</span>
          <span class="data-value" style="font-style: italic;">"${message}"</span>
        </div>
        ${
          organization
            ? `<div class="data-row">
                <span class="data-label">Organization:</span>
                <span class="data-value">${organization}</span>
              </div>`
            : ""
        }
      </div>

      <p class="paragraph">
        In the meantime, feel free to explore our clinical research and device features on our website.
      </p>
    `,
  });

  return Promise.allSettled([
    sendEmail({
      to: getAdminEmail(),
      subject: `[Maatriva Contact] New message from ${name}`,
      html: adminHtml,
      text: `New contact submission from ${name} (${email}): ${message}`,
    }),
    sendEmail({
      to: email,
      subject: `Thank you for contacting Maatriva`,
      html: userHtml,
      text: `Hi ${name}, thank you for reaching out to Maatriva. We have received your inquiry and will respond shortly.`,
    }),
  ]);
};

/**
 * 2. Pre-Order & Enterprise Inquiries - Notify Admin & Confirm Customer
 */
export const sendPreorderEmails = async ({
  name,
  email,
  phone,
  address,
  planName = "Maatriva System",
  planPrice = "",
}) => {
  const isEnterprise = planName?.toLowerCase().includes("enterprise");
  const actionTitle = isEnterprise ? "Enterprise Inquiry" : "Pre-Order";

  // Admin Notification
  const adminHtml = renderBaseTemplate({
    title: `New ${actionTitle}: ${planName}`,
    preheader: `A new ${actionTitle.toLowerCase()} was placed by ${name}`,
    content: `
      <h2 class="heading">🚀 New ${actionTitle} Received</h2>
      <p class="paragraph">A new order/inquiry has been submitted through the pricing portal:</p>
      
      <div class="data-card">
        <div class="data-row">
          <span class="data-label">Plan / Model:</span>
          <span class="data-value"><span class="badge">${planName}</span> ${planPrice ? `(${planPrice})` : ""}</span>
        </div>
        <div class="data-row">
          <span class="data-label">Customer Name:</span>
          <span class="data-value">${name}</span>
        </div>
        <div class="data-row">
          <span class="data-label">Customer Email:</span>
          <span class="data-value"><a href="mailto:${email}">${email}</a></span>
        </div>
        <div class="data-row">
          <span class="data-label">Phone:</span>
          <span class="data-value">${phone || "Not provided"}</span>
        </div>
        <div class="data-row">
          <span class="data-label">Delivery Address:</span>
          <span class="data-value">${address || "Not provided"}</span>
        </div>
      </div>
    `,
  });

  // Customer Confirmation
  const customerHtml = renderBaseTemplate({
    title: `Your ${actionTitle} Confirmation | Maatriva`,
    preheader: `Thank you for your ${actionTitle.toLowerCase()} of ${planName}.`,
    content: `
      <h2 class="heading">${actionTitle} Confirmed, ${name}!</h2>
      <p class="paragraph">
        Thank you for choosing Maatriva. We have registered your ${actionTitle.toLowerCase()} for 
        <strong>${planName}</strong>. Our clinical team and distribution specialists will connect with you
        regarding delivery scheduling and fulfillment details.
      </p>

      <div class="data-card">
        <div class="data-row">
          <span class="data-label">Selected Tier:</span>
          <span class="data-value"><span class="badge">${planName}</span> ${planPrice ? `(${planPrice})` : ""}</span>
        </div>
        <div class="data-row">
          <span class="data-label">Contact Email:</span>
          <span class="data-value">${email}</span>
        </div>
        ${
          phone
            ? `<div class="data-row">
                <span class="data-label">Phone:</span>
                <span class="data-value">${phone}</span>
              </div>`
            : ""
        }
        ${
          address
            ? `<div class="data-row">
                <span class="data-label">Destination:</span>
                <span class="data-value">${address}</span>
              </div>`
            : ""
        }
      </div>

      <p class="paragraph">
        If you need to make changes to your delivery address or contact preferences, simply reply to this email.
      </p>
    `,
  });

  return Promise.allSettled([
    sendEmail({
      to: getAdminEmail(),
      subject: `[Maatriva] New ${actionTitle}: ${planName} - ${name}`,
      html: adminHtml,
      text: `New ${actionTitle} for ${planName} from ${name} (${email}, Phone: ${phone})`,
    }),
    sendEmail({
      to: email,
      subject: `Your Maatriva ${actionTitle} Confirmation`,
      html: customerHtml,
      text: `Hi ${name}, thank you for your ${actionTitle.toLowerCase()} for ${planName}. We have received your order details.`,
    }),
  ]);
};

/**
 * 3. User Welcome Email on Signup
 */
export const sendWelcomeEmail = async ({ name, email, isProfessional = false }) => {
  const welcomeHtml = renderBaseTemplate({
    title: `Welcome to Maatriva`,
    preheader: `Your account is ready. Welcome to the Maatriva healthcare network.`,
    content: `
      <h2 class="heading">Welcome to Maatriva, ${name || "there"}!</h2>
      <p class="paragraph">
        We're thrilled to have you join our next-generation healthcare community. 
        Maatriva combines medical-grade sensory monitoring and predictive AI to safeguard maternal and infant wellness.
      </p>

      <div class="data-card">
        <div class="data-row">
          <span class="data-label">Account Name:</span>
          <span class="data-value">${name || "Maatriva Member"}</span>
        </div>
        <div class="data-row">
          <span class="data-label">Email:</span>
          <span class="data-value">${email}</span>
        </div>
        <div class="data-row">
          <span class="data-label">Account Type:</span>
          <span class="data-value"><span class="badge">${isProfessional ? "Healthcare Professional" : "Parent / Family Member"}</span></span>
        </div>
      </div>

      <p class="paragraph">
        You can now access our clinical disease library, view health monitoring metrics, and participate in our parent community.
      </p>

      <div style="text-align: center; margin-top: 24px;">
        <a href="https://maatriva.co.in" class="btn">Explore Your Portal</a>
      </div>
    `,
  });

  return sendEmail({
    to: email,
    subject: `Welcome to Maatriva | Next-Gen AI Healthcare`,
    html: welcomeHtml,
    text: `Hi ${name}, welcome to Maatriva! Your account (${email}) has been successfully created.`,
  });
};

/**
 * 4. Admin Broadcast / Direct Email Alert
 */
export const sendAdminAlertEmail = async ({
  to,
  recipientName = "",
  subject,
  title,
  message,
  priority = "normal",
}) => {
  const badgeColor =
    priority === "urgent"
      ? { bg: "#fee2e2", text: "#b91c1c", label: "URGENT ALERT" }
      : priority === "info"
      ? { bg: "#e0f2fe", text: "#0369a1", label: "PLATFORM UPDATE" }
      : { bg: "#e0e7ff", text: "#4338ca", label: "OFFICIAL NOTICE" };

  const alertHtml = renderBaseTemplate({
    title: subject,
    preheader: message.slice(0, 100),
    content: `
      <div style="margin-bottom: 20px;">
        <span style="display: inline-block; padding: 4px 12px; border-radius: 9999px; font-size: 11px; font-weight: 700; letter-spacing: 0.5px; background-color: ${badgeColor.bg}; color: ${badgeColor.text};">
          ${badgeColor.label}
        </span>
      </div>

      <h2 class="heading">${title || subject}</h2>
      
      ${recipientName ? `<p class="paragraph" style="font-weight: 600; color: #334155;">Hello ${recipientName},</p>` : ""}

      <div style="background-color: #f8fafc; border: 1px solid #e2e8f0; border-radius: 12px; padding: 20px; margin: 16px 0; font-size: 15px; line-height: 1.7; color: #1e293b; white-space: pre-wrap;">${message}</div>

      <p class="paragraph" style="font-size: 13px; color: #64748b; margin-top: 24px;">
        This communication was dispatched directly by the Maatriva Executive Administration.
        If you have any questions or require support, reply to this message or contact <a href="mailto:support@maatriva.co.in" style="color: #5A78D6;">support@maatriva.co.in</a>.
      </p>
    `,
  });

  return sendEmail({
    to,
    subject: `[Maatriva Alert] ${subject}`,
    html: alertHtml,
    text: `${title || subject}\n\n${recipientName ? `Hello ${recipientName},\n\n` : ""}${message}\n\nThis communication was dispatched directly by the Maatriva Executive Administration. For support, contact support@maatriva.co.in.\n\n— Maatriva Administration`,
  });
};


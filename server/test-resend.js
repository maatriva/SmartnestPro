import dotenv from "dotenv";
dotenv.config();

import { sendEmail } from "./services/emailService.js";

const recipient = process.argv[2] || process.env.ADMIN_EMAIL || "delivered@resend.dev";

console.log("=========================================");
console.log("🚀 Testing Resend Email Integration");
console.log("=========================================");
console.log(`Recipient: ${recipient}`);
console.log(`API Key set: ${process.env.RESEND_API_KEY ? "YES (starts with " + process.env.RESEND_API_KEY.slice(0, 5) + "...)" : "NO"}`);
console.log(`From address: ${process.env.EMAIL_FROM || "Maatriva <onboarding@resend.dev>"}`);
console.log("-----------------------------------------");

if (!process.env.RESEND_API_KEY) {
  console.error("❌ RESEND_API_KEY is not set in server/.env!");
  console.log("Please add your key to server/.env like this:\n  RESEND_API_KEY=re_xxxxxxxx\n");
  process.exit(1);
}

const testHtml = `
  <div style="font-family: sans-serif; padding: 20px; color: #1e293b;">
    <h2 style="color: #5A78D6;">✨ Resend Integration Test Successful</h2>
    <p>This is a test email from the Maatriva website backend.</p>
    <p>Timestamp: <strong>${new Date().toISOString()}</strong></p>
    <hr style="border: 0; border-top: 1px solid #e2e8f0; margin: 20px 0;" />
    <p style="font-size: 12px; color: #64748b;">Maatriva AI Healthcare Platform</p>
  </div>
`;

async function run() {
  console.log("Sending test email...");
  const result = await sendEmail({
    to: recipient,
    subject: "Test Email from Maatriva Website",
    html: testHtml,
    text: "Test email from Maatriva Website. Resend is properly configured!",
  });

  if (result.success) {
    console.log("✅ Success! Email sent. ID:", result.data?.data?.id || result.data?.id || "OK");
  } else {
    console.error("❌ Failed to send email:", result.error);
    if (result.skipped) {
      console.log("Tip: Check your server/.env file and ensure RESEND_API_KEY is present.");
    }
  }
}

run();

import pool from "../db.js";
import { sendAdminAlertEmail } from "../services/emailService.js";

export const getAdminStats = async (req, res) => {
  try {
    // Check if requester is admin
    const userResult = await pool.query("SELECT is_admin FROM users WHERE id = $1", [req.user.id]);
    if (!userResult.rows[0]?.is_admin) {
      return res.status(403).json({ error: "Unauthorized. Admin access only." });
    }

    // 1. Get all users (including is_professional role tag)
    const usersResult = await pool.query(
      "SELECT id, name, email, is_admin, is_professional, created_at FROM users ORDER BY created_at DESC"
    );

    // 2. Get all surveys
    const surveysResult = await pool.query(`
      SELECT s.id, s.name, s.email, s.phone, s.gender, s.answers, s.created_at 
      FROM surveys s 
      ORDER BY s.created_at DESC
    `);

    // 3. Get all preorders
    const preordersResult = await pool.query(`
      SELECT * FROM preorders ORDER BY created_at DESC
    `);

    // 4. Get all contacts
    const contactsResult = await pool.query(`
      SELECT * FROM contacts ORDER BY created_at DESC
    `);

    // 5. Get login/registration stats for the last 14 days
    const loginStats = await pool.query(`
      SELECT DATE(created_at) as date, COUNT(*) as count 
      FROM users 
      GROUP BY DATE(created_at) 
      ORDER BY date DESC 
      LIMIT 14
    `);

    res.json({
      totalUsers: usersResult.rows.length,
      users: usersResult.rows,
      surveys: surveysResult.rows,
      preorders: preordersResult.rows,
      contacts: contactsResult.rows,
      loginStats: loginStats.rows,
    });
  } catch (error) {
    console.error("Admin Stats Error:", error);
    res.status(500).json({ error: "Failed to fetch admin stats" });
  }
};

export const sendAdminAlert = async (req, res) => {
  try {
    // Check if requester is admin
    const userResult = await pool.query("SELECT is_admin FROM users WHERE id = $1", [req.user.id]);
    if (!userResult.rows[0]?.is_admin) {
      return res.status(403).json({ error: "Unauthorized. Admin access only." });
    }

    const { target, to, subject, title, message, priority, recipientName } = req.body;

    if (!subject?.trim() || !message?.trim()) {
      return res.status(400).json({ error: "Subject and Message are required fields." });
    }

    let recipients = [];

    if (target === "all_users") {
      const usersRes = await pool.query("SELECT DISTINCT email, name FROM users WHERE email IS NOT NULL AND email != ''");
      recipients = usersRes.rows;
    } else if (target === "all_preorders") {
      const ordersRes = await pool.query("SELECT DISTINCT email, name FROM preorders WHERE email IS NOT NULL AND email != ''");
      recipients = ordersRes.rows;
    } else if (target === "all_contacts") {
      const contactsRes = await pool.query("SELECT DISTINCT email, name FROM contacts WHERE email IS NOT NULL AND email != ''");
      recipients = contactsRes.rows;
    } else {
      // Direct individual recipient
      if (!to || !to.trim()) {
        return res.status(400).json({ error: "Recipient email is required for direct alert." });
      }
      recipients = [{ email: to.trim(), name: recipientName?.trim() || "" }];
    }

    if (recipients.length === 0) {
      return res.status(400).json({ error: "No recipients found for the selected audience." });
    }

    const results = await Promise.allSettled(
      recipients.map((r) =>
        sendAdminAlertEmail({
          to: r.email,
          recipientName: r.name,
          subject: subject.trim(),
          title: title?.trim() || subject.trim(),
          message: message.trim(),
          priority: priority || "normal",
        })
      )
    );

    const successful = results.filter((r) => r.status === "fulfilled" && r.value?.success).length;
    const skipped = results.filter((r) => r.status === "fulfilled" && r.value?.skipped).length;
    const failed = results.filter(
      (r) => r.status === "rejected" || (r.status === "fulfilled" && !r.value?.success && !r.value?.skipped)
    ).length;

    let responseMessage = `Alert dispatched to ${recipients.length} recipient(s).`;
    if (skipped > 0) {
      responseMessage += ` Note: ${skipped} email(s) were skipped because RESEND_API_KEY is not configured in server/.env.`;
    }

    res.json({
      success: true,
      total: recipients.length,
      successful,
      skipped,
      failed,
      message: responseMessage,
    });
  } catch (error) {
    console.error("Admin Send Alert Error:", error);
    res.status(500).json({ error: "Failed to send alert", detail: error.message });
  }
};

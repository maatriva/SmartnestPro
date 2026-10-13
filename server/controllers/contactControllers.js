import pool from "../db.js";
import { validateEmail } from "../utils/validation.js";
import { sendContactEmails } from "../services/emailService.js";

export const createContact = async (req, res) => {
  const { name, email, message, organization } = req.body;

  if (!validateEmail(email)) {
    return res.status(400).json({ error: "Invalid email format" });
  }

  try {
    const result = await pool.query(
      "INSERT INTO contacts (name, email, message, organization) VALUES ($1, $2, $3, $4) RETURNING *",
      [name, email, message, organization]
    );

    // Asynchronously dispatch Resend emails without blocking response
    sendContactEmails({ name, email, message, organization }).catch((err) => {
      console.error("[Contact Controller] Email dispatch error:", err);
    });

    res.json(result.rows[0]);
  } catch (error) {
    console.error("Error saving contact:", error);
    res.status(500).json({ error: "Failed to save contact" });
  }
};


import pool from "../db.js";
import { validateEmail } from "../utils/validation.js";
import { sendPreorderEmails } from "../services/emailService.js";

export const createPreorder = async (req, res) => {
  const { name, email, phone, address, planName, planPrice } = req.body;

  if (!validateEmail(email)) {
    return res.status(400).json({ error: "Invalid email format" });
  }

  try {
    const result = await pool.query(
      "INSERT INTO preorders (name, email, phone, address) VALUES ($1, $2, $3, $4) RETURNING *",
      [name, email, phone, address]
    );

    // Asynchronously dispatch Resend emails without blocking response
    sendPreorderEmails({ name, email, phone, address, planName, planPrice }).catch((err) => {
      console.error("[Preorder Controller] Email dispatch error:", err);
    });

    res.json(result.rows[0]);
  } catch (error) {
    console.error("Error saving preorder:", error);
    res.status(500).json({ error: "Failed to save preorder" });
  }
};

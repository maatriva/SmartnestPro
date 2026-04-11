import pool from "../db.js";

export const createContact = async (req, res) => {
  const { name, email, message, rating, category } = req.body;

  try {
    const result = await pool.query(
      "INSERT INTO contacts (name, email, message, rating, category) VALUES ($1, $2, $3, $4, $5) RETURNING *",
      [name, email, message, rating, category]
    );

    res.json(result.rows[0]);
  } catch (error) {
    console.error("Error saving contact:", error);
    res.status(500).json({ error: "Failed to save contact" });
  }
};


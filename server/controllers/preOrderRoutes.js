import pool from "../db.js";

export const createPreorder = async (req, res) => {
  const { name, email, phone, address } = req.body;

  try {
    const result = await pool.query(
      "INSERT INTO preorders (name, email, phone, address) VALUES ($1, $2, $3, $4) RETURNING *",
      [name, email, phone, address]
    );

    res.json(result.rows[0]);
  } catch (error) {
    console.error("Error saving preorder:", error);
    res.status(500).json({ error: "Failed to save preorder" });
  }
};
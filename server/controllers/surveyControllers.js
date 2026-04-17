import pool from "../db.js";
import { validateEmail } from "../utils/validation.js";

export const createSurvey = async (req, res) => {
  const { name, email, answers, user_id } = req.body;

  if (!validateEmail(email)) {
    return res.status(400).json({ error: "Invalid email format" });
  }

  try {
    const result = await pool.query(
      "INSERT INTO surveys (name, email, answers, user_id) VALUES ($1, $2, $3, $4) RETURNING *",
      [name, email, JSON.stringify(answers), user_id || null]
    );

    res.status(201).json({
      message: "Survey submitted successfully",
      survey: result.rows[0],
    });
  } catch (error) {
    console.error("Error saving survey:", error);
    res.status(500).json({ error: "Failed to save survey response" });
  }
};

export const getSurveys = async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM surveys ORDER BY created_at DESC");
    res.json(result.rows);
  } catch (error) {
    console.error("Error fetching surveys:", error);
    res.status(500).json({ error: "Failed to fetch surveys" });
  }
};

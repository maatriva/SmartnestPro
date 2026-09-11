import pool from "../db.js";

export const createSurvey = async (req, res) => {
  const { name, email, phone, gender, answers, user_id } = req.body;

  if (!name || !email) {
    return res.status(400).json({ error: "Name and Email are required." });
  }

  try {
    const sanitizedAnswers =
      typeof answers === "object" && answers !== null
        ? JSON.stringify(answers)
        : answers;

    const result = await pool.query(
      "INSERT INTO surveys (name, email, phone, gender, answers, user_id) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *",
      [name, email, phone || null, gender || null, sanitizedAnswers, user_id || null]
    );

    res.status(201).json({
      message: "Survey submitted successfully",
      survey: result.rows[0],
    });
  } catch (error) {
    console.error("Error saving survey:", error);
    // Explicitly return the error details to help debug the 500 code
    res.status(500).json({ 
      error: "Detailed Server Error", 
      message: error.message,
      code: error.code,
      detail: error.detail
    });
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

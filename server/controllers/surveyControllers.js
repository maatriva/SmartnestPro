import pool from "../db.js";

export const createSurvey = async (req, res) => {
  const { answers } = req.body;
  const user_id = req.user?.id;

  if (!user_id) {
    return res.status(401).json({ error: "Unauthorized. Please log in to submit a survey." });
  }

  try {
    // Retrieve the user's name and email from the database
    const userResult = await pool.query(
      "SELECT name, email FROM users WHERE id = $1",
      [user_id]
    );

    if (userResult.rows.length === 0) {
      return res.status(404).json({ error: "User not found" });
    }

    const { name, email } = userResult.rows[0];

    const result = await pool.query(
      "INSERT INTO surveys (name, email, answers, user_id) VALUES ($1, $2, $3, $4) RETURNING *",
      [name, email, answers, user_id]
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

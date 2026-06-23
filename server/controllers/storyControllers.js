import pool from "../db.js";

// Save a new story
export const createStory = async (req, res) => {
  const { parentName, childAge, location, storyTitle, storyDescription, photoUrl } = req.body;

  if (!parentName || !storyTitle || !storyDescription) {
    return res.status(400).json({ error: "Required fields are missing: parentName, storyTitle, storyDescription" });
  }

  try {
    const result = await pool.query(
      `INSERT INTO stories (parent_name, child_age, location, story_title, story_description, photo_url) 
       VALUES ($1, $2, $3, $4, $5, $6) RETURNING *`,
      [parentName, childAge, location, storyTitle, storyDescription, photoUrl || null]
    );

    res.status(201).json(result.rows[0]);
  } catch (error) {
    console.error("Error saving story:", error);
    res.status(500).json({ error: "Failed to save story" });
  }
};

// Retrieve all stories
export const getStories = async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM stories ORDER BY created_at DESC");
    res.json(result.rows);
  } catch (error) {
    console.error("Error fetching stories:", error);
    res.status(500).json({ error: "Failed to fetch stories" });
  }
};

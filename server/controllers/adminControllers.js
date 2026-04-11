import pool from "../db.js";

export const getAdminStats = async (req, res) => {
  try {
    // Check if requester is admin
    const userResult = await pool.query("SELECT is_admin FROM users WHERE id = $1", [req.user.id]);
    if (!userResult.rows[0]?.is_admin) {
      return res.status(403).json({ error: "Unauthorized. Admin access only." });
    }

    // 1. Get total users count
    const usersCount = await pool.query("SELECT COUNT(*) FROM users");
    
    // 2. Get all surveys
    const surveysResult = await pool.query(`
      SELECT s.id, s.name, s.email, s.answers, s.created_at 
      FROM surveys s 
      ORDER BY s.created_at DESC
    `);

    // 3. Get generic login stats (total users created per day for last 7 days)
    const loginStats = await pool.query(`
      SELECT DATE(created_at) as date, COUNT(*) as count 
      FROM users 
      GROUP BY DATE(created_at) 
      ORDER BY date DESC 
      LIMIT 7
    `);

    res.json({
      totalUsers: parseInt(usersCount.rows[0].count),
      surveys: surveysResult.rows,
      loginStats: loginStats.rows,
    });
  } catch (error) {
    console.error("Admin Stats Error:", error);
    res.status(500).json({ error: "Failed to fetch admin stats" });
  }
};

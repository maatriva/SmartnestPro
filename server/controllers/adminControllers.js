import pool from "../db.js";

export const getAdminStats = async (req, res) => {
  try {
    // Check if requester is admin
    const userResult = await pool.query("SELECT is_admin FROM users WHERE id = $1", [req.user.id]);
    if (!userResult.rows[0]?.is_admin) {
      return res.status(403).json({ error: "Unauthorized. Admin access only." });
    }

    // 1. Get all users
    const usersResult = await pool.query("SELECT id, name, email, is_admin, created_at FROM users ORDER BY created_at DESC");

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

    // 5. Get generic login stats (total users created per day for last 7 days)
    const loginStats = await pool.query(`
      SELECT DATE(created_at) as date, COUNT(*) as count 
      FROM users 
      GROUP BY DATE(created_at) 
      ORDER BY date DESC 
      LIMIT 7
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

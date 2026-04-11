import pool from "../db.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET;

export const signup = async (req, res) => {
  const { name, email, password } = req.body;
  console.log("BODY:", req.body);

  const exists = await pool.query("SELECT * FROM users WHERE email=$1", [email]);
  if (exists.rows.length) return res.status(400).json({ error: "User exists" });

  const hash = await bcrypt.hash(password, 10);

  const result = await pool.query(
    "INSERT INTO users (name,email,password) VALUES ($1,$2,$3) RETURNING id,name,email,is_admin",
    [name, email, hash]
  );

  const user = result.rows[0];
  const token = jwt.sign(user, JWT_SECRET);

  res.json({ user, token });
};


export const login = async (req, res) => {
  const { email, password } = req.body;
  console.log("BODY:", req.body);

  const result = await pool.query("SELECT * FROM users WHERE email=$1", [email]);
  const user = result.rows[0];

  if (!user) return res.status(400).json({ error: "Invalid" });

  const match = await bcrypt.compare(password, user.password);
  if (!match) return res.status(400).json({ error: "Invalid" });

  const token = jwt.sign({ id: user.id }, JWT_SECRET);

  delete user.password;
  res.json({ user, token });
};

export const getMe = async (req, res) => {
  try {
    if (!req.user || !req.user.id) {
      return res.status(401).json({ error: "Invalid token data" });
    }

    const result = await pool.query(
      "SELECT id, name, email, is_admin FROM users WHERE id = $1",
      [req.user.id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ error: "User not found" });
    }

    res.json(result.rows[0]);
  } catch (error) {
    console.error("Error in getMe:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

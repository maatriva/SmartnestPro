import pkg from "pg";
const { Pool } = pkg;

const pool = new Pool({
  user: "postgres",
  host: "localhost",
  database: "smartnest",
  password: "Arsh1496",
  port: 5432,
});

export default pool;
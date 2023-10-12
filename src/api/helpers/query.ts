import { Pool } from "pg";
const pool = new Pool({
  host: "localhost",
  database: "test",
  user: "postgres",
  password: "postgres",
  max: 20,
  idleTimeoutMillis: 30000,
  connectionTimeoutMillis: 2000,
});

export const query = async (queryString: string) => {
  let data = await pool.query(queryString);
  return data;
};

import { Pool } from "pg";
const { DBUSER, DBHOST, DBNAME, DBPASS, DBPORT } = process.env;

// Local DB
const pool = new Pool({
  user: DBUSER,
  host: DBHOST,
  database: DBNAME,
  password: DBPASS,
  port: Number(DBPORT),
});

export { pool };

// Neon DB
import { neon } from "@neondatabase/serverless";

const sql = neon(process.env.DATABASE_URL!);

export { sql };

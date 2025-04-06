import { Pool } from "pg";
const { DBUSER, DBHOST, DBNAME, DBPASS, DBPORT } = process.env;

// Local DB
// const pool = new Pool({
//   user: DBUSER,
//   host: DBHOST,
//   database: DBNAME,
//   password: DBPASS,
//   port: Number(DBPORT),
// });

// Neon DB
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false,
  },
});

export { pool };

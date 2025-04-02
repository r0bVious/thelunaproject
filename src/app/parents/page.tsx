import { pool } from "../../lib/db-connection";
import { ParentsSelection } from "./ParentsSelection";

export default async function Page() {
  try {
    const symResult = await pool.query("SELECT * FROM phys_sym");
    const symptoms = symResult.rows;

    return <ParentsSelection symptoms={symptoms} />;
  } catch (error) {
    console.error("Database query failed:", error);
    return <div>Error loading data. Please try again later.</div>;
  }
}

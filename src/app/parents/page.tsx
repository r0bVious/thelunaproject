import { pool } from "../../lib/db-connection";
import { DailyPhysSelection } from "./ParentsSelection";

//this is where you'll snag data and "package" that data along with the client-heavy component code.
export default async function Page() {
  try {
    const symResult = await pool.query("SELECT * FROM phys_sym");
    const symptoms = symResult.rows;

    return <DailyPhysSelection symptoms={symptoms} />;
  } catch (error) {
    console.error("Database query failed:", error);
    return <div>Error loading data. Please try again later.</div>;
  }
}

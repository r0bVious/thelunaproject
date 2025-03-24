import { KidsSelection } from "./KidsSelection";
import { pool } from "../../lib/db-connection";

export default async function Page() {
  try {
    const [qRes, aRes] = await Promise.all([
      pool.query("SELECT * FROM question"),
      pool.query("SELECT * FROM answer"),
    ]);

    const questions = qRes.rows;
    const answers = aRes.rows;
    return <KidsSelection questions={questions} answers={answers} />;
  } catch (error) {
    console.error("Database query failed:", error);
    return <div>Error loading data. Please try again later.</div>;
  }
}

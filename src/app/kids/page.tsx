import { KidsSelection } from "./KidsSelection";
import { pool } from "../../lib/db-connection";

//wait, this is a SERVER COMPONENT, so I can just snag data like it's an API call? THIS IS INSANE
//but it doesn't matter because this all needs to be client side for all the fun feedback you have planned
//NO it works as long as this Page.tsx is pure, grabs the data, and passes it all as props to needy components for interactivity
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

import { sql } from "../../lib/db-connection";
import { ParentsSelection } from "./ParentsSelection";

export default async function Page() {
  try {
    const symptoms = await sql`SELECT * FROM phys_sym`;
    const mappedSymptoms = symptoms.map(s => ({
      phys_sym_id: s.phys_sym_id,
      symptom_name: s.symptom_name
    }));

    return <ParentsSelection symptoms={mappedSymptoms} />;
  } catch (error) {
    console.error("Database query failed:", error);
    return <div>Error loading data. Please try again later.</div>;
  }
}
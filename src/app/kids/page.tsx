import { KidsSelection } from "./KidsSelection";
import { sql } from "../../lib/db-connection";

export default async function Page() {
  try {
    const [questions, answers] = await Promise.all([
      sql`SELECT * FROM question`,
      sql`SELECT * FROM answer`,
    ]);

    const mappedQuestions = questions.map((q) => ({
      question_id: q.question_id,
      question_text: q.question_text,
      container_type: q.container_type,
    }));

    const mappedAnswers = answers.map((a) => ({
      answer_id: a.answer_id,
      question_id: a.question_id,
      button_type: a.button_type,
      button_style: a.button_style,
    }));

    return (
      <KidsSelection questions={mappedQuestions} answers={mappedAnswers} />
    );
  } catch (error) {
    console.error("Database query failed:", error);
    return <div>Error loading data. Please try again later.</div>;
  }
}

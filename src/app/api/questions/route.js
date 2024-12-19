import { pool } from "../../../db/db";

const getQandA = async () => {
  try {
    const qResult = await pool.query("SELECT * FROM question");
    const aResult = await pool.query("SELECT * FROM answer");
    return { questions: qResult.rows, answers: aResult.rows };
  } catch (error) {
    console.error(error);
    throw new Error("Failed to fetch questions");
  }
};

const insertQuestion = async (req) => {
  const { question_text } = await req.json();

  if (!question_text) {
    return new Response(
      JSON.stringify({ error: "Question text is required" }),
      { status: 400 }
    );
  }

  try {
    const result = await pool.query(
      "INSERT INTO question (question_text) VALUES ($1) RETURNING *",
      [question_text]
    );
    return new Response(JSON.stringify(result.rows[0]), {
      status: 201,
    });
  } catch (error) {
    console.error(error);
    return new Response(JSON.stringify({ error: "Failed to add question" }), {
      status: 500,
    });
  }
};

export { getQandA, insertQuestion };

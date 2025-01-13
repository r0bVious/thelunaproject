import { pool } from "@/lib/db-connection";
import { NextResponse } from "next/server";

interface KidResProps {
  userId: number;
  questionId: number;
  answerId: number;
}

interface PhysResProps {
  userId: number;
  height?: number;
  weight?: number;
  hoursSlept?: number;
  condition?: number;
}

interface SymptomResProps {
  userId: number;
  symId: number;
  severityScale: number;
}

const getQsAndAs = async () => {
  try {
    const qResult = await pool.query("SELECT * FROM question");
    const aResult = await pool.query("SELECT * FROM answer");
    return {
      questions: qResult.rows,
      answers: aResult.rows,
    };
  } catch (error) {
    console.error(error);
    throw new Error("Failed to fetch questions");
  }
};

const insertKidRes = async ({ userId, questionId, answerId }: KidResProps) => {
  try {
    const insertResult = await pool.query(
      "INSERT INTO response (user_id, question_id, answer_id) VALUES ($1, $2, $3)",
      [userId, questionId, answerId]
    );
    console.log("Insert successful:", insertResult);
  } catch (error) {
    console.error("Insert failure:", error);
    throw new Error("Failed to insert data");
  }
};

const insertPhysRes = async ({
  userId,
  height,
  weight,
  hoursSlept,
  condition,
}: PhysResProps) => {
  try {
    const data: Record<string, number> = { user_id: userId };

    if (height !== undefined) data.height_cm = height;
    if (weight !== undefined) data.weight_kg = weight;
    if (hoursSlept !== undefined) data.hours_slept = hoursSlept;
    if (condition !== undefined) data.condition_scale = condition;

    const columns = Object.keys(data).join(", ");
    const values = Object.values(data).filter((value) => value !== undefined);
    const placeholders = values.map((_, index) => `$${index + 1}`).join(", ");

    const query = `INSERT INTO physical_responses (${columns}) VALUES (${placeholders})`;

    const insertResult = await pool.query(query, values);
    console.log("Insert successful:", insertResult);
  } catch (error) {
    console.error("Insert failure:", error);
    throw new Error("Failed to insert data");
  }
};

const insertSymptoms = async ({
  userId,
  symId,
  severityScale,
}: SymptomResProps) => {
  try {
    const insertResult = await pool.query(
      "INSERT INTO user_symptoms (user_id, phys_sym_id, severity_scale) VALUES ($1, $2, $3)",
      [userId, symId, severityScale]
    );
    console.log("Insert successful:", insertResult);
  } catch (error) {
    console.error("Insert failure:", error);
    throw new Error("Failed to insert data");
  }
};

export { getQsAndAs, insertKidRes, insertPhysRes, insertSymptoms };

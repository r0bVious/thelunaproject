import { pool } from "@/lib/db-connection";
import { KidResProps, PhysResProps, LoginProps } from "@/types";

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
  symptoms,
}: PhysResProps) => {
  try {
    const dailyPhysData = {
      user_id: userId,
      ...(height != null && { height_cm: height }),
      ...(weight != null && { weight_kg: weight }),
      ...(hoursSlept != null && { hours_slept: hoursSlept }),
      ...(condition != null && { condition_scale: condition }),
    };

    if (Object.keys(dailyPhysData).length > 1) {
      const dailyPhysColumns = Object.keys(dailyPhysData).join(", ");
      const dailyPhysValues = Object.values(dailyPhysData);
      const dailyPhysPlaceholders = dailyPhysValues
        .map((_, index) => `$${index + 1}`)
        .join(", ");

      const dailyPhysQuery = `INSERT INTO daily_phys (${dailyPhysColumns}) VALUES (${dailyPhysPlaceholders})`;
      const dailyPhysResult = await pool.query(dailyPhysQuery, dailyPhysValues);
      console.log(dailyPhysResult);
    }

    if (symptoms && Object.keys(symptoms).length > 0) {
      const symptomEntries = Object.entries(symptoms);
      const symptomColumns = ["user_id", "phys_sym_id", "severity_scale"];
      const symptomValues = symptomEntries.map(([key, value]) => [
        userId,
        Number(key),
        value,
      ]);
      const flatSymptomValues = symptomValues.flat();
      const symptomPlaceholders = symptomValues
        .map(
          (_, index) =>
            `($${index * 3 + 1}, $${index * 3 + 2}, $${index * 3 + 3})`
        )
        .join(", ");

      const symptomQuery = `INSERT INTO user_symptoms (${symptomColumns.join(
        ", "
      )}) VALUES ${symptomPlaceholders}`;
      const symptomResult = await pool.query(symptomQuery, flatSymptomValues);

      console.log("Symptoms insert successful:", symptomResult);
    }
  } catch (error) {
    console.error("Insert failure:", error);
    throw new Error("Failed to insert data");
  }
};

const insertSymptoms = async (
  symptoms: { userId: number; symId: number; severityScale: number }[]
) => {
  try {
    const values = symptoms
      .map((_, i) => `($1, $${i * 2 + 2}, $${i * 2 + 3})`)
      .join(", ");

    const params = symptoms.flatMap(({ userId, symId, severityScale }) => [
      userId,
      symId,
      severityScale,
    ]);

    const query = `
      INSERT INTO user_symptoms (user_id, phys_sym_id, severity_scale)
      VALUES ${values};
    `;

    const insertResult = await pool.query(query, params);
    console.log("Batch insert successful:", insertResult);
  } catch (error) {
    console.error("Batch insert failure:", error);
    throw new Error("Failed to insert data");
  }
};

const loginUser = async ({ userName }: LoginProps) => {
  try {
    const loginResult = await pool.query(
      `SELECT user_id FROM user_account WHERE user_name = $1`,
      [userName]
    );

    if (loginResult.rows.length === 0) {
      throw new Error("User not found");
    }
    console.log("Log in successful.");
    return loginResult.rows[0];
  } catch (error) {
    console.error("Login failure:", error);
    throw new Error("Failed to login at API");
  }
};

export { getQsAndAs, insertKidRes, insertPhysRes, insertSymptoms, loginUser };

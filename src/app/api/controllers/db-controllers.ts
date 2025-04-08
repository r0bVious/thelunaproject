import { neon } from "@neondatabase/serverless";
import { KidResProps, PhysResProps, LoginProps } from "@/types";

const sql = neon(process.env.DATABASE_URL!);

const getQsAndAs = async () => {
  try {
    const questions = await sql`SELECT * FROM question`;
    const answers = await sql`SELECT * FROM answer`;

    return {
      questions,
      answers,
    };
  } catch (error) {
    console.error(error);
    throw new Error("Failed to fetch questions");
  }
};

const insertKidRes = async ({ userId, questionId, answerId }: KidResProps) => {
  try {
    await sql`
      INSERT INTO response (user_id, question_id, answer_id)
      VALUES (${userId}, ${questionId}, ${answerId})
    `;
    console.log("Kids Answer insert successful");
  } catch (error) {
    console.error("Kids Answer insert failure:", error);
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
  console.log("Inserting phys res?");
  try {
    const dailyPhysData: Record<string, any> = {
      user_id: userId,
      ...(height != null && { height_cm: height }),
      ...(weight != null && { weight_kg: weight }),
      ...(hoursSlept != null && { hours_slept: hoursSlept }),
      ...(condition != null && { condition_scale: condition }),
    };

    if (Object.keys(dailyPhysData).length > 1) {
      const columns = Object.keys(dailyPhysData);
      const values = Object.values(dailyPhysData);
      const columnStr = columns.map((col) => `"${col}"`).join(", ");
      const placeholders = values.map((_, i) => `$${i + 1}`).join(", ");

      const query = `INSERT INTO daily_phys (${columnStr}) VALUES (${placeholders})`;

      await sql.query(query, values);
    }

    // Insert into user_symptoms if symptoms are provided
    if (symptoms && Object.keys(symptoms).length > 0) {
      const symptomValues = Object.entries(symptoms).map(([symId, scale]) => [
        userId,
        Number(symId),
        scale,
      ]);

      const flatValues = symptomValues.flat();

      const valuePlaceholders = symptomValues
        .map((_, i) => `($${i * 3 + 1}, $${i * 3 + 2}, $${i * 3 + 3})`)
        .join(", ");

      const query = `
        INSERT INTO user_symptoms (user_id, phys_sym_id, severity_scale)
        VALUES ${valuePlaceholders}`;

      await sql.query(query, flatValues);

      console.log("Symptoms insert successful");
    }
  } catch (error) {
    console.error("Insert failure:", error);
    throw new Error("Failed to insert data");
  }
};

const loginUser = async ({ userName }: LoginProps) => {
  try {
    const result = await sql`
      SELECT user_id, child_name FROM user_account WHERE user_name = ${userName}
    `;

    if (result.length === 0) {
      throw new Error("User not found");
    }

    console.log("Log in successful.");
    return result;
  } catch (error) {
    console.error("Login failure:", error);
    throw new Error("Failed to login at API");
  }
};

const createUser = async ({ email }: { email: string }) => {
  try {
    await sql`INSERT INTO user_account (user_name) VALUES (${email})`;
    const result = await sql`
      SELECT user_id FROM user_account WHERE user_name = ${email}
    `;
    return result[0]?.user_id || null;
  } catch (error) {
    console.error("User creation failure:", error);
    throw new Error("Failed to create new user");
  }
};

export { getQsAndAs, insertKidRes, insertPhysRes, loginUser, createUser };

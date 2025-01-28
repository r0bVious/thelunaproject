import { NextRequest, NextResponse } from "next/server";
import { insertKidRes } from "../../controllers/db-controllers";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    const { userId, questionId, answerId } = body.formData;
    if (!userId || !questionId || !answerId) {
      return NextResponse.json(
        { error: "Invalid data provided" },
        { status: 400 }
      );
    }

    await insertKidRes({ userId, questionId, answerId });
    return NextResponse.json({ message: "Insert successful" });
  } catch (error) {
    const errMessage = error instanceof Error ? error.message : "Unknown error";
    console.error(errMessage);
    return NextResponse.json({ error: errMessage }, { status: 500 });
  }
}

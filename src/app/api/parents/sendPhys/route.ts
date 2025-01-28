import { NextRequest, NextResponse } from "next/server";
import { insertPhysRes } from "../../controllers/db-controllers";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    if (!body.formData || !body.formData.userId) {
      return NextResponse.json(
        { error: "User ID is required" },
        { status: 400 }
      );
    }

    await insertPhysRes(body.formData);
    return NextResponse.json({ message: "Insert successful" });
  } catch (error) {
    const errMessage = error instanceof Error ? error.message : "Unknown error";
    console.error(errMessage);
    return NextResponse.json({ error: errMessage }, { status: 500 });
  }
}

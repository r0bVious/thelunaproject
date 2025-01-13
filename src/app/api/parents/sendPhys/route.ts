import { NextRequest, NextResponse } from "next/server";
import { insertPhysRes } from "../../controllers/db-controllers";

export async function POST(req: NextRequest) {
  try {
    const inData = await req.json();

    if (!inData.userId) {
      return NextResponse.json({ error: "User ID Required" }, { status: 400 });
    }

    await insertPhysRes(inData);
    return NextResponse.json({ message: "Insert successful" });
  } catch (error) {
    const errMessage = error instanceof Error ? error.message : "Unknown error";
    console.error(errMessage);
    return NextResponse.json({ error: errMessage }, { status: 500 });
  }
}

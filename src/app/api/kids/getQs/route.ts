import { NextResponse } from "next/server";
import { getQsAndAs } from "../../controllers/db-controllers";

export async function GET() {
  try {
    const data = await getQsAndAs();
    return NextResponse.json(data);
  } catch (error) {
    const err = error as Error;
    console.error(err.message);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}

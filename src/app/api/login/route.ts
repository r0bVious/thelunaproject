import { NextResponse } from "next/server";
import { loginUser } from "../controllers/db-controllers";

interface LoginRequestBody {
  userName: string;
}

export async function POST(request: Request) {
  try {
    const { userName }: LoginRequestBody = await request.json();
    const data = await loginUser({ userName });
    return NextResponse.json(data);
  } catch (error) {
    const err = error as Error;
    console.error(err.message);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}

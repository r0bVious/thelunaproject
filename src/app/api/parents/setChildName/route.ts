import { sql } from "@/lib/db-connection";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const { userId, childName } = await req.json();

  if (!userId || !childName) {
    return NextResponse.json({ error: "Missing data" }, { status: 400 });
  }

  try {
    await sql`
      UPDATE user_account SET child_name = ${childName}
      WHERE user_id = ${userId}
    `;
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Child name update failed:", error);
    return NextResponse.json({ error: "Database error" }, { status: 500 });
  }
}

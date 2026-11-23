import { NextRequest, NextResponse } from "next/server";
import { verifySession } from "@/app/lib/session";

export async function GET(req: NextRequest) {
  const token = req.cookies.get("session")?.value;

  if (!token) {
    return NextResponse.json(
      { user: null },
      { status: 401 }
    );
  }

  const user = await verifySession(token);

  if (!user) {
    return NextResponse.json(
      { user: null },
      { status: 401 }
    );
  }

  return NextResponse.json({ user });
}
import { SignJWT } from "jose";
import { NextResponse } from "next/server";

const secret = new TextEncoder().encode(
  process.env.SESSION_SECRET!
);

export async function createSession(
  response: NextResponse,
  user: {
    id: string;
    email: string;
    name: string;
  }
) {
  const token = await new SignJWT(user)
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime("7d")
    .sign(secret);

  response.cookies.set("session", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * 24 * 7,
  });
}
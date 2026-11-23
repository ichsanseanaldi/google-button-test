import { NextResponse } from "next/server";
import { randomBytes } from "crypto";
import { googleClient } from "@/app/lib/google";

export async function GET() {
  const state = randomBytes(32).toString("hex");

  const authorizationUrl = googleClient.generateAuthUrl({
    scope: [
      "openid",
      "email",
      "profile",
    ],
    state,
    prompt: "select_account",
  });

  const response = NextResponse.redirect(authorizationUrl);

  response.cookies.set("oauth_state", state, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: 300,
  });

  return response;
}
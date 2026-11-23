import { NextRequest, NextResponse } from "next/server";
import { googleClient } from "@/app/lib/google";
import { createSession } from "@/app/lib/session";

export async function GET(req: NextRequest) {
  const code = req.nextUrl.searchParams.get("code");
  const state = req.nextUrl.searchParams.get("state");
  const error = req.nextUrl.searchParams.get("error");

  const savedState = req.cookies.get("oauth_state")?.value;

  if (error) {
    return NextResponse.redirect(
      new URL("/?error=google_auth_failed", req.url)
    );
  }

  if (
    !code ||
    !state ||
    !savedState ||
    state !== savedState
  ) {
    return NextResponse.json(
      { error: "Invalid OAuth state" },
      { status: 400 }
    );
  }

  try {
    // Exchange authorization code for Google tokens
    const { tokens } = await googleClient.getToken(code);

    if (!tokens.id_token) {
      throw new Error("Google ID token missing");
    }

    // Verify Google's ID token
    const ticket = await googleClient.verifyIdToken({
      idToken: tokens.id_token,
      audience: process.env.GOOGLE_CLIENT_ID,
    });

    const payload = ticket.getPayload();

    if (!payload?.sub || payload.email_verified !== true) {
      throw new Error("Invalid Google user");
    }

    // Create our own application session
    const response = NextResponse.redirect(
      new URL("/dashboard", req.url)
    );

    await createSession(response, {
      id: payload.sub,
      email: payload.email ?? "",
      name: payload.name ?? "",
    //   picture: payload.picture,
    });

    // Remove temporary OAuth state cookie
    response.cookies.delete("oauth_state");

    return response;
  } catch (error) {
    console.error("Google OAuth error:", error);

    return NextResponse.redirect(
      new URL("/?error=google_auth_failed", req.url)
    );
  }
}
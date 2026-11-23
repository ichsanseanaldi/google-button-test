import { createSession } from "@/app/lib/session";
import { OAuth2Client } from "google-auth-library";
import { NextResponse } from "next/server";

const client = new OAuth2Client(
  process.env.GOOGLE_CLIENT_ID
);

export async function POST(req: Request) {
  try {
    const { credential } = await req.json();

    const ticket = await client.verifyIdToken({
      idToken: credential,
      audience: process.env.GOOGLE_CLIENT_ID,
    });

    const payload = ticket.getPayload();

    if (!payload?.sub) {
      return NextResponse.json(
        { error: "Invalid Google account" },
        { status: 401 }
      );
    }

    const response = NextResponse.json({
      success: true,
      user: {
        id: payload.sub,
        email: payload.email,
        name: payload.name,
        picture: payload.picture,
      },
    });

    await createSession(response, {
      id: payload.sub,
      email: payload.email ?? "",
      name: payload.name ?? "",
    });

    return response;
  } catch {
    return NextResponse.json(
      { error: "Authentication failed" },
      { status: 401 }
    );
  }
}
import { OAuth2Client } from "google-auth-library";

const clientId = process.env.GOOGLE_CLIENT_ID!;
const clientSecret = process.env.GOOGLE_CLIENT_SECRET!;
const appUrl = process.env.NEXT_PUBLIC_APP_URL!;

export const redirectUri =
  `${appUrl}/api/auth/google/callback`;

export const googleClient = new OAuth2Client(
  clientId,
  clientSecret,
  redirectUri
);
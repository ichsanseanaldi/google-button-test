"use client";

import { redirect } from "next/navigation";
import Script from "next/script";
import { detectSourceFromUserAgent } from "../lib/utils";

declare global {
  interface Window {
    google: any;
  }
}

export default function GoogleFrontendLogin() {
  const isTikTokInAppBrowser = typeof window !== "undefined" && detectSourceFromUserAgent() === "TikTok";
    
  const initializeGoogle = () => {
    if (!window.google) return;

    window.google.accounts.id.initialize({
      client_id: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID,
      callback: async (response: { credential: string }) => {
        const result = await fetch(
          "/api/auth/google/frontend",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              credential: response.credential,
            }),
          }
        );

        if (result.ok) {
          redirect("/dashboard");
        } else {
          alert("Login failed");
        }
      },
    });

    window.google.accounts.id.renderButton(
      document.getElementById("google-login"),
      {
        theme: "outline",
        size: "large",
        text: "signin_with",
      }
    );
  };


  return (
    <div>
      <p>user agent: {detectSourceFromUserAgent() || "-"}</p>
      <p>user agent: {navigator.userAgent}</p>
      <p>isTiktokInAppBrowser: {isTikTokInAppBrowser ? "true" : "false"}</p>
      <Script
        src="https://accounts.google.com/gsi/client"
        strategy="afterInteractive"
        onLoad={initializeGoogle}
      />

      <div id="google-login" />
    </div>
  );
}
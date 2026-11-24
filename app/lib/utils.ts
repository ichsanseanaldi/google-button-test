export function detectSourceFromUserAgent(): string {
  const userAgent = navigator.userAgent;
  for (const { appName, keywords } of USER_AGENT_SOURCES) {
    if (keywords.some((keyword) => userAgent.includes(keyword))) return appName;
  }
  return "";
}

export const USER_AGENT_SOURCES: { appName: string; keywords: string[] }[] = [
  {
    appName: "Facebook",
    keywords: ["FBAN", "FBIOS", "FBAV", "FB4A", "FB_IAB", "FBAndroidApp"],
  },
  { appName: "Instagram", keywords: ["Instagram"] },
  { appName: "TikTok", keywords: ["TikTok","musical_ly", "trill", "BytedanceWebview", "Bytespider", "ByteLocale"] },
  { appName: "Twitter", keywords: ["Twitter", "TwitterAndroid"] },
  { appName: "LinkedIn", keywords: ["LinkedInApp"] },
  { appName: "Telegram", keywords: ["TelegramBot", "Telegram"] },
  { appName: "WhatsApp", keywords: ["WhatsApp"] },
  { appName: "Line", keywords: ["Line/"] },
  { appName: "Snapchat", keywords: ["Snapchat"] },
  { appName: "Pinterest", keywords: ["Pinterest"] },
] as const;
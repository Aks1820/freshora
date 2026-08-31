const OAUTH = {
  GOOGLE_OAUTH: "oauth_google",
  OAUTH_GITHUB: "oauth_github",
  OAUTH_APPLE: "oauth_apple",
};

const BASE_URL =
  process.env.EXPO_PUBLIC_API_URL || "http://192.168.1.8:3001/api";

export { BASE_URL, OAUTH };


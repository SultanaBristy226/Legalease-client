import { createAuthClient } from "better-auth/client";

const baseURL =
  process.env.NODE_ENV === "production"
    ? process.env.NEXT_PUBLIC_APP_URL || "https://legalease-client-opal.vercel.app"
    : "http://localhost:3000";

export const authClient = createAuthClient({
  baseURL,
});

export const signInWithGoogle = async () => {
  try {
    await authClient.signIn.social({
      provider: "google",
      callbackURL: "/",
    });
  } catch (error) {
    console.error("Google sign in error:", error);
    throw error;
  }
};
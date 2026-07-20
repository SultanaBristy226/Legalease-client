import { createAuthClient } from "better-auth/client";

export const authClient = createAuthClient({
  baseURL: process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000",
});

// Sign in with Google
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
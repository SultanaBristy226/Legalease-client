import { betterAuth } from "better-auth";

export const auth = betterAuth({
  database: {
    type: "mongodb",
    url: process.env.NEXT_PUBLIC_MONGODB_URI!,
  },
  socialProviders: {
    google: {
      clientId: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    },
  },
});
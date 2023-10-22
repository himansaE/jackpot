import prisma from "@/lib/prisma";
import { lucia } from "lucia";
import { nextjs_future } from "lucia/middleware";
import { prisma as PrismaAdapter } from "@lucia-auth/adapter-prisma";
import { google } from "@lucia-auth/oauth/providers";
export const auth = lucia({
  adapter: PrismaAdapter(prisma),
  env: process.env.NODE_ENV === "development" ? "DEV" : "PROD",
  middleware: nextjs_future(),

  sessionCookie: {
    expires: false,
  },
  getUserAttributes: (data) => {
    const { id, ...filtered } = data;
    return filtered;
  },
});
export const googleAuth = google(auth, {
  clientId: process.env.GOOGLE_CLIENT_ID ?? "",
  clientSecret: process.env.GOOGLE_CLIENT_SECRET ?? "",
  redirectUri: process.env.GOOGLE_REDIRECT_URL ?? "",
  scope: [
    "https://www.googleapis.com/auth/userinfo.email",
    "https://www.googleapis.com/auth/userinfo.profile",
  ],
});

export type Auth = typeof auth;

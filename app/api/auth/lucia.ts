import prisma from "@/lib/prisma";
import { lucia } from "lucia";
import { nextjs_future } from "lucia/middleware";
import { prisma as PrismaAdapter } from "@lucia-auth/adapter-prisma";
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

export type Auth = typeof auth;

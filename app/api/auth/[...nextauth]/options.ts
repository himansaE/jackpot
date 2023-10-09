import type { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

export const NextAuthOptionsData: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "email", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials, req) {
        const user = await fetch(`${process.env.NEXTAUTH_URL}/api/login`, {
          cache: "no-store",
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email: credentials?.email,
            password: credentials?.password,
            api_sec: process.env.SITE_API_SEC,
          }),
        }).then((r) => r.json());
        if (user) return user;
        return null;
      },
    }),
  ],
  pages: { signIn: "/auth/login", newUser: "auth/register" },
  useSecureCookies: process.env.NODE_ENV === "production",
  secret: process.env.NEXTAUTH_SECRET,
  callbacks: {
    session: (session) => {
      return session.session;
    },
  },
  session: {
    strategy: "jwt",
  },
};

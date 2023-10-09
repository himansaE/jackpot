import NextAuth from "next-auth";
import { NextAuthOptionsData } from "./options";

const handler = NextAuth(NextAuthOptionsData);

export { handler as GET, handler as POST };

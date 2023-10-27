import { auth } from "@/app/api/auth/lucia";
import { LuciaError, Session } from "lucia";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

type NewResponseBody =
  | {
      done: true;
      [key: string]: string | boolean;
    }
  | { done: false; errors: string[] }
  | null;

export const NewResponse = (
  body: NewResponseBody,
  statusCode?: number,
  headers?: HeadersInit,
) => {
  return new Response(JSON.stringify(body), {
    status: statusCode,
    headers: headers,
  });
};

export const validateRecaptcha = async (token: string, action?: string) => {
  const url = `https://www.google.com/recaptcha/api/siteverify?secret=${process.env.RECAPTCHA_SECRET_KEY}&response=${token}`;
  const res = await fetch(url, { method: "post" }).then((i) => i.json());
  if (action) return res.success && res.action === action;
  return res.success;
};

export const validateSession = async () => {
  try {
    const session = (await auth.getSession(
      cookies().get("auth_session")?.value ?? "",
    )) as Session;
    if (session.state === "active") return session;

    //TODO:: idle session should be reset
    return session;
  } catch (e) {
    if (e instanceof LuciaError && e.message === `AUTH_INVALID_SESSION_ID`)
      return redirect("/auth/login");
    else {
      return false;
    }
  }
};

export const isLogged = async () => {
  try {
    const session = (await auth.getSession(
      cookies().get("auth_session")?.value ?? "",
    )) as Session;
    if (session.state === "active") return true;
    //TODO:: idle session should be reset
    return true;
  } catch (e) {
    return false;
  }
};

import { NewResponse } from "@/lib/auth";
import { cookies } from "next/headers";
import { NextRequest } from "next/server";
import * as context from "next/headers";
import { auth, facebookAuth } from "../../lucia";
import { createOrValidateFacebookUser } from "@/lib/auth/facebook";

export const GET = async (request: NextRequest) => {
  const storedState = cookies().get("fb_oauth_state")?.value;
  const url = new URL(request.url);
  const state = url.searchParams.get("state");
  const code = url.searchParams.get("code");
  const coming_form = cookies().get("fb_auth_mode")?.value ?? "";

  if (coming_form != "0" && coming_form != "1") {
    return NewResponse(null, 400);
  }

  const error_url = new URL(
    `${new URL(request.url).origin}/auth/${
      coming_form == "0" ? "login" : "register"
    }`,
  );
  if (!storedState || !state || storedState !== state || !code) {
    setErrorCookie("Something went wrong. Try again.", context);
    return NewResponse(null, 302, { Location: error_url.href });
  }

  try {
    const user = await createOrValidateFacebookUser(
      await facebookAuth.validateCallback(code),
    );
    if (!user.done) {
      setErrorCookie(user.error, context);
      return NewResponse(null, 302, { Location: error_url.href });
    }
    const session = await auth.createSession({
      userId: user.user.userId,
      attributes: {},
    });
    const authRequest = auth.handleRequest(request.method, context);
    authRequest.setSession(session);
    return NewResponse(null, 302, { Location: "/dashboard" });
  } catch (e) {
    setErrorCookie(
      "Something went wrong with Authentication. Contact developer.",
      context,
    );
    return NewResponse(null, 302, { Location: error_url.href });
  }
};

const setErrorCookie = (error: string, headers: typeof context) => {
  headers
    .cookies()
    .set("auth-error", error, { maxAge: 600, httpOnly: false, path: "/" });
};

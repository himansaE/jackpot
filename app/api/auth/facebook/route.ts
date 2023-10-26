import * as context from "next/headers";

import type { NextRequest } from "next/server";
import { facebookAuth } from "../lucia";
import { NewResponse } from "@/lib/auth";

export const GET = async (request: NextRequest) => {
  const come_from = new URL(request.url).searchParams.get("type") as
    | "up"
    | "in"
    | null;
  if (come_from == null) return NewResponse(null, 400);

  const [url, state] = await facebookAuth.getAuthorizationUrl();
  context.cookies().set("fb_oauth_state", state, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: 60 * 60,
  });

  context
    .cookies()
    .set(
      "fb_auth_mode",
      come_from == "in" ? "0" : come_from == "up" ? "1" : "-1",
      {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        path: "/",
        maxAge: 60 * 60,
      },
    );

  return NewResponse(null, 302, {
    Location: url.toString(),
  });
};

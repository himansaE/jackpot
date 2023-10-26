import * as context from "next/headers";

import type { NextRequest } from "next/server";
import { auth } from "../lucia";
import { NewResponse } from "@/lib/auth";

export const POST = async (request: NextRequest) => {
  const authRequest = auth.handleRequest(request.method, context);

  const session = await authRequest.validate();
  if (!session) {
    return NewResponse({ done: false, errors: [] }, 401);
  }
  await auth.invalidateSession(session.sessionId);
  authRequest.setSession(null);

  return NewResponse({ done: true }, 200);
};

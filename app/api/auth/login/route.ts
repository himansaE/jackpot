import { NewResponse, validateRecaptcha } from "@/lib/auth";
import { auth } from "../lucia";
import * as context from "next/headers";
import { LuciaError } from "lucia";

const local_validate = ({ email, password }: ReqBody) => {
  // validate email
  if (
    !(
      typeof email === "string" &&
      /^[\w\-\.]+@([\w-]+\.)+[\w-]{2,4}$/g.test(email)
    )
  )
    return "Enter valid Email address.";
  if (!(typeof password === "string" && /^(.){8,}/gm.test(password)))
    return "Password is incorrect. Try forget password.";
  return true;
};
type ReqBody = {
  email: string;
  password: string;
  token: string;
};

export async function POST(req: Request, res: Response) {
  const body: ReqBody = await req.json();
  if (!(await validateRecaptcha(body.token, "login")))
    return NewResponse(
      { done: false, errors: ["Recaptcha validation failed."] },
      403,
    );

  const validated = local_validate(body);
  if (typeof validated === "string")
    return NewResponse(
      {
        done: false,
        errors: [validated],
      },
      400,
    );
  try {
    const key = await auth.useKey(
      "email",
      body.email.toLowerCase(),
      body.password,
    );
    const session = await auth.createSession({
      userId: key.userId,
      attributes: {},
    });

    const authRequest = auth.handleRequest(req.method, context);
    authRequest.setSession(session);
    return NewResponse({ done: true });
  } catch (e) {
    if (
      e instanceof LuciaError &&
      (e.message === "AUTH_INVALID_KEY_ID" ||
        e.message === "AUTH_INVALID_PASSWORD")
    )
      return NewResponse(
        {
          done: false,
          errors: ["Incorrect username or password"],
        },
        400,
      );
    return NewResponse(
      { done: false, errors: ["An unknown error occurred"] },
      500,
    );
  }
}

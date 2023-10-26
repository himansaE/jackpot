import { NewResponse, validateRecaptcha } from "@/lib/auth";
import { ReqBody, validateReqBody } from "./validate";
import { auth } from "../lucia";
import { ObjectId } from "mongodb";
import * as context from "next/headers";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";

export async function POST(req: Request, res: Response) {
  const body: ReqBody = await req.json();

  if (!(await validateRecaptcha(body.token, "register")))
    return NewResponse(
      { done: false, errors: ["Recaptcha validation failed."] },
      403,
    );

  const validated = validateReqBody(body);

  if (validated.length != 0)
    return NewResponse({ done: false, errors: validated }, 400);

  const userId = new ObjectId().toHexString();

  try {
    const user = await auth.createUser({
      userId,
      key: {
        providerId: "email", // auth method
        providerUserId: body.email.toLowerCase(),
        password: body.password,
      },
      attributes: {
        email: body.email.toLowerCase(),
        first_name: body.first_name,
        last_name: body.last_name,
        phone: body.phone,
        acc_bal: 0,
        providers: ["email"],
      },
    });

    const session = await auth.createSession({
      userId: user.userId,
      attributes: {},
    });

    const authRequest = auth.handleRequest(req.method, context);
    authRequest.setSession(session);

    return NewResponse({ done: true });
  } catch (error) {
    if (error instanceof PrismaClientKnownRequestError && error.code == "P2002")
      return NewResponse({
        done: false,
        errors: ["Email already exists. Login instead"],
      });
    return NewResponse(
      {
        done: false,
        errors: ["Something went wrong. try login."],
      },
      500,
    );
  }
}

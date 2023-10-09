import prisma from "@/lib/prisma";
import { hash } from "bcrypt";
import { ReqBody, validateReqBody } from "./validate";
import { NewResponse, validateRecaptcha } from "@/lib/auth";

export async function POST(req: Request, res: Response) {
  const body: ReqBody = await req.json();
  //TODO:: fix CSRF token
  // if (!validateCsrfToken(body.csrfToken)) return NewResponse("", 403);

  if (!(await validateRecaptcha(body.token, "register")))
    return NewResponse(
      { done: false, errors: "Recaptcha validation failed." },
      403
    );

  const validated = validateReqBody(body);

  if (validated.length != 0)
    return NewResponse({ done: false, errors: validated }, 400);

  try {
    // check if username and password already exist
    const old_auth = await prisma.auth.findFirst({
      where: { email: body.email },
    });
    if (old_auth)
      return NewResponse(
        { done: false, errors: ["Email already exist. Try Login"] },
        400
      );

    // create username and password auth
    const auth = await prisma.auth.create({
      data: {
        first_name: body.first_name,
        last_name: body.last_name,
        email: body.email,
        phone: body.phone,
        hash: await hash(body.password, 10),
      },
    });

    // check is there any account for that email (signed in with another credential provider)
    const acc = await prisma.account.findFirst({
      where: {
        email: body.email,
      },
    });

    if (!!acc) {
      //TODO:: handle multiple auth
    } else {
      // create new account
      const new_acc = await prisma.account.create({
        data: {
          email: body.email,
        },
      });
      await prisma.auth.update({
        where: {
          email: body.email,
        },
        data: {
          user_id: new_acc.id,
        },
      });
    }

    return NewResponse({ done: true, authId: auth.id, accId: acc?.id });
  } catch (e) {}
  return NewResponse(
    { done: false, errors: ["Something went wrong. Try again."] },
    400
  );
}

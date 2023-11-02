import { EmailOTPComponent } from "@/components/emails/otp";
import { NewResponse, validateRecaptcha } from "@/lib/auth";
import prisma from "@/lib/prisma";
import { sendEmail } from "@/lib/resend";
import { generateRandomString, generateLuciaPasswordHash } from "lucia/utils";
type ReqBody = {
  email: string;
  token: string;
};

const local_validate = ({ email }: ReqBody) => {
  // validate email
  if (
    !(
      typeof email === "string" &&
      /^[\w\-\.]+@([\w-]+\.)+[\w-]{2,4}$/g.test(email)
    )
  )
    return "Enter valid Email address.";
  return true;
};

export async function POST(req: Request, res: Response) {
  const body: ReqBody = await req.json();
  if (!(await validateRecaptcha(body.token, "forget")))
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

  const curr_user = await prisma.user.findFirst({
    where: { email: body.email },
  });
  if (curr_user == undefined) {
    return NewResponse(
      {
        done: false,
        errors: ["Email is not Registered with Jackpot. "],
      },
      400,
    );
  }

  if (curr_user.providers.indexOf("email") == -1)
    return NewResponse(
      {
        done: false,
        errors: ["Your account is not registered with username and password"],
      },
      400,
    );
  let otp = generateRandomString(6, "1234567890");
  try {
    await prisma.$transaction([
      prisma.otp.deleteMany({
        where: {
          user_id: curr_user.id,
          type: "email",
          for: "forget-pass",
        },
      }),
      prisma.otp.create({
        data: {
          otp: await generateLuciaPasswordHash(otp),
          user_id: curr_user.id,
          type: "email",
          for: "forget-pass",
          expire: new Date(new Date().getTime() + 3600000),
        },
      }),
    ]);
  } catch (e) {
    return NewResponse({ done: false, errors: ["Something went wrong."] }, 500);
  }
  if (
    await sendEmail({
      to: [curr_user.email],
      subject: "Jackpot OTP Code.",
      react: EmailOTPComponent({
        name: `${curr_user.first_name} ${curr_user.last_name}`,
        otp,
        email: curr_user.email,
        url: "https://project-jackpot.vercel.app/auth/forget/validate",
      }),
    })
  )
    return NewResponse({ done: true });

  return NewResponse(
    {
      done: false,
      errors: [
        "We're sorry, but we couldn't send the email validation code. Please check your email address and try again. If the issue persists, please contact developer for assistance.",
      ],
    },
    500,
  );
}

import { NewResponse, validateRecaptcha } from "@/lib/auth";
import prisma from "@/lib/prisma";
import { validateLuciaPasswordHash, generateRandomString } from "lucia/utils";
type ReqBody = {
  email: string;
  token: string;
  otp: string;
};

const TOKEN_CHARS =
  "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

const local_validate = ({ otp, email }: ReqBody) => {
  if (otp == undefined || otp.length != 6) return "Enter valid OTP code.";
  if (email == undefined || !/^[\w\-\.]+@([\w-]+\.)+[\w-]{2,4}$/g.test(email))
    return "Invalid Email.";
  return true;
};

export async function POST(req: Request, res: Response) {
  const body: ReqBody = await req.json();

  if (!(await validateRecaptcha(body.token, "otp_validate")))
    return NewResponse(
      { done: false, errors: ["Recaptcha validation failed. Try again."] },
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
        redirect: true,
      },
      400,
    );
  }

  const otp = await prisma.otp.findFirst({
    where: {
      user_id: curr_user.id,
    },
  });
  if (!otp || otp.for != "forget-pass")
    return NewResponse({
      done: false,
      errors: [
        "No OTP request found for this email address. Please ensure you have initiated an OTP request or use a valid email address",
      ],
    });

  if (
    otp?.expire.getTime() - 1000 < new Date().getTime() ||
    otp.validate_count >= 5 ||
    otp.use_count >= 5
  ) {
    await prisma.otp.delete({
      where: {
        id: otp.id,
      },
    });
    return NewResponse({
      done: false,
      errors: ["Your OTP has expired. Please request a new OTP to continue."],
    });
  }
  if (!(await validateLuciaPasswordHash(body.otp, otp.otp)))
    return NewResponse({
      done: false,
      errors: [
        "Invalid token entered. Please double-check the code you've provided and try again",
      ],
    });

  const token = generateRandomString(20, TOKEN_CHARS);
  await prisma.otp.update({
    where: {
      id: otp.id,
    },
    data: {
      update_token: token,
      validate_count: otp.validate_count + 1,
    },
  });
  return NewResponse({
    done: true,
    token,
  });
}

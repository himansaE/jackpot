import { NewResponse, validateRecaptcha } from "@/lib/auth";
import prisma from "@/lib/prisma";
import {
  generateLuciaPasswordHash,
  validateLuciaPasswordHash,
} from "lucia/utils";

type ReqBody = {
  email: string;
  token: string;
  otp: string;
  reset_token: string;
  pass: string;
};

const local_validate = ({ otp, email, reset_token, pass }: ReqBody) => {
  if (otp == undefined || otp.length != 6) return "Invalid OTP code.";
  if (email == undefined || !/^[\w\-\.]+@([\w-]+\.)+[\w-]{2,4}$/g.test(email))
    return "Invalid Email.";
  if (pass == undefined || pass.length < 8)
    return "Password must contain 8 characters.";
  if (reset_token == undefined)
    return "Something went wrong. We couldn't process your request. Please regenerate the reset OTP code to try again";
  return true;
};

export async function POST(req: Request, res: Response) {
  const body: ReqBody = await req.json();

  if (!(await validateRecaptcha(body.token, "reset_pass")))
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
        "Invalid code entered. Please double-check the code you've provided and try again",
      ],
      reenter: true,
    });
  if (otp.update_token != body.reset_token) {
  }

  const key = await prisma.key.findFirst({
    where: {
      user_id: curr_user.id,
    },
  });
  if (!key)
    return NewResponse({
      done: false,
      errors: [
        "Something went wrong. We couldn't process your request. Please regenerate the reset OTP code to try again.",
      ],
      reenter: true,
    });
  await prisma.key.update({
    where: {
      id: key?.id,
    },
    data: { hashed_password: await generateLuciaPasswordHash(body.pass) },
  });
  return NewResponse({
    done: true,
  });
}

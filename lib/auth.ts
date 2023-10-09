import { createHash } from "crypto";

export const validateCsrfToken = (token: string) => {
  if (typeof token != "string") return false;
  const delimiter = token.indexOf("|") !== -1 ? "|" : "%7C";
  const [requestToken, requestHash] = token.split(delimiter);
  const validate = createHash("sha256")
    .update(`${requestToken}${process.env.NEXTAUTH_SECRET}`)
    .digest("hex");
  return validate === requestHash;
};

export const NewResponse = (body: Object | null, statusCode?: number) => {
  return new Response(JSON.stringify(body), { status: statusCode });
};

export const validateRecaptcha = async (token: string, action?: string) => {
  const url = `https://www.google.com/recaptcha/api/siteverify?secret=${process.env.RECAPTCHA_SECRET_KEY}&response=${token}`;
  const res = await fetch(url, { method: "post" }).then((i) => i.json());
  if (action) return res.success && res.action === action;
  return res.success;
};

export interface ReqBody {
  first_name: string;
  last_name: string;
  email: string;
  phone: string;
  password: string;
  token: string;
}
export function validateReqBody(data: ReqBody): string[] {
  const errors: string[] = [];

  const values: (keyof ReqBody)[] = [
    "email",
    "first_name",
    "last_name",
    "password",
    "phone",
  ];

  for (let i of values) {
    if (typeof data[i] !== "string")
      errors.push(`${data[i].split("_").join(" ")} cannot be empty.`);
  }

  if (errors.length > 0) return errors;

  if (data.first_name.trim() === "") {
    errors.push("First name is required.");
  }

  if (data.last_name.trim() === "") {
    errors.push("Last name is required.");
  }

  if (!/^[A-z0-9._%+-]+@[A-z0-9.-]{2,}\.[A-z]{2,}$/gm.test(data.email))
    errors.push("Invalid email address");

  if (!/^\+947\d{8}$/gm.test(data.phone)) errors.push("Invalid phone number");

  if (data.password.length < 8)
    errors.push("Password must contain 8 characters.");

  return errors;
}

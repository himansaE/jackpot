import { NewResponse } from "@/lib/auth";
import prisma from "@/lib/prisma";
import { compare as hashCompare } from "bcrypt";

type ReqBody = {
  email: string;
  password: string;
  api_sec: string;
};

export async function POST(req: Request, res: Response) {
  const body: ReqBody = await req.json();
  if (body.api_sec !== process.env.SITE_API_SEC)
    return new Response(null, { status: 400 });
  const user = await prisma.auth.findFirst({
    where: {
      email: body.email,
    },
  });

  if (user && (await hashCompare(body.password, user.hash))) {
    const acc = await prisma.account.findFirst({
      where: { email: user.email },
    });
    return NewResponse({
      id: user.id,
      email: user.email,
      name: `${user.first_name} ${user.last_name}`,
      image: acc?.id,
    });
  }
  return NewResponse(null);
}

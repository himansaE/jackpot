import { FacebookUser } from "@lucia-auth/oauth/providers";
import { User } from "lucia";
import prisma from "../prisma";
import { formatProviders, joinTextForPara } from "../utils";
import { ObjectId } from "mongodb";

type GetUserProps = {
  getExistingUser: () => Promise<User | null>;
  facebookUser: FacebookUser;
  createUser: (options: {
    userId?: string | undefined;
    attributes: Lucia.DatabaseUserAttributes;
  }) => Promise<User>;
};
type ReturnType =
  | {
      user: User;
      done: true;
      new: boolean;
    }
  | {
      done: false;
      error: string;
    };

export const createOrValidateFacebookUser = async ({
  getExistingUser,
  facebookUser,
  createUser,
}: GetUserProps): Promise<ReturnType> => {
  if (facebookUser.email == undefined)
    return {
      error: "Please grant Facebook Email permission to Login",
      done: false,
    };
  const existingUser = await getExistingUser();
  if (existingUser)
    return { user: existingUser, done: true as const, new: false };
  // check for same email in another provider
  const provider_list = (
    await prisma.user.findFirst({
      where: { email: facebookUser.email },
    })
  )?.providers;
  if (!provider_list) return { done: false, error: "" };

  // not Registered with Facebook but else
  if (provider_list.length != 0)
    return {
      done: false as const,
      error: `Your Facebook account is not linked to this App. Please log in with ${joinTextForPara(
        provider_list.map((i) => formatProviders(i)),
      )} account you are currently logged in with.`,
    };
  const userId = new ObjectId().toHexString();
  const user = await createUser({
    userId,
    attributes: {
      email: facebookUser.email,
      first_name: facebookUser.name.split(" ")[0],
      last_name: facebookUser.name.split(" ")[1] ?? "",
      image: facebookUser.picture.data.url,
      acc_bal: 0,
      emailValidated: true,
      providers: ["facebook"],
    },
  });
  return { user: user, done: true as const, new: true };
};

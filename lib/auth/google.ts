import { GoogleUser } from "@lucia-auth/oauth/providers";
import { User } from "lucia";
import prisma from "../prisma";
import { ObjectId } from "mongodb";
import { formatProviders, joinTextForPara } from "../utils";

type GetUserProps = {
  getExistingUser: () => Promise<User | null>;
  googleUser: GoogleUser;
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

export const createOrValidateGoogleUser = async ({
  getExistingUser,
  googleUser,
  createUser,
}: GetUserProps): Promise<ReturnType> => {
  const existingUser = await getExistingUser();
  if (existingUser) return { user: existingUser, done: true, new: false };

  // check for same email in another provider
  const provider_list = (
    await prisma.user.findFirst({
      where: { email: googleUser.email },
    })
  )?.providers;

  // not Registered with Google but else
  if (provider_list && provider_list.length != 0)
    return {
      done: false,
      error: `Your Google account is not linked to this App. Please log in with ${joinTextForPara(
        provider_list.map((i) => formatProviders(i)),
      )} account you are currently logged in with.`,
    };

  // New email register him
  const userId = new ObjectId().toHexString();
  const user = await createUser({
    userId,
    attributes: {
      email: googleUser.email ?? "",
      first_name: googleUser.given_name,
      last_name: googleUser.family_name,
      image: googleUser.picture,
      acc_bal: 0,
      emailValidated: true,
      providers: ["google"],
    },
  });
  return { user: user, done: true, new: true };
};

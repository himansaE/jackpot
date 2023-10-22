import { GoogleUser } from "@lucia-auth/oauth/providers";
import { User } from "lucia";
import prisma from "../prisma";
import { ObjectId } from "mongodb";

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
//TODO ::: handle same email in another provider
export const createOrValidateGoogleUser = async ({
  getExistingUser,
  googleUser,
  createUser,
}: GetUserProps): Promise<ReturnType> => {
  const existingUser = await getExistingUser();
  if (existingUser)
    return { user: existingUser, done: true as const, new: false };

  // check for same email in another provider
  const provider_list = await prisma.oauth.findMany({
    where: { email: googleUser.email },
  });

  // not Registered with Google but Facebook
  if (provider_list.length != 0)
    return {
      done: false as const,
      error: `Your Google account is not linked to this app. Please log in with Facebook, the account you are currently logged in with.`,
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
    },
  });
  return { user: user, done: true as const, new: true };
};

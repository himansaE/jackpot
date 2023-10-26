import LoginPage from "./login";
import { isLogged } from "@/lib/auth";
import { redirect } from "next/navigation";
import { Metadata } from "next";
import { cookies } from "next/headers";

export default async function Page({
  searchParams,
}: {
  searchParams: { [key: string]: string | undefined };
}) {
  if (!(await isLogged())) {
    const error = cookies().get("auth-error");
    // if (error) cookies().delete("auth-error");
    return <LoginPage error={error?.value} />;
  }
  const url = searchParams["callbackUrl"];
  redirect(url ?? "/dashboard");
}

export const metadata: Metadata = {
  title: "Login to Jackpot",
};

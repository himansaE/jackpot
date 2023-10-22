import { redirect } from "next/navigation";
import RegisterPage from "./forget";
import { isLogged } from "@/lib/auth";
import { Metadata } from "next";

export default async function Page({
  searchParams,
}: {
  searchParams: { [key: string]: string | undefined };
}) {
  if (!(await isLogged())) return <RegisterPage />;

  //TODO manage redirect loop
  const url = searchParams["callbackUrl"];
  redirect(url ?? "/dashboard");
}

export const metadata: Metadata = {
  title: "Forget Jackpot password.",
};

import { redirect } from "next/navigation";
import ChangePassWithCaptcha from "./change-pass";
import { isLogged } from "@/lib/auth";
import { Metadata } from "next";

export default async function Page({
  searchParams,
}: {
  searchParams: { [key: string]: string | undefined };
}) {
  if (!(await isLogged())) {
    if (
      searchParams.email == undefined ||
      !/^[\w\-\.]+@([\w-]+\.)+[\w-]{2,4}$/g.test(searchParams.email)
    )
      return redirect("/auth/forget");
    return <ChangePassWithCaptcha email={searchParams.email} />;
  }

  //TODO manage redirect loop
  const url = searchParams["callbackUrl"];
  redirect(url ?? "/dashboard");
}

export const metadata: Metadata = {
  title: "Reset Jackpot password.",
};

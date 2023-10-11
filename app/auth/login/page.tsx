import LoginPage from "./login";
import { isLogged } from "@/lib/auth";
import { redirect } from "next/navigation";

export default async function Page({
  searchParams,
}: {
  searchParams: { [key: string]: string | undefined };
}) {
  if (!(await isLogged())) return <LoginPage />;
  const url = searchParams["callbackUrl"];
  redirect(url ?? "/dashboard");
}

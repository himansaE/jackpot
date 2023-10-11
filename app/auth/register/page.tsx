import { redirect } from "next/navigation";
import RegisterPage from "./register";
import { isLogged } from "@/lib/auth";

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

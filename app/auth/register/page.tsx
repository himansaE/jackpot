import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import RegisterPage from "./register";

export default async function Page({
  searchParams,
}: {
  searchParams: { [key: string]: string | undefined };
}) {
  if (!(await getServerSession())) return <RegisterPage />;
  const url = searchParams["callbackUrl"];

  redirect(url ?? "/dashboard");
}

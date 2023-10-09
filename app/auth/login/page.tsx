import LoginPage from "./login";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

export default async function Page({
  searchParams,
}: {
  searchParams: { [key: string]: string | undefined };
}) {
  if (!(await getServerSession())) return <LoginPage />;
  const url = searchParams["callbackUrl"];

  redirect(url ?? "/dashboard");
}

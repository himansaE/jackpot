import { getServerSession } from "next-auth";

export default async function Home() {
  const session = await getServerSession();

  if (session && session.user) return <main>{session.user.email}</main>;
  return <div></div>;
}

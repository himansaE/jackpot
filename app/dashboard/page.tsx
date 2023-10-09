import { AccountCard } from "@/components/dashboard/account-summery";
import { TicketSummary } from "@/components/dashboard/ticket-summary";
import { UpcomingCard } from "@/components/dashboard/upcoming";
import { YourTicketCard } from "@/components/dashboard/your-tickets";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

export default async function Page() {
  const session = await getServerSession();

  if (session == null) redirect("/auth/login");

  return (
    <div className="flex gap-8 flex-col my-6">
      <div>
        <h1 className="text-4xl font-semibold my-1">
          Hello {session?.user.name}!
        </h1>
        <h2 className="text-gray-800 dark:text-gray-300">
          Welcome to Dashboard.
        </h2>
      </div>
      <div className="flex flex-col justify-center lg:grid lg:grid-cols-2 justify-items-center">
        <YourTicketCard />
        <AccountCard user={session.user} />
      </div>
      <UpcomingCard />
      <div className="flex flex-col justify-center lg:grid lg:grid-cols-2 justify-items-center">
        <TicketSummary />
      </div>
    </div>
  );
}

export interface User {
  email: string;
  name: string;
  image: string | null | undefined;
}

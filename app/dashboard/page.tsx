import { AccountCard } from "@/components/dashboard/account-summery";
import { TicketSummary } from "@/components/dashboard/ticket-summary";
import { UpcomingCard } from "@/components/dashboard/upcoming";
import { YourTicketCard } from "@/components/dashboard/your-tickets";
import { validateSession } from "@/lib/auth";
import { Metadata } from "next";

export default async function Page() {
  const session = await validateSession();
  if (!session) return "";
  return (
    <div className="my-6 flex flex-col gap-8">
      <div>
        <h1 className="my-1 text-4xl font-semibold">
          Hello {`${session.user.first_name} ${session.user.last_name}`}!
        </h1>
        <h2 className="text-gray-800 dark:text-gray-300">
          Welcome to Dashboard.
        </h2>
      </div>
      <div className="flex flex-col justify-center justify-items-center lg:grid lg:grid-cols-2">
        <YourTicketCard />
        <AccountCard user={session.user} />
      </div>
      <UpcomingCard />
      <div className="flex flex-col justify-center justify-items-center lg:grid lg:grid-cols-2">
        <TicketSummary />
      </div>
    </div>
  );
}
export const metadata: Metadata = {
  title: "Dashboard",
};

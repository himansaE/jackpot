import { Lottie } from "../ui/lottie";
import { LinkButton } from "../ui/link-button";
import { DashBoardCard } from "./card";
export const YourTicketCard = () => {
  return (
    <DashBoardCard className="py-10 m-auto lg:mx-2 max-w-sm flex flex-col justify-center items-center gap-6 !bg-transparent dark:bg-transparent border-none">
      <Lottie src="/lottie/tickets.lottie" height="200" width="200" />
      <div className="text-xl text-gray-250 mx-5 text-center ">
        You don&apos;t have any tickets right now.
      </div>
      <div>
        <LinkButton href="/dashboard/buy">Buy Tickets</LinkButton>
      </div>
    </DashBoardCard>
  );
};

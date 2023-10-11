import { DashBoardCard } from "@/components/dashboard/card";
import {
  UpcomingLotteryCard,
  UpcomingLotteryCardSkeleton,
} from "@/components/dashboard/upcoming";
import { Lottie } from "@/components/ui/lottie";
import { validateSession } from "@/lib/auth";
import { unfiltered_upcoming_lottery_data } from "@/lib/filter-data";
import { Fragment, Suspense } from "react";

async function Page() {
  const session = await validateSession();
  if (!session) return "";
  return (
    <div>
      <h1 className="text-4xl font-semibold">
        Purchase Lottery Tickets Online
      </h1>
      <DashBoardCard className="my-4">
        <h2 className="dark:text-white text-black text-2xl font-normal">
          My Tickets Waiting for Draw
        </h2>
      </DashBoardCard>
      <section className="py-5">
        <h2 className="dark:text-white text-black text-2xl font-normal">
          Tickets available to Buy
        </h2>
        <div className="flex flex-wrap justify-evenly">
          <Suspense
            fallback={Array.from({ length: 7 }).map((i, n) => (
              <UpcomingLotteryCardSkeleton key={n} />
            ))}
          >
            <UpcomingLotteries />
          </Suspense>
        </div>
      </section>
    </div>
  );
}

const UpcomingLotteries = async () => {
  const data = unfiltered_upcoming_lottery_data(
    await fetch("https://client-proxy.lucky1.lk/api/v1/lottery/ongoing", {
      method: "get",
      cache: "no-store",
    })
      .then((i) => i.json())
      .catch(() => undefined)
  );

  if (typeof data == "undefined" || data.length == 0)
    return (
      <div>
        <Lottie src="/lottie/no-tickets.lottie"></Lottie>
        <p className="text-gray-800 dark:text-gray-400 mt-8 mx-2">
          No Upcoming Lotteries Available.
        </p>
      </div>
    );
  const sorted_data = data.sort((a, b) =>
    a.ongoing === b.ongoing ? 0 : a.ongoing ? -1 : 1
  );
  return (
    <>
      {sorted_data.map((i) => (
        <Fragment key={`${i.id}-${i.name}`}>
          {i.id && <UpcomingLotteryCard key={`${i.name}${i.id}`} {...i} />}
        </Fragment>
      ))}
    </>
  );
};

export default Page;

import { Suspense } from "react";
import { DashBoardCard } from "./card";
import {
  UpcomingCardProps,
  filter_upcoming_lottery_data,
} from "@/lib/filter-data";
import { poppins, roboto_mono } from "@/lib/fonts";
import Link from "next/link";
import { ScrollableCard } from "../ui/scrollable_card";

const UpcomingCardRender = async () => {
  const data = filter_upcoming_lottery_data(
    await fetch("https://client-proxy.lucky1.lk/api/v1/lottery/ongoing", {
      method: "get",
      cache: "no-store",
    })
      .then((i) => i.json())
      .catch(() => undefined)
  );

  if (typeof data == "undefined" || data.length == 0)
    return (
      <p className="text-gray-800 dark:text-gray-400 mt-8 mx-2">
        No Upcoming Lotteries Available.
      </p>
    );

  return (
    <ScrollableCard>
      {data.map((i) => {
        return <UpcomingLotteryCard key={`${i.name}-${i.id}`} {...i} />;
      })}
    </ScrollableCard>
  );
};

export const UpcomingLotteryCardSkeleton = () => {
  return (
    <div className="flex flex-col max-w-[260px] w-[260px] h-[350px] bg-indigo-100 rounded-xl pt-4 px-4 pb-3 m-6 dark:bg-dark-black  flex-[0_0_auto] animate-pulse">
      <div className="h-[152px] bg-indigo-200 dark:bg-slate-800 rounded-xl"></div>
      <div className="h-6 bg-indigo-200 dark:bg-slate-800 max-w-[200px] rounded-md mt-4" />
      <div className="h-4 mt-1.5 bg-indigo-200 dark:bg-slate-800 max-w-[180px] rounded-sm" />
      <div className="flex justify-between mt-1">
        <div className="h-4 mt-1.5 bg-indigo-200 dark:bg-slate-800 w-[40px] rounded-sm" />
        <div className="h-4 mt-1.5 bg-indigo-200 dark:bg-slate-800 w-[120px] rounded-sm" />
      </div>
      <div className="h-5 mt-2 bg-indigo-200 dark:bg-slate-800 max-w-[80px] rounded-sm" />
      <div className="flex justify-center">
        <div className="h-8 mt-4 bg-indigo-200 dark:bg-slate-800 w-full mx-2 rounded-2xl" />
      </div>
    </div>
  );
};

export const UpcomingCard = () => {
  return (
    <DashBoardCard className="flex-1 p-6">
      <h2 className="dark:text-white text-black text-2xl font-normal">
        Upcoming Lotteries
      </h2>
      <div className="relative">
        <div className="flex overflow-x-auto no-scrollbar scroll-smooth snap-mandatory snap-x ">
          <Suspense
            fallback={Array.from({ length: 5 }).map((n, i) => (
              <UpcomingLotteryCardSkeleton key={i} />
            ))}
          >
            <UpcomingCardRender />
          </Suspense>
        </div>
      </div>
    </DashBoardCard>
  );
};

export const UpcomingLotteryCard = (props: UpcomingCardProps) => {
  return (
    <div className="flex flex-col max-w-[260px] w-[260px] bg-indigo-100 rounded-xl pt-[180px] px-4 pb-3 m-6 dark:bg-dark-black transition-colors flex-[0_0_auto] snap-center ">
      <div
        className={`${poppins.className} font-bold text-2xl text-gray-900 dark:text-white  text-ellipsis overflow-hidden whitespace-nowrap`}
      >
        {props.name}
      </div>
      <div
        className={`${roboto_mono.className} text-base font-medium text-gray-900 dark:text-gray-300 mt-[-2px]`}
      >
        {props.price
          ? ` Rs.${props.price
              ?.toString()
              .split(".")[0]
              .replace(/.{1,3}/g, "$&,")
              .slice(0, -1)}.00`
          : "-"}
      </div>
      <div
        className={`${roboto_mono.className} flex justify-between my-1 text-sm text-gray-600 [line-height:1.25rem] dark:text-gray-500`}
      >
        <div>{props.id}</div>
        <div>{props.time}</div>
      </div>
      <div
        className={`${roboto_mono.className} text-gray-900 dark:text-gray-300 flex`}
      >
        <div className="bg-blue-200 dark:bg-slate-800 text-sm px-2 py-0.5 rounded">
          Rs.{props.lottery_price}.00
        </div>
      </div>
      {props.ongoing ? (
        <Link
          href={{
            pathname: "/dashboard/buy/lottery",
            query: { lottery: props.name.toLowerCase() },
          }}
          className="mt-4  py-1 bg-black text-white dark:text-gray-200 dark:bg-indigo-950 rounded-2xl text-center px-2"
        >
          Check Now
        </Link>
      ) : (
        <div className="mt-4  py-1 bg-black text-white dark:text-gray-200 dark:bg-indigo-950 rounded-2xl text-center px-2 opacity-50">
          Available soon
        </div>
      )}
    </div>
  );
};

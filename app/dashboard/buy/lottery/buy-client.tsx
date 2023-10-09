"use client";
import Spinner from "@/components/ui/spinner";
import { UpcomingCardProps } from "@/lib/filter-data";
import { roboto_mono } from "@/lib/fonts";
import { formatMilliseconds } from "@/lib/utils";
import Link from "next/link";
import { useState } from "react";

export const BuyLotteryClient = ({
  lottery,
}: {
  lottery: UpcomingCardProps;
}) => {
  const [loading, setLoading] = useState(false);
  return (
    <div className="grid sm:[grid-template-columns:1fr_1fr] lg:[grid-template-columns:0.8fr_1fr] xl:[grid-template-columns:0.5fr_1fr] my-20">
      <div className="flex justify-center items-center">
        <div className="h-56 w-56 bg-slate-300 dark:bg-slate-800 rounded-xl" />
      </div>
      <div className="p-3 flex flex-col gap-2 md:max-w-[23rem] sm:max-w-[22rem my-6 sm:my-0]">
        <div>
          <h3 className="dark:text-white text-black text-3xl font-normal">
            {lottery.name}
          </h3>
          <Link href="" className="text-gray-800 dark:text-gray-300 text-sm">
            by NLB
          </Link>
        </div>
        <div>
          <div className="flex sm:max-w-xs justify-between">
            <div className="flex gap-2 opacity-70">
              Draw:{" "}
              <div className={`${roboto_mono.className}`}>{lottery.id}</div>
            </div>
            <div className={`${roboto_mono.className} opacity-70`}>
              {lottery.time}
            </div>
          </div>
          <div className={roboto_mono.className + " opacity-60"}>
            {formatMilliseconds(lottery.expireIn)} left
          </div>
        </div>
        <div className="flex">
          <div
            className={`${roboto_mono.className}  bg-slate-400 dark:bg-slate-900 rounded px-2 opacity-80`}
          >
            Rs.{lottery.lottery_price}
          </div>
        </div>
        <button
          disabled={loading}
          className="px-4 py-2 mt-3 bg-black hover:bg-gray-900 dark:bg-indigo-900 dark:hover:bg-indigo-950 focus
  focus:ring-indigo-300 disabled:opacity-50 disabled:bg-black  dark:disabled:bg-indigo-900 transition-colors text-gray-200 shadow-md
  font-medium border border-transparent rounded-lg cursor-pointer flex justify-center items-center gap-1"
          onClick={() => setLoading((i) => !i)}
        >
          {loading && <Spinner />} Buy Now
        </button>
      </div>
    </div>
  );
};

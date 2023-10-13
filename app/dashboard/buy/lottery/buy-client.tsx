"use client";
import Spinner from "@/components/ui/spinner";
import { UpcomingCardProps } from "@/lib/filter-data";
import { roboto_mono } from "@/lib/fonts";
import { formatMilliseconds } from "@/lib/utils";
import Link from "next/link";
import { useEffect, useState } from "react";
import type { Metadata } from "next";

export const BuyLotteryClient = ({
  lottery,
}: {
  lottery: UpcomingCardProps;
}) => {
  const [expire_in, setExpireIn] = useState(lottery.expireIn - 10);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const expire_timer = setInterval(() => {
      setExpireIn((exp) => exp - 1000);
      if (expire_in < 0) clearInterval(expire_timer);
    }, 1000);
    return () => clearInterval(expire_timer);
  }, []);

  return (
    <div className="my-20 grid sm:[grid-template-columns:1fr_1fr] lg:[grid-template-columns:0.8fr_1fr] xl:[grid-template-columns:0.5fr_1fr]">
      <div className="flex items-center justify-center">
        <div className="h-56 w-56 rounded-xl bg-slate-300 dark:bg-slate-800" />
      </div>
      <div className="sm:max-w-[22rem sm:my-0] my-6 flex flex-col gap-2 p-3 md:max-w-[23rem]">
        <div>
          <h3 className="text-3xl font-normal text-black dark:text-white">
            {lottery.name}
          </h3>
          <Link href="" className="text-sm text-gray-800 dark:text-gray-300">
            by NLB
          </Link>
        </div>
        <div>
          <div className="flex justify-between sm:max-w-xs">
            <div className="flex gap-2 opacity-70">
              <div className={`${roboto_mono.className} font-medium`}>
                Draw: {lottery.id}
              </div>
            </div>
            <div className={`${roboto_mono.className} opacity-70`}>
              {lottery.time}
            </div>
          </div>
          <div className={roboto_mono.className + " opacity-60"}>
            <span className="font-medium">{formatMilliseconds(expire_in)}</span>{" "}
            left
          </div>
        </div>
        <div className="flex">
          <div
            className={`${roboto_mono.className}  rounded bg-slate-400 px-2 opacity-80 dark:bg-slate-900`}
          >
            Rs.{lottery.lottery_price}
          </div>
        </div>
        <button
          disabled={loading || expire_in <= 0}
          className="focus mt-3 flex cursor-pointer items-center justify-center gap-1 rounded-lg
  border border-transparent bg-black  px-4 py-2 font-medium text-gray-200
  shadow-md transition-colors hover:bg-gray-900 focus:ring-indigo-300 disabled:bg-black disabled:opacity-50 dark:bg-indigo-900 dark:hover:bg-indigo-950 dark:disabled:bg-indigo-900"
          onClick={() => setLoading((i) => !i)}
        >
          {loading && <Spinner />}{" "}
          {expire_in <= 0 ? "Available soon" : "Buy Now"}
        </button>
      </div>
    </div>
  );
};

export const metadata: Metadata = {
  title: "Buy lottery",
};

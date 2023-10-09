import { poppins, roboto_mono } from "@/lib/fonts";
import Image from "next/image";

export type LotteryCardProps = {
  id?: string;
  name: string;
  num: string;
  date: string;
  res: string[];
  special: string[];
  zodiac?: string;
};

export const LotteryCard = (props: LotteryCardProps) => {
  return (
    <div className="flex flex-col max-w-[320px] w-full bg-indigo-100 rounded-3xl pt-[180px] px-4 pb-4 m-6 dark:bg-dark-black dark:border-2 border-[#ffffff0a] ">
      <div
        className={`${poppins.className} font-bold text-2xl text-gray-900 dark:text-white hover:underline`}
      >
        {props.name}
      </div>
      <div
        className={`${roboto_mono.className} flex justify-between  text-sm text-gray-600 [line-height:1.25rem] dark:text-gray-500`}
      >
        <div>{props.num}</div>
        <div>{props.date}</div>
      </div>
      <div
        className={`${roboto_mono.className} grid grid-flow-col grid-cols-[auto_1fr] items-center mt-4 text-lg `}
      >
        {props.zodiac ? (
          <Image
            className="rounded-sm"
            src={`/static/images/zodiac/${props.zodiac}.webp`}
            alt={`${props.zodiac.toLowerCase()} sign`}
            height={35}
            width={35}
          />
        ) : (
          <div></div>
        )}
        <div className="flex mx-3 items-center">
          <div className="mr-3 flex gap-1">
            {props.special.map((i, n) => (
              <span
                key={n}
                className="border-solid border-2 border-sky-500 flex justify-center  w-8 h-8 rounded-full bg-blue-200 dark:bg-indigo-1000 dark:text-blue-100 dark:border-cyan-900"
              >
                {i}
              </span>
            ))}
          </div>
          <div className="bg-indigo-200 text-indigo-900 flex w-full justify-evenly rounded-full dark:bg-indigo-1000 dark:text-indigo-300">
            {props.res.map((i, n) => (
              <span key={n} className="flex items-center">
                {i.padStart(2, "0")}
              </span>
            ))}
          </div>
        </div>
      </div>
      <button className="mt-4 bg-gray-800 select-none text-white py-1 mx-2 rounded-2xl hover:bg-black transition focus:outline-none focus:ring focus:ring-blue-300 dark:bg-indigo-950 ">
        Check
      </button>
    </div>
  );
};

export const LotteryCardSkeleton = () => {
  return (
    <div
      role="status"
      className="flex flex-col max-w-[320px] w-full bg-indigo-100 rounded-3xl pt-[180px] px-4 pb-4 m-6 dark:bg-dark-black dark:border-2 border-[#ffffff0a] "
    >
      <div className="h-6 bg-indigo-200 rounded-full dark:bg-gray-700 animate-pulse w-58 mt-1.5 "></div>
      <div className="flex justify-between">
        <div className="h-3 bg-indigo-200 rounded-full dark:bg-gray-700 animate-pulse w-14  mt-1.5"></div>
        <div className="h-3 bg-indigo-200 rounded-full dark:bg-gray-700 animate-pulse w-20  mt-1.5"></div>
      </div>

      <div className="flex">
        <div className=" bg-indigo-200 rounded-full dark:bg-gray-700 animate-pulse h-8 w-8 mx-4 mt-5 "></div>
        <div className="bg-indigo-200 rounded-full dark:bg-gray-700 animate-pulse h-8 w-52 mx-4 mt-5"></div>
      </div>
      <div className=" bg-indigo-200 rounded-full dark:bg-gray-700 animate-pulse h-8 w-[270px] mx-2 mt-4 "></div>
    </div>
  );
};

import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const sleep = (time: number) =>
  new Promise((res) => setTimeout(res, time, "done sleeping"));

export const formatMilliseconds = (milliseconds: number) => {
  if (milliseconds < 0) return "0 seconds";

  const units: [string, number][] = [
    ["day", 24 * 60 * 60 * 1000],
    ["hour", 60 * 60 * 1000],
    ["min", 60 * 1000],
  ];
  const formattedTime: string = units
    .map(([unit, divisor]) => {
      const value: number = Math.floor(milliseconds / divisor);
      milliseconds %= divisor;
      return value > 0 ? `${value}${unit}` : null;
    })
    .filter(Boolean)
    .join(" ");

  return formattedTime || "0 seconds";
};

export function getNumberWithSuffix(number: number) {
  const suffix = ["th", "st", "nd", "rd"][number % 10] || "th";
  if (number % 100 >= 11 && number % 100 <= 13) {
    return number + "th";
  }
  return suffix;
}

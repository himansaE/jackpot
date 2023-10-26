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

export const joinTextForPara = (text: string[]) => {
  if (text.length == 1) return text[0];
  return text.join(" or ");
};

export const capitalizeFirstLetter = (text: string) => {
  return text[0].toUpperCase() + text.slice(1);
};
export function getNumberWithSuffix(number: number) {
  const suffix = ["th", "st", "nd", "rd"][number % 10] || "th";
  if (number % 100 >= 11 && number % 100 <= 13) {
    return number + "th";
  }
  return suffix;
}
export function getCookie(name: string): string | null {
  const cookie = document.cookie;
  const cookieIndex = cookie.indexOf(`${name}=`);

  if (cookieIndex !== -1) {
    return cookie.substring(cookieIndex + name.length + 1);
  }

  return null;
}
export const deleteCookie = (cookieName: string) => {
  document.cookie =
    cookieName + "=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
};

export const formatProviders = (name: string) => {
  const providers = {
    email: "Email and Password",
    facebook: "Facebook",
    google: "Google",
  };
  return providers[name as keyof typeof providers];
};

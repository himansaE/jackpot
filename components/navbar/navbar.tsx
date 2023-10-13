import Link from "next/link";
import Image from "next/image";
import clsx from "clsx";
import { poppins } from "@/lib/fonts";
import { validateSession } from "@/lib/auth";
import { SideNav } from "./side-nav";
import { SideNavController } from "./side-nav-controller";
import { Fragment } from "react";
import { Session } from "lucia";

export enum NavType {
  Any,
  LoggedIn,
  NotLoggedIn,
}

export const NAV_LINKS: [string, string, NavType][] = [
  ["Home", "/", NavType.Any],
  ["Dashboard", "/dashboard", NavType.LoggedIn],
  ["Buy Lotteries", "/dashboard/buy", NavType.LoggedIn],
  ["Results", "/results", NavType.Any],
  ["Login", "/auth/login", NavType.NotLoggedIn],
  ["Register", "/auth/register", NavType.NotLoggedIn],
];

export const NavBar = async () => {
  let session: boolean | Session;
  try {
    session = await validateSession();
  } catch (e) {
    session = false;
  }
  return (
    <nav
      className={clsx(
        poppins.className,
        "sticky top-0 z-20 flex select-none justify-center px-4 py-2 font-medium shadow-lg backdrop-blur-xl [background-color:#ffffff87] dark:bg-[#1e2f567d]",
      )}
    >
      <div className="z-50 mx-1 flex w-full ">
        <Link href="/">
          <Image
            className="transition duration-300 dark:contrast-150 dark:hue-rotate-[135deg] dark:invert"
            src={"/static/images/logo_inline.svg"}
            height={40.69}
            width={170}
            alt="Jackpot Logo"
            priority
          />
        </Link>
        <ul className="m-auto  mx-10 ml-14 hidden gap-x-2 [align-items:center] md:flex">
          {NAV_LINKS.map((i) => (
            <Fragment key={i[0]}>
              {i[2] === NavType.Any ||
              (i[2] === NavType.NotLoggedIn &&
                session == false &&
                i[0] != "Register") ||
              (i[2] === NavType.LoggedIn && session != false) ? (
                <li key={i[0]}>
                  <Link
                    className="rounded px-2 py-1 hover:underline focus:outline-none focus:ring focus:ring-blue-300"
                    href={i[1]}
                  >
                    {i[0]}
                  </Link>
                </li>
              ) : (
                <></>
              )}
            </Fragment>
          ))}
        </ul>
        {!session && (
          <Link
            className="ml-auto hidden items-center whitespace-nowrap rounded-md bg-slate-800 px-5 text-white transition-colors hover:bg-slate-900 focus:outline-none focus:ring focus:ring-blue-300 dark:hover:bg-indigo-900 x-sm:flex "
            href="/auth/register"
          >
            Try Now
          </Link>
        )}
      </div>
      <SideNavController>
        <SideNav user={typeof session === "boolean" ? null : session.user} />
      </SideNavController>
    </nav>
  );
};

import { User } from "lucia";
import Link from "next/link";
import { LogoutButton } from "./logout-button";
import { Fragment } from "react";
import { NAV_LINKS, NavType } from "./navbar";

export const SideNav = ({ user }: { user: User | null }) => {
  return (
    <div className="mt-20">
      {user == null ? (
        <div className="mx-2 flex flex-col items-center gap-3.5 text-center">
          <div className="h-20 w-20 rounded-full bg-slate-300 dark:bg-slate-700" />
          <p className="text-2xl font-medium">Welcome to Jackpot</p>
          <p className="text-xs font-thin text-slate-700 dark:text-slate-200">
            Get ready to enjoy and win big! Please log in to your account to get
            started.
          </p>
          <Link
            href="/auth/login"
            className="focus:ring-sky-500-100 focus:ring-sky-000 my-3 w-full max-w-xs rounded-full bg-violet-500 py-1.5 text-indigo-50 outline-none transition-colors hover:bg-opacity-80 focus:ring-2  dark:bg-indigo-700 dark:text-white dark:hover:bg-indigo-800"
          >
            Log In
          </Link>
        </div>
      ) : (
        <div className="mx-2 flex flex-col items-center">
          <div className="mx-3 flex flex-col items-center justify-center gap-1 text-center">
            <div className="h-20 w-20 rounded-full bg-slate-300 dark:bg-slate-700"></div>
            <div>
              <div className="text-3xl font-medium">
                {user.first_name} {user.last_name}
              </div>
              <div className="text-sm  text-gray-700 dark:text-slate-300">
                {user.email}
              </div>
            </div>
          </div>
          <LogoutButton />
        </div>
      )}
      <div className="mt-5 flex w-full px-4 sm:hidden">
        <ul
          role="list"
          aria-labelledby="tabs"
          className="flex w-full flex-col rounded-lg  "
        >
          {NAV_LINKS.map((i) => (
            <Fragment key={i[0]}>
              {i[2] === NavType.Any ||
              (i[2] === NavType.NotLoggedIn && !(user != null)) ||
              (i[2] === NavType.LoggedIn && !(user == null)) ? (
                <li
                  key={i[0]}
                  className="flex overflow-hidden first:rounded-t-xl last:rounded-b-xl"
                >
                  <Link
                    className="my-[1px] w-full bg-slate-200 px-[min(7%,40px)]  py-3 text-slate-700 transition-colors hover:text-slate-500 dark:bg-slate-800  dark:text-slate-300 hover:dark:text-slate-400"
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
      </div>
    </div>
  );
};

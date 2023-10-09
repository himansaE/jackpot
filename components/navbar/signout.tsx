"use client";

import { signOut } from "next-auth/react";
import { Button } from "../ui/button";

export const SignOutNav = () => {
  return (
    <button
      className="bg-slate-800 text-white px-5 ml-auto rounded-md hover:bg-slate-900 focus:outline-none focus:ring focus:ring-blue-300 whitespace-nowrap dark:hover:bg-indigo-900 transition-colors flex items-center"
      onClick={() => signOut({ callbackUrl: "/auth/login" })}
    >
      Sign Out
    </button>
  );
};

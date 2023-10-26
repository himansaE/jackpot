"use client";

import { useState } from "react";
import Spinner from "../ui/spinner";

export const LogoutButton = () => {
  const [submitting, setSubmitting] = useState(false);
  return (
    <button
      className={`focus:ring-sky-500-100 focus:ring-sky-000 mx-2 my-3 flex w-full max-w-xs items-center justify-center gap-2  rounded-full bg-violet-500 py-1.5 text-indigo-50 outline-none transition-colors hover:bg-opacity-80 focus:ring-2 dark:bg-violet-700 ${
        submitting ? "opacity-70" : ""
      }`}
      onClick={async () => {
        if (submitting) return;
        setSubmitting(true);
        const res = await fetch("/api/auth/logout", { method: "POST" })
          .then((i) => i.json)
          .catch((i) => undefined);
        if (res == undefined) {
          alert("Logout Failed. Try again.");
          return setSubmitting(false);
        }
        window.location.assign("/auth/login");
      }}
    >
      {submitting && <Spinner fill="white" />} Log out
    </button>
  );
};

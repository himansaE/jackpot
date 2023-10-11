"use client";

import { useState } from "react";

export const SignOutNav = () => {
  const [submitting, setSubmitting] = useState(false);
  return (
    <button
      disabled={submitting}
      className={`bg-slate-800 text-white px-5 ml-auto rounded-md  whitespace-nowrap transition-colors flex items-center 
        ${
          submitting
            ? "opacity-70 outline-none"
            : " hover:bg-slate-900 dark:hover:bg-indigo-900 focus:outline-none focus:ring focus:ring-blue-300"
        }`}
      onClick={async () => {
        if (submitting) return;
        setSubmitting(true);
        const res = await fetch("/api/auth/logout", { method: "DELETE" })
          .then((i) => i.json)
          .catch((i) => undefined);
        if (res == undefined) return setSubmitting(false);
        window.location.assign("/auth/login");
      }}
    >
      Sign Out
    </button>
  );
};

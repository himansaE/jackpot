"use client";

import { MenuIcon, X } from "lucide-react";
import { ReactNode, useEffect, useState } from "react";

export const SideNavController = ({ children }: { children: ReactNode }) => {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    document.body.style.overflowY = open ? "hidden" : "";
    return () => {
      document.body.style.overflowY = "";
    };
  }, [open]);

  return (
    <>
      <div
        className="relative z-50 ml-2 flex items-center justify-center rounded-md bg-slate-200 px-2 text-slate-700 dark:bg-slate-800 dark:text-slate-200 "
        onClick={() => setOpen((i) => !i)}
      >
        <MenuIcon
          className={`absolute h-7 w-7 transition-all ${
            open ? "rotate-[-45deg] opacity-0" : "opacity-100"
          }`}
        />
        <X
          className={`absolute h-7 w-7 transition-all ${
            !open ? "rotate-45 opacity-0" : "opacity-100"
          }`}
        />
        <div className="h-7 w-7"></div>
      </div>
      <nav
        className="fixed left-0 right-2 top-0 z-40 h-screen w-full bg-slate-100 dark:bg-slate-900 sm:left-auto sm:right-5 sm:top-[80px] sm:h-[400px] sm:w-[400px] sm:rounded-xl sm:px-2 sm:shadow-xl"
        style={{ visibility: open ? "visible" : "hidden" }}
        onClick={(e) => {
          if (e.target instanceof HTMLElement && e.target.tagName === "A")
            setOpen(false);
        }}
      >
        {children}
      </nav>
    </>
  );
};

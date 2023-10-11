import Link from "next/link";
import Image from "next/image";
import clsx from "clsx";
import { poppins } from "@/lib/fonts";
import { SignOutNav } from "./signout";
import { validateSession } from "@/lib/auth";

export const NavBar = async () => {
  let session;
  try {
    session = await validateSession();
  } catch (e) {
    session = null;
  }
  return (
    <nav
      className={clsx(
        poppins.className,
        "flex px-4 py-2 [background-color:#ffffff87] backdrop-blur-xl shadow-lg font-medium select-none justify-center sticky top-0 dark:bg-[#1e2f567d] z-20"
      )}
    >
      <div className="mx-1 w-full flex ">
        <Link href="/">
          <Image
            className="dark:invert dark:hue-rotate-[135deg] dark:contrast-150 transition duration-300"
            src={"/static/images/logo_inline.svg"}
            height={45}
            width={188}
            alt="Jackpot Logo"
            priority
          />
        </Link>
        <ul className="hidden  mx-10 [align-items:center] m-auto md:flex">
          {session != null ? (
            <li>
              <Link
                href="/dashboard"
                className="px-2 py-1 rounded focus:outline-none focus:ring focus:ring-blue-300 hover:underline"
              >
                Dashboard
              </Link>
            </li>
          ) : (
            nav_items.map((i) => (
              <li key={i.name} className="mx-2">
                <Link
                  href={i.url}
                  className="px-2 py-1 rounded focus:outline-none focus:ring focus:ring-blue-300 hover:underline"
                >
                  {i.name}
                </Link>
              </li>
            ))
          )}
        </ul>
        {session ? (
          <SignOutNav />
        ) : (
          <Link
            className="bg-slate-800 text-white px-5 ml-auto rounded-md hover:bg-slate-900 focus:outline-none focus:ring focus:ring-blue-300 whitespace-nowrap dark:hover:bg-indigo-900 transition-colors flex items-center"
            href="/auth/login"
          >
            Login
          </Link>
        )}
      </div>
    </nav>
  );
};

const nav_items: {
  name: string;
  url: string;
}[] = [
  { name: "Lotteries", url: "/lotteries" },
  { name: "Results", url: "/results" },
  { name: "Tools", url: "/tools" },
];

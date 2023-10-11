import { ReactNode } from "react";

export default async function Layout({ children }: { children: ReactNode }) {
  return <main className="mx-1 x-sm:mx-5 my-8">{children}</main>;
}

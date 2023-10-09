import { ReactNode } from "react";

export const DashBoardCard = (props: {
  children: ReactNode;
  className?: string;
}) => (
  <section
    className={`dark:bg-[#02050c] bg-gray-100 x-sm:border-[2px] x-sm:dark:border-[#484a4e17]  x-sm:rounded-lg transition-colors p-5 ${
      props.className ?? " "
    }`}
  >
    {props.children}
  </section>
);

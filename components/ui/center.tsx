import { ReactElement } from "react";

export default function Center(props: {
  className?: string;
  children: ReactElement | ReactElement[];
}) {
  return (
    <div className="flex w-full items-center justify-center">
      <div className={` w-full ${props.className ?? ""}`}>{props.children}</div>
    </div>
  );
}

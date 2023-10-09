import { ReactElement } from "react";

export default function Center(props: {
  className?: string;
  children: ReactElement | ReactElement[];
}) {
  return (
    <div className="flex w-full justify-center items-center">
      <div className={`w-full px mx-6 ${props.className ?? ""}`}>
        {props.children}
      </div>
    </div>
  );
}

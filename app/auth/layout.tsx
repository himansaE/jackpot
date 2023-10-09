import { ReactElement } from "react";

export default function Layout(props: { children: ReactElement }) {
  return <main className="px-3 py-12">{props.children}</main>;
}

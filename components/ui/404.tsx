import { LinkButton } from "./link-button";
import { Lottie } from "./lottie";

export const Page404 = () => (
  <div className="flex flex-col items-center justify-center h-[calc(100vh_-_130px)]">
    <Lottie src="/lottie/no-tickets.lottie" />
    <div className="text-xl font-medium my-8">Error 404. Page not Found.</div>
    <LinkButton href="/dashboard">Dashboard</LinkButton>
  </div>
);

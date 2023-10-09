import { LotteryCardSkeleton } from "@/components/lottery-card";

const Loading = () => (
  <>
    {Array.from({ length: 8 }).map((n, i) => (
      <LotteryCardSkeleton key={i} />
    ))}
  </>
);
export default Loading;

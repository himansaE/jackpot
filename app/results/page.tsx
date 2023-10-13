import { LotteryCard } from "@/components/lottery-card";
import { filter_lottery_data } from "@/lib/filter-data";
import { Metadata } from "next";

const Results = async () => {
  const res = filter_lottery_data(
    await fetch(
      `https://client-proxy.lucky1.lk/api/v1/lottery/results/search?limit=10&offset=0&lottery_id=&draw_number=&draw_date=`,
    ).then((i) => i.json()),
  );

  return (
    <>
      {res.map((i) => (
        <LotteryCard key={i.id} {...i} />
      ))}
    </>
  );
};

export default Results;
export const metadata: Metadata = {
  title: "Lottery Results",
};

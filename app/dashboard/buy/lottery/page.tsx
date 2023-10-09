import { Page404 } from "@/components/ui/404";
import { unfiltered_upcoming_lottery_data } from "@/lib/filter-data";
import { BuyLotteryClient } from "./buy-client";
import { DashBoardCard } from "@/components/dashboard/card";

const LOTTERIES = [
  "mahajana sampatha",
  "mega power",
  "neeroga",
  "govi setha",
  "supiri vasana",
  "jathika sampatha",
  "sevana",
  "vasana sampatha",
  "dhana nidhanaya",
  "daru diri sampatha",
  "nlb handahana",
  "govisetha special",
  "dhana nidhanaya special",
  "mahajana sampatha special",
  "nlb hadahana special",
  "lucky7 special",
  "lucky7",
  "jayaking special",
  "mega power special",
];

const PRIZE_STRUCTURE = {
  "Dhana Nidhanaya": [
    ["Super Prize", "Letter and 4 Numbers Correct", 80000000],
    ["1st", "4 Numbers Correct", 2000000],
    ["2nd", "Letter and Any 3 Numbers Correct", 200000],
    ["3rd", "Any 3 Numbers Correct", 6000],
    ["4th", "Letter and Any 2 Numbers Correct", 2000],
    ["5th", "Any 2 Numbers Correct", 200],
    ["6th", "Letter and Any Number Correct", 120],
    ["7th", "Any Number Correct", 40],
    ["8th", "Letter Correct", 40],
    ["9th", "Letter Correct - Extra Second English Letter", 40],
  ],
  "Mahajana Sampatha": [
    ["Super Prize", "Letter and 6 Numbers Correct", 20000000],
    ["1st", "6 Numbers Correct", 2500000],
    ["2nd", "Last 5 Numbers Correct", 100000],
    ["3rd", "Last 4 Numbers Correct", 15000],
    ["4th", "Last 3 Numbers Correct", 2000],
    ["5th", "Last 2 Numbers Correct", 200],
    ["6th", "Last Number Correct", 40],
    ["7th", "First 5 Numbers Correct", 100000],
    ["8th", "First 4 Numbers Correct", 2000],
    ["9th", "First 3 Numbers Correct", 200],
    ["10th", "First 2 Numbers Correct", 80],
    ["11th", "First Number Correct", 40],
    ["12th", "Letter Correct", 40],
  ],
};

export default function Page({
  searchParams,
}: {
  searchParams: { [key: string]: string | undefined };
}) {
  if (
    !(
      searchParams &&
      searchParams["lottery"] &&
      LOTTERIES.indexOf(searchParams["lottery"]) != -1
    )
  )
    return <Page404 />;

  return <PageRender name={searchParams["lottery"]} />;
}

const PageRender = async (props: { name: string }) => {
  const data = unfiltered_upcoming_lottery_data(
    await fetch("https://client-proxy.lucky1.lk/api/v1/lottery/ongoing", {
      method: "get",
      cache: "no-store",
    })
      .then((i) => i.json())
      .catch(() => undefined)
  );
  if (data == undefined) return <Page404 />;

  const lottery = data.find((i) => i.name.toLowerCase() == props.name);

  if (lottery == undefined) return <Page404 />;

  const prizes = PRIZE_STRUCTURE[lottery.name as keyof typeof PRIZE_STRUCTURE];

  return (
    <section>
      <h2 className="text-4xl font-semibold my-1 mt-8">
        Buy Lottery with Jackpot
      </h2>
      <BuyLotteryClient lottery={lottery} />
      {prizes != null && (
        <DashBoardCard>
          <h2 className="dark:text-white text-black text-2xl font-normal">
            Winning Rules
          </h2>

          <div className="relative overflow-x-auto shadow-md rounded-lg my-4">
            <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
              <thead className="text-sm text-black bg-indigo-200 dark:bg-gray-700 dark:text-white font-normal">
                <tr>
                  <th className="px-6 sm:px-10 py-3">Index</th>
                  <th className="px-6 sm:px-10 py-3">Patten</th>
                  <th className="px-6 sm:px-10 py-3 text-right ">Prize</th>
                </tr>
              </thead>
              <tbody>
                {prizes.map((i, n) => (
                  <tr
                    key={n}
                    className={
                      "bg-indigo-50 dark:bg-[#0d0f19] dark:border-gray-700 hover:bg-indigo-100 dark:hover:bg-[#151828] " +
                      (n != prizes.length - 1
                        ? "border-b dark:border-gray-700"
                        : "")
                    }
                  >
                    {i.map((j, m) => (
                      <td
                        key={m}
                        className={
                          m == 2 ? "text-right px-6 py-4" : " px-6 py-4 "
                        }
                      >
                        {j}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </DashBoardCard>
      )}
    </section>
  );
};

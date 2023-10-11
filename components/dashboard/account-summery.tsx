import { roboto_mono } from "@/lib/fonts";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { DashBoardCard } from "./card";
import { User } from "lucia";

export const AccountCard = async ({ user }: { user: User }) => {
  const data = [
    { name: "Monthly Earnings", val: "Rs.4000", percent: "25%", grow: true },
    { name: "Monthly Spent", val: "Rs.3500", percent: "30%", grow: false },
    { name: "Monthly Withdrawal", val: "Rs.2000", percent: "" },
  ];

  return (
    <DashBoardCard className="w-full p6 flex flex-col">
      <div className="flex justify-between flex-wrap gap-y-3">
        <h2 className="dark:text-white text-black text-2xl font-normal">
          Account Summary
        </h2>
        <Select>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="This Month" />
          </SelectTrigger>
          <SelectContent defaultValue={1}>
            <SelectItem value="1">This Month</SelectItem>
            <SelectItem value="2">Last Month</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <div className="my-8 text-center">
        <div className="text-sm text-gray-400">Account Balance</div>
        <div className={`${roboto_mono.className} text-4xl my-3`}>
          Rs.{user.acc_bal.toString().padStart(2, "0")}.00
        </div>
      </div>
      <div className="flex w-full h-full bg-indigo-100 dark:bg-[#0d0f19] rounded-md px-6 py-6 text-gray-900 dark:text-gray-300">
        <table className="w-full">
          <tbody className="flex flex-col sm:table-row-group gap-6">
            {data.map((i) => (
              <tr
                key={i.name}
                className="grid [grid-template-columns:1fr_1fr_1fr] sm:table-row gap-y-1"
              >
                <td className="col-span-full">{i.name}</td>
                <td
                  className={
                    roboto_mono.className + " text-center sm:text-left"
                  }
                >
                  {i.val}
                </td>
                <td>
                  {typeof i.grow != "undefined" && (
                    <svg
                      width="24px"
                      height="24px"
                      viewBox="0 0 24 24"
                      className={
                        (i.grow
                          ? "rotate-180 text-red-800"
                          : "text-green-800") + " ml-auto mr-1"
                      }
                    >
                      <path fill="currentColor" d="m7 15l5-5l5 5H7Z"></path>
                    </svg>
                  )}
                </td>
                <td className={roboto_mono.className}>
                  <span>{i.percent}</span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </DashBoardCard>
  );
};

import { roboto_mono } from "@/lib/fonts";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "../ui/select";
import { DashBoardCard } from "./card";
import { Fragment } from "react";

const ticket_summary_data = [
  {
    name: (
      <>
        Tickets
        <br /> Brought
      </>
    ),
    val: 7,
  },
  { name: "Monthly Subscriptions", val: 2 },
  {
    name: (
      <>
        Most <br /> Earned by
      </>
    ),
    val: "",
    img: true,
  },
];

export const TicketSummary = () => {
  return (
    <DashBoardCard className="w-full p6 flex flex-col">
      <div className="flex justify-between flex-wrap gap-y-3">
        <h2 className="dark:text-white text-black text-2xl font-normal">
          Tickets Summary
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
      <div className="flex w-full h-full bg-indigo-100 dark:bg-[#0d0f19] rounded-md px-6 py-6 mt-6 text-gray-900 dark:text-gray-300 justify-center">
        <div className="grid [grid-template-columns:1fr_auto_1fr_auto_1fr] gap-3">
          {ticket_summary_data.map((i, n) => (
            <Fragment key={n}>
              <div className="max-w-[120px] text-center flex flex-col items-center">
                <div className={roboto_mono.className + " my-5"}>
                  {i.img === true ? (
                    <div className="h-11 w-11 bg-slate-700 rounded-lg " />
                  ) : (
                    <div className="text-5xl">
                      {i.val.toString().padStart(2, "0")}
                    </div>
                  )}
                </div>
                <div className="text-sm text-gray-800 dark:text-gray-400 mt-auto">
                  {i.name}
                </div>
              </div>
              {n != ticket_summary_data.length - 1 && (
                <div className="border-r border-gray-900"></div>
              )}
            </Fragment>
          ))}
        </div>
      </div>
    </DashBoardCard>
  );
};

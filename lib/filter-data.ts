import { LotteryCardProps } from "@/components/lottery-card";

export const filter_lottery_data = (data: any): LotteryCardProps[] => {
  data = data.data;
  const new_data: LotteryCardProps[] = [];
  for (let i = 0; i < data.length; ++i) {
    const t: LotteryCardProps = {
      num: data[i].draw_number,
      name: data[i].lottery_name,
      date: data[i].draw_date_time,
      res: [] as string[],
      special: [] as string[],
      id: data[i].draw_id,
    };

    data[i].fields.forEach((l: any) => {
      if (l.field == "SPECIAL" || l.field == "SP1") return;

      if ((l.field as string).includes("LAGNA")) {
        return (t.zodiac = l.value);
      }
      if (l.special_field) {
        return t.special.push(l.value);
      }
      if ((l.field as string).includes("CHAR")) {
        return t.special.push(l.value);
      }
      if (l.field == "RECD") {
        return (t.res = l.value.split(""));
      }
      t.res.push(l.value);
    });
    new_data.push(t);
  }
  return new_data;
};

export interface UpcomingCardProps {
  id: string;
  name: string;
  price: string;
  time: string;
  lottery_price: string;
  expireIn: number;
  ongoing: boolean;
}

export const filter_upcoming_lottery_data = (
  data: any
): UpcomingCardProps[] | undefined => {
  if (data == undefined) return undefined;
  const new_data = [];
  for (let i = 0; i < data.length; ++i) {
    if (data[i].is_soldOut || !data[i].is_ongoing) continue;
    if (data[i].draw_number == null) continue;
    new_data.push({
      id: data[i].draw_number,
      name: data[i].lottery_name,
      price: data[i].jackpot_price,
      time: data[i].draw_date_time,
      lottery_price: data[i].lottery_price,
      expireIn:
        new Date(data[i].sales_close_time).getTime() - new Date().getTime(),
      ongoing: data[i].is_ongoing,
    });
  }
  return new_data;
};

export const unfiltered_upcoming_lottery_data = (
  data: any
): UpcomingCardProps[] | undefined => {
  if (data == undefined) return undefined;
  const new_data = [];
  for (let i = 0; i < data.length; ++i) {
    new_data.push({
      id: data[i].draw_number,
      name: data[i].lottery_name,
      price: data[i].jackpot_price,
      time: data[i].draw_date_time,
      lottery_price: data[i].lottery_price,
      expireIn:
        new Date(data[i].sales_close_time).getTime() - new Date().getTime(),
      ongoing: data[i].is_ongoing,
    });
  }
  return new_data;
};

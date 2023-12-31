"use client";
import Image from "next/image";
import { useRouter } from "next/navigation";
type ProviderButtonPros = {
  icon: string;
  name: string;
  link: string;
  type: "in" | "up";
  bg?: string;
  text?: string;
};
export const ProviderButton = (props: ProviderButtonPros) => {
  const router = useRouter();
  return (
    <button
      className={
        "flex w-full items-center justify-center gap-2 rounded-md border border-gray-300 px-4 py-2 font-medium text-gray-800 transition-all hover:bg-slate-100 focus:outline-none focus:ring active:bg-slate-200 dark:bg-white dark:hover:bg-[#36476545] dark:hover:text-white"
      }
      onClick={() =>
        router.push(`${props.link}/?type=${encodeURI(props.type)}`)
      }
      style={{
        backgroundColor: props.bg,
        borderColor: props.bg,
        color: props.text,
      }}
    >
      <Image
        src={props.icon}
        alt={`${props.name} icon`}
        height={24}
        width={24}
        className="h-[24px] w-[24px]"
      />
      Sign{props.type} with {props.name}
    </button>
  );
};

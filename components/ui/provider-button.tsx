import Image from "next/image";
type ProviderButtonPros = {
  icon: string;
  name: string;
  action: () => void;
  type: "in" | "up";
};
export const ProviderButton = (props: ProviderButtonPros) => {
  return (
    <button className="flex items-center justify-center w-[calc(100%_-_ 0.75rem)] gap-2 px-4 py-2 mx-3 font-medium text-gray-800 transition-all border border-gray-300 rounded-md hover:bg-slate-100 active:bg-slate-200 focus:ring focus:outline-none dark:bg-white dark:hover:bg-[#36476545] dark:hover:text-white">
      <Image
        src={props.icon}
        alt={`${props.name} icon`}
        height={24}
        width={24}
        className="h-[24px] w-[24px]"
      />
      Sign {props.type} with {props.name}{" "}
    </button>
  );
};

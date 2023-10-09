import { Input, InputProps } from "./input";

type InputBoxProps = {
  name: string;
} & InputProps;
export const InputBox = (props: InputBoxProps) => {
  return (
    <div>
      <label>
        <div className="mx-0.5 text-sm font-medium text-slate-800 dark:text-slate-300">
          {props.name}
        </div>
        <Input {...props} required />
      </label>
    </div>
  );
};

import { ReactNode, forwardRef } from "react";
import { Input, InputProps } from "./input";

type InputBoxProps = {
  name: string;
  subAction?: ReactNode;
} & InputProps;
export const InputBox = (props: InputBoxProps) => {
  const { subAction, ...inputProps } = props;
  return (
    <div>
      <label>
        <div className="mx-0.5 flex justify-between text-sm font-medium text-slate-800 dark:text-slate-300">
          <div>{props.name}</div>
          <div className="mr-1">{subAction ?? <></>}</div>
        </div>
        <Input {...inputProps} required />
      </label>
    </div>
  );
};

export const InputBoxWithRef = forwardRef<HTMLInputElement, InputBoxProps>(
  (props, ref) => {
    const { subAction, ...inputProps } = props;
    return (
      <div>
        <label>
          <div className="mx-0.5 flex justify-between text-sm font-medium text-slate-800 dark:text-slate-300">
            <div>{props.name}</div>
            <div className="mr-1">{subAction ?? <></>}</div>
          </div>
          <Input {...inputProps} required ref={ref} />
        </label>
      </div>
    );
  },
);

InputBoxWithRef.displayName = "InputBoxWithRef";

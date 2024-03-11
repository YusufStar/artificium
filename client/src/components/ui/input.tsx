import * as React from "react";

import clsx from "clsx";

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, ...props }, ref) => {
    return (
      <input
        type={type}
        className={clsx(
          "w-full flex border-input bg-transparent text-sm 2xl:text-base shadow-sm file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground disabled:cursor-not-allowed disabled:opacity-50 blue-green-500-shadow border border-nobbleBlack-500 focus:border-[#B6F09C] transition-all duration-300 outline-none rounded-[8px] py-2 px-4 !placeholder-nobbleBlack-300",
          className,
          "transition-all duration-300 outline-none rounded-[8px] py-3 px-4 !bg-nobbleBlack-600"
        )}
        ref={ref}
        {...props}
      />
    );
  }
);
Input.displayName = "Input";

export { Input };

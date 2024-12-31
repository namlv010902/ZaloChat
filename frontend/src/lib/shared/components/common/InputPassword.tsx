"use client";
import { cn } from "@lib/utils";
import * as React from "react";
import {Icon} from "src/assets/icons";

export type InputPasswordProps = React.InputHTMLAttributes<HTMLInputElement>;

const InputPassword = React.forwardRef<HTMLInputElement, InputPasswordProps>(
  ({ className, type="password", value, ...props }, ref) => {    
    const [typeInput, setTypeInput] = React.useState(type);
    return (
      <>
        <div className="relative">
          <input
            type={typeInput}
            className={cn(
              "flex bg-white file:border-0 file:bg-transparent file:text-sm file:font-medium w-full",
              className
            )}
            ref={ref}
            value={value}
            {...props}
          />
          {typeInput == "password" ? (
            <span
              onClick={() => setTypeInput("text")}
              className="cursor-pointer absolute right-4 top-[50%] translate-y-[-50%]"
            >
              <Icon name="invisible" />
            </span>
          ) : (
            <span
              onClick={() => setTypeInput("password")}
              className="cursor-pointer absolute right-4 top-[50%] translate-y-[-50%]"
            >
              <Icon name="eye" />
            </span>
          )}
        </div>
      </>
    );
  }
);

InputPassword.displayName = "InputPassword";

export { InputPassword };

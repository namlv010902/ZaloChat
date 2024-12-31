import {
  Control,
  FieldPath,
  FieldValues,
  useController,
} from "react-hook-form";
import { Input, InputPassword } from "../common";
import { cn } from "@lib/utils";

interface FormInputProps<
  TFields extends FieldValues,
  TName extends FieldPath<TFields>
> {
  control: Control<TFields>;
  name: TName;
  label?: string;
  labelIcon?: React.ReactNode;
  labelIconPosition?: "left" | "right";
  labelPosition?: "vertical" | "horizontal";
  labelClassName?: string;
  inputProps?: React.ComponentProps<typeof Input> | React.ComponentProps<typeof InputPassword>;
  type?: "text" | "password";
  onChange?: (value: unknown) => void;
}

function FormInput<TFields extends FieldValues, TName extends FieldPath<TFields>>({
  control,
  name,
  label,
  labelIcon,
  labelIconPosition = "left", 
  labelPosition = "vertical",
  labelClassName,
  inputProps,
  type = "text",
  onChange,
}: FormInputProps<TFields, TName>) {
  const { field, fieldState } = useController({
    name,
    control,
  });

  const InputComponent = type === "password" ? InputPassword : Input;
// console.log("type: " , type);

  return (
    <fieldset
      className={cn(
        "space-y-2 w-full",
        labelPosition === "horizontal" && "flex items-center space-y-0 space-x-4"
      )}
    >
      {label && (
        <label
          htmlFor={inputProps?.id || name}
          className={cn(
            "block text-sm font-medium text-gray-700 flex items-center",
            labelClassName,
            labelPosition === "horizontal" && "min-w-[120px]"
          )}
        >
          {labelIcon && labelIconPosition === "left" && (
            <span className="mr-2">{labelIcon}</span>
          )}
          {label}
          {labelIcon && labelIconPosition === "right" && (
            <span className="ml-2">{labelIcon}</span>
          )}
        </label>
      )}
      <div className="w-full">
        <InputComponent
          {...inputProps}
          {...field}
          onChange={(e) => {
            field.onChange(e);
            onChange?.(e);
          }}
          id={name}
          className={cn(
            inputProps?.className,
            fieldState.invalid &&
              " border-error focus:border-error"
          )}
          ref={inputProps?.ref}
        />
        {fieldState.invalid && !!fieldState.error?.message && (
          <div className="text-sm text-error mt-1">{fieldState.error?.message}</div>
        )}
      </div>
    </fieldset>
  );
}

export {FormInput};

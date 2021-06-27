import { FormControl, FormLabel } from "@chakra-ui/react";
import { Control, Controller, RegisterOptions } from "react-hook-form";
import DatePicker from "./DatePicker";
import { FormError } from "./FormError";
import React from "react";

interface Props {
  name: string;
  label: string;
  placeholder?: string;
  control: Control<Record<string, any>>;
  error: {
    message?: string;
  };
  validationOptions: RegisterOptions;

  [prop: string]: any;
}

export const DatePickerField = ({
  name,
  label,
  error,
  validationOptions,
  placeholder,
  control,
  ...rest
}: Props) => {
  placeholder = placeholder ? placeholder : label;

  return (
    <FormControl isInvalid={error !== undefined} {...rest}>
      <FormLabel htmlFor={name}>{label}</FormLabel>
      <Controller
        name={name}
        control={control}
        render={({ field }) => (
          <DatePicker
            placeholderText={placeholder}
            onChange={(date: Date) => field.onChange(date)}
            selected={field.value}
            id={name}
            minDate={new Date()}
            dateFormat={"d MMM yyyy"}
            shouldCloseOnSelect={true}
          />
        )}
        rules={validationOptions}
      />
      <FormError error={error} />
    </FormControl>
  );
};

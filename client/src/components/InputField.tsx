import { FieldValues, RegisterOptions, UseFormRegister } from "react-hook-form";
import {
  FormControl,
  FormLabel,
  Input,
  InputGroup,
  InputRightElement,
} from "@chakra-ui/react";
import { CheckIcon } from "@chakra-ui/icons";
import { FormError } from "./FormError";
import React from "react";

interface Props {
  name: string;
  label: string;
  placeholder?: string;
  type: string;
  error?: {
    message?: string;
  };
  validationOptions: RegisterOptions;
  register: UseFormRegister<FieldValues>;
  isFieldValid?: boolean;

  [prop: string]: any;
}

export const InputField = ({
  name,
  label,
  type = "text",
  error,
  register,
  validationOptions,
  isFieldValid,
  placeholder,
  ...rest
}: Props) => {
  placeholder = placeholder ? placeholder : label;

  return (
    <FormControl isInvalid={error !== undefined} {...rest}>
      <FormLabel htmlFor={name}>{label}</FormLabel>
      <InputGroup>
        <Input
          id={name}
          placeholder={placeholder}
          type={type}
          {...register(name, validationOptions)}
        />
        {isFieldValid && (
          <InputRightElement
            children={
              <CheckIcon data-testid={"check-icon"} color="green.400" />
            }
          />
        )}
      </InputGroup>
      <FormError error={error} />
    </FormControl>
  );
};

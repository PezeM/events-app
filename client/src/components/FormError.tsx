import React from "react";
import { FormErrorMessage } from "@chakra-ui/react";
import { WarningIcon } from "@chakra-ui/icons";

interface Props {
  error?: {
    message?: string;
  };
}

export const FormError = ({ error }: Props) => {
  if (!error || !error.message) return null;

  return (
    <FormErrorMessage role={"form-error-message"}>
      <WarningIcon mr={1} /> {error.message}
    </FormErrorMessage>
  );
};

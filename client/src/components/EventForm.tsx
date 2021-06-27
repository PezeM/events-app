import React from "react";
import { Box, Button, FormControl, FormLabel } from "@chakra-ui/react";
import { useForm, Controller, SubmitHandler } from "react-hook-form";
import { FormError } from "./FormError";
import DatePicker from "./DatePicker";
import { EventFormInputs } from "../interfaces/eventFormInputs.interface";
import { InputField } from "./InputField";

export const EventForm = () => {
  const {
    handleSubmit,
    register,
    reset,
    control,
    formState: { errors, isSubmitting, touchedFields },
  } = useForm({
    mode: "onTouched",
    reValidateMode: "onChange",
  });

  const onSubmit: SubmitHandler<EventFormInputs> = (values) => {
    console.log("onSubmit", values);
    reset();
  };

  const isFieldValid = (fieldName: string) => {
    return touchedFields[fieldName] && !errors[fieldName];
  };

  return (
    <Box
      p={4}
      mt={4}
      mb={2}
      textAlign="left"
      as="form"
      onSubmit={handleSubmit(onSubmit)}
    >
      <InputField
        name={"firstName"}
        label={"First name"}
        type={"text"}
        error={errors.firstName}
        isFieldValid={isFieldValid("firstName")}
        validationOptions={{
          required: "This field is required",
          minLength: { value: 3, message: "Minimum length should be 3" },
          maxLength: { value: 30, message: "Maximum length should be 30" },
        }}
        register={register}
      />

      <InputField
        name={"lastName"}
        label={"Last name"}
        type={"text"}
        error={errors.lastName}
        isFieldValid={isFieldValid("lastName")}
        validationOptions={{
          required: "This field is required",
          minLength: { value: 3, message: "Minimum length should be 3" },
          maxLength: { value: 30, message: "Maximum length should be 30" },
        }}
        register={register}
        pt={4}
      />

      <InputField
        name={"email"}
        label={"Email"}
        type={"email"}
        error={errors.email}
        isFieldValid={isFieldValid("email")}
        validationOptions={{
          required: "This field is required ",
          pattern: {
            value: /\S+@\S+\.\S+/,
            message: "Entered value does not match email format",
          },
        }}
        register={register}
        pt={4}
      />

      <FormControl isInvalid={errors.eventDate} pt={4}>
        <FormLabel htmlFor="eventDate">Event date</FormLabel>
        <Controller
          name="eventDate"
          control={control}
          render={({ field }) => (
            <DatePicker
              placeholderText="Click to select date"
              onChange={(date: Date) => field.onChange(date)}
              selected={field.value}
              id="eventDate"
              minDate={new Date()}
              dateFormat={"d MMM yyyy"}
              shouldCloseOnSelect={true}
            />
          )}
          rules={{
            required: "This field is required",
          }}
        />
        <FormError error={errors.eventDate} />
      </FormControl>

      <Button
        width="full"
        type="submit"
        mt={8}
        isLoading={isSubmitting}
        loadingText={"Submitting"}
        colorScheme={"blue"}
        spinnerPlacement="end"
      >
        Submit
      </Button>
    </Box>
  );
};

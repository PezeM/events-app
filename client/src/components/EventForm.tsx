import React from "react";
import { Box, Button, useToast } from "@chakra-ui/react";
import { useForm, SubmitHandler } from "react-hook-form";
import { EventFormInputs } from "../interfaces/eventFormInputs.interface";
import { InputField } from "./InputField";
import { DatePickerField } from "./DatePickerField";
import { postFetch } from "../constants/api";

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
  const toast = useToast();

  const onSubmit: SubmitHandler<EventFormInputs> = async (values, e) => {
    try {
      values = { ...values, eventDate: new Date(values.eventDate).getTime() };
      const response = await postFetch("event", values);
      const data = await response.json();

      if (!response.ok) {
        const error = data ? data.message : response.status;
        toast({
          title: "Error",
          description: `Error adding new event: ${error}`,
          status: "error",
        });
        return;
      }

      toast({
        title: "Event created",
        description: "Event has been successfully created!",
        status: "success",
      });

      reset();
      e?.target.reset();
    } catch (error) {
      toast({
        title: "Error",
        description: `Error adding new event: ${error}`,
        status: "error",
      });
    }
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
      id="event-form"
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

      <DatePickerField
        name={"eventDate"}
        label={"Event date"}
        placeholder={"Click to select date"}
        control={control}
        error={errors.eventDate}
        validationOptions={{
          required: "This field is required",
        }}
        pt={4}
      />

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

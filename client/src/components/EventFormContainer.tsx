import React from "react";
import { Box, Heading } from "@chakra-ui/react";
import { EventForm } from "./EventForm";

export const EventFormContainer = () => {
  return (
    <Box
      align={"center"}
      p={2}
      m={"auto auto"}
      width={"full"}
      maxWidth={"400px"}
      boxShadow={"lg"}
      minHeight={"400px"}
      borderRadius={8}
      borderWidth={1}
    >
      <Heading mt={4}>Add new event</Heading>
      <EventForm />
    </Box>
  );
};

import * as React from "react";
import { ChakraProvider, Box, theme, Flex } from "@chakra-ui/react";
import { ColorModeSwitcher } from "./components/ColorModeSwitcher";
import { EventFormContainer } from "./components/EventFormContainer";

export const App = () => (
  <ChakraProvider theme={theme}>
    <Box textAlign="center" fontSize="xl">
      <Flex minH="100vh" p={4} width="full" flexDirection={"column"}>
        <ColorModeSwitcher alignSelf="flex-end" />
        <EventFormContainer />
      </Flex>
    </Box>
  </ChakraProvider>
);

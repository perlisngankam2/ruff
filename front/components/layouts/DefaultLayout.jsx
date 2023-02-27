import { Box, Flex, Hide } from "@chakra-ui/react";
import Header from "../molecules/Header/Header";
import SidebarLayout from "./SidebarLayout";

const DefaultLayout = ({ children }) => {
  return (
   <Box h="full" >
      <Header />
      <Flex h="100vh">
        <Hide below="md">
          <SidebarLayout />
        </Hide>
        <Box w='full' bg='#f7f7fb' overflowY="auto">
        {children}
        </Box>
      </Flex>
    </Box>
  );
};

export default DefaultLayout;

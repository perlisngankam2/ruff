import { Box, Flex, Hide } from "@chakra-ui/react";
import Header from "../molecules/Header/Header";
import SidebarLayout from "./SidebarLayout";

const DefaultLayout = ({ children }) => {
  return (
    <Box>
      <Header />
      <Flex>
        <Hide below="md">
          <SidebarLayout />
        </Hide>
        {children}
      </Flex>
    </Box>
  );
};

export default DefaultLayout;

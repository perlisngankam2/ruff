import { Box, Flex, Hide } from "@chakra-ui/react";
import Header from "../molecules/Header/Header";
import EconomSidebarLayout from "./EconomSidebarLayout";

const EconomeDashboard = ({ children }) => {
  return (
    <Box>
      <Header />
      <Flex>
        <Hide below="md">
          <EconomSidebarLayout />
        </Hide>
        {children}
      </Flex>
    </Box>
  );
};

export default EconomeDashboard;
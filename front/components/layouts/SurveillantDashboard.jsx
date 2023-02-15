import { Box, Flex, Hide } from "@chakra-ui/react";
import Header from "../molecules/Header/Header";
import SurveillantSidebarLayout from "./SurveillantSidebarLayout";

const SurveillantDashboard = ({ children }) => {
  return (
    <Box>
      <Header />
      <Flex>
        <Hide below="md">
          <SurveillantSidebarLayout />
        </Hide>
        {children}
      </Flex>
    </Box>
  );
};

export default SurveillantDashboard;
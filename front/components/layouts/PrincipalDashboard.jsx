import { Box, Flex, Hide } from "@chakra-ui/react";
import Header from "../molecules/Header/Header";
import PrincipalLayout from "./PrincipalLayout";

const PrincipalDashboard = ({ children }) => {
  return (
    <Box>
      <Header />
      <Flex>
        <Hide below="md">
          <PrincipalLayout />
        </Hide>
        {children}
      </Flex>
    </Box>
  );
};

export default PrincipalDashboard;
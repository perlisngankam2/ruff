import { Box, Flex, Hide } from "@chakra-ui/react";
import Header from "../molecules/Header/Header";
import ManagerLayout from "./ManagerLayout";

const ManagerDashboard = ({ children }) => {
  return (
    <Box>
      <Header />
      <Flex>
        <Hide below="md">
          <ManagerLayout />
        </Hide>
        {children}
      </Flex>
    </Box>
  );
};

export default ManagerDashboard;
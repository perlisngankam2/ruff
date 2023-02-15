import { Box, Flex, Hide } from "@chakra-ui/react";
import Header from "../molecules/Header/Header";
import AdminLayout from "./AdminLayout";

const AdminDashboard = ({ children }) => {
  return (
    <Box>
      <Header />
      <Flex>
        <Hide below="md">
          <AdminLayout />
        </Hide>
        {children}
      </Flex>
    </Box>
  );
};

export default AdminDashboard;

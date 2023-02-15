import {
  Flex,
  Heading,
  Stack,
  Box,
  Text,
  Icon,
  Container,
  Table,
  Thead,
  Tbody,
  Tfoot,
  Tr,
  Th,
  Td,
  TableCaption,
  TableContainer,
  SimpleGrid,
  Avatar,
  AvatarBadge,
  AvatarGroup,
} from "@chakra-ui/react";
import DefaultLayout from "../components/layouts/DefaultLayout";
import DashboardCard from "../components/atoms/DashboarCard";
import PaymentNumberAlert from "../components/atoms/PaymentNumberAlert";
import LastStudentRegisteredBox from "../components/atoms/LastStudentRegisteredBox";
import TreasuryBox from "../components/atoms/TreasuryBox";
import LatePayment from "../components/atoms/LatePayment";


function Dashboard() {
  return (
    <DefaultLayout>
      <Box pt="90px" w="full">
        <Box top="-7" overflow="auto" minH="100vh" mx={6}>
          <Heading fontSize="lg" mb={4} color="yellow.500">
            Bienvenue-GSBAB| Admin
          </Heading>

          <Flex flexDir="row" gap="8" mb="9" flexWrap="wrap">
            <DashboardCard color="red.400" name="Elèves" />
            <DashboardCard color="blue.400" name="Personnel" />
            <DashboardCard color="green.400" name="Classes" />
            <DashboardCard color="yellow.400" name="Elèves" />
          </Flex>

          <Flex
            w="full"
            justify="space-between"
            gap="10"
            flexWrap={["wrap", "wrap", "nowrap"]}
          >
            <Flex direction="column" w="75%" gap="5">
              <PaymentNumberAlert />
              <SimpleGrid
                columns={[1, 1, 1, 2]}
                spacing="4"
                p="6"
                textAlign="center"
                rounded="lg"
                color="gray.400"
                borderColor="green.500"
                borderWidth="1px"
                boxShadow="lg"
                py="9"
              >
                <LastStudentRegisteredBox />
                <LastStudentRegisteredBox />
                <LastStudentRegisteredBox />
                <LastStudentRegisteredBox />
                <LastStudentRegisteredBox />
                <LastStudentRegisteredBox />
              </SimpleGrid>
            </Flex>
           

            <Flex flexDir="column" align="center" gap="5">
              <TreasuryBox />
              <LatePayment />
            </Flex>
          </Flex>
        </Box>
      </Box>
    </DefaultLayout>
  );
}

export default Dashboard;

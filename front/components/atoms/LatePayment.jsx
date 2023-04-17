import {
  Box,
  Flex,
  Icon,
  Table,
  TableContainer,
  Tbody,
  Td,
  Text,
  Tr,
} from "@chakra-ui/react";
import { RiMoneyDollarCircleLine } from "react-icons/ri";
import { useTranslation } from "next-i18next";

const LatePayment = () => {

const {t} = useTranslation();

  return (
    <Box
      borderColor="yellow.500"
      w="300px"
      borderWidth="1px"
      borderRadius="20px"
      overflow="auto"
    >
      <Flex position="relative" justify="space-between" p="1em" top={-3} mr={3}>
        <Text
          letterSpacing="tight"
          fontSize="xl"
          color="red"
          align="flex-start"
          fontWeight="bold"
        >
          {t('atoms.LatePayment.titleLatePayment')}
        </Text>
        <Icon
          alignContent="right"
          as={RiMoneyDollarCircleLine}
          color="green.500"
          boxSize={8}
        />
      </Flex>
      <TableContainer position="relative" top="-5">
        <Table variant="striped" colorScheme="gray" size="12px">
          <Tbody>
            <Tr mx={6} color="red">
              <Td>9 265 000 Frais d'inscription</Td>
            </Tr>
            <Tr color="red">
              <Td>2250 000 FCFA frais d'APEE</Td>
            </Tr>
            <Tr color="red">
              <Td>2250 000 FCFA frais d'Examenx</Td>
            </Tr>
            <Tr color="red">
              <Td>350 523 FCFA de paie</Td>
            </Tr>
            <Tr color="red">
              <Td>465 000 FCFA d'action</Td>
            </Tr>
          </Tbody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default LatePayment;

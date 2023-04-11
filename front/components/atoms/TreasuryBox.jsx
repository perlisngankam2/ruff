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
import { BsFillCreditCardFill } from "react-icons/bs";
import { useTranslation } from "next-i18next";

const TreasuryBox = () => {

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
          {t('atoms.TreasuryBox.titreTresorerie')}  
        </Text>
        <Icon
          alignContent="right"
          as={BsFillCreditCardFill}
          color="green.500"
          boxSize={8}
        />
      </Flex>
      <TableContainer position="relative" top="-5">
        <Table variant="striped" colorScheme="gray" size="12px">
          <Tbody mx={6}>
            <Tr mx={6} color="green.500">
              <Td>9 265 000 Frais d'inscription</Td>
            </Tr>
            <Tr color="green.500">
              <Td>2250 000 FCFA frais d'APEE</Td>
            </Tr>
            <Tr color="green.500">
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

      <Text
        letterSpacing="tight"
        fontSize="md"
        color="yellow.500"
        fontWeight="bold"
        px="4"
        py="-2"
      >
        Solde:
      </Text>
      <Flex position="relative" justify="space-between" mx="5">
        <Text
          position="relative"
          letterSpacing="tight"
          fontSize="md"
          color="green.500"
          align="flex-start"
        >
          11 567 700 FCFA
        </Text>
        <Text
          letterSpacing="tight"
          fontSize="md"
          color="yellow.500"
          fontWeight="bold"
        >
          Decembre
        </Text>
      </Flex>
    </Box>
  );
};

export default TreasuryBox;

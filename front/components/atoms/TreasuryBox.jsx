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
import { RiMoneyDollarCircleLine } from "react-icons/ri";

import { useTranslation } from "next-i18next";
import { GET_ALL_EXPENSE_PERSONNEL_STUDENT } from "../../graphql/Queries";
import { useQuery, useMutation } from "@apollo/client";
import React, { useEffect, useState } from "react";

const TreasuryBox = () => {
  const { t } = useTranslation();

  const { data: dataExpensePersonnelStudent } = useQuery(
    GET_ALL_EXPENSE_PERSONNEL_STUDENT
  );

  let totalDebit = dataExpensePersonnelStudent?.findallexpenses.reduce(
    (acc, curr) => acc + curr.debitamount,
    0
  );

  let totalCredit = dataExpensePersonnelStudent?.findallexpenses.reduce(
    (acc, curr) => acc + curr.creditamount,
    0
  );

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
          align="flex-staBsFillCreditCardFillrt"
          fontWeight="bold"
        >
          {t("atoms.TreasuryBox.titreTresorerie")}
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
          <Tbody mx={6}>
            <Tr mx={6} color="green.500">
              <Td>{totalCredit} FCFA Frais de scolarite</Td>
            </Tr>
            <Tr color="red">
              <Td>{totalDebit} FCFA de paie</Td>
            </Tr>
            {/* <Tr color="green.500">
              <Td> FCFA en caisse</Td>
            </Tr>
            <Tr color="red">
              <Td>350 523 FCFA de paie</Td>
            </Tr>
            <Tr color="red">
              <Td>465 000 FCFA d'action</Td>
            </Tr> */}
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
        Montant total en caisse:
      </Text>
      <Flex position="relative" justify="space-between" mx="5">
        <Text
          position="relative"
          letterSpacing="tight"
          fontSize="md"
          color="green.500"
          align="flex-start"
        >
          {totalCredit -totalDebit} FCFA
        </Text>
        <Text
          letterSpacing="tight"
          fontSize="md"
          color="yellow.500"
          fontWeight="bold"
        >
          {(new Date).toLocaleDateString()}
        </Text>
      </Flex>
    </Box>
  );
};

export default TreasuryBox;

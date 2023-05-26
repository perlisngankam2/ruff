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
import React, { createContext, use, useContext, useEffect } from "react";
import { useMutation, useQuery } from "@apollo/client";
import {
  GET_ALL_TRANCHE_PENSION,
  GET_TRANCHE_PENSION_BY_ID,
} from "../../graphql/Queries";

const LatePayment = () => {
  const { data: dataTranchePension } = useQuery(GET_ALL_TRANCHE_PENSION);

  const dateLineInscription = dataTranchePension?.findAlltranche.map(
    (tranche) => {
      if (tranche.name.toLowerCase() === "inscription") {
        return new Date(tranche.dateLine).toLocaleDateString();
      } else {
        return null; // ou une valeur par défaut si vous ne voulez pas afficher de dateline
      }
    }
  );

  console.log(dateLineInscription);
  // console.log(dateLineInscription.toDateString());


  const dateLineTrancheOne = dataTranchePension?.findAlltranche.map(
    (tranche) => {
      if (tranche.name.toLowerCase() === "tranche 1") {
        return new Date(tranche.dateLine).toLocaleDateString();
      } else {
        return null; // ou une valeur par défaut si vous ne voulez pas afficher de dateline
      }
    }
  );

  const dateLineTrancheTwo = dataTranchePension?.findAlltranche.map(
    (tranche) => {
      if (tranche.name.toLowerCase() === "tranche 2") {
        return new Date(tranche.dateLine).toLocaleDateString();
      } else {
        return null; // ou une valeur par défaut si vous ne voulez pas afficher de dateline
      }
    }
  );
  // const {data:dataTrancheById} = useQuery(GET_TRANCHE_PENSION_BY_ID,
  //   {
  //     variables:{id: tranche?.id}
  //   }
  // );

  // const getTrancheById = (id) => {
  //   return dataTranchePension?.findAlltranche?.find((t, i) => t.id === id);
  // };

  const { t } = useTranslation();
  useEffect(() => {
    console.log(dataTranchePension);
  });

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
          {t("atoms.LatePayment.titleLatePayment")}
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
          {/* dataTranche*/}
          <Tbody>
            <Tr mx={6} color="red">
              <Td>
                {/* {dataTranches?.findAllTranche.name === "Inscription"? dataTranches?.findAllTranche.dateLine : null} */}
              </Td>
            </Tr>
            <Tr color="black">
              <Td>
                Délais de l'inscription: {""}
                {dateLineInscription}
              </Td>
            </Tr>
            <Tr color="black">
              <Td>
                Délais de la tranche 1: {""}
                {dateLineTrancheOne}
              </Td>
            </Tr>
            <Tr color="black">
              <Td>
                Délais de la tranche 2 : {""}
                {dateLineTrancheTwo}
              </Td>
            </Tr>
            {/* <Tr color="red">
              <Td>465 000 FCFA d'action</Td>
            </Tr> */}
          </Tbody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default LatePayment;

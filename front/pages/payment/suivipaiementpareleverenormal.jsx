import {
  Box,
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Heading,
  Text,
  Center,
  InputGroup,
  InputLeftElement,
  Input,
  Icon,
  Flex,
  FormControl,
  FormLabel,
  Hide,
  Show,
  Stack,
  Divider,
  Image,
  Table,
  Thead,
  Tbody,
  Tfoot,
  Tr,
  Th,
  Td,
  TableCaption,
  TableContainer,
} from "@chakra-ui/react";
// import { useTranslation} from 'next-i18next';
import { CiSearch } from "react-icons/ci";
import DefaultLayout from "../../components/layouts/DefaultLayout";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { useAuth } from "../../contexts/account/Auth/Auth";

const SuiviPaiementParEleveReNormal = () => {
  const { setAuthToken, authToken } = useAuth();
  const router = useRouter();

  // const {t} = useTranslation();
  useEffect(() => {
    if (!authToken) {
      router.back();
    }
  }, [authToken]);

  return (
    <DefaultLayout>
      <Center>
        <Box
          //  gap={6}
          // mt={'10'}
          // display={{md:'flex'}}
          // mb={'20px'}
          border={"1px"}
          mt={"40px"}
          ml={"50px"}
        >
          <Box mb={"2"} borderBottom={"1px"}>
            <Heading textAlign={"center"} fontSize={["2xl", "2xl", "2xl"]}>
              GROUPE SCOLAIRE BILINGUE AWONO BILOGUE
            </Heading>
          </Box>
          <Box borderBottom={"1px"} mt={"30px"}>
            <Heading textAlign={"center"} fontSize={["xl", "xl", "xl"]}>
              T3: TABLEAU DE SUIVI DE PAYEMENT PAR ELEVE : Régime normal de
              Paiement
            </Heading>
          </Box>
          <Box ml={"12px"}>
            <Box display={"flex"} mt={"30px"}>
              <Text>Nom et Prénom</Text>
              <Text>
                ......................................
                .....................................................
              </Text>
              <Text>Classe</Text>
              <Text>..........................</Text>
              <Text>Section</Text>
              <Text>.............................</Text>
            </Box>
            <Box display={"flex"} mt={"20px"}>
              <Text>Matricule</Text>
              <Text>............................................</Text>
              <Text>Né(e) le</Text>
              <Text>
                ................../......................./.......................
              </Text>
              <Text>à</Text>
              <Text>.........................................</Text>
              <Text>age</Text>
              <Text>...........................</Text>
              <Text>Sexe</Text>
              <Text>............................</Text>
            </Box>
            <Box display={"flex"} mt={"20px"}>
              <Text>Père</Text>
              <Text>...................................................</Text>
              <Text>Téléphone</Text>
              <Text>.........................................</Text>
              <Text>mère</Text>
              <Text>..............................</Text>
              <Text>Téléphone</Text>
              <Text>............................</Text>
            </Box>
            <Box display={"flex"} mt={"20px"} mb={"30px"}>
              <Text>Tuteur</Text>
              <Text>...................................................</Text>
              <Text>Téléphone</Text>
              <Text>.........................................</Text>
              <Text>mère</Text>
              <Text>..............................</Text>
              <Text>Téléphone</Text>
              <Text>............................</Text>
            </Box>
          </Box>
          <Box borderTop={"1px"}>
            <TableContainer>
              <Table size="sm">
                {/* <Thead>
                                        <Tr ml={'100px'}>
                                            <Th></Th>
                                            <Th></Th>
                                            <Th></Th>
                                            <Th></Th>
                                            <Th  borderLeft={'1px'}></Th>
                                            <Th colSpan={'2'} >Paiement</Th>
                                            <Th colSpan={'3'} borderLeft={'1px'}>Remettant(e)</Th>
                                        </Tr>
                                    </Thead> */}
                <Tbody>
                  <Tr ml={"100px"}>
                    <Th rowSpan={"2"}>Libelle</Th>
                    <Th rowSpan={"2"}>Montant a payer</Th>
                    <Th rowSpan={"2"}>delais</Th>
                    <Th rowSpan={"2"}>Reste a payer</Th>
                    <Th textAlign={"center"} colSpan={"3"} borderLeft={"1px"}>
                      Paiement
                    </Th>
                    <Th textAlign={"center"} colSpan={"2"} borderLeft={"1px"}>
                      Remettant(e)
                    </Th>
                  </Tr>
                  <Tr borderTop={"0px"}>
                    <Td borderLeft={"1px"}>Libelle</Td>
                    <Td>Montant</Td>
                    <Td>multiply by</Td>
                    <Td>into</Td>
                    <Td>To convert</Td>
                  </Tr>
                  <Tr>
                    <Td>inches</Td>
                    <Td>millimetres</Td>
                    <Td>25.4</Td>
                    <Td>millimetres</Td>
                    <Td>millimetres </Td>
                    <Td>mill </Td>
                    <Td>millim</Td>
                    <Td>mill</Td>
                    <Td>milli </Td>
                  </Tr>
                  <Tr>
                    <Td>inches</Td>
                    <Td>millimetres (mm)</Td>
                    <Td>25.4</Td>
                    <Td>milli</Td>
                    <Td>milli</Td>
                    <Td>millimetres</Td>
                    <Td>millimetres</Td>
                    <Td>milli</Td>
                    <Td>milli</Td>
                  </Tr>
                  <Tr>
                    <Td>inches</Td>
                    <Td>millimet</Td>
                    <Td>25.4</Td>
                    <Td>millimetres</Td>
                    <Td>millimetres </Td>
                    <Td>millimetres</Td>
                    <Td>millimetres</Td>
                    <Td>milli</Td>
                    <Td>milli</Td>
                  </Tr>
                </Tbody>
                <Tfoot>
                  <Tr>
                    <Th>Total</Th>
                  </Tr>
                </Tfoot>
              </Table>
            </TableContainer>
          </Box>
        </Box>
      </Center>
    </DefaultLayout>
  );
};

export default SuiviPaiementParEleveReNormal;

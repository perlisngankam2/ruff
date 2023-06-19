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
import { useQuery } from "@apollo/client";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import {
  GET_STATISTICS_TRANCHE1_PRIMAIRE_ANGLOPHONE_SECTION,
  GET_TOTAL_STATISTICS_TRANCHE1_PRIMAIRE_ANGLOPHONE_SECTION,
  GET_STATISTICS_TRANCHE1_PRIMAIRE_FRANCOPHONE_SECTION,
  GET_TOTAL_STATISTICS_TRANCHE1_PRIMAIRE_FRANCOPHONE_SECTION,
} from "../../graphql/Queries";
import { useAuth } from "../../contexts/account/Auth/Auth";

import DefaultLayout from "../../components/layouts/DefaultLayout";

const SuiviPaiementPremiereTranche = () => {
  const { setAuthToken, authToken } = useAuth();
  const router = useRouter();

  const {
    data: dataTranche1StatisticsClassAnglophoneSection,
    loading,
    error,
  } = useQuery(GET_STATISTICS_TRANCHE1_PRIMAIRE_ANGLOPHONE_SECTION);
  const { data: dataTotalTranche1StatisticsClassAnglophoneSection } = useQuery(
    GET_TOTAL_STATISTICS_TRANCHE1_PRIMAIRE_ANGLOPHONE_SECTION
  );

  const { data: dataTranche1StatisticsClassFrancophoneSection } = useQuery(
    GET_STATISTICS_TRANCHE1_PRIMAIRE_FRANCOPHONE_SECTION
  );
  const { data: dataTotalTranche1StatisticsClassFrancophoneSection } = useQuery(
    GET_TOTAL_STATISTICS_TRANCHE1_PRIMAIRE_FRANCOPHONE_SECTION
  );
  // const {t} = useTranslation();
  useEffect(() => {
    if (!authToken) {
      router.back();
    }
  }, [authToken]);

  if (loading) return <Text>Chargement en cours...</Text>;
  if (error) return <Text>Error: {error.message}</Text>;
  
  return (
    <DefaultLayout>
      <Center mt="70px">
        <Box
          //  gap={6}
          // mt={'10'}
          // display={{md:'flex'}}
          // mb={'20px'}
          border={"1px"}
          mt={"30px"}
          ml={"50px"}
        >
          <Box mb={"2"} borderBottom={"1px"}>
            <Heading textAlign={"center"} fontSize={["2xl", "2xl", "2xl"]}>
              GROUPE SCOLAIRE BILINGUE AWONO BILOGUE
            </Heading>
          </Box>
          <Box borderBottom={"1px"} mt={"30px"} display={{ md: "flex" }}>
            <Heading textAlign={"center"} fontSize={["xl", "xl", "xl"]}>
              T1 bis: TABLEAU DE SUIVI DU PAIEMENT DES FRAIS DE PREMIERE TRANCHE
            </Heading>
          </Box>

          <Box>
            <TableContainer>
              <Table size="sm">
                <Thead>
                  <Tr ml={"100px"}>
                    <Th rowSpan={2} border={"1px"}>
                      SECTIONS
                    </Th>
                    <Th rowSpan={2} border={"1px"}>
                      CLASSES
                    </Th>
                    <Th rowSpan={2} border={"1px"}>
                      EFFECTIFS ENREGISTRES
                    </Th>
                    <Th rowSpan={2} border={"1px"}>
                      MONTANT ATTENDU
                    </Th>
                    <Th colSpan={4} textAlign={"center"} border={"1px"}>
                      ENCAISSEMENT
                    </Th>
                    <Th colSpan={4} textAlign={"center"} border={"1px"}>
                      RESTE A RECOUVRIR
                    </Th>
                  </Tr>
                  <Tr ml={"100px"}>
                    <Th border={"1px"}>NOMBRE</Th>
                    <Th border={"1px"}>TAUX</Th>
                    <Th border={"1px"}>MONTANT EN CAISSE</Th>
                    <Th border={"1px"}>TAUX</Th>
                    <Th textAlign={"center"} border={"1px"}>
                      NOMBRE
                    </Th>
                    <Th textAlign={"center"} border={"1px"}>
                      TAUX
                    </Th>
                    <Th textAlign={"center"} border={"1px"}>
                      MONTANT
                    </Th>
                    <Th textAlign={"center"} border={"1px"}>
                      TAUX
                    </Th>
                  </Tr>
                </Thead>
                {dataTranche1StatisticsClassFrancophoneSection && (
                  <Tbody>
                    {dataTranche1StatisticsClassFrancophoneSection.getSectionStatisticsFrancophoneFirstInstalment.map(
                      (francophoneClasse, index) => (
                        <Tr>
                          <Td border={"1px"}>
                            {francophoneClasse.sectionName}
                          </Td>
                          <Td border={"1px"}>{francophoneClasse.className}</Td>
                          <Td border={"1px"}>
                            {francophoneClasse.numberOfStudents}
                          </Td>
                          <Td border={"1px"}>
                            {francophoneClasse.expectedAmount}
                          </Td>
                          <Td border={"1px"}>
                            {francophoneClasse.numberOfStudentsStartedPaying}{" "}
                          </Td>
                          <Td border={"1px"}>{francophoneClasse.TAUXA}%</Td>
                          <Td border={"1px"}>
                            {francophoneClasse.sumAmountAlreadyPaid}
                          </Td>
                          <Td border={"1px"}>{francophoneClasse.TAUXB}%</Td>
                          <Td border={"1px"}>
                            {francophoneClasse.numberOfStudentsNotPaid}
                          </Td>
                          <Td border={"1px"}>{francophoneClasse.TAUXC}%</Td>
                          <Td border={"1px"}>{francophoneClasse.amountRest}</Td>
                          <Td border={"1px"}>{francophoneClasse.TAUXD}%</Td>
                        </Tr>
                      )
                    )}
                  </Tbody>
                )}
                {dataTotalTranche1StatisticsClassFrancophoneSection && (
                  <Tbody>
                    {dataTotalTranche1StatisticsClassFrancophoneSection.TotalSectionStatisticsFrancophoneFirstInstalmentFee.map(
                      (totalFrancophoneClasse, index) => (
                        <Tr key={index}>
                          <Td border={"1px"} fontWeight={"bold"}>
                            Total
                          </Td>
                          <Td border={"1px"}></Td>
                          <Td border={"1px"}>
                            {totalFrancophoneClasse.TOTAL_EFFECTIFS_ENREGISTRES}
                          </Td>
                          <Td border={"1px"}>
                            {totalFrancophoneClasse.TOTAL_MONTANT_ATTENDU}
                          </Td>
                          <Td border={"1px"}>
                            {totalFrancophoneClasse.TOTAL_NOMBRE_ENCAISSEMENT}
                          </Td>
                          <Td border={"1px"}>
                            {
                              totalFrancophoneClasse.TOTAL_FIRST_TAUX_ENCAISSEMENT
                            }
                            %
                          </Td>
                          <Td border={"1px"}>
                            {totalFrancophoneClasse.TOTAL_MONTANT_EN_CAISSE}
                          </Td>
                          <Td border={"1px"}>
                            {
                              totalFrancophoneClasse.TOTAL_SECOND_TAUX_ENCAISSEMENT
                            }
                            %
                          </Td>
                          <Td border={"1px"}>
                            {
                              totalFrancophoneClasse.TOTAL_NOMBRE_SANS_ENCAISSEMENT
                            }
                          </Td>
                          <Td border={"1px"}>
                            {totalFrancophoneClasse.TOTAL_FIRST_TAUX_RECOUVRIR}%
                          </Td>
                          <Td border={"1px"}>
                            {totalFrancophoneClasse.TOTAL_RESTE_A_RECOUVRER}
                          </Td>
                          <Td border={"1px"}>
                            {totalFrancophoneClasse.TOTAL_SECOND_TAUX_RECOUVRIR}
                            %
                          </Td>
                        </Tr>
                      )
                    )}
                  </Tbody>
                )}
                {dataTranche1StatisticsClassAnglophoneSection && (
                  <Tbody>
                    {dataTranche1StatisticsClassAnglophoneSection.getSectionStatisticsAnglophoneFirstInstalment.map(
                      (anglophoneclasse, index) => (
                        <Tr border={"1px"} key={index}>
                          <Td border={"1px"} rowSpan={1}>
                            {anglophoneclasse.sectionName}
                          </Td>
                          <Td border={"1px"}>{anglophoneclasse.className}</Td>
                          <Td border={"1px"}>
                            {anglophoneclasse.numberOfStudents}
                          </Td>
                          <Td border={"1px"}>
                            {anglophoneclasse.expectedAmount}
                          </Td>
                          <Td border={"1px"}>
                            {anglophoneclasse.numberOfStudentsStartedPaying}
                          </Td>
                          <Td border={"1px"}>{anglophoneclasse.TAUXA}%</Td>
                          <Td border={"1px"}>
                            {anglophoneclasse.sumAmountAlreadyPaid}
                          </Td>
                          <Td border={"1px"}>{anglophoneclasse.TAUXB}%</Td>
                          <Td border={"1px"}>
                            {anglophoneclasse.numberOfStudentsNotPaid}
                          </Td>
                          <Td border={"1px"}>{anglophoneclasse.TAUXC}%</Td>
                          <Td border={"1px"}>{anglophoneclasse.amountRest}</Td>
                          <Td border={"1px"}>{anglophoneclasse.TAUXD}%</Td>
                        </Tr>
                      )
                    )}
                  </Tbody>
                )}
                {dataTotalTranche1StatisticsClassAnglophoneSection && (
                  <Tbody>
                    {dataTotalTranche1StatisticsClassAnglophoneSection.TotalSectionStatisticsAnglophoneFirstInstalmentFee.map(
                      (totalAnglophoneclasse, index) => (
                        <Tr key={index}>
                          <Td border={"1px"} fontWeight={"bold"}>
                            Total
                          </Td>
                          <Td border={"1px"}></Td>
                          <Td border={"1px"}>
                            {totalAnglophoneclasse.TOTAL_EFFECTIFS_ENREGISTRES}
                          </Td>
                          <Td border={"1px"}>
                            {totalAnglophoneclasse.TOTAL_MONTANT_ATTENDU}
                          </Td>
                          <Td border={"1px"}>
                            {totalAnglophoneclasse.TOTAL_NOMBRE_ENCAISSEMENT}
                          </Td>
                          <Td border={"1px"}>
                            {
                              totalAnglophoneclasse.TOTAL_FIRST_TAUX_ENCAISSEMENT
                            }
                            %
                          </Td>
                          <Td border={"1px"}>
                            {totalAnglophoneclasse.TOTAL_MONTANT_EN_CAISSE}
                          </Td>
                          <Td border={"1px"}>
                            {
                              totalAnglophoneclasse.TOTAL_SECOND_TAUX_ENCAISSEMENT
                            }
                            %
                          </Td>
                          <Td border={"1px"}>
                            {
                              totalAnglophoneclasse.TOTAL_NOMBRE_SANS_ENCAISSEMENT
                            }
                          </Td>
                          <Td border={"1px"}>
                            {totalAnglophoneclasse.TOTAL_FIRST_TAUX_RECOUVRIR}%
                          </Td>
                          <Td border={"1px"}>
                            {totalAnglophoneclasse.TOTAL_RESTE_A_RECOUVRER}
                          </Td>
                          <Td border={"1px"}>
                            {totalAnglophoneclasse.TOTAL_SECOND_TAUX_RECOUVRIR}%
                          </Td>
                        </Tr>
                      )
                    )}
                  </Tbody>
                )}
              </Table>
            </TableContainer>
          </Box>
        </Box>
      </Center>
    </DefaultLayout>
  );
};

export default SuiviPaiementPremiereTranche;

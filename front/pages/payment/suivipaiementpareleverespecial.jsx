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
import { useEffect } from 'react';
import { useAuth } from '../../contexts/account/Auth/Auth';
import { useRouter } from "next/router";



const SuiviPaiementParEleveReSpecial = () => {
  // const {t} = useTranslation();
  const { setAuthToken, authToken } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!authToken) {
      router.back();
    }
  }, [authToken]);

  return (
    <DefaultLayout>
      <Center>
        <Box>
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
                GROUPE SCOLAIE BILINGUE AWONO BILOGUE
              </Heading>
            </Box>
            <Box borderBottom={"1px"} mt={"30px"}>
              <Heading textAlign={"center"} fontSize={["xl", "xl", "xl"]}>
                T3: TABLEAU DE SUIVI DE PAYEMENT PAR ELEVE : Régime Spécial de
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
                  <Thead>
                    <Tr colspan={"3"}>
                      <Th>xfhfgnzshfgn</Th>
                      <Th isNumeric>multiply by</Th>
                    </Tr>
                    <Tr borderTop={"1px"}>
                      <Th>To convert</Th>
                      <Th>into</Th>
                      <Th isNumeric>multiply by</Th>
                      <Th>To convert</Th>
                      <Th>into</Th>
                      <Th isNumeric>multiply by</Th>
                      <Th borderLeft={"1px"}>To convert</Th>
                      <Th>into</Th>
                      <Th isNumeric>multiply by</Th>
                    </Tr>
                  </Thead>
                  <Tbody>
                    <Tr>
                      <Td>inches</Td>
                      <Td>millimetres</Td>
                      <Td isNumeric>25.4</Td>
                      <Td>millimetres</Td>
                      <Td>millimetres</Td>
                      <Td>millimetres </Td>
                      <Td>millimetres</Td>
                      <Td>millimetres</Td>
                      <Td>milli</Td>
                    </Tr>
                    <Tr>
                      <Td>inches</Td>
                      <Td>millimetres (mm)</Td>
                      <Td isNumeric>25.4</Td>
                      <Td>millimetres</Td>
                      <Td>millimetres </Td>
                      <Td>millimetres</Td>
                      <Td>millimetres</Td>
                      <Td>milli</Td>
                      <Td>milli</Td>
                    </Tr>
                    <Tr>
                      <Td>inches</Td>
                      <Td>millimetres (mm)</Td>
                      <Td isNumeric>25.4</Td>
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
        </Box>
      </Center>
    </DefaultLayout>
  );
};

export default SuiviPaiementParEleveReSpecial;

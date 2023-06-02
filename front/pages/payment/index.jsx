import { SearchIcon } from "@chakra-ui/icons";
import {
  Box,
  Center,
  Heading,
  Flex,
  ButtonGroup,
  Button,
  Input,
  InputGroup,
  InputRightElement,
  Icon,
  Hide,
  // Link as Links,
  Grid,
  Text,
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
import Link from "next/link";
import Routes from "../../modules/routes";
import {  } from "next/router";
import { useRouter } from "next/router";
import { FiEdit, FiSearch } from "react-icons/fi";
import { IoClose } from "react-icons/io";
import DefaultLayout from "../../components/layouts/DefaultLayout";
// import PaySlip from "./PaySlip";
import { useState, useEffect } from "react";
import { useMutation, useQuery } from "@apollo/client";
import { GET_ALL_PERSONNELS } from "../../graphql/Queries";
import ReactPaginate from "react-paginate";
import { useAuth } from "../../contexts/account/Auth/Auth";

const Payment = () => {
  // const [searchName, setSearchName] = useState("");
  const { setAuthToken, authToken } = useAuth();

  //STATE DE LA PAGINATION
  const itemsPerPage = 8;
  const [pageNumber, setPageNumber] = useState(0);
  const pagesVisited = pageNumber * itemsPerPage;

  const { data: dataPersonnel, loading, error } = useQuery(GET_ALL_PERSONNELS);
  const [personnel, setPersonnel] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [searchName, setSearchName] = useState("");
const router = useRouter()

  useEffect(() => {
    if (!authToken) {
      router.back();
    }
  }, [authToken]);

  const handleChange = (e) => {
    setSearchName(e.target.value);
    // const newFilter =   dataPersonnel.findAllpersonnel
    //           .filter((personnel) =>{
    //           return  (personnel.firstName.toLowerCase().includes (searchName.toLowerCase()) || personnel.lastName.toLowerCase().includes (searchName.toLowerCase()) || personnel.fonction.toLowerCase().includes (searchName.toLowerCase()))

    //         } );
    // if (searchName === ""){
    //   setFilteredData([]);
    // }else {
    //     setFilteredData(newFilter);
    // }
  };

  const pageCountPersonnel = Math.ceil(
    dataPersonnel?.findAllpersonnel.length / itemsPerPage
  );

  const changePage = ({ selected }) => {
    setPageNumber(selected);
  };
  return (
    <DefaultLayout>
      <Box p={"10px"} w="full" minH="100vh" bgColor="colors.tertiary" pt="70px">
        <Flex
          align="center"
          justify="space-between"
          boxShadow="md"
          p="5"
          rounded="lg"
          background="white"
          mb="10px"
        >
          <Heading
            textAlign="center"
            color="WindowText"
            size="lg"
            textColor="pink.300"
          >
            Paiement
          </Heading>
          <Hide below="sm">
            <Text>Dashboad / Salaires / Paiement</Text>
          </Hide>
        </Flex>
        <Center>
          <Box pb="5px" mt="20px">
            <InputGroup width="300px">
              {filteredData.length === 0 ? (
                <InputRightElement
                  children={<Icon as={FiSearch} />}
                  cursor="pointer"
                />
              ) : (
                <InputRightElement
                  children={<Icon as={IoClose} />}
                  cursor="pointer"
                />
              )}
              <Input
                placeholder="Rechercher un employé"
                variant="flushed"
                onChange={handleChange}
              />
            </InputGroup>
          </Box>
        </Center>

        {filteredData.length != 0 && (
          <Box
            py="9px"
            w="290px"
            bg={"white"}
            boxShadow="md"
            borderRadius="7px"
            overflow={"hidden"}
            overflowY="auto"
            placeItems={"center"}
            margin="0 auto"
          >
            {filteredData.map((personnel, index) => (
              <Grid key={index} marginLeft="10px">
                <Link
                  href={{
                    pathname: Routes.PaymentDetails?.path || "",
                    query: { id: personnel.id },
                  }}
                >
                  <Text
                    width={"200px"}
                    display={"flex"}
                    alignItems="center"
                    color="black"
                    textDecoration="none"
                    _hover={{ background: "lightgrey", color: "white" }}
                  >
                    {personnel.firstName} {personnel.lastName} -{" "}
                    {personnel.fonction.toLowerCase()}
                  </Text>
                </Link>
              </Grid>
            ))}
          </Box>
        )}

        {/* <PaySlip />  */}
        <Box mt={10}>
          <TableContainer border={"1px"} rounded={"md"}>
            <Table variant="striped" colorScheme={"white"} bg={"white"}>
              <Thead background="colors.secondary">
                <Tr>
                  <Th>Nom</Th>
                  <Th>Prenom</Th>
                  <Th>Fonction</Th>
                  <Th></Th>
                </Tr>
              </Thead>
              {dataPersonnel && (
                <Tbody>
                  {dataPersonnel.findAllpersonnel
                    .filter((personnel) => {
                      if (searchName === "") {
                        return personnel;
                      } else if (
                        personnel.firstName
                          .toLowerCase()
                          .includes(searchName.toLowerCase()) ||
                        personnel.lastName
                          .toLowerCase()
                          .includes(searchName.toLowerCase()) ||
                        personnel.fonction
                          .toLowerCase()
                          .includes(searchName.toLowerCase())
                      )
                        return personnel;
                    })
                    .slice(pagesVisited, pagesVisited + itemsPerPage)

                    .map((personnel, index) => (
                      <Tr key={index}>
                        <Td p={3} pl={6}>
                          {personnel.firstName}
                        </Td>
                        <Td p={3} pl={6}>
                          {personnel.lastName}
                        </Td>
                        <Td p={3} pl={6}>
                          {personnel.fonction}
                        </Td>
                        <Td p={0}>
                          <ButtonGroup
                            size="sm"
                            isAttached
                            variant="link"
                            colorScheme={"teal"}
                          >
                            <Button>
                              <Link
                                href={{
                                  pathname: Routes.PaymentDetails?.path || "",
                                  query: { id: personnel.id },
                                }}
                              >
                                Payer
                              </Link>
                            </Button>
                          </ButtonGroup>
                        </Td>
                      </Tr>
                    ))}
                </Tbody>
              )}
            </Table>
          </TableContainer>
        </Box>
        <Box mt={"15px"}>
          <ReactPaginate
            previousLabel={"<<"}
            nextLabel={">>"}
            pageCount={pageCountPersonnel}
            onPageChange={changePage}
            containerClassName={"paginationBttns"}
            previousLinkClassName={"previousBttn"}
            nextLinkClassName={"nextBttn"}
            disabledClassName={"paginationDisabled"}
            activeClassName={"paginationActive"}
          />
        </Box>
      </Box>
    </DefaultLayout>
  );
};

export default Payment;

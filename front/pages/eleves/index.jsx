import { AddIcon, SearchIcon } from "@chakra-ui/icons";
import {
  Box,
  Button,
  ButtonGroup,
  IconButton,
  Center,
  Flex,
  Heading,
  Hide,
  Input,
  InputGroup,
  InputRightAddon,
  Select,
  Table,
  TableContainer,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr,
  Avatar,
  Icon,
  Popover,
  PopoverArrow,
  PopoverBody,
  PopoverCloseButton,
  PopoverContent,
  PopoverFooter,
  useDisclosure,
  AlertDialog,
  AlertDialogOverlay,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogBody,
  AlertDialogFooter,
  InputRightElement,
  AlertDialogCloseButton,
  Show,
  useToast,
  Tooltip,
} from "@chakra-ui/react";
// import Link from "../../components/atoms/Link"
import React from "react";
import Link from "next/link";
import Routes from "../../modules/routes";
import { useState, useEffect } from "react";
import DefaultLayout from "../../components/layouts/DefaultLayout";
import { Users } from "../api/data/users";
import { Classes } from "../api/data/classes";
import { IoIosAdd } from "react-icons/io";
import { FiEdit, FiSearch } from "react-icons/fi";
import { MdDelete } from "react-icons/md";
import { useRouter } from "next/router";
import { useTranslation } from "next-i18next";
import ReactToPrint from "react-to-print";
import ReactToPdf from "react-to-pdf";
import ReactPaginate from "react-paginate";
import { getStaticPropsTranslations } from "../../types/staticProps";

import {
  GET_ALL_STUDENT,
  GET_STUDENT_BY_ID,
  GET_ALL_CLASS,
  GET_PERSONNEL_BY_USERID,
} from "../../graphql/Queries";
import { DELETE_STUDENT } from "../../graphql/Mutation";
import { useMutation, useQuery } from "@apollo/client";
import { useAccount } from "../../contexts/account/Account";
import { useAuth } from "../../contexts/account/Auth/Auth";

// const VARIABLE = "pearl";

const Eleves = () => {
  const cancelRef = React.useRef();
  const router = useRouter();
  const { t } = useTranslation();
  const toast = useToast();
  const [query, setQuery] = useState("");
  const [data, setData] = useState([]);
  const { setAuthToken, authToken } = useAuth();
  const keys = ["first_name", "last_name", "email", "classe"];
  const { isOpen, onToggle, onClose, onOpen } = useDisclosure();
  const [searchNameStudent, setSearchNameStudent] = useState("");
  const [searchClasseStudent, setSearchClasseStudent] = useState("");
  const [deletestudent] = useMutation(DELETE_STUDENT);
  // const [currentPage, setCurrentPage] = useState(1);

  //STATE DE LA PAGINATION
  const itemsPerPage = 15;
  const [pageNumber, setPageNumber] = useState(0);
  const pagesVisited = pageNumber * itemsPerPage;
  const {
    data: dataStudent,
    loading,
    error,
  } = useQuery(GET_ALL_STUDENT, { onError: (error) => console.log(error) });
  const { account, loaded } = useAccount();

  //infos du personnel connete
  const { data: personnelData, called } = useQuery(GET_PERSONNEL_BY_USERID, {
    variables: { userid: account?.id },
  });
  const { data: dataClasse } = useQuery(GET_ALL_CLASS);

  const search = (data) => {
    let datas = data.filter((item) =>
      keys.some((key) => item[key].toUpperCase().includes(query))
    );
    console.log("datas :", datas);
    return query ? datas.slice(0, 5) : Users.slice(0, 5);
  };

  useEffect(() => {
    if (!authToken) {
      router.back();
    }
  }, [authToken]);

  useEffect(() => {
    console.log(dataStudent?.findAllstudents);
  });

  if (loading) return <Text>Chargement en cours...</Text>;
  if (error) return <Text>Une erreur s'est produite!</Text>;

  const removeStudent = async (id) => {
    await deletestudent({
      variables: { id },
      refetchQueries: [
        {
          query: GET_ALL_STUDENT,
        },
      ],
    });
    toast({
      title: "Suppression de l'eleve.",
      description: "Suppresion reussit.",
      status: "success",
      duration: 3000,
      isClosable: true,
    });
    onClose();
  };

  const handleChange = (e) => {
    setSearchNameStudent(e.target.value);
  };

  const handleChangeClasseStudent = (e) => {
    setSearchClasseStudent(e.target.value);
  };

  const pageCountStudent = Math.ceil(
    dataStudent?.findAllstudents.length / itemsPerPage
  );

  const changePage = ({ page }) => {
    setPageNumber(page);
  };

  return (
    <DefaultLayout>
      <Box p="3" pt={"70px"} w="full">
        <Flex
          align="center"
          justify="space-between"
          boxShadow="md"
          p="5"
          rounded="lg"
          background="white"
        >
          <Heading
            textAlign="center"
            color="WindowText"
            size="lg"
            textColor="pink.300"
          >
            {t("pages.eleves.listeDesEleves.listOfStudent")}
          </Heading>
          <Hide below="sm">
            <Text>Dashboad / Éleves / Liste Élèves</Text>
          </Hide>
        </Flex>
        <Flex gap={10} mt={7}>
          <InputGroup>
            <InputRightElement
              children={<Icon as={FiSearch} />}
              cursor="pointer"
            />
            <Input
              placeholder="Recherchez un élève..."
              //value={recherche}
              // onChange={e => setQuery(e.target.value)
              onChange={handleChange}
              variant="flushed"
            />
            {/* <InputRightAddon children={<SearchIcon />} /> */}
          </InputGroup>
          <Select
            placeholder="Selectionner la classe"
            variant="flushed"
            onChange={(event) => setSearchClasseStudent(event.target.value)}
            // value={""}
          >
            {dataClasse &&
              dataClasse.findAllsalle.map((salle, index) => (
                <option key={index}>{salle.name}</option>
              ))}
          </Select>
          <Box>
            <Button
              rightIcon={<Icon as={IoIosAdd} boxSize="20px" />}
              onClick={() => router.push("/eleves/ajoutereleve")}
            >
              Ajouter un élève
            </Button>
          </Box>
          {/* { dataStudent &&  
            dataStudent.findAllstudents
            .filter((student) =>{
              if(searchClasseStudent==""){
                return student
              }else if(student.salleName.toLowerCase().includes (searchClasseStudent.toLowerCase()))
              return student
            })
          } */}
        </Flex>
        {/* <Box mt={10}>
          <PaiementTable data={search(Users)}/>
        </Box> */}
        <Box mt={10}>
          <TableContainer border={"1px"} rounded={"md"}>
            <Table variant="striped" colorScheme={"white"} bg={"white"}>
              {/* <TableCaption>Liste des eleves</TableCaption> */}
              <Thead background="colors.secondary">
                <Tr>
                  <Th>{t("pages.eleves.listeDesEleves.firstName")}</Th>
                  <Th>{t("pages.eleves.listeDesEleves.lastName")}</Th>
                  <Th>classe</Th>
                  {/* <Th>sexe</Th> */}
                  <Th>{t("pages.eleves.listeDesEleves.actions")}</Th>
                </Tr>
              </Thead>
              <Tbody>
                {dataStudent &&
                  dataStudent.findAllstudents
                    .slice(pagesVisited, pagesVisited + itemsPerPage)
                    .filter((student) => {
                      if (searchNameStudent == "") {
                        return student;
                      } else if (
                        student.firstname
                          .toLowerCase()
                          .includes(searchNameStudent.toLowerCase()) ||
                        student.lastname
                          .toLowerCase()
                          .includes(searchNameStudent.toLowerCase()) ||
                        student.fatherFirstName
                          .toLowerCase()
                          .includes(searchNameStudent.toLowerCase())
                      )
                        return student;
                    })
                    .filter((student) => {
                      if (searchClasseStudent == "") {
                        return student;
                      } else if (
                        student.salleName
                          .toLowerCase()
                          .includes(searchClasseStudent.toLowerCase())
                      )
                        return student;
                    })
                    .map((student, index) => (
                      <Tr key={index}>
                        <Td p={0} pl={3}>
                          {student.firstname}
                        </Td>
                        <Td p={0} pl={6}>
                          {student.lastname}
                        </Td>
                        <Td p={0} pl={6}>
                          {student.salleName}
                        </Td>
                        {/* <Td borderColor={'#C6B062'}>{student.classe}</Td> */}
                        {/* <Td borderColor={'#C6B062'}>{student.sex}</Td> */}
                        <Td p={0} pl={6}>
                          <Box display={{ md: "flex" }} gap={3}>
                            <ButtonGroup
                              size="sm"
                              isAttached
                              variant="link"
                              colorScheme={"teal"}
                            >
                              <Button>
                                <Link
                                  href={{
                                    pathname: Routes.EleveDetails?.path || "",
                                    query: { id: student.id },
                                  }}
                                >
                                  {t("pages.eleves.listeDesEleves.details")}
                                </Link>
                              </Button>
                            </ButtonGroup>
                            <Box>
                              <Box>
                              <Tooltip label="Modifier">

                                <Link
                                  href={{
                                    pathname: Routes.EleveEdit?.path || "",
                                    query: { id: student.id },
                                  }}
                                >
                                    <Icon
                                      as={FiEdit}
                                      boxSize="40px"
                                      p="3"
                                      // bg="blue.100"
                                      rounded="full"
                                      _hover={{ background: "red.100" }}
                                    />
                                </Link>
                              </Tooltip>

                                {/* {
                                  (account?.role==="ADMIN")||
                                  (personnelData?.getpersonnelbyaccount.fonction==="econome") ||
                                  (personnelData?.getpersonnelbyaccount.fonction==="fondateur")
                                  && */}
                                {personnelData?.getpersonnelbyaccount
                                  .fonction === "principal" ? (
                                  <Hide>
                                    <Icon
                                      as={MdDelete}
                                      boxSize="42px"
                                      p="3"
                                      rounded="full"
                                      color="colors.quaternary"
                                      _hover={{ background: "blue.100" }}
                                      onClick={onToggle}
                                    />
                                  </Hide>
                                ) : (
                                  <Show>
                                    <Icon
                                      as={MdDelete}
                                      boxSize="42px"
                                      p="3"
                                      rounded="full"
                                      color="colors.quaternary"
                                      _hover={{ background: "blue.100" }}
                                      onClick={onToggle}
                                    />
                                  </Show>
                                )}

                                {/* } */}
                              </Box>
                              {/* } */}
                            </Box>
                          </Box>
                        </Td>
                        <Box>
                          <AlertDialog
                            isOpen={isOpen}
                            leastDestructiveRef={cancelRef}
                            onClose={onClose}
                            isCentered
                          >
                            <AlertDialogOverlay
                            // alignSelf={"center"}
                            >
                              <AlertDialogContent width={"380px"}>
                                <AlertDialogHeader
                                  fontSize="lg"
                                  fontWeight="bold"
                                  textAlign={"center"}
                                >
                                  {t(
                                    "pages.eleves.listeDesEleves.confirmDeletingPassword"
                                  )}
                                </AlertDialogHeader>
                                <AlertDialogCloseButton />
                                <AlertDialogBody textAlign={"center"}>
                                  {t(
                                    "pages.eleves.listeDesEleves.wouldYouWantToDeleteStudent"
                                  )}
                                </AlertDialogBody>

                                <AlertDialogFooter>
                                  <Button
                                    ref={cancelRef}
                                    onClick={onClose}
                                    colorScheme="red"
                                  >
                                    {t("pages.eleves.listeDesEleves.cancel")}
                                  </Button>
                                  <Button
                                    colorScheme="green"
                                    onClick={() => removeStudent(student.id)}
                                    ml={3}
                                  >
                                    {t("pages.eleves.listeDesEleves.delete")}
                                  </Button>
                                </AlertDialogFooter>
                              </AlertDialogContent>
                            </AlertDialogOverlay>
                          </AlertDialog>
                          {/* </Box> */}
                          {/* </Box> */}
                        </Box>
                      </Tr>
                      // </Link>
                    ))}
              </Tbody>
            </Table>
          </TableContainer>
        </Box>
        <Box mt={"15px"}>
          <ReactPaginate
            previousLabel={"<<"}
            nextLabel={">>"}
            pageCount={pageCountStudent}
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
export async function getStaticProps({ locale }) {
  return {
    props: {
      ...(await getStaticPropsTranslations(locale)),
      // Will be passed to the page component as props
    },
  };
}

export default Eleves;

// export  const  getStaticProps = async() => {
//   const apolloClient = initializeApollo();
//   await apolloClient.query({
//     query:GET_STUDENT_BY_ID,
//     variables:{id: VARIABLE}
//   })
//   return{propos:{initialzeApollState: apolloClient.cache.extract()}}
// }

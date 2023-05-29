import { AddIcon, SearchIcon } from "@chakra-ui/icons";
import {
  Box,
  Flex,
  Heading,
  Hide,
  Input,
  InputGroup,
  InputRightAddon,
  Table,
  TableContainer,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr,
  Link,
  Icon,
  useDisclosure,
  AlertDialogHeader,
  AlertDialog,
  AlertDialogOverlay,
  AlertDialogContent,
  AlertDialogBody,
  AlertDialogFooter,
  Button,
  InputRightElement,
} from "@chakra-ui/react";
import { useRouter } from "next/router";
import DefaultLayout from "../../components/layouts/DefaultLayout";
import AddParents from "./addParents";
import { FiEdit, FiSearch } from "react-icons/fi";
import { MdDelete } from "react-icons/md";
import {
  GET_ALL_Category_Eleve,
  GET_ALL_PERSONNELS,
  GET_ALL_PARENT,
} from "../../graphql/Queries";
import { DELETE_CATEGORY_STUDENT, DELETE_PARENT } from "../../graphql/Mutation";
import { useMutation, useQuery } from "@apollo/client";
import React, { useEffect, useState } from "react";
import ReactPaginate from "react-paginate";

const ListOfParents = () => {
  // const router = useRouter();
  const cancelRef = React.useRef();
  const [query, setQuery] = useState("");
  const router = useRouter();

  //STATE DE LA PAGINATION
  const itemsPerPage = 10;
  const [pageNumber, setPageNumber] = useState(0);
  const pagesVisited = pageNumber * itemsPerPage;

  const {
    data: dataCategoryEleve,
    loading,
    error,
  } = useQuery(GET_ALL_Category_Eleve);
  const { data: dataParents } = useQuery(GET_ALL_PARENT);

  //  const [deleteCategoryStudent] = useMutation(DELETE_CATEGORY_STUDENT);
  const [deleteParent] = useMutation(DELETE_PARENT);
  const { isOpen, onToggle, onClose, onOpen } = useDisclosure();
  const [searchNameStudentParent, setSearchNameStudentParent] = useState("");

  // useEffect(() => {
  //   if (!authToken) {
  //     router.back();
  //   }
  // }, [authToken]);

  useEffect(() => {
    console.log(dataCategoryEleve?.findAllcategorieeleve);
    console.log(dataParents?.findAllparents);
  });

  if (loading) return <Text>Chargement en cour...</Text>;
  if (error) return <Text>Une erreur s'est produite!</Text>;

  const removeParent = async (id) => {
    await deleteParent({
      variables: { id },
      refetchQueries: [
        {
          query: GET_ALL_PARENT,
        },
      ],
    });
    onClose();
  };

  const handleChange = (e) => {
    setSearchNameStudentParent(e.target.value);
  };

  const pageCountStudentParents = Math.ceil(
    dataParents?.findAllparents.length / itemsPerPage
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
            Parents
          </Heading>
          <Hide below="sm">
            <Text>Dashboad / parents/liste des parents</Text>
          </Hide>
        </Flex>
        <Flex gap={10} mt={7}>
          <InputGroup width={"600px"}>
            <InputRightElement
              children={<Icon as={FiSearch} />}
              cursor="pointer"
            />
            <Input
              placeholder="Rechercher un parent..."
              //value={recherche}
              //  onChange={e => setQuery(e.target.value)
              onChange={handleChange}
              variant="flushed"
            />
            {/* <InputRightAddon children={<SearchIcon />} /> */}
          </InputGroup>
          {/* <Select 
             placeholder="Selectionner la classe"
             onChange={e =>setQuery(e.target.value)}
           >
           </Select> */}
          <AddParents />
        </Flex>
        <Box mt={10}>
          <TableContainer border={"1px"} rounded={"md"}>
            <Table variant="striped" colorScheme={"white"} bg={"white"}>
              <Thead background="colors.secondary">
                <Tr>
                  <Th>Nom</Th>
                  <Th>Prenom</Th>
                  <Th>Telephone</Th>
                  <Th>Status</Th>
                  <Th>Actions</Th>
                </Tr>
              </Thead>
              {dataParents && (
                <Tbody>
                  {dataParents.findAllparents
                    .slice(pagesVisited, pagesVisited + itemsPerPage)
                    .filter((parent) => {
                      if (searchNameStudentParent == "") {
                        return parent;
                      } else if (
                        parent.firstname
                          .toLowerCase()
                          .includes(searchNameStudentParent.toLowerCase())
                      )
                        return parent;
                    })
                    .map((parent, index) => (
                      <Tr key={index}>
                        <Td p={0} pl={6}>
                          {parent.firstname}
                        </Td>
                        <Td p={0} pl={6}>
                          {parent.lastname}
                        </Td>
                        <Td p={0} pl={6}>
                          {parent.phonenumber}
                        </Td>
                        <Td p={0} pl={6}>
                          {parent.parentStatus}
                        </Td>

                        <Td p={0} pl={3}>
                          <Box display="flex">
                            <Link href="#">
                              <Icon
                                as={FiEdit}
                                boxSize="40px"
                                p="3"
                                rounded={"full"}
                                _hover={{ background: "blue.100" }}
                              />
                            </Link>
                            <Box href="#" mt="-3px">
                              <Icon
                                as={MdDelete}
                                boxSize="44px"
                                p="3"
                                rounded="full"
                                color="colors.quaternary"
                                _hover={{ background: "blue.100" }}
                                onClick={onToggle}
                              />
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
                                        Confirmation de suppression
                                      </AlertDialogHeader>
                                      <AlertDialogBody textAlign={"center"}>
                                        Voulez-vous supprimer cette categorie?
                                      </AlertDialogBody>

                                      <AlertDialogFooter>
                                        <Button
                                          ref={cancelRef}
                                          onClick={onClose}
                                          colorScheme="red"
                                        >
                                          Annuler
                                        </Button>
                                        <Button
                                          colorScheme="green"
                                          ml={3}
                                          onClick={() => {
                                            removeParent(parent.id);
                                          }}
                                        >
                                          Supprimer
                                        </Button>
                                      </AlertDialogFooter>
                                    </AlertDialogContent>
                                  </AlertDialogOverlay>
                                </AlertDialog>
                              </Box>
                            </Box>
                          </Box>
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
            pageCount={pageCountStudentParents}
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

export default ListOfParents;

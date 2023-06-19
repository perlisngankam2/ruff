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
  Link,
  Icon,
  AlertDialogFooter,
  AlertDialogBody,
  AlertDialog,
  useDisclosure,
  AlertDialogContent,
  AlertDialogOverlay,
  AlertDialogHeader,
  FormControl,
  FormLabel,
  InputRightElement,
  AlertDialogCloseButton,
} from "@chakra-ui/react";

import DefaultLayout from "../../components/layouts/DefaultLayout";
import React, { useEffect, useState, useContext } from "react";
import { IoIosAdd } from "react-icons/io";
import { Router, useRouter } from "next/router";
import { FiEdit, FiSearch } from "react-icons/fi";
import { MdDelete } from "react-icons/md";
import {
  GET_ALL_SECTION,
  GET_ONE_SECTION,
  GET_ONE_CYCLE,
  GET_ALL_CYCLE,
} from "../../graphql/Queries";
import {
  DELETE_SECTION,
  DELETE_CYCLE,
  UPDATE_CYCLE,
  CREATE_CYCLE,
} from "../../graphql/Mutation";
import { UpdateCycle } from "./updatecycle";
import { useMutation, useQuery } from "@apollo/client";
import SectionCreate from "./SectionCreate";
import CycleCreate from "./CycleCreate";
import ReactPaginate from "react-paginate";
// import Routes from "../../modules/routes";
import { useTranslation } from "next-i18next";
import { getStaticPropsTranslations } from "../../types/staticProps";
import { useAuth } from "../../contexts/account/Auth/Auth";

const cyclesection = () => {
  // const router = useRouter();
  const [query, setQuery] = useState("");
  const [cycle, setCycle] = useState();
  const [name, setName] = useState("");
  const [section, setSection] = useState("");
  // const search = (data) => {
  //   let datas = data.filter((item) => keys.some((key) => (
  //     item[key].toUpperCase().includes(query)
  //     )
  //   ));
  //   console.log("datas :" , datas)
  //   return query ? datas.slice(0,5) : Users.slice(0,5)
  // };

  const { data } = useQuery(GET_ALL_SECTION);
  const { setAuthToken, authToken } = useAuth();
  const {
    data: dataCycle,
    loading,
    error,
  } = useQuery(GET_ALL_CYCLE, { onError: (error) => console.log(error) });
  const [id, setId] = useState(null);
  const [deleteSection] = useMutation(DELETE_SECTION);

  const { isOpen, onOpen, onClose, onToggle } = useDisclosure();
  const {
    isOpen: isOpennns,
    onOpen: onOpennns,
    onClose: onClossses,
    onToggle: onToggles,
  } = useDisclosure();

  const [isformOpen, setIsFormOpen] = useState(false);
  const router = useRouter();
  const [pageNumber, setPageNumber] = useState(0);
  const usersPerPage = 15;
  const pagesVisited = pageNumber * usersPerPage;

  const [pageNumberCycle, setPageNumberCycle] = useState(0);
  const itemPerPageCycle = 10;
  const pagesVisitedCycle = pageNumberCycle * itemPerPageCycle;
  const [searchSection, setSearchSection] = useState("");

  const handleChangeSection = (event) => {
    setSearchSection(event.target.value);
  };

  const pageCount = Math.ceil(data?.findAllsection.length / usersPerPage);

  const changePage = ({ selected }) => {
    setPageNumber(selected);
  };

  const pageCountCycle = Math.ceil(
    dataCycle?.findAllcycle.length / itemPerPageCycle
  );
  const changePageCycle = ({ page }) => {
    setPageNumberCycle(page);
  };

  useEffect(() => {
    if (!authToken) {
      router.back();
    }
  }, [authToken]);

  useEffect(() => {
    console.log(data?.findAllsection);
    setSection(data);
    console.log(dataCycle?.findAllcycle);
    console.log("hh");
  });

  if (loading) return <Text>Chargement en cours...</Text>;
  if (error) return <Text>Error: {error.message}</Text>;

  // const displayUsers =

  // const updateCycle = async(value) => {
  //       await editCycle({
  //         variables:{
  //           cycleId: cycle.id,
  //           input : {
  //             name: value.name,
  //             section: value.section
  //           }
  //         }
  //       });
  // };

  const handleShowUpdateCycle = (cycle) => {};

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
            Cycle et section
          </Heading>
          <Hide below="sm">
            <Text>Dashboad / classe/Cycle & section</Text>
          </Hide>
        </Flex>
        <Flex gap={10} mt={7}>
          <InputGroup width="600px">
            {/* <InputRightElement
              children={<Icon as={FiSearch} />}
              cursor="pointer"
            /> */}
            <InputRightElement
              children={<Icon as={FiSearch} />}
              cursor="pointer"
            />
            <Input
              placeholder="Recherchez une section..."
              //value={recherche}
              variant="flushed"
              onChange={handleChangeSection}
            />
            {/* <InputRightAddon 
              cursor="pointer"
              children={<SearchIcon variant="flushed"/>} 
            /> */}
          </InputGroup>
          <SectionCreate />
        </Flex>
        <Box mt={10}>
          <Box>
            <Heading
              mb={5}
              size="lg"
              textAlign={"center"}
              color="colors.quinzaine"
            >
              Sections
            </Heading>
          </Box>
          <Box mb={5}>
            <TableContainer border={"1px"} rounded={"md"}>
              <Table variant="striped" colorScheme={"white"} bg={"white"}>
                <Thead background="colors.secondary">
                  <Tr>
                    <Th>Nom</Th>
                    {/* <Th>Description</Th> */}
                    <Th>Actions</Th>
                  </Tr>
                </Thead>
                {data && (
                  <Tbody>
                    {data?.findAllsection
                      .slice(pagesVisited, pagesVisited + usersPerPage)
                      .filter((section) => {
                        if (searchSection == "") {
                          return section;
                        } else if (
                          section.name
                            .toLowerCase()
                            .includes(searchSection.toLowerCase())
                        )
                          return section;
                      })
                      .map((section, index) => (
                        <SectionElement section={section} index={index} />
                      ))}
                  </Tbody>
                )}
              </Table>
            </TableContainer>
          </Box>
          <Box>
            <ReactPaginate
              previousLabel={"<<"}
              nextLabel={">>"}
              pageCount={pageCount}
              onPageChange={changePage}
              containerClassName={"paginationBttns"}
              previousLinkClassName={"previousBttn"}
              nextLinkClassName={"nextBttn"}
              disabledClassName={"paginationDisabled"}
              activeClassName={"paginationActive"}
            />
          </Box>
        </Box>
        <Box mt={50}>
          <Box>
            <Heading
              mt={2}
              size="lg"
              textAlign={"center"}
              color="colors.quinzaine"
            >
              Cycles
            </Heading>
          </Box>
          <CycleCreate
          // defaultValues={defaultValues}
          // {...onSubmit ? updateCycle: addCycle}
          // update={true}
          />
          <Box>
            <TableContainer border={"1px"} rounded={"md"}>
              <Table variant="striped" colorScheme={"white"} bg={"white"}>
                <Thead background="colors.secondary">
                  <Tr>
                    <Th>Nom</Th>
                    <Th>Setion</Th>
                    <Th>Actions</Th>
                  </Tr>
                </Thead>
                {dataCycle && (
                  <Tbody>
                    {dataCycle.findAllcycle
                      // .slice(pagesVisitedCycle, pagesVisitedCycle + itemPerPageCycle)
                      .map((cycle, index) => (
                        <CycleElement cycle={cycle} index={index} />
                      ))}
                  </Tbody>
                )}
              </Table>
            </TableContainer>
          </Box>
        </Box>
        <Box mt="15px">
          {/* <ReactPaginate 
          previousLabel={"<<"}
          nextLabel={">>"}
          pageCount={pageCountCycle}
          onPageChange={changePageCycle}
          containerClassName={"paginationBttns"}
          previousLinkClassName={"previousBttn"}
          nextLinkClassName={"nextBttn"}
          disabledClassName={"paginationDisabled"}
          activeClassName={"paginationActive"}
        /> */}
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

export default cyclesection;

const CycleElement = ({ cycle, index }) => {
  const { isOpen, onOpen, onClose, onToggle } = useDisclosure();
  const {
    isOpen: isOpenEditSeection,
    onOpen: OnOpenEditSection,
    onClose: OnCloseEditSection,
  } = useDisclosure();
  const cancelRef = React.useRef();

  const [deleteCycle, loading, error] = useMutation(DELETE_CYCLE);
  const { data: dataDetailsCycle } = useQuery(GET_ONE_CYCLE);
  const [editCycle] = useMutation(UPDATE_CYCLE);
  const [createCycle] = useMutation(CREATE_CYCLE);

  const removeCycle = async (id) => {
    await deleteCycle({
      variables: { id },
      refetchQueries: [
        {
          query: GET_ALL_CYCLE,
        },
      ],
    });
    toast({
      title: "Suppression du cyle.",
      description: "Suppresion reussit.",
      status: "success",
      duration: 3000,
      isClosable: true,
    });
    onClose();
  };

  return (
    <Tr key={index}>
      <Td p={0} pl={6}>
        {cycle.name}
      </Td>
      <Td>{cycle.sectionName}</Td>

      {/* <Td  borderColor={'#C6B062'}>{cycle.section_id}</Td> */}
      {/* <Td p={0} pl={6}>pppp</Td> */}
      <Td p={0} pl={3}>
        <Box display="flex">
          <Icon
            as={FiEdit}
            boxSize="40px"
            p="3"
            // bg="blue.100"
            rounded="full"
            onClick={onOpen}
            _hover={{ background: "red.100" }}
          />
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
                    mt="5px"
                  >
                    Confirmation de suppression
                  </AlertDialogHeader>
                  <AlertDialogCloseButton />

                  <AlertDialogBody textAlign={"center"}>
                    Voulez-vous supprimer cette ce cycle?
                  </AlertDialogBody>

                  <AlertDialogFooter>
                    <Button ref={cancelRef} onClick={onClose} colorScheme="red">
                      Annuler
                    </Button>
                    <Button
                      colorScheme="green"
                      onClick={() => removeCycle(cycle.id)}
                      ml={3}
                    >
                      Supprimer
                    </Button>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialogOverlay>
            </AlertDialog>
          </Box>
        </Box>
      </Td>
    </Tr>
  );
};

const SectionElement = ({ section, index }) => {
  const {
    isOpen: isOpennns,
    onOpen: onOpennns,
    onClose: onClossses,
    onToggle: onToggles,
  } = useDisclosure();
  const [deleteSection] = useMutation(DELETE_SECTION);
  const cancelRef = React.useRef();
  const updateSection = (id) => {};

  const removeSection = async (id) => {
    await deleteSection({
      variables: {
        id,
      },
      refetchQueries: [
        {
          query: GET_ALL_SECTION,
        },
      ],
    });
    toast({
      title: "Suppression de la section.",
      description: "Suppresion reussit.",
      status: "success",
      duration: 3000,
      isClosable: true,
    });
    onClossses();
  };
  return (
    <Tr key={index}>
      <Td p={0} pl={6}>
        {section.name}
      </Td>
      {/* <Td p={0} pl={6}>{section.description}</Td> */}
      <Td p={0} pl={3}>
        <Box display="flex">
          {/* <Link 
          href="/eleves/modifiereleve"
        > */}
          <Icon
            as={FiEdit}
            onClick={() => updateSection(section.id)}
            boxSize="40px"
            p="3"
            // bg="blue.100"
            rounded="full"
            _hover={{ background: "red.100" }}
          />
          {/* </Link> */}
          <Box href="#" mt="-3px">
            <Icon
              as={MdDelete}
              boxSize="44px"
              p="3"
              rounded="full"
              color="colors.quaternary"
              _hover={{ background: "blue.100" }}
              onClick={onOpennns}
            />
            <Box>
              <AlertDialog
                isOpen={isOpennns}
                leastDestructiveRef={cancelRef}
                onClose={onClossses}
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
                      mt="5px"
                    >
                      Confirmation de suppression
                    </AlertDialogHeader>
                    <AlertDialogCloseButton />
                    <AlertDialogBody textAlign={"center"}>
                      Voulez-vous supprimer cette cette section?
                    </AlertDialogBody>

                    <AlertDialogFooter>
                      <Button
                        ref={cancelRef}
                        onClick={onClossses}
                        colorScheme="red"
                      >
                        Annuler
                      </Button>
                      <Button
                        colorScheme="green"
                        onClick={() => removeSection(section.id)}
                        ml={3}
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
  );
};

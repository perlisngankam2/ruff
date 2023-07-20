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
  useToast,
  Tooltip,
  Checkbox,
} from "@chakra-ui/react";

import DefaultLayout from "../../components/layouts/DefaultLayout";
import React, { useEffect, useState, useContext } from "react";
import { Router, useRouter } from "next/router";
import { FiEdit, FiSearch } from "react-icons/fi";
import { MdDelete } from "react-icons/md";
import {
  GET_ALL_SECTION,
  GET_ONE_SECTION,
  GET_ONE_CYCLE,
  GET_ALL_CYCLE,
  GET_SECTION_BY_ID,
  GET_CYCLE_BY_ID,
} from "../../graphql/Queries";
import {
  DELETE_SECTION,
  DELETE_CYCLE,
  UPDATE_CYCLE,
  CREATE_CYCLE,
  UPDATE_SECTION,
} from "../../graphql/Mutation";
import { IoIosAdd } from "react-icons/io";
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
  const toast = useToast();
  const [name, setName] = useState("");
  const cancelRef = React.useRef();
  const { t } = useTranslation();
  const [selectedElements, setSelectedElements] = useState([]);
  const [selectedElementCycle, setSelectedElementCycle] = useState([]);

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
  const { data: dataSectionById } = useQuery(GET_SECTION_BY_ID);
  const [deleteSection] = useMutation(DELETE_SECTION);
  const [updateSection] = useMutation(UPDATE_SECTION);
  const [deleteCycle] = useMutation(DELETE_CYCLE);

  const { isOpen, onOpen, onClose, onToggle } = useDisclosure();
  const {
    isOpen: isOpenCycle,
    onOpen: onOpenCycle,
    onClose: onCloseCycle,
  } = useDisclosure();
  const {
    isOpen: isOpenMultipleSection,
    onOpen: onOpenMultipleSection,
    onClose: onCloseMultipleSection,
  } = useDisclosure();

  const {
    isOpen: isOpenMultipleCycle,
    onOpen: onOpenMultipleCycle,
    onClose: onCloseMultipleCycle,
  } = useDisclosure();

  const {
    isOpen: isOpennns,
    onOpen: onOpennns,
    onClose: onClossses,
    onToggle: onToggles,
  } = useDisclosure();
  // const { isOpen, onOpen, onClose, onToggle } = useDisclosure();

  const [sections, setSection] = useState({
    name: "",
    description: "",
  });

  // const [isformOpen, setIsFormOpen] = useState(false);
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
  // const [editSection, setEditSection] = useState(section);

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
    if (router.query.id) {
      const dataSectionEdit = dataSectionById?.findOnesection;
      if (dataSectionEdit) {
        setSection({
          name: dataSectionEdit.name,
          description: dataSectionEdit.description,
        });
      }
    }
  }, [dataSectionById]);

  // useEffect(() => {
  //   if (!authToken) {
  //     router.back();
  //   }
  // }, [authToken]);

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
  const handleDelete = async (id, event) => {
    selectedElements.map((sectionId) => {
      const delete_ = async () => {
        try {
          await deleteSection({
            variables: { id: sectionId },
            refetchQueries: [
              {
                query: GET_ALL_SECTION,
              },
            ],
          });
          toast({
            title: "Suppression des sections.",
            description: "Suppresion reussit.",
            status: "success",
            duration: 3000,
            isClosable: true,
          });
          //   Réinitialiser la sélection des éléments après la suppression réussie
          setSelectedElements([]);
          refetch();
        } catch (error) {
          console.error("Erreur lors de la suppression :", error);
        }
      };
      delete_();

      return "";
    });
    onCloseMultipleSection();
    // selectedElements.splice(id)
    console.log(selectedElements);
  };

  const handleDeleteCycle = async (id, event) => {
    selectedElementCycle.map((cycleId) => {
      const delete_ = async () => {
        try {
          await deleteCycle({
            variables: { id: cycleId },
            refetchQueries: [
              {
                query: GET_ALL_CYCLE,
              },
            ],
          });
          toast({
            title: "Suppression des cycles.",
            description: "Suppresion reussit.",
            status: "success",
            duration: 3000,
            isClosable: true,
          });
          //   Réinitialiser la sélection des éléments après la suppression réussie
          setSelectedElementCycle([]);
          refetch();
        } catch (error) {
          console.error("Erreur lors de la suppression :", error);
        }
      };
      delete_();

      return "";
    });
    onCloseMultipleCycle();
    // selectedElements.splice(id)
    console.log(selectedElements);
  };
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
        <Flex gap={10} mt={7} w="full">
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
          <Button
            marginLeft={"auto"}
            type="submit"
            // ml={["20px", "50px", "100px", "600px"]}
            rightIcon={<Icon as={IoIosAdd} boxSize="20px" />}
            onClick={onOpen}
          >
            Ajouter une Section
          </Button>
          <SectionCreate onOpen={onOpen} isOpen={isOpen} onClose={onClose} />
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
            <Box mb={"15px"}>
              <Button
                colorScheme="red"
                size="xs"
                disabled={selectedElements.length === 0}
                // onClick={handleDelete}
                onClick={onOpenMultipleSection}
              >
                Supprimer
              </Button>
              {/* POPUP POUR LA SUPPRESSION MULTIPLE */}
              <AlertDialog
                isOpen={isOpenMultipleSection}
                leastDestructiveRef={cancelRef}
                onClose={onCloseMultipleSection}
                isCentered
              >
                <AlertDialogOverlay alignSelf={"center"}>
                  <AlertDialogContent width={"380px"}>
                    <AlertDialogHeader
                      fontSize="lg"
                      fontWeight="bold"
                      textAlign={"center"}
                    >
                      {/* {t("pages.courses.courseList.confirmDeleting")} */}
                      Confirmation de suppression
                    </AlertDialogHeader>
                    <AlertDialogBody textAlign={"center"}>
                      {/* {t("pages.courses.courseList.wouldYouWantToDeleteCourse")} */}
                      Voulez-vous supprimer ces section?
                    </AlertDialogBody>
                    <AlertDialogFooter>
                      <Button
                        ref={cancelRef}
                        onClick={onCloseMultipleSection}
                        colorScheme="red"
                      >
                        {t("pages.courses.courseList.cancelButton")}
                      </Button>
                      <Button colorScheme="green" onClick={handleDelete} ml={3}>
                        {/* {t("pages.courses.courseList.Supprimer")} */}
                        Supprimer
                      </Button>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialogOverlay>
              </AlertDialog>
            </Box>
            <TableContainer border={"1px"} rounded={"md"}>
              <Table variant="striped" colorScheme={"white"} bg={"white"}>
                <Thead background="colors.secondary">
                  <Tr>
                    <Th>#</Th>
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
                        <SectionElement
                          section={section}
                          index={index}
                          selectedElements={selectedElements}
                          setSelectedElements={setSelectedElements}
                        />
                      ))}
                  </Tbody>
                )}
              </Table>
            </TableContainer>
            <Box></Box>
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
        <Box mt={50} w="full">
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
          <Flex w="full">
            <Button
              rightIcon={<Icon as={IoIosAdd} boxSize="20px" />}
              onClick={onOpenCycle}
              mb={"20px"}
              mt={"10px"}
              marginLeft={"auto"}
              type="submit"
            >
              Ajouter un Cycle
            </Button>
          </Flex>
          <CycleCreate
            // defaultValues={defaultValues}
            // {...onSubmit ? updateCycle: addCycle}
            // update={true}
            onOpenCycle={onOpenCycle}
            isOpenCycle={isOpenCycle}
            onCloseCycle={onCloseCycle}
          />
          <Box>
            <Box mb={"15px"}>
              <Button
                colorScheme="red"
                size="xs"
                disabled={selectedElementCycle.length === 0}
                // onClick={handleDelete}
                onClick={onOpenMultipleCycle}
              >
                Supprimer
              </Button>
              {/* POPUP POUR LA SUPPRESSION MULTIPLE */}
              <AlertDialog
                isOpen={isOpenMultipleCycle}
                leastDestructiveRef={cancelRef}
                onClose={onCloseMultipleCycle}
                isCentered
              >
                <AlertDialogOverlay alignSelf={"center"}>
                  <AlertDialogContent width={"380px"}>
                    <AlertDialogHeader
                      fontSize="lg"
                      fontWeight="bold"
                      textAlign={"center"}
                    >
                      {/* {t("pages.courses.courseList.confirmDeleting")} */}
                      Confirmation de suppression
                    </AlertDialogHeader>
                    <AlertDialogBody textAlign={"center"}>
                      {/* {t("pages.courses.courseList.wouldYouWantToDeleteCourse")} */}
                      Voulez-vous supprimer ces cycles?
                    </AlertDialogBody>
                    <AlertDialogFooter>
                      <Button
                        ref={cancelRef}
                        onClick={onCloseMultipleCycle}
                        colorScheme="red"
                      >
                        {t("pages.courses.courseList.cancelButton")}
                      </Button>
                      <Button
                        colorScheme="green"
                        onClick={handleDeleteCycle}
                        ml={3}
                      >
                        {/* {t("pages.courses.courseList.Supprimer")} */}
                        Supprimer
                      </Button>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialogOverlay>
              </AlertDialog>
            </Box>
            <TableContainer border={"1px"} rounded={"md"}>
              <Table variant="striped" colorScheme={"white"} bg={"white"}>
                <Thead background="colors.secondary">
                  <Tr>
                    <Th>#</Th>
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
                        <CycleElement
                          cycle={cycle}
                          index={index}
                          selectedElementCycle={selectedElementCycle}
                          setSelectedElementCycle={setSelectedElementCycle}
                        />
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

const CycleElement = ({
  cycle,
  index,
  selectedElementCycle,
  setSelectedElementCycle,
}) => {
  const {
    isOpen: isOpenCycle,
    onOpen: onOpenCycle,
    onClose: onCloseCycle,
  } = useDisclosure();
  const { isOpen, onOpen, onClose, onToggle } = useDisclosure();
  const cancelRef = React.useRef();
  const toast = useToast();
  const router = useRouter();
  const [deleteCycle, loading, error] = useMutation(DELETE_CYCLE);

  const { data: dataDetailsCycle } = useQuery(GET_ONE_CYCLE);
  const { data: dataCycleById, refetch } = useQuery(GET_CYCLE_BY_ID, {
    variables: { id: router.query.id },
  });

  const [createCycle] = useMutation(CREATE_CYCLE);
  const [editCycle, setEditCycle] = useState(null);
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
    refetch()
  };

  console.log(dataCycleById?.findOnecycle);

  const handleCheckboxChangeCycle = (id, event) => {
    console.log(selectedElementCycle);
    console.log(id);
    // event.preventDefault();
    if (selectedElementCycle.includes(id)) {
      // console.log(id);
      setSelectedElementCycle(
        selectedElementCycle.filter((cycleId) => cycleId !== id)
      );
    } else {
      setSelectedElementCycle([...selectedElementCycle, id]);
    }
  };

  return (
    <Tr key={index}>
      <Td>
        <Checkbox
          size="sm"
          isChecked={selectedElementCycle.includes(cycle.id)}
          onChange={() => handleCheckboxChangeCycle(cycle.id)}
        ></Checkbox>
      </Td>
      <Td p={0} pl={6}>
        {cycle.name}
      </Td>
      <Td>{cycle.sectionName}</Td>
      {/* <Td  borderColor={'#C6B062'}>{cycle.section_id}</Td> */}
      {/* <Td p={0} pl={6}>pppp</Td> */}
      <Td p={0} pl={3}>
        <Box display="flex">
          <Tooltip>
            <Icon
              as={FiEdit}
              boxSize="40px"
              p="3"
              // bg="blue.100"
              rounded="full"
              onClick={onOpenCycle}
              _hover={{ background: "red.100" }}
            />
          </Tooltip>
          {console.log(dataCycleById?.findOnecycle)}
          <CycleCreate
            onOpenCycle={onOpenCycle}
            isOpenCycle={isOpenCycle}
            onCloseCycle={onCloseCycle}
            cycle={cycle}
          />
          {console.log(cycle)}
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

const SectionElement = ({
  section,
  index,
  selectedElements,
  setSelectedElements,
}) => {
  const toast = useToast();
  const router = useRouter();

  // const { isOpen, onOpen, onClose } = useDisclosure();
  const {
    isOpen: isOpennns,
    onOpen: onOpennns,
    onClose: onClossses,
    onToggle: onToggles,
  } = useDisclosure();

  const { isOpen, onOpen, onClose } = useDisclosure();

  const [deleteSection] = useMutation(DELETE_SECTION);
  const { data: dataSectionById, refetch } = useQuery(GET_SECTION_BY_ID);
  const [updateSection] = useMutation(UPDATE_SECTION);
  const cancelRef = React.useRef();
  const [editSection, setEditSection] = useState("");

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
    refetch()
  };

  //SUPRESSION MULTIPLE
  const handleCheckboxChange = (id, event) => {
    console.log(selectedElements);
    console.log(id);
    // event.preventDefault();
    if (selectedElements.includes(id)) {
      // console.log(id);
      setSelectedElements(
        selectedElements.filter((sectionId) => sectionId !== id)
      );
    } else {
      setSelectedElements([...selectedElements, id]);
    }
  };

  const handleEditSection = (section) => {
    setEditSection(section);
    refetch();
    console.log(section);
  };

  // const sectionUpdate = async () => {
  //   if (router.query.id) {
  //     await updateSection({
  //       id: router.query,
  //       input: {
  //         name: sections.name,
  //         description: sections.description,
  //       },
  //     });
  //   }
  // };

  return (
    <Tr key={index}>
      <Td>
        <Checkbox
          size="sm"
          isChecked={selectedElements.includes(section.id)}
          onChange={() => handleCheckboxChange(section.id)}
        ></Checkbox>
      </Td>
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
            boxSize="40px"
            p="3"
            rounded="full"
            _hover={{ background: "red.100" }}
            onClick={onOpen}
          />
          <SectionCreate
            section={section}
            onOpen={onOpen}
            isOpen={isOpen}
            onClose={onClose}
          />
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
                      Voulez-vous supprimer cette section?
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

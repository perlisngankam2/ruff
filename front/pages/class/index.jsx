import {
  Box,
  Flex,
  Button,
  ButtonGroup,
  IconButton,
  Center,
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
  Link as Links,
  Avatar,
  Icon,
  Heading,
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverHeader,
  PopoverBody,
  PopoverFooter,
  PopoverArrow,
  PopoverCloseButton,
  PopoverAnchor,
  useDisclosure,
  AlertDialog,
  AlertDialogOverlay,
  AlertDialogContent,
  AlertDialogBody,
  AlertDialogFooter,
  FormControl,
  FormLabel,
  useToast,
  AlertDialogHeader,
  InputRightElement,
  Card,
  Checkbox,
} from "@chakra-ui/react";

import { Select as Selects } from "chakra-react-select";

// import {Link} from "next"
import { useRouter } from "next/router";
import React, { use, useEffect, useState } from "react";
import { FiSearch, FiEdit } from "react-icons/fi";
import AddNew from "../../components/atoms/AddNew";
import StudentBox from "../../components/atoms/StudentBox";
import DefaultLayout from "../../components/layouts/DefaultLayout";
import {
  GET_ALL_CLASS,
  GET_ALL_PERSONNELS,
  GET_ALL_ANNEE_ACADEMIQUE,
  GET_ALL_COURSES,
  GET_ALL_PERSONNEL_SALLE,
  GET_ALL_SCHOOL_PARAMETER,
} from "../../graphql/Queries";
import {
  DELETE_SALLE,
  CREATE_PERSONNEL_SALLE,
  CREATE_MONTANT_SCOLARITE_CLASS,
} from "../../graphql/Mutation";
import { useMutation, useQuery } from "@apollo/client";
import { IoIosAdd } from "react-icons/io";
import { MdDelete } from "react-icons/md";
import ReactPaginate from "react-paginate";
import Link from "next/link";
import Routes from "../../modules/routes";
import { useTranslation } from "next-i18next";
import { getStaticPropsTranslations } from "../../types/staticProps";
import { useAuth } from "../../contexts/account/Auth/Auth";

const Class = () => {
  const router = useRouter();
  const cancelRef = React.useRef();
  const toast = useToast();
  const { t } = useTranslation();
  const { setAuthToken, authToken } = useAuth();
  const { isOpen, onToggle, onClose, onOpen } = useDisclosure();
  const {
    isOpen: isOpenn,
    onClose: onClosse,
    onOpen: onOpenn,
  } = useDisclosure();
  const {
    isOpen: isOpennes,
    onClose: onClosses,
    onOpen: onOpennes,
  } = useDisclosure();
  const {
    isOpen: isOpenMultipleClass,
    onOpen: onOpenMultipleClass,
    onClose: onCloseMultipleClass,
  } = useDisclosure();
  // const [salleId, setSalleId] = useState("");
  const [personnelId, setPersonnelId] = useState("");
  // const [anneeAcademiqueId, setAnneeAcademiqueId] = useState("");
  const [yearid, setYearId] = useState("");
  // const [courseId, setCourseId] = useState("");
  const [montantPension, setMontantPension] = useState();
  const [selectClassSarch, setSelectClassSearch] = useState("");
  const [selectedCourse, setSelectedCourse] = useState([]);
  const itemsPerPage = 20;
  const [pageNumber, setPageNumber] = useState(0);
  const pagesVisited = pageNumber * itemsPerPage;
  const [selectedElements, setSelectedElements] = useState([]);

  const [deleteClasse] = useMutation(DELETE_SALLE, {
    refetchQueries: [
      {
        query: GET_ALL_CLASS,
      },
    ],
  });
  const {
    data: dataClasse,
    refetch,
    loading,
    error,
  } = useQuery(GET_ALL_CLASS, { onError: (error) => console.log(error) });
  const { data: dataEnseignant } = useQuery(GET_ALL_PERSONNELS);
  const { data: dataAnneeAcademique } = useQuery(GET_ALL_ANNEE_ACADEMIQUE);
  const { data: dataCourse } = useQuery(GET_ALL_COURSES);
  const { data: dataPersonnelSalle } = useQuery(GET_ALL_PERSONNEL_SALLE);
  const { data: dataSchoolParameter } = useQuery(GET_ALL_SCHOOL_PARAMETER);

  const [createPersonnelSalle] = useMutation(CREATE_PERSONNEL_SALLE);
  const [createMontantPensionClasse] = useMutation(
    CREATE_MONTANT_SCOLARITE_CLASS
  );

  // RECUPERATION DU NOM ET DE L'ID DE L'ANNEE ACADEMIQUE
  const anneeAcademiqueName =
    dataSchoolParameter?.findAllparameters[0].anneeAcademiqueName;
  console.log(anneeAcademiqueName);

  let anneeAcademiqueId =
    dataSchoolParameter?.findAllparameters[0].anneeAcademiqueId;
  console.log("anneeAcademiqueIds", anneeAcademiqueId);

  const removeClass = async (id) => {
    await deleteClasse({
      variables: { id },
      refetchQueries: [
        {
          query: GET_ALL_CLASS,
        },
      ],
    });
    onClose();
    refetch();
    toast({
      title: "Suppression de la classe.",
      description: "Suppresion reussit.",
      status: "success",
      duration: 3000,
      isClosable: true,
    });
  };

  const courseTable = [];
  const loadingCourse = () => {
    dataCourse?.findAllCourse.map((course, index) => {
      courseTable.push({
        label: course?.title + " " + course?.time,
        value: course?.id,
      });
    });
  };

  useEffect(() => {
    console.log(dataPersonnelSalle?.findAllPersonnelSalle);
    loadingCourse();
    console.log(dataClasse);
    // console.log(dataCoursePersonnelSalle?.findbyCoursePersonnelSalle);
  });
  // const handleClose = () => {
  //   setShow(false)
  // }

  console.log(authToken);
  // useEffect(() => {
  //   console.log(authToken);

  //   if (!authToken) {
  //     router.back();
  //   }
  // }, [authToken]);

  if (loading) return <Text>Chargement en cours...</Text>;
  if (error) return <Text>Error: {error.message}</Text>;
  // http://downloads.asterisk.org/pub/telephony/asterisk/asterisk-20-current.tar.gz
  // const addPersonnelSalle = async (e) => {
  //   e.preventDefault();
  //   console.log(selectedCourse);
  //   console.log(salleId);
  //   selectedCourse.map((course, index) => {
  //     createPersonnelSalle({
  //       variables: {
  //         input: {
  //           salleId: salleId,
  //           personnelId: personnelId,
  //           courseId: course.value,
  //         },
  //       },
  //       refetchQueries: [
  //         {
  //           query: GET_ALL_PERSONNEL_SALLE,
  //         },
  //       ],
  //     });
  //   });
  //   refetch();
  //   onClosse();
  //   toast({
  //     title: "Affection du personnel a la salle.",
  //     description: "Affecte avec succes.",
  //     status: "success",
  //     duration: 3000,
  //     isClosable: true,
  //   });
  //   setPersonnelId("");
  //   setSalleId("");
  // };

  const pageCountSalle = Math.ceil(
    dataClasse?.findAllsalle.length / itemsPerPage
  );

  const changePage = ({ page }) => {
    setPageNumber(page);
  };

  const handleCheckboxChange = (id, event) => {
    console.log(selectedElements);
    console.log(id);
    // event.preventDefault();
    if (selectedElements.includes(id)) {
      // console.log(id);
      setSelectedElements(selectedElements.filter((salleId) => salleId !== id));
    } else {
      setSelectedElements([...selectedElements, id]);
    }
  };

  const handleDelete = async (id, event) => {
    selectedElements.map((salleId) => {
      const delete_ = async () => {
        try {
          await deleteClasse({
            variables: { id: salleId },
            refetchQueries: [
              {
                query: GET_ALL_CLASS,
              },
            ],
          });
          //   Réinitialiser la sélection des éléments après la suppression réussie
          setSelectedElements([]);
          refetch();
          toast({
            title: "Suppression de la classe.",
            description: "Suppresion reussit.",
            status: "success",
            duration: 3000,
            isClosable: true,
          });
        } catch (error) {
          console.error("Erreur lors de la suppression :", error);
        }
      };
      delete_();
      return "";
    });
    onCloseMultipleClass();
    // selectedElements.splice(id)
    console.log(selectedElements);
  };
  return (
    <DefaultLayout>
      <Box background="colors.tertiary" w="full">
        {/* <Flex gap={5} flexWrap="wrap">
          <AddNew />
          <StudentBox class="CM2" studentnumber="40" />
          <StudentBox class="SIL" studentnumber="23" />
          <StudentBox class="CP" studentnumber="16" />
          <StudentBox class="CM1" studentnumber="34" />
        </Flex> */}
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
              {t("pages.class.classList.heading")}
            </Heading>
            <Hide below="sm">
              <Text>Dashboad / Classes / Liste classes</Text>
            </Hide>
          </Flex>

          <Flex gap={10} mt={7} maxWidth={"1300px"}>
            <InputGroup width="500px">
              <InputRightElement
                children={<Icon as={FiSearch} />}
                cursor="pointer"
              />
              <Input
                placeholder="Recherchez une classe..."
                variant="flushed"
                borderBottom={"1px"}
                //value={recherche}
                // onChange={e => setQuery(e.target.value)}
              />
            </InputGroup>
            <Select
              width={"500px"}
              variant="flushed"
              placeholder="Selectionner la classe"
              onChange={(e) => setSelectClassSearch(e.target.value)}
              value={selectClassSarch}
            >
              {dataClasse &&
                dataClasse.findAllsalle.map((salle) => (
                  <option key={salle.id}>{salle.name}</option>
                ))}
            </Select>
            <Box>
              <Button
                rightIcon={<Icon as={IoIosAdd} boxSize="20px" />}
                onClick={() => router.push("/class/addclass")}
              >
                Ajouter une classe
              </Button>
            </Box>
          </Flex>

          {/* LISTE DES CLASSES */}
          <Box mt={10}>
            <Box>
              <Button
                colorScheme="red"
                size="xs"
                mb={"10px"}
                disabled={selectedElements.length === 0}
                // onClick={handleDelete}
                onClick={onOpenMultipleClass}
              >
                Supprimer
              </Button>
              <AlertDialog
                isOpen={isOpenMultipleClass}
                leastDestructiveRef={cancelRef}
                onClose={onCloseMultipleClass}
                isCentered
              >
                <AlertDialogOverlay alignSelf={"center"}>
                  <AlertDialogContent width={"380px"}>
                    <AlertDialogHeader
                      fontSize="lg"
                      fontWeight="bold"
                      textAlign={"center"}
                    >
                      {t("pages.courses.courseList.confirmDeleting")}
                    </AlertDialogHeader>
                    <AlertDialogBody textAlign={"center"}>
                      {t("pages.courses.courseList.wouldYouWantToDeleteCourse")}
                    </AlertDialogBody>
                    <AlertDialogFooter>
                      <Button
                        ref={cancelRef}
                        onClick={onCloseMultipleClass}
                        colorScheme="red"
                      >
                        {t("pages.courses.courseList.cancelButton")}
                      </Button>
                      <Button colorScheme="green" onClick={handleDelete} ml={3}>
                        {t("pages.courses.courseList.deleteButton")}
                      </Button>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialogOverlay>
              </AlertDialog>
            </Box>
            <TableContainer border={"1px"} rounded={"md"}>
              <Table variant="striped" colorScheme={"white"}>
                <Thead background="colors.secondary">
                  <Tr>
                    <Th>#</Th>
                    <Th>{t("pages.class.classList.name")}</Th>
                    <Th>Montant pension</Th>
                    <Th>Niveau</Th>

                    {/* <Th >section</Th>  */}
                    <Th>{t("pages.class.classList.Action")}</Th>
                  </Tr>
                </Thead>
                <Tbody>
                  {dataClasse &&
                    dataClasse.findAllsalle
                      .slice(pagesVisited, pagesVisited + itemsPerPage)
                      .filter((salle) => {
                        if (selectClassSarch == "") {
                          return salle;
                        } else if (
                          salle.name
                            .toLowerCase()
                            .includes(selectClassSarch.toLowerCase())
                        )
                          return salle;
                      })
                      .map((salle, index) => (
                        <Tr key={index}>
                          <Td>
                            <Checkbox
                              size="sm"
                              isChecked={selectedElements.includes(salle.id)}
                              onChange={() => handleCheckboxChange(salle.id)}
                            ></Checkbox>
                          </Td>
                          <Td p={0} pl={3}>
                            {salle.name}
                          </Td>
                          <Td p={0} pl={6}>
                            {salle.montantPensionSalle}
                          </Td>
                          <Td p={0} pl={6}>
                            {salle.levelName}
                          </Td>

                          {/* <Td borderColor={'#C6B062'}>{salle.montantPensionSalle}</Td>   */}
                          {/* <Td borderColor={'#C6B062'}>{salle.section}</Td>  */}
                          {/* <Td borderColor={'#C6B062'}>{salle.montantPension}</Td>  */}

                          <Td p={0} pl={6}>
                            <Box display={{ md: "flex" }} gap={3}>
                              <ButtonGroup
                                size="sm"
                                isAttached
                                variant="link"
                                colorScheme={"teal"}
                              >
                                <Button>
                                  <Links href="">
                                    {t("pages.class.classList.details")}
                                  </Links>
                                </Button>
                              </ButtonGroup>
                              <Box>
                                <Link
                                  // href="/class/updateclass"
                                  href={{
                                    pathname: Routes.ClasseEdit?.path || "",
                                    query: { id: salle?.id },
                                  }}
                                >
                                  <Icon
                                    as={FiEdit}
                                    boxSize="40px"
                                    p="3"
                                    rounded="full"
                                    _hover={{ background: "red.100" }}
                                  />
                                </Link>
                                <Icon
                                  as={MdDelete}
                                  boxSize="44px"
                                  p="3"
                                  rounded="full"
                                  color="colors.quaternary"
                                  onClick={onToggle}
                                  _hover={{ background: "blue.100" }}
                                />
                              </Box>
                            </Box>
                          </Td>
                          <Box href="#">
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
                                        "pages.class.classList.confirmDeletingClass"
                                      )}
                                    </AlertDialogHeader>
                                    <AlertDialogBody textAlign={"center"}>
                                      {t(
                                        "pages.class.classList.wouldYouWantToDeleteClass"
                                      )}
                                    </AlertDialogBody>
                                    <AlertDialogFooter>
                                      <Button
                                        ref={cancelRef}
                                        onClick={onClose}
                                        colorScheme="red"
                                      >
                                        {t(
                                          "pages.class.classList.cancelButton"
                                        )}
                                      </Button>
                                      <Button
                                        colorScheme="green"
                                        onClick={() => removeClass(salle?.id)}
                                        ml={3}
                                      >
                                        {t(
                                          "pages.class.classList.deleteButton"
                                        )}
                                      </Button>
                                    </AlertDialogFooter>
                                  </AlertDialogContent>
                                </AlertDialogOverlay>
                              </AlertDialog>
                            </Box>
                          </Box>
                        </Tr>
                      ))}
                </Tbody>
              </Table>
            </TableContainer>
          </Box>

          <Box mt={"15px"}>
            <ReactPaginate
              previousLabel={"<<"}
              nextLabel={">>"}
              pageCount={pageCountSalle}
              onPageChange={changePage}
              containerClassName={"paginationBttns"}
              previousLinkClassName={"previousBttn"}
              nextLinkClassName={"nextBttn"}
              disabledClassName={"paginationDisabled"}
              activeClassName={"paginationActive"}
            />
          </Box>
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

export default Class;

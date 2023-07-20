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
  Checkbox,
  AlertDialog,
  AlertDialogBody,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogContent,
  AlertDialogOverlay,
  useDisclosure,
  Button,
  InputRightElement,
} from "@chakra-ui/react";

import DefaultLayout from "../../components/layouts/DefaultLayout";
//   import AjouterCategoryEleve from './AjouterCategoryEleve';
import AjouterCours from "./addCours";
import { Router, useRouter } from "next/router";
import { FiEdit, FiSearch } from "react-icons/fi";
import { MdDelete } from "react-icons/md";
//   import { GET_ALL_Category_Eleve } from "../../graphql/Queries";
//   import { DELETE_CATEGORY_STUDENT } from "../../graphql/Mutation";
import { useMutation, useQuery } from "@apollo/client";
import React, { use, useEffect, useState } from "react";
import { GET_ALL_COURSES } from "../../graphql/Queries";
import { DELETE_COURSE } from "../../graphql/Mutation";
import ReactPaginate from "react-paginate";
import { useTranslation } from "next-i18next";
import { getStaticPropsTranslations } from "../../types/staticProps";
import { useAuth } from "../../contexts/account/Auth/Auth";
import { on } from "events";

const ListeDesCours = () => {
  const router = useRouter();
  const [query, setQuery] = useState("");
  const cancelRef = React.useRef();
  const { t } = useTranslation();
  const { setAuthToken, authToken } = useAuth();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const {
    isOpen: isOpenMultipleCourse,
    onOpen: onOpenMultipleCourse,
    onClose: onCloseMultipleCourse,
  } = useDisclosure();

  const [searchCourse, setSearchCourse] = useState("");
  const itemsPerPage = 15;
  const [pageNumber, setPageNumber] = useState(0);
  const pagesVisited = pageNumber * itemsPerPage;
  const [selectedElements, setSelectedElements] = useState([]);
  // //const [classeValue , setClasseValue ] = useState("");
  // const [data, setData] = useState([]);
  // const keys = ["first_name", "last_name", "email", "classe"];

  // const search = (data) => {

  //   let datas = data.filter((item) => keys.some((key) => (
  //     item[key].toUpperCase().includes(query)
  //     )
  //   ));
  //   console.log("datas :" , datas)
  //   return query ? datas.slice(0,5) : Users.slice(0,5)
  // };

  //  const {data:dataCategoryEleve} = useQuery(GET_ALL_Category_Eleve);
  //  const [deleteCategoryStudent] = useMutation(DELETE_CATEGORY_STUDENT);
  const {
    data: dataCourse,
    refetch,
    loading,
    error,
  } = useQuery(GET_ALL_COURSES);
  const [deleteCourse] = useMutation(DELETE_COURSE);

  useEffect(() => {
    if (!authToken) {
      router.back();
    }
  }, [authToken]);

  useEffect(() => {
    console.log(dataCourse?.findAllCourse);
  });

  if (loading) return <Text>Chargement en cours...</Text>;
  if (error) return <Text>Error: {error.message}</Text>;

  const removeCourse = async (id) => {
    await deleteCourse({
      variables: { id },
      refetchQueries: [
        {
          query: GET_ALL_COURSES,
        },
      ],
    });
    refetch();
    onClose();
  };

  const handlechangeSearchCourse = (e) => {
    setSearchCourse(e.target.value);
  };

  const pageCountCourse = Math.ceil(
    dataCourse?.findAllCourse.length / itemsPerPage
  );

  const changePage = ({ page }) => {
    setPageNumber(page);
  };
  //  console.log(selectedElements);
  const handleCheckboxChange = (id, event) => {
    console.log(selectedElements);
    console.log(id);
    // event.preventDefault();
    if (selectedElements.includes(id)) {
      // console.log(id);
      setSelectedElements(
        selectedElements.filter((courseId) => courseId !== id)
      );
    } else {
      setSelectedElements([...selectedElements, id]);
    }
  };

  const handleDelete = async (id, event) => {
    selectedElements.map((courseId) => {
      const delete_ = async () => {
        try {
          await deleteCourse({
            variables: { id: courseId },
            refetchQueries: [
              {
                query: GET_ALL_COURSES,
              },
            ],
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
    onCloseMultipleCourse();
    // selectedElements.splice(id)
    console.log(selectedElements);
  };

  return (
    <DefaultLayout>
      <Box p="3" pt={"80px"} w="full">
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
            {t("pages.courses.courseList.heading")}
            {/* Matière */}
          </Heading>
          <Hide below="sm">
            <Text>Dashboad/cours/liste des matiere </Text>
          </Hide>
        </Flex>
        <Flex gap={10} mt={5}>
          <InputGroup width="500px">
            <InputRightElement
              children={<Icon as={FiSearch} />}
              cursor="pointer"
            />
            <Input
              placeholder="Recherchez une matiere..."
              variant="flushed"
              //value={recherche}
              onChange={handlechangeSearchCourse}
            />
            {/* <InputRightAddon children={<SearchIcon />} /> */}
          </InputGroup>
          {/* <Select 
             placeholder="Selectionner la classe"
             onChange={e =>setQuery(e.target.value)}
           >
           </Select> */}
          <AjouterCours />
        </Flex>
        <Box mt={10}>
          <Box mb={"15px"}>
            <Button
              colorScheme="red"
              size="xs"
              disabled={selectedElements.length === 0}
              // onClick={handleDelete}
              onClick={onOpenMultipleCourse}
            >
              Supprimer
            </Button>
            {/* POPUP POUR LA SUPPRESSION MULTIPLE */}
            <AlertDialog
              isOpen={isOpenMultipleCourse}
              leastDestructiveRef={cancelRef}
              onClose={onCloseMultipleCourse}
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
                      onClick={onCloseMultipleCourse}
                      colorScheme="red"
                    >
                      {t("pages.courses.courseList.cancelButton")}
                    </Button>
                    <Button colorScheme="green" onClick={handleDelete} ml={3}>
                      {t("pages.courses.courseList.Supprimer")}
                    </Button>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialogOverlay>
            </AlertDialog>
          </Box>
          <TableContainer border={"1px"} rounded={"md"}>
            <Table variant={"striped"} colorScheme={"white"} bg={"white"}>
              <Thead background="colors.secondary">
                <Tr>
                  <Th>#</Th>
                  <Th>{t("pages.courses.courseList.name")}</Th>
                  <Th>{t("pages.courses.courseList.courseHours")}</Th>
                  <Th>{t("pages.courses.courseList.action")}</Th>
                </Tr>
              </Thead>
              {dataCourse && (
                <Tbody p={0}>
                  {dataCourse.findAllCourse
                    .slice(pagesVisited, pagesVisited + itemsPerPage)
                    .filter((course) => {
                      if (searchCourse == "") {
                        return course;
                      } else if (
                        course.title
                          .toLowerCase()
                          .includes(searchCourse.toLowerCase())
                      )
                        return course;
                    })
                    .map((course, index) => (
                      <Tr key={index} borderColor={"#C6B062"}>
                        <Td>
                          <Checkbox
                            size="sm"
                            isChecked={selectedElements.includes(course.id)}
                            onChange={() => handleCheckboxChange(course.id)}
                          ></Checkbox>
                        </Td>
                        <Td flex={"1"} p={0} pl={6}>
                          {course.title}
                        </Td>
                        <Td p={0} pl={6}>
                          {course.time}
                        </Td>
                        <Td p={0} pl={3}>
                          <Box display="flex">
                            <Link href="#">
                              <Icon
                                as={FiEdit}
                                boxSize="37px"
                                p="3"
                                rounded={"full"}
                                _hover={{ background: "blue.100" }}
                              />
                            </Link>
                            <Box href="#" mt="-3px">
                              <Icon
                                as={MdDelete}
                                boxSize="42px"
                                p="3"
                                rounded="full"
                                color="colors.quaternary"
                                _hover={{ background: "blue.100" }}
                                onClick={onOpen}
                              />
                              <Box>
                                <AlertDialog
                                  isOpen={isOpen}
                                  leastDestructiveRef={cancelRef}
                                  onClose={onClose}
                                  isCentered
                                >
                                  <AlertDialogOverlay alignSelf={"center"}>
                                    <AlertDialogContent width={"380px"}>
                                      <AlertDialogHeader
                                        fontSize="lg"
                                        fontWeight="bold"
                                        textAlign={"center"}
                                      >
                                        {t(
                                          "pages.courses.courseList.confirmDeleting"
                                        )}
                                      </AlertDialogHeader>
                                      <AlertDialogBody textAlign={"center"}>
                                        {t(
                                          "pages.courses.courseList.wouldYouWantToDeleteCourse"
                                        )}
                                      </AlertDialogBody>
                                      <AlertDialogFooter>
                                        <Button
                                          ref={cancelRef}
                                          onClick={onClose}
                                          colorScheme="red"
                                        >
                                          {t(
                                            "pages.courses.courseList.cancelButton"
                                          )}
                                        </Button>
                                        <Button
                                          colorScheme="green"
                                          onClick={() =>
                                            removeCourse(course.id)
                                          }
                                          ml={3}
                                        >
                                          {t(
                                            "pages.courses.courseList.deleteButton"
                                          )}
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
            pageCount={pageCountCourse}
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
export default ListeDesCours;

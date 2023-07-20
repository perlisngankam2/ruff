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
  AlertDialog,
  AlertDialogBody,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogContent,
  AlertDialogOverlay,
  useDisclosure,
  InputRightElement,
  Checkbox,
} from "@chakra-ui/react";

import { useRouter } from "next/router";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import AddNew from "../../components/atoms/AddNew";
import StudentBox from "../../components/atoms/StudentBox";
import DefaultLayout from "../../components/layouts/DefaultLayout";
import { GET_ALL_STUDY_LEVEL } from "../../graphql/Queries";
import { DELETE_STUDY_LEVEL } from "../../graphql/Mutation";
import { useMutation, useQuery } from "@apollo/client";
import { IoIosAdd } from "react-icons/io";
import { FiEdit, FiSearch } from "react-icons/fi";
import { MdDelete } from "react-icons/md";
import ReactPaginate from "react-paginate";
import Routes from "../../modules/routes";
import { useTranslation } from "next-i18next";
import { getStaticPropsTranslations } from "../../types/staticProps";
import { useAuth } from "../../contexts/account/Auth/Auth";

const levelList = () => {
  const router = useRouter();
  const cancelRef = React.useRef();
  const { setAuthToken, authToken } = useAuth();
  const { t } = useTranslation();
  const { isOpen, onToggle, onClose } = useDisclosure();
  const {
    isOpen: isOpenMultipleLevel,
    onOpen: onOpenMultipleLevel,
    onClose: onCloseMultipleLevel,
  } = useDisclosure();
  const [searchStudyLevel, setSearchStudyLevel] = useState("");
  const itemsPerPage = 2;
  const [pageNumber, setPageNumber] = useState(0);
  const pagesVisited = pageNumber * itemsPerPage;
  const [selectedElements, setSelectedElements] = useState([]);

  const [deleteStudyLevel] = useMutation(DELETE_STUDY_LEVEL);
  const {
    data: dataStudyLevel,
    loading,
    error,
  } = useQuery(GET_ALL_STUDY_LEVEL);

  const removeStudyLevel = async (id) => {
    deleteStudyLevel({
      variables: { id },
      refetchQueries: [
        {
          query: GET_ALL_STUDY_LEVEL,
        },
      ],
    });
    onClose();
  };

  useEffect(() => {
    console.log(authToken);
    if (!authToken) {
      router.back();
    }
  }, [authToken]);

  useEffect(() => {
    console.log(dataStudyLevel?.findAllNiveauEtude);
  });

  if (loading) return <Text>Chargement en cours...</Text>;
  if (error) return <Text>Une erreur s'est produite!</Text>;

  const handleChange = (e) => {
    setSearchStudyLevel(e.target.value);
  };

  const handleCheckboxChange = (id, event) => {
    console.log(selectedElements);
    console.log(id);
    // event.preventDefault();
    if (selectedElements.includes(id)) {
      // console.log(id);
      setSelectedElements(selectedElements.filter((levelId) => levelId !== id));
    } else {
      setSelectedElements([...selectedElements, id]);
    }
  };

  const handleDelete = async (id, event) => {
    selectedElements.map((levelId) => {
      const delete_ = async () => {
        try {
          await deleteStudyLevel({
            variables: { id: levelId },
            refetchQueries: [
              {
                query: GET_ALL_STUDY_LEVEL,
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
    onCloseMultipleLevel();
    // selectedElements.splice(id)
    console.log(selectedElements);
  };

  const pageCountStudyLevel = Math.ceil(
    dataStudyLevel?.findAllNiveauEtude.length / itemsPerPage
  );

  const changePage = ({ selected }) => {
    setPageNumber(selected);
  };
  return (
    <DefaultLayout>
      <Box p="10px" pt={"70px"} background="colors.tertiary" w="full">
        <Box p="3" pt={"10px"} w="full">
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
              {t("pages.level.listLevel.heading")}
            </Heading>
            <Hide below="sm">
              <Text>Dashboad / Niveau / Liste des niveaux</Text>
            </Hide>
          </Flex>
          <Flex gap={10} mt={6}>
            <InputGroup>
              <InputRightElement
                children={<Icon as={FiSearch} />}
                cursor="pointer"
              />
              <Input
                placeholder="Recherchez un niveau..."
                //value={recherche}
                // onChange={e => setQuery(e.target.value)}
                onChange={handleChange}
                variant="flushed"
              />
            </InputGroup>
            {/* <Select 
              variant="flushed"
              placeholder="Selectionner la classe"
              // onChange={e =>setQuery(e.target.value)}
            >
              {/* {Classes.map((classe) => (
                <option 
                  key={classe.id}
                >{classe.classe}</option>
              ))} */}
            {/* </Select> */}
            <Box>
              <Button
                rightIcon={<Icon as={IoIosAdd} boxSize="20px" />}
                onClick={() => router.push("/level/addLevel")}
              >
                {t("pages.level.listLevel.addButton")}
              </Button>
            </Box>
          </Flex>
          <Box mt={10}>
            <Box>
              <Button
                colorScheme="red"
                size="xs"
                mb={"10px"}
                disabled={selectedElements.length === 0}
                // onClick={handleDelete}
                onClick={onOpenMultipleLevel}
              >
                Supprimer
              </Button>
              <AlertDialog
                isOpen={isOpenMultipleLevel}
                leastDestructiveRef={cancelRef}
                onClose={onCloseMultipleLevel}
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
                        onClick={onCloseMultipleLevel}
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
            <TableContainer border={"1px"} rounded={"md"} bg={"white"}>
              <Table variant="striped" bg={"white"} colorScheme={"white"}>
                <Thead background="colors.secondary">
                  <Tr>
                    <Th>#</Th>
                    <Th>{t("pages.level.listLevel.name")}</Th>
                    <Th>{t("pages.level.listLevel.fees")}</Th>
                    <Th>Cyle</Th>
                    {/* <Th >section</Th> */}
                    <Th>{t("pages.level.listLevel.Action")}</Th>
                  </Tr>
                </Thead>
                <Tbody>
                  {dataStudyLevel &&
                    dataStudyLevel.findAllNiveauEtude
                      .slice(pagesVisited, pagesVisited + itemsPerPage)
                      .filter((niveauEtude) => {
                        if (searchStudyLevel == "") {
                          return niveauEtude;
                        } else if (
                          niveauEtude.name
                            .toLowerCase()
                            .includes(searchStudyLevel.toLowerCase())
                          // niveauEtude.montantPension.includes(searchStudyLevel)
                        )
                          return niveauEtude;
                      })
                      .map((niveauEtude, index) => (
                        <Tr key={index}>
                          <Td>
                            <Checkbox
                              size="sm"
                              isChecked={selectedElements.includes(
                                niveauEtude.id
                              )}
                              onChange={() =>
                                handleCheckboxChange(niveauEtude.id)
                              }
                            ></Checkbox>
                          </Td>
                          <Td p={0} pl={6}>
                            {niveauEtude.name}
                          </Td>
                          <Td p={0} pl={6}>
                            {niveauEtude.montantPension}
                          </Td>
                          <Td p={0} pl={6}>
                            {niveauEtude.cycleName}
                          </Td>
                          <Td p={0} pl={3}>
                            {/* <ButtonGroup 
                              size='sm' 
                              isAttached 
                              variant='link' 
                              colorScheme={'teal'}
                              >
                                <Button>
                                  <Links 
                                    href='/eleves/details'
                                  >Details</Links>
                                </Button>
                              </ButtonGroup>  */}
                            <Box display="flex">
                              <Link
                                href={{
                                  pathname: Routes.levelEdit?.path || "",
                                  query: { id: niveauEtude.id },
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
                              <Box href="#" mt="-3px">
                                <Icon
                                  as={MdDelete}
                                  boxSize="44px"
                                  p="3"
                                  rounded="full"
                                  color="colors.quaternary"
                                  onClick={onToggle}
                                  _hover={{ background: "blue.100" }}
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
                                          {t(
                                            "pages.level.listLevel.confirmDeleting"
                                          )}
                                        </AlertDialogHeader>
                                        <AlertDialogBody textAlign={"center"}>
                                          {t(
                                            "pages.level.listLevel.wouldYouWantToDeleteLevel"
                                          )}
                                        </AlertDialogBody>
                                        <AlertDialogFooter>
                                          <Button
                                            ref={cancelRef}
                                            onClick={onClose}
                                            colorScheme="red"
                                          >
                                            {t(
                                              "pages.level.listLevel.cancelButton"
                                            )}
                                          </Button>
                                          <Button
                                            colorScheme="green"
                                            onClick={() =>
                                              removeStudyLevel(niveauEtude.id)
                                            }
                                            ml={3}
                                          >
                                            {t(
                                              "pages.level.listLevel.deleteButton"
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
              </Table>
            </TableContainer>
          </Box>
          <Box mt={"15px"}>
            <ReactPaginate
              previousLabel={"<<"}
              nextLabel={">>"}
              pageCount={pageCountStudyLevel}
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
export default levelList;

import {
  Center,
  Heading,
  Divider,
  Input,
  NumberInput,
  Box,
  Button,
  ButtonGroup,
  IconButton,
  Flex,
  Hide,
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
} from "@chakra-ui/react";
import React from "react";
import DefaultLayout from "../../components/layouts/DefaultLayout";
import { useRouter } from "next/router";
import { IoIosAdd } from "react-icons/io";
import { useEffect, useState } from "react";
import { useMutation, useQuery } from "@apollo/client";
import { CREATE_RETENUE, DELETE_RETENUE } from "../../graphql/Mutation";
import { GET_ALL_RETENUE, GET_PRIME } from "../../graphql/Queries";
import { CheckIcon } from "@chakra-ui/icons";
import { useToast } from "@chakra-ui/react";
import { FiEdit, FiSearch } from "react-icons/fi";
import { MdDelete } from "react-icons/md";
import ReactPaginate from "react-paginate";
import { useTranslation } from "next-i18next";
import { getStaticPropsTranslations } from "../../types/staticProps";
import CreerRetenue from "./creerRetenue";
import { useAuth } from "../../contexts/account/Auth/Auth";

function ajouterRetenue() {

  const { setAuthToken, authToken } = useAuth();
  const { isOpen, onToggle, onClose, onOpen } = useDisclosure();
  const [Nom, setNom] = useState("");
  const [Description, setDescription] = useState("");
  const [Montant, setMontant] = useState("");
  const [categoryPersonnelId, setCategoryPersonnelId] = useState("");
  const [createRetenue, error] = useMutation(CREATE_RETENUE);
  const [deleteRetenu ] = useMutation(DELETE_RETENUE);

  const { data: dataPrime } = useQuery(GET_PRIME);
  const toast = useToast();
  const router = useRouter();
  const { data: dataRetenue, refetch } = useQuery(GET_ALL_RETENUE);
  const itemsPerPage = 15;
  const [pageNumber, setPageNumber] = useState(0);
  const pagesVisited = pageNumber * itemsPerPage;
  const pageCountRetenue = Math.ceil(
    dataRetenue?.findAllretenusalarial.length / itemsPerPage
  );

  const cancelRef = React.useRef();
  const { t } = useTranslation();
  const [searchRetenue, setSearchRetenue] = useState("");

  const handleChangeRetenue = (event) => {
    setSearchRetenue(event.target.value);
  };

  const changePage = ({ page }) => {
    setPageNumber(page);
  };

  //debug
  console.log(dataPrime);
  useEffect(() => {
    if (!authToken) {
      router.back();
    }
  }, [authToken]);

  const HandleClick = async (event) => {
    event.preventDefault();

    const primeData = await createRetenue({
      variables: {
        retenue: {
          nom: Nom,
          description: Description,
          montant: parseInt(Montant),
          // categorieId: categoryPersonnelId,
        },
      },
    });
    refetch();
    // console.log(userData)
    toast({
      title: "Succès.",
      description: "La retenue a été crée .",
      status: "success",
      duration: 3000,
      isClosable: true,
    });
  };
  //     const today = new Date();
  //     const day = today.getDate().toString().padStart(2, '0');
  //     const month = (today.getMonth() + 1).toString().padStart(2, '0');
  //     const year = today.getFullYear();
  //     const formattedDate = `${day}/${month}/${year}`;
  // console.log(formattedDate)



  return (
    <DefaultLayout>
      <Box p="3" pt="70px" w="100%" bg={"#f6f7fb"}>
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
            Retenue
          </Heading>
          <Hide below="sm">
            <Text>Dashboad / Salaire/Retenues Salariales</Text>
          </Hide>
        </Flex>
        <Flex gap={8} mt={7}>
          <InputGroup>
            {/* <InputRightElement
              children={<Icon as={FiSearch} />}
              cursor="pointer"
            /> */}
            <InputRightElement
              children={<Icon as={FiSearch} />}
              cursor="pointer"
            />
            <Input
              placeholder="Recherchez une retenue..."
              //value={recherche}
              variant="flushed"
              onChange={handleChangeRetenue}
            />
            {/* <InputRightAddon 
              cursor="pointer"
              children={<SearchIcon variant="flushed"/>} 
            /> */}
          </InputGroup>
          {/* <Select 
            placeholder="Selectionner la classe"
            onChange={e =>setQuery(e.target.value)}
          >
          </Select> */}
          <CreerRetenue />
        </Flex>
        <Box mb={5} mt="10">
          <TableContainer border={"1px"} rounded={"md"}>
            <Table variant="striped" colorScheme={"white"} bg={"white"}>
              <Thead background="colors.secondary">
                <Tr>
                  <Th>Nom</Th>
                  <Th>Valeur</Th>
                  <Th>Actions</Th>
                </Tr>
              </Thead>
              {dataRetenue && (
                <Tbody>
                  {dataRetenue?.findAllretenusalarial
                    .slice(pagesVisited, pagesVisited + itemsPerPage)
                    .filter((retenue) => {
                      if (searchRetenue == "") {
                        return retenue;
                      } else if (
                        retenue.nom
                          .toLowerCase()
                          .includes(searchRetenue.toLowerCase())
                      )
                        return retenue;
                    })
                    .map((retenue, index) => (
                     <RetenueElement retenue={retenue} index={index}/>
                    ))}
                </Tbody>
              )}
            </Table>
          </TableContainer>
        </Box>
      </Box>
    </DefaultLayout>
  );
}
export async function getStaticProps({ locale }) {
  return {
    props: {
      ...(await getStaticPropsTranslations(locale)),
      // Will be passed to the page component as props
    },
  };
}
export default ajouterRetenue;

const RetenueElement = ({retenue, index}) => {
  const toast = useToast();
  const { isOpen, onToggle, onClose, onOpen } = useDisclosure();
  const [categoryPersonnelId, setCategoryPersonnelId] = useState("");
  const { data: dataRetenue, refetch } = useQuery(GET_ALL_RETENUE);
  const [createRetenue, error] = useMutation(CREATE_RETENUE);
  const [deleteRetenu ] = useMutation(DELETE_RETENUE);
  const cancelRef = React.useRef();


  const removeRetenu = async (id) => {
    await deleteRetenu({
      variables: { id },
      refetchQueries: [
        {
          query: GET_ALL_RETENUE,
        }
      ]
    });
    refetch()
    toast({
      title: "Suppression de la retenue.",
      description: "Suppresion reussit.",
      status: "success",
      duration: 3000,
      isClosable: true,
    });
    onClose();
  };
  return(
    <Tr key={index}>
    <Td p={0} pl={6}>
      {retenue.nom}
    </Td>

    {/* <Td  borderColor={'#C6B062'}>{cycle.section_id}</Td> */}
    <Td p={0} pl={6}>
      {retenue.montant}
    </Td>
    <Td p={0} pl={3}>
      <Box display="flex">
        <Icon
          as={FiEdit}
          boxSize="40px"
          p="3"
          // bg="blue.100"
          rounded="full"
          // onClick={onOpen}
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
                  Voulez-vous supprimer cette retenue?
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
                    onClick={() => removeRetenu(retenue.id)}
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
  )
}
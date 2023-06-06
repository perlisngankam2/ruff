import React from "react";
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
import DefaultLayout from "../../components/layouts/DefaultLayout";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useMutation, useQuery } from "@apollo/client";
import { CREATE_PRIME } from "../../graphql/Mutation";
import { GET_PRIME, GET_ALL_Category_Personnel } from "../../graphql/Queries";
import { CheckIcon } from "@chakra-ui/icons";
import { useToast } from "@chakra-ui/react";
import { IoIosAdd } from "react-icons/io";
import { FiEdit, FiSearch } from "react-icons/fi";
import { MdDelete } from "react-icons/md";
import ReactPaginate from "react-paginate";
import { useTranslation } from "next-i18next";
import { getStaticPropsTranslations } from "../../types/staticProps";
import { useAuth } from "../../contexts/account/Auth/Auth";

function creerPrime() {
  const { setAuthToken, authToken } = useAuth();
  const { isOpen, onToggle, onClose, onOpen } = useDisclosure();
  const [Nom, setNom] = useState("");
  const [Description, setDescription] = useState("");
  const [Montant, setMontant] = useState("");
  const [categoryPersonnelId, setCategoryPersonnelId] = useState("");
  const [createPrime, error] = useMutation(CREATE_PRIME);

  const { data: dataCategoryPersonnel } = useQuery(GET_ALL_Category_Personnel);
  const toast = useToast();
  const router = useRouter();
  const { data: dataPrime, refetch } = useQuery(GET_PRIME);
  //  const {data:dataRetenue, refetch} = useQuery(GET_ALL_RETENUE)
  const itemsPerPage = 15;
  const [pageNumber, setPageNumber] = useState(0);
  const pagesVisited = pageNumber * itemsPerPage;
  //   const pageCountRetenue = Math.ceil(dataRetenue?.findAllretenusalarial.length / itemsPerPage);
  const cancelRef = React.useRef();
  const { t } = useTranslation();
  const changePage = ({ page }) => {
    setPageNumber(page);
  };

  useEffect(() => {
    if (!authToken) {
      router.back();
    }
  }, [authToken]);

  const HandleClick = async (event) => {
    event.preventDefault();

    const primeData = await createPrime({
      variables: {
        prime: {
          nom: Nom,
          description: Description,
          montant: parseInt(Montant),
          // categorieId: categoryPersonnelId,
        },
      },
    });
    refetch();
    // console.log(userData)
    onClose();

    toast({
      title: "Succès.",
      description: "La prime a été crée .",
      status: "success",
      duration: 3000,
      isClosable: true,
    });
    setNom("");
    setDescription("");
    setMontant("");
  };

  return (
    <Center>
      <Box>
        <Box>
          <Button
            ml={["20px", "50px", "100px", "600px"]}
            rightIcon={<Icon as={IoIosAdd} boxSize="20px" />}
            onClick={onOpen}
          >
            Ajouter une prime
          </Button>
        </Box>
        <Box>
          <AlertDialog
            isOpen={isOpen}
            leastDestructiveRef={cancelRef}
            onClose={onClose}
            size="xl"
          >
            <AlertDialogOverlay>
              <AlertDialogContent width={"400px"}>
                <Box as={"form"} onSubmit={HandleClick}>
                  <Heading
                    p="1em"
                    textAlign="center"
                    bgGradient="linear(to-r, teal.500, green.500)"
                    bgClip="text"
                    fontSize={"30px"}
                  >
                    Ajouter une prime
                  </Heading>
                  <Box mx="30px" pb={"15px"}>
                    <Divider />
                  </Box>
                  <Box w="300px" margin="0 auto" textAlign="center" gap={200}>
                    <Box pb={"10px"}>
                      <Input
                        type="text"
                        value={Nom}
                        onChange={(e) => setNom(e.target.value)}
                        name="Nom"
                        placeholder="nom prime"
                        bg="white"
                        isRequired
                        // type="date"
                        // id="dateOfPrime"
                        // name="dateOfPrime"
                        // placeholder="{formattedDate}"
                        // bg='white'

                        // borderColor="purple.100"
                        // onChange={e => setDateOfStartWork(e.target.value)}
                        // value={dateOfStartWork}
                        // // ref={dateOfStartWorkRef}
                      />
                    </Box>

                    <Box pb={"10px"}>
                      <Input
                        type="text"
                        value={Description}
                        onChange={(e) => setDescription(e.target.value)}
                        name="Description"
                        placeholder="description prime"
                        bg="white"
                        // borderColor="purple.100"
                        // onChange={e => setLastName(e.target.value)}
                        // value={lastName}
                      />
                    </Box>
                    <Box pb={"15px"}>
                      <Input
                        type="text"
                        value={Montant}
                        onChange={(e) => setMontant(e.target.value)}
                        placeholder="--montant--"
                        bg="white"
                        isRequired
                        // borderColor="purple.100"
                        // onChange={e => setLastName(e.target.value)}
                        // value={lastName}
                      />
                    </Box>
                  </Box>

                  <Box mx="30px" pt="0px" pb={"15px"}>
                    <Divider />
                  </Box>
                  <Center mb="6">
                  <Button
                      type="submit"
                      colorScheme="red"
                      variant="solid"
                      mx="auto"
                      my="auto"
                      onClick={onClose}
                    >
                      Annuler
                    </Button>
                    <Button
                      type="submit"
                      leftIcon={<CheckIcon />}
                      colorScheme="teal"
                      variant="solid"
                      mx="auto"
                      my="auto"
                    >
                      Enregistrer
                    </Button>
                  </Center>
                </Box>
              </AlertDialogContent>
            </AlertDialogOverlay>
          </AlertDialog>
        </Box>
      </Box>
    </Center>
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

export default creerPrime;

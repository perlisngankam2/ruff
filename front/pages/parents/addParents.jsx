import { AlertDialogCloseButton, Box, Heading, Select } from "@chakra-ui/react";
import SearchBar from "../../components/atoms/searchbar";
import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogContent,
  AlertDialogOverlay,
  useDisclosure,
  Button,
  Center,
  Flex,
  Input,
  FormControl,
  FormLabel,
  extendTheme,
  Icon,
  useToast,
} from "@chakra-ui/react";
import React from "react";
import { IoIosAdd } from "react-icons/io";
import { useMutation, useQuery } from "@apollo/client";
import {
  CREATE_SECTION,
  UPDATA_SECTION,
  CREATE_PARENT,
} from "../../graphql/Mutation";
import { GET_ALL_PARENT, GET_ALL_SECTION } from "../../graphql/Queries";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { useAuth } from "../../contexts/account/Auth/Auth";

const addParents = () => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { setAuthToken, authToken } = useAuth();

  const cancelRef = React.useRef();
  const [createParent, { error }] = useMutation(CREATE_PARENT, {
    onError: (error) => console.log(error),
  });
  const router = useRouter();
  const toast = useToast();
  const { data: dataparents, refetch } = useQuery(GET_ALL_PARENT);

  const [parent, setParent] = useState({
    firstname: "",
    lastname: "",
    profession: "",
    phonenumber: "",
    gender: "",
    parentStatus: "",
    childNumber: 0,
  });

  let input;
  useEffect(() => {
    if (!authToken) {
      router.back();
    }
  }, [authToken]);

  const addParent = async (event, value) => {
    event.preventDefault();
    console.log("cccc");

    await createParent({
      variables: {
        parent: {
          firstname: parent.firstname,
          lastname: parent.lastname,
          profession: parent.profession,
          phonenumber: parent.phonenumber,
          gender: parent.gender,
          parentStatus: parent.parentStatus,
          childNumber: parseInt(parent.childNumber),
        },
      },
      refetchQueries: [
        {
          query: GET_ALL_PARENT,
        },
      ],
    });
    refetch();
    onClose();
    toast({
      title: "Creation d'une section.",
      description: "La classe a été créée avec succes.",
      status: "success",
      duration: 3000,
      isClosable: true,
    });
    setName("");
    setDescription("");
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
            Ajouter un parent
          </Button>
        </Box>
        <Box
        // onSubmit={() => router.push("/parents/lisOfParents")}
        >
          <AlertDialog
            isOpen={isOpen}
            leastDestructiveRef={cancelRef}
            closeOnOverlayClick={false}
            onClose={onClose}
            size="xl"
            isCentered
          >
            <AlertDialogOverlay closeOnOverlayClick={false}>
              <AlertDialogContent width={"800px"}>
                <Box as={"form"} onSubmit={addParent}>
                  <AlertDialogHeader fontSize="sm" fontWeight="base" mt="0">
                    <Box>
                      <Heading
                        textAlign={"center"}
                        fontSize={["15px", "20px", "24px"]}
                        p="2"
                      >
                        Ajouter un parent
                      </Heading>
                    </Box>
                  </AlertDialogHeader>
                  <AlertDialogCloseButton />
                  <AlertDialogBody>
                    <Box>
                      <Flex gap={5}>
                        <FormControl>
                          <FormLabel>Nom</FormLabel>
                          <Input
                            id="name"
                            type={"text"}
                            name="firstname"
                            placeholder="nom"
                            onChange={(event) =>
                              setParent({
                                ...parent,
                                firstname: event.target.value,
                              })
                            }
                            ref={(node) => {
                              input = node;
                            }}
                            value={parent.firstname}
                            isRequired
                          />
                        </FormControl>
                        <FormControl>
                          <FormLabel>Prenom</FormLabel>
                          <Input
                            id="description"
                            type={"text"}
                            name="lastname"
                            placeholder="Description"
                            onChange={(event) =>
                              setParent({
                                ...parent,
                                lastname: event.target.value,
                              })
                            }
                            ref={(node) => {
                              input = node;
                            }}
                            value={parent.lastname}
                            isRequired
                          />
                        </FormControl>
                      </Flex>
                      <Flex gap={5}>
                        <FormControl mt="15px">
                          <FormLabel>Sexe</FormLabel>
                          <Select
                            id="description"
                            type={"text"}
                            name="gender"
                            placeholder="Sexe"
                            onChange={(event) =>
                              setParent({
                                ...parent,
                                gender: event.target.value,
                              })
                            }
                            ref={(node) => {
                              input = node;
                            }}
                            value={parent.gender}
                            isRequired
                          >
                            <option>Masculin</option>
                            <option>Feminin</option>
                          </Select>
                        </FormControl>
                        <FormControl mt="15px">
                          <FormLabel>Enfant</FormLabel>
                          <Input
                            id="description"
                            type={"number"}
                            name="childNumber"
                            placeholder="Description"
                            onChange={(event) =>
                              setParent({
                                ...parent,
                                childNumber: event.target.value,
                              })
                            }
                            ref={(node) => {
                              input = node;
                            }}
                            value={parent.childNumber}
                          />
                        </FormControl>
                      </Flex>
                      <Flex gap={5}>
                        <FormControl mt="15px">
                          <FormLabel>Profession</FormLabel>
                          <Input
                            id="description"
                            type={"text"}
                            name="profession"
                            placeholder=""
                            onChange={(event) =>
                              setParent({
                                ...parent,
                                profession: event.target.value,
                              })
                            }
                            ref={(node) => {
                              input = node;
                            }}
                            value={parent.profession}
                            isRequired
                          />
                        </FormControl>
                        <FormControl mt="15px">
                          <FormLabel>Telephone</FormLabel>
                          <Input
                            id="description"
                            type={"text"}
                            name="phonenumber"
                            placeholder=""
                            onChange={(event) =>
                              setParent({
                                ...parent,
                                phonenumber: event.target.value,
                              })
                            }
                            ref={(node) => {
                              input = node;
                            }}
                            value={parent.phonenumber}
                            isRequired
                          />
                        </FormControl>
                      </Flex>

                      <FormControl mt="15px">
                        <FormLabel>Statut</FormLabel>
                        <Select
                          id="description"
                          type={"text"}
                          name="parentStatus"
                          placeholder="Status"
                          onChange={(event) =>
                            setParent({
                              ...parent,
                              parentStatus: event.target.value,
                            })
                          }
                          ref={(node) => {
                            input = node;
                          }}
                          value={parent.parentStatus}
                          isRequired
                        >
                          <option>Parent</option>
                          <option>Tuteur</option>
                        </Select>
                      </FormControl>
                    </Box>
                  </AlertDialogBody>
                  <AlertDialogFooter>
                    <Button ref={cancelRef} onClick={onClose} colorScheme="red">
                      annuler
                    </Button>
                    {/* <Link href={'/personnel/ajoutercategorypersonnel'}> */}
                    <Button colorScheme="green" ml={3} type="submit">
                      Creer
                    </Button>
                    {/* </Link>  */}
                  </AlertDialogFooter>
                </Box>
              </AlertDialogContent>
            </AlertDialogOverlay>
          </AlertDialog>
        </Box>
      </Box>
    </Center>
  );
};
export default addParents;

import {
  Avatar,
  Box,
  Button,
  ButtonGroup,
  Center,
  Flex,
  Heading,
  Icon,
  AlertDialog,
  AlertDialogBody,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogContent,
  AlertDialogOverlay,
  Text,
  VStack,
  useDisclosure,
  AlertDialogCloseButton
} from "@chakra-ui/react";

import Routes from "../../modules/routes";
import Link from "next/link";
import DefaultLayout from "../../components/layouts/DefaultLayout";
import { FiSearch, FiEdit } from "react-icons/fi";
import { MdDelete } from "react-icons/md";
import { BiDetail } from "react-icons/bi";
import { Formik } from "formik";
import React, { useEffect, useState } from "react";
import { IoIosAdd } from "react-icons/io";
import { Router, useRouter } from "next/router";
import { useMutation, useQuery } from "@apollo/client";
import { GET_ALL_PERSONNELS } from "../../graphql/Queries";
import { DELETE_PERSONNEL } from "../../graphql/Mutation";
// import { GetStaticPaths } from "next/types";

const Employee = (props) => {

  const router = useRouter();
  const cancelRef = React.useRef()
  const {data:dataPersonnel, loading, error} = useQuery(GET_ALL_PERSONNELS)
  const [deletePersonnel] = useMutation(DELETE_PERSONNEL);
  const [personnel, setPersonnel] = useState([]);
  const { isOpen, onToggle, onClose, onOpen } = useDisclosure();
  

  useEffect (() => {
    setPersonnel(dataPersonnel)
    console.log(dataPersonnel) 
}, [dataPersonnel])
 
  if (loading) return <Text>Chargement en cour...</Text>
  if (error) return <Text>Une erreur s'est produite!</Text>

 
  return(
          <Box
            bg={"gray.200"}
            width={"200px"}
            rounded="md"
          > 
              <Center>
                {props.sexe.toLowerCase() === "masculin" ? 
                 <Avatar
                  size="lg"
                  mt={["10px","10px", "10px" ]}
                  src="https://img.freepik.com/vecteurs-premium/profil-avatar-homme-icone-ronde_24640-14044.jpg?w=2000"
                />
             :
                <Avatar
                  size="lg"
                  mt={["10px","10px", "10px" ]}
                  src="https://img.freepik.com/premium-vector/woman-avatar-profile-round-icon_24640-14042.jpg?size=626&ext=jpg"
                /> }
              </Center>
              <Text 
                textAlign="center" 
                fontSize="0.85em" 
                m={["8px", "8px", "8px"]}
              >
                {props.firstName}
              </Text>
              <Text 
                textAlign="center" 
                fontSize="0.85em" 
                m={["8px", "8px", "8px"]}
              >
                {props.lastName}
              </Text>
              <Text 
                textAlign="center"
                fontWeight="bold" 
                fontSize="0.85em"
                mb={"3px"}
              >
                {props.fonction}
              </Text>
              {/* <Text 
                textAlign="center" 
                fontWeight="bold" 
                fontSize="0.85em"
                mb={["7px", "7px", "7px"]}
              >
                {props.situationMatrimonial}
              </Text> */}
              <Flex justify="center" gap="4">
                <Link 
                  href={{
                    pathname: Routes.PersonnelDetails?.path || '',
                    query: {id: props.id}
                  }}
                >
                  {console.log(props.id)}
                  <Icon
                    as={BiDetail}
                    boxSize="40px"
                    p="3"
                    bg="purple.100"
                    rounded="full"
                    _hover={{background:"green.300"}}
                  />
                </Link>
                <Link href="/personnel/modifierpersonnel">
                  <Icon
                    as={FiEdit}
                    boxSize="40px"
                    p="3"
                    bg="blue.100"
                    rounded="full"
                    _hover={{background:"blue.300"}}

                  />
                </Link>
                <Box href="#">
                  <Icon
                    as={MdDelete}
                    boxSize="40px"
                    p="3"
                    bg="red.500"
                    rounded="full"
                    color="white"
                    onClick={onToggle}
                    _hover={{background:"red"}}

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
                            <AlertDialogContent
                            width={"380px"}
                            >
                              <AlertDialogHeader 
                                fontSize='lg' 
                                fontWeight='bold'
                                textAlign={"center"}
                                mt="5px"
                                >
                                Confirmation de suppression
                              </AlertDialogHeader>
                              <AlertDialogCloseButton/>

                              <AlertDialogBody textAlign={"center"}>
                              Voulez-vous supprimer cet Personnel?
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
                                  colorScheme='green' 
                                  onClick={() => {removePersonnel(props.id)}}
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
              </Flex>
            </Box>
  );
};

export default Employee;

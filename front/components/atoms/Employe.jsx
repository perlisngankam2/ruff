import {
  Avatar,
  Box,
  Button,
  ButtonGroup,
  Center,
  Flex,
  Heading,
  Icon,
  Input,
  InputGroup,
  InputRightElement,
  Popover,
  PopoverArrow,
  PopoverBody,
  PopoverCloseButton,
  PopoverContent,
  PopoverFooter,
  Text,
  VStack,
  useDisclosure
} from "@chakra-ui/react";

import Routes from "../../modules/routes";
import Link from "next/link";
import DefaultLayout from "../../components/layouts/DefaultLayout";
import { FiSearch, FiEdit } from "react-icons/fi";
import { MdDelete } from "react-icons/md";
import { BiDetail } from "react-icons/bi";
import { Formik } from "formik";
import { useEffect, useState } from "react";
import { IoIosAdd } from "react-icons/io";
import { Router, useRouter } from "next/router";
import { useMutation, useQuery } from "@apollo/client";
import { GET_ALL_PERSONNELS } from "../../graphql/queries";
import { DELETE_PERSONNEL } from "../../graphql/Mutation";

const Employee = (props) => {

  const router = useRouter();
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

  const removePersonnel = async(id) => {
    await deletePersonnel({
        variables: {id},
        refetchQueries:[{
          query: GET_ALL_PERSONNELS
        }]
    })
    onClose
  }
  return (
         <Box
              bg={"gray.200"}
              width={"200px"}
              rounded="md"
            > 
              <Center>
                <Avatar
                  boxSize="70px"
                  mt={["10px","10px", "10px" ]}
                  src="https://img.freepik.com/vecteurs-premium/profil-avatar-homme-icone-ronde_24640-14044.jpg?w=2000"
                />
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
              >
                {props.fonction}
              </Text>
              <Text 
                textAlign="center" 
                fontWeight="bold" 
                fontSize="0.85em"
                mb={["7px", "7px", "7px"]}
              >
                {props.situationMatrimonial}
              </Text>
              <Flex justify="center" gap="4">
                <Link 
                href={{
                  pathname: Routes.PersonnelDetails.path,
                  query: {id: props.id}
                }}
                >
                  <Icon
                    as={BiDetail}
                    boxSize="40px"
                    p="3"
                    bg="purple.100"
                    rounded="full"
                  />
                </Link>
                <Link href="/personnel/modifierpersonnel">
                  <Icon
                    as={FiEdit}
                    boxSize="40px"
                    p="3"
                    bg="blue.100"
                    rounded="full"
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
                  />
                  <Box> 
                    <Popover
                      returnFocusOnClose={false}
                      isOpen={isOpen}
                      onClose={onClose}
                      closeOnBlur={false}
                      plcement="Center"
                    >
                      <PopoverContent>
                        <PopoverArrow />
                        <PopoverCloseButton />
                        <PopoverBody>
                          <Text 
                          fontSize={"17px"}
                          textAlign={"center"}
                          mt={"5px"}
                          mb={"15px"}
                          fontWeight="bold"
                          > 
                            Confirmation de supression
                          </Text>
                            Voulez-vous supprimer ce personnel?
                        </PopoverBody>
                        <PopoverFooter 
                          display='flex' 
                          justifyContent='flex-end'
                        >
                          <ButtonGroup size='sm'>
                            <Button
                              colorScheme='red' 
                              onClick={onClose}
                            >
                              Non
                            </Button>
                            <Button 
                              colorScheme="green"
                              onClick={() => removePersonnel(props.id)}
                            >
                              Oui
                            </Button>
                          </ButtonGroup>
                        </PopoverFooter>
                      </PopoverContent>
                    </Popover>
                  </Box>
                </Box>
              </Flex>
            </Box>
  );
};

export default Employee;

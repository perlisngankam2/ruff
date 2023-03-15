import { 
    Box, 
    Flex,
    Button,
    ButtonGroup,
    IconButton ,
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
    Link,
    Avatar,
    Icon,
    Heading,
    AlertDialog,
    AlertDialogBody,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogContent,
    AlertDialogOverlay,
    useDisclosure
  } from "@chakra-ui/react";
  
  import { useRouter } from "next/router";
  
  import React, { useEffect, useState } from "react";
  import AddNew from "../../components/atoms/AddNew";
  import StudentBox from "../../components/atoms/StudentBox";
  import DefaultLayout from "../../components/layouts/DefaultLayout";
  import { GET_ALL_STUDY_LEVEL } from "../../graphql/Queries";
  import { useMutation, useQuery } from "@apollo/client";
  import {IoIosAdd} from 'react-icons/io';
  import{ FiEdit} from 'react-icons/fi';
  import {MdDelete} from 'react-icons/md';
  
  
  const levelList = () => {
  
    const {data:dataStudyLevel, loading, error} = useQuery(GET_ALL_STUDY_LEVEL);
    const router = useRouter();
    const cancelRef = React.useRef()
    const { isOpen, onToggle, onClose } = useDisclosure();
    
    useEffect(() =>{
      console.log(dataStudyLevel?.findAllNiveauEtude)
    })
    
    if (loading) return <Text>Chargement en cours...</Text>
    if(error) return <Text>Une erreur s'est produite!</Text>

  
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
              Liste des niveaux
            </Heading>
            <Hide below="sm">
              <Text>Dashboad / Classes / Liste des niveaux</Text>
            </Hide>
          </Flex>
  
          <Flex gap={10} mt={5}>
            <InputGroup>
              <Input
                placeholder="Rechercher un élève..."
                //value={recherche}
                // onChange={e => setQuery(e.target.value)}
              />
            </InputGroup>
            <Select 
              placeholder="Selectionner la classe"
              // onChange={e =>setQuery(e.target.value)}
            >
              {/* {Classes.map((classe) => (
                <option 
                  key={classe.id}
                >{classe.classe}</option>
              ))} */}
            </Select>
            <Box> 
              <Button
                  rightIcon={<Icon as={IoIosAdd} boxSize="20px"/>}
                  onClick={() => router.push("/level/addLevel")}
                >
                  Ajouter un niveau
              </Button>
            </Box> 
          </Flex>
          <Box mt={10}>
             <TableContainer>
                <Table variant='striped'>
                    <Thead>
                    <Tr>
                        <Th>Nom</Th>
                         <Th>Pension</Th>
                        {/* <Th >section</Th> */}
                        <Th >Action</Th>
                    </Tr>
                    </Thead>
                    <Tbody>
                    {dataStudyLevel && ( 
                       dataStudyLevel.findAllNiveauEtude.map((niveauEtude, index) =>(
                        <Tr key={index}>
                          <Td borderColor={'#C6B062'}>{niveauEtude.name}</Td>
                          <Td borderColor={'#C6B062'}>{niveauEtude.montantPension}</Td> 
                          <Td borderColor={'#C6B062'}>
                              <Avatar 
                                  size='xs' 
                                  name='Dan Abrahmov' 
                                  src='https://bit.ly/dan-abramov'
                              /> 
                          </Td>
                          <Td borderColor={'#C6B062'}>
                            <ButtonGroup 
                              size='sm' 
                              isAttached 
                              variant='link' 
                              colorScheme={'teal'}
                              >
                                <Button>
                                  <Link 
                                    href='/eleves/details'
                                  >Details</Link>
                                </Button>
                              </ButtonGroup> 
                            </Td>
                              <Box 
                                display="flex"
                                ml={['-140px', '-140px', '-140px', '-140px']} 
                                 mt={['8px', '8px', '8px', '8px']}
                               >
                                  <Link 
                                  href="/class/updateclass">
                                    <Icon
                                      as={FiEdit}
                                      boxSize="40px"
                                      p="3"
                                      rounded="full"
                                      _hover={{background:"red.100"}}
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
                                      _hover={{background:"blue.100"}}
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
                                              >
                                              Confirmation de suppression
                                            </AlertDialogHeader>
                                            <AlertDialogBody textAlign={"center"}>
                                            Voulez-vous supprimer cet niveau?
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
                                                // onClick={() => removeL(student.id)}
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
                          </Tr>
                    ))
                  )} 
                  </Tbody>
                </Table>
              </TableContainer>
          </Box>
        </Box>
        </Box>
      </DefaultLayout>
    );
  };
  
  export default levelList;
  
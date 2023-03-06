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
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverHeader,
  PopoverBody,
  PopoverFooter,
  PopoverArrow,
  PopoverCloseButton,
  PopoverAnchor,
  useDisclosure
} from "@chakra-ui/react";

import { useRouter } from "next/router";

import { useEffect, useState } from "react";
import AddNew from "../../components/atoms/AddNew";
import StudentBox from "../../components/atoms/StudentBox";
import DefaultLayout from "../../components/layouts/DefaultLayout";
import { GET_ALL_CLASS } from "../../graphql/queries";
import { DELETE_SALLE } from "../../graphql/Mutation";
import { useMutation, useQuery } from "@apollo/client";
import {IoIosAdd} from 'react-icons/io';
import{ FiEdit} from 'react-icons/fi';
import {MdDelete} from 'react-icons/md';


const Class = () => {

  const router = useRouter();
  const { isOpen, onToggle, onClose } = useDisclosure()
  const [deleteClasse] = useMutation(DELETE_SALLE);
  const {data:dataClasse} = useQuery(GET_ALL_CLASS);
  

  const removeClass = async(id) => {
    await deleteClasse({
      variables: {id},
      refetchQueries: [{
        query: GET_ALL_CLASS
      }]
    })
  }

  useEffect(() => {
    console.log(dataClasse?.findAllsalle);
  })
  // const handleClose = () => {
  //   setShow(false)
  // }

  return (
    <DefaultLayout>
      <Box p="10px" pt={"70px"} background="colors.tertiary" w="full">
        <Flex gap={5} flexWrap="wrap">
          <AddNew />

          <StudentBox class="CM2" studentnumber="40" />
          <StudentBox class="SIL" studentnumber="23" />
          <StudentBox class="CP" studentnumber="16" />
          <StudentBox class="CM1" studentnumber="34" />
        </Flex>

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
            Liste des classes
          </Heading>
          <Hide below="sm">
            <Text>Dashboad / Classes / Liste classes</Text>
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
                rightIcon={<Icon as={IoIosAdd} boxSize="20px" />}
                onClick={() => router.push("/class/addclass")}
              >
                Ajouter une classe
            </Button>
          </Box> 
        </Flex>
        <Box mt={10}>
           <TableContainer>
              <Table variant='striped'>
                  <Thead>
                  <Tr>
                      <Th>Nom</Th>
                      <Th>Montant pension</Th>
                      {/* <Th >section</Th>  */}
                      <Th >Action</Th>
                  </Tr>
                  </Thead>
                  <Tbody>
                  {dataClasse && ( 
                     dataClasse.findAllsalle.map((salle, index) =>(
                      <Tr key={index}>
                        <Td borderColor={'#C6B062'}>{salle.name}</Td>
                        <Td borderColor={'#C6B062'}>{salle.montantPensionSalle}</Td>
                        {/* <Td borderColor={'#C6B062'}>{salle.section}</Td> */}
                        {/* <Td borderColor={'#C6B062'}>{salle.montantPension}</Td> */}

                        {/* <Td borderColor={'#C6B062'}>
                            <Avatar 
                                size='xs' 
                                name='Dan Abrahmov' 
                                src='https://bit.ly/dan-abramov'
                            /> 
                        </Td> */}
                        
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
                                      <Popover
                                        returnFocusOnClose={false}
                                        isOpen={isOpen}
                                        onClose={onClose}
                                        closeOnBlur={false}
                                        plcement="bottom"
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
                                            Voulez-vous supprimer cet element?
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
                                                onClick={() => {removeClass(salle.id),
                                                onClose}
                                                }
                                              >
                                                Oui
                                              </Button>
                                            </ButtonGroup>
                                          </PopoverFooter>
                                        </PopoverContent>
                                      </Popover>
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

export default Class;

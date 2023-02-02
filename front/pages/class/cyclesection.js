import { AddIcon, SearchIcon } from "@chakra-ui/icons";
import {
  Box,
  Button,
  ButtonGroup,
  IconButton ,
  Center,
  Flex,
  Heading,
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
  Icon,
  AlertDialogFooter,
  AlertDialogBody,
  AlertDialog,
  useDisclosure,
  AlertDialogContent,
  AlertDialogOverlay,
  AlertDialogHeader,
  FormControl,
  FormLabel
} from "@chakra-ui/react";

import DefaultLayout from "../../components/layouts/DefaultLayout";
import React, { useEffect, useState } from "react";
import { IoIosAdd } from "react-icons/io";
import { Router, useRouter } from "next/router";
import {FiEdit} from 'react-icons/fi';
import {MdDelete} from 'react-icons/md';
import { GET_ALL_SECTION, GET_ONE_CYCLE } from "../../graphql/Queries";
import { GET_ALL_CYCLE } from "../../graphql/Queries";
import { DELETE_SECTION, DELETE_CYCLE, UPDATE_CYCLE} from "../../graphql/Mutation";
import {UpdateCycle} from './updatecycle';
import { useMutation, useQuery } from "@apollo/client"; 
import SectionCreate from "./SectionCreate";
import CycleCreate from "./CycleCreate";


const cyclesection = () => {

    // const router = useRouter();
    const [query , setQuery] = useState("");
    const [cycle, setCycle] = useState();
    const [name, setName] = useState("");
    const[section, setSection] = useState("");
    // const search = (data) => {
       typeof id
    //   let datas = data.filter((item) => keys.some((key) => (
    //     item[key].toUpperCase().includes(query) 
    //     )
    //   ));
    //   console.log("datas :" , datas)
    //   return query ? datas.slice(0,5) : Users.slice(0,5)
    // };
   
    const {data} = useQuery(GET_ALL_SECTION);
    const{data:dataCycle} = useQuery(GET_ALL_CYCLE);
    const [deleteSection ]= useMutation(DELETE_SECTION);
    const [deleteCycle] = useMutation(DELETE_CYCLE);
    const{ data:dataDetailsCycle} = useQuery(GET_ONE_CYCLE);
    const [editCycle] = useMutation(UPDATE_CYCLE);

    const { isOpen:isOpens, onOpen:onOpenns, onClose } = useDisclosure();
    const cancelRef = React.useRef();

     useEffect (() => {
      console.log(data?.findAllsection);
      setSection(data);
      console.log(dataCycle?.findAllcycle)
      console.log("hh")
    });

    const removeSection = async (id) => {
      await deleteSection({
        variables: {
          id
        },
        refetchQueries:[{
          query: GET_ALL_SECTION
        }]

      })
    }

    const removeCycle = async (id) => {
      await deleteCycle({
        variables: {id},
        refetchQueries: [{
          query: GET_ALL_CYCLE
        }]
      })
    } 

    const updateCycle = async(cycle) => {
      console.log("bb")
       
      await editCycle({
        variables:{
          Id: cycle.id,
          input:{ 
          name: name,
          section: section
          }
        }
      })
    }

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
            Cycle et section
          </Heading>
          <Hide below="sm">
            <Text>Dashboad / classe/Cycle & section</Text>
          </Hide>
        </Flex>
        <Flex gap={10} mt={5}>
          <InputGroup>
            <Input
              placeholder="Recherchez une categorie..."
              //value={recherche}
              onChange={e => setQuery(e.target.value)}
            />
            <InputRightAddon children={<SearchIcon />} />
          </InputGroup>
          {/* <Select 
            placeholder="Selectionner la classe"
            onChange={e =>setQuery(e.target.value)}
          >
          </Select> */}
          <SectionCreate/>
        </Flex>
        <Box mt={10}>
          <Box> 
            <Heading 
               mb={5}
              size="lg"
              textAlign={"center"}
              color = "colors.quinzaine"
              >
                Sections
            </Heading>
          </Box>
            <TableContainer>
                <Table variant='striped'>
                    <Thead>
                    <Tr>
                        <Th>Nom</Th>
                        <Th>Description</Th>
                        <Th>Actions</Th>
                    </Tr>
                    </Thead>
                      {data && ( 
                    <Tbody>
                      {
                        data.findAllsection.map((section, index) => ( 
                          <Tr key={index}>
                              <Td  borderColor={'#C6B062'}>{section.name}</Td>
                              <Td  borderColor={'#C6B062'}>{section.description}</Td>
                              <Td  borderColor={'#C6B062'}>
                              <Box display="flex">
                                <Link 
                                  href="/eleves/modifiereleve">
                                    <Icon
                                    as={FiEdit}
                                    boxSize="40px"
                                    p="3"
                                    // bg="blue.100"
                                    rounded="full"
                                  _hover={{background:"red.100"}}
                                    />
                                </Link>
                                <Box href="#" mt="-3px"
                                    onClick={() => removeSection(section.id)}
                                >
                                  <Icon
                                    as={MdDelete}
                                    boxSize="44px"
                                    p="3"
                                    rounded="full"
                                    color="colors.quaternary"
                                    _hover={{background:"blue.100"}}

                                  />
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
        <Box mt={50}>
          <Box> 
              <Heading 
              mt={2}
                size="lg"
                textAlign={"center"}
                color = "colors.quinzaine"
                >
                  Cycles
              </Heading>
          </Box>
          <CycleCreate/>
            <TableContainer>
                <Table variant='striped'>
                    <Thead>
                    <Tr>
                        <Th>Nom</Th>
                        <Th>Setion</Th>
                        <Th>Actions</Th>
                    </Tr>
                    </Thead>
                      {dataCycle && ( 
                    <Tbody>
                      {
                        dataCycle.findAllcycle.map((cycle, index) => ( 
                          <Tr key={index}>
                              <Td  borderColor={'#C6B062'}>{cycle.name}</Td>
                              <Td  borderColor={'#C6B062'}>{cycle.section}</Td>
                              <Td  borderColor={'#C6B062'}>
                              <Box display="flex">
                                <Icon
                                  as={FiEdit}
                                  boxSize="40px"
                                  p="3"
                                  // bg="blue.100"
                                  rounded="full"
                                  onClick={onOpenns}
                                  _hover={{background:"red.100"}}
                                />
                                <Icon
                                  as={MdDelete}
                                  boxSize="44px"
                                  p="3"
                                  rounded="full"
                                  color="colors.quaternary"
                                  onClick={() => removeCycle(cycle.id)}
                                  _hover={{background:"blue.100"}}
                                  />
                                  <Box as={"form"} onSubmit={updateCycle}> 
                                    <AlertDialog
                                      isOpen={isOpens}
                                      leastDestructiveRef={cancelRef}
                                      onClose={onClose}
                                      size='xl'
                                    >
                                      <AlertDialogOverlay>
                                          <AlertDialogContent>
                                              <AlertDialogHeader 
                                                  fontSize='sm' 
                                                  fontWeight='base' 
                                                  mt='0'
                                              >
                                                <Box>
                                                  <Heading 
                                                      textAlign={'center'} 
                                                      fontSize={['15px','20px','26px']} 
                                                      p='2' 
                                                  >
                                                      Modifier le cycle
                                                  </Heading>
                                                </Box>
                                              </AlertDialogHeader>
                                              <AlertDialogBody>
                                              <Box>
                                                <FormControl>
                                                    <FormLabel>Nom</FormLabel>
                                                  <Input 
                                                      id="name"
                                                      type={'text'} 
                                                      name="name"
                                                      placeholder="nom"
                                                      onChange = {(event) => setName(event.target.value)}
                                                      value={cycle.name}
                                                  />
                                                </FormControl>
                                                <FormControl mt="15px">
                                                    <FormLabel>Section</FormLabel>
                                                    <Select 
                                                        id="section"
                                                        name="section"
                                                        placeholder="Section"
                                                        onChange = {(event) => setSection(event.target.value)}
                                                        value={cycle.section}
                                                    >
                                                        {data &&(
                                                            data.findAllsection.map((section, index) => ( 
                                                                <option key={index}>
                                                                    <option>{section.name}</option>
                                                                </option>
                                                            ))
                                                        )}
                                                    </Select>
                                                </FormControl>
                                              </Box>
                                              </AlertDialogBody>
                                              <AlertDialogFooter>
                                                <Button 
                                                    ref={cancelRef} 
                                                    onClick={onClose} 
                                                    colorScheme='red' 
                                                >
                                                    annuler 
                                                </Button>
                                                  {/* <Link href={'/personnel/ajoutercategorypersonnel'}> */}
                                                  <Button 
                                                    colorScheme='green'  
                                                    ml={3}
                                                    // onClick={addCycle}
                                                  >
                                                    Enregistrer
                                                  </Button>
                                                  {/* </Link>  */}
                                              </AlertDialogFooter>
                                          </AlertDialogContent>
                                      </AlertDialogOverlay>
                                  </AlertDialog>
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
      </Box>
    </DefaultLayout>
  );
};

export default cyclesection;

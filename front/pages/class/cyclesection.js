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
  FormLabel,
  InputRightElement
} from "@chakra-ui/react";

import DefaultLayout from "../../components/layouts/DefaultLayout";
import React, { useEffect, useState, useContext } from "react";
import { IoIosAdd } from "react-icons/io";
import { Router, useRouter } from "next/router";
import {FiEdit, FiSearch} from 'react-icons/fi';
import {MdDelete} from 'react-icons/md';
import { 
  GET_ALL_SECTION,
  GET_ONE_SECTION, 
  GET_ONE_CYCLE, 
  GET_ALL_CYCLE 
} from "../../graphql/Queries";
import { 
  DELETE_SECTION, 
  DELETE_CYCLE, 
  UPDATE_CYCLE, 
  CREATE_CYCLE
} from "../../graphql/Mutation";
import {UpdateCycle} from './updatecycle';
import { useMutation, useQuery } from "@apollo/client"; 
import SectionCreate from "./SectionCreate";
import CycleCreate from "./CycleCreate";
import ReactPaginate from "react-paginate";
import Routes from "../../modules/routes";
import { GlobalContext } from "../../contexts/cyclesection/AppContext";


const cyclesection = () => {

    // const router = useRouter();
    const [query , setQuery] = useState("");
    const [cycle, setCycle] = useState();
    const [name, setName] = useState("");
    const [section, setSection] = useState("");
    // const search = (data) => {
    //   let datas = data.filter((item) => keys.some((key) => (
    //     item[key].toUpperCase().includes(query) 
    //     )
    //   ));
    //   console.log("datas :" , datas)
    //   return query ? datas.slice(0,5) : Users.slice(0,5)
    // };
   
    const {data} = useQuery(GET_ALL_SECTION);
    const {data:dataCycle} = useQuery(GET_ALL_CYCLE);
    const [id, setId] = useState(null)
    const [deleteSection ]= useMutation(DELETE_SECTION);
    const [deleteCycle] = useMutation(DELETE_CYCLE);
    const{ data:dataDetailsCycle} = useQuery(GET_ONE_CYCLE);
    const [editCycle] = useMutation(UPDATE_CYCLE);
    const [createCycle, {error}] = useMutation(CREATE_CYCLE);
    const { isOpen, onOpen, onClose, onToggle} = useDisclosure();
    const { isOpen:isOpennns, onOpen:onOpennns, onClose:onClossses, onToggle:onToggles} = useDisclosure();

    const [isformOpen, setIsFormOpen] = useState(false)
    const cancelRef = React.useRef();
    const router = useRouter();
    const [pageNumber, setPageNumber] = useState(0);
    const usersPerPage = 10;
    const pagesVisited = pageNumber * usersPerPage;

    const removeSection = async (id) => {
      await deleteSection({
        variables: {
          id
        },
        refetchQueries:[{
          query: GET_ALL_SECTION
        }]
      })
      onClossses();
    }

    const displayUsers = data?.findAllsection.slice(pagesVisited, pagesVisited + usersPerPage)
    .map((section, index) => ( 
      <Tr key={index}>
          <Td p={0} pl={6}>{section.name}</Td>
          <Td p={0} pl={6}>{section.description}</Td>
          <Td p={0} pl={3}>
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
            >
              <Icon
                as={MdDelete}
                boxSize="44px"
                p="3"
                rounded="full"
                color="colors.quaternary"
                _hover={{background:"blue.100"}}
                onClick={onOpennns}
              />
              <Box> 
                <AlertDialog
                  isOpen={isOpennns}
                  leastDestructiveRef={cancelRef}
                  onClose={onClossses}
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
                        Voulez-vous supprimer cette cette section?
                        </AlertDialogBody>

                        <AlertDialogFooter>
                          <Button 
                            ref={cancelRef} 
                            onClick={onClossses}
                            colorScheme="red"
                          >
                            Annuler 
                          </Button>
                          <Button 
                            colorScheme='green' 
                            onClick={() => removeSection(section.id)}
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
          </Td>
      </Tr>
    ))

    const pageCount = Math.ceil(data?.findAllsection.length / usersPerPage);

    const changePage = ({ selected }) => {
      setPageNumber(selected);
    };
    // const cycleContext = useContext(GlobalContext);


  //  const defaultValues = useMemo(() =>{
  //     name =  "",
  //     section = ""
  // })

    useEffect (() => {
      console.log(data?.findAllsection);
      setSection(data);
      console.log(dataCycle?.findAllcycle) 
      console.log("hh")
    });

    const removeCycle = async (id) => {
      await deleteCycle({
        variables: {id},
        refetchQueries: [{
          query: GET_ALL_CYCLE
        }]
      })
      onClose();
    } 

  
  // const updateCycle = async(value) => {
  //       await editCycle({
  //         variables:{
  //           cycleId: cycle.id,
  //           input : {
  //             name: value.name,
  //             section: value.section
  //           }
  //         }
  //       });
  // };

    const handleShowUpdateCycle = (cycle) => {
      // setId(cycle.id)
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
          <InputGroup  width="500px">
          {/* <InputRightElement
              children={<Icon as={FiSearch} />}
              cursor="pointer"
            /> */}
             <InputRightElement
              children={<Icon as={FiSearch} />}
              cursor="pointer"
            />
            <Input
              placeholder="Recherchez une section..."
              //value={recherche}
              variant="flushed"
              onChange={e => setQuery(e.target.value)}
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
          <Box mb={5}>
          <TableContainer
            border={"1px"} 
            rounded={"md"}
          >
            <Table 
              variant='striped' 
              colorScheme={"white"}
              bg={"white"}
            >
                <Thead background="colors.secondary">
                <Tr>
                    <Th>Nom</Th>
                    <Th>Description</Th>
                    <Th>Actions</Th>
                </Tr>
                </Thead>
                  {/* {data && (  */}
                <Tbody>
                  {displayUsers}
                  
                  {/* { */}
                    {/* data.findAllsection.map((section, index) => ( 
                      <Tr key={index}>
                          <Td  borderColor={'#C6B062'}>{section.name}</Td>
                          <Td  borderColor={'#C6B062'}>{section.description}</Td>
                          <Td  borderColor={'#C6B062'}>
                          <Box display="flex">
                            <Link 
                              href="#">
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
                            >
                              <Icon
                                as={MdDelete}
                                boxSize="44px"
                                p="3"
                                rounded="full"
                                color="colors.quaternary"
                                _hover={{background:"blue.100"}}
                                onClick={onToggles}
                              />
                              <Box> 
                                <AlertDialog
                                  isOpen={isOpennns}
                                  leastDestructiveRef={cancelRef}
                                  onClose={onClossses}
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
                                        Voulez-vous supprimer cette ce cycle?
                                        </AlertDialogBody>

                                        <AlertDialogFooter>
                                          <Button 
                                            ref={cancelRef} 
                                            onClick={onClossses}
                                            colorScheme="red"
                                          >
                                            Annuler 
                                          </Button>
                                          <Button 
                                            colorScheme='green' 
                                            onClick={() => removeSection(section.id)}
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
                          </Td>
                      </Tr> */}
                    {/* ))} */}
                </Tbody>
                  {/* )} */}
            </Table>
        </TableContainer> 
      </Box>
    <ReactPaginate 
      previousLabel={"<<"}
      nextLabel={">>"}
      pageCount={pageCount}
      onPageChange={changePage}
      containerClassName={"paginationBttns"}
      previousLinkClassName={"previousBttn"}
      nextLinkClassName={"nextBttn"}
      disabledClassName={"paginationDisabled"}
      activeClassName={"paginationActive"}
    />
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
      <CycleCreate
        // defaultValues={defaultValues}
        // {...onSubmit ? updateCycle: addCycle}
        // update={true}
      />
        <TableContainer
          border={"1px"} 
          rounded={"md"}
        >
            <Table 
              variant='striped' 
              colorScheme={"white"}
              bg={"white"}
            >
                <Thead background="colors.secondary">
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
                          <Td p={0} pl={6}>{cycle.name}</Td>
                          {/* <Td  borderColor={'#C6B062'}>{cycle.section_id}</Td> */}
                          <Td p={0} pl={6}>pppp</Td>
                          <Td p={0} pl={3}>
                          <Box display="flex">
                            <Icon
                              as={FiEdit}
                              boxSize="40px"
                              p="3"
                              // bg="blue.100"
                              rounded="full"
                              onClick={onOpen}
                              _hover={{background:"red.100"}}
                            />
                            <Icon
                              as={MdDelete}
                              boxSize="44px"
                              p="3"
                              rounded="full"
                              color="colors.quaternary"
                              _hover={{background:"blue.100"}}
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
                                        Voulez-vous supprimer cette ce cycle?
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
                                            onClick={() => removeCycle(cycle.id)}
                                            ml={3}
                                          >
                                            Supprimer
                                          </Button>
                                        </AlertDialogFooter>
                                      </AlertDialogContent>
                                    </AlertDialogOverlay>
                                </AlertDialog>
                              </Box>
                              {/* <Box as={"form"}  
                                // onSubmit={updateCycle}
                              >  
                                <AlertDialog
                                  isOpen={isOpen}
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
                                          <Box> */}
                                            {/* <FormControl>
                                                <FormLabel>Nom</FormLabel>
                                              <Input 
                                                  id="name"
                                                  type={'text'} 
                                                  name="name"
                                                  placeholder="nom"
                                                  onChange = {() => setName("")}
                                                  value={cycle.name}
                                              />
                                            </FormControl>
                                            <FormControl mt="15px">
                                                <FormLabel>Section</FormLabel>
                                                <Select 
                                                    id="section"
                                                    name="section"
                                                    placeholder="Section"
                                                    onChange = {() => setSection("")}
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
                                          </AlertDialogBody> */}
                                          {/* <AlertDialogFooter>
                                            <Button 
                                                ref={cancelRef} 
                                                onClick={onClose} 
                                                colorScheme='red' 
                                            >
                                                annuler 
                                            </Button>
                                              <Link href={'/personnel/ajoutercategorypersonnel'}> 
                                                <Button 
                                                colorScheme='green'  
                                                ml={3}
                                                onClick={updateCycle}
                                              >
                                                Enregistrer
                                              </Button>
                                              </Link>  
                                            </AlertDialogFooter>
                                      </AlertDialogContent>
                                  </AlertDialogOverlay>
                              </AlertDialog>  
                              </Box>   */}
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

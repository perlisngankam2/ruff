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
    InputRightElement
  } from "@chakra-ui/react";
  
  import { useRouter } from "next/router";
  import Link  from "next/link";
  import React, { useEffect, useState } from "react";
  import AddNew from "../../components/atoms/AddNew";
  import StudentBox from "../../components/atoms/StudentBox";
  import DefaultLayout from "../../components/layouts/DefaultLayout";
  import { GET_ALL_STUDY_LEVEL } from "../../graphql/Queries";
  import  {DELETE_STUDY_LEVEL} from '../../graphql/Mutation'
  import { useMutation, useQuery } from "@apollo/client";
  import {IoIosAdd} from 'react-icons/io';
  import{ FiEdit, FiSearch} from 'react-icons/fi';
  import {MdDelete} from 'react-icons/md';
  import ReactPaginate from "react-paginate";
  import Routes from "../../modules/routes";
  
  const levelList = () => {
  
    const {data:dataStudyLevel, loading, error} = useQuery(GET_ALL_STUDY_LEVEL);
    const router = useRouter();
    const cancelRef = React.useRef()
    const { isOpen, onToggle, onClose } = useDisclosure();
    const [searchStudyLevel, setSearchStudyLevel] = useState("");
    const itemsPerPage = 2
    const [pageNumber, setPageNumber] = useState(0);
    const pagesVisited = pageNumber * itemsPerPage;

    const [deleteStudyLevel] = useMutation(DELETE_STUDY_LEVEL)

    const removeStudyLevel = async(id) =>{
        deleteStudyLevel({
          variables:{id},
          refetchQueries: [{
            query: GET_ALL_STUDY_LEVEL
          }]
       })
       onClose()
    }

    useEffect(() =>{
      console.log(dataStudyLevel?.findAllNiveauEtude)
    })
    
    if (loading) return <Text>Chargement en cours...</Text>
    if(error) return <Text>Une erreur s'est produite!</Text>

    const handleChange = (e) => {
      setSearchStudyLevel(e.target.value);
    };

    const pageCountStudyLevel = Math.ceil(dataStudyLevel?.findAllNiveauEtude.length / itemsPerPage);

    const changePage = ({ selected }) => {
      setPageNumber(selected);
    };
    return (
      <DefaultLayout>
        <Box 
          p="10px" 
          pt={"70px"} 
          background="colors.tertiary" 
          w="full"
        >
  
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
            <Select 
              variant="flushed"
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
             <TableContainer  
                border={"1px"} 
                rounded={"md"}
                bg={"white"}
              >
                <Table 
                  variant='striped'
                  bg={"white"}
                  colorScheme={"white"}
                >
                    <Thead background="colors.secondary">
                      <Tr>
                        <Th>Nom</Th>
                        <Th>Pension</Th>
                        {/* <Th >section</Th> */}
                        <Th>Action</Th>
                      </Tr>
                    </Thead>
                    <Tbody>
                    {dataStudyLevel && ( 
                       dataStudyLevel.findAllNiveauEtude
                       .slice(pagesVisited, pagesVisited + itemsPerPage)
                       .filter((niveauEtude) =>{
                          if(searchStudyLevel == ""){
                            return niveauEtude;
                          }else if (niveauEtude.name.toLowerCase().includes(searchStudyLevel.toLowerCase())
                          // niveauEtude.montantPension.includes(searchStudyLevel)
                          )
                          return niveauEtude;
                        })
                       .map((niveauEtude, index) =>(
                        <Tr key={index}>
                          <Td 
                            p={0} 
                            pl={6}
                          >
                            {niveauEtude.name}({niveauEtude.cyclename})
                          </Td>
                          <Td 
                            p={0} 
                            pl={6}
                          >
                            {niveauEtude.montantPension}
                          </Td> 
                          <Td p={0} >
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
                            </Td>
                              <Box 
                                display="flex"
                                ml={['-140px', '-140px', '-140px', '-140px']} 
                                 mt={['8px', '8px', '8px', '8px']}
                               >
                                  <Link 
                                    href= {{
                                      pathname: Routes.levelEdit?.path || '',
                                      query: {id: niveauEtude.id}
                                    }}>
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
                                                onClick={() => removeStudyLevel(niveauEtude.id)}
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
  
  export default levelList;
  
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
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverHeader,
  PopoverBody,
  PopoverFooter,
  PopoverArrow,
  PopoverCloseButton,
  PopoverAnchor,
  useDisclosure,
  AlertDialog,
  AlertDialogOverlay,
  AlertDialogContent,
  AlertDialogBody,
  AlertDialogFooter,
  FormControl,
  FormLabel,
  useToast,
  AlertDialogHeader,
  InputRightElement
  
} from "@chakra-ui/react";

// import {Link} from "next"
import { useRouter } from "next/router";
import React, { use, useEffect, useState } from "react";
import { FiSearch, FiEdit } from "react-icons/fi";
import AddNew from "../../components/atoms/AddNew";
import StudentBox from "../../components/atoms/StudentBox";
import DefaultLayout from "../../components/layouts/DefaultLayout";
import { 
  GET_ALL_CLASS,
  GET_ALL_PERSONNELS,
  GET_ALL_ANNEE_ACADEMIQUE,
  GET_ALL_COURSES,
  GET_ALL_PERSONNEL_SALLE,
  GET_ALL_COURSE_PERSONNEL_SALLE
} from "../../graphql/Queries";
import { 
  DELETE_SALLE,
  CREATE_PERSONNEL_SALLE,
  CREATE_MONTANT_SCOLARITE_CLASS
 } from "../../graphql/Mutation";
import { useMutation, useQuery } from "@apollo/client";
import {IoIosAdd} from 'react-icons/io';
import {MdDelete} from 'react-icons/md';
import ReactPaginate from "react-paginate";
import Link  from "next/link"
import Routes from "../../modules/routes";

const Class = () => {

  const router = useRouter();
  const cancelRef = React.useRef()
  const toast = useToast();
  const { isOpen, onToggle, onClose, onOpen } = useDisclosure();
  const { isOpen:isOpenn, onClose:onClosse, onOpen:onOpenn } = useDisclosure();
  const { isOpen:isOpennes, onClose:onClosses, onOpen:onOpennes } = useDisclosure();
  const [salleId, setSalleId] = useState("");
  const [personnelId, setPersonnelId] = useState("");
  const [anneeAcademiqueId, setAnneeAcademiqueId] = useState("");
  const [courseId, setCourseId] = useState("");
  const [montantPension, setMontantPension] = useState();
  const itemsPerPage = 15;
  const [pageNumber, setPageNumber] = useState(0);
  const pagesVisited = pageNumber * itemsPerPage;

  const [deleteClasse] = useMutation(DELETE_SALLE);
  const {data:dataClasse} = useQuery(GET_ALL_CLASS);
  const {data:dataEnseignant} = useQuery(GET_ALL_PERSONNELS);
  const {data:dataAnneeAcademique} = useQuery(GET_ALL_ANNEE_ACADEMIQUE);
  const {data:dataCourse} = useQuery(GET_ALL_COURSES);
  const {data:dataCoursePersonnelSalle} = useQuery(GET_ALL_COURSE_PERSONNEL_SALLE);
  const [createPersonnelSalle] = useMutation(CREATE_PERSONNEL_SALLE);
  const [createMonantPensionClasse] = useMutation(CREATE_MONTANT_SCOLARITE_CLASS);

  const removeClass = async(id) => {
    await deleteClasse({
      variables: {id},
      refetchQueries: [{
        query: GET_ALL_CLASS
      }]
    })
    onClose();
  }

  useEffect(() => {
    console.log(dataClasse?.findAllsalle);
    console.log(dataCoursePersonnelSalle?.findbyCoursePersonnelSalle);
  })
  // const handleClose = () => {
  //   setShow(false)
  // }

  const addPersonnelSalle = async () => {
    await createPersonnelSalle({
      variables:{
        input:{ 
        salleId: salleId,
        personnelId: personnelId,
        courseId: courseId
        }
      }
    })
    onClosse();
    toast({
      title: "Affection du personnel a la salle.",
      description: "Affecte avec succes.",
      status: "success",
      duration: 3000,
      isClosable: true,
    });
    setPersonnelId("")
    setSalleId("")
  }

  const AddMontantPensionClasse = async () =>{
    await createMonantPensionClasse({
      variables:{
        pension:{
          salleId: salleId,
          anneeAcademiqueId: anneeAcademiqueId,
          montantPension: parseInt(montantPension)
        }

      }
    })
      onClosses();
        // console.log(sectionData)
      toast({
          title: "Affection du montqnt de scolarite a une classe.",
          description: "Qffection reussit.",
          status: "success",
          duration: 3000,
          isClosable: true,
      });
      // router.push("/class/cyclesection")
    setSalleId("");
    setAnneeAcademiqueId("");
    setMontantPension("");
  }

  const pageCountSalle = Math.ceil(dataClasse?.findAllsalle.length / itemsPerPage);

  const changePage = ({ page }) => {
    setPageNumber(page);
  };
  
  return (
    <DefaultLayout>
      <Box background="colors.tertiary" w="full">
        {/* <Flex gap={5} flexWrap="wrap">
          <AddNew />
          <StudentBox class="CM2" studentnumber="40" />
          <StudentBox class="SIL" studentnumber="23" />
          <StudentBox class="CP" studentnumber="16" />
          <StudentBox class="CM1" studentnumber="34" />
        </Flex> */}
      <Box p="3" pt={"70px"} w="full">
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

        <Flex 
          gap={10} 
          mt={7} 
          maxWidth={"1300px"}
        >
          <InputGroup width="500px">
            <InputRightElement
              children={<Icon as={FiSearch} />}
              cursor="pointer"
            />
            <Input
              placeholder="Recherchez une classe..."
              variant="flushed"
              borderBottom={"1px"}
              //value={recherche}
              // onChange={e => setQuery(e.target.value)}
            />
          </InputGroup>
          <Select 
           width={"500px"}
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
                rightIcon={<Icon as={IoIosAdd} boxSize="20px" />}
                onClick={() => router.push("/class/addclass")}
              >
                Ajouter une classe
            </Button>
          </Box> 
        </Flex>

        {/* FORMULAIRE D'AFFECTATION D'UN PROFESSEUR A UNE CLASSE */}
        <Box> 
            <Flex 
              direction={["column", "column", "column"]}
              mt={"15px"}
              flexWrap={["wrap", "wrap", "wrap"]}
              pl={["500px", "100px", "200px", "1050px"]}
            > 
              <Flex gap={1}> 
                <Text 
                  mb={5}
                  fontSize="14px"
                  color = "colors.quinzaine"
                  >
                  Affecter un enseignant
                </Text>
                <Icon 
                  as={IoIosAdd} 
                  boxSize="30px"
                  color={"colors.greencolor"}
                  rounded="full"
                  // ml={["5px", "5px", "5px" ]}
                  mt={["-3px"]}
                  _hover={{background:"colors.bluecolor"}}
                  onClick={onOpenn}
                  />
              </Flex>
              <Flex > 
                <Text 
                  mb={5}
                  fontSize="14px"
                  color = "colors.quinzaine"
                >
                  Fixer une pension
                </Text>
                <Icon 
                  as={IoIosAdd} 
                  boxSize="30px"
                  color={"colors.greencolor"}
                  rounded="full"
                  // ml={["5px", "5px", "5px" ]}
                  mt={["-3px"]}
                  _hover={{background:"colors.bluecolor"}}
                  onClick={onOpennes}
                  />
              </Flex>
            </Flex>
          <AlertDialog
            isOpen={isOpenn}
            leastDestructiveRef={cancelRef}
            onClose={onClosse}
            size='xl'
          >
            <AlertDialogOverlay>
              <AlertDialogContent  width={"400px"}>
                <Box mt={"20px"}> 
                    <Heading 
                      textAlign="center"
                      size="md"
                    >
                      Affectez un enseignant a une classe
                    </Heading>
                    <AlertDialogBody>
                      <Box mt='4'>
                        <FormControl mt="5px">
                          <FormLabel>classe</FormLabel>
                          <Select
                            name="salleId"
                            placeholder="classe"
                            value={salleId}
                            onChange={(event)=> setSalleId(event.target.value)}
                          >
                            {dataClasse && 
                              dataClasse.findAllsalle.map((salle, index) =>(
                                <option value={salle?.id}>
                                  {salle.name}
                                </option>
                              ))

                            }
                          </Select>
                        </FormControl>
                        <FormControl mt={"10px"}>
                            <FormLabel>Enseigant</FormLabel>
                          <Select
                            // type="text"
                            name="personnelId"
                            value={personnelId}
                            onChange={(event)=> setPersonnelId(event.target.value)}

                            // isDisabled
                            placeholder="enseignant"
                          >
                            {dataEnseignant &&
                              dataEnseignant?.findAllpersonnel.map((personnel, index) =>(
                                <option value={personnel?.id} key={index}>
                                  {personnel.firstName} 
                                </option>
                              ))
                            }
                          </Select>
                        </FormControl>
                        <FormControl mt={"10px"}>
                            <FormLabel>Enseigant</FormLabel>
                          <Select
                            name="courseId"
                            value={courseId}
                            onChange={(event)=> setCourseId(event.target.value)}
                            placeholder="Matiere"
                          >
                            {dataCourse &&
                              dataCourse?.findAllCourse.map((course, index) =>(
                                <option value={course?.id} key={index}>
                                  {course.title} 
                                </option>
                              ))
                            }
                          </Select>
                        </FormControl>
                      </Box>
                    </AlertDialogBody>
                  <AlertDialogFooter>
                    <Button 
                      ref={cancelRef} 
                      onClick={onClosse} 
                      colorScheme='red' 
                    >
                      annuler
                    </Button>
                  <Links href={'#'}>
                      <Button 
                        colorScheme='green'  
                        ml={3}
                        onClick={addPersonnelSalle}
                      >
                        Affectez  
                    </Button>
                    </Links> 
                  </AlertDialogFooter>
                </Box>
              </AlertDialogContent>
            </AlertDialogOverlay>
          </AlertDialog>
        </Box>

{/* FORMULAIRE D'AFFECTATION DE LA PENSION POUR UNE ANNEE ACADEMIQUE */}

    <Box>
      <AlertDialog
        isOpen={isOpennes}
        leastDestructiveRef={cancelRef}
        onClose={onClosses}
        size='xl'
      >
        <AlertDialogOverlay>
          <AlertDialogContent  width={"400px"}>
            <Box mt={"20px"}> 
                <Heading 
                  textAlign="center"
                  size="md"
                >
                  Ajoutez une pension
                </Heading>
                <AlertDialogBody>
                  <Box mt='4'>
                    <FormControl mt="5px">
                      <FormLabel>classe</FormLabel>
                      <Select
                        name="salleId"
                        placeholder="classe"
                        value={salleId}
                        onChange={(event)=> setSalleId(event.target.value)}
                      >
                        {dataClasse && 
                          dataClasse.findAllsalle.map((salle, index) =>(
                            <option value={salle?.id}>
                              {salle.name}
                            </option>
                          ))
                        }
                      </Select>
                    </FormControl>
                    <FormControl mt={"10px"}>
                        <FormLabel>Montant scolarite</FormLabel>
                      <Input
                        // type="text"
                        name="montantPension"
                        value={montantPension}
                        onChange={(event)=> setMontantPension(event.target.value)}
                        // isDisabled
                        placeholder="Montant de la scolarite"
                      />
                    </FormControl>
                    <FormControl mt={"10px"}>
                        <FormLabel>Annee academique</FormLabel>
                      <Select
                        // type="text"
                        name="anneeAcademiqueId"
                        value={anneeAcademiqueId}
                        onChange={(event)=> setAnneeAcademiqueId(event.target.value)}

                        // isDisabled
                        placeholder="Annee academique"
                      >
                        {dataAnneeAcademique &&
                            dataAnneeAcademique.findAllAnnerAccademique.map((anneeAcademique, index) => (
                              <option value={anneeAcademique.id} key={index}>
                                {anneeAcademique.name}
                              </option>
                            ))
                          }
                      </Select>
                    </FormControl>
                  </Box>
                </AlertDialogBody>
              <AlertDialogFooter>
                <Button 
                  ref={cancelRef} 
                  onClick={onClosses} 
                  colorScheme='red' 
                >
                  annuler
                </Button>
              <Links href={'#'}>
                  <Button 
                    colorScheme='green'  
                    ml={3}
                    onClick={AddMontantPensionClasse}
                  >
                    Affectez  
                  </Button>
                </Links> 
              </AlertDialogFooter>
            </Box>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>
    </Box>

{/* LISTE DES CLASSES */}
<Box mt={10}>
           <TableContainer
            border={"1px"} 
            rounded={"md"}
           >
              <Table 
                variant='striped'
                colorScheme={"white"}
              >
                  <Thead background="colors.secondary">
                  <Tr>
                      <Th>Nom</Th>
                      <Th>Montant pension</Th>
                      {/* <Th >section</Th>  */}
                      <Th >Action</Th>
                  </Tr>
                  </Thead>
                  <Tbody>
                    {dataClasse && ( 
                      dataClasse.findAllsalle
                      .slice(pagesVisited, pagesVisited + itemsPerPage)
                      .map((salle, index) =>( 
                      <Tr key={index}>
                         <Td >{salle.name}</Td> 
                         <Td>{salle.montantPensionSalle}</Td>
                         {/* <Td borderColor={'#C6B062'}>{salle.montantPensionSalle}</Td>   */}
                         {/* <Td borderColor={'#C6B062'}>{salle.section}</Td>  */}
                         {/* <Td borderColor={'#C6B062'}>{salle.montantPension}</Td>  */}
                        
                        <Td >
                          <ButtonGroup 
                            size='sm' 
                            isAttached 
                            variant='link' 
                            colorScheme={'teal'}
                            >
                              <Button>
                                <Links 
                                  href=''
                                >Details</Links>
                              </Button>
                            </ButtonGroup> 
                          </Td>
                            <Box 
                              display="flex"
                              ml={['-140px', '-140px', '-140px', '-140px']} 
                               mt={['8px', '8px', '8px', '8px']}
                             >
                                <Link 
                                // href="/class/updateclass"
                                  href= {{
                                  pathname: Routes.ClasseEdit?.path || '',
                                  query: {id: salle.id}
                                  }}
                                >
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
                                            Voulez-vous supprimer cette classe?
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
                                                onClick={() => {removeClass(salle.id)}}
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

{/* //CLASSE ACCOMPAGNE DES PROFESSEUR ET DES COURS ASSOCIE */}
        {/* <Box mt={10}>
           <TableContainer
            border={"1px"} 
            rounded={"md"}
           >
              <Table 
                variant='striped'
                colorScheme={"white"}
              >
                  <Thead background="colors.secondary">
                  <Tr>
                      <Th>Nom</Th>
                      <Th>Montant pension</Th>
                      {/* <Th >section</Th>  */}
                      {/* <Th >Action</Th>
                  </Tr>
                  </Thead>
                  <Tbody>
                    {dataCoursePersonnelSalle && ( 
                      dataCoursePersonnelSalle.findbyCoursePersonnelSalle
                      .slice(pagesVisited, pagesVisited + itemsPerPage)
                      .map((personnelSalle, index) =>( 
                      <Tr key={index}>
                         <Td >{personnelSalle.personnel_id.id}</Td>  */}
                         {/* <Td borderColor={'#C6B062'}>{salle.montantPensionSalle}</Td>   */}
                         {/* <Td borderColor={'#C6B062'}>{salle.section}</Td>  */}
                         {/* <Td borderColor={'#C6B062'}>{salle.montantPension}</Td>  */}
{/*                         
                        <Td >
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
                                            Voulez-vous supprimer cette classe?
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
                                                // onClick={() => {removeClass(salle.id)}}
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
        </Box> */} 
        <Box mt={"15px"}> 
          <ReactPaginate 
            previousLabel={"<<"}
            nextLabel={">>"}
            pageCount={pageCountSalle}
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

export default Class;

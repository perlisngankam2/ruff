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
  AlertDialogCloseButton,
  FormControl,
  FormLabel,
  useToast,
  InputRightElement
} from "@chakra-ui/react";

import DefaultLayout from "../../components/layouts/DefaultLayout";
import React, { useEffect, useState, useContext, use } from "react";
import { Router, useRouter } from "next/router";
import { GlobalContext } from "../../contexts/cyclesection/AppContext";
import {IoIosAdd} from "react-icons/io"
import {MdDelete} from 'react-icons/md';
import {
  CREATE_ANNEE_ACADEMIQUE, 
  CREATE_FRAIS_INSCRIPTION, 
  CREATE_TRANCHE_PENSION,
  CREATE_TRANCHE_PRIORITY,
  DELETE_TRANCHE_PENSION,

} from "../../graphql/Mutation"
import { useMutation, useQuery } from "@apollo/client";
import { 
  GET_ALL_ANNEE_ACADEMIQUE, 
  GET_ALL_FRAIS_INSCRIPTION,
   GET_ALL_TRANCHE, 
   GET_ALL_TRANCHE_PENSION,
   GET_ALL_CLASS,
  } from "../../graphql/Queries";
import { FiEdit, FiSearch } from "react-icons/fi";
import ReactPaginate from "react-paginate";
import { setPriority } from "os";

const Pension = () => {

    // const router = useRouter();
    const [query , setQuery] = useState("");
    const [name, setName] = useState("");
    const [montant, setMontant] = useState();
    const [dateLine, setDateLine] = useState();
    const [anneeAcademiqueId, setAnneeAcademiqueId] = useState("");
    const [salleId, setSalleId] = useState("");
    const [tranchePriorityId, setTranchePriorityId] = useState("");
    const [priority, setPriority] = useState();
    //STATE DE LA PAGINATION
    const itemsPerPage = 15;
    const [pageNumber, setPageNumber] = useState(0);
    const pagesVisited = pageNumber * itemsPerPage;
    // const [nameFraisInscription, setNameFraisInscription] = useState("");
    // const [name, setName] = useState("");
    // const [section, setSection] = useState("");
    // const search = (data) => {
    //   let datas = data.filter((item) => keys.some((key) => (
    //     item[key].toUpperCase().includes(query) 
    //     )
    //   ));
    //   console.log("datas :" , datas)
    //   return query ? datas.slice(0,5) : Users.slice(0,5)
    // };
   
    // const {data} = useQuery(GET_ALL_SECTION);
    // const{data:dataCycle} = useQuery(GET_ALL_CYCLE);
    // const [id, setId] = useState(null)
    // const [deleteSection ]= useMutation(DELETE_SECTION);
    // const [deleteCycle] = useMutation(DELETE_CYCLE);
    // const{ data:dataDetailsCycle} = useQuery(GET_ONE_CYCLE);
    // const [editCycle] = useMutation(UPDATE_CYCLE);
    // const [createCycle, {error}] = useMutation(CREATE_CYCLE);

    // HOOk des mutation et des query
    const { isOpen, onOpen, onClose} = useDisclosure();
    const { isOpen: isOpenns, onOpen:onOpenns, onClose:onClosses } = useDisclosure();
    const { isOpen: Onouvrir, onOpen:OnOuvert, onClose:onFermer, onToggle } = useDisclosure();
    const { isOpen: ouvrir, onOpen:ouvert, onClose:fermer, onToggles } = useDisclosure();
    const [createAnneeAccademique, {loading, error}] = useMutation(CREATE_ANNEE_ACADEMIQUE);
    const {data:dataAnneeAcademique} = useQuery(GET_ALL_ANNEE_ACADEMIQUE);
    const {data:dataFraisInscription} = useQuery(GET_ALL_FRAIS_INSCRIPTION);
    const {data:dataTranchePension, refetch} = useQuery(GET_ALL_TRANCHE_PENSION);
    const {data:dataClasse} = useQuery(GET_ALL_CLASS);
    const [createdFraisInscription] = useMutation(CREATE_FRAIS_INSCRIPTION);
    const [createTranchePension] = useMutation(CREATE_TRANCHE_PENSION);
    const [createTranchePriority] = useMutation(CREATE_TRANCHE_PRIORITY);
    const [deleTranchePension] = useMutation(DELETE_TRANCHE_PENSION);

    // const { onOpen} = useDisclosure();

    const [isformOpen, setIsFormOpen] = useState(false)
    const cancelRef = React.useRef();
    const router = useRouter();
    const toast= useToast();

    const removeTranchePension = async (id) => {
      await deleTranchePension({
        variables: {
          id
        },
        refetchQueries:[{
          query: GET_ALL_TRANCHE_PENSION
        }]
      })
      onFermer();
    }

    //creation d'une annee academique
       
    const addTranchePension = async() => {
      console.log(name);
      console.log("annee academiqueId", anneeAcademiqueId);
      console.log(montant);
      console.log(dateLine);
      console.log("saleId",salleId )
      await createTranchePension({
        variables:{
          tranche:{
            name: name,
            montant: parseInt(montant),
            dateLine: new Date(dateLine),
            anneeAcademiqueId: anneeAcademiqueId,
            salleId: salleId,
            priority: parseInt(priority)
            // tranchePriorityId: tranchePriorityId
          }, 
          refetchQueries:[{
            query: GET_ALL_TRANCHE_PENSION
          }]
        }
      })
      refetch()
      onClose();
      toast({
        title: "Creation frais inscription.",
        description: "Creation d'un montant de frais d'inscription.",
        status: "success",
        duration: 3000,
        isClosable: true,
      });
      setAnneeAcademiqueId("");
      setDateLine("");
      setMontant("");
      setDateLine("");

    }

    useEffect(() => {
      console.log(dataAnneeAcademique)
      // console.log(dataFraisInscription?.findAllfraisinscription)
      console.log(dataTranchePension);
    })
    
    if (loading) return <Text>Chargement en cour...</Text>
    if (error) return <Text>Une erreur s'est produite!</Text>
    
    const pageCountTranchePension = Math.ceil(dataTranchePension?.findAlltranche.length / itemsPerPage);

    const changePage = ({ page }) => {
      setPageNumber(page);
    };

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
            Pension
          </Heading>
          <Hide below="sm">
            <Text>Dashboad / Pension/</Text>
          </Hide>
        </Flex>
        <Flex gap={10} mt={5}>
          <InputGroup width="500px">
            <InputRightElement
              children={<Icon as={FiSearch} />}
              cursor="pointer"
            />
            <Input
              placeholder="Recherchez une tranche..."
              //value={recherche}
              onChange={e => setQuery(e.target.value)}
              color={"white"}
              variant="flushed"
            />
            {/* <InputRightAddon children={<SearchIcon />} /> */}
          </InputGroup>
          {/* <Select 
            placeholder="Selectionner la classe"
            onChange={e =>setQuery(e.target.value)}
          >
          </Select> */}
          {/* <SectionCreate/> */}
        </Flex>

{/* FORMULAIRE DE CREATION DES TRANCHES DE LA PENSIONS */}
        <Box mt={"50px"} >
          <Box> 
            <Box display={{md:"flex"}}>
              <Heading 
                mt={2}
                size="lg"
                color = "colors.quinzaine"
                mb={10}
                >
                  Frais des différentes tranches de pension
              </Heading>
                <Icon 
                as={IoIosAdd} 
                boxSize="40px"
                color={"colors.greencolor"}
                // _hover={bg:}
                rounded="full"
                mt={"8px"}
                ml={["10px", "10px", "10px" ]}
                _hover={{background:"colors.bluecolor"}}
                onClick={onOpen}
              />
            </Box>
              <AlertDialog
                motionPreset='slideInBottom'
                leastDestructiveRef={cancelRef}
                onClose={onClose}
                isOpen={isOpen}
                isCentered
               >
              <AlertDialogOverlay />
              <AlertDialogContent>
                <AlertDialogHeader
                  textAlign={"center"}
                  fontSize={['15px','20px','24px']} 
                  mt={"5px"}
                >
                  Ajoutez frais de scolarite
                </AlertDialogHeader>
                <AlertDialogCloseButton />
                <AlertDialogBody >
                  <Box >
                    {/* <FormControl>
                        <FormLabel>Classe</FormLabel>
                        <Select 
                            type={'text'} 
                            name="anneeAcademique"
                            placeholder="Annee academique"
                        >
                          <option>cp</option>
                          <option>cc</option>
                        </Select>
                    </FormControl> */}
                    <FormControl mt={4}>
                      <FormLabel>Nom</FormLabel>
                        <Input 
                            type={'text'} 
                            name="name"
                            value={name}
                            onChange ={(event)=> setName(event.target.value)}
                            placeholder="Nom"
                        />
                    </FormControl>
                    <FormControl mt={4}>
                      <FormLabel>Montant</FormLabel>
                      <Input 
                          type={"number"} 
                          name="montant"
                          value={montant}
                          placeholder="Valeur"
                          onChange = {(event)=> setMontant(event.target.value)}
                      />
                    </FormControl>
                    <FormControl mt={4}>
                        <FormLabel>Priorite</FormLabel>
                        <Input 
                          type={"number"} 
                          name="priority"
                          value={priority}
                          placeholder="Valeur"
                          onChange = {(event)=> setPriority(event.target.value)}
                      />
                        {/* <Select 
                            type={'text'} 
                            name="tranchePriorityId"
                            value={tranchePriorityId}
                            placeholder="Priorite"
                            onChange = {(event)=> setTranchePriorityId(event.target.value)}
                        >
                          {dataTranchePriority &&
                            dataTranchePriority.findAlltranchepriority.map((tranchePriority, index) => (
                              <option value={tranchePriority.id} key={index}>
                                {tranchePriority.name}
                              </option>
                            ))
                          }
                        </Select> */}
                    </FormControl>
                    <FormControl mt={4}>
                        <FormLabel>Classe</FormLabel>
                        <Select 
                            type={'text'} 
                            name="salleId"
                            value={salleId}
                            placeholder="Classe"
                            onChange = {(event)=> setSalleId(event.target.value)}
                        >
                          {dataClasse &&
                            dataClasse.findAllsalle.map((salle, index) => (
                              <option value={salle.id} key={index}>
                                {salle.name}
                              </option>
                            ))
                          }
                        </Select>
                    </FormControl>
                    <FormControl mt={4}>
                      <FormLabel>Date limite paiement</FormLabel>
                      <Input 
                          type={"date"} 
                          name="dateLine"
                          value={dateLine}
                          placeholder="Date limite de paiement"
                          onChange = {(event)=> setDateLine(event.target.value)}
                      />
                    </FormControl>
                    <FormControl mt={4}>
                        <FormLabel>Annee academique</FormLabel>
                        <Select 
                            type={'date'} 
                            name="anneeAcademiqueId"
                            value={anneeAcademiqueId}
                            placeholder="Annee academique"
                            onChange = {(event)=> setAnneeAcademiqueId(event.target.value)}
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
                    onClick={onClose}
                    colorScheme='red'
                  >
                    annuler
                  </Button>
                  <Button 
                    colorScheme='green' 
                    ml={3}
                    onClick={addTranchePension}
                  >
                    Creer
                  </Button>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>


            {/* TABLEAU DE LA LISTE DES TRANCHES DE LA PENSION */}
            <Box>
              <TableContainer
                border={"1px"} 
                rounded={"md"}
              >
                  <Table 
                    size='sm'
                    variant={"striped"} 
                    colorScheme={"white"}
                    bg={"white"}
                  >
                    <Thead background="colors.secondary">
                      <Tr>
                        <Th>Nom</Th>
                        <Th >Montant</Th>
                        <Th >Priorite</Th>
                        <Th>Date limite</Th>
                        <Th>Action</Th>
                        {/* <Th >Montant deuxiere tranche</Th> */}
                      </Tr>
                    </Thead>
                    <Tbody>
                      { dataTranchePension && (
                      
                        dataTranchePension.findAlltranche
                        .slice(pagesVisited, pagesVisited + itemsPerPage)
                        .map((tranche, index) => (
                      <Tr key={index}>
                        <Td p={0} pl={4}>{tranche.name}</Td>
                        <Td p={0} pl={4}>{tranche.montant}</Td>
                        <Td p={0} pl={4}>{tranche.priority}</Td>
                        <Td p={0} pl={4}>{tranche.dateLine}</Td>
                        {/* <Td >Monntant</Td>  */}
                        <Td p={0} pl={2}>
                            {/* <ButtonGroup 
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
                              </ButtonGroup>   */}
                              <Box 
                                display="flex"
                               >
                                <Link 
                                // href="/class/updateclass"
                                  href= {'#'}
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
                                      onClick={OnOuvert}
                                      _hover={{background:"blue.100"}}
                                    />
                                    <Box> 
                                      <AlertDialog
                                        isOpen={Onouvrir}
                                        leastDestructiveRef={cancelRef}
                                        onClose={onFermer}
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
                                            Voulez-vous supprimer cet cette tranche?
                                            </AlertDialogBody>

                                            <AlertDialogFooter>
                                              <Button 
                                                ref={cancelRef} 
                                                onClick={onFermer}
                                                colorScheme="red"
                                              >
                                                Annuler 
                                              </Button>
                                              <Button 
                                                colorScheme='green' 
                                                onClick={() => removeTranchePension(tranche.id)}
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


                       )))}
                    </Tbody>
                  </Table>
                </TableContainer>
              </Box>
              <Box mt={"15px"}> 
                <ReactPaginate 
                  previousLabel={"<<"}
                  nextLabel={">>"}
                  pageCount={pageCountTranchePension}
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
      </Box>
    </DefaultLayout>
  );
};

export default Pension;

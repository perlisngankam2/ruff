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
  useToast
} from "@chakra-ui/react";

import DefaultLayout from "../../components/layouts/DefaultLayout";
import React, { useEffect, useState, useContext, use } from "react";
import { Router, useRouter } from "next/router";
import { GlobalContext } from "../../contexts/cyclesection/AppContext";
import {IoIosAdd} from "react-icons/io"
import {CREATE_ANNEE_ACADEMIQUE, CREATE_FRAIS_INSCRIPTION, CREATE_TRANCHE_PENSION} from "../../graphql/Mutation"
import { useMutation, useQuery } from "@apollo/client";
import { GET_ALL_ANNEE_ACADEMIQUE, GET_ALL_FRAIS_INSCRIPTION, GET_ALL_TRANCHE, GET_ALL_TRANCHE_PENSION} from "../../graphql/Queries";

const Pension = () => {

    // const router = useRouter();
    const [query , setQuery] = useState("");
    const [name, setName] = useState("");
    const [montant, setMontant] = useState();
    const [dateLine, setDateLine] = useState("");
    const [anneeAcademiqueId, setAnneeAcademiqueId] = useState("");
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
    const [createAnneeAccademique, {loading, error}] = useMutation(CREATE_ANNEE_ACADEMIQUE);
    const {data:dataAnneeAcademique} = useQuery(GET_ALL_ANNEE_ACADEMIQUE);
    const {data:dataFraisInscription} = useQuery(GET_ALL_FRAIS_INSCRIPTION);
    const {data:dataTranchePension} = useQuery(GET_ALL_TRANCHE_PENSION);
    const [createdFraisInscription] = useMutation(CREATE_FRAIS_INSCRIPTION);
    const [createTranchePension] = useMutation(CREATE_TRANCHE_PENSION);
    const { isOpen, onOpen, onClose} = useDisclosure();
    const { isOpen: isOpenns, onOpen:onOpenns, onClose:onClosses} = useDisclosure();

    // const { onOpen} = useDisclosure();

    const [isformOpen, setIsFormOpen] = useState(false)
    const cancelRef = React.useRef();
    const router = useRouter();

    const toast= useToast();


  //  const defaultValues = useMemo(() =>{
  //     name =  "",
  //     section = ""
  // })

    //  useEffect (() => {
    //   console.log(data?.findAllsection);
    //   setSection(data);
    //   console.log(dataCycle?.findAllcycle)
    //   console.log("hh")
    // });

    // const removeSection = async (id) => {
    //   await deleteSection({
    //     variables: {
    //       id
    //     },
    //     refetchQueries:[{
    //       query: GET_ALL_SECTION
    //     }]

    //   })
    // }

    //creation d'une annee academique

    const addAnneeAcademique = async () =>{
      await createAnneeAccademique({
        variables:{
          anneeAccademique: {
            name: name
        },
        refetchQueries:[{
          query: GET_ALL_ANNEE_ACADEMIQUE
      }]
      }
      })
      onClosses();
      toast({
        title: "Creation d'une annee academique.",
        description: "Annee academique créée avec succes.",
        status: "success",
        duration: 3000,
        isClosable: true,
      });
      setName("")
    }
    
    const addTranchePension = async() => {
      console.log(name);
      console.log(anneeAcademiqueId);
      console.log(montant);
      console.log(dateLine);
      await createTranchePension({
        variables:{
          tranche:{
            name: name,
            montant: parseInt(montant),
            dateLine: new Date(dateLine),
            anneeAcademiqueId: anneeAcademiqueId,
          }, 
          refetchQueries:[{
            query: GET_ALL_TRANCHE_PENSION
          }]
        }
      })
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
          {/* <SectionCreate/> */}
        </Flex>
        <Box mt={10} mb={5}>
          <Box 
          display={{md:"flex"}}
          > 
            <Heading 
              mb={5}
              size="md"
              color = "colors.quinzaine"
            >
                Annee academique
            </Heading>
            <Icon 
              as={IoIosAdd} 
              boxSize="30px"
              color={"colors.greencolor"}
              // _hover={bg:}
              rounded="full"
              ml={["10px", "10px", "10px" ]}
              _hover={{background:"colors.bluecolor"}}
              onClick={onOpenns}
            />
          </Box>
          <Box as="form"> 
            <AlertDialog
              motionPreset='slideInBottom'
              // leastDestructiveRef={cancelRef}
              onClose={onClosses}
              isOpen={isOpenns}
              isCentered
            >
              <AlertDialogOverlay />
              <AlertDialogContent>
                <AlertDialogHeader
                  textAlign={"center"}
                >
                  Ajoutez une anneee academique
                </AlertDialogHeader>
                <AlertDialogCloseButton />
                <AlertDialogBody>
                <Box>
                  <FormControl>
                      <FormLabel>Nom</FormLabel>
                      <Input 
                        type={'text'} 
                        name="name"
                        placeholder="Annee academique"
                        onChange = {(event) => setName(event.target.value)}
                        value={name}
                      />
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
                  <Button 
                    colorScheme='green' 
                    ml={3}
                    onClick = {addAnneeAcademique}
                  >
                    Creer
                  </Button>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          </Box>
        </Box>


        {/* TABLEAU DE LA LISTE DES ANNEES ACADEMIQUES*/}
        <Box 
          width={["400px", "400px","400px"]} 
          border="1px" 
          borderColor={"GREEN"}
        >
          <TableContainer>
            <Table size='sm' variant='striped' >
              <Thead>
                <Tr>
                  <Th>Nom</Th>
                </Tr>
              </Thead>
              <Tbody>
                {dataAnneeAcademique && 
                (dataAnneeAcademique.findAllAnnerAccademique.map((anneeAccademique, index) =>( 
                <Tr key={index}>
                  <Td>{anneeAccademique.name}</Td>
                </Tr>
                ))
                )}
              </Tbody>
            </Table>
          </TableContainer>
        </Box>

{/* FORMULAIRE DE CREATION DES TRANCHES DE LA PENSIONS */}
        <Box mt={"50px"} >
          <Box> 
            <Box>
              <Heading 
                mt={2}
                size="lg"
                color = "colors.quinzaine"
                mb={10}
                >
                  Frais de scolarite
              </Heading>
                <Icon 
                as={IoIosAdd} 
                boxSize="30px"
                color={"colors.greencolor"}
                // _hover={bg:}
                rounded="full"
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
                >
                  Ajoutez frais scolarite
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
                            type={'text'} 
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
              <TableContainer>
                  <Table size='sm'>
                    <Thead>
                      <Tr>
                        <Th>Nom</Th>
                        <Th >Montant</Th>
                        <Th>Date limite</Th>
                        <Th>Annee academique</Th>
                        {/* <Th >Montant deuxiere tranche</Th> */}
                      </Tr>
                    </Thead>
                    <Tbody>
                      { dataTranchePension && (
                      
                        dataTranchePension.findAlltranche.map((tranche, index) => (
                      <Tr key={index}>
                        <Td>{tranche.name}</Td>
                        <Td>{tranche.montant}</Td>
                        <Td>{tranche.dateLine}</Td>
                        {/* <Td >Monntant</Td>  */}
                      </Tr>
                       )))}
                    </Tbody>
                  </Table>
                </TableContainer>
              </Box>
          </Box>
            
        </Box>
      </Box>
    </DefaultLayout>
  );
};

export default Pension;

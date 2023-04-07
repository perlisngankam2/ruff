import { useQuery , useMutation } from "@apollo/client";
import {
  Avatar,
  Box,
  Center,
  Flex,
    Heading , 
    Input, 
  Table,
  TableContainer,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr,
  AlertDialog,
  AlertDialogBody,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogContent,
  AlertDialogOverlay,
  useDisclosure,
  Button,
  FormControl,
  FormLabel,
  Select,
  useToast
} from "@chakra-ui/react";
import { AddIcon, MinusIcon } from '@chakra-ui/icons';
import { useRouter } from "next/router";
import Link from "next/link";
import { BsArrowReturnLeft } from "react-icons/bs";
import React, { useEffect, useState } from "react";
import DefaultLayout from "../../components/layouts/DefaultLayout";
import { GET_ALL_PERSONNEL_BY_ID} from "../../graphql/Queries";
import { GET_ALL_PERSONNELS } from "../../graphql/Queries";
import { GET_PRIME, GET_ALL_RETENUE } from "../../graphql/Queries";
import { CREATE_PRIME_PERSONNEL, CREATE_RETENUE_PERSONNEL } from "../../graphql/Mutation";


export const colorOptions = [ 
  { value: "blue", label: "Blue", color: "#0052CC" },
  { value: "purple", label: "Purple", color: "#5243AA" },
  { value: "red", label: "Red", color: "#FF5630" },
  { value: "orange", label: "Orange", color: "#FF8B00" },
  { value: "yellow", label: "Yellow", color: "#FFC400" },
  { value: "green", label: "Green", color: "#36B37E" }
]

export const groupedOptions = [
  {
    label: "Colours",
    options: colorOptions
  }
];

const Profil = () => {
    const toast = useToast();

    const { isOpen,  onOpen, onClose } = useDisclosure();
    const { isOpen:isOpenns, onToggle, onOpen:onOpenns, onClose:onClosses } = useDisclosure();
    const { isOpen:isOpenns1, onOpen:onOpenns1, onClose:onClosses1 } = useDisclosure();
    const { isOpen:isOpenns2, onToggle:onToggle1, onOpen:onOpenns2, onClose:onClosses2 } = useDisclosure();
    const cancelRef = React.useRef()

  const router = useRouter();

  const {data:dataPersonnelId} = useQuery(GET_ALL_PERSONNEL_BY_ID,
  {
    variables:{ id: router.query.id}
  })

   const moisPayes = []

  const handleMoisPaieChange = (event) => {
    const selectedMonth = event.target.value;
    if (!moisPayes.includes(selectedMonth)) {
      setStartDate(selectedMonth);
    }
  };


  const {data:dataPersonnel} = useQuery(GET_ALL_PERSONNELS)
  const {data:dataPrime} = useQuery(GET_PRIME)
  const {data:dataRetenue} = useQuery(GET_ALL_RETENUE)

  const [createPrimePersonnel, error] = useMutation(CREATE_PRIME_PERSONNEL);
  const [createRetenuePersonnel] = useMutation(CREATE_RETENUE_PERSONNEL);

  //prime vrariable
  const[personnelId, setPersonnelId] = useState("");
  const[primeId, setPrimeId] = useState("");
  const[startDate, setStartDate] = useState("");
  const[endDate, setEndDate] = useState("");

// retenue variable
  const[retenuId, setRetenuId] = useState("");
  const[startDate1, setStartDate1] = useState("");

// fonction prime
    const HandleClick = async (event) => {
  event.preventDefault();

  const primeDataPersonnel = await createPrimePersonnel({
        variables:{
        primePersonnel: { 
          primeId: primeId,
          personnelId: dataPersonnelId.findOnePersonnel.id, 
          startMonth: startDate,
          // enddate: endDate,
          // categorieId: categoryPersonnelId,
        }
      }
    })
    moisPayes.push(startDate);
     onClose();
    // console.log(userData)
    toast({
      title: "Succès.",
      description: "La prime a été crée .",
      status: "success",
      duration: 3000,
      isClosable: true,
    });

    setPrimeId("");
    setStartDate("");
    // dataPrime?.findAllprime.filter(prime => prime?.id !== primeId)
  }

  //fonction retenue


  const HandleClick1 = async (event) => {
  event.preventDefault();

  const retenueDataPersonnel = await createRetenuePersonnel({
        variables:{
        retenuPersonnel: { 
          retenuId: retenuId,
          personnelId: dataPersonnelId.findOnePersonnel.id, 
          startMonth: startDate1,
          // enddate: endDate,
          // categorieId: categoryPersonnelId,
        }
      }
    })
     onClosses1();
    // console.log(userData)
    toast({
      title: "Succès.",
      description: "La retenue a été appliquée .",
      status: "success",
      duration: 3000,
      isClosable: true,
    });
    setRetenuId("");
    setStartDate1("");
  }
  
  useEffect(() =>{
    console.log(dataPersonnelId)
    console.log(dataPersonnel)
  })

  return (
    <DefaultLayout>
      <Box p="3" pt="70px" w="100%" background="colors.tertiary">
        
      {dataPersonnelId && (
        
        <Box>
          <Box pb={10} ml={5} w="100px">   
          <Button 
              leftIcon={<BsArrowReturnLeft boxSize="20px" />} 
              colorScheme={'green'}
              onClick={() => router.push("/personnel")}
             
            >
              Retour a la liste
            </Button></Box>
        <Flex gap="5" pb={'7px'}>
          <Box rounded="md" p="5" boxShadow="md" w="40%" background="white">
            <Center>
              <Avatar
                src="https://img.freepik.com/vecteurs-premium/profil-avatar-homme-icone-ronde_24640-14044.jpg?w=2000"
                size="xl"
              />
            </Center>
            <Text fontSize="2xl" fontWeight="bold" textAlign="center" my="2">
              {dataPersonnelId.findOnePersonnel.fonction}
            </Text>
            <Box background="blue.500" p="3" rounded="md" color="white">
              <Text>Nom : {dataPersonnelId.findOnePersonnel.firstName}</Text>
              <Text>Prenom : {dataPersonnelId.findOnePersonnel.lastName}</Text>
              <Text>Situation matrimoniale :{dataPersonnelId.findOnePersonnel.situationMatrimonial} </Text>
              <Text>Telephone: {dataPersonnelId.findOnePersonnel.phoneNumber}</Text>
              <Text>Sexe : {dataPersonnelId.findOnePersonnel.sexe}</Text>
            </Box>
            <Box background="white" p="3" rounded="md">
            <Text>Date de naissance :{dataPersonnelId.findOnePersonnel.dateOfBirth}</Text>
              <Text>Date de prise de fonction :{dataPersonnelId.findOnePersonnel.dateOfStartWork} </Text>
              <Text>Nombre d'enfants: {dataPersonnelId.findOnePersonnel.childNumber}</Text>
              <Text> Statut: {dataPersonnelId.findOnePersonnel.status}</Text>
              {/* <Text> Section: Anglophone</Text>
              <Text> Classe: CM1</Text> */}
            </Box>
          </Box>
          <Box rounded="md" p="5" boxShadow="md" background="white" w="60%">
            <Text fontSize="2xl" fontWeight="bold" mb={3}>
              Dossier de salaire
            </Text>
            <TableContainer>
              <Table variant="striped">
                <Thead>
                  <Tr>
                    <Th textAlign="center">Mois de salaire</Th>
                    <Th textAlign="center">Prime</Th>
                    <Th textAlign="center">Retenue</Th>
                    <Th textAlign="center">Salaire net</Th>
                  </Tr>
                </Thead>
                <Tbody>
                  <Tr>
                    <Td textAlign="center">03/2021</Td>
                    <Td textAlign="center">5000</Td>
                    <Td textAlign="center">1000</Td>
                    <Td textAlign="center">155000</Td>
                  </Tr>
                  <Tr>
                    <Td textAlign="center">02/2021</Td>
                    <Td textAlign="center">9000</Td>
                    <Td textAlign="center">3000</Td>
                    <Td textAlign="center">156000</Td>
                  </Tr>
                  <Tr textAlign="center">
                    <Td textAlign="center">01/2021</Td>
                    <Td textAlign="center">1000</Td>
                    <Td textAlign="center">15000</Td>
                    <Td textAlign="center">135000</Td>
                  </Tr>
                  <Tr>
                    <Td textAlign="center">12/2020</Td>
                    <Td textAlign="center">20000</Td>
                    <Td textAlign="center">15000</Td>
                    <Td textAlign="center">135000</Td>
                  </Tr>
                  <Tr>
                    <Td textAlign="center">11/2020</Td>
                    <Td textAlign="center">20000</Td>
                    <Td textAlign="center">15000</Td>
                    <Td textAlign="center">135000</Td>
                  </Tr>
                </Tbody>
              </Table>
            </TableContainer>

             
          </Box>
       
        </Flex>
    <Flex gap={3} >
      <Box>
                 
            <Button 
              leftIcon={<AddIcon />} 
              bg='green.200'
              height='40px' 
              color='white' 
              onClick={onOpen}
              w='110px'
            >
              prime
            </Button>

              <AlertDialog
                isOpen={isOpen}
                leastDestructiveRef={cancelRef}
                onClose={onClose}
                size='xl'
                
            >
              <AlertDialogOverlay>
                  <AlertDialogContent  >
                    <AlertDialogHeader 
                      fontSize='sm' 
                      fontWeight='base' 
                      mt='0'
                    >
                    <Box  
                      bg={"colors.secondary"} 
                      borderBottomRightRadius={10} 
                      borderBottomLeftRadius={10}
                    >
                        <Heading 
                         
                          textAlign={'center'} 
                          fontSize={['15px','20px','26px']} 
                          p='2' 
                        >
                                Groupe Scolaire Bilingue Awono Bilongue
                        </Heading>
                    </Box>
                    </AlertDialogHeader>
                    <AlertDialogBody>
 
            <Box mt='4'>
                <Flex 
                  gap={5} 
                  flexWrap={['wrap','wrap','nowrap']} 
                  align='end'
                >
                    <FormControl>
                        <FormLabel 
                        fontWeight={"normal"}
                        >
                          Nom de l'employé :
                        </FormLabel>
                <Input

                    type="text"
                    value= {dataPersonnelId.findOnePersonnel.firstName}
                    // onChange={(e) => setNom(e.target.value)}
                    name="Nom"
                    placeholder="nom prime"
                    bg='white'
                    // type="date"
                    // id="dateOfPrime"
                    // name="dateOfPrime"
                    // placeholder="{formattedDate}"
                    // bg='white'
              
                    // borderColor="purple.100"
                    // onChange={e => setDateOfStartWork(e.target.value)}
                    // value={dateOfStartWork}
                    // // ref={dateOfStartWorkRef}
                    
                  />
                    </FormControl>
                            <FormControl>
                        <FormLabel 
                        fontWeight={"normal"}
                        >
                          Prime attribuée
                        </FormLabel>
                          <Select
                    name="primeId"
                    placeholder="Prime attribuée"
                    onChange={(event)  => setPrimeId(event.target.value)}
                    value={primeId}
                 
                  >
                    { 
                      dataPrime && (
                        dataPrime.findAllprime.map((prime, index) => (
                            <option value={prime?.id} key={index}>
                              {prime.nom}
                            </option>
                        ))
                        .filter((prime) => prime !== prime?.id)                    )}

                  </Select>
                    </FormControl>
               
                </Flex>
            </Box>
            <Box mt='4'>
                <Flex 
                  gap={5} 
                  flexWrap={['wrap','wrap','nowrap']} 
                  align='end'
                >
                  <FormControl>
                    <FormLabel>Mois de la prime</FormLabel>
                       <Input
                    placeholder="nom prime"
                    bg='white'
                    type="month"
                    // id="dateOfPrime"
                    name="dateOfPrime"
                    // placeholder="{formattedDate}"
                    // bg='white'
              
                    // borderColor="purple.100"
                     onChange={handleMoisPaieChange}
                    disabled={moisPayes.includes(startDate)}
                    value={startDate}
                    // // ref={dateOfStartWorkRef}
                    
                  />
                    </FormControl>
                  
                    
                    {/* <FormControl>
                        <FormLabel>Delai</FormLabel>
                        <Input type={'date'} ></Input>
                    </FormControl>
                    <FormControl>
                        <FormLabel>reste a payer</FormLabel>
                      <Input 
                        type={'number'} 
                        disabled='disabled' 
                        textColor={'red.300'}
                      />
                    </FormControl> */}
                </Flex>
            </Box>
            </AlertDialogBody>
            <AlertDialogFooter>
              <Button ref={cancelRef} onClick={onClose} colorScheme='red' >
                annuler
              </Button>
             <Link href={'#'}>
              <Box>
                <Button colorScheme='green'  ml={3} type='submit' onClick={onToggle}>
                  ajouter
                </Button>
                

                    <Box> 
                                    <AlertDialog
                                      isOpen={isOpenns}
                                      leastDestructiveRef={cancelRef}
                                      onClose={onClosses}
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
                                              Confirmation d'ajout
                                            </AlertDialogHeader>
                                            <AlertDialogBody textAlign={"center"}>
                                            Voulez-vous attribuee cette prime a {dataPersonnelId.findOnePersonnel.firstName +" "+dataPersonnelId.findOnePersonnel.lastName} ?
                                            </AlertDialogBody>

                                            <AlertDialogFooter>
                                              <Button 
                                                ref={cancelRef} 
                                                onClick={onClosses}
                                                colorScheme="red"
                                              >
                                                Annuler 
                                              </Button>
                                              <Button 
                                                colorScheme='green' 
                                                onClick={HandleClick}  
                                                ml={3}
                                              >
                                                Attribuer
                                              </Button>
                                            </AlertDialogFooter>
                                          </AlertDialogContent>
                                        </AlertDialogOverlay>
                                    </AlertDialog>
                                  </Box>

                </Box>
              </Link> 
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>
         </Box>


         <Box>

                  <Button 
              leftIcon={<MinusIcon />} 
              bg='red.200'
              height='40px' 
              color='white' 
              onClick={onOpenns1}
              w='110px'
            >
              retenue
            </Button>

              <AlertDialog
                isOpen={isOpenns1}
                leastDestructiveRef={cancelRef}
                onClose={onClosses1}
                size='xl'
                
            >
              <AlertDialogOverlay>
                  <AlertDialogContent  >
                    <AlertDialogHeader 
                      fontSize='sm' 
                      fontWeight='base' 
                      mt='0'
                    >
                    <Box  
                      bg={"colors.secondary"} 
                      borderBottomRightRadius={10} 
                      borderBottomLeftRadius={10}
                    >
                        <Heading 
                         
                          textAlign={'center'} 
                          fontSize={['15px','20px','26px']} 
                          p='2' 
                        >
                                Groupe Scolaire Bilingue Awono Bilongue
                        </Heading>
                    </Box>
                    </AlertDialogHeader>
                    <AlertDialogBody>
 
            <Box mt='4'>
                <Flex 
                  gap={5} 
                  flexWrap={['wrap','wrap','nowrap']} 
                  align='end'
                >
                    <FormControl>
                        <FormLabel 
                        fontWeight={"normal"}
                        >
                          Nom de l'employé :
                        </FormLabel>
                <Input

                    type="text"
                    value= {dataPersonnelId.findOnePersonnel.firstName}
                    // onChange={(e) => setNom(e.target.value)}
                    name="Nom"
                    placeholder="nom prime"
                    bg='white'
                    // type="date"
                    // id="dateOfPrime"
                    // name="dateOfPrime"
                    // placeholder="{formattedDate}"
                    // bg='white'
              
                    // borderColor="purple.100"
                    // onChange={e => setDateOfStartWork(e.target.value)}
                    // value={dateOfStartWork}
                    // // ref={dateOfStartWorkRef}
                    
                  />
                    </FormControl>
                            <FormControl>
                        <FormLabel 
                        fontWeight={"normal"}
                        >
                          Retenue attribuée
                        </FormLabel>
                          <Select
                    name="retenuId"
                    placeholder="Retenue attribuée"
                    onChange={(event)  => setRetenuId(event.target.value)}
                    value={retenuId}
                 
                  >
                    { 
                      dataRetenue && (
                        dataRetenue.findAllretenusalarial.map((retenu, index) => (
                            <option value={retenu?.id} key={index}>
                              {retenu.nom}
                            </option>
                        ))
                    )}

                  </Select>
                    </FormControl>
                    {/* <FormControl>
                        <FormLabel 
                        placeholder="--motif--"
                        >
                          Classe 
                        </FormLabel>
                        <Select  
                          isMulti
                          options= {groupedOptions}
                          // {[Tranches.map((tranche) => (
                          //   <option>{tranche}</option>
                          // ))]}
                        >
                        </Select>
                    </FormControl> */}
                </Flex>
            </Box>
            <Box mt='4'>
                <Flex 
                  gap={5} 
                  flexWrap={['wrap','wrap','nowrap']} 
                  align='end'
                >
                  <FormControl>
                    <FormLabel>Mois de la retenue</FormLabel>
                       <Input
                    placeholder="nom prime"
                    bg='white'
                    type="month"
                    // id="dateOfPrime"
                    name="dateOfPrime"
                    // placeholder="{formattedDate}"
                    // bg='white'
              
                    // borderColor="purple.100"
                    onChange={(event) => setStartDate1(event.target.value)}
                    value={startDate1}
                    // // ref={dateOfStartWorkRef}
                    
                  />
                    </FormControl>
                  
                    
                    {/* <FormControl>
                        <FormLabel>Delai</FormLabel>
                        <Input type={'date'} ></Input>
                    </FormControl>
                    <FormControl>
                        <FormLabel>reste a payer</FormLabel>
                      <Input 
                        type={'number'} 
                        disabled='disabled' 
                        textColor={'red.300'}
                      />
                    </FormControl> */}
                </Flex>
            </Box>
            </AlertDialogBody>
            <AlertDialogFooter>
              <Button ref={cancelRef} onClick={onClosses1} colorScheme='red' >
                annuler
              </Button>
             <Link href={'#'}>
              <Box>
                <Button colorScheme='green'  ml={3} type='submit' onClick={onToggle1}>
                  ajouter
                </Button>
                

                    <Box> 
                                    <AlertDialog
                                      isOpen={isOpenns2}
                                      leastDestructiveRef={cancelRef}
                                      onClose={onClosses2}
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
                                              Confirmation de retenue
                                            </AlertDialogHeader>
                                            <AlertDialogBody textAlign={"center"}>
                                            Voulez-vous attribuee cette retenue a {dataPersonnelId.findOnePersonnel.firstName +" "+dataPersonnelId.findOnePersonnel.lastName} ?
                                            </AlertDialogBody>

                                            <AlertDialogFooter>
                                              <Button 
                                                ref={cancelRef} 
                                                onClick={onClosses2}
                                                colorScheme="red"
                                              >
                                                Annuler 
                                              </Button>
                                              <Button 
                                                colorScheme='green' 
                                                onClick={HandleClick1}  
                                                ml={3}
                                              >
                                                Attribuer
                                              </Button>
                                            </AlertDialogFooter>
                                          </AlertDialogContent>
                                        </AlertDialogOverlay>
                                    </AlertDialog>
                                  </Box>

                </Box>
              </Link> 
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>
         </Box>
    </Flex>
        </Box>
    )}



      </Box>
    </DefaultLayout>
  );
};

export default Profil;

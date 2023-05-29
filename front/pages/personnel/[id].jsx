import {
  Avatar,
  Box,
  Center,
  Flex,
  Heading,
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
  useToast,
} from "@chakra-ui/react";
import { AddIcon } from "@chakra-ui/icons";
import { useRouter } from "next/router";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import DefaultLayout from "../../components/layouts/DefaultLayout";
import { useQuery, useMutation } from "@apollo/client";
import { GET_ALL_PERSONNEL_BY_ID } from "../../graphql/Queries";
import { GET_ALL_PERSONNELS } from "../../graphql/Queries";
import {
  GET_PRIME,
  GET_ALL_RETENUE,
  GET_Category_Personnel_BY_ID,
  GET_Category_Personnel_ID,
} from "../../graphql/Queries";
import {
  CREATE_PRIME_PERSONNEL,
  CREATE_RETENUE_PERSONNEL,
  CREATE_SALAIRE,
} from "../../graphql/Mutation";
// import { getStaticPropsTranslations } from "../../types/staticProps";
import { useTranslation } from "next-i18next";
import { MinusIcon } from "@chakra-ui/icons";
// import { getStaticPropsTranslations } from "../../types/staticProps";
import { useAuth } from "../../contexts/account/Auth/Auth";

export const colorOptions = [
  { value: "blue", label: "Blue", color: "#0052CC" },
  { value: "purple", label: "Purple", color: "#5243AA" },
  { value: "red", label: "Red", color: "#FF5630" },
  { value: "orange", label: "Orange", color: "#FF8B00" },
  { value: "yellow", label: "Yellow", color: "#FFC400" },
  { value: "green", label: "Green", color: "#36B37E" },
];

export const groupedOptions = [
  {
    label: "Colours",
    options: colorOptions,
  },
];

const Profil = () => {
  const toast = useToast();
  const { setAuthToken, authToken } = useAuth();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const {
    isOpen: isOpenns,
    onOpen: onOpenns,
    onClose: onClosses,
  } = useDisclosure();
  const {
    isOpen: isOpenns1,
    onOpen: onOpenns1,
    onClose: onClosses1,
  } = useDisclosure();
  const {
    isOpen: isOpenns2,
    onToggle: onToggle1,
    onOpen: onOpenns2,
    onClose: onClosses2,
  } = useDisclosure();

  const cancelRef = React.useRef();
  const router = useRouter();
  const { t } = useTranslation();

  const { data: dataPersonnelId, loading } = useQuery(GET_ALL_PERSONNEL_BY_ID, {
    variables: { id: router.query.id },
  });
  const { data: dataRetenue } = useQuery(GET_ALL_RETENUE);

  //   const {data:dataCategorieId} = useQuery(GET_Category_Personnel_ID,
  //  {
  //     variables: { personnelid: router.query.id}
  //       // dataPersonnelId?.findOnePersonnel.id}
  //  })

  // const {data:dataCategorie} = useQuery(GET_Category_Personnel_BY_ID,
  // {
  //     variables:{ personnelid: router.query.id}
  //       // dataCategorieId?.fin?dCategoriepersonnelbypersonnel}
  // })

  const moisPayes = [];

  const handleMoisPaieChange = (event) => {
    const selectedMonth = event.target.value;
    if (!moisPayes.includes(selectedMonth)) {
      setStartDate(selectedMonth);
    }
  };

  const handleMoisPaieChange1 = (event) => {
    const selectedMonth = event.target.value;
    if (!moisPayes.includes(selectedMonth)) {
      setStartDate1(selectedMonth);
    }
  };

  const { data: dataPersonnel } = useQuery(GET_ALL_PERSONNELS);
  const { data: dataPrime } = useQuery(GET_PRIME);

  const [createPrimePersonnel] = useMutation(CREATE_PRIME_PERSONNEL);
  const [createRetenuePersonnel] = useMutation(CREATE_RETENUE_PERSONNEL);
  const [personnelId, setPersonnelId] = useState("");
  const [primeId, setPrimeId] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [startDate1, setStartDate1] = useState("");
  const [retenuId, setRetenuId] = useState("");

  //generer salaire

  // const montant = dataCategorie?.findOneCategoriepersonnel.montant;
  const [moisPaie, setMoisPaie] = useState("");
  const [jourPaie, setJourPaie] = useState("");
  const [createSalaire] = useMutation(CREATE_SALAIRE);

  // fonction prime
  const HandleClickPrime = async (event) => {
    event.preventDefault();

    const primeDataPersonnel = await createPrimePersonnel({
      variables: {
        primePersonnel: {
          primeId: primeId,
          personnelId: dataPersonnelId.findOnePersonnel.id,
          startMonth: startDate,
          // enddate: endDate,
          // categorieId: categoryPersonnelId,
        },
      },
    });
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
  };

  //fonction retenue

  const HandleClickRetenue = async (event) => {
    event.preventDefault();

    const retenueDataPersonnel = await createRetenuePersonnel({
      variables: {
        retenuPersonnel: {
          retenuId: retenuId,
          personnelId: dataPersonnelId.findOnePersonnel.id,
          startMonth: startDate1,
          // enddate: endDate,
          // categorieId: categoryPersonnelId,
        },
      },
    });
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
  };

  console.log(moisPayes);

  useEffect(()=>{
    if(!authToken){
      router.back()
    }
  },[authToken])


  useEffect(() => {
    console.log(dataPersonnelId);
    console.log(dataPersonnel);
  });

  return (
    <DefaultLayout>
      <Box p="3" pt="70px" w="100%" background="colors.tertiary">
        {dataPersonnelId && (
          <Box>
            <Center>
              <Flex gap="5" pb={"7px"}>
                <Box
                  rounded="md"
                  p="5"
                  boxShadow="md"
                  // w="60%"
                  background="white"
                  w={"800px"}
                >
                  <Center>
                    <Avatar
                      src="https://img.freepik.com/vecteurs-premium/profil-avatar-homme-icone-ronde_24640-14044.jpg?w=2000"
                      size="xl"
                    />
                  </Center>
                  <Text
                    fontSize="2xl"
                    fontWeight="bold"
                    textAlign="center"
                    my="2"
                  >
                    {dataPersonnelId.findOnePersonnel.fonction}
                  </Text>
                  <Box 
                    background="blue.500" 
                    p="3" 
                    rounded="md" 
                    color="white"
                  >
                    <Text>
                      Nom
                      {/* {t('pages.personnel.ajouterpersonnel.firstName')} */}:{" "}
                      {dataPersonnelId.findOnePersonnel.firstName}
                    </Text>
                    <Text>
                      Prénom
                      {/* {t('pages.personnel.ajouterpersonnel.lastName')} */}:{" "}
                      {dataPersonnelId.findOnePersonnel.lastName}
                    </Text>
                    <Text>
                      Situation matrimoniale
                      {/* {t('pages.personnel.ajouterpersonnel.maritalStatus')} */}
                      :{dataPersonnelId.findOnePersonnel.situationMatrimonial}{" "}
                    </Text>
                    <Text>
                      Téléphone
                      {/* {t('pages.personnel.ajouterpersonnel.phoneNumber')} */}
                      : {dataPersonnelId.findOnePersonnel.phoneNumber}
                    </Text>
                    <Text>
                      Sexe
                      {/* {t('pages.personnel.ajouterpersonnel.gender')} */}:{" "}
                      {dataPersonnelId.findOnePersonnel.sexe}
                    </Text>
                  </Box>
                  <Box 
                    background="white" 
                    p="3" 
                    rounded="md"
                  >
                    <Text>
                      Date de naissance :
                      {dataPersonnelId.findOnePersonnel.dateOfBirth}
                    </Text>
                    <Text>
                      Date de prise de fonction :
                      {dataPersonnelId.findOnePersonnel.dateOfStartWork}{" "}
                    </Text>
                    <Text>
                      Nombre d'enfants:{" "}
                      {dataPersonnelId.findOnePersonnel.childNumber}
                    </Text>
                    <Text>
                      {" "}
                      Statut: {dataPersonnelId.findOnePersonnel.status}
                    </Text>
                    {/* <Text> Section: Anglophone</Text>
              <Text> Classe: CM1</Text> */}
                  </Box>
                </Box>
                {/* <Box rounded="md" p="5" boxShadow="md" background="white" w="60%">
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
          </Box> */}
              </Flex>
            </Center>
            <Flex gap={3}>
              <Box>
                <Button
                  leftIcon={<AddIcon />}
                  bg="green.200"
                  // color="white"
                  onClick={onOpen}
                  w="110px"
                 _hover={{background:"green.300"}}

                >
                  prime
                </Button>
                <AlertDialog
                  isOpen={isOpen}
                  leastDestructiveRef={cancelRef}
                  onClose={onClose}
                  size="xl"
                >
                  <AlertDialogOverlay>
                    <AlertDialogContent>
                      <AlertDialogHeader 
                        fontSize="sm" 
                        fontWeight="base" 
                        mt="0"
                      >
                        <Box
                          // bg={"colors.secondary"}
                        >
                          <Heading
                            textAlign={"center"}
                            fontSize={["25px", "25px", "25px"]}
                            p="2"
                          >
                            Attribuer une prime 
                          </Heading>
                        </Box>
                      </AlertDialogHeader>
                      <AlertDialogBody>
                        <Box mt="4">
                          <Flex
                            gap={5}
                            flexWrap={["wrap", "wrap", "nowrap"]}
                            align="end"
                          >
                            <FormControl>
                              <FormLabel fontWeight={"normal"}>
                                Nom de l'employé :
                              </FormLabel>
                              <Input
                                type="text"
                                value={
                                  dataPersonnelId.findOnePersonnel.firstName
                                }
                                // onChange={(e) => setNom(e.target.value)}
                                name="Nom"
                                placeholder="nom prime"
                                bg="white"
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
                              <FormLabel fontWeight={"normal"}>
                                Prime attribuée
                              </FormLabel>
                              <Select
                                name="primeId"
                                placeholder="Prime attribuée"
                                onChange={(event) =>
                                  setPrimeId(event.target.value)
                                }
                                value={primeId}
                              >
                                {dataPrime &&
                                  dataPrime.findAllprime
                                    .map((prime, index) => (
                                      <option value={prime?.id} key={index}>
                                        {prime.nom}
                                      </option>
                                    ))
                                    .filter((prime) => prime !== prime?.id)}
                              </Select>
                            </FormControl>
                          </Flex>
                        </Box>
                        <Box mt="4">
                          <Flex
                            gap={5}
                            flexWrap={["wrap", "wrap", "nowrap"]}
                            align="end"
                          >
                            <FormControl>
                              <FormLabel>Mois de la prime</FormLabel>
                              <Input
                                placeholder="nom prime"
                                bg="white"
                                type="month"
                                // id="dateOfPrime"
                                name="dateOfPrime"
                                // placeholder="{formattedDate}"
                                // bg='white'

                                // borderColor="purple.100"
                                onChange={handleMoisPaieChange}
                                // disabled={moisPayes.includes(startDate)}
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
                        <Button
                          ref={cancelRef}
                          onClick={onClose}
                          colorScheme="red"
                        >
                          annuler
                        </Button>
                        <Link href={"#"}>
                          <Box>
                            <Button
                              colorScheme="green"
                              ml={3}
                              type="submit"
                              onClick={onOpenns}
                            >
                              ajouter
                            </Button>

                            <AlertDialog
                              isOpen={isOpenns}
                              leastDestructiveRef={cancelRef}
                              onClose={onClosses}
                              isCentered
                            >
                              <AlertDialogOverlay
                              // alignSelf={"center"}
                              >
                                <AlertDialogContent width={"380px"}>
                                  <AlertDialogHeader
                                    fontSize="lg"
                                    fontWeight="bold"
                                    textAlign={"center"}
                                  >
                                    Confirmation d'ajout
                                  </AlertDialogHeader>
                                  <AlertDialogBody textAlign={"center"}>
                                    Voulez-vous attribuee cette prime a{" "}
                                    {dataPersonnelId.findOnePersonnel
                                      .firstName +
                                      " " +
                                      dataPersonnelId.findOnePersonnel
                                        .lastName}{" "}
                                    ?
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
                                      colorScheme="green"
                                      onClick={HandleClickPrime}
                                      ml={3}
                                    >
                                      Attribuer
                                    </Button>
                                  </AlertDialogFooter>
                                </AlertDialogContent>
                              </AlertDialogOverlay>
                            </AlertDialog>
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
                  bg="red.200"
                  height="40px"
                  // color="black"
                  onClick={onOpenns1}
                  w="110px"
                 _hover={{background:"red.300"}}

                >
                  retenue
                </Button>

                <AlertDialog
                  isOpen={isOpenns1}
                  leastDestructiveRef={cancelRef}
                  onClose={onClosses1}
                  size="xl"
                >
                  <AlertDialogOverlay>
                    <AlertDialogContent>
                      <AlertDialogHeader fontSize="sm" fontWeight="base" mt="0">
                        <Box
                          // bg={"colors.secondary"}
                         
                        >
                          <Heading
                            textAlign={"center"}
                            fontSize={["25px", "25px", "25px"]}
                            p="2"
                          >
                            Attribuer une retenue
                          </Heading>
                        </Box>
                      </AlertDialogHeader>
                      <AlertDialogBody>
                        <Box mt="4">
                          <Flex
                            gap={5}
                            flexWrap={["wrap", "wrap", "nowrap"]}
                            align="end"
                          >
                            <FormControl>
                              <FormLabel fontWeight={"normal"}>
                                Nom de l'employé :
                              </FormLabel>
                              <Input
                                type="text"
                                value={
                                  dataPersonnelId.findOnePersonnel.firstName
                                }
                                // onChange={(e) => setNom(e.target.value)}
                                name="Nom"
                                placeholder="nom prime"
                                bg="white"
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
                              <FormLabel fontWeight={"normal"}>
                                Retenue attribuée
                              </FormLabel>
                              <Select
                                name="retenuId"
                                placeholder="Retenue attribuée"
                                onChange={(event) =>
                                  setRetenuId(event.target.value)
                                }
                                value={retenuId}
                              >
                                {dataRetenue &&
                                  dataRetenue.findAllretenusalarial

                                    //           .filter((retenu) =>{
                                    //               if(retenu.id !== retenuId){
                                    //   return retenu;
                                    // }

                                    // })

                                    .map((retenu, index) => (
                                      <option value={retenu?.id} key={index}>
                                        {retenu.nom}
                                      </option>
                                    ))}
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
                        <Box mt="4">
                          <Flex
                            gap={5}
                            flexWrap={["wrap", "wrap", "nowrap"]}
                            align="end"
                          >
                            <FormControl>
                              <FormLabel>Mois de la retenue</FormLabel>
                              <Input
                                placeholder="mois retenue"
                                bg="white"
                                type="month"
                                name="dateOfPrime"
                                // placeholder="{formattedDate}"
                                // bg='white'

                                // borderColor="purple.100"
                                onChange={handleMoisPaieChange1}
                                value={startDate1}
                                // // ref={dateOfStartWorkRef}
                              />
                            </FormControl>

                            {console.log(startDate1)}

                            {/* <FormControl>
                        <FormLabel>Salaire de base</FormLabel>
                                <Input
                    placeholder="nom prime"
                    bg='white'
                    type="text"
                    rounded={2}
                    name="dateOfPrime"
                
                  //  value={montant}
                  />
                    </FormControl> */}
                          </Flex>
                        </Box>
                      </AlertDialogBody>
                      <AlertDialogFooter>
                        <Button
                          ref={cancelRef}
                          onClick={onClosses1}
                          colorScheme="red"
                        >
                          annuler
                        </Button>
                        <Link href={"#"}>
                          <Box>
                            <Button
                              colorScheme="green"
                              ml={3}
                              type="submit"
                              onClick={onToggle1}
                            >
                              Attribuer
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
                                  <AlertDialogContent width={"380px"}>
                                    <AlertDialogHeader
                                      fontSize="lg"
                                      fontWeight="bold"
                                      textAlign={"center"}
                                    >
                                      Confirmation de retenue
                                    </AlertDialogHeader>
                                    <AlertDialogBody textAlign={"center"}>
                                      Voulez-vous attribuee cette retenue a{" "}
                                      {dataPersonnelId.findOnePersonnel
                                        .firstName +
                                        " " +
                                        dataPersonnelId.findOnePersonnel
                                          .lastName}{" "}
                                      ?
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
                                        colorScheme="green"
                                        onClick={HandleClickRetenue}
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

// export async function getStaticProps({ locale }) {
//   return {
//     props: {
//       ...(await getStaticPropsTranslations(locale)),
//       // Will be passed to the page component as props
//     },
//   };
// }
export default Profil;

import {
  Box,
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Center,
  Flex,
  FormControl,
  FormLabel,
  Heading,
  Input,
  Text,
  AlertDialogFooter,
  AlertDialogBody,
  AlertDialog,
  useDisclosure,
  AlertDialogContent,
  AlertDialogOverlay,
  AlertDialogHeader,
  AlertDialogCloseButton,
  Table,
  TableContainer,
  Tbody,
  Td,
  Select,
  Th,
  Thead,
  Tr,
  useToast,
  InputRightElement,
  ButtonGroup,
  Icon,
} from "@chakra-ui/react";
import DefaultLayout from "../../components/layouts/DefaultLayout";
import React, { useEffect, useState } from "react";
import { useMutation, useQuery } from "@apollo/client";
import { useRouter } from "next/router";
import { useAuth } from "../../contexts/account/Auth/Auth";

import {
  CREATE_ANNEE_ACADEMIQUE,
  CREATE_SCHOOL_PARAMETERS,
} from "../../graphql/Mutation";
import {
  GET_ALL_ANNEE_ACADEMIQUE,
  GET_ALL_SCHOOL_PARAMETER,
} from "../../graphql/Queries";
import { IoIosAdd } from "react-icons/io";

const generalSetting = () => {
  const { setAuthToken, authToken } = useAuth();
  const [name, setName] = useState("");
  const [anneeAcademiqueId, setAnneeAcademiqueId] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [emailAddress, setEmailAddress] = useState("");
  const [contry, setContry] = useState("");
  const [postalBox, setPostalBox] = useState("");
  const [schoolCurrency, setSchoolCurrency] = useState("");
  const [file, setFile] = useState([0]);

  const {
    isOpen: isOpenns,
    onOpen: onOpenns,
    onClose: onClosses,
  } = useDisclosure();
  const cancelRef = React.useRef();
  const router = useRouter();

  const toast = useToast();

  const [createAnneeAccademique, { loading, error }] = useMutation(
    CREATE_ANNEE_ACADEMIQUE
  );
  const [createSchoolParameters] = useMutation(CREATE_SCHOOL_PARAMETERS);
  const { data: dataAnneeAcademique, refetch } = useQuery(
    GET_ALL_ANNEE_ACADEMIQUE
  );
  const { data: dataSchoolParameter } = useQuery(GET_ALL_SCHOOL_PARAMETER);

  useEffect(() => {
    if (!authToken) {
      router.back();
    }
  }, [authToken]);

  useEffect(() => {
    console.log(dataSchoolParameter?.findAllparameters);
  });

  const addAnneeAcademique = async () => {
    await createAnneeAccademique({
      variables: {
        anneeAccademique: {
          name: name,
        },
        refetchQueries: [
          {
            query: GET_ALL_ANNEE_ACADEMIQUE,
          },
        ],
      },
    });
    refetch();
    onClosses();
    toast({
      title: "Creation d'une annee academique.",
      description: "Annee academique créée avec succes.",
      status: "success",
      duration: 3000,
      isClosable: true,
    });
    setName("");
  };

  const handleFileChange = (event) => {
    setFile(event.target.file);
  };

  const addShoolParameters = async () => {
    await createSchoolParameters({
      variables: {
        input: {
          name: name,
          phoneNumber: phoneNumber,
          emailAddress: emailAddress,
          contry: contry,
          postalBox: postalBox,
          anneeAcademiqueId: anneeAcademiqueId,
          schoolCurrency: schoolCurrency,
        },
      },
    });
    toast({
      title: "Enregistement des informations de l'etablissement.",
      description: "Enregistre avec succes.",
      status: "success",
      duration: 3000,
      isClosable: true,
    });
    setName("");
    setContry("");
    setPostalBox("");
    setEmailAddress("");
    setSchoolCurrency("");
  };
  return (
    <DefaultLayout>
      <Box pt="70px" width="full" background="colors.tertiary" pb={"40px"}>
        <Box>
          <Heading fontSize={"3xl"} textAlign={"center"}>
            Parametre généraux de l'application
          </Heading>
        </Box>
        <Center>
          {/* <Box  
                    position={"left"}
                    width={"600px"} 
                    rounded={"lg"}
                    bg={"white"}
                    mr="200px"
                    mt={"100px"}
                >

                    <Heading fontSize={"lg"}
                        mt={"25px"}
                        ml="20px"
                        mb="20px"
                        pb={"15px"}
                        // textAlign={"center"}
                    >
                        Mettre a jour le logo de l'ecole
                    </Heading>
                    <Center> 
                        <Box 
                            width={"500px"} 
                        >
                            <FormControl >
                                <FormLabel>Logo de l'institut</FormLabel>
                                <Input
                                    type="file"
                                />
                            </FormControl>
                            <Button>Mettre a jour</Button>
                        </Box>
                    </Center>
                </Box> */}
        </Center>
        <Box gap={"110px"} display={{ md: "flex" }}>
          {/* FORMULAIRE DE CREATION ET DE MISE A JOUR DE L'ETABLISSEMENT  */}
          <Box>
            <Card
              align="center"
              width={"500px"}
              bg="white"
              mt="40px"
              ml="50px"
              as="form"
            >
              <CardHeader
                fontWeight={"bold"}
                // ml="-240px"
                p="0px"
                mt="20px"
                fontSize={"xl"}
              >
                Mettre a jour le logo de l'ecole
              </CardHeader>
              <CardBody>
                <FormControl>
                  <FormLabel fontSize={"lg"}>Logo de l'institut</FormLabel>
                  <Input
                    // mt="5px"
                    size={"lg"}
                    type="file"
                    // width={"540px"}
                    textAlign={"center"}
                    onChange={handleFileChange}
                  />
                </FormControl>
              </CardBody>
              <CardFooter mt="-20px" ml="auto">
                <Button colorScheme="blue">Mettre à jour</Button>
              </CardFooter>
            </Card>
            <Card align="center" width={"500px"} bg="white" mt="40px" ml="50px">
              <CardHeader
                fontWeight={"bold"}
                // ml="-240px"
                p="0px"
                mt="20px"
                fontSize={"xl"}
              >
                Mettre à jour les informations de l'ecole
              </CardHeader>
              <CardBody>
                <FormControl>
                  <FormLabel fontSize={"lg"}>Nom de l'ecole</FormLabel>
                  <Input
                    // size={"lg"}
                    type="text"
                    width={"400px"}
                    value={name}
                    name="name"
                    onChange={(event) => setName(event.target.value)}
                  />
                </FormControl>
                <FormControl mt="17px">
                  <FormLabel fontSize={"lg"}>Boite postale</FormLabel>
                  <Input
                    // size={"lg"}
                    type="text"
                    width={"400px"}
                  />
                </FormControl>
                <FormControl mt="17px">
                  <FormLabel fontSize={"lg"}>Telephone</FormLabel>
                  <Input
                    type="phone"
                    width={"400px"}
                    value={phoneNumber}
                    name="phoneNumber"
                    onChange={(event) => setPhoneNumber(event.target.value)}
                  />
                </FormControl>
                <FormControl mt="17px">
                  <FormLabel fontSize={"lg"}>Adresse mail</FormLabel>
                  <Input
                    type="text"
                    width={"400px"}
                    value={emailAddress}
                    name="emailAddress"
                    onChange={(event) => setEmailAddress(event.target.value)}
                  />
                </FormControl>
                <FormControl mt="17px">
                  <FormLabel fontSize={"lg"}>Annee academique</FormLabel>
                  <Select
                    type={"date"}
                    name="anneeAcademiqueId"
                    value={anneeAcademiqueId}
                    placeholder="Annee academique"
                    onChange={(event) =>
                      setAnneeAcademiqueId(event.target.value)
                    }
                  >
                    {dataAnneeAcademique &&
                      dataAnneeAcademique.findAllAnnerAccademique.map(
                        (anneeAcademique, index) => (
                          <option value={anneeAcademique.id} key={index}>
                            {anneeAcademique.name}
                          </option>
                        )
                      )}
                  </Select>
                </FormControl>
                <FormControl mt="17px">
                  <FormLabel fontSize={"lg"}>Localisation</FormLabel>
                  <Input
                    type="text"
                    width={"400px"}
                    name="contry"
                    value={contry}
                    onChange={(event) => setContry(event.target.value)}
                  />
                </FormControl>
                <FormControl mt="17px">
                  <FormLabel fontSize={"lg"}>Devise</FormLabel>
                  <Input
                    type="text"
                    width={"400px"}
                    name="schoolCurrency"
                    value={schoolCurrency}
                    onChange={(event) => setSchoolCurrency(event.target.value)}
                  />
                </FormControl>
              </CardBody>
              <CardFooter mt="-20px" marginLeft={"auto"}>
                <Button colorScheme="blue" onClick={addShoolParameters}>
                  Mettre à jour
                </Button>
              </CardFooter>
            </Card>
          </Box>
          <Box display={{ md: "flex" }} flexDirection="column">
            <Box>
              <Card
                // align='center'
                width={"500px"}
                bg="white"
                mt="40px"
              >
                <CardHeader
                  fontWeight={"bold"}
                  p="0px"
                  mt="20px"
                  fontSize={"xl"}
                  textAlign={"center"}
                >
                  Profile de l'ecole
                </CardHeader>
                <CardBody>
                  <Box borderBottom={"1px"} mb={"10px"}>
                    Logo
                  </Box>
                  {dataSchoolParameter &&
                    dataSchoolParameter?.findAllparameters.map(
                      (parameter, index) => (
                        <Flex
                          direction={"column"}
                          gap={5}
                          mt={"20px"}
                          ml={"10px"}
                          key={index}
                        >
                          <Box display={{ md: "flex" }} gap={3}>
                            <Text fontWeight={"bold"}>Nom :</Text>
                            <Text>{parameter.name}</Text>
                          </Box>
                          <Box display={{ md: "flex" }} gap={3}>
                            <Text fontWeight={"bold"}>Telephone :</Text>
                            <Text>{parameter.phoneNumber}</Text>
                          </Box>
                          <Box display={{ md: "flex" }} gap={3}>
                            <Text fontWeight={"bold"}>Boite postale :</Text>
                            <Text>{parameter.postalBox}</Text>
                          </Box>
                          <Box display={{ md: "flex" }} gap={3}>
                            <Text fontWeight={"bold"}>Adresse Mail :</Text>
                            <Text>{parameter.emailAddress}</Text>
                          </Box>
                          <Box display={{ md: "flex" }} gap={3}>
                            <Text fontWeight={"bold"}>Annee academique :</Text>
                            <Text>{parameter.anneeAcademiqueName}</Text>
                          </Box>
                          <Box display={{ md: "flex" }} gap={3}>
                            <Text fontWeight={"bold"}>Localisaton:</Text>
                            <Text>{parameter.contry}</Text>
                          </Box>
                          <Box
                            display={{ md: "flex" }}
                            flexDirection={"column"}
                            gap={2}
                          >
                            <Text fontWeight={"bold"} textAlign={"center"}>
                              Devise{" "}
                            </Text>
                            <Text textAlign={"center"}>
                              {parameter.schoolCurrency}
                            </Text>
                          </Box>
                        </Flex>
                      )
                    )}
                </CardBody>
                {/* <CardFooter mt="-20px" marginLeft={"400px"}>
                                    <Box><Text textAlign={"center"}>Devise </Text></Box>
                                </CardFooter> */}
              </Card>
            </Box>
            {/* Bouton d'ajout de l'annee acADEMIQUE */}
            <Box mt="40px">
              <Card bg={"white"} pb={"20px"}>
                <Box display={{ md: "flex" }} ml={"40px"} mt={"15px"}>
                  <Heading mb={5} size="md" color="colors.quinzaine">
                    Annee academique
                  </Heading>
                  <Icon
                    as={IoIosAdd}
                    boxSize="30px"
                    color={"colors.greencolor"}
                    // _hover={bg:}
                    rounded="full"
                    ml={["10px", "10px", "10px"]}
                    _hover={{ background: "colors.redColor400" }}
                    onClick={onOpenns}
                    bg={"colors.bluecolor"}
                  />
                </Box>

                {/* TABLEAU DE LA LISTE DES ANNEES ACADEMIQUES*/}
                <Box
                  width={["400px", "400px", "400px"]}
                  border="1px"
                  borderColor={"GREEN"}
                  ml={"35px"}
                >
                  <TableContainer>
                    <Table size="sm" variant="striped">
                      {/* <Thead>
                                            <Tr>
                                            <Th>Nom</Th>
                                            </Tr>
                                        </Thead> */}
                      <Tbody>
                        {dataAnneeAcademique &&
                          dataAnneeAcademique.findAllAnnerAccademique.map(
                            (anneeAccademique, index) => (
                              <Tr key={index}>
                                <Td>{anneeAccademique.name}</Td>
                              </Tr>
                            )
                          )}
                      </Tbody>
                    </Table>
                  </TableContainer>
                </Box>
              </Card>
            </Box>
          </Box>
        </Box>

        {/* CREATION D'UNE ANNEE ACADEMIQUE */}
        <Box as="form">
          <AlertDialog
            motionPreset="slideInBottom"
            // leastDestructiveRef={cancelRef}
            onClose={onClosses}
            isOpen={isOpenns}
            isCentered
          >
            <AlertDialogOverlay />
            <AlertDialogContent>
              <AlertDialogHeader textAlign={"center"} mt={"10px"}>
                Ajoutez une anneee academique
              </AlertDialogHeader>
              <AlertDialogCloseButton />
              <AlertDialogBody>
                <Box>
                  <FormControl>
                    <FormLabel>Nom</FormLabel>
                    <Input
                      type={"text"}
                      name="name"
                      placeholder="Annee academique"
                      onChange={(event) => setName(event.target.value)}
                      value={name}
                    />
                  </FormControl>
                </Box>
              </AlertDialogBody>
              <AlertDialogFooter>
                <Button ref={cancelRef} onClick={onClosses} colorScheme="red">
                  annuler
                </Button>
                <Button colorScheme="green" ml={3} onClick={addAnneeAcademique}>
                  Creer
                </Button>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </Box>
      </Box>
    </DefaultLayout>
  );
};

export default generalSetting;

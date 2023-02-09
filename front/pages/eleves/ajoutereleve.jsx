import { useEffect, useState } from "react";
import {
  Progress,
  Box,
  ButtonGroup,
  Button,
  Flex,
  Input,
  Heading,
  Select,
  FormControl,
  FormLabel,
  useToast
} from "@chakra-ui/react";

import { useRouter } from "next/router";
import DefaultLayout from "../../components/layouts/DefaultLayout";
import { useMutation, useQuery } from "@apollo/client";
import { CREATE_STUDENT } from "../../graphql/Mutation";
import { GET_ALL_SECTION , GET_ALL_CYCLE, GET_ALL_CLASS, GET_ALL_Category_Eleve, GET_ALL_STUDENT } from "../../graphql/Queries";


const AjouterEleve = () => {

  const toast = useToast();
 const router = useRouter();
  const [matricule, setMatricule] = useState("");
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [classe, setClass] = useState("");
  const [dateOfBirth, setDateOfBirth] = useState("");
  const [sex, setSex] = useState("");
  const [adress, setAdress] = useState("");
  const [transport, setTransport] = useState(false);
  const [categoryStudent, setCategoryStudent] = useState("");
  const [cycle, setCycle] = useState("");
  const [section, setSection] = useState("");
  const [fatherFirstName, setFatherFirstName] = useState("");
  const [fatherLastName, setFatherLastName] = useState("");
  const [fatherProfession, setFatherProfession] = useState("");
  const [fatherPhoneNumber, setFatherPhoneNumber] = useState("");
  const [motherFirstName, setMotherFirstName] = useState("");
  const [motherLastName, setMotherLastName] = useState("");
  const [motherProfession, setMotherProfession] = useState("");
  const [motherPhoneNumber, setMotherPhoneNumber] = useState("");
  const [tutorFirstName, setTutorFirstName] = useState("");
  const [tutorLastName, setTutorLastName] = useState("");
  const [tutorProfession, setTutorProfession] = useState("");
  // const [emailDuTuteur, setEmailDuTuteur] = useState("");
  const [tutorPhoneNumber, setTutorPhoneNumber] = useState("");

  // const classes = ["SIL", "CP", "CE1", "CE2", "CM1", "CM2"];
  const [step, setStep] = useState(1);
  const [progress, setProgress] = useState(33.33);
  const [prenom, setPrenom] = useState("");
  const [age, setAge] = useState("");
  const {data:dataClass} = useQuery(GET_ALL_CLASS);
  const {data:dataCategoryStudent} = useQuery(GET_ALL_Category_Eleve);
  const [ createStudent, error] = useMutation(CREATE_STUDENT)
  const {data:dataSection} = useQuery(GET_ALL_SECTION);
  const {data:dataCycle} = useQuery(GET_ALL_CYCLE);
  // findAllstudents

  const HandleClick = async (event) => {
    event.preventDefault();
    
  const studentData =  await createStudent({ 
      variables:{
        student: { 
          matricule: matricule,
          firstname: firstname,
          lastname: lastname,
          classe: classe,
          dateOfBirth: dateOfBirth,
          sex: sex,
          adress: adress,
          transport: transport,
          categoryStudent: categoryStudent,
          fatherFirstName: fatherFirstName,
          fatherLastName: fatherLastName,
          fatherPhoneNumber: fatherPhoneNumber,
          fatherProfession: fatherProfession,
          motherFirstName: motherFirstName,
          motherLastName: motherLastName,
          motherPhoneNumber: motherPhoneNumber,
          motherProfession: motherProfession,
          tutorFirstName: tutorFirstName,
          tutorLastName: tutorLastName,
          tutorPhoneNumber: tutorPhoneNumber,
          tutorProfession: tutorProfession
        }
      },
      refetchQueries: [{
        query: GET_ALL_STUDENT
      }]
    })
    console.log(studentData)
    toast({
      title: "Creation d'un élève.",
      description: "Creation de l'élève réussit.",
      status: "success",
      duration: 3000,
      isClosable: true,
    });
    router.push("/eleves")
  }

  //newDtata.sethour(10)
  //strinf de l'element
  //newData(numberIn)

  useEffect(() => {
    console.log(dataClass?.findAllsalle)
    console.log(dataCategoryStudent?.findAllcategorieeleve)
    console.log(dataSection?.findAllsection)
    console.log(dataCycle?.findAllcycle)
  })

  // const handleSubmit = (e) => {
  //   e.preventDefault();
  //   const submitObject = {
  //     nom: firstname,
  //     prenom: lastname,
  //     salle: classe,
  //     dateDeNaissance: dateDeNaissance,
  //     sexe: sexe,
  //     adresse: adresse,
  //     transport: transport,
  //     nomDuPere: nomDuPere,
  //     prenomDuPere: prenomDuPere,
  //     professionDuPere: professionDuPere,
  //     emailDuPere: emailDuPere,
  //     numeroDuPere: numeroDuPere,
  //     nomDeLaMere: nomDeLaMere,
  //     prenomDeLaMere: prenomDeLaMere,
  //     professionDeLaMere: professionDeLaMere,
  //     emailDeLaMere: emailDeLaMere,
  //     numeroDeLaMere: numeroDeLaMere,
  //     nomDuTuteur: nomDuTuteur,
  //     prenomDuTuteur: prenomDuTuteur,
  //     professionDuTuteur: professionDuTuteur,
  //     emailDuTuteur: emailDuTuteur,
  //     numeroDuTuteur: numeroDuTuteur,
  //   };
  //   console.log(submitObject);
  // };


  return (
    <DefaultLayout>
      <Box pt="80px" w="full">
        <Heading textAlign="center" mb="7">
          Ajouter un élève
        </Heading>
        <Box
          borderWidth="1px"
          rounded="lg"
          shadow="1px 1px 3px rgba(0,0,0,0.3)"
          maxWidth={800}
          p={6}
          m="10px auto"
          as="form"
        >
          <Progress
            hasStripe
            value={progress}
            mb="5%"
            mx="5%"
            isAnimated
          ></Progress>
          {step === 1 ? (
            <Box mt={5}>
              <Heading size="md" p="2" background="pink.300" color="white">
                Informations de l'élève
              </Heading>
              <Box mx={2} mt="5">
                <Flex gap={3} flexWrap={["wrap", "wrap", "nowrap"]}>
                  <Input
                    placeholder="Nom de l'élève"
                    value={firstname}
                    onChange={(e) => setFirstname(e.target.value)}
                    name="nom"
                    variant="flushed"
                  />
                  <Input
                    placeholder="Prenom"
                    name="prenom"
                    value={lastname}
                    onChange={(e) => setLastname(e.target.value)}
                    variant="flushed"
                  />
                  <Select
                    placeholder="Selectionner la classe"
                    name="classe"
                    value={classe}
                    onChange={(e) => setClass(e.target.value)}
                    variant="flushed"
                  >
                    { 
                    dataClass && (
                      dataClass.findAllsalle.map((classe, index) => (
                          <option key={index}>
                            <option>{classe.name}</option>
                          </option>
                      ))
                    )}
                  </Select>
                </Flex>

                <Flex
                  gap={3}
                  mt="5"
                  align="end"
                  flexWrap={["wrap", "wrap", "nowrap"]}
                >
                  <FormControl>
                    <FormLabel>Date de naissance</FormLabel>
                    <Input
                      type="date"
                      name="dateOfBirth"
                      value={dateOfBirth}
                      onChange={(e) => setDateOfBirth(e.target.value)}
                      variant="flushed"
                    />
                  </FormControl>
                  <FormControl>
                    <FormLabel>Sexe</FormLabel>
                    <Select
                      name="sex"
                      value={sex}
                      onChange={(e) => setSex(e.target.value)}
                      variant="flushed"
                    >
                      <option>Masculin</option>
                      <option>Feminin</option>
                    </Select>
                  </FormControl>
                  <FormControl>
                    <FormLabel>Adresse</FormLabel>
                    <Input
                      type="text"
                      name="adress"
                      value={adress}
                      onChange={(e) => setAdress(e.target.value)}
                      variant="flushed"
                    />
                  </FormControl>
                </Flex>
                <Flex>
                  <FormControl>
                      <FormLabel>Matricule</FormLabel>
                      <Input
                        type="text"
                        name="matricule"
                        value={matricule}
                        onChange={(e) => setMatricule(e.target.value)}
                        variant="flushed"
                      />
                    </FormControl>
                  <Select
                    placeholder="Transport"
                    name="transport"
                    value={transport}
                    onChange={(e) => setTransport(e.target.value)}
                    variant="flushed"
                  >
                    <option>Oui</option>
                    <option>Non</option>
                  </Select>

                </Flex>
                <Flex>
                  <FormControl>
                      <FormLabel>Categrorie</FormLabel>
                      <Select
                        placeholder="Categorie"
                        name="categoryStudent"
                        value={categoryStudent}
                        onChange={(e) => setCategoryStudent(e.target.value)}
                        variant="flushed"
                      >
                        { 
                          dataCategoryStudent && (
                            dataCategoryStudent.findAllcategorieeleve.map((category, index) => (
                                <option key={index}>
                                  <option>{category.nom}</option>
                                </option>
                            ))
                        )}
                      </Select>
                    </FormControl>
                    <FormControl>
                      <FormLabel>Cycle</FormLabel>
                      <Select
                        placeholder="Cycle"
                        name="cycle"
                        value={cycle}
                        onChange={(e) => setCycle(e.target.value)}
                        variant="flushed"
                      >
                        { 
                          dataCycle && (
                            dataCycle.findAllcycle.map((cycle, index) => (
                                <option key={index}>
                                  <option>{cycle.name}</option>
                                </option>
                            ))
                        )}
                      </Select>
                    </FormControl>
                </Flex>
                <Flex>
                    <FormControl>
                      <FormLabel>Section</FormLabel>
                      <Select
                        placeholder="Section"
                        name="section"
                        value={section}
                        onChange={(e) => setSection(e.target.value)}
                        variant="flushed"
                      >
                        { 
                          dataSection && (
                            dataSection.findAllsection.map((section, index) => (
                                <option key={index}>
                                  <option>{section.name}</option>
                                </option>
                            ))
                        )}
                      </Select>
                    </FormControl>
                </Flex>
              </Box>
            </Box>
          ) : step === 2 ? (
            <Box mt={10}>
              <Heading size="md" p="2" background="purple.300" color="white">
                Informations du père
              </Heading>
              <Box mx={2} mt="5">
                <Flex gap={3} flexWrap={["wrap", "wrap", "nowrap"]}>
                  <Input
                    placeholder="Nom du père"
                    name="fatherFirstName"
                    value={fatherFirstName}
                    onChange={(e) => setFatherFirstName(e.target.value)}
                    variant="flushed"
                  />
                  <Input
                    placeholder="Prenom"
                    name="fatherLastName"
                    value={fatherLastName}
                    onChange={(e) => setFatherLastName(e.target.value)}
                    variant="flushed"
                  />
                 
                </Flex>
                <Flex gap={3}>
                  <Input
                      placeholder="Profession"
                      name="fatherProfession"
                      value={fatherProfession}
                      onChange={(e) => setFatherProfession(e.target.value)}
                      variant="flushed"
                    />
                  <Input
                    type="tel"
                    placeholder="Numero de téléphone"
                    name="fatherPhoneNumber"
                    value={fatherPhoneNumber}
                    onChange={(e) => setFatherPhoneNumber(e.target.value)}
                    variant="flushed"
                  />
                   
                </Flex>
              </Box>
              <Box mt={10}>
                <Heading size="md" p="2" background="green.300" color="white">
                  Informations de la mère
                </Heading>
                <Box mx={2} mt="5">
                  <Flex gap={3} flexWrap={["wrap", "wrap", "nowrap"]}>
                    <Input
                      placeholder="Nom de la mère"
                      name="motherFirstName"
                      value={motherFirstName}
                      onChange={(e) => setMotherFirstName(e.target.value)}
                      variant="flushed"
                    />
                    <Input
                      placeholder="Prenom"
                      name="motherLastName"
                      value={motherLastName}
                      onChange={(e) => setMotherLastName(e.target.value)}
                      variant="flushed"
                    />
                    <Input
                      placeholder="Profession"
                      name="motherProfession"
                      value={motherProfession}
                      onChange={(e) => setMotherProfession(e.target.value)}
                      variant="flushed"
                    />
                  </Flex>
                  <Flex gap={3}>
                    <Input
                      type="tel"
                      placeholder="Numero de téléphone"
                      name="motherPhoneNumber"
                      value={motherPhoneNumber}
                      onChange={(e) => setMotherPhoneNumber(e.target.value)}
                      variant="flushed"
                    />
                  </Flex>
                </Box>
              </Box>
            </Box>
          ) : (
            <Box mt={10}>
              <Heading size="md" p="2" background="orange.300" color="white">
                Informations du tuteur
              </Heading>
              <Box mx={2} mt="5">
                <Flex gap={3} flexWrap={["wrap", "wrap", "nowrap"]}>
                  <Input
                    placeholder="Nom du tuteur"
                    name="tutorFirstName"
                    value={tutorFirstName}
                    onChange={(e) => setTutorFirstName(e.target.value)}
                    variant="flushed"
                  />
                  <Input
                    placeholder="Prenom"
                    name="tutorLastName"
                    value={tutorLastName}
                    onChange={(e) => setTutorLastName(e.target.value)}
                    variant="flushed"
                  />
                  <Input
                    placeholder="Profession"
                    name="tutorProfession"
                    value={tutorProfession}
                    onChange={(e) => setTutorProfession(e.target.value)}
                    variant="flushed"
                  />
                </Flex>
                <Flex gap={3}>
                  <Input
                    type="tel"
                    placeholder="Numero de téléphone"
                    value={tutorPhoneNumber}
                    onChange={(e) => setTutorPhoneNumber(e.target.value)}
                    variant="flushed"
                  />
                </Flex>
              </Box>
            </Box>
          )}
          <ButtonGroup mt="5%" w="100%">
            <Flex w="100%" justifyContent="space-between">
              <Flex>
                <Button
                  onClick={() => {
                    setStep(step - 1);
                    setProgress(progress - 33.33);
                  }}
                  isDisabled={step === 1}
                  colorScheme="teal"
                  variant="solid"
                  w="7rem"
                  mr="5%"
                >
                  Back
                </Button>
                <Button
                  w="7rem"
                  isDisabled={step === 3}
                  onClick={() => {
                    setStep(step + 1);
                    if (step === 3) {
                      setProgress(100);
                    } else {
                      setProgress(progress + 33.33);
                    }
                  }}
                  colorScheme="teal"
                  variant="outline"
                >
                  Next
                </Button>
              </Flex>
              {step === 3 ? (
                <Button
                  w="7rem"
                  colorScheme="red"
                  variant="solid"
                  type="submit"
                  onClick={HandleClick}
                >
                  Submit
                </Button>
              ) : null}
            </Flex>
          </ButtonGroup>
        </Box>
      </Box>
    </DefaultLayout>
  );
};

export default AjouterEleve;

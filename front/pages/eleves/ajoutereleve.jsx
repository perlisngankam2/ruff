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
import { getStaticPropsTranslations } from "../../types/staticProps";
import { useTranslation } from "next-i18next";
import { GET_PERSONNEL_BY_USERID } from "../../graphql/Queries";
import { useAccount } from "../../contexts/account/Account";


import { 
  CREATE_STUDENT,
  UPDATE_STUDENT,
 } from "../../graphql/Mutation";
import { 
  GET_ALL_SECTION , 
  GET_ALL_CYCLE, 
  GET_ALL_CLASS, 
  GET_ALL_Category_Eleve, 
  GET_ALL_STUDENT ,
  GET_STUDENT_BY_ID
} 
  from "../../graphql/Queries";


const AjouterEleve = () => {

  const toast = useToast();
  const router = useRouter();
  const {t} = useTranslation();
  // const [matricule, setMatricule] = useState("");
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  // const [classe, setClass] = useState("");
  const [dateOfBirth, setDateOfBirth] = useState("");
  const [sex, setSex] = useState("");
  const [adress, setAdress] = useState("");
  const [transport, setTransport] = useState(false);
  const [categoryStudentId, setCategoryStudentId] = useState("");
  const [salleId, setSalleId] = useState("");
  // const [cycle, setCycle] = useState("");
  // const [section, setSection] = useState("");
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
  const{data: dataClass} = useQuery(GET_ALL_CLASS);
  const {data:dataCategoryStudent} = useQuery(GET_ALL_Category_Eleve);
  const [ createStudent, error] = useMutation(CREATE_STUDENT)
  const [updateStudent] = useMutation(UPDATE_STUDENT);
  const {data:dataSection} = useQuery(GET_ALL_SECTION);

  const { account, loaded } = useAccount();
  const { data: personnelData, called, loading } = useQuery(GET_PERSONNEL_BY_USERID,
     {
        variables:{ userid: account?.id }
    }
  )
  const {data:dataStudentById} = useQuery(GET_STUDENT_BY_ID,
    {
      variables:{id: router.query.id}
    }
  );

  // const InitialAndYear = "GBA23";


  // findAllstudents
const [student, setStudent] = useState({
  salleId: "",
  birthPlace: "",
  firstname: "",
  lastname: "",
  dateOfBirth: 0,
  birthPlace: "",
  sex: "",
  adress: "",
  // transport: "",
  categoryStudentId: "",
  fatherFirstName: "",
  fatherLastName: "",
  fatherPhoneNumber: "",
  fatherProfession: "",
  motherFirstName: "",
  motherLastName: "",
  motherPhoneNumber: "",
  motherProfession: "",
  tutorFirstName: "",
  tutorLastName: "",
  tutorPhoneNumber: "",
  tutorProfession: ""
})


useEffect(() => {
  console.log(dataClass?.findAllsalle);
  console.log(dataCategoryStudent?.findAllcategorieeleve)
  if(router.query.id){
    const dataStudentEdit = dataStudentById?.findOnestudent
    if(dataStudentEdit){
      setStudent ({
      salleId: dataStudentEdit.salleId,
      matricule: dataStudentEdit.matricule,
      firstname: dataStudentEdit.firstname,
      lastname: dataStudentEdit.lastname,
      dateOfBirth: dataStudentEdit.dateOfBirth,
      sex: dataStudentEdit.sex,
      adress: dataStudentEdit.adress,
      categoryStudentId: dataStudentEdit.categoryStudentId,
      fatherFirstName: dataStudentEdit.fatherFirstName,
      fatherLastName: dataStudentEdit.fatherLastName,
      fatherPhoneNumber: dataStudentEdit.fatherPhoneNumber,
      fatherProfession: dataStudentEdit.fatherProfession,
      motherFirstName: dataStudentEdit.motherFirstName,
      motherLastName: dataStudentEdit.motherLastName,
      motherPhoneNumber: dataStudentEdit.motherPhoneNumber,
      motherProfession: dataStudentEdit.motherProfession,
      tutorFirstName: dataStudentEdit.tutorFirstName,
      tutorLastName: dataStudentEdit.tutorLastName,
      tutorPhoneNumber: dataStudentEdit.tutorPhoneNumber,
      tutorProfession: dataStudentEdit.tutorProfession
    })
    }
  }
  // console.log(dataSection?.findAllsection)
  // console.log(dataCycle?.findAllcycle)
}, [dataStudentById])

const randomString = Math.random().toString(36).substring(10).toUpperCase();
const matricule = `GSBAB23${randomString}`;

  const HandleClick = async (event) => {
    console.log(student.birthPlace);
    
    console.log(typeof(student.dateOfBirth));
    
    event.preventDefault();
    if(!router.query.id){
    await createStudent({ 
      variables:{
        student: { 
          matricule: matricule,
          firstname: student.firstname,
          lastname: student.lastname,
          // classe: classe,
          dateOfBirth: student.dateOfBirth,
          birthPlace: student.birthPlace,
          sex: student.sex,
          adress: student.adress,
          categoryStudentId: student.categoryStudentId,
          salleId: student.salleId,
          fatherFirstName: student.fatherFirstName,
          fatherLastName:student.fatherLastName,
          fatherPhoneNumber: student.fatherPhoneNumber,
          fatherProfession: student.fatherProfession,
          motherFirstName: student.motherFirstName,
          motherLastName: student.motherLastName,
          motherPhoneNumber: student.motherPhoneNumber,
          motherProfession: student.motherProfession,
          tutorFirstName: student.tutorFirstName,
          tutorLastName: student.tutorLastName,
          tutorPhoneNumber: student.tutorPhoneNumber,
          tutorProfession: student.tutorProfession
        }
      },
      refetchQueries: [{
        query: GET_ALL_STUDENT
      }]
    })
    toast({
      title: "Creation d'un élève.",
      description: "Creation de l'élève réussit.",
      status: "success",
      duration: 3000,
      isClosable: true,
    })
  }else{
    await updateStudent({
      variables:{
        id: router.query.id,
        input: { 
          matricule: student.matricule,
          firstname: student.firstname,
          lastname: student.lastname,
          // classe: classe,
          dateOfBirth: student.dateOfBirth,
          birthPlace: student.birthPlace,
          sex: student.sex,
          adress: student.adress,
          categoryStudentId: student.categoryStudentId,
          salleId: student.salleId,
          fatherFirstName: student.fatherFirstName,
          fatherLastName:student.fatherLastName,
          fatherPhoneNumber: student.fatherPhoneNumber,
          fatherProfession: student.fatherProfession,
          motherFirstName: student.motherFirstName,
          motherLastName: student.motherLastName,
          motherPhoneNumber: student.motherPhoneNumber,
          motherProfession: student.motherProfession,
          tutorFirstName: student.tutorFirstName,
          tutorLastName: student.tutorLastName,
          tutorPhoneNumber: student.tutorPhoneNumber,
          tutorProfession: student.tutorProfession
        }
      },
      refetchQueries: [{
        query: GET_ALL_STUDENT
      }]
    })
    toast({
      title: "Mise a jour d'un élève.",
      description: "Mise a jour de l'eleve reussi.",
      status: "success",
      duration: 3000,
      isClosable: true,
    })
  }
    router.push("/eleves")
    
    // setMatricule("");
    setFirstname("");
    setLastname("");
   // const [classe, setClass] = useState("");
    setDateOfBirth("");
    setSex("");
    setAdress("");
    // categoryStudentId("");
    setSalleId("");
    setFatherFirstName("");
    setFatherLastName("");
    setFatherProfession("");
    setFatherPhoneNumber("");
    setMotherFirstName("");
    setMotherLastName("");
    setMotherProfession("");
    setMotherPhoneNumber("");
    setTutorFirstName("");
    setTutorLastName("");
    setTutorProfession("");
   setTutorPhoneNumber("");

  }

  //newDtata.sethour(10)
  //strinf de l'element
  //newData(numberIn)


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
          bg={"white"}
        >
          <Progress
            hasStripe
            value={progress}
            mb="5%"
            mx="5%"
            isAnimated
          ></Progress>
          {step === 1 ? (
            <Box mt={5} >
              <Heading 
                size="md" 
                p="2" 
                background="pink.300" 
                color="white"
              >
                Informations de l'élève
              </Heading>
              <Box 
                mx={2} 
                mt="5"
              >
                <Flex 
                  gap={5} 
                  flexWrap={["wrap", "wrap", "nowrap"]}
                >
                  <FormControl>
                      <FormLabel mb="-5px">Nom</FormLabel>
                    <Input
                      // placeholder="Nom de l'élève"
                      isRequired
                      value={student.firstname}
                      onChange={(e) => setStudent({...student, firstname:e.target.value})}
                      name="firstname"
                      variant="flushed"
                      // mt={"-25px"}
                    />
                  </FormControl>
                    <FormControl> 
                      <FormLabel mb="-5px">Prenom</FormLabel>
                    <Input
                      // placeholder="Prenom"
                      isRequired
                      name="firstname"
                      value={student.lastname}
                      onChange={(e) => setStudent({...student, lastname:e.target.value})}
                      variant="flushed"

                    />
                  </FormControl>
                  {/* <Select
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
                  </Select> */}
                </Flex>

                <Flex
                  gap={5}
                  mt="8"
                  align="end"
                  flexWrap={["wrap", "wrap", "nowrap"]}
                >
                  <FormControl>
                    <FormLabel>Date de naissance</FormLabel>
                    <Input
                      type="date"
                      name="dateOfBirth"
                      value={student.dateOfBirth}
                      onChange={(e) => setStudent({...student, dateOfBirth:e.target.value})}
                      variant="flushed"
                      isRequired
                    />
                  </FormControl>
                   <FormControl>
                      <FormLabel mb="-5px">Lieu de naissaonce</FormLabel>
                      <Input
                        type="text"
                        name="birthPlace"
                        value={student.birthPlace}
                        onChange={(e) => setStudent({...student, birthPlace:e.target.value})}
                        variant="flushed"
                        isRequired
                      />
                    </FormControl>
               
                </Flex>
                <Flex 
                gap={5}
                mt="8"
                >
                <FormControl>
                    <FormLabel >Adresse</FormLabel>
                    <Input
                      type="text"
                      name="adress"
                      value={student.adress}
                      onChange={(e) => setStudent({...student, adress:e.target.value})}
                      variant="flushed"
                    />
                  </FormControl>
                  <FormControl>
                    <FormLabel>Sexe</FormLabel>
                    <Select
                      name="sex"
                      value={student.sex}
                      onChange={(e) => setStudent({...student, sex:e.target.value})}
                      variant="flushed"
                      placeholder="Sexe"
                      isRequired
                    >
                      <option>Masculin</option>
                      <option>Feminin</option>
                    </Select>
                  </FormControl>
                
                </Flex>
                <Flex 
                  gap={5} 
                  mt="8"
                 >
                  {/* <FormControl>
                        <FormLabel>Transport</FormLabel>
                        <Select
                          placeholder="Transport"
                          name="transport"
                          value={student.transport}
                          onChange={(e) => setStudent({...student, transport:e.target.value})}
                          variant="flushed"
                    >
                      <option>Oui</option>
                      <option>Non</option>
                    </Select>
                  </FormControl> */}
                    <FormControl>
                  <FormLabel>Classe</FormLabel>
                  <Select
                    placeholder="Classe"
                    name="salleId"
                    value={student.salleId}
                    onChange={(e) => setStudent({...student, salleId:e.target.value})}
                    variant="flushed"
                    isRequired
                  >
                    { 
                      dataClass && (
                        dataClass.findAllsalle.map((classe, index) => (
                            <option 
                              selected={student.salleId == classe.id? "selected": ""}
                             value={classe.id} key={index}
                            >
                              {classe.name}
                            </option>
                        ))
                    )}
                  </Select>
                </FormControl>
                  <FormControl>
                      <FormLabel>Categrorie</FormLabel>
                      <Select
                        placeholder="Categorie"
                        name="categoryStudentId"
                        value={student.categoryStudentId}
                        onChange={(e) => setStudent({...student, categoryStudentId:e.target.value})}
                        variant="flushed"
                      >
                        { 
                          dataCategoryStudent && (
                            dataCategoryStudent.findAllcategorieeleve.map((categoryStudent, index) => (
                                <option 
                                selected={student.categoryStudentId == categoryStudent.id? "selected": ""}
                                  value={categoryStudent.id }key={index}
                                >
                                  {categoryStudent.nom}
                                </option>
                            ))
                        )}
                      </Select>
                    </FormControl>
                {/* </Flex>
                <Flex mt={"20px"}>
               */}
                </Flex>
                {/* <Flex>
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
                </Flex> */}
              </Box>
            </Box>
          ) : step === 2 ? (
            <Box mt={10}>
              <Heading 
                size="md" 
                p="2" 
                background="purple.300" 
                color="white"
              >
                Informations du père
              </Heading>
              <Box mx={2} mt="5">
                <Flex 
                  gap={3} 
                  flexWrap={["wrap", "wrap", "nowrap"]}
                >
                    <FormControl >
                      <FormLabel mb="-6px">Nom</FormLabel>
                        <Input
                          // placeholder="Nom du père"
                          name="fatherFirstName"
                          value={student.fatherFirstName}
                          onChange={(e) => setStudent({...student, fatherFirstName:e.target.value})}
                          variant="flushed"
                        />
                    </FormControl>
                    <FormControl> 
                      <FormLabel mb="-6px">Prenom</FormLabel>
                      <Input
                        // placeholder="Prenom"
                        name="fatherLastName"
                        value={student.fatherLastName}
                        onChange={(e) => setStudent({...student, fatherLastName:e.target.value})}
                        variant="flushed"
                      />
                    </FormControl>
                 
                </Flex>
                <Flex gap={3}>
                  <FormControl> 
                      <FormLabel 
                        mb="-6px"
                        mt={"15px"}

                      >
                        Profession
                      </FormLabel>
                    <Input
                      // placeholder="Profession"
                      name="fatherProfession"
                      value={student.fatherProfession}
                      onChange={(e) => setStudent({...student, fatherProfession:e.target.value})}
                      variant="flushed"
                    />
                  </FormControl>
                  <FormControl> 
                      <FormLabel 
                       mb="-6px"
                       mt={"15px"}
                      >
                        Numero de téléphone
                      </FormLabel>
                    <Input
                      type="tel"
                      // placeholder="Numero de téléphone"
                      name="fatherPhoneNumber"
                      value={student.fatherPhoneNumber}
                      onChange={(e) => setStudent({...student, fatherPhoneNumber:e.target.value})}
                      variant="flushed"
                    />
                   </FormControl>
                </Flex>
              </Box>
              <Box mt={8}>
                <Heading 
                  size="md" 
                  p="2" 
                  background="green.300" 
                  color="white"
                >
                  Informations de la mère
                </Heading>
                <Box mx={2} mt="2">
                  <Flex 
                    gap={3} 
                    flexWrap={["wrap", "wrap", "nowrap"]}
                  >
                    <FormControl> 
                        <FormLabel 
                        mb="-6px"
                        mt={"15px"}
                        >
                          Nom
                        </FormLabel>
                      <Input
                        // placeholder="Nom de la mère"
                        name="motherFirstName"
                        value={student.motherFirstName}
                        onChange={(e) => setStudent({...student, motherFirstName:e.target.value})}
                        variant="flushed"
                      />
                    </FormControl>
                    <FormControl> 
                      <FormLabel 
                       mb="-6px"
                       mt={"15px"}
                      >
                        Prenom
                      </FormLabel>
                      <Input
                        // placeholder="Prenom"
                        name="motherLastName"
                        value={student.motherLastName}
                        onChange={(e) => setStudent({...student, motherLastName:e.target.value})}
                        variant="flushed"
                      />
                    </FormControl>
                  </Flex>
                  <Flex gap={3}>
                    <FormControl> 
                        <FormLabel 
                          mb="-6px"
                          mt={"15px"}
                        >
                          Numero de téléphone
                        </FormLabel>
                      <Input
                        type="tel"
                        // placeholder="Numero de téléphone"
                        name="motherPhoneNumber"
                        value={student.motherPhoneNumber}
                        onChange={(e) => setStudent({...student, motherPhoneNumber:e.target.value})}
                        variant="flushed"
                      />
                    </FormControl>
                    <FormControl> 
                      <FormLabel 
                       mb="-6px"
                       mt={"15px"}
                      >
                        Profession
                      </FormLabel>
                      <Input
                        // placeholder="Profession"
                        name="motherProfession"
                        value={student.motherProfession}
                        onChange={(e) => setStudent({...student, motherProfession:e.target.value})}
                        variant="flushed"
                      />
                    </FormControl>
                  </Flex>
                </Box>
              </Box>
            </Box>
          ) : (
            <Box mt={10}>
              <Heading 
                size="md"
                p="2" background="orange.300" 
                color="white"
              >
                Informations du tuteur
              </Heading>
              <Box 
                mx={2} 
                mt="5"
              >
                <Flex 
                  gap={3} 
                  flexWrap={["wrap", "wrap", "nowrap"]}
                >
                  <FormControl> 
                    <FormLabel 
                      mb="-6px"
                      mt={"15px"}
                    >
                      Nom
                    </FormLabel>
                    <Input
                      // placeholder="Nom du tuteur"
                      name="tutorFirstName"
                      value={student.tutorFirstName}
                      onChange={(e) => setStudent({...student, tutorFirstName:e.target.value})}
                      variant="flushed"
                    />
                  </FormControl>
                  <FormControl> 
                    <FormLabel 
                      mb="-6px"
                      mt={"15px"}
                    >
                      Prenom
                    </FormLabel>
                    <Input
                      // placeholder="Prenom"
                      name="tutorLastName"
                      value={student.tutorLastName}
                      onChange={(e) => setStudent({...student, tutorLastName:e.target.value})}
                      variant="flushed"
                    />
                  </FormControl>
                </Flex>
                <Flex gap={3}>
                <FormControl> 
                      <FormLabel 
                       mb="-6px"
                       mt={"15px"}
                      >
                        Profession
                      </FormLabel>
                    <Input
                      // placeholder="Profession"
                      name="tutorProfession"
                      value={student.tutorProfession}
                      onChange={(e) => setStudent({...student, tutorProfession:e.target.value})}
                      variant="flushed"
                    />
                  </FormControl>
                  <FormControl> 
                    <FormLabel 
                      mb="-6px"
                      mt={"15px"}
                    >
                      Numero de téléphone
                    </FormLabel>
                    <Input
                      type="tel"
                      // placeholder="Numero de téléphone"
                      value={student.tutorPhoneNumber}
                      onChange={(e) => setStudent({...student, tutorPhoneNumber:e.target.value})}
                      variant="flushed"
                    />
                  </FormControl>
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
                  isDisabled={personnelData?.getpersonnelbyaccount.fonction==="principal" || 
                  personnelData?.getpersonnelbyaccount.fonction==="manager"
                  }
                >
                  Enregistrer
                </Button>
              ) : null}
            </Flex>
          </ButtonGroup>
        </Box>
      </Box>
    </DefaultLayout>
  );
};

export async function getStaticProps({ locale }) {
  return {
    props: {
      ...(await getStaticPropsTranslations(locale)),
      // Will be passed to the page component as props
    },
  };
}

export default AjouterEleve;

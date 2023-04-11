import {
  Box,
  Heading,
  ButtonGroup,
  Button,
  Flex,
  FormControl,
  FormLabel,
  Input,
  Select,
  Text,
  Center,
  useToast
} from "@chakra-ui/react";

import DefaultLayout from "../../components/layouts/DefaultLayout";
// import useTranslation from 'next-translate/useTranslation';
import {useTranslation } from "next-i18next";
import { useState, useRef, use, useEffect } from "react";
import { useRouter } from "next/router";
import {  useMutation, useQuery } from "@apollo/client";
import {  CREATE_PERSONNEL} from "../../graphql/Mutation"; 
import { GET_ALL_PERSONNELS, GET_ALL_Category_Personnel } from "../../graphql/Queries";
import { GET_ALL_USER } from "../../graphql/Queries";

const AjouterPersonnel = () => {

   const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [dateOfBirth, setDateOfBirth] = useState("");
    const [dateOfStartWork, setDateOfStartWork] = useState("");
    const [sexe, setSexe]= useState("");
    const [status, setStatus] = useState("");
    const [phoneNumber, setPhoneNumber] = useState("")
    const [childNumber, setChildNumber] = useState("");
    // const [salaire, setSalaire] = useState("");
    const [situationMatrimonial, setSituationMatrimonial] = useState("");
    // const [salaire, setSalaire] = useState("");
    const [categoryPersonnelId, setCategoryPersonnelId] = useState("");
    const[userID, setUserID] = useState("");
    // const [matricule, setMatricule] = useState("");
    const [fonction, setFonction] = useState("");
    const [ filteredData, setFilteredData]=useState([])
    // const [id, setMatricule] = useState("");

    // const dateOfBirthRef = useRef()
    // const dateOfStartWorkRef = useRef()
    // const sexeRef = useRef()
    // const statusRef = useRef()
    // const situationMatrimonialRef = useRef()
    // const childNumberRef = useRef()
  const toast = useToast();
  const { t } = useTranslation('common');
  const router = useRouter();
  const {data} = useQuery(GET_ALL_USER);

//propriete manquante//
  // firstName
// lastName
// phoneNumber
// teacherCategory
// salaire


  // const [data, setData] = useState({
  //   firstName: "",
  //   lastName: "",
  //   dateOfBirth: "",
  //   dateOfStartWork: "",
  //   sexe: "",
  //   status: "",
  //   phoneNumber: "",
  //   situationMatrimonial: "",
  //   salaire: "",
  //   teacherCategory: "",
  //   childNumber: "",
  // });

  

  const [isPermanent, setIsPermanent] = useState(false);
  const [createPersonnel, {error}] = useMutation(CREATE_PERSONNEL);
  const {data:dataCategoryPersonnel} = useQuery(GET_ALL_Category_Personnel);
  // const handleSubmit = (event) => {
  //   event.preventDefault();
  //   // router.push("/personnel");
  //   const data = { 
  //     // firstName:firstName,
  //     // lastName:lastName,
  //    dateOfBirth:dateOfBirth,
  //     dateOfStartWork:dateOfBirth,
  //     sexe:sexe,
  //     status:status,
  //     // phoneNumber:phoneNumber,
  //     situationMatrimonial: situationMatrimonial,
  //   //  teacherCategory: teacherCategory,
  //     childNumber: childNumber
  //  }
  //  console.log(data)
  //   console.log("jj");
  // };

  let input;
  const handleChange = (e) => {
    const newFilter =   dataPersonnel.findAllpersonnel
        .filter((personnel) =>{
        return  (personnel.firstName.toLowerCase().includes (searchName.toLowerCase()) 
        || personnel.lastName.toLowerCase().includes (searchName.toLowerCase()) 
        || personnel.fonction.toLowerCase().includes (searchName.toLowerCase()))
        
    });
        setFilteredData(newFilter);
  };

  const  handleSubmit = async (event, value) => {
     event.preventDefault();
     console.log('hh');
    console.log(firstName);
    console.log(lastName);
    console.log(phoneNumber);
    console.log(categoryPersonnelId);
    console.log(sexe);
    console.log(status)
     console.log(dateOfBirth);
     console.log(dateOfStartWork);
     console.log(fonction);
     console.log(situationMatrimonial);
     console.log(childNumber);
     console.log(userID)

    const data = await createPersonnel({
      variables: {
        createPersonnelUser: {
          id: "",
          userID: userID,
          firstName: firstName,
          lastName : lastName,
          phoneNumber: phoneNumber,
          // salary: parseInt(salaire),
          categoryPersonnelId: categoryPersonnelId,
          status: status,
          situationMatrimonial: situationMatrimonial,
          sexe: sexe,
          fonction: fonction,
          childNumber: parseInt(childNumber),
          dateOfBirth: dateOfBirth,
          dateOfStartWork: dateOfStartWork,
        },
        refetchQueries:[{
          query: GET_ALL_PERSONNELS
        }]
      }}, 
      console.log('hh')
      ) 
      console.log(data)
      toast({
        title: "Creation d'un personnel.",
        description: "Creation du personnel réussit.",
        status: "success",
        duration: 3000,
        isClosable: true,
      });
      router.push("/personnel")
      setFirstName("");
      setLastName("");
      setDateOfBirth("");
      setDateOfStartWork("");
      setFonction("");
      setPhoneNumber("");
      setSexe("");
      setSituationMatrimonial("");
      setStatus("");
      setChildNumber("");
      setCategoryPersonnelId("");
      setUserID("");
  }

  useEffect(() =>{
    console.log(dataCategoryPersonnel?.findAllcategoriepersonnel);
  })

  return (
    <DefaultLayout>
      <Box background="colors.tertiary" width={"100%"}>
        <Center>
          <Box
            // borderWidth="1px"
            borderColor={"gray.400"}
            width={["700px", "700px", "900px"]}
            p={6}
            // ml={'20px'}
            mt="100px"
            backgroundColor={"white"}
            rounded="md"
          >
            <Box as={"form"} 
             onSubmit={handleSubmit}
            >
              <Box></Box>
              <Box>
                <Heading textAlign={"center"} mb="30px">
                  {t('pages.personnel.ajouterpersonnel.heading')}
                </Heading>
              </Box>
              <Box display={{md:"flex"}} >
                <FormControl mr="5%">
                  <FormLabel fontWeight={"normal"}>
                    {t('pages.personnel.ajouterpersonnel.firstName')}
                  </FormLabel>
                  <Input 
                    type="text"
                    id="firstName"
                    name="firstName"
                    placeholder="Nom"
                    borderColor="purple.100"
                    onChange={e => setFirstName(e.target.value)}
                    value={firstName}
                  /> 
                </FormControl>
                 <FormControl>
                  <FormLabel fontWeight={"normal"}>
                    {t('pages.personnel.ajouterpersonnel.lastName')}
                  </FormLabel>
                  <Input
                    type="text"
                    id="lastName"
                    name="lastName"
                    placeholder="Prénom"
                    borderColor="purple.100"
                    onChange={e => setLastName(e.target.value)}
                    value={lastName}
                  /> 
               </FormControl>
              </Box>
              <FormControl mt="2%">
                <FormLabel fontWeight={"normal"}>
                {t('pages.personnel.gender')}
                </FormLabel>
                <Select
                  id="sexe"
                  name="sexe"
                  placeholder="Sexe"
                  borderColor="purple.100"
                  onChange={e => setSexe(e.target.value)}
                  value={sexe}
                  // ref={sexeRef}
                  ref={node => {input = node;}}
                >
                  <option>Homme</option>
                  <option>Femme</option>
                  <option>Autres</option>
                </Select>
              </FormControl>
              <Box display={{md:"flex"}} mt="2%">
                <FormControl mr="5%">
                  <FormLabel fontWeight={"normal"}>
                    {/* {t('components.school.Register.birthDate')} */}
                    Date de naissance
                  </FormLabel>
                  <Input
                    type="date"
                    id="dateOfBirth"
                    name="dateOfBirth"
                    placeholder="Date de naissance"
                    borderColor="purple.100"
                    onChange={e => setDateOfBirth(e.target.value)}
                    value={dateOfBirth}
                    // ref={dateOfBirthRef}
                    ref={node => {input = node;
                    }}
                  />
                </FormControl>
                <FormControl>
                  <FormLabel fontWeight={"normal"}>
                    {/* {t('components.school.Register.institute')} */}
                    Date de prise de fonction
                  </FormLabel>
                  <Input
                    type="date"
                    id="dateOfStartWork"
                    name="dateOfStartWork"
                    placeholder="Date de prise de fonction"
                    borderColor="purple.100"
                    onChange={e => setDateOfStartWork(e.target.value)}
                    value={dateOfStartWork}
                    // ref={dateOfStartWorkRef}
                    ref={node => {input = node; }}
                  />
                </FormControl>
              </Box>
              <Box display={{md:"flex"}} mt="2%">
                <FormControl mr="5%">
                  <FormLabel fontWeight={"normal"}>
                    {/* {t('components.school.Register.birthDate')} */}
                    Category
                  </FormLabel>
                  <Select
                    type="text"
                    name="categoryPersonnelId"
                    placeholder="Categorie du personnel"
                    borderColor="purple.100"
                    onChange={e => setCategoryPersonnelId(e.target.value)}
                    value={categoryPersonnelId}
                    // ref={dateOfBirthRef}
                    ref={node => {
                      input = node;
                    }}
                  >
                    { 
                      dataCategoryPersonnel && (
                        dataCategoryPersonnel.findAllcategoriepersonnel.map((categoryPersonnel, index) => (
                            <option value={categoryPersonnel.id} key={index}>
                              {categoryPersonnel.nom}
                            </option>
                        ))
                      )}

                  </Select>
                </FormControl>
                <FormControl>
                  <FormLabel fontWeight={"normal"}>
                    {/* {t('components.school.Register.institute')} */}
                   Fonction
                  </FormLabel>
                  <Select
                    name="fonction"
                    placeholder="Fonction"
                    borderColor="purple.100"
                    onChange={e => setFonction(e.target.value)}
                    value={fonction}
                    // ref={dateOfStartWorkRef}
                    ref={node => {
                      input = node;
                    }}
                  >
                    <option>fondateur</option>
                    <option>principal</option>
                    <option>econome</option>
                    <option>enseignant</option>
                    <option>gestionnaire</option>
                  </Select>
                </FormControl>
              </Box>
              {/* <Flex mt="2%"> */}
                {/* <FormControl>
                  <FormLabel> */}
                    {/* {t('components.school.Register.gender')} */}
                    {/* Category du personnel
                  </FormLabel> */}
                  {/* <Select
                    id="teacherCategory"
                    name="teacherCategory"
                    placeholder="Category du personnel"
                    borderColor="purple.100"
                    onChange={e => setTeacherCategory(e.target.value)}
                    value={teacherCategory} */}
                    {/* // width={'403px'}
                  // >
                  //   <option>Principal</option>
                  //   <option>Econome</option>
                  //   <option>Enseignant</option>
                  //   <option>Surveillant</option>
                  // </Select> */}
                {/* </FormControl>
              </Flex> */}
              <Box  display={{md:"flex"}}mt="2%">
                <FormControl mr="5%">
                  <FormLabel fontWeight={"normal"}> 
                     {/* {t('components.school.Register.maritalStatus')} */}
                     Status
                  </FormLabel>
                  <Select
                    id="status"
                    name="status"
                    placeholder="Status "
                    borderColor="purple.100"
                    onChange={e => setStatus(e.target.value)}
                    value={status}
                    width={["649px", "649px", "403px"]}
                    // ref={statusRef}
                    ref={node => {
                      input = node;
                    }}
                 > 
                    {/* {/* {statuses.map((status, index) => (
                      <option key={index}>{status}</option> */}
                    <option>PERMANENT</option>
                    <option>VACATAIRE</option>
                  </Select>
                 </FormControl> 
                <FormControl>
                  <FormLabel fontWeight={"normal"}> 
                    {/* {t('components.school.Register.phoneNumber')} */}
                     Telephone
                  </FormLabel>
                  <Input
                    type='tel'
                    id="phoneNumber"
                    name="phoneNumber"
                    placeholder="Numero de téléphone"
                    borderColor="purple.100"
                    onChange={e => setPhoneNumber(e.target.value)}
                    value={phoneNumber}
                  /> 
                 </FormControl> 
              </Box> 
              {/* <Box>
                {isPermanent && (
                  <FormControl mt="2%">
                    <FormLabel fontWeight={"normal"}> */}
                      {/* {t('components.school.Register.salary')} */}
                      {/* Salaire
                    </FormLabel>
                    <Input
                      id="salaire"
                      type="number"
                      name="salaire"
                      placeholder="Salaire"
                      borderColor="purple.100"
                      onChange={e => setSalaire(e.target.value)}

                      value={salaire}
                    /> */}
                  {/* </FormControl>
                )}
              </Box> */}
              <Box display={{md:"flex"}} mt="2%">

                <FormControl mr="5%">
                  <FormLabel fontWeight={"normal"}>
                    {/* {t('components.school.Register.birthDate')} */}
                    Nombre d'enfant
                  </FormLabel>
                  <Input
                    type="text"
                    id="childNumber"
                    name="childNumber"
                    placeholder="Nomber d'enfant"
                    borderColor="purple.100"
                    onChange={e => setChildNumber(e.target.value)}
                    value={childNumber}
                    // ref={dateOfBirthRef}
                    // ref={node => {input = node;
                    // }}
                  />
                </FormControl>
                <FormControl>
                  <FormLabel fontWeight={"normal"}>
                    {/* {t('components.school.Register.maritalStatus')} */}
                    Status matrimonial
                  </FormLabel>
                  <Select
                    id="situationMatrimonial"
                    name="situationMatrimonial"
                    placeholder="Status matrimonial"
                    borderColor="purple.100"
                    onChange={e => setSituationMatrimonial(e.target.value)}
                    value={situationMatrimonial}
                    width={["649px", "649px", "403px"]}
                    // ref={situationMatrimonialRef}
                    ref={node => {input = node;}}
                  >
                    <option>Celibataire</option>
                    <option>Marie</option>
                    <option>Marie(e)</option>
                    <option>Autres</option>
                  </Select>
                </FormControl>
              </Box>
              <Box display={{md:"flex"}} mt="2%">
                <FormControl>
                    <FormLabel fontWeight={"normal"}>Compte Associé</FormLabel>
                    <Select 
                        name="userID"
                        placeholder="Compte"
                        onChange = {(event) => setUserID(event.target.value)}
                        value={userID}
                    >
                        {data && (
                            data.findAlluser.map((user, index) => ( 
                                <option value={user?.id} key={index}>
                                    {user.email}
                                    {/* {console.log(section.id)} */}
                                </option>
                            ))
                        )}
                    </Select>
                  </FormControl>
              </Box>
              <ButtonGroup mt="3%" w="100%">
                <Flex w="100%" justifyContent="space-between">
                  <Flex></Flex>
                  <Button
                    type="submit"
                    w="7rem"
                    background="colors.quaternary"
                    variant="solid"
                    color="white"
                  >
                    Submit
                  </Button>
                </Flex>
              </ButtonGroup>
            </Box>
          </Box>
        </Center>
      </Box>
    </DefaultLayout>
  );
};

export default AjouterPersonnel;

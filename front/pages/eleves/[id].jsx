import { 
  Box, 
  AlertDialog,
  AlertDialogBody,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogContent,
  AlertDialogOverlay,
  useDisclosure,
  Select,
  Spacing,
  FormControl,
  FormLabel,
  extendTheme, 
  HStack ,
  Heading , 
  Input, 
  Stack , 
  Checkbox,
  Center , 
  Flex , 
  Text , 
  Card ,
  CardBody ,
  VStack ,
  CardFooter ,
  CardHeader,
  Avatar , 
  IconButton , 
  BsThreeDotsVertical ,
  BiLike , 
  BiChat ,
  Table,
  Thead,
  Tbody,
  Tfoot,
  Tr,
  Th,
  SimpleGrid,
  Td,
  TableCaption,
  TableContainer,
  color,
  Button,
  Hide,
  Spacer,
  br,
  Icon,
  useToast
} from "@chakra-ui/react";
// import { Select as Selects} from 'chakra-react-select';

import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import DefaultLayout from "../../components/layouts/DefaultLayout";
import { GiBoxUnpacking } from "react-icons/gi";
import {FormSelect} from "../../components/atoms/FormSelect"
import {IoIosAdd} from "react-icons/io"
import { useQuery, useMutation } from "@apollo/client";
import Routes from "../../modules/routes";
import { 
  GET_ALL_STUDENT, 
  GET_STUDENT_BY_ID, 
  GET_ALL_CLASS, 
  GET_ALL_FRAIS_INSCRIPTION, 
  GET_ALL_TRANCHE_PENSION,
  GET_TRANCHE_STUDENT_BY_STUDENT_ID
} from "../../graphql/Queries";
import {
  CREATE_TRANCHE_STUDENT, 
  CREATE_AVANCE_TRANCHE
} from "../../graphql/Mutation"

// export const getStaticPath = async() => {
//   // const apolloClient = initializeApollo();

//   // await apolloClient.query({
//   //   query: GET_ALL_STUDENT,
//   //   variables: id,
//   // });
//   // console.log(context);
 
//   // const {data: dataStudent} = useQuery (GET_ALL_STUDENT);
//   // const paths = dataStudent.findAllstudents.map((student) => ({
//   //   params: {id: [student.id]},
//   // }))
//   // const apolloClient = client
//   // const {loading, error, data} = useLazyQuery(GET_ALL_STUDENT); 

//   // if(loading){
//   //   return <div>loading</div>
//   // }
//   // if(error){
//   //   console.log(error);
//   //   return <div>Error!</div>;
//   // }

//   // console.log(data)
  
//   const query = router.query.id
//   const {data: dataStudent} = useQuery({GET_ALL_STUDENT});
//   const paths = dataStudent.findAllstudents.map((student) => ({
//     params: {id: [student.id]},
//   }))
//   console.log(paths);
//     return{
//       paths: [],
//       fallback: false
//     }    
// }

// export const getStaticProps = async ({params}) => {
//   const id = params
//   // const apolloClient = initializeApollo();
//   // await apolloClient.query({
//   //   query: GET_ALL_STUDENT,
//   //   variables: id,
//   // });
//   // console.log(context);
//   console.log(id)
//   const {data:dataStudent} = await client.query({
//     GET_STUDENT_BY_ID,
//   //   query : gql `query findOnestudent ($id: String!) { 
//   //     findOnestudent (id: $id) {
//   //         id
//   //         matricule
//   //         firstname
//   //         lastname
//   //         dateOfBirth
//   //         sex
//   //         classe
//   //         adress
//   //         transport
//   //         categoryStudent
//   //         fatherFirstName
//   //         fatherLastName
//   //         fatherPhoneNumber
//   //         fatherProfession
//   //         motherFirstName
//   //         motherLastName
//   //         motherPhoneNumber
//   //         motherProfession
//   //         tutorFirstName
//   //         tutorLastName
//   //         tutorPhoneNumber
//   //         tutorProfession
//   //     }
//   // }`,
//   variables:{studentId: id}
// });

//   const {student} = dataStudent;
//   console.log(student)
//   return {
//     props: {
//       student
//         // initialApolloState: apolloClient.cache.extract(),
//     },
//     revalidate: 1,
//   }
// }

// export const tranches =[
//   {value:"Inscription", label: "Blue"},
//    {value:"Tranche 1", label: "Blue"},
//    { value:"Tranche 2", label: "Blue"}, 
//    {value:"Tranche 3", label: "Blue"}
// ]

// const trancheTableOptions = (
//   tranches.map((tranche) =>({
//     tranche
// })))

// export const groupedOptions = [
//   {
//     label: "valeur pension",
//     options: trancheTableOptions
//   }
// ]

export const colorOptions = [ 
  { value: "blue", label: "Blue", color: "#0052CC" },
  { value: "purple", label: "Purple", color: "#5243AA" },
  { value: "red", label: "Red", color: "#FF5630" },
  { value: "orange", label: "Orange", color: "#FF8B00" },
  { value: "yellow", label: "Yellow", color: "#FFC400" },
  { value: "green", label: "Green", color: "#36B37E" }
]

const DetailComponent = (student) => {

  const router = useRouter();
  const toast = useToast();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { isOpen:isOpenns, onOpen:onOpenns, onClose:onClosses } = useDisclosure();

  const cancelRef = React.useRef()
  // const classe = ["MATERNELLE","SIL","CP","CM1","CM2"]
  const [classId, setClassId] = useState("");
  const [tranchePensionId,  setTranchePensionId] = useState("");
  const [motif, setMotif] = useState("");
  const [montant, setMontant] = useState();
  const [trancheId, setTrancheId] = useState("");
  // const {loading, error, data:dataStudent} = useQuery(GET_ALL_ATUDENT);
  // const {data:singleStudent} = useQuery(GET_STUDENT_BY_ID);
  // console.log(data);

  const {data: dataStudent} = useQuery (GET_ALL_STUDENT);
  
  const {data:dataStudentId, loading, error} = useQuery(GET_STUDENT_BY_ID,
      {
        variables: {id: router.query.id}
      }
  );

  const {data:dataTrancheStudentBySudentId} = useQuery(GET_TRANCHE_STUDENT_BY_STUDENT_ID,
    {
      variables: {studentid: router.query.id} 
    }
  ); 

    const {data:dataClass} = useQuery(GET_ALL_CLASS);
    const {data:dataFraisInscription} = useQuery(GET_ALL_FRAIS_INSCRIPTION);
    const {data:dataTranchePension} = useQuery(GET_ALL_TRANCHE_PENSION);
    const [createTrancheStudent] = useMutation(CREATE_TRANCHE_STUDENT);
    const [createAvanceTranche] = useMutation(CREATE_AVANCE_TRANCHE);

        const tranches = []
        const loadTranches = () => {
          dataTranchePension?.findAlltranche?.map((item , index) => { 
            tranches.push(
              {
                label: item?.name,
                value: item?.id
              }
            )
          })
        }

      // const addTrancheStudent = async (id) => {
      //   console.log(id)
      //   console.log(montant)
      //   await createTrancheStudent({
      //     variables:{
      //       trancheStudent:{
      //         studentId: id,
      //         montant: parseInt(montant)
      //       }
      //     }
      //   }),
      //   onClosses();
      //   toast({
      //     title: "Initialisation de la pension.",
      //     description: "Initialisation reussit.",
      //     status: "success",
      //     duration: 3000,
      //     isClosable: true,
      //   });
      // }

      const addAvanceTranche = async(id) => {
        console.log(montant)
        console.log(trancheId)
        console.log(id)

        await createAvanceTranche({
          variables: {
            avancetranche:{
              trancheStudentId: "",
              montant: parseInt(montant),
              trancheId: trancheId,
              tranchestudentinput: {
                studentId: id,
                name: "",
                description: "",
                montant : 0
              }
            }
          }
        })
        onClose();
        toast({
          title: "paiement tranche pension.",
          description: " paye avec succes.",
          status: "success",
          duration: 3000,
          isClosable: true,
        });
     }

        useEffect(() =>{
          loadTranches()
          // dataStudentId && console.log(dataStudentId.findOnestudent)
          // console.log(dataClass);
          //  console.log(dataFraisInscription);
          console.log(dataTranchePension?.findAlltranche);
            // console.log(dataStudent?.findAllstudents);

          console.log(dataTrancheStudentBySudentId?.getTrancheStudentByStudent)
        })

    if (loading) return <Text>Chargement en cour...</Text>
    if (error) return <Text>Une erreur s'est produite!</Text>

  return (
    <DefaultLayout >
      <Box 
        p={3} 
        pt="70px" 
        background="colors.tertiary" 
        // w='150%'
      >
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
            Détails de  l'élève
          </Heading>
          <Hide below="sm">
            <Text>Dashboad / Éleves / Liste Élèves</Text>
          </Hide>
        </Flex>
        <Center>
        <Flex 
          gap='2' 
          mt='5' 
          fontSize={'sm'}
        >

 {/* FORMULAIRE DE PAIEMENT DE SCOLARITE */}
          <Center >
            <Button 
              bg='colors.primary' 
              height='40px' 
              color='white' 
              borderRadius={'md'} 
              onClick={onOpen}
            >
              Payer la Scolarite
            </Button>
          </Center>
          <Center>
            <Button
             bg='blue.300'  
             // height='40px' 
             color='white' 
             // borderRadius={'md'}
            > 
              <Link 
               href={{
                pathname: Routes.Receipt?.path || '',
                query: {id: router.query.id}
              }}
                // "/eleves/recu/id"}
                // m='2'
                // href= {{
                //   pathname: Routes.Receipt?.path || '',
                //   query: {id: student.id}
                // }}
              >
                Consulter le recu
              </Link>
            </Button>
          </Center>
          <Center 
            bg='#FC8A94' 
            height='40px' 
            color='white' 
            borderRadius={'md'}
          >
            <Text m='2'>note</Text>
          </Center>
          <Center 
            bg='#5370CC'  
            height='40px' 
            color='white' 
            borderRadius={'md'}
          >
            <Text m='2'>Imprimer</Text>
          </Center>
          <Center 
            bg='#328D57'  
            height='40px' 
            color='white' 
            borderRadius={'md'}
          >
            <Text m='2'>Nouvelle Photo</Text>
          </Center>
          <Center 
            g='#FA6060' 
            height='40px' 
            color='white' 
            borderRadius={'md'}
            bg="#e2d39c"
          >
            <Text m='2'>Bulletin</Text>
          </Center>
          <Center 
            g='#60736A'  
            height='40px' 
            color='white' 
            borderRadius={'md'}
            bg="green.500"
          >
            <Text m='2'>Notifier Absence</Text>
          </Center>
          <Center 
            bg='#DA7E86' 
            height='40px' 
            color='white' borderRadius={'md'}
           >
            <Text m='2'>Envoie SMS</Text>
          </Center>
        </Flex>
      </Center>
  {dataStudentId && (
  <SimpleGrid 
    spacing={4} 
    templateColumns='repeat(auto-fill, minmax(400px, 1fr))' m='5'
  >
    <Card 
      bgColor="#CCDEDE" 
      borderWidth={'1.5px'} 
      borderColor='#E2D39C'
    >
      <CardHeader>
        <Flex 
          flexDirection={'horizontal'}
        >
        <Heading 
          size='sm'  
          color='white' 
          background={'#767676'}
        >
          <Text m='1'>
          Informations personnelles<br/>
          Annee scolaire : 2021 - 2022
          </Text>
        </Heading>
        <Avatar size='md' 
          name='Dan Abrahmov' 
          src='https://bit.ly/dan-abramov'
          ml='10' 
        />
        </Flex>
      </CardHeader>
      
      <CardBody fontSize={'sm'}>
        
        <Flex 
          flexDirection={'column'} 
          spacing='5'
        >
        <Text>
          <Text as='b'>Nom : </Text> 
            {dataStudentId.findOnestudent.firstname}
         </Text>
        <Text><Text as='b'>Prenom : </Text>
          {dataStudentId.findOnestudent.lastname}
         </Text>
        <Text><Text as='b'>Matricule : </Text>
          {dataStudentId.findOnestudent.matricule}
        </Text>
        <Text><Text as='b'>Sexe : </Text>
          {dataStudentId.findOnestudent.sex}
        </Text>
        <Text><Text as='b'>Classe : </Text>
          {dataStudentId.findOnestudent.classe}
        </Text>
        <Text><Text as='b'>Section : </Text> 
          {/* {dataStudentId.findOnestudent.section} */}
        </Text>
        <Text
         mt={"20px"} 
         fontSize={"md"}
         as="b"
        >
          Pere
        </Text>
        <Text><Text as='b'>Nom : </Text> 
          {dataStudentId.findOnestudent.fatherFirstName}
        </Text>
        <Text><Text as='b'>Contact: </Text>
          {dataStudentId.findOnestudent.fatherPhoneNumber} 
        </Text>
        <Text 
          mt={"20px"} 
          as="b"
          fontSize={"md"}
        >
          Mere
        </Text>
        <Text><Text as='b'>Nom : </Text>
          {dataStudentId.findOnestudent.motherFirstName}
        </Text>
        <Text><Text as='b'>Contact: </Text> 
          {dataStudentId.findOnestudent.motherPhoneNumber}
        </Text>
        {/* <Text><Text as='b'>Email du pere : </Text>amostinanfon17@gmail.com</Text> */}
        {/* <Text><Text as='b'>Email de la mere : </Text>amostinanfon37@yahoo.com</Text> */}
        </Flex>
      </CardBody>
      <CardFooter>
      </CardFooter>
    </Card>
    <Card 
      bgColor="#CCDEDE" 
      borderWidth={'1.5px'} 
      borderColor='#E2D39C' 
      fontSize={'sm'}
    >
        <CardHeader>
          <Box>
            <Heading 
              size='sm'
              w={'50%'}
             >
              <Text 
                bgColor={'#767676'} 
                p='1' 
                color={'white'}
              >
                PAIEMENT SCOLARITE
              </Text>
            </Heading>
            <Box>
            <Text 
              color={'#AB9442'}
              mt={"10px"}
            >
              <Text 
                as='b' 
                color='#AB9442' 
                mr='2'
              >
                Derniere scolarite :
              </Text>
                {dataTrancheStudentBySudentId?.getTrancheStudentByStudent.montant} FCFA
            </Text> 
              <Box fontWeight={800}>
              <Text>Frais de la scolarite</Text>
              <Text>Frais tranche 1</Text>
              <Text>Frais tranche 2</Text>
              <Text>Frais tranche 3</Text>
              </Box>
            </Box> 
          </Box>
        </CardHeader>
      <CardBody>
        <Box>
          <Heading 
            size='sm' 
            w={'50%'}
          >
            <Text 
              bgColor={'#767676'} 
              p='1' 
              color={'white'}
            >
              ABSENCE
            </Text>
          </Heading>
          <Box>
            <Text color={'#AB9442'}>
              <Text 
                as='b'
                color='#AB9442'
              >
                Absente le : 
              </Text>
                20.12.2022 (Maladie)
            </Text>
          </Box>
        </Box>
        <Box mt={'5'}>
          <Heading 
            size='sm' 
            w={'50%'}
          >
            <Text 
              bgColor={'#767676'} 
              p='1' 
              color={'white'}
            >
              Transport
            </Text>
          </Heading>
          <Box>
            <Text color={'#AB9442'}>
              <Text 
                as='b' 
                color='#AB9442'
              >
                Transport (dernier paiement) : 
              </Text>
                54.000 (Maladie)
            </Text>
          </Box>
        </Box>
      </CardBody>
      <CardFooter>
      </CardFooter>
    </Card>

 {/* FORMULAIRE initialisation PAIEMENT DE SCOLARITE */}
      <AlertDialog
          isOpen={isOpenns}
          leastDestructiveRef={cancelRef}
          onClose={onClosses}
          size='xl'
        >
          <AlertDialogOverlay>
            <AlertDialogContent  width={"300px"}>
              <Box mt={"20px"}> 
                  <Heading 
                    textAlign="center"
                    size="md"
                  >
                    Initialiser le paiement
                  </Heading>
                  <AlertDialogBody>
                    <Box mt='4'>
                      <FormControl mt="5px">
                        <FormLabel>Montant</FormLabel>
                        <Input
                          type="number"
                          name="montant"
                          value={montant}
                          onChange={(event)=> setMontant(event.target.value)}
                        />
                      </FormControl>
                      <FormControl>
                          <FormLabel>Eleve</FormLabel>
                        <Input
                          type="text"
                          name="studentId"
                          value={dataStudentId.findOnestudent.lastname}
                          isDisabled
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
                  <Link href={'#'}>
                    <Button 
                      colorScheme='green'  
                      ml={3}
                      // onClick={() => addTrancheStudent(dataStudentId.findOnestudent.id)}
                    >
                      Initialiser
                    </Button>
                  </Link> 
                </AlertDialogFooter>
              </Box>
            </AlertDialogContent>
          </AlertDialogOverlay>
        </AlertDialog>

        {/* FORMULAIRE DE PAIEMENT DE LA SCOLARITE */}
          <Box
            as="form"
          > 
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
                            as='H4' 
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
                          {/* BOUTON D'INITIALISATION DE LA PENSION */}
                            {/* <Box display="flex"> 
                              <Text 
                                mb={5}
                                size="md"
                                color = "colors.quinzaine"
                              >
                                Initialisez le paiement
                              </Text>
                              <Icon 
                                as={IoIosAdd} 
                                boxSize="30px"
                                color={"colors.greencolor"}
                                rounded="full"
                                ml={["5px", "5px", "5px" ]}
                                mr={["5px"]}
                                _hover={{background:"colors.bluecolor"}}
                                onClick={onOpenns}
                              />
                              </Box>  */}
                            <Flex 
                              gap={5} 
                              flexWrap={['wrap','wrap','nowrap']} 
                              align='end'  
                              ml={"300px"}
                              mb="10px"
                            >
                                <Text>Pension total payée:</Text>
                                <Text 
                                  type={'text'} 
                                >
                                  {dataTrancheStudentBySudentId?.getTrancheStudentByStudent.montant} FCFA
                              </Text>
                            </Flex>
                          <FormControl>
                            <FormLabel>
                              Motif
                            </FormLabel>
                              <Select
                                name="trancheId"
                                value={trancheId}
                                onChange={(event) => setTrancheId(event.target.value)}
                                placeholder={"Motif"}
                              >
                                {
                                  dataTranchePension && (
                                    dataTranchePension.findAlltranche.map((tranche, index) =>(
                                      <option value={tranche?.id} key={index}>
                                          {tranche.name}
                                      </option>
                                    ))
                                  )
                                }
                              </Select>
                          </FormControl>
                        </Box>
                        <Box mt='4'>
                          <Flex 
                            gap={5} 
                            flexWrap={['wrap','wrap','nowrap']} 
                            align='end'
                          >
                            {/* <FormControl> */}
                              {/* <FormLabel>Montant attendu</FormLabel>
                                <Input 
                                  type={'text'} 
                                  disabled='disabled' 
                                  placeholder='0000000' 
                                  color='gray'
                                />
                              </FormControl> */}
                              <FormControl>
                                <FormLabel>Montant percu</FormLabel>
                                <Input 
                                  type={'number'} 
                                  name="montant"
                                  value={montant}
                                  onChange={(event) => setMontant(event.target.value)}
                                />
                              </FormControl>
                          </Flex>
                        </Box>
                        <Box> 
                          <FormControl>
                            {/* <FormLabel> Eleve</FormLabel> */}
                            <Input 
                              type={'text'} 
                              // name="studentId"
                              // value={studentId}
                              // onChange={(event) => setStudenId(event.target.value)}
                              value={dataStudentId?.findOnestudent.lastname}
                            />
                            {console.log(dataStudentId?.findOnestudent.id)}
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
                      <Link href={'#'}>
                          <Button 
                            colorScheme='green'  
                            ml={3}
                            onClick={() => addAvanceTranche(dataStudentId?.findOnestudent.id)
                              // (dataTrancheStudentBySudentId?.getTrancheStudentByStudent.id)
                            }
                          >
                            payer
                          </Button>
                        </Link> 
                      </AlertDialogFooter>
                    </AlertDialogContent>
                  </AlertDialogOverlay>
                </AlertDialog>
              </Box>
</SimpleGrid>
)} 
      </Box>
    </DefaultLayout>
  );
};

export default DetailComponent;






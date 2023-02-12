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
} from "@chakra-ui/react";


import { useRouter } from "next/router";
import React, { useEffect } from "react";
import Link from "next/link";
import DefaultLayout from "../../components/layouts/DefaultLayout";
import { GiBoxUnpacking } from "react-icons/gi";
import { useQuery, fetchGraphQLQuery, gql, useLazyQuery } from "@apollo/client";
import { GET_ALL_STUDENT, GET_STUDENT_BY_ID} from "../../graphql/Queries";
import { client } from "../../graphql/apollo-client";


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
const DetailComponent = (student) => {


  const router = useRouter();
    const { isOpen, onOpen, onClose } = useDisclosure()
    const cancelRef = React.useRef()
    const classe = ["MATERNELLE","SIL","CP","CM1","CM2"]
    const Tranches =["Inscription","Tranche 1", "Tranche 2","Tranche 3"]
    // const {loading, error, data:dataStudent} = useQuery(GET_ALL_ATUDENT);
    // const {data:singleStudent} = useQuery(GET_STUDENT_BY_ID);
    // console.log(data);
    // const {data: dataStudent} = useQuery (GET_ALL_STUDENT);

    const {data:dataStudentId, loading, error} = useQuery(GET_STUDENT_BY_ID,
      {
        variables: {id: router.query.id}
      }
    )

    // const query = router.query.id 
    // console.log(query)
    // const getStudentById = async(id) => {
    //     await dataStudentId ({
    //       variables: {Id: id}
    //     })
    // }

    // console.log(dataStudentId)
 
    useEffect(() =>{
      
      dataStudentId && console.log(dataStudentId.findOnestudent)
      //  console.log(dataStudent.);
     })

     if (loading) return <Text>Chargement en cour...</Text>
    if (error) return <Text>Une erreur s'est produite!</Text>

   

  return (
    <DefaultLayout >
      <Box p={3} pt="70px" background="colors.tertiary" w='150%'>
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
        <Flex gap='2' mt='5' fontSize={'sm'}>
          <Center >
            <Button bg='colors.primary' height='40px' color='white' borderRadius={'md'} onClick={onOpen}>Payer la Scolarite</Button>
              <AlertDialog
                isOpen={isOpen}
                leastDestructiveRef={cancelRef}
                onClose={onClose}
                size='xl'
            >
        <AlertDialogOverlay>
          <AlertDialogContent  >
            <AlertDialogHeader fontSize='sm' fontWeight='base' mt='0'>
            <Box  bg={"colors.secondary"} borderBottomRightRadius={10} borderBottomLeftRadius={10}>
                <Heading as='H4' textAlign={'center'} fontSize={['15px','20px','26px']} p='2' >
                        Groupe Scolaire Bilingue Awono Bilongue
                </Heading>
            </Box>
            </AlertDialogHeader>
            <AlertDialogBody>
            <Box>
              <Flex gap={5} flexWrap={['wrap','wrap','nowrap']} align='end' >
                  <FormControl>
                      <FormLabel>Matricule</FormLabel>
                  <Input type={'text'} ></Input>
                  </FormControl>

                  <FormControl>
                      <FormLabel>Classe</FormLabel>
                      
                  <Select placeholder='--classe--'>
                    {classe.map((cat) => (
                      <option>{cat}</option>
                      ))}
                  </Select>
                  </FormControl>
              </Flex>
            </Box>
            <Box mt='4'>
              <Flex align='end'>
                  <FormControl>
                      <FormLabel>Noms et prenoms</FormLabel>
                      <Input type={'text'} ></Input>
                  </FormControl>
              </Flex>
            </Box>
              <Box mt='4'>
                        <Flex gap={5} flexWrap={['wrap', 'wrap', 'nowrap']} align='end' >
                              <FormControl>
                                  <FormLabel>Nom du remettant</FormLabel>
                                  <Input type={'text'} ></Input>
                              </FormControl>

                              <FormControl>
                                    <FormLabel>Tel du remettant</FormLabel>
                                    <Input type={'text'} ></Input>
                                    
                              </FormControl>


                        </Flex>
              </Box>
            <Box mt='4'>
                <Flex gap={5} flexWrap={['wrap','wrap','nowrap']} align='end'>
                    <FormControl>
                            <FormLabel placeholder="--motif--">Motif</FormLabel>
                        <Select  default>
                            {Tranches.map((tranche) => (
                                <option>{tranche}</option>
                            ))}
                        </Select>
                    </FormControl>

                    <FormControl>
                            <FormLabel>Montant attendu</FormLabel>
                        <Input type={'text'} disabled='disabled' placeholder='0000000' color='gray'></Input>
                    </FormControl>
                </Flex>
            </Box>
            <Box mt='4'>
                <Flex gap={5} flexWrap={['wrap','wrap','nowrap']} align='end'>
                    <FormControl>
                            <FormLabel>Montant percu</FormLabel>
                            <Input type={'number'} ></Input>
                        
                    </FormControl>

                    <FormControl>
                            <FormLabel>Delai</FormLabel>
                            <Input type={'date'} ></Input>
                        
                    </FormControl>

                    <FormControl>
                            <FormLabel>reste a payer</FormLabel>
                        <Input type={'number'} disabled='disabled' textColor={'red.300'}></Input>
                    </FormControl>
                </Flex>
            </Box>
            </AlertDialogBody>

            <AlertDialogFooter>
              <Button ref={cancelRef} onClick={onClose} colorScheme='red' >
                annuler
              </Button>
             <Link href={'#'}>
                <Button colorScheme='green'  ml={3}>
                  payer
                </Button>
              </Link> 
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>
          </Center>
          <Center bg='#FC8A94'  height='40px' color='white' borderRadius={'md'}>
              <Text m='2'>note</Text>
          </Center>
          <Center bg='#5370CC'  height='40px' color='white' borderRadius={'md'}>
              <Text m='2'>Imprimer</Text>
          </Center>
          <Center bg='#328D57'  height='40px' color='white' borderRadius={'md'}>
              <Text m='2'>Nouvelle Photo</Text>
          </Center>
          <Center bg='#6688F6'  height='40px' color='white' borderRadius={'md'}>
              <Text m='2'>Payer la Scolarite</Text>
          </Center>
          <Center bg='#FA6060'  height='40px' color='white' borderRadius={'md'}>
              <Text m='2'>Bulletin</Text>
          </Center>
          <Center bg='#60736A'  height='40px' color='white' borderRadius={'md'}>
              <Text m='2'>Notifier Absence</Text>
          </Center>
          <Center bg='#DA7E86'  height='40px' color='white' borderRadius={'md'}>
              <Text m='2'>Envoie SMS</Text>
          </Center>
        </Flex>
        </Center>
  {dataStudentId && (
  <SimpleGrid spacing={4} templateColumns='repeat(auto-fill, minmax(400px, 1fr))' m='5'>
    <Card bgColor="#CCDEDE" borderWidth={'1.5px'} borderColor='#E2D39C'>
      
      <CardHeader>
        <Flex flexDirection={'horizontal'}>
        <Heading size='sm'  color='white' background={'#767676'}>
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
        
        <Flex flexDirection={'column'} spacing='5'>
        <Text><Text as='b'>Nom : </Text> {dataStudentId.findOnestudent.firstname}</Text>
        <Text><Text as='b'>Prenom : </Text> {dataStudentId.findOnestudent.lastname}</Text>
        <Text><Text as='b'>Matricule : </Text>{dataStudentId.findOnestudent.matricule}</Text>
        <Text><Text as='b'>Sexe : </Text>{dataStudentId.findOnestudent.sex}</Text>
        <Text><Text as='b'>Classe : </Text>{dataStudentId.findOnestudent.classe}</Text>
        <Text><Text as='b'>Section : </Text> {dataStudentId.findOnestudent.section}</Text>
        <Text mt={"20px"}>Pere</Text>
        <Text><Text as='b'>Nom : </Text> {dataStudentId.findOnestudent.fatherFirstName}</Text>
        <Text><Text as='b'>Contact: </Text>{dataStudentId.findOnestudent.fatherPhoneNumber} </Text>
        <Text mt={"20px"}>mere</Text>
        <Text><Text as='b'>Nom : </Text>{dataStudentId.findOnestudent.motherFirstName} </Text>
        <Text><Text as='b'>Contact: </Text> {dataStudentId.findOnestudent.motherPhoneNumber}</Text>
        {/* <Text><Text as='b'>Email du pere : </Text>amostinanfon17@gmail.com</Text> */}
        {/* <Text><Text as='b'>Email de la mere : </Text>amostinanfon37@yahoo.com</Text> */}
        </Flex>
      </CardBody>
      <CardFooter>
      </CardFooter>
    </Card>
    <Card bgColor="#CCDEDE" borderWidth={'1.5px'} borderColor='#E2D39C' fontSize={'sm'}>
        <CardHeader>
          <Box>
            <Heading size='sm' w={'50%'}>
              <Text bgColor={'#767676'} p='1' color={'white'}>PAIEMENT SCOLARITE</Text>
            </Heading>
            <Box>
            <Text color={'#AB9442'}>
              <Text as='b' color='#AB9442' mr='2'>Derniere scolarite :</Text>
              153000
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
          <Heading size='sm' w={'50%'}>
            <Text bgColor={'#767676'} p='1' color={'white'}>ABSENCE</Text>
          </Heading>
          <Box>
            <Text color={'#AB9442'}>
              <Text as='b' color='#AB9442'>Absente le : </Text>
              20.12.2022 (Maladie)
            </Text>
          </Box>
        </Box>
        <Box mt={'5'}>
          <Heading size='sm' w={'50%'}>
            <Text bgColor={'#767676'} p='1' color={'white'}>Transport</Text>
          </Heading>
          <Box>
            <Text color={'#AB9442'}>
              <Text as='b' color='#AB9442'>Transport (dernier paiement) : </Text>
              54.000 (Maladie)
            </Text>
          </Box>
        </Box>
      </CardBody>
      <CardFooter>
      </CardFooter>
    </Card>
</SimpleGrid>
)} 
      </Box>
    </DefaultLayout>
  );
};

export default DetailComponent;






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
  Avatar,
  Icon,
  Popover,
  PopoverArrow,
  PopoverBody,
  PopoverCloseButton,
  PopoverContent,
  PopoverFooter,
  useDisclosure,
  AlertDialog,
  AlertDialogOverlay,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogBody,
  AlertDialogFooter,
  InputRightElement
} from "@chakra-ui/react";
// import Link from "../../components/atoms/Link"
import React from "react";
import Link from "next/link";
import Routes from "../../modules/routes";
import { useState, useEffect } from "react";
import DefaultLayout from "../../components/layouts/DefaultLayout";
import { Users } from '../api/data/users';
import { Classes } from '../api/data/classes';
import { IoIosAdd } from "react-icons/io";
import{ FiEdit, FiSearch} from 'react-icons/fi';
import {MdDelete} from 'react-icons/md';
import {useRouter } from "next/router";
import { GET_ALL_STUDENT, GET_STUDENT_BY_ID} from "../../graphql/Queries";
import { DELETE_STUDENT } from "../../graphql/Mutation";
import { useMutation, useQuery } from "@apollo/client";

// const VARIABLE = "pearl";

const Eleves = () => {

    const cancelRef = React.useRef()
    const {router} = useRouter();
    const [query , setQuery] = useState("");
    const [data, setData] = useState([]);
    const keys = ["first_name", "last_name", "email", "classe"];
    const {data:dataStudent, loading, error} = useQuery(GET_ALL_STUDENT);
    const [deletestudent] = useMutation(DELETE_STUDENT);
    const { isOpen, onToggle, onClose, onOpen } = useDisclosure();
    const [searchNameStudent, setSearchNameStudent] = useState("");

    // const student = get(dataStudent)
    
    // const {data:singleStudent} = useQuery(GET_STUDENT_BY_ID,
    //   {
    //     variable:{id: VARIABLE}
    //   });

      // if (singleStudent){
      //   console.log(singleStudent)
      // }

    const search = (data) => {
       
      let datas = data.filter((item) => keys.some((key) => (
        item[key].toUpperCase().includes(query) 
        )
      ));
      console.log("datas :" , datas)
      return query ? datas.slice(0,5) : Users.slice(0,5)
    }; 

    useEffect(() => {
      console.log(dataStudent?.findAllstudents);
    })

    if (loading) return <Text>Chargement en cour...</Text>
    if (error) return <Text>Une erreur s'est produite!</Text>

    const removeStudent = async(id) => {
      await deletestudent({
        variables: {id},
        refetchQueries: [{
          query: GET_ALL_STUDENT
        }]
      })
      onClose();
    }

    const handleChange = (e) => {
      setSearchNameStudent(e.target.value);
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
            Liste des élèves
          </Heading>
          <Hide below="sm">
            <Text>Dashboad / Éleves / Liste Élèves</Text>
          </Hide>
        </Flex>

        <Flex gap={10} mt={5}>
          <InputGroup>
            <InputRightElement
              children={<Icon as={FiSearch} />}
              cursor="pointer"
            />
            <Input
              placeholder="Recherchez un élève..."
              //value={recherche}
              // onChange={e => setQuery(e.target.value)
              onChange={handleChange}
              variant="flushed"
            />
            {/* <InputRightAddon children={<SearchIcon />} /> */}
          </InputGroup>
          <Select 
            placeholder="Selectionner la classe"
            variant="flushed"
            onChange={e =>setQuery(e.target.value)}
          >
            {Classes.map((classe) => (
              <option 
                key={classe.id}
              >{classe.classe}</option>
            ))}
          </Select>
          <Box> 
            <Button
                rightIcon={<Icon as={IoIosAdd} boxSize="20px" />}
                onClick={() => router.push("/eleves/ajoutereleve")}
              >
                Ajouter un élève
            </Button>
          </Box> 
        </Flex>
        {/* <Box mt={10}>
          <PaiementTable data={search(Users)}/>
        </Box> */}
        <Box mt={10}>
           <TableContainer 
              border={"1px"} 
              rounded={"md"}
           >
              <Table 
                variant='striped' 
                colorScheme={"white"}
                bg={"white"}
              >
                  {/* <TableCaption>Liste des eleves</TableCaption> */}
                  <Thead background="colors.secondary">
                  <Tr>
                    <Th>Nom</Th>
                    <Th>Prenom</Th>
                    {/* <Th >classe</Th> */}
                    {/* <Th>sexe</Th> */}
                    {/* <Th>Photo</Th> */}
                    <Th>Action</Th>
                  </Tr>
                  </Thead>
                  <Tbody>
                  {dataStudent && (
                    dataStudent.findAllstudents
                    .filter((student) =>{
                      if(searchNameStudent == ""){
                        return student;
                      }else if (student.firstname.toLowerCase().includes (searchNameStudent.toLowerCase()) || 
                      student.lastname.toLowerCase().includes (searchNameStudent.toLowerCase()) ||
                       student.fatherFirstName.toLowerCase().includes (searchNameStudent.toLowerCase()))
                      return student;
                    })
                    .map((student, index) =>(
                      <Tr key={index}>
                        <Td >{student.firstname}</Td>
                        <Td >{student.lastname}</Td>
                        {/* <Td borderColor={'#C6B062'}>{student.classe}</Td> */}
                        {/* <Td borderColor={'#C6B062'}>{student.sex}</Td> */}
                        {/* <Td borderColor={'#C6B062'}>
                            <Avatar 
                                size='xs' 
                                name='Dan Abrahmov' 
                                src='https://bit.ly/dan-abramov'
                            /> 
                        </Td> */}
                        <Td >
                          <ButtonGroup 
                            size='sm' 
                            isAttached 
                            variant='link' 
                            colorScheme={'teal'}
                            >
                              <Button
                              >
                                <Link
                                 href= {{
                                  pathname: Routes.EleveDetails?.path || '',
                                  query: {id: student.id}
                                  }}
                                >
                                 Details
                                </Link>
                              </Button>
                            </ButtonGroup> 
                          </Td>
                            <Box 
                              display={"flex"}
                              ml={['-105px', '-105px', '-105px', '-105px']} 
                              mt={['8px', '8px', '8px', '8px']}
                            >
                              <Link 
                                href="/eleves/modifiereleve">
                                  <Icon
                                  as={FiEdit}
                                  boxSize="40px"
                                  p="3"
                                  // bg="blue.100"
                                  rounded="full"
                                  _hover={{background:"red.100"}}
                                />
                              </Link>
                              <Box href="#" mt="-3px">
                                <Icon
                                  as={MdDelete}
                                  boxSize="42px"
                                  p="3"
                                  rounded="full"
                                  color="colors.quaternary"
                                  _hover={{background:"blue.100"}}
                                  onClick={onToggle}
                                />
                                <Box> 
                                  <AlertDialog
                                    isOpen={isOpen}
                                    leastDestructiveRef={cancelRef}
                                    onClose={onClose}
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
                                        Voulez-vous supprimer cet elève?
                                        </AlertDialogBody>

                                        <AlertDialogFooter>
                                          <Button 
                                            ref={cancelRef} 
                                            onClick={onClose}
                                            colorScheme="red"
                                          >
                                            Annuler 
                                          </Button>
                                          <Button 
                                            colorScheme='green' 
                                            onClick={() => removeStudent(student.id)}
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
                        </Tr>
                      // </Link>
                  ))
                )}
                </Tbody>
                  {/* <Tfoot>
                  <Tr>
                      <Th>To convert</Th>
                      <Th>into</Th>
                      <Th isNumeric>multiply by</Th>
                  </Tr>
                  </Tfoot> */}
              </Table>
            </TableContainer>
        </Box>
      </Box>
    </DefaultLayout>
  );
};

export default Eleves;

// export  const  getStaticProps = async() => {
//   const apolloClient = initializeApollo();
//   await apolloClient.query({
//     query:GET_STUDENT_BY_ID,
//     variables:{id: VARIABLE}
//   })
//   return{propos:{initialzeApollState: apolloClient.cache.extract()}}
// }
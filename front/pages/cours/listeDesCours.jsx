import {
    AddIcon, 
    SearchIcon 
  } from "@chakra-ui/icons";
  import {
   Box,
   Flex,
   Heading,
   Hide,
   Input,
   InputGroup,
   InputRightAddon,
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
   AlertDialog,
  AlertDialogBody,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogContent,
  AlertDialogOverlay,
  useDisclosure,
  Button
  } from "@chakra-ui/react";
  
  import DefaultLayout from "../../components/layouts/DefaultLayout";
//   import AjouterCategoryEleve from './AjouterCategoryEleve';
import AjouterCours from "./addCours";
  import { Router, useRouter } from "next/router";
  import {FiEdit} from 'react-icons/fi';
  import {MdDelete} from 'react-icons/md';
//   import { GET_ALL_Category_Eleve } from "../../graphql/Queries";
//   import { DELETE_CATEGORY_STUDENT } from "../../graphql/Mutation";
  import { useMutation, useQuery } from "@apollo/client"; 
  import React, { use, useEffect, useState } from "react";
  import { GET_ALL_COURSES, loading, error } from "../../graphql/Queries";
  import { DELETE_COURSE } from "../../graphql/Mutation";


  const ListeDesCours = () => {
  
     // const router = useRouter();
     const [query , setQuery] = useState("");
     const cancelRef = React.useRef()
     const { isOpen, onOpen, onClose } = useDisclosure()
     // //const [classeValue , setClasseValue ] = useState("");
     // const [data, setData] = useState([]);
     // const keys = ["first_name", "last_name", "email", "classe"];
  
     // const search = (data) => {
        
     //   let datas = data.filter((item) => keys.some((key) => (
     //     item[key].toUpperCase().includes(query) 
     //     )
     //   ));
     //   console.log("datas :" , datas)
     //   return query ? datas.slice(0,5) : Users.slice(0,5)
     // };
  
    //  const {data:dataCategoryEleve} = useQuery(GET_ALL_Category_Eleve);
    //  const [deleteCategoryStudent] = useMutation(DELETE_CATEGORY_STUDENT);
    const {data:dataCourse} = useQuery(GET_ALL_COURSES);
    const [deleteCourse] = useMutation(DELETE_COURSE);

      useEffect (() => {
       console.log(dataCourse?.findAllCourse);
     });
  
     const removeCourse= async (id) => {
       await deleteCourse({
         variables:{id},
         refetchQueries: [{
           query: GET_ALL_COURSES
         }]
       })
       onClose();
     }
  
  
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
                Matiere
           </Heading>
           <Hide below="sm">
             <Text>Dashboad/cours/liste des matiere </Text>
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
           <AjouterCours/>
         </Flex>
         <Box mt={10}>
             <TableContainer>
                 <Table variant='striped'>
                     <Thead>
                       <Tr>
                         <Th>Nom</Th>
                         <Th>Taux horaire</Th>
                         <Th>Actions</Th>
                       </Tr>
                     </Thead>
                     {dataCourse && ( 
                     <Tbody>
                       {
                         dataCourse.findAllCourse.map((course, index) => ( 
                           <Tr 
                            key={index} 
                            borderColor={'#C6B062'}
                           >
                               <Td borderColor={'#C6B062'}>{course.title} </Td>
                               <Td borderColor={'#C6B062'}>{course.time}</Td>
                               <Td borderColor={'#C6B062'}>
                               <Box display="flex">
                                 <Link 
                                   href="#">
                                     <Icon
                                     as={FiEdit}
                                     boxSize="40px"
                                     p="3"
                                     rounded={"full"}
                                     _hover={{background:"blue.100"}}
                                     />
                                 </Link>
                                 <Box href="#" mt="-3px">
                                   <Icon
                                     as={MdDelete}
                                     boxSize="44px"
                                     p="3"
                                     rounded="full"
                                     color="colors.quaternary"
                                     _hover={{background:"blue.100"}}
                                     onClick={onOpen}
                                   />
                                   <Box> 
                                    <AlertDialog
                                      isOpen={isOpen}
                                      leastDestructiveRef={cancelRef}
                                      onClose={onClose}
                                      isCentered
                                    > 
                                        <AlertDialogOverlay
                                          alignSelf={"center"} 
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
                                            Voulez-vous supprimer cette matiere?
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
                                                onClick={() => removeCourse(course.id)}
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
                               </Td>
                           </Tr>
                          ))}
                     </Tbody>
                        )} 
                 </Table>
             </TableContainer>
         </Box>
       </Box>
     </DefaultLayout>
   );
  };
  
  export default ListeDesCours;
  
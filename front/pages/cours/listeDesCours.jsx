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
  Button,
  InputRightElement
  } from "@chakra-ui/react";
  
  import DefaultLayout from "../../components/layouts/DefaultLayout";
//   import AjouterCategoryEleve from './AjouterCategoryEleve';
import AjouterCours from "./addCours";
  import { Router, useRouter } from "next/router";
  import {FiEdit, FiSearch} from 'react-icons/fi';
  import {MdDelete} from 'react-icons/md';
//   import { GET_ALL_Category_Eleve } from "../../graphql/Queries";
//   import { DELETE_CATEGORY_STUDENT } from "../../graphql/Mutation";
  import { useMutation, useQuery } from "@apollo/client"; 
  import React, { use, useEffect, useState } from "react";
  import { GET_ALL_COURSES, loading, error } from "../../graphql/Queries";
  import { DELETE_COURSE } from "../../graphql/Mutation";
import ReactPaginate from "react-paginate";


  const ListeDesCours = () => {
  
     // const router = useRouter();
     const [query , setQuery] = useState("");
     const cancelRef = React.useRef();
     const { isOpen, onOpen, onClose } = useDisclosure();
     const [searchCourse, setSearchCourse] = useState("");
     const itemsPerPage = 15;
    const [pageNumber, setPageNumber] = useState(0);
    const pagesVisited = pageNumber * itemsPerPage;
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
  
     const handlechangeSearchCourse = (e) => {
      setSearchCourse(e.target.value);
    };
  
    const pageCountCourse = Math.ceil(dataCourse?.findAllCourse.length / itemsPerPage);
    
    const changePage = ({ page }) => {
      setPageNumber(page);
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
                Matiere
           </Heading>
           <Hide below="sm">
             <Text>Dashboad/cours/liste des matiere </Text>
           </Hide>
         </Flex>
         <Flex gap={10} mt={5}>
           <InputGroup width="500px">
            <InputRightElement
                children={<Icon as={FiSearch} />}
                cursor="pointer"
              />
             <Input
               placeholder="Recherchez une matiere..."
               variant="flushed"

               //value={recherche}
               onChange={handlechangeSearchCourse}
             />
             {/* <InputRightAddon children={<SearchIcon />} /> */}
           </InputGroup>
           {/* <Select 
             placeholder="Selectionner la classe"
             onChange={e =>setQuery(e.target.value)}
           >
           </Select> */}
           <AjouterCours/>
         </Flex>
         <Box mt={10}>
             <TableContainer  
                border={"1px"} 
                rounded={"md"}
              >
                 <Table 
                  variant={"striped"} 
                  colorScheme={"white"}
                  bg={"white"}
                 >
                     <Thead background="colors.secondary">
                       <Tr>
                         <Th >Nom</Th>
                         <Th>Taux horaire</Th>
                         <Th>Actions</Th>
                       </Tr>
                     </Thead>
                     {dataCourse && ( 
                     <Tbody  p={0}>
                       {
                         dataCourse.findAllCourse
                         .slice(pagesVisited, pagesVisited + itemsPerPage)
                         .filter((course) =>{
                          if(searchCourse==""){
                            return course;
                          }else if(course.title.toLowerCase().includes(searchCourse.toLowerCase()))
                            return course
                         })
                         .map((course, index) => ( 
                           <Tr 
                            key={index} 
                            borderColor={'#C6B062'}
                           >
                              <Td 
                                flex={"1"} 
                                p={0} 
                                pl={6}
                              >
                                {course.title} 
                              </Td>
                               <Td 
                                  p={0} 
                                  pl={6}
                               >
                                {course.time}
                               </Td>
                               <Td 
                                p={0} 
                                pl={6}
                               >
                               <Box display="flex">
                                  <Link 
                                   href="#">
                                     <Icon
                                     as={FiEdit}
                                     boxSize="37px"
                                     p="3"
                                     rounded={"full"}
                                     _hover={{background:"blue.100"}}
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
          <Box mt={"15px"}> 
            <ReactPaginate 
              previousLabel={"<<"}
              nextLabel={">>"}
              pageCount={pageCountCourse}
              onPageChange={changePage}
              containerClassName={"paginationBttns"}
              previousLinkClassName={"previousBttn"}
              nextLinkClassName={"nextBttn"}
              disabledClassName={"paginationDisabled"}
              activeClassName={"paginationActive"}
            />
          </Box>
        </Box>
     </DefaultLayout>
   );
  };
  
  export default ListeDesCours;
  
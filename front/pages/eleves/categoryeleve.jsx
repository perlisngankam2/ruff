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
 useDisclosure,
 AlertDialogHeader,
 AlertDialog,
 AlertDialogOverlay,
 AlertDialogContent,
 AlertDialogBody,
 AlertDialogFooter,
 Button,
 InputRightElement,
} from "@chakra-ui/react";

import DefaultLayout from "../../components/layouts/DefaultLayout";
import AjouterCategoryEleve from './AjouterCategoryEleve';
import { Router, useRouter } from "next/router";
import {FiEdit, FiSearch} from 'react-icons/fi';
import {MdDelete} from 'react-icons/md';
import { GET_ALL_Category_Eleve, loading, error} from "../../graphql/queries";
import { DELETE_CATEGORY_STUDENT } from "../../graphql/Mutation";
import { useMutation, useQuery } from "@apollo/client"; 
import React, { useEffect, useState } from "react";

const CategoryEleve = () => {

   // const router = useRouter();
   const cancelRef = React.useRef()
   const [query , setQuery] = useState("");
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
   
   const {data:dataCategoryEleve} = useQuery(GET_ALL_Category_Eleve);
   const [deleteCategoryStudent] = useMutation(DELETE_CATEGORY_STUDENT);
   const { isOpen, onToggle, onClose, onOpen } = useDisclosure();
   const [searchNameStudentCategory, setSearchNameStudentCategory] = useState("");
  

    useEffect (() => {
     console.log(dataCategoryEleve?.findAllcategorieeleve);
   });

   if (loading) return <Text>Chargement en cour...</Text>
   if (error) return <Text>Une erreur s'est produite!</Text>

   const removeCategoryStudent= async (id) => {
     await deleteCategoryStudent({
       variables:{id},
       refetchQueries: [{
         query: GET_ALL_Category_Eleve
       }]
     })
     onClose();
   }

   const handleChange = (e) => {
    setSearchNameStudentCategory(e.target.value);
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
          Categories des élèves
         </Heading>
         <Hide below="sm">
           <Text>Dashboad / personnel/Categories des élèves </Text>
         </Hide>
       </Flex>

       <Flex gap={10} mt={5}>
         <InputGroup width={"600px"}>
            <InputRightElement
              children={<Icon as={FiSearch} />}
              cursor="pointer"
            />
           <Input
             placeholder="Recherchez une categorie..."
             //value={recherche}
            //  onChange={e => setQuery(e.target.value)
              onChange={handleChange}
              variant="flushed"
           />
           {/* <InputRightAddon children={<SearchIcon />} /> */}
         </InputGroup>
         {/* <Select 
           placeholder="Selectionner la classe"
           onChange={e =>setQuery(e.target.value)}
         >
         </Select> */}
         <AjouterCategoryEleve/>
       </Flex>
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
                   <Thead background="colors.secondary">
                     <Tr >
                       <Th>Nom</Th>
                       <Th>Description</Th>
                       <Th>Actions</Th>
                     </Tr>
                   </Thead>
                   {dataCategoryEleve && ( 
                   <Tbody>
                     {
                       dataCategoryEleve.findAllcategorieeleve
                       .filter((categoryStudent) =>{
                          if(searchNameStudentCategory == ""){
                            return categoryStudent;
                          }else if (categoryStudent.nom.toLowerCase().includes (searchNameStudentCategory.toLowerCase()))
                            return categoryStudent;
                        })
                       .map((categoryStudent, index) => ( 
                         <Tr key={index}>
                             <Td p={0} pl={6}>{categoryStudent.nom}</Td>
                             <Td p={0} pl={6}>{categoryStudent.description}</Td>
                             <Td p={0} pl={3}>
                             <Box display="flex">
                               <Link 
                                 href="/eleves/modifiereleve">
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
                                          Voulez-vous supprimer cette categorie?
                                          </AlertDialogBody>

                                          <AlertDialogFooter
                                          >
                                            <Button
                                              ref={cancelRef} 
                                              onClick={onClose}
                                              colorScheme="red"
                                            >
                                              Annuler 
                                            </Button>
                                            <Button 
                                              colorScheme='green' 
                                              ml={3}
                                              onClick = {() =>{removeCategoryStudent(categoryStudent.id)}}
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

export default CategoryEleve;

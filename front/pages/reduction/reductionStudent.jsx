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
   InputRightElement
  } from "@chakra-ui/react";
  
  import DefaultLayout from "../../components/layouts/DefaultLayout";
  import AddReductionStudent from "./AddReductionStudent";
  import { Router, useRouter } from "next/router";
  import {FiEdit, FiSearch} from 'react-icons/fi';
  import {MdDelete} from 'react-icons/md';
  import { useMutation, useQuery } from "@apollo/client"; 
  import { GET_ALL_REDUCTION_SCOLARITE } from "../../graphql/Queries";
  import { useEffect, useState } from "react";
  
  const reductionStudent = () => {
  
     // const router = useRouter();
     const [query , setQuery] = useState("");
     const {data:dataReductionScolarite} = useQuery(GET_ALL_REDUCTION_SCOLARITE);
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
  

  
  
      useEffect (() => {
            console.log(dataReductionScolarite?.findAllreductionscolarite)
     });
  
    //  const removeCategoryStudent= async (id) => {
    //    await deleteCategoryStudent({
    //      variables:{id},
    //      refetchQueries: [{
    //        query: GET_ALL_Category_Eleve
    //      }]
    //    })
    //  }
  
  
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
              Reduction de scolarite
           </Heading>
           <Hide below="sm">
             <Text>Dashboad / Reduction/ </Text>
           </Hide>
         </Flex>
  
         <Flex gap={10} mt={5}>
           <InputGroup width={"600px"}>
            <InputRightElement
                children={<Icon as={FiSearch} />}
                cursor="pointer"
              />
             <Input
               placeholder="Recherchez une reduction..."
               //value={recherche}
               onChange={e => setQuery(e.target.value)}
               variant="flushed"
             />
             {/* <InputRightAddon children={<SearchIcon />} /> */}
           </InputGroup>
           {/* <Select 
             placeholder="Selectionner la classe"
             onChange={e =>setQuery(e.target.value)}
           >
           </Select> */}
           <Box>
            <AddReductionStudent/>
           </Box>
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
                       <Tr>
                         <Th>Nom</Th>
                         <Th>Montant</Th>
                         <Th>Actions</Th>
                       </Tr>
                     </Thead>
                     {dataReductionScolarite && ( 
                     <Tbody>
                       {
                          dataReductionScolarite.findAllreductionscolarite.map((reductionscolarite, index) => ( 
                           <Tr 
                             key={index} 
                             
                             >
                               <Td p={0} pl={6}>{reductionscolarite.name}</Td>
                               <Td p={0} pl={6}>{reductionscolarite.montant}</Td>
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
                                 <Link href="#" mt="-3px">
                                   <Icon
                                     as={MdDelete}
                                     boxSize="44px"
                                     p="3"
                                     rounded="full"
                                     color="colors.quaternary"
                                     _hover={{background:"blue.100"}}
                                    //  onClick = {() =>{removeCategoryStudent(categoryStudent.id)}}
                                   />
                               </Link>
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
  
  export default reductionStudent;
  
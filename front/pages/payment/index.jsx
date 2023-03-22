import { SearchIcon } from "@chakra-ui/icons";
import {
  Box,
  Center,
  Heading,
  Flex,
  Input,
  InputGroup,
  InputRightElement,
  Icon,
  // Link as Links,
  Grid,
  Text,
  Table,
  Thead,
  Tbody,
  Tfoot,
  Tr,
  Th,
  Td,
  TableCaption,
  TableContainer,
} from "@chakra-ui/react";
import Link from "next/link";
import Routes from "../../modules/routes";
import { FiEdit, FiSearch } from "react-icons/fi";
import { IoClose } from "react-icons/io";
import DefaultLayout from "../../components/layouts/DefaultLayout";
// import PaySlip from "./PaySlip";
import { useState } from "react";
import { useMutation, useQuery } from "@apollo/client";
import { GET_ALL_PERSONNELS } from "../../graphql/queries";
import { MdDelete } from "react-icons/md";

const Payment = () => {
  // const [searchName, setSearchName] = useState("");

  const {data:dataPersonnel, loading, error} = useQuery(GET_ALL_PERSONNELS)
  const [personnel, setPersonnel] = useState([]);
  const [ filteredData, setFilteredData]=useState([])



  const handleChange = (e) => {
    const searchName = e.target.value;
    const newFilter =   dataPersonnel.findAllpersonnel
              .filter((personnel) =>{
              return  (personnel.firstName.toLowerCase().includes (searchName.toLowerCase()) || personnel.lastName.toLowerCase().includes (searchName.toLowerCase()) || personnel.fonction.toLowerCase().includes (searchName.toLowerCase()))
              
            } );
    if (searchName === ""){
      setFilteredData([]);
    }else {
        setFilteredData(newFilter);
    }
            
  };
  return (
    <DefaultLayout>
      <Box 
        p={"10px"} 
        w="full" 
        minH="100vh" 
        bgColor="colors.tertiary"
      >
        <Box pt="70px" w="100%">
          <Heading 
            p="1em" 
            textAlign="center" 
            bgGradient='linear(to-r, teal.500, green.500)' 
            bgClip='text' fontSize={'30px'}
          >
            gestion de la paie de salaire
          </Heading>
        </Box>
        <Center>
          <Box pb='5px'>
             <InputGroup width="300px">
              {filteredData.length === 0 ?
            <InputRightElement
              children={<Icon as={FiSearch} />}
              cursor="pointer"
            /> : 
            <InputRightElement
              children={<Icon as={IoClose} />}
              cursor="pointer"
            />}
            <Input
              placeholder="Rechercher un employé"
              variant="flushed"
              onChange={handleChange}
            />
          </InputGroup>
          </Box>
   
        </Center>
        
               {filteredData.length !=0 &&(
                 <Box py='9px' w='290px' bg={'white'} boxShadow="md" borderRadius="7px" overflow={"hidden"} overflowY='auto' placeItems={'center'} margin="0 auto">
           {filteredData.map((personnel, index) => (
              <Grid key={index} marginLeft='10px' >
              <Link  
                  href= {{
                      pathname: Routes.PaymentDetails?.path || '',
                      query: {id: personnel.id}
                  }}
              >
                  <Text 
                    width={'200px'}  
                    display={'flex'} 
                    alignItems='center' 
                    color='black' 
                    textDecoration="none"
                    _hover={{background:"lightgrey", color:'white'}}
                >
                  {personnel.firstName} {personnel.lastName} - {personnel.fonction.toLowerCase()}
                </Text>
              </Link>

              </Grid>
          ))} </Box>)}
          
        {/* <PaySlip />  */}
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
                        <Th>Prenom</Th>
                        <Th>Fonction</Th>
                      </Tr>
                    </Thead>
                    <Tbody>
                        <Tr>
                            <Td p={3} pl={6}>R</Td>
                            <Td p={3} pl={6}>R</Td>
                            <Td p={3} pl={6}>r</Td>
                        </Tr>
                        
                    </Tbody>
                </Table>
            </TableContainer>
        </Box>

      </Box>
    </DefaultLayout>
  );
};

export default Payment;

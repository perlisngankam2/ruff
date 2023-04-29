import { SearchIcon } from "@chakra-ui/icons";
import {
  Box,
  Center,
  Heading,
  Flex,
  ButtonGroup,
  Button,
  Input,
  InputGroup,
  InputRightElement,
  Icon,
  Hide,
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
import { GET_ALL_PERSONNELS, FIND_ALL_SALAIRE, GET_ALL_PERSONNEL_BY_ID } from "../../graphql/Queries";
import ReactPaginate from "react-paginate";

const LastPayment = () => {
  // const [searchName, setSearchName] = useState("");

  //STATE DE LA PAGINATION
  const itemsPerPage = 8;
  const [pageNumber, setPageNumber] = useState(0);
  const pagesVisited = pageNumber * itemsPerPage;

  const {data:dataPersonnel, loading, error} = useQuery(GET_ALL_PERSONNELS)
  const [personnel, setPersonnel] = useState([]);
  const [ filteredData, setFilteredData]=useState([]);
    const [ searchName, setSearchName]=useState("")

        const {data:dataSalaire, refetch} = useQuery(FIND_ALL_SALAIRE,
  {
    fetchPolicy: 'network-only',
  });

    // const {data:dataPersonnelId} = useQuery(GET_ALL_PERSONNEL_BY_ID,
    //   {
    //     variables:{ id: router.query.id}
    //   })

console.log(dataSalaire?.findallsalaire)

  const handleChange = (e) => {
    setSearchName(e.target.value);
    // const newFilter =   dataPersonnel.findAllpersonnel
    //           .filter((personnel) =>{
    //           return  (personnel.firstName.toLowerCase().includes (searchName.toLowerCase()) || personnel.lastName.toLowerCase().includes (searchName.toLowerCase()) || personnel.fonction.toLowerCase().includes (searchName.toLowerCase()))
              
    //         } );
    // if (searchName === ""){
    //   setFilteredData([]);
    // }else {
    //     setFilteredData(newFilter);
    // }
            
  };

  const pageCountPersonnel = Math.ceil(dataPersonnel?.findAllpersonnel.length / itemsPerPage);

    const changePage = ({ selected }) => {
      setPageNumber(selected);
    }
  return (
    <DefaultLayout>
      <Box 
        p={"10px"} 
        w="full" 
        minH="100vh" 
        bgColor="colors.tertiary"
         pt="70px" 
      >
        <Flex
          align="center"
          justify="space-between"
          boxShadow="md"
          p="5"
          rounded="lg"
          background="white"
          mb='10px'
        >
          <Heading
            textAlign="center"
            color="WindowText"
            size="lg"
            textColor="pink.300"
          >
           Derniers Paiements
          </Heading>
          <Hide below="sm">
            <Text>Dashboad / Salaires / Derniers Paiements</Text>
          </Hide>
        </Flex>
        <Center>
          <Box pb='5px' mt='20px'>
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
                        <Th>Noms & Prenoms</Th>
                        <Th>Mois de Salaire</Th>
                        <Th>Salaire Net</Th>
                        <Th></Th>
                      </Tr>
                    </Thead>
                    {dataSalaire && ( 
                    <Tbody>
                      { dataSalaire?.findallsalaire
                      .filter((personnel) => {
                         if (searchName === ""){
                            return personnel;
                          } else if (personnel.personnelFirstName.toLowerCase().includes (searchName.toLowerCase()) || 
                          personnel.personnelLastName.toLowerCase().includes (searchName.toLowerCase()) )
                              return personnel;
                      })
                      .slice(pagesVisited, pagesVisited + itemsPerPage)
                      
                      
                      .map((personnel, index) => ( 
                        <Tr key={index}>
                          
                            <Td p={3} pl={6}>{personnel.personnelFirstName.toUpperCase()+'  '+personnel.personnelLastName.charAt(0).toUpperCase()+personnel.personnelLastName.substring(1) }</Td>
                            <Td p={3} pl={6}>{personnel.moisPaie}</Td>
                            <Td p={3} pl={6}>{personnel.montant}</Td>
                             <Td p={0} >
                            <ButtonGroup 
                              size='sm' 
                              isAttached 
                              variant='link' 
                              colorScheme={'teal'}
                              >
                                <Button>
                                  
                                  <Link 
                                    href= {{
                      pathname: Routes.BulletinLastPayment?.path || '',
                      query: {id: personnel.id}
                  }}
                                  >Plus de details</Link>
                                </Button>
                              </ButtonGroup> 
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
            pageCount={pageCountPersonnel}
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

export default LastPayment;

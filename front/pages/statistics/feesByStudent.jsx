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
  InputRightElement,
  AlertDialogCloseButton
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
import {useTranslation} from "next-i18next";
import ReactToPrint from 'react-to-print';
import ReactToPdf from "react-to-pdf";
import ReactPaginate from "react-paginate";

import { getStaticPropsTranslations } from "../../types/staticProps";

import { 
  GET_ALL_STUDENT, 
  GET_STUDENT_BY_ID,
  GET_ALL_CLASS
} from "../../graphql/Queries";
import { DELETE_STUDENT } from "../../graphql/Mutation";
import { useMutation, useQuery } from "@apollo/client";
import { useAuth } from "../../contexts/account/Auth/Auth";

// const VARIABLE = "pearl";

const feesByStudent = () => {

    const cancelRef = React.useRef()
    const router = useRouter();
    const {t} = useTranslation();
  const { setAuthToken, authToken } = useAuth();
    const [query , setQuery] = useState("");
    const [data, setData] = useState([]);
    const keys = ["first_name", "last_name", "email", "classe"];
    const { isOpen, onToggle, onClose, onOpen } = useDisclosure();
    const [searchNameStudent, setSearchNameStudent] = useState("");
    const [searchClasseStudent, setSearchClasseStudent] = useState("");
    
    const [deletestudent] = useMutation(DELETE_STUDENT);
    // const [currentPage, setCurrentPage] = useState(1);
    
    //STATE DE LA PAGINATION
    const itemsPerPage = 15;
    const [pageNumber, setPageNumber] = useState(0);
    const pagesVisited = pageNumber * itemsPerPage;
    const {data:dataStudent, loading, error} = useQuery(GET_ALL_STUDENT,
      // {variables: {
      //   limit: itemsPerPage,
      //   offset: (currentPage - 1) * itemsPerPage,
      // },}
    );

    const {data:dataClasse} = useQuery(GET_ALL_CLASS);
  
    const search = (data) => {
       
      let datas = data.filter((item) => keys.some((key) => (
        item[key].toUpperCase().includes(query) 
        )
      ));
      console.log("datas :" , datas)
      return query ? datas.slice(0,5) : Users.slice(0,5)
    }; 

    useEffect(()=>{
      if(!authToken){
        router.back()
      }
      
    },[authToken])


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

    const handleChangeClasseStudent = (e) => {
      setSearchClasseStudent(e.target.value);
    };

    // const handlePageChange = (page) => {
    //   setCurrentPage(page);
    // };
    
    // const getPageCount = () => {
    //   // return Math.ceil(dataStudent && dataStudent.dataStudentCount / itemsPerPage);
    //   return Math.ceil(dataStudent?.findAllstudents.length / itemsPerPage);
    // };
    const pageCountStudent = Math.ceil(dataStudent?.findAllstudents.length / itemsPerPage);

    const changePage = ({ page }) => {
      setPageNumber(page);
    };

    

  return (
    <DefaultLayout>
      <Box p="3" pt={"70px"} w="full">
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
            {t("pages.eleves.listeDesEleves.listOfStudent")}
          </Heading>
          <Hide below="sm">
            <Text>Dashboad / Éleves / Liste Élèves</Text>
          </Hide>
        </Flex>

        <Flex gap={10} mt={7}>
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
            onChange={(event => setSearchClasseStudent(event.target.value))}
            // value={""}
          > 

           {dataClasse && dataClasse.findAllsalle.map((salle, index) => (
            <option key={index}>
                {salle.name}
            </option>
          ))}
          </Select>
          {/* { dataStudent &&  
            dataStudent.findAllstudents
            .filter((student) =>{
              if(searchClasseStudent==""){
                return student
              }else if(student.salleName.toLowerCase().includes (searchClasseStudent.toLowerCase()))
              return student
            })
          } */}
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
                    <Th>{t("pages.eleves.listeDesEleves.firstName")}</Th>
                    <Th>{t("pages.eleves.listeDesEleves.lastName")}</Th>
                    <Th>classe</Th>
                    {/* <Th >classe</Th> */}
                    {/* <Th>sexe</Th> */}
                    {/* <Th>Photo</Th> */}
                    <Th>{t("pages.eleves.listeDesEleves.actions")}</Th>
                  </Tr>
                  </Thead>
                  <Tbody>
                  {dataStudent && (
                    dataStudent.findAllstudents
                    .slice(pagesVisited, pagesVisited + itemsPerPage)
                    .filter((student) =>{
                      if(searchNameStudent == ""){
                        return student;
                      }else if (student.firstname.toLowerCase().includes (searchNameStudent.toLowerCase()) || 
                      student.lastname.toLowerCase().includes (searchNameStudent.toLowerCase()) ||
                       student.fatherFirstName.toLowerCase().includes (searchNameStudent.toLowerCase()))
                      return student;
                    })
                    .filter((student) =>{
                      if(searchClasseStudent == ""){
                        return student;
                      }else if (
                       student.salleName.toLowerCase().includes (searchClasseStudent.toLowerCase()))
                      return student;
                    })
                    .map((student, index) =>(
                      <Tr key={index}>
                        <Td >{student.firstname}</Td>
                        <Td >{student.lastname}</Td>
                        <Td >{student.salleName}</Td>
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
                                  pathname: Routes.FeesByStudentRegime.path || '',
                                  query: {id: student.id}
                                  }}
                                >
                                 {/* {t("pages.eleves.listeDesEleves.details")} */}
                                 fiche de paiement
                                </Link>
                              </Button>
                            </ButtonGroup> 
                            <ButtonGroup>
                           
                                <Link
                                 href= {{
                                  pathname: Routes.ParentStudentClassInfos.path || '',
                                  query: {id: student.id}
                                  }}
                                >
                                 {/* {t("pages.eleves.listeDesEleves.details")} */}
                                 details 
                                </Link>
                            </ButtonGroup>
                          </Td>
                            
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
            {/* <Box as="nav">
              <Box as="ul" className="pagination">
                {[...Array(getPageCount()).keys()].map((page) => (
                  <Box as="li" className="page-item" key={page}>
                    <Button className="page-link" onClick={() => handlePageChange(page + 1)}>
                      {page + 1}
                    </Button>
                  </Box>
              ))}
              </Box>
           </Box> */}
        </Box>
        <Box mt={"15px"}> 
          <ReactPaginate 
            previousLabel={"<<"}
            nextLabel={">>"}
            pageCount={pageCountStudent}
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
export async function getStaticProps({ locale }) {
  return {
    props: {
      ...(await getStaticPropsTranslations(locale)),
      // Will be passed to the page component as props
    },
  };
}

export default feesByStudent;

// export  const  getStaticProps = async() => {
//   const apolloClient = initializeApollo();
//   await apolloClient.query({
//     query:GET_STUDENT_BY_ID,
//     variables:{id: VARIABLE}
//   })
//   return{propos:{initialzeApollState: apolloClient.cache.extract()}}
// }
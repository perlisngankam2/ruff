import {
  Avatar,
  Box,
  Button,
  Center,
  Flex,
  Heading,
  Hide,
  Icon,
  Input,
  InputGroup,
  InputRightElement,
  Text,
  VStack
} from "@chakra-ui/react";

import Routes from "../../modules/routes";
import Link from "next/link";
import Employee from "../../components/atoms/Employe";
import DefaultLayout from "../../components/layouts/DefaultLayout";
import { FiSearch, FiEdit } from "react-icons/fi";
import { MdDelete } from "react-icons/md";
import { BiDetail } from "react-icons/bi";
import { Formik } from "formik";
import { useEffect, useState } from "react";
import { IoIosAdd } from "react-icons/io";
import { Router, useRouter } from "next/router";
import { useMutation, useQuery } from "@apollo/client";
import { GET_ALL_PERSONNELS } from "../../graphql/Queries";
import { DELETE_PERSONNEL } from "../../graphql/Mutation";
import Category from "./categorypersonnel";
import ReactPaginate from "react-paginate";
import { UseTranslation, useTranslation } from "next-i18next";

const Personnel = () => {
  const router = useRouter();
  const [searchName, setSearchName] = useState("");
  console.log(searchName);
  const {data:dataPersonnel, loading, error} = useQuery(GET_ALL_PERSONNELS)
  const [deletePersonnel] = useMutation(DELETE_PERSONNEL);
  const [personnel, setPersonnel] = useState([]);
  const [pageNumber, setPageNumber] = useState(0);
  const itemsPerPage = 8;
  const pagesVisited = pageNumber * itemsPerPage;
  const {t} = useTranslation()


  const employees = [
    { id: 1, name: "DON WILFRIED", function: "Directeur" },
    { id: 2, name: "ALAIN KANA", function: "Enseignant" },
    { id: 3, name: "BLAISE MATUIDI", function: "Enseignant" },
    { id: 4, name: "LIONEL MESSI", function: "Enseignant" },
    { id: 5, name: "SANCHEZ RENA", function: "Enseignant" },
    { id: 6, name: "DILAN DEMBA", function: "Enseignant" },
    { id: 7, name: "NEY REMA", function: "Enseignant" },
    { id: 8, name: "HALAN JAMES", function: "Enseignant" },
  ];


  useEffect (() => {
    setPersonnel(dataPersonnel)
    console.log(dataPersonnel) 
  }, [dataPersonnel])
 
  if (loading) return <Text>Chargement en cour...</Text>
  if (error) return <Text>Une erreur s'est produite!</Text>

  // const removePersonnel = async(id) => {
  //   await deletePersonnel({
  //       variables: {id},
        
  //       refetchQueries:[{
  //         query: GET_ALL_PERSONNELS
  //       }]
  //   })
  // }
  
  const handleChange = (e) => {
    setSearchName(e.target.value);
  };
  
  
  const pageCount = Math.ceil(dataPersonnel?.findAllpersonnel.length / itemsPerPage);

  const changePage = ({ selected }) => {
    setPageNumber(selected);
  };
  return (
    <DefaultLayout>
      <Box 
        p="3" 
        pt="70px" 
        background="colors.tertiary" 
        w="full" 
        minH="100vh"
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
            {t('pages.personnel.index.personnelList')}
          </Heading>
          <Hide below="sm">
            <Text>Dashboad / personnel /Liste du personnel</Text>
          </Hide>
        </Flex>
        <Flex 
          // bg="white" 
          my="5"
          p="5" 
          rounded="md" 
          justify="space-between"
         >
          <InputGroup width="500px">
            <InputRightElement
              children={<Icon as={FiSearch} />}
              cursor="pointer"
            />
            <Input
              placeholder="Rechercher un employé"
              variant="flushed"
              onChange={handleChange}
            />
          </InputGroup>
          <Button
            rightIcon={<Icon as={IoIosAdd} boxSize="20px" />}
            onClick={() => router.push("/personnel/ajouterpersonnel")}
          >
            {t('pages.personnel.index.addPersonnelButton')}
          </Button>
        </Flex>
        <Flex gap={5} flexWrap="wrap" >
        <Box 
          w="full" 
          bg="white" 
          rounded="md" 
          p="3" 
          boxShadow="md"
        >
        <Flex gap={12} mt={3} flexWrap="wrap">
         {dataPersonnel && ( 
           
            dataPersonnel.findAllpersonnel
            .slice(pagesVisited, pagesVisited + itemsPerPage)
            .filter((personnel) =>{
              if(searchName == ""){
                return personnel;
              }else if (personnel.firstName.toLowerCase().includes (searchName.toLowerCase()) || 
              personnel.lastName.toLowerCase().includes (searchName.toLowerCase()) || 
              personnel.fonction.toLowerCase().includes (searchName.toLowerCase()))
              return personnel;
            }
              
            )
            .map((personnel, index) => (
              <Box key={index}>
                <Employee
                  firstName={personnel.firstName}
                  lastName={personnel.lastName}
                  fonction={personnel.fonction}
                  situationMatrimonial={personnel.situationMatrimonial}
                  id={personnel.id}
                  sexe={personnel.sexe}
                />
              </Box>
            )) )}
          </Flex>
        </Box>
        <Center mt="5px" ml="540px"> 
          <Box> 
            <ReactPaginate 
              previousLabel={"<<"}
              nextLabel={">>"}
              pageCount={pageCount}
              onPageChange={changePage}
              containerClassName={"paginationBttns"}
              previousLinkClassName={"previousBttn"}
              nextLinkClassName={"nextBttn"}
              disabledClassName={"paginationDisabled"}
              activeClassName={"paginationActive"}
            />
          </Box>
        </Center>
          {/* {dataPersonnel
            .filter((personnel) =>{
              if(searchName == ""){
                return personnel;
              }else if (personnel.firstName.toLowerCase().includes(searchName.toLowerCase()))
              return personnel;
            }
              
            )
            .map((personnel, index) => (
              <Box key={index}>
                <Employee
                  name={personnel.name}
                  function={personnel.function}
                  id={personnel.id}
                />
              </Box>
            ))} */}
        </Flex>
        {/* {
        data &&(
        <Box>
          {
            data.findAllpersonnel.map((personnel)=>(
            <Box key={personnel.id}>
              <Box>{personnel.sexe}</Box>
              <Box>{personnel.status}</Box>
              <Box>{personnel.situationMatrimonial}</Box>
              <Box>{personnel.dateOfStartWork}</Box>
              <Box>{personnel.matricule}</Box>
              <Box>{personnel.fonction}</Box>
              <Box>{personnel.childNumber}</Box>
            </Box> 
              ))
          }
        </Box>
        )} */}
      </Box>
    </DefaultLayout>
  );
};

export default Personnel;

import {
  Avatar,
  Box,
  Button,
  Center,
  Flex,
  Heading,
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

const Personnel = () => {
  const router = useRouter();
  const [searchName, setSearchName] = useState("");
  console.log(searchName);
  const {data:dataPersonnel, loading, error} = useQuery(GET_ALL_PERSONNELS)
  const [deletePersonnel] = useMutation(DELETE_PERSONNEL);
  const [personnel, setPersonnel] = useState([]);
  
  
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

  const removePersonnel = async(id) => {
    await deletePersonnel({
        variables: {id},
        refetchQueries:[{
          query: GET_ALL_PERSONNELS
        }]
    })
  }
  
  const handleChange = (e) => {
    setSearchName(e.target.value);
  };
  
  return (
    <DefaultLayout>
      <Box p="3" pt="70px" background="colors.tertiary" w="full" minH="100vh">
        <Flex bg="white" my="5" p="5" rounded="md" justify="space-between">
          <InputGroup width="300px">
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
            Ajouter Personnel
          </Button>
        </Flex>
        <Flex gap={5} flexWrap="wrap" >
        <Box w="full" bg="white" rounded="md" p="3" boxShadow="md">
        <Flex gap={12} mt={3} flexWrap="wrap">
         {dataPersonnel && ( 
            dataPersonnel.findAllpersonnel.map((personnel, index) => (
            <Box
              key={index}
              bg={"gray.200"}
              width={"200px"}
              rounded="md"
            > 
              <Center>
                <Avatar
                  boxSize="70px"
                  mt={["10px","10px", "10px" ]}
                  src="https://img.freepik.com/vecteurs-premium/profil-avatar-homme-icone-ronde_24640-14044.jpg?w=2000"
                />
              </Center>
              <Text 
                textAlign="center" 
                fontSize="0.85em" 
                m={["8px", "8px", "8px"]}
              >
                {personnel.firstName}
              </Text>
              <Text 
                textAlign="center" 
                fontSize="0.85em" 
                m={["8px", "8px", "8px"]}
              >
                {personnel.lastName}
              </Text>
              <Text 
                textAlign="center" 
                fontWeight="bold" 
                fontSize="0.85em"
              >
                {personnel.fonction}
              </Text>
              <Text 
                textAlign="center" 
                fontWeight="bold" 
                fontSize="0.85em"
                mb={["7px", "7px", "7px"]}
              >
                {personnel.situationMatrimonial}
              </Text>
              <Flex justify="center" gap="4">
                <Link 
                href={{
                  pathname: Routes.PersonnelDetails.path,
                  query: {id: personnel.id}
                }}
                >
                  <Icon
                    as={BiDetail}
                    boxSize="40px"
                    p="3"
                    bg="purple.100"
                    rounded="full"
                  />
                </Link>
                <Link href="/personnel/modifierpersonnel">
                  <Icon
                    as={FiEdit}
                    boxSize="40px"
                    p="3"
                    bg="blue.100"
                    rounded="full"
                  />
                </Link>
                <Link href="#">
                  <Icon
                    as={MdDelete}
                    boxSize="40px"
                    p="3"
                    bg="red.500"
                    rounded="full"
                    color="white"
                    onClick={() => removePersonnel(personnel.id)}
                  />
                </Link>
              </Flex>
            </Box>
          )) )}
          </Flex>
        </Box>
          {/* {dataPersonnel && (  
            
          )
            .filter((personnel) =>
              personnel.sexe.includes(searchName.toUpperCase())
            )
            {dataPersonnel.findAllpersonnel.map((personnel, index) => (
              <Box key={index}>
                <Employee
                  name={personnel.name}
                  function={personnel.function}
                  id={personnel.id}
                />
              </Box>
            ))}} */}
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

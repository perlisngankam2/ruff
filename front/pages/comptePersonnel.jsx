import React from 'react';
import {
  Box,
  Button,
  Center,
  Flex,
  FormControl,
  FormLabel,
  Heading,
  HStack,
  Input,
  Select,
  Stack,
  VStack,
  useToast,
  Text
} from "@chakra-ui/react";
import { useFormik } from "formik";
import Link from "next/link";
import { CREATE_USER } from "../graphql/Mutation";
import { useMutation, useQuery } from "@apollo/client";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import DefaultLayout from "../components/layouts/DefaultLayout";

function comptePersonnel() {

  const [Nom , setNom] = useState("");
  const [Prenom , setPrenom] = useState("");
  const [PhoneNumber, setPhoneNumber] = useState("");
  const [Email , setEmail] = useState("");
  const [Password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState('');
  const [passwordsMatch, setPasswordsMatch] = useState(true);
  const [createUser, error] = useMutation(CREATE_USER);
  const toast = useToast()
  const router = useRouter()


  const handleConfirmPasswordChange = (event) => {
  setConfirmPassword(event.target.value);
  setPasswordsMatch(event.target.value === Password);
  };
 

  const HandleClick = async (event) => {
  event.preventDefault();
  const userData = await createUser({
        variables:{
        createUser: { 
          email: Email,
          password : Password,
        }
      }
    })
    console.log(userData)
    toast({
      title: "Compte crée avec succès",
      description: "Vous avez maintenant un compte utilisateur.",
      status: "success",
      duration: 3000,
      isClosable: true,
    });

    setEmail("");
    setPassword("");
    setConfirmPassword("")
    router.push("/personnel/ajouterpersonnel")

  }


  return (

    
    // <DefaultLayout>
    //   <Box flex="4"  background="gray.100" height="100vh">
    //     <Center >
    //       <Box
    //         maxW={{ base: "md", sm: "lg", lg: "xl" }}
    //         boxShadow="xl"
    //         rounded={13}
    //         background="white"
    //       >
    //         <Container maxW={{ base: "sm", sm: "md" }} >
              
    //           <Box as="form" onSubmit={HandleClick} px="7">
        
    //             <FormControl mb={3}>
    //               <FormLabel>Email</FormLabel>
    //               <Input
    //                 type="email"
    //                 value={Email}
    //                 onChange={(e) => setEmail(e.target.value)}
    //                 name="Email"
    //                 placeholder="votre email ...."
    //               />
    //             </FormControl>
    //             <FormControl mb={4} isRequired>
    //               <FormLabel>Mot de Passe</FormLabel>
    //               <Input
    //                 type="password"
    //                 value={Password}
    //                 onChange={(e) => setPassword(e.target.value)}
    //                 name="Password"
    //                 placeholder="********"
    //               />
    //             </FormControl>

    //             <Button w="100%" colorScheme="green" type="submit" mb={5}>
    //               Creer
    //             </Button>
    //           </Box>
    //         </Container>
    //       </Box>
    //     </Center>
    //   </Box>
    // </DefaultLayout>

        <DefaultLayout>
      <Box 
        pt="70px" 
        width="full" 
        background="colors.tertiary"
      >
        <Center>
          <VStack
            gap={5}
            boxShadow="md"
            rounded="md"
            p="10"
            background="white"
            mt={10}
          >
            <Box 
              as="form"
              width="500px"
            > 
              <Heading color={"colors.primary"}>Creation d'un compte</Heading>
              <Stack
                gap={2}
                align="start"
                direction={["column", "column", "column"]}
                mt="25px"
              >
                  <FormControl>
                    <FormLabel>Email</FormLabel>
                    <Input 
                      placeholder="Email" 
                      type="email"
                      // maxW="300px"
                      name="email"
                      value={Email}
                      onChange = {(event) => setEmail(event.target.value)}
                    />
                  </FormControl>
                  <FormControl>
                    <FormLabel>Mot de Passe</FormLabel>
                    <Input 
                      placeholder="********"
                      type="password"
                      // maxW="300px"
                      name="Password"
                      value={Password}
                      onChange = {(event) => setPassword(event.target.value)}
                    />
                  </FormControl>
                     <FormControl>
                    <FormLabel>confirmation mot de passe </FormLabel>
                    <Input 
                      placeholder="********"
                      type="password"
                      // maxW="300px"
                      name="Password"
                      value={confirmPassword}
                      onChange={handleConfirmPasswordChange}
                    />
                  </FormControl>
                  {!passwordsMatch && <Text color='red'>Les mots de passe ne correspondent pas.</Text>}
                  
                  <Flex gap={5} pt="30px">
                    <Button colorScheme="red" onClick={() => router.back()}>
                      Annuler
                    </Button>
                    <Button
                      colorScheme="green"
                      onClick={HandleClick}
                    >
                      Creer
                    </Button>
                  </Flex>
              </Stack>
            </Box>
          </VStack>
        </Center>
      </Box>
    </DefaultLayout>

  );
}

export default comptePersonnel
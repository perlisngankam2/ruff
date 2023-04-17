import React from 'react'
import {
  Box,
  Button,
  Center,
  Checkbox,
  Container,
  Flex,
  FormControl,
  FormLabel,
  Heading,
  Hide,
  HStack,
  Image,
  Input,
  Text,
} from "@chakra-ui/react";
import { useFormik } from "formik";
import { NextLink } from "next/link";
import { Link } from "@chakra-ui/react";
import { LOGIN_USER} from "../../../graphql/Mutation";
import { useMutation, useQuery } from "@apollo/client";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { GET_USER_CONNECTED} from  "../../../graphql/Queries"
import dashboard from "../../../pages/dashboard.jsx";
import { useAuth } from '../../../contexts/account/Auth/Auth'


function ResetPassword() {

  const[passwordChange , setPasswordChange] = useState("");
  const[password , setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState('');
  const [passwordsMatch, setPasswordsMatch] = useState(true);
  const [loginInput , error] = useMutation(LOGIN_USER);
  const [user, setUser] = useState(null);
  const router = useRouter();
  const { setAuthToken } = useAuth();
  const { dataUser, called, loading } = useQuery(GET_USER_CONNECTED);



const handleConfirmPasswordChange = (event) => {
  setConfirmPassword(event.target.value);
  setPasswordsMatch(event.target.value === passwordChange);
  };

    const HandleClick = async (event) => {
  event.preventDefault();

  const userData = await createUser({
    //     variables:{
    //     createUser: { 
    //       firstName: Nom,
    //       lastName: Prenom,
    //       phoneNumber: PhoneNumber,
    //       email: Email,
    //       password : Password,
    //       role:"ADMIN"
    //     }
    //   }
    })
    console.log(userData)
    toast({
      title: "Account created.",
      description: "We've created your account for you.",
      status: "success",
      duration: 3000,
      isClosable: true,
    });
    router.push('/')
  }

  return (
     <Flex w="full">
    
      <Box flex="4" pt="20" background="gray.100" height="100vh">
        <Center>
          <Box
            maxW={{ base: "md", sm: "lg", lg: "xl" }}
            boxShadow="xl"
            rounded={13}
            background="white"
          >
            <Container maxW={{ base: "sm", sm: "md" }} px="0">
              <Heading
                textAlign="center"
                mb={2}
                color="white"
                background="#0E341F"
                roundedTop={13}
                p="5"
              >
                Modifier Mot de passe
              </Heading>
              <Box 
            //   as="form"  
              px="7">
                <FormControl mb={4}>
                  <FormLabel>Ancien mot de passe</FormLabel>
                  <Input
                    id="password"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    name="password"
                    // placeholder='Entrez votre ancien mot de passe'
                  />
                </FormControl>
                <FormControl mb={4}>
                  <FormLabel>Nouveau mot de passe</FormLabel>
                  <Input
                    id="passwordChange"
                    type="passwordChange"
                    value={passwordChange}
                    onChange={(e) => setPasswordChange(e.target.value)}
                    name="passwordChange"
                    // placeholder='Entrez votre nouveau mot de passe'
                  />
                </FormControl>
                 <FormControl >
                    <FormLabel>Confirmation mot de passe </FormLabel>
                    <Input 
                      placeholder="********"
                      type="password"
                      // maxW="300px"
                      name="Password"
                      value={confirmPassword}
                      onChange={handleConfirmPasswordChange}
                    />
                  </FormControl>
                  {!passwordsMatch && <Text color='red' fontSize='sm'>Les mots de passe ne correspondent pas.</Text>}

                {/* <HStack mb={5} spacing={{ base: "10px", lg: "60px" }}>
                  <Checkbox
                    id="remember"
                    colorScheme="green"
                    // isChecked={formik.values.remember}
                    // onChange={formik.handleChange}
                  >
                    Se souvenir de moi
                  </Checkbox>
                </HStack> */}
                <Button w="100%"
                 colorScheme="green"
                //   type="submit"
                   mb={5} 
                   mt='6' 
                   onClick={()=> router.push("/")}>
                  Réinitialiser
                </Button>
              </Box>
            </Container>
          </Box>
        </Center>
        {/* <Center>
            <Box pt={5}>
            Vous n'avez pas encore de compte ? <Link _hover={{color : "blue", textDecoration : "underline" }} href="/register" >creer le</Link>
          </Box>
        </Center> */}
        
      </Box>
    </Flex>
  )
}

export default ResetPassword
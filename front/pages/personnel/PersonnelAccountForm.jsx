import React from 'react';
import {
  Box,
  Button,
  Center,
  Flex,
  FormControl,
  FormLabel,
  Heading,
  InputGroup,
  HStack,
  InputRightElement,
  Input,
  Select,
  Stack,
  VStack,
  useToast,
  Text,
  FormErrorMessage 
} from "@chakra-ui/react";
import { useFormik } from "formik";
import Link from "next/link";
import { CREATE_USER } from "../../graphql/Mutation";
import { GET_ALL_USER} from "../../graphql/Queries";
import { useMutation, useQuery } from "@apollo/client";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import DefaultLayout from "../../components/layouts/DefaultLayout";
import { useTranslation } from 'next-i18next';
import { ViewIcon, ViewOffIcon } from '@chakra-ui/icons';
import { useAuth } from "../../contexts/account/Auth/Auth";


function PersonnelAccountForm() {


  const { setAuthToken, authToken } = useAuth();
  const [Nom , setNom] = useState("");
  const [Prenom , setPrenom] = useState("");
  const [PhoneNumber, setPhoneNumber] = useState("");
  const [Email , setEmail] = useState("");
  const [Password, setPassword] = useState("");
  const [motDePasseEstInvalide, setMotDePasseEstInvalide] = useState(false);
  const [confirmPassword, setConfirmPassword] = useState('');
  const [passwordsMatch, setPasswordsMatch] = useState(true);
  const [isInvalid, setIsInvalid] = useState();
  const [createUser, error] = useMutation(CREATE_USER);
  const toast = useToast()
  const router = useRouter()
  const {t} = useTranslation();

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const {data:dataUser, refetch} = useQuery(GET_ALL_USER);


  const handleConfirmPasswordChange = (event) => {
    setConfirmPassword(event.target.value);
    setPasswordsMatch(event.target.value === Password);
  };
 
  // console.log(dataUser)
  const HandleClick = async (event) => {
  event.preventDefault();

  setIsInvalid(Password !== "" && !/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/.test(Password))

  if(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/.test(Password)){
  const userData = await createUser({
      variables:{
        createUser: { 
          email: Email,
          password : Password,
        }
      }
    })
    refetch()
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
    router.push("/personnel")
  }

  }
  useEffect(()=>{
    if(!authToken){
      router.back()
    }
    
  },[authToken])

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
              <Heading 
                color={"colors.primary"}
                fontSize={"2xl"}
              >
                {t('pages.personnel.PersonnelAccountForm.heading')}
              </Heading>
              <Stack
                gap={2}
                align="start"
                direction={["column", "column", "column"]}
                mt="25px"
              >
                  <FormControl>
                    <FormLabel>
                    {t('pages.personnel.PersonnelAccountForm.email')}
                    </FormLabel>
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
                    <FormLabel>
                    {t('pages.personnel.PersonnelAccountForm.passWord')}
                    </FormLabel>
                      <InputGroup>
                          <Input 
                      type={showPassword ? 'text' : 'password'}
                      placeholder="********"
                      // maxW="300px"
                      name="Password"
                      value={Password}
                      onChange = {(event) => setPassword(event.target.value)}
                     pattern="^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$"
                      errorBorderColor="crimson"
                      required
      />
                {/* <Input type={showPassword ? 'text' : 'password'} /> */}
                <InputRightElement h={'full'}>
                  <Button
                    variant={'ghost'}
                    onClick={() =>
                      setShowPassword((showPassword) => !showPassword)
                    }>
                    {showPassword ? <ViewIcon /> : <ViewOffIcon />}
                  </Button>
                </InputRightElement>
              </InputGroup>
                
        <Box mt={1} color={"crimson"}>
        {isInvalid && (
          <Text>
            Le mot de passe doit contenir au moins un chiffre, une lettre majuscule et une lettre minuscule, et doit comporter au moins 8 caractères ou plus.
          </Text>
        )}
     </Box>
                  </FormControl>
                     <FormControl>
                    <FormLabel>
                        {t('pages.personnel.PersonnelAccountForm.confirmPassWord')}
                    </FormLabel>

                      <InputGroup>
                        <Input 
                      placeholder="********"
                      type={showConfirmPassword ? 'text' : 'password'}
                      // maxW="300px"
                      name="Password"
                      value={confirmPassword}
                      onChange={handleConfirmPasswordChange}
                    />
                {/* <Input type={showPassword ? 'text' : 'password'} /> */}
                <InputRightElement h={'full'}>
                  <Button
                    variant={'ghost'}
                    onClick={() =>
                      setShowConfirmPassword((showConfirmPassword) => !showConfirmPassword)
                    }>
                    {showConfirmPassword ? <ViewIcon /> : <ViewOffIcon />}
                  </Button>
                </InputRightElement>
              </InputGroup>
                   
                  </FormControl>
                  {!passwordsMatch && confirmPassword!=="" && <Text color='red'>
                  {t('pages.personnel.PersonnelAccountForm.passWordsDoNotCorresponding')}
                    </Text>}
                  <Flex gap={5} pt="30px">
                    <Button colorScheme="red" onClick={() => router.back()}>
                         {t('pages.personnel.PersonnelAccountForm.annuler')}
                    </Button>
                    <Button
                      colorScheme="green"
                      onClick={HandleClick}
                    >
                        {t('pages.personnel.PersonnelAccountForm.createBotton')}
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

export default PersonnelAccountForm
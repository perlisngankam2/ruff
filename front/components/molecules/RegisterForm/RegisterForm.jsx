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
} from "@chakra-ui/react";
import { useFormik } from "formik";
import Link from "next/link";
import { CREATE_USER } from "../../../graphql/Mutation";
import { useMutation, useQuery } from "@apollo/client";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { useToast } from "@chakra-ui/react";

const RegisterForm = () => {

  const [Nom , setNom] = useState("");
  const [Prenom , setPrenom] = useState("");
  const [PhoneNumber, setPhoneNumber] = useState("");
  const [Email , setEmail] = useState("");
  const [Password, setPassword] = useState("");
  const [createUser, error] = useMutation(CREATE_USER);
  const toast = useToast()
  const router = useRouter()
 

  const HandleClick = async (event) => {
  event.preventDefault();

  const userData = await createUser({
        variables:{
        createUser: { 
          firstName: Nom,
          lastName: Prenom,
          phoneNumber: PhoneNumber,
          email: Email,
          password : Password,
          role:"ADMIN"
        }
      }
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
      <Hide below="md">
        <Box flex="3" background="rgb(226, 211, 155)" height="100vh">
          <Center>
            <Image src="logo.png" />
          </Center>
        </Box>
      </Hide>
      <Box flex="4" pt="19" background="gray.100" height="100vh">
        <Center pt="19">
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
                Creer votre compte
              </Heading>
              <Box as="form" onSubmit={HandleClick} px="7">
                <FormControl mb={3} isRequired>
                  <FormLabel>Noms</FormLabel>
                  <Input
                    type="text"
                    value={Nom}
                    onChange={(e) => setNom(e.target.value)}
                    name="Nom"
                    placeholder="votre nom ...."
                    errorMessage ="Nom doit avoir 3-16 caracteres et sans inclure les caracteres speciaux"
                    pattern = "^[A-Za-z0-9]{3-16}$"

                    
                  />
                </FormControl>
                <FormControl mb={3} isRequired>
                  <FormLabel>Prenoms</FormLabel>
                  <Input
                    type="text"
                    value={Prenom}
                    onChange={(e) => setPrenom(e.target.value)}
                    name="Prenom"
                    placeholder="votre prenom ...."
                    errorMessage ="Prenom doit avoir 3-16 caracteres et sans inclure les caracteres speciaux"
                    pattern = "^[A-Za-z0-9]{3-16}$"

                  />
                </FormControl>
                <FormControl mb={3}>
                  <FormLabel>Email</FormLabel>
                  <Input
                    type="email"
                    value={Email}
                    onChange={(e) => setEmail(e.target.value)}
                    name="Email"
                    placeholder="votre email ...."
                  />
                </FormControl>
                <FormControl mb={3} isRequired>
                  <FormLabel>Telephone</FormLabel>
                  <Input
                    type="text"
                    value={PhoneNumber}
                    onChange={(e) => setPhoneNumber(e.target.value)}
                    name="PhoneNumber"
                    placeholder=" 6XXXXXXXX"
                  />
                </FormControl>
                <FormControl mb={4} isRequired>
                  <FormLabel>Mot de Passe</FormLabel>
                  <Input
                    type="password"
                    value={Password}
                    onChange={(e) => setPassword(e.target.value)}
                    name="Password"
                    placeholder="********"
                  />
                </FormControl>

                <Button w="100%" colorScheme="green" type="submit" mb={5}>
                  S'inscrire
                </Button>
              </Box>
            </Container>
          </Box>
        </Center>
      </Box>
    </Flex>
  );
};

export default RegisterForm;
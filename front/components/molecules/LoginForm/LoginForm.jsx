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
import { NextLink } from "next/link";
import { Link } from "@chakra-ui/react";
import { LOGIN_USER} from "../../../graphql/Mutation";
import { useMutation, useQuery } from "@apollo/client";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { GET_USER_CONNECTED} from  "../../../graphql/queries"
import dashboard from "../../../pages/dashboard.jsx";
import { useAuth } from '../../../contexts/account/Auth/Auth'


const LoginForm = () => {
  const[email , setEmail] = useState("");
  const[password , setPassword] = useState("");
  const [loginInput , error] = useMutation(LOGIN_USER);
  const [user, setUser] = useState(null);
  const router = useRouter();
  const { setAuthToken } = useAuth();
  const { dataUser, called, loading } = useQuery(GET_USER_CONNECTED);

//  console.log(setAuthToken.isLogged)

console.log(dataUser)

   const HandleClick = async (event) => {
        event.preventDefault();
        
            const login = await loginInput({
                    variables:{
                      loginInput: { 
                        username: email,
                        password : password
                      }
                  }
              });

                // console.log(login.data.login)
                  if (login.data.login) {
                    setAuthToken?.(login.data.login.access_token , login.data.login.user.role);
                    router.push('/dashboard');
                  }
       };


  return (
    <Flex w="full">
      <Hide below="md">
        <Box flex="3" background="rgb(226, 211, 155)" height="100vh">
          <Center>
            <Image src="logo.png" />
          </Center>
        </Box>
      </Hide>
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
                Connexion
              </Heading>
              <Box as="form" onSubmit={HandleClick} px="7">
                <FormControl mb={3}>
                  <FormLabel>Email</FormLabel>
                  <Input
                    id="matricule"
                    type="text"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </FormControl>
                <FormControl mb={4}>
                  <FormLabel>Mot de Passe</FormLabel>
                  <Input
                    id="password"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    name="password"
                  />
                </FormControl>

                <HStack mb={5} spacing={{ base: "10px", lg: "60px" }}>
                  <Checkbox
                    id="remember"
                    colorScheme="green"
                    // isChecked={formik.values.remember}
                    // onChange={formik.handleChange}
                  >
                    Se souvenir de moi
                  </Checkbox>
                  <Link href="#">
                    <Box as="span" color="#0E341F">
                      Mot de passe oublié ?
                    </Box>
                  </Link>
                </HStack>
                <Button w="100%" colorScheme="green" type="submit" mb={5}>
                  Se connecter
                </Button>
              </Box>
            </Container>
          </Box>
        </Center>
        <Center>
            <Box pt={5}>
            Vous n'avez pas encore de compte ? <Link _hover={{color : "blue", textDecoration : "underline" }} href="/register" >creer le</Link>
          </Box>
        </Center>
        
      </Box>
    </Flex>
  );
};

export default LoginForm;
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
  Select,
  Input,
  AlertDialog,
  AlertDialogBody,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogContent,
  AlertDialogOverlay,
  useDisclosure,
  Text,
} from "@chakra-ui/react";
import React from "react";
import { useFormik } from "formik";
import { NextLink } from "next/link";
import { Link } from "@chakra-ui/react";
import { LOGIN_USER } from "../../../graphql/Mutation";
import { useMutation, useQuery } from "@apollo/client";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { GET_USER_CONNECTED } from "../../../graphql/Queries";
import dashboard from "../../../pages/dashboard.jsx";
import { useAuth } from "../../../contexts/account/Auth/Auth";
import { useTranslation } from "next-i18next";

const LoginForm = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const cancelRef = React.useRef();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loginInput] = useMutation(LOGIN_USER, {
    onError: (error) => console.log(error),
  });

  const [user, setUser] = useState(null);
  const router = useRouter();
  const { setAuthToken, authToken } = useAuth();
  const { dataUser, called, loading, error } = useQuery(GET_USER_CONNECTED);
  const [errors, setErrors] = useState("");
  const { t } = useTranslation();
  //console.log(setAuthToken.isLogged)

  // console.log(authToken);
  // useEffect(()=>{
  //   if(authToken){
  //     router.back()
  //   }
  // },[authToken])

  console.log(dataUser);
  const [isLoading, setIsLoading] = useState(false);

  const HandleClick = async (event) => {
    event.preventDefault();
    setIsLoading(true);

    const response = await loginInput({
      variables: {
        loginInput: {
          username: email,
          password: password,
        },
      },
    });

    // console.log(authToken);
    const authTokenns = response.data?.login.access_token;
    console.log(authTokenns);

    if (authTokenns) {
      router.push("/dashboard");
    } else {
      console.error("Erreur de connexion");
      // return <Text>Vos informations sont incorrectes</Text>
      setErrors("Vos informations sont incorrectes. Veuillez reessayer.");
    }
    setTimeout(() => {
      setErrors("");
    }, 5000); // Effacer après 5 secondes (ajustez selon vos besoins)
    setIsLoading(false);

    // console.log(login.data.login.user);
    // if (data.login) {
    //   setAuthToken?.(data.login.access_token, data.login.user.id);
    // setAuthToken?.(data.login.access_token, data.login.user.id);
    // if(login.data.login.user.deactivatedAt === null && login.data.login.user.role !== 'ADMIN'){
    //   // router.push('/resetPassword')
    //     onOpen()
    // } else {
    // }
    // } else {
    //   console.error("Erreur de connexion");
    // }
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
            as="form"
            onSubmit={HandleClick}
          >
            <Container maxW={{ base: "sm", sm: "md" }} px="0">
              <Heading
                textAlign="center"
                mb={2}
                color="white"
                background="#0E341F"
                roundedTop={13}
                p="5"
                fontSize={"3xl"}
              >
                Connexion
              </Heading>
              <Box px="7">
                <FormControl mb={3}>
                  <FormLabel>{t("molecules.LoginForm.email")}</FormLabel>
                  {/* <FormLabel>Email</FormLabel> */}
                  <Input
                    id="matricule"
                    type="text"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    isRequired
                  />
                </FormControl>
                <FormControl mb={4}>
                  <FormLabel>{t("molecules.LoginForm.motDePasse")}</FormLabel>
                  <Input
                    id="password"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    name="password"
                    isRequired
                  />
                </FormControl>
                {errors && (
                  <Text
                    color={"red"}
                    textAlign={"center"}
                    fontSize={"15px"}
                    marginBottom={"5px"}
                  >
                    {errors}
                  </Text>
                )}
                {/* <HStack mb={5} spacing={{ base: "10px", lg: "60px" }}>
                  <Checkbox
                    id="remember"
                    colorScheme="green"
                    // isChecked={formik.values.remember}
                    // onChange={formik.handleChange}
                  >
                    {/* Se souvenir de moi */}
                {/* {t("molecules.LoginForm.seSouvenirDeMoi")} */}
                {/* </Checkbox>
                  <Link href="#">
                    <Box as="span" color="#0E341F">
                      {t("molecules.LoginForm.motDePasseOublie")} */}
                {/* Mot de passe oublié ? */}
                {/* </Box>
                  </Link>
                </HStack>  */}
                <>
                  <Button
                    w="100%"
                    colorScheme="green"
                    isLoading={isLoading}
                    type="submit"
                    mb={5}
                  >
                    {t("molecules.LoginForm.seConnecter")}
                  </Button>

                  <AlertDialog>
                    <AlertDialogOverlay>
                      <AlertDialogContent>
                        <AlertDialogHeader fontSize="lg" fontWeight="bold">
                          Reinitialisation de mot de passe
                        </AlertDialogHeader>

                        <AlertDialogBody>
                          Souhaitez vous modifier le de passe qui vous a ete
                          donnee?
                        </AlertDialogBody>

                        <AlertDialogFooter>
                          <Button ref={cancelRef} onClick={onClose}>
                            Non
                          </Button>
                          <Link href={"#"}>
                            <Button colorScheme="green" ml={3}>
                              Oui
                            </Button>
                          </Link>
                        </AlertDialogFooter>
                      </AlertDialogContent>
                    </AlertDialogOverlay>
                  </AlertDialog>
                </>
              </Box>
            </Container>
          </Box>
        </Center>
        <Center>
          <Box pt={5}>
            {t("molecules.LoginForm.vousNavezPasDeCompte")}
            <Link
              _hover={{ color: "blue", textDecoration: "underline" }}
              href="/register"
            >
              {t("molecules.LoginForm.creezLeCompte")}
            </Link>
          </Box>
        </Center>
      </Box>
    </Flex>
  );
};

export default LoginForm;

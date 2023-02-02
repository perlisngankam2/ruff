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
import { useState } from "react";

const LoginForm = () => {
  const formik = useFormik({
    initialValues: {
      matricule: "",
      password: "",
      remember: false,
    },
    onSubmit: (values) => {
      console.log(values);
    },
  });
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
              <Box as="form" onSubmit={formik.handleSubmit} px="7">
                <FormControl mb={3}>
                  <FormLabel>Matricule</FormLabel>
                  <Input
                    id="matricule"
                    type="text"
                    value={formik.values.matricule}
                    onChange={formik.handleChange}
                  />
                </FormControl>
                <FormControl mb={4}>
                  <FormLabel>Mot de Passe</FormLabel>
                  <Input
                    id="password"
                    type="password"
                    value={formik.values.password}
                    onChange={formik.handleChange}
                    name="password"
                  />
                </FormControl>

                <HStack mb={5} spacing={{ base: "10px", lg: "60px" }}>
                  <Checkbox
                    id="remember"
                    colorScheme="green"
                    isChecked={formik.values.remember}
                    onChange={formik.handleChange}
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
      </Box>
    </Flex>
  );
};

export default LoginForm;

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
import { getStaticPropsTranslations } from '../types/staticProps';
import PersonnelAccountForm from './personnel/PersonnelAccountForm';


function comptePersonnel() {


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
      <PersonnelAccountForm/>
  );
}
export async function getStaticProps({ locale }) {
  return {
    props: {
      ...(await getStaticPropsTranslations(locale)),
      // Will be passed to the page component as props
    },
  };
}
export default comptePersonnel
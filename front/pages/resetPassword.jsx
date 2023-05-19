import React from 'react'
import { Box, Button, Center, Container, Flex, FormControl, FormLabel, Heading, Input, Stack, Text, VStack } from "@chakra-ui/react";
import Link from "next/link";
import { useRouter } from "next/router";
import DefaultLayout from "../components/layouts/DefaultLayout";
import { UPDATE_LOGIN} from "../graphql/Mutation";
import { useMutation, useQuery } from "@apollo/client";
import { useEffect, useState } from "react";
import Routes from "../modules/routes";
import { useAccount } from "../contexts/account/Account";
import { GET_PERSONNEL_BY_USERID, GET_USER_CONNECTED } from "../graphql/Queries";

function resetPassword() {

  const[email , setEmail] = useState("");
  const[password , setPassword] = useState("");
  const[confirmPassword , setConfirmPassword] = useState("");
  const [passwordsMatch, setPasswordsMatch] = useState(true);
  const [updateLogin] = useMutation(UPDATE_LOGIN);
  const router = useRouter();

    const {data:dataUser} = useQuery(GET_USER_CONNECTED,
    {
      variables:{id: router.query.id}
    });

    const { data: personnelData, called, loading } = useQuery(GET_PERSONNEL_BY_USERID,
     {
    variables:{ userid: router.query.id }
     })

console.log(dataUser?.user)

  const HandleClick = async (event) => {
  event.preventDefault();

//    if(router.query.id) {
//       if(dataUser){
//     //     setSalle({
//     //       name: dataSalleEdit.name,
//     //       montantPensionSalle: dataSalleEdit.montantPensionSalle,
//     //       // cycleId: dataSalleEdit.cycleid,
//     //       niveauEtudeId: dataSalleEdit.niveauid
//     //     })
//     //   }
//     }
// }


  const userData = await updateLogin({
        variables:{
        loginInput: { 
          email: dataUser?.user.email,
          oldpassword: password,
          newpassword: confirmPassword
        }
      }
    })

    setEmail("");
    setPassword("");
    setConfirmPassword("");
    router.push("/")
}

  return (
   <>
      <Box p="3" pt="70px"   background="blue.100" height="100vh">
 
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
                REINITIALISER VOTRE MOT DE PASSE
              </Heading>
             <Flex>Hello  {dataUser?.user.firstName === null?
                <Text ml='3'>{personnelData?.getpersonnelbyaccount.firstName} </Text>
                :
                <Text ml='3'>{dataUser?.user.firstName} </Text>
                }</Flex>
              <Stack
                gap={2}
                align="start"
                direction={["column", "column", "column"]}
                mt="25px"
              >
                  
                  <FormControl>
                    <FormLabel>
                   
                    </FormLabel>
                    <Input 
                      placeholder="Ancien Mot de Passe"
                      type="password"
                      // maxW="300px"
                      name="Password"
                      value={password}
                      onChange = {(event) => setPassword(event.target.value)}
                    />
                  </FormControl>
                     <FormControl>
                    <FormLabel>
                       
                    </FormLabel>
                    <Input 
                      placeholder="Nouveau Mot de Passe"
                      type="password"
                      // maxW="300px"
                      name="Password"
                      value={confirmPassword}
                      onChange = {(event) => setConfirmPassword(event.target.value)}
                      // onChange={handleConfirmPasswordChange}
                    />
                  </FormControl>
                  {/* <FormControl>
                    <FormLabel>
                  
                    </FormLabel>
                    <Input 
                      placeholder="Confirmez le Nouveau Mot de Passe" 
                      type="password"
                      // maxW="300px"
                    //   name="email"
                      value={email}
                      onChange = {(event) => setEmail(event.target.value)}
                    />
                  </FormControl> */}
                  
                    
                  <Flex gap={5} pt="30px">
                    <Button
                      colorScheme="green"
                      onClick={HandleClick}
                    >
                        Reinitialiser
                    </Button>
                  </Flex>
              </Stack>
            </Box>
          </VStack>
        </Center>
      </Box>
      
   </>
  )
}

export default resetPassword
import { Box, Button, Center, Divider, Flex, Heading, Input, Text } from '@chakra-ui/react';
import React,{useEffect ,useState} from "react";
import { useRouter } from "next/router";

import DefaultLayout from "../components/layouts/DefaultLayout";
import { CREATE_SALAIRE } from "../graphql/Mutation";
import { useAuth } from "../contexts/account/Auth/Auth";



function initialisationPaiement() {
  const router = useRouter();
  const { setAuthToken, authToken } = useAuth();

  useEffect(()=>{
    if(!authToken){
      router.back()
    }
    
  },[authToken])

  
  return (
    <DefaultLayout>
      <Box pt="70px" w="100%" bg={"#f6f7fb"}>

        <Heading p="1em" textAlign="center" bg='#eb808a' bgClip='text' fontSize={'30px'}>
            Formulaire de paie de salaire
          </Heading>
          
        <Flex bg='#5755c1' width='1000px' h='80px' margin="0 auto" pb='20px'> 
        <Flex p="1.5em" textAlign="center" ml='20px' gap={6} margin="0 auto" >
          <Flex>
            <Text color='#9490c9' fontWeight={'bold'}>Noms & prénoms de l'employé :</Text>
            <Text color='white'>xxxxxxxxxxxxxxxxxxxxxxxxxx</Text>
          
          </Flex>
          <Flex>
            <Text color='#9490c9' fontWeight={'bold'}>Fonction :</Text>
            <Text color='white'>xxxxxxxxxxxxxxxxxx</Text>
          </Flex>
          
        </Flex>

        </Flex>


{/* //in formaton salaire et mois */}
      <Center>
        <Flex 
          mt="20px"
          gap={7}
        > 
        <Box width={'340px'} gap={7} >
          <Text fontSize='sm'> Salaire Mois</Text>
              <Input
                    placeholder="nom prime"
                    bg='white'
                    type="month"
                    // id="dateOfPrime"
                    name="dateOfPrime"
                    rounded={2}
                    // placeholder="{formattedDate}"
                    // bg='white'
              
                    // borderColor="purple.100"
                    // onChange={(event) => setStartDate(event.target.value)}
                    // value={startDate}
                    // // ref={dateOfStartWorkRef}
                    
                  />
                      <Input
                    placeholder="nom prime"
                    bg='white'
                    type="date"
                    rounded={2}
                    // id="dateOfPrime"
                    name="dateOfPrime"
                    mt={'8px'}
                    // placeholder="{formattedDate}"
                    // bg='white'
              
                    // borderColor="purple.100"
                    // onChange={(event) => setStartDate(event.target.value)}
                    // value={startDate}
                    // // ref={dateOfStartWorkRef}
                    
                  /></Box>
                  <Box>
                    <Text fontWeight={'bold'} fontSize='sm' color='#eb808a'>Montant du salaire *</Text>

                           <Input
                    placeholder="nom prime"
                    bg='white'
                    type="text"
                    rounded={2}
                    // id="dateOfPrime"
                    name="dateOfPrime"
                    // placeholder="{formattedDate}"
                    // bg='white'
              
                    // borderColor="purple.100"
                    // onChange={(event) => setStartDate(event.target.value)}
                    // value={startDate}
                    // // ref={dateOfStartWorkRef}
                    
                  />
                  </Box>
                
        

        </Flex>
      </Center>

       <Box mx='100px' pb={'20px'} mt='20px'>
          <Divider />
        </Box>

             <Center>
          <Button type="submit" color='white' bg='#eb808a' variant='solid' mx='auto' my='auto'>
                Soumettre
           </Button>
        </Center>
      </Box>

    </DefaultLayout>
  )
}

export default initialisationPaiement
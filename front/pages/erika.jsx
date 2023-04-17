import React from "react";
import {
  Box,
 Center,
 Heading,
 Image,
 Text,
 Flex,
Table,
Thead,
Tbody,
Tfoot,
Tr,
Th,
Td,
TableCaption,
TableContainer
} from "@chakra-ui/react";
import { AddIcon } from "@chakra-ui/icons";
import { type } from "os";
import DefaultLayout from "../components/layouts/DefaultLayout";

const index = (props) => {
  return (
     <DefaultLayout>
            <Box p="3" pt="70px" w="100%" background="colors.tertiary">
        <Center >
          <Box borderWidth='1px' 
                    bg={'white'}
                    borderColor='black' 
                    w='1000px'
                    >
            <Box px='20px' > 
                  <Flex gap='350px'>
                    <Box><Image  src="logo.png" w='150px' /></Box>
                    <Box mt='30px'>
                      <Heading > BULLETIN DE PAIE</Heading>  
                      <Text mt='10px' textAlign={"center"} >Mois de paie: xxxxxxxxxxxxxxx</Text>
                      <Text textAlign={"center"} >Paiement, le xxxxxxxxxxxxxxxx</Text>
                    </Box>
                    


                  </Flex>
                  <Flex gap='280px'>

              <Box  >

                 <Flex mt='10px'>
                    <Text ml={['10px', '10px', '10px']}>Matricule:</Text>
                    <Text ml={['10px', '10px', '10px']} fontWeight='bold'> XXXXXXXXXXX</Text>
                </Flex>
                <Flex>
                    <Text ml={['10px', '10px', '10px']}>Categorie.:</Text>
                    <Text ml={['10px', '10px', '10px']} fontWeight='bold'> XXXXXXXXXXX</Text>
                </Flex>

                <Flex>
                    <Text ml={['10px', '10px', '10px']}>Fonction:</Text>
                    <Text ml={['10px', '10px', '10px']} fontWeight='bold'>XXXXXXXXXXXXXXXX </Text>
                </Flex>
                <Flex>
                    <Text ml={['10px', '10px', '10px']}>Status:</Text>
                    <Text ml={['10px', '10px', '10px']} fontWeight='bold'>XXXXXXXXXXXXXX </Text>
                </Flex>
                 <Flex>
                    <Text ml={['10px', '10px', '10px']}>Anciennete:</Text>
                    <Text ml={['10px', '10px', '10px']} fontWeight='bold'> XXXXXXXXXXXXXXXXXXX</Text>
                </Flex>
            </Box>

            <Box>
                <Text fontWeight='bold'>NOMS ET PRENOMSS </Text>
                <Text fontWeight='bold'>ADRESSE </Text>

            </Box>
            
            
            </Flex>
            <Center mb='10px'>
              <Box>
              <Box mt='20px' >
                <Flex w='900px'>
                    <Box w='300px' border={'1px'} borderRight={'0px'} py='6px' bg={'yellow.400'}><Heading color='white' fontSize={'md'} textAlign={"center"}>Libelle</Heading></Box>
                    <Box  w='180px' border={'1px'} borderRight={'0px'} py='6px' bg={'yellow.400'}><Heading color='white' fontSize={'md'} textAlign={"center"}>Base</Heading></Box>
                    <Box w='100px' border={'1px'} borderRight={'0px'} py='6px' bg={'yellow.400'}><Heading color='white' fontSize={'md'} textAlign={"center"}>Tx/Mnt</Heading></Box>
                    <Box w='160px' border={'1px'} borderRight={'0px'} py='6px' bg={'yellow.400'}><Heading color='white' fontSize={'md'} textAlign={"center"}>Gains</Heading></Box>
                    <Box  w='160px' border={'1px'} py='6px' bg={'yellow.400'}><Heading  color='white' fontSize={'md'}textAlign={"center"}>Retenues</Heading></Box>

                </Flex>
                <Flex w='900px'>
                    <Box w='300px' borderLeft={'1px'} py='6px' >
                      <Text >Salaire</Text>
                        <Box mt='20px'>
                          <Heading fontSize={'md'}>PRIMES SALARIALES</Heading>
                          <Text>XXXXXXXXXXXX</Text>
                        </Box>
                         <Box mt='20px'>
                          <Heading fontSize={'md'}>RETENUES SALARIALES</Heading>
                          <Text>XXXXXXXXXXXX</Text>
                        </Box>
                           <Box mt='20px'>
                          <Heading fontSize={'md'}>RETRAITE</Heading>
                          <Text>XXXXXXXXXXXX</Text>
                        </Box>
                          <Box mt='20px'>
                          <Heading fontSize={'md'}>TOTAL RETENUES</Heading>
                        </Box>
                          <Box mt='20px'>
                          <Heading fontSize={'md'}>TOTAL PRIMES</Heading>
                        </Box>
                    </Box>




                    <Box  w='180px'  borderLeft={'1px'} py='6px'>
                      <Text textAlign={"center"}></Text>
                     < Box mt='20px'>
                          <Heading fontSize={'md'}></Heading>
                          <Text>XXXXXXXXXXXX</Text>
                        </Box>
                        < Box mt='20px'>
                          <Heading fontSize={'md'}></Heading>
                          <Text>XXXXXXXXXXXX</Text>
                        </Box>
                        < Box mt='20px'>
                          <Heading fontSize={'md'}></Heading>
                          <Text>XXXXXXXXXXXX</Text>
                        </Box>
                      </Box>


                    <Box w='100px' borderLeft={'1px'} py='6px' >
                      <Text textAlign={"center"}></Text>
                        < Box mt='20px'>
                          <Heading fontSize={'md'}></Heading>
                          <Text>XXXXXXXXXXXX</Text>
                        </Box>
                         < Box mt='20px'>
                          <Heading fontSize={'md'}></Heading>
                          <Text>XXXXXXXXXXXX</Text>
                        </Box>
                         < Box mt='20px'>
                          <Heading fontSize={'md'}></Heading>
                          <Text>XXXXXXXXXXXX</Text>
                        </Box>
                      </Box>
                    <Box w='160px'  borderLeft={'1px'} py='6px' >
                      <Text textAlign={"center"}></Text>
                       < Box mt='20px'>
                          <Heading fontSize={'md'}></Heading>
                          <Text>XXXXXXXXXXXX</Text>
                        </Box>
                         < Box mt='20px'>
                          <Heading fontSize={'md'}></Heading>
                          <Text>XXXXXXXXXXXX</Text>
                        </Box>
                         < Box mt='20px'>
                          <Heading fontSize={'md'}></Heading>
                          <Text>XXXXXXXXXXXX</Text>
                        </Box>
                      </Box>
                    <Box  w='160px' borderLeft={'1px'}  borderRight={'1px'} py='6px' >
                      <Text textAlign={"center"}></Text>
                       < Box mt='20px'>
                          <Heading fontSize={'md'}></Heading>
                          <Text>XXXXXXXXXXXX</Text>
                        </Box>
                         < Box mt='20px'>
                          <Heading fontSize={'md'}></Heading>
                          <Text>XXXXXXXXXXXX</Text>
                        </Box>
                         < Box mt='20px'>
                          <Heading fontSize={'md'}></Heading>
                          <Text>XXXXXXXXXXXX</Text>
                        </Box>
                      </Box>

                </Flex>
                                      

              </Box>
              <Flex w='900px' border={'1px'} mt='20px'>
                <Box py='6px' w='450px' borderRight={'1px'} bg={'yellow.300'} color='white'><Text>NET A PAYER</Text></Box>
                <Box py='6px' w='450px' ><Text textAlign={'right'}>00000000000</Text></Box>
              </Flex>
              </Box>
              

            </Center>



            </Box>
          



          </Box>



           </Center>
         </Box>
        </DefaultLayout>
  );
};
export default index;

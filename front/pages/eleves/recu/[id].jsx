import {
    Box, Flex, Image, Center, Heading, Text, Divider, Stack, Table, TableContainer, Thead, Tbody, Tr,
    Th,
    Td, } from "@chakra-ui/react";
import DefaultLayout from "../../../components/layouts/DefaultLayout";
import { GiDivergence } from "react-icons/gi";

const receipt = () => {
    return ( 
        <DefaultLayout>
            <Center pt='70px' ml='60px' pb="10px">
          
        <Box borderWidth='1px' borderRadius='25px' borderColor='black'  w='1000px'  >
                    <Center borderBottomWidth='3px' h="120px" borderBottomColor='black' borderBottomStyle='solid'>
                <Flex >
                    <Box ml='30px'>
                        <Image src='/logo.png' w={['240px', '230px', '100px']}/>
               </Box>
               <Box p='2em'>
                    <Heading fontSize='2xl'>GROUPE SCOLAIRE BILINGUE AWONO BILOGUE</Heading>
                    <Flex gap="5" p='1em' mx='30px'>
                        <Text fontWeigth='bold'>BP: 122</Text>
                        <Text fontWeigth='bold'>Obala-Cameroun</Text>
                        <Text fontWeigth='bold'>TEL: 678732927/698258781</Text>
                    </Flex>
               </Box>
            </Flex> 
            </Center >
      
         
            
            <Flex  direction='column' >
                <Center>
                    <Box width='320px'h='60px' borderWidth='2px' borderColor='black' mt='3' textAlign='center'>
                        <Heading my='3' fontSize='3xl' fontWeight='bold'>RECU DE PAIEMENT</Heading>
                    </Box>
                </Center>

                <Flex>

                    <Box ml='3' m='3' borderWidth='1px' borderColor='black' bg='gray.50' gap='8' w='600px' mt='25px'>
                    <Box my='25px'>
                                    <Flex mt='3' ml='3' gap='1' mb='1'>
                                        <Text>Nom / Name:</Text>
                                        <Text></Text>
                                    </Flex>
                                    <Flex ml='3' gap='1' mb='1'>
                                        <Text>Section:</Text>
                                        <Text></Text>
                                    </Flex>
                                    <Flex ml='3' gap='1' mb='1'>
                                        <Text>Regime:</Text>
                                        <Text></Text>
                                    </Flex>
                                    <Flex ml='3' gap='1' mb='1'>
                                        <Text>Classe / Class:</Text>
                                        <Text></Text>
                                    </Flex>
                                    <Flex ml='3' gap='1' mb='1'>
                                        <Text>Matricule / Registration:</Text>
                                        <Text></Text>
                                    </Flex>
                                    <Flex mb='1' justify='space-between' >
                                        <Flex ml='3' gap='1' >
                                            <Text>Date de Naissance / Birthday:</Text>
                                            <Text></Text>
                                        </Flex>
                                        <Flex ml='3' gap='1' mr='140px'>
                                            <Text>à/at:</Text>
                                            <Text></Text>
                                        </Flex>

                                    </Flex>
                                    <Flex ml='3' gap='3' mb='1' justify='space-between'>
                                        <Flex gap='1'>
                                            <Text>Remettant / Renderer:</Text>
                                            <Text></Text>
                                        </Flex>
                                        <Flex gap='1' mr='130px'>
                                            <Text>Tel:</Text>
                                            <Text></Text>
                                        </Flex>

                                    </Flex>
                    </Box>
                      
                    </Box>

                    <Flex direction='column' gap={7} mx='4' mt='1'>
                        <Flex gap='1' mt='4' ml='60px'>
                            <Text fontWeight='bold'>No Recu</Text>
                            <Text>____________</Text>
                        </Flex>
                        <Flex direction='column' border='1px' w='360px'>
                                    <Box textAlign='center' >
                                        <Text fontWeight='bold'>Versement / Amount</Text>
                                    </Box>
                            <Divider />
                            <Box h='80px' bg='blue.50' textAlign='center'>
                            <Center>
                                <Flex p='1em' gap='3'>
                                    <Text align='center' fontSize='2xl' fontWeight='bold'>500 000</Text>
                                    <Text fontWeight='bold'>Fcfa</Text>
                                </Flex>
                            </Center>
                                <Text mt='-15px' fontSize="sm">(Cinq cent mille)</Text>
                            
                            </Box>
                        </Flex>

                        <Flex direction='column' w='360px'>
                            <Text fontSize='12px' fontWeight='bold' ml='10px'>SITUATION FINANCIERE / FINANCIAL SITUATION</Text>
                            <Box >
                            <TableContainer>
                                        <Table variant='simple' size='20px'borderCollapse='collapse'>
                                    <Thead>
                                        <Tr gap='1' bg="blackAlpha.300">
                                                    <Th border='1px'><Box fontSize='8px' textAlign='center'>
                                                        <Text>Net Attendu</Text>
                                                        <Text>Net Excepted</Text>
                                                        </Box>
                                                    </Th>
                                                        <Th border='1px'><Box fontSize='8px' textAlign='center'>
                                                        <Text>Net Versé</Text>
                                                        <Text>Net Paid</Text>
                                                    </Box>
                                                    </Th>
                                                        <Th border='1px'><Box fontSize='8px' textAlign='center'>
                                                        <Text>Net Reduit</Text>
                                                        <Text>Net Discount</Text>
                                                        </Box>
                                                    </Th>
                                                        <Th border='1px'><Box fontSize='8px' textAlign='center'>
                                                        <Text>Reste à Payer</Text>
                                                        <Text>Left to Paid</Text>
                                                    </Box>
                                                    </Th>
                                        </Tr>
                                    </Thead>
                                    <Tbody>
                                          <Tr gap='1'>
                                                        <Th border='1px'><Box h='13px' fontSize='8px'>
                                                        <Text></Text>
                                                       
                                                        </Box>
                                                    </Th>
                                                        <Th border='1px'><Box fontSize='8px'>
                                                        <Text></Text>
                                                    </Box>
                                                    </Th>
                                                        <Th border='1px'><Box fontSize='8px'>
                                                        <Text></Text>
                                                        </Box>
                                                    </Th>
                                                        <Th border='1px'><Box fontSize='8px'>
                                                        <Text></Text>
                                                    </Box>
                                                    </Th>
                                        </Tr>

                                    </Tbody>

                                </Table>
                                
                            </TableContainer>
                           </Box>
                        </Flex>
                        
                    </Flex>
                </Flex>

                        <Flex justify='space-between' ml='3' mb='2'>
                            <Flex direction='column' textAlign='center'>
                                <Text fontSize='17px' fontWeight='bold'>DETAILS / DETAILS</Text>
                                <Box w='500px' mb='2'>
                                <TableContainer>
                                    <Table variant='simple' size='40px' >
                                    <Thead>
                                                <Tr gap='1' bg="blackAlpha.300">
                                                
                                                <Th border='1px'><Box fontSize='8px' textAlign='center'>
                                                    <Text>Eléments</Text>
                                                    <Text>Elements</Text>
                                                </Box>
                                                </Th>
                                                    <Th border='1px'><Box fontSize='8px' textAlign='center'>
                                                    <Text>Attendu</Text>
                                                    <Text>Expected</Text>
                                                </Box>
                                                </Th>
                                                    <Th border='1px'><Box fontSize='8px' textAlign='center'>
                                                    <Text>Percu</Text>
                                                    <Text>Received</Text>
                                                </Box>
                                                </Th>
                                                    <Th border='1px' ><Box fontSize='8px' textAlign='center'>
                                                    <Text>Reste</Text>
                                                    <Text>Remainder</Text>
                                                </Box>
                                                </Th>
                                                    <Th border='1px'><Box fontSize='8px' textAlign='center'>
                                                    <Text>Délai</Text>
                                                    <Text>Deadline</Text>
                                                </Box>
                                                </Th>
                                            </Tr>
                                    </Thead>
                                        <Tbody>
                                           
                                            <Tr gap='1'>
                                                    <Th border='1px' bg='#rgba(0,0,0,0.36)'><Box fontSize='8px' fontWeight='bold' textAlign='center'>
                                                    <Text>I</Text>

                                                </Box>
                                                </Th>
                                                <Th border='1px'><Box fontSize='8px'>
                                                    <Text></Text>
                                                </Box>
                                                </Th>
                                                <Th border='1px'><Box fontSize='8px'>
                                                    <Text></Text>
                                                </Box>
                                                </Th>
                                                <Th border='1px'><Box fontSize='8px'>
                                                    <Text></Text>
                                                </Box>
                                                </Th>
                                                <Th border='1px'><Box fontSize='8px'>
                                                    <Text></Text>
                                                </Box>
                                                </Th>
                                            </Tr>
                                            <Tr gap='1' >
                                                    <Th border='1px'><Box textAlign='center' fontWeight='bold' fontSize='8px'>
                                                    <Text>T1</Text>

                                                </Box>
                                                </Th>
                                                <Th border='1px'><Box fontSize='8px'>
                                                    <Text></Text>
                                                </Box>
                                                </Th>
                                                <Th border='1px'><Box fontSize='8px'>
                                                    <Text></Text>
                                                </Box>
                                                </Th>
                                                <Th border='1px'><Box fontSize='8px'>
                                                    <Text></Text>
                                                </Box>
                                                </Th>
                                                <Th border='1px'><Box fontSize='8px'>
                                                    <Text></Text>
                                                </Box>
                                                </Th>
                                            </Tr>
                                            <Tr gap='1'>
                                                    <Th border='1px'><Box textAlign='center' fontSize='8px' fontWeight='bold'>
                                                    <Text>T2</Text>

                                                </Box>
                                                </Th>
                                                <Th border='1px'><Box fontSize='8px'>
                                                    <Text></Text>
                                                </Box>
                                                </Th>
                                                <Th border='1px'><Box fontSize='8px'>
                                                    <Text></Text>
                                                </Box>
                                                </Th>
                                                <Th border='1px'><Box fontSize='8px'>
                                                    <Text></Text>
                                                </Box>
                                                </Th>
                                                <Th border='1px'><Box fontSize='8px'>
                                                    <Text></Text>
                                                </Box>
                                                </Th>
                                            </Tr>
                                            <Tr gap='1'>
                                                    <Th border='1px'><Box textAlign='center' fontSize='8px' fontWeight='bold'>
                                                    <Text>T3</Text>

                                                </Box>
                                                </Th>
                                                <Th border='1px'><Box fontSize='8px'>
                                                    <Text></Text>
                                                </Box>
                                                </Th>
                                                <Th border='1px'><Box fontSize='8px'>
                                                    <Text></Text>
                                                </Box>
                                                </Th>
                                                <Th border='1px'><Box fontSize='8px'>
                                                    <Text></Text>
                                                </Box>
                                                </Th>
                                                <Th border='1px'><Box fontSize='8px'>
                                                    <Text></Text>
                                                </Box>
                                                </Th>
                                            </Tr>

                                        </Tbody>

                                    </Table>

                                </TableContainer>
</Box>

                                <Box fontSize='11px'>
                                    <Text>Les frais de scolarite ne sont ni remboursables, ni cessibles, ni transferables</Text>
                                    <Text>Tuition fees are neither refundable no transferable</Text>
                                </Box>
                            </Flex>
                     <Box fontWeight='bold' mt='50px' mr='35px'>
                        <Text as='u'>
                             SIGNATURE ET CACHET / VISA AND STAMP
                         </Text>
                     </Box>
                </Flex>
            </Flex>
        </Box>
   
            </Center>
        </DefaultLayout>
     );
}
 
export default receipt;
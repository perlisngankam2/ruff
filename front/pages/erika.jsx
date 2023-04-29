
import {
  Table,
  Thead,
  Tbody,
  Tfoot,
  Tr,
  Th,
  Td,
  TableCaption,
  TableContainer,
  Text,
  Divider,
  Button,
  FormControl,
  FormLabel,
  Input,
  Select,
  Checkbox,
  Box,
  Flex,
  HStack,
  Heading,
  useColorModeValue,
  Hide,
  Image,
  Stack,
  Center,
  Icon,
  ButtonGroup

} from "@chakra-ui/react";
import ReactToPrint from 'react-to-print';
import { TfiPrinter } from "react-icons/tfi";
import ReactToPdf from "react-to-pdf";
import React, { useRef, useEffect }  from "react";
import { Card, CardHeader, CardBody, CardFooter } from '@chakra-ui/react'
import { AddIcon } from "@chakra-ui/icons";
import { type } from "os";
import DefaultLayout from "../components/layouts/DefaultLayout";

const index = () => {
  const componentRef = useRef();
const ref = React.createRef();
const options = {
      orientation: 'landscape',
      unit: 'mm',
      format: 'a4',
};
  return (
    <DefaultLayout>
    <Box 
        p="3" 
        pt="70px" 
        background="colors.tertiary" 
        w="full" 
        minH="100vh"
      >
        <Card maxW='sm'>
  <CardBody>
    <Image
      src='https://img.freepik.com/free-icon/document_318-784211.jpg?size=626&ext=jpg&ga=GA1.1.1776397049.1681920456&semt=robertav1_2_sidr'
      alt='Green double couch with wooden legs'
      size='md'
    />
    <Stack mt='6' spacing='3'>
      <Heading size='md'>Living room Sofa</Heading>
      <Text>
        This sofa is perfect for modern tropical spaces, baroque inspired
        spaces, earthy toned spaces and for people who love a chic design with a
        sprinkle of vintage design.
      </Text>
      <Text color='blue.600' fontSize='2xl'>
        $450
      </Text>
    </Stack>
  </CardBody>
  <Divider />
  <CardFooter>
    <ButtonGroup spacing='2'>
      <Button variant='solid' colorScheme='blue'>
        Buy now
      </Button>
      <Button variant='ghost' colorScheme='blue'>
        Add to cart
      </Button>
    </ButtonGroup>
  </CardFooter>
</Card>
      </Box>
    </DefaultLayout>
//  <DefaultLayout>
//             <Box p="3" pt="70px" w="100%" background="colors.tertiary">
//               <Flex gap={4}>
//               <ReactToPrint
//                trigger={() => <Button rightIcon={<Icon as={TfiPrinter} boxSize="20px" />}>Imprimer</Button>}
//                content={() => componentRef.current}
//                 documentTitle= "Bulletin de paie"
//                 pageStyle="print"
//               />
//               <ReactToPdf targetRef={componentRef} filename="Bulletin de paie" options={options} x={17} y={10} >
//               {({toPdf}) => ( <Button onClick={toPdf}>Generate pdf</Button>)}
//               </ReactToPdf>
              
//               </Flex>
//               <Box mt='15px'>
//         <Center >

//           <Box borderWidth='1px' 
//                     bg={'white'}
//                     borderColor='black' 
//                     w='1000px'
//                    ref={componentRef}
//                     >
//             <Box  w='1000px' > 
//                   <Flex gap='350px' borderBottom={'1px'} w='full'>
//                     <Box ml='20px' mb='5px'><Image  src="../../logo.png" w='150px' /></Box>
//                     <Box mt='30px' mr='20px' >
//                       <Heading > BULLETIN DE PAIE</Heading>  
//                       <Text mt='10px' textAlign={"center"} >Mois de paie: </Text>
//                       <Text textAlign={"center"} >Paiement, le </Text>
//                     </Box>
                    


//                   </Flex>
//                   <Flex gap='280px' mt='20px'>

//               <Box ml='17px' >

//                  <Flex mt='10px'>
//                     <Text ml={['10px', '10px', '10px']} fontWeight='bold'>Matricule:</Text>
//                     <Text ml={['10px', '10px', '10px']} > XXXXXXXXXXX</Text>
//                 </Flex>
//                 <Flex>
//                     <Text ml={['10px', '10px', '10px']}  fontWeight='bold'>Categorie:</Text>
//                     <Text ml={['10px', '10px', '10px']}> </Text>
//                 </Flex>

//                 <Flex>
//                     <Text ml={['10px', '10px', '10px']} fontWeight='bold'>Fonction:</Text>
//                     <Text ml={['10px', '10px', '10px']} > </Text>
//                 </Flex>
//                 <Flex>
//                     <Text ml={['10px', '10px', '10px']} fontWeight='bold'>Status:</Text>
//                     <Text ml={['10px', '10px', '10px']} ></Text>
//                 </Flex>
//                  <Flex>
//                     <Text ml={['10px', '10px', '10px']} fontWeight='bold'>Anciennete:</Text>
//                     <Text ml={['10px', '10px', '10px']} > </Text>
//                 </Flex>
//             </Box>

//             <Box  w='300px' >
//                 <Text mt='30px' textAlign={'center'} fontWeight='bold'> </Text>
//                 <Text textAlign={'center'}  fontWeight='bold'> </Text>

//             </Box>
            
            
//             </Flex>
//             <Center mb='10px'>
//               <Box 
//               // as={'table'} 
//               // id="my-table"
//               >
//               <Box mt='20px' w='900px'>
//                 <Flex w='full'>
//                     <Box w='300px' borderLeft={'1px'}   py='6px' background="colors.primary"><Heading color='white' fontSize={'md'} textAlign={"center"}>Libelle</Heading></Box>
//                     <Box  w='180px'  borderLeft={'1px'} py='6px' borderLeftColor={'white'} background="colors.primary"><Heading color='white' fontSize={'md'} textAlign={"center"}>Base</Heading></Box>
//                     <Box w='100px'  borderLeft={'1px'} py='6px' borderLeftColor={'white'} background="colors.primary"><Heading color='white' fontSize={'md'} textAlign={"center"}>Tx/Mnt</Heading></Box>
//                     <Box w='160px'  borderLeft={'1px'} py='6px' borderLeftColor={'white'} background="colors.primary"><Heading color='white' fontSize={'md'} textAlign={"center"}>Gains</Heading></Box>
//                     <Box  w='160px' borderLeft={'1px'} borderRight={'1px'} py='6px' borderLeftColor={'white'} background="colors.primary"><Heading  color='white' fontSize={'md'}textAlign={"center"}>Retenues</Heading></Box>

//                 </Flex>
//                 <Flex w='full'>
//                   <Box w='300px' borderLeft={'1px'}   py='6px' ><Text ml='6px' >Salaire</Text></Box>
//                     <Box  w='180px'  borderLeft={'1px'} py='6px' ><Text textAlign={"right"} mr='6px'></Text></Box>
//                     <Box w='100px'  borderLeft={'1px'} py='6px'  ></Box>
//                     <Box w='160px'  borderLeft={'1px'} py='6px' ><Text textAlign={"right"} mr='6px'></Text></Box>
//                     <Box  w='160px' borderLeft={'1px'} borderRight={'1px'} py='6px'  ></Box>

//                   </Flex>
//                <Flex w='full'>
//                   <Box w='300px' borderLeft={'1px'}   py='6px' >

//                        <Heading fontSize={'md'} fontWeight={'bold'} color='black'ml='6px'>PRIMES SALARIALES</Heading>
//                           {/* { 
//                       dataPrimeNoms && (
//                         dataPrimeNoms?.findnamesprimebypersonnel.map((prime) => (
//                             <Text ml='20px'>
//                               {prime}
//                             </Text>
//                         )))} */}
//                   </Box>
//                     <Box  w='180px'  borderLeft={'1px'} py='6px' >

            
//                                {/* { 
//                       dataPrimeMontant && <Box mt='20px'>
//                        { dataPrimeMontant?.findmontantprimebypersonnel.map((prime) => (
//                             <Text textAlign={"right"} mr='6px'>
//                               {prime}
//                             </Text>
//                             ))}</Box>} */}
//                     </Box>
//                     <Box w='100px'  borderLeft={'1px'} py='6px'  ></Box>
//                     <Box w='160px'  borderLeft={'1px'} py='6px' >

//                                {/* { 
//                        dataPrimeMontant && <Box mt='20px'>
//                        { dataPrimeMontant?.findmontantprimebypersonnel.map((prime) => (
//                             <Text textAlign={"right"} mr='6px'>
//                               {prime}
//                             </Text>
//                             ))}</Box>} */}
//                     </Box>
//                     <Box  w='160px' borderLeft={'1px'} borderRight={'1px'} py='6px'  ></Box>

//                   </Flex>

//                    <Flex w='full'>
//                   <Box w='300px' borderLeft={'1px'}   py='6px' >

//                        <Heading fontSize={'md'} fontWeight={'bold'} color='black' ml='6px'>RETENUES SALARIALES</Heading>
//                           {/* { 
//                       dataRetenueNoms && (
//                         dataRetenueNoms?.findnamesretenubypersonnel.map((retenue) => (
//                             <Text ml='20px' >
//                               {retenue}
//                             </Text>
//                         )))} */}
//                   </Box>
//                     <Box  w='180px'  borderLeft={'1px'} py='6px' >

//                                {/* { 
//                      dataRetenueMontant && <Box mt='20px'>
//                         {dataRetenueMontant?.findmontantretenubypersonnel.map((retenue) => (
//                             <Text textAlign={"right"} mr='6px'>
//                               {retenue}
//                             </Text>
//                             ))}</Box>} */}
//                     </Box>
//                     <Box w='100px'  borderLeft={'1px'} py='6px'  ></Box>
//                     <Box w='160px'  borderLeft={'1px'} py='6px' ></Box>
//                     <Box  w='160px' borderLeft={'1px'} borderRight={'1px'} py='6px'  >
//                             {/* { 
//                      dataRetenueMontant && <Box mt='20px'>
//                         {dataRetenueMontant?.findmontantretenubypersonnel.map((retenue) => (
//                             <Text textAlign={"right"} mr='6px' >
//                               {retenue}
//                             </Text>
//                             ))}</Box>} */}
//                     </Box>

//                   </Flex>

              

//                   <Flex w='full'>
//                     <Box w='300px' borderLeft={'1px'}   py='6px' ><Heading fontSize={'md'} fontWeight={'bold'} color='black' ml='6px'>TOTAL PRIMES</Heading></Box>
//                     <Box  w='180px'  borderLeft={'1px'} py='6px' ></Box>
//                     <Box w='100px'  borderLeft={'1px'} py='6px'  ></Box>
//                     <Box w='160px'  borderLeft={'1px'} py='6px' ><Text textAlign={"right"} mr='6px' fontWeight={'bold'}></Text></Box>
//                     <Box  w='160px' borderLeft={'1px'} borderRight={'1px'} py='6px'  ></Box>

//                   </Flex>

//                   <Flex w='full' mb='8px'>
//                     <Box w='300px' borderLeft={'1px'} borderBottom={'1px'}  py='6px' ><Heading fontSize={'md'} fontWeight={'bold'} color='black' ml='6px'>TOTAL RETENUES</Heading></Box>
//                     <Box  w='180px'  borderLeft={'1px'} borderBottom={'1px'} py='6px' ></Box>
//                     <Box w='100px'  borderLeft={'1px'} borderBottom={'1px'} py='6px'  ></Box>
//                     <Box w='160px'  borderLeft={'1px'} borderBottom={'1px'} py='6px' ></Box>
//                     <Box  w='160px' borderLeft={'1px'}borderBottom={'1px'} borderRight={'1px'} py='6px'  ><Text textAlign={"right"} mr='6px' fontWeight={'bold'}>
                  
//                       </Text></Box>

//                   </Flex>


//               </Box>
//               <Flex w='900px' border={'1px'} mt='20px'>
//                 <Box py='6px' w='450px' borderRight={'1px'} background="colors.primary"color='white'><Text>NET A PAYER</Text></Box>
//                 <Box py='6px' w='450px' ><Text textAlign={'right'} mr='20px' fontSize={'18px'} fontWeight={'bold'}></Text></Box>
//               </Flex>
//                 <Box 
//                         p={'10px'}>
//                         <Text textAlign={'center'}>
//                             {/* Montant en lettre du salaire net :<Text fontWeight={'bold'}>{lettre.toUpperCase()} FRANC CFA</Text> */}
//                         </Text>
//                     </Box>
              
//               </Box>
              

//             </Center>



//             </Box>
          



//           </Box>
    


//            </Center>

//        </Box>
//         </Box>

         
//         </DefaultLayout>
  );
};
export default index;

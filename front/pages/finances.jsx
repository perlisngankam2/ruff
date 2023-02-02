import { Box, Heading } from "@chakra-ui/react";
import SearchBar from "../components/atoms/searchbar";
import DefaultLayout from "../components/layouts/DefaultLayout";
import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogContent,
  AlertDialogOverlay,
  useDisclosure,
  Button,
 
  Flex,
  Input,
  Select,
  Spacing,
  Text,
  FormControl,
  FormLabel,
  extendTheme 
} from '@chakra-ui/react';
import React from "react";


import Link from "next/link";

import MyApp from "./_app";

function Finances  () {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const cancelRef = React.useRef()
  return (
    <DefaultLayout>
      <Box p="3" pt="70px">
        <Heading>Finances</Heading>
        <SearchBar/>
        

        <>
      <Button colorScheme='red' onClick={onOpen} >
        valider
      </Button>

      <AlertDialog
        isOpen={isOpen}
        leastDestructiveRef={cancelRef}
        onClose={onClose}
        size='xl'
      >
        <AlertDialogOverlay >
          <AlertDialogContent  >
            <AlertDialogHeader fontSize='sm' fontWeight='base' mt='0'>
            <Box  bg={"colors.secondary"} borderBottomRightRadius={10} borderBottomLeftRadius={10}>
                <Heading as='H4' textAlign={'center'} fontSize={['15px','20px','26px']} p='2' >
                     
                        Groupe Scolaire Bilingue Awono Bilongue
                     
                </Heading>

                
            </Box>
            </AlertDialogHeader>

            <AlertDialogBody>
            <Box >
                <Flex gap={5} flexWrap={['wrap','wrap','nowrap']} align='end' >
                    <FormControl>
                        <FormLabel>Matricule</FormLabel>
                    <Input type={'text'} ></Input>
                    </FormControl>

                    <FormControl>
                        <FormLabel>Classe</FormLabel>
                    <Select>
                        <option>cm2</option>
                        <option>cm1</option>
                        <option>ce2</option>
                    </Select>
                    </FormControl>


                </Flex>
            </Box>

            <Box mt='4'>
                    <Flex align='end'>
                        <FormControl>
                            <FormLabel>Nom et prenom</FormLabel>
                            <Input type={'text'} ></Input>
                        </FormControl>
                    </Flex>
                   
            </Box>

            
            <Box mt='4'>
                <Flex gap={5} flexWrap={['wrap','wrap','nowrap']} align='end'>
                    <FormControl>
                            <FormLabel>Nom du Remettant</FormLabel>
                        <Select>
                            <option>Tranche 1</option>
                            <option>Tranche 2</option>
                            <option>Tranche 3</option>
                        </Select>
                    </FormControl>

                    <FormControl>
                            <FormLabel>tel du Remettant</FormLabel>
                        <Input type={'tel'} ></Input>
                    </FormControl>
                </Flex>
            </Box>
            <Box mt='4'>
                <Flex gap={5} flexWrap={['wrap','wrap','nowrap']} align='end'>
                    <FormControl>
                            <FormLabel>versement</FormLabel>
                            <Input type={'number'} ></Input>
                        
                    </FormControl>

                    <FormControl>
                            <FormLabel>Delai</FormLabel>
                            <Input type={'date'} ></Input>
                        
                    </FormControl>

                    <FormControl>
                            <FormLabel>reste</FormLabel>
                        <Input type={'number'}  textColor={'red.300'}></Input>
                    </FormControl>
                </Flex>
            </Box>
            </AlertDialogBody>

            <AlertDialogFooter>
              <Button ref={cancelRef} onClick={onClose} colorScheme='red' >
                annuler
              </Button>
             <Link href={'#'}>
                <Button colorScheme='green'  ml={3}>
                  payer
                </Button>
              </Link> 
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>
    </>


      </Box>
    </DefaultLayout>
  );
};

export default Finances;

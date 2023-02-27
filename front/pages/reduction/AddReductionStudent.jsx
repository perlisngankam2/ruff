import { Box, Heading } from "@chakra-ui/react";
import SearchBar from "../../components/atoms/searchbar";
import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogContent,
  AlertDialogOverlay,
  useDisclosure,
  Button,
    Center,
  Flex,
  Input,
  Select,
  Spacing,
  Text,
  FormControl,
  FormLabel,
  extendTheme,
  Icon,
  useToast
} from '@chakra-ui/react';

import React from "react";
import { IoIosAdd } from "react-icons/io";
import Link from "next/link";
import {useMutation } from '@apollo/client';
import { CREATE_REDUCTION_SCOLARITE } from "../../graphql/Mutation";
import { useState } from "react";
import { useRouter } from "next/router";

function addReductionStudent  () {

    const [name, setName] = useState("");
    const[montant, setMontant] = useState();
    const { isOpen, onOpen, onClose } = useDisclosure();
    const cancelRef = React.useRef();
    
    const toast = useToast();
    const router = useRouter()
    const [createReductionScolarite, {loading, error}] = useMutation(CREATE_REDUCTION_SCOLARITE);
    
    const addReductionScolarite = async (event) => {
        event.preventDefault();
       
        console.log(name);
        console.log(montant);

        await createReductionScolarite({
                 variables: {
                    reductionscolarite: { 
                     name : name,
                     montant: parseInt(montant)
                 }
               }
        })
    }

    let input
   

    // const pearl = () => {
    //     console.log("pepijjhnb  arl")
    // }

  return (
    <Center>
        <Box> 
            <Box> 
                <Button
                    rightIcon={<Icon as={IoIosAdd} boxSize="20px" />}
                    // borderRadius={'md'} 
                    onClick={onOpen}
                    // onClick = {() => router.push(personnel/AjouterCategoryPersonnel)} 
                >
                    {/* <Link href={'/personnel/ajoutercategorypersonnel'}>                                 */}
                        Ajouter une reduction                                 
                    {/* </Link>               */}
                </Button>
          </Box>
            <Box 
                as={"form"} 
                
                     > 
                <AlertDialog
                    isOpen={isOpen}
                    leastDestructiveRef={cancelRef}
                    size='xl'
                    onClose={onClose}
                >
                    <AlertDialogOverlay
                     
                    >
                        <AlertDialogContent 
                        >
                            <AlertDialogHeader 
                                fontSize='sm' 
                                fontWeight='base' 
                                mt='0'
                            >
                                <Box>
                                    <Heading 
                                        // as='H4' 
                                        textAlign={'center'} 
                                        fontSize={['15px','20px','26px']} 
                                        p='2' 
                                    >
                                        Ajouter une reduction de scolarite
                                    </Heading>
                                </Box>
                            </AlertDialogHeader>
                            <AlertDialogBody>
                            <Box>
                                <FormControl>
                                    <FormLabel>Nom</FormLabel>
                                    <Input 
                                        type={'text'} 
                                        name="name"
                                        placeholder="nom"
                                        onChange = {(event) => setName(event.target.value)}
                                        ref={node => {input = node;}}
                                        value={name}
                                     />
                                </FormControl>
                                <FormControl mt="15px">
                                    <FormLabel>Monntant</FormLabel>
                                    <Input 
                                        type={"number"} 
                                        name="montant"
                                        placeholder="Valeur du montant"
                                        onChange = {(event) => setMontant(event.target.value)}
                                        ref={node => {input = node;}}
                                        value={montant}
                                    />
                                </FormControl>
                            </Box>
                            </AlertDialogBody>
                            <AlertDialogFooter>
                                <Button 
                                    ref={cancelRef} 
                                    onClick={onClose}   
                                    colorScheme='red' 
                                >
                                    annuler 
                                </Button>
                                {/* <Link href={'/personnel/ajoutercategorypersonnel'}> */}
                                    <Button 
                                    colorScheme='green'  
                                    ml={3}
                                    // onClick={onClose}
                                    onClick={ addReductionScolarite}
                                    >
                                    Creer
                                    </Button>
                                {/* </Link>  */}
                            </AlertDialogFooter>
                        </AlertDialogContent>
                    </AlertDialogOverlay>
                </AlertDialog>
            </Box>
        </Box>
    </Center>
    
    );
  }
export default addReductionStudent;

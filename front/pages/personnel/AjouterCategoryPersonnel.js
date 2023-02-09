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
import { CREATE_CATEGORY_PERSONNEL } from "../../graphql/Mutation";
import { GET_ALL_Category_Personnel } from "../../graphql/Queries";
import { useState } from "react";
import { useRouter } from "next/router";

function ajoutercategorypersonnel  () {

    const [nom, setNom] = useState("");
    const[description, setDescription] = useState("");
    const { isOpen, onOpen, onClose } = useDisclosure();
    const cancelRef = React.useRef();
    const [createCategoryPersonnel, {error}] = useMutation(CREATE_CATEGORY_PERSONNEL);
    
    const toast = useToast();
    const router = useRouter()

    // const addCategoryPersonnel = async (event, value) => {
    //     console.log("value")
    //     event.preventDefault();
       
    //     console.log(event.target.name.value);
    //     console.log(event.target.description.value);

    //     // const categoryData = await createCategoryPersonnel({
    //             // variables: {
    //         //     createcategoriepersonnnel: { 
    //         //         
    //         //             nom : event.target.value,
    //         //             description: event.target.value
    //         //     }
    //         //   }
    //     // })
    //     // console.log(categoryData)
    // }

    let input
    const  addCategoryPersonnel = async (event, value) => {
        event.preventDefault();
        console.log('cccc');
   
        console.log(nom);
        console.log(description);
   
        const catPerData = await createCategoryPersonnel({
            variables: {
                createCategoriePersonnel: {
                    nom: nom,
                    description: description
                }
            },
            refetchQueries:[{
                query: GET_ALL_Category_Personnel
            }]
        })
        console.log(catPerData)
        // input.value = '';
        toast({
          title: "Creation d'une categorie de personnel.",
          description: "Creation de la categorie réussit.",
          status: "success",
          duration: 3000,
          isClosable: true,
        });
    }

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
                        Ajouter une categorie                                 
                    {/* </Link>               */}
                </Button>
          </Box>
            <Box 
                as={"form"} 
                onClick={addCategoryPersonnel}
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
                                    Ajouter une categorie de personnel
                                    </Heading>
                                </Box>
                            </AlertDialogHeader>
                            <AlertDialogBody>
                            <Box>
                                <FormControl>
                                    <FormLabel>Nom</FormLabel>
                                    <Input 
                                        id="nom"
                                        type={'text'} 
                                        name="nom"
                                        placeholder="nom"
                                        onChange = {(event) => setNom(event.target.value)}
                                        ref={node => {input = node;}}
                                        value={nom}
                                     />
                                </FormControl>
                                <FormControl mt="15px">
                                    <FormLabel>Description</FormLabel>
                                    <Input 
                                        id="description"
                                        type={'text'} 
                                        name="description"
                                        placeholder="Description"
                                        onChange = {(event) => setDescription(event.target.value)}
                                        ref={node => {input = node;}}
                                        value={description}
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
                                    onClick={onClose}
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
export default ajoutercategorypersonnel;

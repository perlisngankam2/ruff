
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
  FormControl,
  FormLabel,
  extendTheme,
  Icon
} from '@chakra-ui/react';

import React, {useEffect, useState} from "react";
import { IoIosAdd } from "react-icons/io";
import {useMutation, useQuery } from '@apollo/client';
import { CREATE_CYCLE, UPDATE_CYCLE } from "../../graphql/Mutation";
import { GET_ALL_SECTION } from "../../graphql/Queries";
import { useRouter } from "next/router";


const  UpdateCycle =  () => {
    const [name, setName] = useState("");
    const[section, setSection] = useState("");
    const { isOpen:isOpens, onOpen:onOpenns, onClose } = useDisclosure();
    const cancelRef = React.useRef();
    const [updateCycle, {error}] = useMutation(UPDATE_CYCLE);
    const {data} = useQuery(GET_ALL_SECTION);
    const router = useRouter();

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
    // const  addCycle = async (event, value) => {
    //     event.preventDefault();
    //     console.log('cccc');
   
    //     console.log(name);
    //     console.log(section);
   
    //     const cycleData = await createCycle({
    //         variables: {
    //             cycle: {
    //                 name: name,
    //                 section: section
    //             }
    //         }
    //     })
    //     console.log(cycleData)
    //     // toast({
    //     //     title: "Creation d'un cycle.",
    //     //     description: "Votre cycle a ete cree avec succes.",
    //     //     status: "success",
    //     //     duration: 3000,
    //     //     isClosable: true,
    //     //   });
    // }

    useEffect(() => {
        console.log(data?.findAllsection)
        console.log("j")
    }, [data])
   
  return (
    <Center>
        <Box> 
            {/* <Box> 
                <Button
                    rightIcon={<Icon as={IoIosAdd} boxSize="20px" />}
                    onClick={onOpenns}
                    ml={["250px", "530px","1060px"]}
                    // onClick = {() => router.push(personnel/AjouterCategoryPersonnel)} 
                >
                        Ajouter un Cycle                               
                </Button>
          </Box> */}
            <Box as={"form"}> 
                <AlertDialog
                    isOpen={isOpens}
                    leastDestructiveRef={cancelRef}
                    onClose={onClose}
                    size='xl'
                >
                    <AlertDialogOverlay>
                        <AlertDialogContent>
                            <AlertDialogHeader 
                                fontSize='sm' 
                                fontWeight='base' 
                                mt='0'
                            >
                                <Box>
                                    <Heading 
                                        textAlign={'center'} 
                                        fontSize={['15px','20px','26px']} 
                                        p='2' 
                                    >
                                         Ajouter un cycle
                                    </Heading>
                                </Box>
                            </AlertDialogHeader>
                            <AlertDialogBody>
                            <Box>
                                <FormControl>
                                    <FormLabel>Nom</FormLabel>
                                    <Input 
                                        id="name"
                                        type={'text'} 
                                        name="name"
                                        placeholder="nom"
                                        onChange = {(event) => setName(event.target.value)}
                                        value={name}
                                     />
                                </FormControl>
                                <FormControl mt="15px">
                                    <FormLabel>Section</FormLabel>
                                    <Select 
                                        id="section"
                                        name="section"
                                        placeholder="Section"
                                        onChange = {(event) => setSection(event.target.value)}
                                        value={section}
                                    >
                                        {data &&(
                                            data.findAllsection.map((section, index) => ( 
                                                <option key={index}>
                                                    <option>{section.name}</option>
                                                </option>
                                            ))
                                        )}
                                    </Select>
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
                                        // onClick={addCycle}
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


export default UpdateCycle;

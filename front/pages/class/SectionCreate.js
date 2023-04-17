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
  FormControl,
  FormLabel,
  extendTheme,
  Icon,
  useToast
} from '@chakra-ui/react';
import React from "react";
import { IoIosAdd } from "react-icons/io";
import {useMutation } from '@apollo/client';
import { CREATE_SECTION, UPDATA_SECTION} from "../../graphql/Mutation";
import { GET_ALL_SECTION } from "../../graphql/Queries";
import { useState } from "react";
import { useRouter } from "next/router";


const  SectionCreate =  () => {

    const [name, setName] = useState("");
    const[description, setDescription] = useState("");
    const { isOpen, onOpen, onClose } = useDisclosure();
    const cancelRef = React.useRef();
    const [createSection, {error}] = useMutation(CREATE_SECTION);
    const [updateSection] = useMutation(UPDATA_SECTION);
    const router = useRouter()
    const toast = useToast();
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
    const  addSection = async (event, value) => {
        event.preventDefault();
        console.log('cccc');
   
        console.log(name);
        console.log(description);
        // if(id){
        //     updateSection({
        //         variables:{
        //             section:{
        //                 name: name,
        //                 section: description
        //             }
        //         }
        //     })
        // }else{
         await createSection({
            variables: {
                section: {
                    name: name,
                    description: description
                }
            },
            refetchQueries:[{
                query: GET_ALL_SECTION
            }]
        })
    // }
        onClose();
        // console.log(sectionData)
        toast({
            title: "Creation d'une section.",
            description: "La classe a été créée avec succes.",
            status: "success",
            duration: 3000,
            isClosable: true,
          });
          setName("");
          setDescription("")
    }

   
  return (
    <Center>
        <Box> 
            <Box> 
                <Button
                    ml={["20px","50px","100px","600px"]}
                    rightIcon={<Icon as={IoIosAdd} boxSize="20px" />}
                    onClick={onOpen}
                >
                        Ajouter une Section                                
                </Button> 
          </Box>
            <Box as={"form"}  onSubmit={() => router.push("/class/cyclesection")}> 
                <AlertDialog
                    isOpen={isOpen}
                    leastDestructiveRef={cancelRef}
                    onClose={onClose}
                    size='xl'
                >
                    <AlertDialogOverlay>
                        <AlertDialogContent  >
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
                                    Ajouter une section
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
                                        ref={node => {input = node;}}
                                        value={name}
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
                                    onClick={addSection}
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
export default SectionCreate;

import { AlertDialogCloseButton, Box, Heading } from "@chakra-ui/react";
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
// import {getSt}
import { useTranslation } from "next-i18next";


function ajoutercategorypersonnel  () {

    const [nom, setNom] = useState("");
    const[description, setDescription] = useState("");
    const [montant, setMontant] = useState("");
    const { isOpen, onOpen, onClose } = useDisclosure();
    const cancelRef = React.useRef();
    const [createCategoryPersonnel, {error}, refetch] = useMutation(CREATE_CATEGORY_PERSONNEL);
    
    const toast = useToast();
    const router = useRouter()
    const {t} = useTranslation();
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
                    description: description,
                    montant: parseInt(montant)
                }
            },
            refetchQueries:[{
                query: GET_ALL_Category_Personnel
            }]
        })
        refetch()
        onClose();
        console.log(catPerData)
        // input.value = '';
        toast({
          title: "Creation d'une categorie de personnel.",
          description: "Creation de la categorie réussit.",
          status: "success",
          duration: 3000,
          isClosable: true,
        });
        setNom("");
        setDescription("");
        setMontant("")
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
                    ml={["20px","50px","100px","600px"]}
                    // onClick = {() => router.push(personnel/AjouterCategoryPersonnel)} 
                >
                    {/* <Link href={'/personnel/ajoutercategorypersonnel'}>                                 */}
                 {t('pages.personnel.AjouterCategoriePersonnel.addButton')}                         
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
                                        fontSize={['15px','20px','24px']} 
                                        p='2' 
                                    >
                                         {t('pages.personnel.AjouterCategoriePersonnel.heading')}                         
                                    </Heading>
                                </Box>
                            </AlertDialogHeader>
                            <AlertDialogCloseButton/>   

                            <AlertDialogBody>
                            <Box>
                                <FormControl>
                                    <FormLabel>
                                        {t('pages.personnel.AjouterCategoriePersonnel.name')}                         
                                    </FormLabel>
                                    <Input 
                                        id="nom"
                                        type={'text'} 
                                        name="nom"
                                        placeholder={t('pages.personnel.AjouterCategoriePersonnel.name')}                         
                                        onChange = {(event) => setNom(event.target.value)}
                                        value={nom}
                                     />
                                </FormControl>
                                <FormControl mt="15px">
                                    <FormLabel>
                                        {t('pages.personnel.AjouterCategoriePersonnel.description')}                         
                                    </FormLabel>
                                    <Input 
                                        id="description"
                                        type={'text'} 
                                        name="description"
                                        placeholder=  {t('pages.personnel.AjouterCategoriePersonnel.description')}                         
                                        onChange={e => setDescription(e.target.value)}
                                        value={description}
                                    />
                                </FormControl>
                                <FormControl mt="15px">
                                    <FormLabel>
                                        {t('pages.personnel.AjouterCategoriePersonnel.salaireDebase')}                         
                                    </FormLabel>
                                    <Input 
                                        id="montant"
                                        type={'text'} 
                                        name="montant"
                                        placeholder= {t('pages.personnel.AjouterCategoriePersonnel.valueSalaireDebase')}                         
                                        
                                        onChange={e => setMontant(e.target.value)}
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
                                    {t('pages.personnel.AjouterCategoriePersonnel.cancelButton')}                         
                                </Button>
                                {/* <Link href={'/personnel/ajoutercategorypersonnel'}> */}
                                    <Button 
                                    colorScheme='green'  
                                    ml={3}
                                    // onClick={onClose}
                                    onClick={addCategoryPersonnel}
                                    >
                                    {t('pages.personnel.AjouterCategoriePersonnel.submitButton')}                         
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

//   export async function getStaticProps({ locale }) {
//     return {
//       props: {
//         ...(await getStaticPropsTranslations(locale)),
//         // Will be passed to the page component as props
//       },
//     };
//   }
export default ajoutercategorypersonnel;

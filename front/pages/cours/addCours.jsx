import { AlertDialogCloseButton } from "@chakra-ui/react";
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
  Box, 
  Heading,
  useToast ,
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
} from '@chakra-ui/react';

import React, { useEffect } from "react";
import { IoIosAdd } from "react-icons/io";
import Link from "next/link";
import {useMutation, useQuery } from '@apollo/client';
import { CREATE_CATEGORY_ELEVE, CREATE_COURSE} from "../../graphql/Mutation";
import { 
    GET_ALL_Category_Eleve, 
    GET_ALL_REDUCTION_SCOLARITE,
    GET_ALL_COURSES
} from "../../graphql/Queries";
import { useState } from "react";
import { useRouter } from "next/router";
import {useTranslation} from "next-i18next";
import { getStaticPropsTranslations } from "../../types/staticProps";


function AjouterCours () {

    const router = useRouter();
    const toast = useToast();
    const {t} = useTranslation()
    let input
    const [title, setTitle] = useState("");
    const [time, setTime] = useState("");
    const [reductionScolariteId, setReductionScolariteId] = useState();
    const { isOpen, onOpen, onClose } = useDisclosure();
    const cancelRef = React.useRef();
    const [SubmitCategoryEleve, {error}] = useMutation(CREATE_CATEGORY_ELEVE);
    const {data:dataReductionScolarite, loading} = useQuery(GET_ALL_REDUCTION_SCOLARITE);
    const [createCourse] = useMutation(CREATE_COURSE);
    const {data:dataCourse, refetch} = useQuery(GET_ALL_COURSES);

    // const  addCategoryEleve = async (event, value) => {
    //     event.preventDefault();
    //     console.log('cccc');
   
    //     console.log(nom);
    //     console.log(description);

    //     const categorieEleveData =  await SubmitCategoryEleve({
    //         variables: {
    //             createCategorieEleve: {
    //                 nom: nom,
    //                 description: description,
    //                 reductionScolariteId: reductionScolariteId
    //             }
    //         },
    //         refetchQueries: [{
    //             query: GET_ALL_Category_Eleve
    //         }]
    //     })
    //     // console.log(categorieEleveData)
    //     onClose()
    //     toast({
    //          title: "Creation d'une categorie d'élève.",
    //          description: "La categorie a ete créée avec succes.",
    //          status: "success",
    //          duration: 3000,
    //          isClosable: true,
    //        });
    //        router.push("/eleves/categoryeleve");
    //     setNom("");
    //     setDescription("");
    // }

    const addCourse = async () =>{
        console.log(time)
        await createCourse({
            variables:{
                input:{
                 title: title,
                 time: parseInt(time)
                }
            },
            refetchQueries: [{
                query: GET_ALL_COURSES
            }]
        })
        refetch()
        onClose();
        toast({
            title: "Ajout d'un cours.",
            description: "Ajout du cours reussit.",
            status: "success",
            duration: 3000,
            isClosable: true,
        });
        setTitle("");
        setTime("")
    }

    // useEffect(() => {
    //     console.log(dataReductionScolarite?.findAllreductionscolarite)
    // })


  return (
    <Center>
        <Box> 
            <Box> 
                <Button
                    rightIcon={<Icon as={IoIosAdd} boxSize="20px" />}
                    // borderRadius={'md'} 
                    ml={["20px","50px","100px","600px"]}
                    onClick={onOpen}
                    // onClick = {() => router.push(personnel/AjouterCategoryPersonnel)} 
                >
                    {/* <Link href={'/personnel/ajoutercategorypersonnel'}>                                 */}
                        {/* Ajoutez une matiere                                */}
                    {/* </Link>               */}
                    {t('pages.courses.addCourse.addButton')}
                </Button>
            </Box>
            <Box as={"form"}> 
                <AlertDialog
                    isOpen={isOpen}
                    leastDestructiveRef={cancelRef}
                    onClose={onClose}
                    size='xl'
                >
                    <AlertDialogOverlay>
                        <AlertDialogContent  width={"400px"}>
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
                                    {/* Ajouter une matiere */}
                                        {t('pages.courses.addCourse.heading')}

                                    </Heading>
                                </Box>
                            </AlertDialogHeader>
                            <AlertDialogCloseButton/>

                            <AlertDialogBody>
                            <Box>
                                <FormControl>
                                    <FormLabel>
                                        {t('pages.courses.addCourse.name')}
                                    </FormLabel>
                                    <Input 
                                        id="nom"
                                        type={'text'} 
                                        name="title"
                                        value={title}
                                        placeholder="Nom"
                                        onChange = {(event) => setTitle(event.target.value)}
                                        ref={node => {input = node;}}
                                     />
                                </FormControl>
                                <FormControl mt="15px">
                                    <FormLabel>
                                        {t('pages.courses.addCourse.courseHours')}
                                    </FormLabel>
                                    <Input 
                                        id="description"
                                        type={'number'} 
                                        name="time"
                                        value={time}
                                        placeholder="Nombre d'heure du cours"
                                        onChange = {(event) => setTime(event.target.value)}
                                        ref={node => {input = node;}}
                                    />
                                </FormControl>
                                {/* <FormControl mt="15px">
                                    <FormLabel>Reduction</FormLabel>
                                    <Select 
                                        name="reductionScolariteId"
                                        value={reductionScolariteId}
                                        placeholder="valeur"
                                        onChange = {(event) => setReductionScolariteId (event.target.value)}
                                        ref={node => {input = node;}}
                                    >
                                        {
                                            dataReductionScolarite?.findAllreductionscolarite.map((reductionscolarite, index) =>(
                                                <option 
                                                    value={reductionscolarite.id} 
                                                    key={index}
                                                >
                                                    {reductionscolarite.montant}
                                                </option>
                                            ))
                                        }
                                    </Select>
                                </FormControl> */}
                            </Box>
                            </AlertDialogBody>
                            <AlertDialogFooter>
                                <Button 
                                    ref={cancelRef} 
                                    onClick={onClose} 
                                    colorScheme='red' 
                                >
                                    {t('pages.courses.addCourse.cancelButton')}
                                </Button>
                                {/* <Link href={'/personnel/ajoutercategorypersonnel'}> */}
                                    <Button 
                                    colorScheme='green'  
                                    ml={3}
                                    onClick={addCourse}
                                    >
                                        {t('pages.courses.addCourse.submitButton')}
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

  export async function getStaticProps({ locale }) {
    return {
      props: {
        ...(await getStaticPropsTranslations(locale)),
        // Will be passed to the page component as props
      },
    };
  }
export default AjouterCours;

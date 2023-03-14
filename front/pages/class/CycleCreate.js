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
  Icon,
  useToast
} from '@chakra-ui/react';

import React, {useEffect, useState, useMemo, useContext, use} from "react";
import { IoIosAdd } from "react-icons/io";
import {useMutation, useQuery } from '@apollo/client';
import {CREATE_CYCLE, UPDATE_CYCLE } from "../../graphql/Mutation";
import { GET_ALL_SECTION, GET_ONE_CYCLE } from "../../graphql/Queries";
import { useRouter } from "next/router";
import { GlobalContext } from "../../contexts/cyclesection/AppContext";


// const CycleSchema = {
//     name: "pearl",
//     section: "cm2"
// }

// const FormData =  CycleSchema


// export const CycleProps = {
//     defaultValues: FormData,
//     onSubmit: (value = FormData) => {}
// };

// export const CycleProps = {
//     defaultValues:formData,
//      onSubmit:(value = formData) => {}
// }

const  CycleCreate =  (
    // { defaultValues,
    //     onSubmit
    // } =  CycleProps
    ) => {



    const [name, setName] = useState("");
    const[sectionId, setSectionId] = useState("");
    const { isOpen, onOpen, onClose } = useDisclosure();
    const cancelRef = React.useRef();
    const [createCycle, {error}] = useMutation(CREATE_CYCLE);
    // const [editCycle] = useMutation(UPDATE_CYCLE);
    // const [id, setId] = useState(null)
    const {cyleById} = useQuery(GET_ONE_CYCLE);
    const {data} = useQuery(GET_ALL_SECTION);
    const router = useRouter();
    const toast = useToast();
    const [isformOpen, setIsFormOpen] = useState(false)

    // const cycleContext = useContext(GlobalContext);

    console.log(sectionId)

    // const {
    //     handleSubmit,
    //     setValue
    //   } = FormData({
    //     resolver : CycleSchema,
    //     defaultValues: {
    //       ...defaultValues
    //     }
    //   });

    //   const onSubmitCycleForm = handleSubmit(async (values) => {
    //     try {
    //        onSubmit?.(values);
    //       setValue('name', '');
    //       setValue('section', '');
    
    //       toast({
    //         description: "submit first form",
    //         status: 'success',
    //         isClosable: true
    //       });
    //     } catch (error) {
    //       const message = formatError(error);
    
    //       toast({
    //         position: 'top-right',
    //         description: t([`errors:api.${message}`, 'errors:api.default']),
    //         status: 'error',
    //         isClosable: true
    //       });
    //     }
    //   });
    // const updateCache = (cache, { dataCycle: { editCycle } }) => {
    //         cache.modify({
    //           fields: {   
    //             cycle(existingCycle = []) {
    //               const newCycleRef = cache.writeFragment({
    //                 dataCycle: editCycle,
    //                 fragment: gql`
    //                   fragment NewCycle on Cycle {
    //                     id
    //                     name
    //                     description
    //                   }
    //                 `
    //               });
    //               return [...existingCycle, newCycleRef];
    //             }
    //           }
    //         });
    //       }
   

    // const handleSubmit = {
    //     defaultValues: {
    //         name: "",
    //         section: "",
    //         ...defaultValues
    //     }
    // }

    // const _cycleOnSubmit =  handleSubmit (async(values) => {    
    //     try{
    //        await onSubmit?.(values);
    //         toast({
    //             title: "Creation d'un cyle.",
    //             description: "Le cylce a éte crée avec succes.",
    //             status: "success",
    //             duration: 3000,
    //             isClosable: true,
    //         });
    //     }catch{
    //         toast({
    //             title: "Creation d'un cyle.",
    //             description: "$mess.",
    //             status: "error",
    //             duration: 3000,
    //             isClosable: true,
    //         });
    //     }
    // })

    // let input
   
  
    const  addCycle = async (event) => {
        event.preventDefault();
        console.log('cccc');
  
        console.log(name);
        console.log(sectionId)
   
        const cycleData = await createCycle({
            variables: {
                cycle: {
                    name: name,
                    sectionId: sectionId
                }
            }
        })
        console.log(cycleData)
        toast({
            title: "Creation d'un cycle.",
            description: "Le cylce a éte crée avec succes.",
            status: "success",
            duration: 3000,
            isClosable: true,

          });
          router.push("/class/cyclesection")
    }
   
    useEffect(() => {
        console.log(data?.findAllsection)
        console.log("j")
    }, [data])
   
  return (
    <Center>
             <Box> 
                <Button
                    rightIcon={<Icon as={IoIosAdd} boxSize="20px" />}
                    onClick={onOpen}
                    ml={["245px", "490px","909px"]}
                    width ={"200px"}
                    // onClick = {() => router.push(personnel/AjouterCategoryPersonnel)} 
                >
                        Ajouter un Cycle                              
                </Button>
            </Box> 
          {/* {isformOpen?   } */}
        <Box> 
            <Box as={"form"} 
            > 
                <AlertDialog
                    isOpen={isOpen}
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
                                        name="sectionId"
                                        placeholder="Section"
                                        onChange = {(event) => setSectionId(event.target.value)}
                                        value={sectionId}
                                    >
                                        {data && (
                                            data.findAllsection.map((section, index) => ( 
                                                <option value={section?.id} key={index}>
                                                    {section.name}
                                                    {/* {console.log(section.id)} */}
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
                                        onClick={addCycle}
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
export default CycleCreate;

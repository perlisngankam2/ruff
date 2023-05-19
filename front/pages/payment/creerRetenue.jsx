import { Center, Heading, Divider, Input, NumberInput,
  Box,
  Button,
  ButtonGroup,
  IconButton ,
  Flex,
  Hide,
  InputGroup,
  InputRightAddon,
  Select,
  Table,
  TableContainer,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr,
  Avatar,
  Icon,
  Popover,
  PopoverArrow,
  PopoverBody,
  PopoverCloseButton,
  PopoverContent,
  PopoverFooter,
  useDisclosure,
  AlertDialog,
  AlertDialogOverlay,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogBody,
  AlertDialogFooter,
  InputRightElement,
  AlertDialogCloseButton, } from '@chakra-ui/react'
import React from 'react'
import DefaultLayout from '../../components/layouts/DefaultLayout';
import { useRouter } from "next/router";
import { useEffect ,useState } from "react";
import { useMutation, useQuery } from "@apollo/client";
import { CREATE_RETENUE } from "../../graphql/Mutation";
import { GET_ALL_RETENUE } from "../../graphql/Queries";
import { CheckIcon } from '@chakra-ui/icons'
import { useToast } from "@chakra-ui/react";
import { IoIosAdd } from "react-icons/io";
import{ FiEdit, FiSearch} from 'react-icons/fi';
import {MdDelete} from 'react-icons/md';
import ReactPaginate from "react-paginate";
import {useTranslation} from "next-i18next";
import { getStaticPropsTranslations } from "../../types/staticProps";


function creerRetenue() {

   const { isOpen, onToggle, onClose, onOpen } = useDisclosure();
  const [Nom , setNom] = useState("");
  const [Description , setDescription] = useState("");
  const [Montant, setMontant] = useState("");
  const [categoryPersonnelId, setCategoryPersonnelId] = useState("");
  const [createRetenue, error] = useMutation(CREATE_RETENUE);
  
  // const {data:dataCategoryPersonnel} = useQuery(GET_ALL_Category_Personnel);
  const toast = useToast()
  const router = useRouter()
   const {data:dataRetenue, refetch} = useQuery(GET_ALL_RETENUE)
    const itemsPerPage = 15;
    const [pageNumber, setPageNumber] = useState(0);
    const pagesVisited = pageNumber * itemsPerPage;
      const pageCountRetenue = Math.ceil(dataRetenue?.findAllretenusalarial.length / itemsPerPage);
    const cancelRef = React.useRef();
    const {t} = useTranslation();
    const changePage = ({ page }) => {
      setPageNumber(page);
    };


    const HandleClick = async (event) => {
  event.preventDefault();

  const primeData = await createRetenue({
        variables:{
        retenue: { 
          nom: Nom,
          description: Description, 
          montant: parseInt(Montant),
          // categorieId: categoryPersonnelId,
        }
      }
    })
    refetch();
    // console.log(userData)
    onClose();
    toast({
      title: "Succès.",
      description: "La retenue a été crée .",
      status: "success",
      duration: 3000,
      isClosable: true,
    });
     setNom("");
    setDescription("");
    setMontant("");
  }
//     const today = new Date();
//     const day = today.getDate().toString().padStart(2, '0');
//     const month = (today.getMonth() + 1).toString().padStart(2, '0');
//     const year = today.getFullYear();
//     const formattedDate = `${day}/${month}/${year}`;
// console.log(formattedDate)

  return (

     
            <Center>
        <Box> 
            <Box> 
                <Button
                    ml={["20px","50px","100px","600px"]}
                    rightIcon={<Icon as={IoIosAdd} boxSize="20px" />}
                    onClick={onOpen}
                >
                        Ajouter une retenue                              
                </Button> 
          </Box>
            <Box as={"form"} > 
                <AlertDialog
                    isOpen={isOpen}
                    leastDestructiveRef={cancelRef}
                    onClose={onClose}
                    size='xl'
                >
                    <AlertDialogOverlay>
                    <AlertDialogCloseButton />
                        <AlertDialogContent width={"400px"} >
                            <Box as={"form"} 
             onSubmit={HandleClick}>

          <Heading p="1em" textAlign="center" bgGradient='linear(to-r, teal.500, green.500)' bgClip='text' fontSize={'30px'}>
            Ajouter une retenue
          </Heading>
        <Box mx='30px' pb={'15px'}>
          <Divider />
        </Box>
        <Box w="300px" margin="0 auto" textAlign="center" gap={200} >
<Box pb={'10px'}>
 <Input

                    type="text"
                    value={Nom}
                    onChange={(e) => setNom(e.target.value)}
                    name="Nom"
                    placeholder="nom retenue"
                    bg='white'
                    // type="date"
                    // id="dateOfPrime"
                    // name="dateOfPrime"
                    // placeholder="{formattedDate}"
                    // bg='white'
              
                    // borderColor="purple.100"
                    // onChange={e => setDateOfStartWork(e.target.value)}
                    // value={dateOfStartWork}
                    // // ref={dateOfStartWorkRef}
                    
                  />
</Box>
          
<Box pb={'10px'}>
 <Input
                    type="text"
                   value={Description}
                    onChange={(e) => setDescription(e.target.value)}
                    name="Description"
                    placeholder="description retenue"
                    bg='white'
                    // borderColor="purple.100"
                    // onChange={e => setLastName(e.target.value)}
                    // value={lastName}
                  /> 
</Box>
                  
{/* <Box pb={'15px'}>
   <Select
                    type="text"
                    name="categoryPersonnelId"
                    placeholder="Categorie du personnel"
                    onChange={e => setCategoryPersonnelId(e.target.value)}
                    value={categoryPersonnelId}
                    bg='white'
                    // ref={dateOfBirthRef}
                   
                  >
                    { 
                          dataCategoryPersonnel && (
                            dataCategoryPersonnel.findAllcategoriepersonnel.map((categoryPersonnel, index) => (
                                <option value={categoryPersonnel.id} key={index}>
                                  {categoryPersonnel.nom}
                                </option>
                            ))
                        )}

                  </Select>

  
                   
</Box> */}

             <Box pb={'15px'}>
   <Input
                    type="text"
                   value={Montant} 
                   onChange={(e) => setMontant(e.target.value)}
                    name="Description"
                    placeholder="--montant--"
                    bg='white'
                    // borderColor="purple.100"
                    // onChange={e => setLastName(e.target.value)}
                    // value={lastName}
                  /> 

  
                   
</Box>

        </Box>

         <Box mx='30px' pt='0px' pb={'15px'}>
          <Divider />
          
        </Box>
        <Center mb='6'>
          <Button type="submit" leftIcon={<CheckIcon />} colorScheme='teal' variant='solid' mx='auto' my='auto'>
                Soumettre
           </Button>
        </Center>
         </Box>
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
export default creerRetenue;
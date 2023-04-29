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
import { IoIosAdd } from "react-icons/io";
import { useEffect ,useState } from "react";
import { useMutation, useQuery } from "@apollo/client";
import { CREATE_RETENUE } from "../../graphql/Mutation";
import { GET_ALL_RETENUE } from "../../graphql/Queries";
import { CheckIcon } from '@chakra-ui/icons'
import { useToast } from "@chakra-ui/react";
import{ FiEdit, FiSearch} from 'react-icons/fi';
import {MdDelete} from 'react-icons/md';
import ReactPaginate from "react-paginate";
import {useTranslation} from "next-i18next";
import { getStaticPropsTranslations } from "../../types/staticProps";
import creerRetenue from './creerRetenue';



function ajouterRetenue() {

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
    toast({
      title: "Succès.",
      description: "La retenue a été crée .",
      status: "success",
      duration: 3000,
      isClosable: true,
    });
  }
//     const today = new Date();
//     const day = today.getDate().toString().padStart(2, '0');
//     const month = (today.getMonth() + 1).toString().padStart(2, '0');
//     const year = today.getFullYear();
//     const formattedDate = `${day}/${month}/${year}`;
// console.log(formattedDate)

  return (
      <DefaultLayout>
        
        <Box pt="70px" w="100%" bg={"#f6f7fb"}>
      <Flex
          align="center"
          justify="space-between"
          boxShadow="md"
          p="5"
          rounded="lg"
          background="white"
        >
          <Heading
            textAlign="center"
            color="WindowText"
            size="lg"
            textColor="pink.300"
          >
            Retenue
          </Heading>
          <Hide below="sm">
            <Text>Dashboad / Salaire/Retenues Salariales</Text>
          </Hide>
        </Flex>
        <Flex 
          gap={10} 
          mt={7}
        >
          <InputGroup  width="600px">
          {/* <InputRightElement
              children={<Icon as={FiSearch} />}
              cursor="pointer"
            /> */}
             <InputRightElement
              children={<Icon as={FiSearch} />}
              cursor="pointer"
            />
            <Input
              placeholder="Recherchez une section..."
              //value={recherche}
              variant="flushed"
              // onChange={handleChangeSection}
            />
            {/* <InputRightAddon 
              cursor="pointer"
              children={<SearchIcon variant="flushed"/>} 
            /> */}
          </InputGroup>
          {/* <Select 
            placeholder="Selectionner la classe"
            onChange={e =>setQuery(e.target.value)}
          >
          </Select> */}
          <creerRetenue />
        </Flex>

         
        </Box>


    </DefaultLayout>
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
export default ajouterRetenue
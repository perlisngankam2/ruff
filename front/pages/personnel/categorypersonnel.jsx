import { AddIcon, SearchIcon } from "@chakra-ui/icons";
import {
  Box,
  Flex,
  Heading,
  Hide,
  Input,
  InputGroup,
  InputRightAddon,
  Table,
  TableContainer,
  Tbody, 
  Td,
  Text,
  Th,
  Thead,
  Tr,
  Link,
  Icon,
  AlertDialog,
  AlertDialogBody,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogContent,
  AlertDialogOverlay,
  useDisclosure,
  Button,
  InputRightElement
} from "@chakra-ui/react";

import React, { useEffect, useState } from "react";
import DefaultLayout from "../../components/layouts/DefaultLayout";
import AjouterCategoryPersonnel from './AjouterCategoryPersonnel';
import { Router, useRouter } from "next/router";
import {FiEdit, FiSearch} from 'react-icons/fi';
import {MdDelete} from 'react-icons/md';
import { GET_ALL_Category_Personnel, loading, error } from "../../graphql/Queries";
import { DELETE_CATEGORY_PERSONNEL } from "../../graphql/Mutation";
import { useQuery, useMutation } from "@apollo/client"; 
import ReactPaginate from "react-paginate";
import { useTranslation } from "next-i18next";
import { getStaticPropsTranslations } from "../../types/staticProps";


const Category = () => {

    // const router = useRouter();
    const [query , setQuery] = useState("");
    const { isOpen, onToggle, onClose, onOpen } = useDisclosure();
    const cancelRef = React.useRef()
    const [searchPersonnelCategorie, setSearchPersonnelCategorie] = useState("");

    //STATE DE LA PAGINATION
    const itemsPerPage = 10;
    const [pageNumber, setPageNumber] = useState(0);
    const pagesVisited = pageNumber * itemsPerPage;
    const {t} = useTranslation();
    // //const [classeValue , setClasseValue ] = useState("");
    // const [data, setData] = useState([]);
    // const keys = ["first_name", "last_name", "email", "classe"];

    // const search = (data) => {
       
    //   let datas = data.filter((item) => keys.some((key) => (
    //     item[key].toUpperCase().includes(query) 
    //     )
    //   ));
    //   console.log("datas :" , datas)
    //   return query ? datas.slice(0,5) : Users.slice(0,5)
    // };

    const {data ,loading,error} = useQuery(GET_ALL_Category_Personnel);
    const [deletePerssCategory] = useMutation(DELETE_CATEGORY_PERSONNEL);
      // {
      //   onCompleted: data => {
      //     window.location.reload();
      //   }
      // }

     useEffect (() => {
      console.log(data?.findAllcategoriepersonnel);
    }, [data]);

    if (loading) return <Text>Chargement en cour...</Text>
    if (error) return <Text>Une erreur s'est produite!</Text>

    const deleteCategoryPersonnel = async (id) => {
     await deletePerssCategory({
        variables:{id},
        refetchQueries:[{
        query: GET_ALL_Category_Personnel
    }]
          //   update(cache) {
          //     cache.modify({
          //         fields: {
          //             category(existingCategories = []) {
          //                 return existingCategories.filter(
          //                   categoryRef => idToRemove !== readField('id', categoryRef)
          //                 );
          //             },
          //           },
          //     });
          // },
      })
    }

  const handleChange = (e) => {
    setSearchPersonnelCategorie(e.target.value);
  };

  const pageCountCategoryPersonnel = Math.ceil(data?.findAllcategoriepersonnel.length / itemsPerPage);

  const changePage = ({ page }) => {
    setPageNumber(page);
  };

  return (
    <DefaultLayout>
      <Box p="3" pt={"70px"} w="full">
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
           {t('pages.personnel.categorypersonnel.heading')}
          </Heading>
          <Hide below="sm">
            <Text>Dashboad / personnel/ Categories de personnels </Text>
          </Hide>
        </Flex>
        <Flex gap={10} mt={7}>
          <InputGroup width={["400px", "400px", "500px", "500px"]}>
            <InputRightElement
              children={<Icon as={FiSearch} />}
              cursor="pointer"
            />
            <Input
              placeholder="Recherchez une categorie..."
              //value={recherche}
              // onChange={e => setQuery(e.target.value)}
              variant="flushed"
              onChange={handleChange}
            />
            {/* <InputRightAddon children={<SearchIcon />} /> */}
          </InputGroup>
          {/* <Select 
            placeholder="Selectionner la classe"
            onChange={e =>setQuery(e.target.value)}
          >
          </Select> */}
          <AjouterCategoryPersonnel/>
        </Flex>
        <Box mt={10}>
            <TableContainer
              border={"1px"} 
              rounded={"md"}
            >
                <Table 
                  variant='striped'
                  colorScheme={"white"}
                  bg={"white"}
                >
                    <Thead background="colors.secondary">
                    <Tr>
                        <Th>Nom</Th>
                        <Th>Description</Th>
                        <Th>Salaire de base</Th>
                        <Th>Actions</Th>
                    </Tr>
                    </Thead>
                    {data && ( 
                    <Tbody>
                      {
                        data.findAllcategoriepersonnel
                        .slice(pagesVisited, pagesVisited + itemsPerPage)
                        .filter((category) =>{
                          if(searchPersonnelCategorie == ""){
                            return category;
                          }else if (category.nom.toLowerCase().includes (searchPersonnelCategorie.toLowerCase()))
                          return category;
                        })
                        .map((category, index) => ( 
                          <Tr key={index}>
                              <Td p={0} pl={6}>{category.nom}</Td>
                              <Td p={0} pl={6}>{category.description}</Td>
                              <Td p={0} pl={6}>{category.montant} FCFA</Td>
                              <Td p={0} pl={3}>
                              <Box display="flex">
                                <Link 
                                  href="#"
                                  >
                                    <Icon
                                    as={FiEdit}
                                    boxSize="40px"
                                    p="3"
                                    rounded={"full"}
                                    _hover={{background:"blue.100"}}
                                    />
                                </Link>
                                <Box mt="-3px">
                                  <Icon
                                    as={MdDelete}
                                    boxSize="44px"
                                    p="3"
                                    rounded="full"
                                    color="colors.quaternary"
                                    _hover={{background:"blue.100"}}
                                    onClick={onToggle}
                                  />
                                  <Box> 
                                    <AlertDialog
                                      isOpen={isOpen}
                                      leastDestructiveRef={cancelRef}
                                      onClose={onClose}
                                      isCentered
                                    >
                                        <AlertDialogOverlay
                                          // alignSelf={"center"}
                                        >
                                          <AlertDialogContent
                                            width={"380px"}
                                          >
                                            <AlertDialogHeader 
                                              fontSize='lg' 
                                              fontWeight='bold'
                                              textAlign={"center"}
                                            >
                                                {t('pages.personnel.categorypersonnel.confirmDeletingAlertDialogHeader')}
                                            </AlertDialogHeader>
                                            <AlertDialogBody textAlign={"center"}>
                                              {t('pages.personnel.categorypersonnel.confirmDeletingAlertDialogBody')}
                                            </AlertDialogBody>
                                            <AlertDialogFooter>
                                              <Button 
                                                ref={cancelRef} 
                                                onClick={onClose}
                                                colorScheme="red"
                                              >
                                               {t('pages.personnel.categorypersonnel.cancelAlertDialogButtonForDeleting')}
                                                 
                                              </Button>
                                              <Button 
                                                colorScheme='green' 
                                                onClick={() => deleteCategoryPersonnel(category.id)}  
                                                ml={3}
                                              >
                                                {t('pages.personnel.categorypersonnel.submitAlertDialogButtonForDeleting')}
                                              </Button>
                                            </AlertDialogFooter>
                                          </AlertDialogContent>
                                        </AlertDialogOverlay>
                                    </AlertDialog>
                                  </Box>
                                </Box>
                              </Box>
                              </Td>
                          </Tr>
                        ))}
                    </Tbody>
                      )}
                </Table>
            </TableContainer>
        </Box>
        <Box mt={"15px"}> 
          <ReactPaginate 
            previousLabel={"<<"}
            nextLabel={">>"}
            pageCount={pageCountCategoryPersonnel}
            onPageChange={changePage}
            containerClassName={"paginationBttns"}
            previousLinkClassName={"previousBttn"}
            nextLinkClassName={"nextBttn"}
            disabledClassName={"paginationDisabled"}
            activeClassName={"paginationActive"}
          />
      </Box>
      </Box>
    </DefaultLayout>
  );
};

export async function getStaticProps({ locale }) {
  return {
    props: {
      ...(await getStaticPropsTranslations(locale))
      // Will be passed to the page component as props
    }
  };
}
export default Category;

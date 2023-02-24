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
  Icon
} from "@chakra-ui/react";

import DefaultLayout from "../../components/layouts/DefaultLayout";
import AjouterCategoryPersonnel from './AjouterCategoryPersonnel';
import { Router, useRouter } from "next/router";
import {FiEdit} from 'react-icons/fi';
import {MdDelete} from 'react-icons/md';
import { GET_ALL_Category_Personnel } from "../../graphql/queries";
import { DELETE_CATEGORY_PERSONNEL } from "../../graphql/Mutation";
import { useQuery, useMutation } from "@apollo/client"; 
import { useEffect, useState } from "react";

const Category = () => {

    // const router = useRouter();
    const [query , setQuery] = useState("");
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

    const {data} = useQuery(GET_ALL_Category_Personnel);
    const [deletePerssCategory] = useMutation(DELETE_CATEGORY_PERSONNEL, 
      {
        onCompleted: data => {
          window.location.reload();
        }
      });

     useEffect (() => {
      console.log(data?.findAllcategoriepersonnel);
    }, [data]);


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
  return (
    <DefaultLayout>
      <Box p="3" pt={"80px"} w="full">
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
           Categories de personnels
          </Heading>
          <Hide below="sm">
            <Text>Dashboad / personnel/Categories de personnels </Text>
          </Hide>
        </Flex>

        <Flex gap={10} mt={5}>
          <InputGroup>
            <Input
              placeholder="Recherchez une categorie..."
              //value={recherche}
              onChange={e => setQuery(e.target.value)}
            />
            <InputRightAddon children={<SearchIcon />} />
          </InputGroup>
          {/* <Select 
            placeholder="Selectionner la classe"
            onChange={e =>setQuery(e.target.value)}
          >
          </Select> */}
          <AjouterCategoryPersonnel/>
        </Flex>
        <Box mt={10}>
            <TableContainer>
                <Table variant='striped'>
                    <Thead>
                    <Tr>
                        <Th>Nom</Th>
                        <Th>Description</Th>
                        <Th>Actions</Th>
                    </Tr>
                    </Thead>
                    {data && ( 
                    <Tbody>
                      {
                        data.findAllcategoriepersonnel.map((category, index) => ( 
                          <Tr key={index}>
                              <Td borderColor={'#C6B062'}>{category.nom}</Td>
                              <Td borderColor={'#C6B062'}>{category.description}</Td>
                              <Td borderColor={'#C6B062'}>
                              <Box display="flex">
                                <Link 
                                  href="/eleves/modifiereleve">
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
                                    onClick={() => deleteCategoryPersonnel(category.id)}
                                  />
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
      </Box>
    </DefaultLayout>
  );
};

export default Category;

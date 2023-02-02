import React from "react";
import {
    Box,
    Flex,
    Input,
    Button,
    Heading,
    Text,
    Stack,
    useColorModeValue,
    FormControl,
  FormLabel,
   

} from "@chakra-ui/react"
import Link from "next/link";
import DefaultLayout from "../components/layouts/DefaultLayout";

function depenses (){
    return(
        <DefaultLayout>
            <Box p="3" pt="70px">
                
                <Heading > <Text > Depenses</Text></Heading>
                <Flex>
                    
                </Flex>
            </Box>
            <Box>

            <Flex
      minH={'100vh'}
      align={'center'}
      justify={'center'}
      bg={useColorModeValue('gray.50', 'gray.800')}
      minW={'100vh'}
      
      >
      <Stack
        spacing={4}
        w={'full'}
        maxW={'md'}
        bg={useColorModeValue('white', 'gray.700')}
        rounded={'xl'}
        boxShadow={'lg'}
        p={6}
        my={12}>
        <Heading lineHeight={1.1} fontSize={{ base: '2xl', md: '3xl' }}>
          Ajouter une depense
        </Heading>
        <FormControl id="date-depense" isRequired>
          <FormLabel>date </FormLabel>
          <Input
            placeholder="date depense"
            _placeholder={{ color: 'gray.500' }}
            type="date"
          />
        </FormControl>
        <FormControl id="description" isRequired>
          <FormLabel>Description </FormLabel>
          <Input
            placeholder="description depense"
            _placeholder={{ color: 'gray.500' }}
            type="text"
          />
        </FormControl>
        <FormControl id="montant depense" isRequired>
          <FormLabel>montant </FormLabel>
          <Input 
          placeholder="Montant depensé"
          _placeholder={{ color: 'gray.500' }}
          type="number" />
        </FormControl>
        <Stack spacing={6}>
          <Button
            bg={'blue.400'}
            color={'white'}
            _hover={{
              bg: 'blue.500',
            }}>
            valider
          </Button>
        </Stack>
      </Stack>
    </Flex>
            </Box>

        </DefaultLayout>
    );
}

export default depenses;
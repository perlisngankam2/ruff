import React from "react";
import {
    Box,
    Flex,
    Input,
    Button,
    Heading,
    Table,
    Thead,
    Tbody,
    Tfoot,
    Tr,
    Th,
    Td,
    TableCaption,
    TableContainer,
    Text
} from "@chakra-ui/react"
import Link from "next/link";
import DefaultLayout from "../components/layouts/DefaultLayout";

function comptabilite (){
    return(
        <DefaultLayout>
          <Box pl="3" pr="3" pt="70px" minW={'1000px'} >
            <Box >
                <Heading> Compatabilité</Heading>
            </Box>

            <Box flexWrap={'wrap'} >
                <Flex gap='3' align={'end'}>
                <Input
            placeholder="date depense"
            _placeholder={{ color: 'gray.500' }}
            type="date"
            variant={'flushed'}
          />

           <Text> à </Text>

           <Input
            placeholder="date depense"
            _placeholder={{ color: 'gray.500' }}
            type="date"
            variant={'flushed'}
          />
           
           <Input
            placeholder="date depense"
            _placeholder={{ color: 'gray.500' }}
            type="submit"
            value={'recherche'}
            w='lg'
            bg='blue.500'
          />
           
                    
                </Flex>
            </Box>

            <Box mt={'10px'}>

            <TableContainer>
  <Table variant='striped' colorScheme='teal' >
    <TableCaption>statut comptabilité</TableCaption>
    <Thead>
      <Tr>
        <Th>Date</Th>
        <Th>Description</Th>
        <Th isNumeric>Debit</Th>
        <Th isNumeric>Credit</Th>
        <Th isNumeric>Balance</Th>
      </Tr>
    </Thead>
    <Tbody>
     
      <Tr>
        <Td>02-01-2023</Td>
        <Td>vente de voiture</Td>
        <Td isNumeric>0</Td>
        <Td isNumeric>2.000.000</Td>
        <Td isNumeric>2.000.000</Td>
      </Tr>
    </Tbody>
    <Tfoot>
      <Tr>
        <Th></Th>
        <Th>Total</Th>
        <Th isNumeric>Depensé</Th>
        <Th isNumeric>gagné</Th>
        <Th isNumeric>Balance</Th>
      </Tr>
    </Tfoot>
  </Table>
</TableContainer>

           

            </Box>







            </Box>
        </DefaultLayout>


    );
}

export default comptabilite;
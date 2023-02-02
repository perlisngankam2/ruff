import { 
    Box, 
    Center,
    Table,
    Thead,
    Tbody,
    Tr,
    Th,
    Td,
    TableContainer,
} from '@chakra-ui/react';

const PaySlipMiddle = () => {


    return (
        <Center>
            <Box>    
                <Box 
                    border={'1px'} 
                    w={['890px']} 
                    mb={['10px', '10px', '20px']} minH={'200px'}
                >
                    <TableContainer >
                        <Table variant='simple'>
                            <Thead 
                                 bg={'yellow.400'}
                                    p={'20px'}
                                 >
                                <Tr
                                >
                                    <Th p={'6px'}>RUB</Th>
                                    <Th p={'25px'}>LIBELLE</Th>
                                    <Th p={'2px'}>NOMBRE/BASE</Th>
                                    <Th p={'6px'}>TAUX</Th>
                                    <Th p={'6px'}>GAINS</Th>
                                    <Th p={'12px'}>RETENUES</Th>
                                    <Box fontSize={'sm'}>
                                        COTISATIONS PATRONALES
                                        <Th >Taux</Th>
                                        <Th>Montant</Th>
                                    </Box>
                                </Tr>
                            </Thead>
                             <Tbody ml={'-20px'}>
                                <Tr >
                                    <Td  p={'6px'}></Td>
                                    <Td></Td>
                                 </Tr>
                                <Tr bg={'blue.100'}> 
                                    <Td p={'6px'}></Td> 
                                    <Td></Td> 
                                    <Td></Td> 
                                    <Td></Td> 
                                    <Td></Td> 
                                    <Td></Td> 
                                    <Td></Td> 
                                 </Tr> 
                                 <Tr> 
                                    <Td  p={'6px'}></Td> 
                                    <Td></Td> 
                                 </Tr>
                                 <Tr bg={'green.100'}> 
                                    <Td  p={'6px'}></Td> 
                                    <Td></Td> 
                                    <Td></Td> 
                                    <Td></Td> 
                                    <Td></Td> 
                                    <Td></Td> 
                                    <Td></Td> 
                                 </Tr>
                                 <Tr > 
                                    <Td  p={'6px'}></Td> 
                                    <Td></Td> 
                                 </Tr>
                            </Tbody>
                        </Table>
                    </TableContainer>
                </Box>
            </Box>
        </Center>
    );
}

export default PaySlipMiddle;

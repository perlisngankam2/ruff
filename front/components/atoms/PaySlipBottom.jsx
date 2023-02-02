import {
    Text,
    Center,
    Box,
    Divider,
    Table,
    Thead,
    Tbody,
    Tr,
    Th,
    Td,
    TableContainer,
} from '@chakra-ui/react';

const PaySlipBottom = () => {


    return (
        <Center>
            <Box 
                display={{md:'flex'}}
                gap={3}
            > 
                <Box>
                    <Box 
                        border={'1px'} 
                        w={['710px']} 
                        mb={['10px', '10px', '10px']}
                    >
                        <TableContainer >
                            <Table variant='simple'>
                                <Thead 
                                    bg={'yellow.400'}
                                    >
                                    <Tr >
                                        <Th 
                                            fontWeight={'light'}  
                                            w={['5px','5px', '5px']}
                                            p={'0px'}
                                        >
                                        </Th>
                                        <Th  p={'0px'} >heure</Th>
                                        <Th  p={'0px'}>Plafond</Th>
                                        <Th  p={'6px'}>Brute</Th>
                                        <Th p={'6px'}>Retenues</Th>
                                        <Th p={'0px'} >Net imposables</Th>
                                        <Th p={'0px'}>Cotis.Patronales</Th>
                                    </Tr>
                                </Thead>
                                <Tbody ml={'-20px'}>
                                    <Tr>
                                        <Td p={'6px'}>MOIS</Td>
                                        {/* <Td>millimetres (mm)</Td> */}
                                    </Tr>
                                    <Tr bg={'blue.100'}>
                                        <Td p={'6px'}>CUMUL</Td>
                                        {/* <Td>centimetres (cm)</Td> */}
                                        <Td p={'6px'}></Td>
                                        <Td p={'6px'}></Td>
                                        <Td p={'6px'}></Td>
                                        <Td p={'6px'}></Td>
                                    {/* je dois mettre un divider ici */}
                                        <Td 
                                            p={'6px'} 
                                            borderLeft={'1px'} 
                                            borderRight={'1px'}></Td>
                                            <Td p={'6px'}>
                                        </Td>
                                    </Tr>
                                </Tbody>
                            </Table>
                        </TableContainer>
                    </Box>
                    <Box mb={['20px', '20px', '20px']}>
                        <Text textAlign={'center'}>
                            Le net imposable a declarer est indique dans le cadre ci-dessus: cumul
                        </Text>
                    </Box>
                    <Box 
                        border={'1px'} 
                        w={['710px']} 
                        mb={'10px'}
                        minH={'20PX'}
                    >
                        <TableContainer >
                            <Table variant='simple'>
                                <Thead
                                   >
                                    <Tr>
                                        <Th 
                                            p={'6px'} 
                                            w={['5px','5px', '5px']}
                                        >
                                            CONGES
                                        </Th>
                                        <Th  p={'2px'} flex={1}>Acquis</Th>
                                        <Th  p={'0px'}>Prix</Th>
                                        <Th  p={'6px'}>Prix_Soldes</Th>
                                        <Th  p={'6px'}></Th>

                                    </Tr>
                                </Thead>
                                <Tbody ml={'-20px'}>
                                    <Tr>
                                        <Td p={'6px'}></Td>
                                        <Td></Td>
                                        <Td p={'6px'}></Td>
                                        <Td>
                                            {/* <Divider orientation='vertical' /> */}
                                        </Td>
                                        <Td borderLeft={'1px'}>Jours de conges decompte:1000</Td>
                                    </Tr>
                                </Tbody>
                            </Table>
                        </TableContainer>
                    </Box>
                    <Box 
                        p={'10px'}>
                        <Text textAlign={'center'}>
                            Montant en lettre du salaire net
                        </Text>
                    </Box>
                </Box>
                <Box>
                    <Box 
                        border={'1px'} 
                        w={['270px', '275px','170px']} 
                        mb={'25px'}
                    >
                      <Text 
                        textAlign={'center'}  
                        fontWeight={'bold'}>
                            PERIODE DE PAIE
                      </Text>
                      <Text textAlign={'center'}>
                         Date
                        </Text>
                    </Box>
                    <Box 
                        border={'1px'} 
                        w={['270px', '275px','170px']}  
                        mb={'25px'}
                    >
                        <Text  
                            fontWeight={'bold'} 
                            textAlign={'center'} 
                            bg={'yellow.400'}
                        >
                            NET A PAYER
                        </Text>
                        <Divider color={'black'}/>
                        <Text textAlign={'center'} minH={'58px'}>..........</Text>
                    </Box>
                    <Box 
                        border={'1px'} 
                        w={['270px', '275px','170px']} 
                    >
                        <Text   
                            fontWeight={'bold'} 
                            textAlign={'center'}
                        >
                             DATE DE PAIE
                        </Text>
                      <Text textAlign={'center'}>Date</Text>
                    </Box>
                </Box>
            </Box>

        </Center>
    );
}

export default PaySlipBottom;

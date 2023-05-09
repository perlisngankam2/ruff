import { Box, 
    Card, 
    CardHeader, 
    CardBody, 
    CardFooter, 
    Heading, 
    Text,
    Center,
    InputGroup,
    InputLeftElement,
    Input,
    Icon,
    Flex,
    FormControl,
    FormLabel,
    Hide,
    Show,
    Stack,
    Divider,
    Image,
    Table,
    Thead,
    Tbody,
    Tfoot,
    Tr,
    Th,
    Td,
    TableCaption,
    TableContainer
} from '@chakra-ui/react';
// import { useTranslation} from 'next-i18next';
import {CiSearch} from 'react-icons/ci'
import { useQuery } from '@apollo/client';
import { GET_STATISTICS_TRANCHE1_PRIMAIRE_ANGLOPHONE_SECTION} from '../../graphql/Queries';

import DefaultLayout from '../../components/layouts/DefaultLayout';

const SuiviPaiementPremiereTranche = () => {

    const {data:dataTranche1StatisticsClassAnglophoneSection} = useQuery(GET_STATISTICS_TRANCHE1_PRIMAIRE_ANGLOPHONE_SECTION);
    // const {t} = useTranslation();

    return (
        <DefaultLayout>
            <Center mt="70px">
                    <Box 
                        //  gap={6}
                        // mt={'10'} 
                        // display={{md:'flex'}}
                        // mb={'20px'}
                        border={'1px'}
                        mt={'30px'}
                        ml={'50px'}
                    >
                        <Box mb={'2'} borderBottom={'1px'} >
                            <Heading textAlign={'center'} fontSize={['2xl', '2xl', '2xl']}>
                                GROUPE SCOLAIRE BILINGUE AWONO BILOGUE
                            </Heading>
                        </Box>
                        <Box  borderBottom={'1px'} mt={'30px'} display={{md:"flex"}}>
                            <Heading textAlign={'center'} fontSize={['xl', 'xl', 'xl']} >
                            T1 bis: TABLEAU DE SUIVI  DU PAIEMENT DES FRAIS DE PREMIERE TRANCHE 
                            </Heading>
                        </Box>
                        
                        <Box> 
                            <TableContainer>
                                <Table size='sm'>
                                    <Thead>
                                        <Tr ml={'100px'}>
                                            <Th rowSpan={2} border={'1px'}>SECTIONS</Th>
                                            <Th rowSpan={2} border={'1px'}>CLASSES</Th>
                                            <Th rowSpan={2} border={'1px'}>EFFECTIFS ENREGISTRES (1)</Th>
                                            <Th rowSpan={2} border={'1px'}>MONTANT ATTENDU (2)</Th>
                                            <Th colSpan={4} textAlign={'center'} border={'1px'} >ENCAISSEMENT</Th>
                                            <Th colSpan={4} textAlign={'center'}  border={'1px'}>TAUX D'ENCAISSEMENT=(4)=3/2*(100)</Th>
                                        </Tr>
                                        <Tr ml={'100px'}>
                                            <Th border={'1px'}>NOMBRE</Th>
                                            <Th border={'1px'}>TAUX</Th>
                                            <Th border={'1px'}>MONTANT ENCAISSE</Th>
                                            <Th border={'1px'}>TAUX</Th>
                                            <Th textAlign={'center'} border={'1px'} >NOMBRE</Th>
                                            <Th textAlign={'center'} border={'1px'} >TAUX</Th>
                                            <Th textAlign={'center'} border={'1px'} >MONTANT EN CAISSE</Th>
                                            <Th textAlign={'center'} border={'1px'} >TAUX</Th>

                                        </Tr>
                                    </Thead> 
                                    <Tbody>
                                        {dataTranche1StatisticsClassAnglophoneSection &&
                                            dataTranche1StatisticsClassAnglophoneSection.getSectionStatisticsAnglophoneFirstInstalment
                                            .map((anglophoneclasse, index) => ( 
                                        <Tr border={'1px'} key={index}>
                                            <Td border={'1px'} rowSpan={1}>MB</Td>
                                            <Td border={'1px'}>{anglophoneclasse.className}</Td>
                                            <Td border={'1px'}>{anglophoneclasse.numberOfStudents}</Td>
                                            <Td border={'1px'}>{anglophoneclasse.expectedAmount}</Td>
                                            <Td border={'1px'}>{anglophoneclasse.sumAmountAlreadyPaid}</Td>
                                            <Td border={'1px'}>{anglophoneclasse.className}</Td>
                                            <Td border={'1px'}>{anglophoneclasse.className}</Td>
                                            <Td border={'1px'}>{anglophoneclasse.className}</Td>
                                            <Td border={'1px'}>{anglophoneclasse.className}</Td>
                                            <Td border={'1px'}>millim</Td>
                                            <Td border={'1px'}>millim</Td>
                                            <Td border={'1px'}>millim</Td>

                                        </Tr>
                                    ))}
                                    </Tbody>
                                    <Tbody>
                                        
                                    <Tr >
                                            <Td border={'1px'}>inches</Td>
                                            <Td border={'1px'}>millimet</Td>
                                            <Td border={'1px'}>25.4</Td>
                                            <Td border={'1px'}>millimetres</Td>
                                            <Td border={'1px'}>millimetres </Td>
                                            <Td border={'1px'}>millimetres</Td>
                                            <Td border={'1px'}>millimetres</Td>
                                            <Td border={'1px'}>milli</Td>
                                            <Td border={'1px'}>millimetres</Td>
                                            <Td border={'1px'}>millim</Td>
                                            <Td border={'1px'}>mill</Td>
                                        </Tr>
                                    </Tbody>

                                </Table>
                            </TableContainer>
                        </Box>
                    </Box>
            </Center>
        </DefaultLayout>
    );
}

export default SuiviPaiementPremiereTranche;

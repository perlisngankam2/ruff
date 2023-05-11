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
import {
    GET_STATISTICS_PRIMAIRE_ANGLOPHONE_CLASS,
    GET_STATISTICS_PRIMAIRE_FRANCOPHONE_CLASS,
    GET_TOTAL_STATISTICS_PRIMAIRE_FRANCOPHONE_CLASS,
    GET_TOTAL_STATISTICS_PRIMAIRE_ANGLOPHONE_CLASS
} from '../../graphql/Queries'

import DefaultLayout from '../../components/layouts/DefaultLayout';
import { useEffect } from 'react';

const SuiviPaiementFraisInscription = () => {

    // const {t} = useTranslation();
    const {data:dataInscriptionStatisticsAnglophoneSection} = useQuery(GET_STATISTICS_PRIMAIRE_ANGLOPHONE_CLASS);
    const {data:dataTotalInscriptionStatisticsAnglophoneSection} = useQuery(GET_TOTAL_STATISTICS_PRIMAIRE_ANGLOPHONE_CLASS);

    const {data:dataInscriptionStatisticsFrancophoneSection} = useQuery(GET_STATISTICS_PRIMAIRE_FRANCOPHONE_CLASS)
    const {data:dataTotalInscriptionStatisticsFrancophoneSection} = useQuery(GET_TOTAL_STATISTICS_PRIMAIRE_FRANCOPHONE_CLASS)



    useEffect(() => {
        console.log(dataInscriptionStatisticsAnglophoneSection);
    })
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
                            T1: TABLEAU DE SUIVI  DU PAIEMENT DES FRAIS D'INSCRIPTIONS 
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
                                            <Th colSpan={4} textAlign={'center'}  border={'1px'}>RESTES A RECOUVRER </Th>
                                        </Tr>
                                        <Tr ml={'100px'}>
                                            <Th border={'1px'}>NOMBRE</Th>
                                            <Th border={'1px'}>TAUX</Th>
                                            <Th border={'1px'}>MONTANT ENCAISSE</Th>
                                            <Th border={'1px'}>TAUX</Th>
                                            <Th textAlign={'center'} border={'1px'} >NOMBRE</Th>
                                            <Th textAlign={'center'} border={'1px'} >TAUX</Th>
                                            <Th textAlign={'center'} border={'1px'} >MONTANT</Th>
                                            <Th textAlign={'center'} border={'1px'} >TAUX</Th>

                                        </Tr>
                                    </Thead>
                                    <Tbody>
                                        {dataInscriptionStatisticsFrancophoneSection && 
                                            dataInscriptionStatisticsFrancophoneSection.getSectionStatisticsFrancophoneAdmissionFee
                                            .map((francophoneClass) => (
                                        <Tr >
                                            <Td border={'1px'} rowSpan={6}>{francophoneClass.sectionName}</Td>
                                            <Td border={'1px'}>{francophoneClass.className}</Td>
                                            <Td  border={'1px'}>{francophoneClass.numberOfStudents}</Td>
                                            <Td border={'1px'}>{francophoneClass.expectedAmount}</Td>
                                            <Td border={'1px'}>{francophoneClass.numberOfStudentsStartedPaying} </Td>
                                            <Td border={'1px'}>{francophoneClass.TAUXA}%</Td>
                                            <Td border={'1px'}>{francophoneClass.sumAmountAlreadyPaid}</Td>
                                            <Td border={'1px'}>{francophoneClass.TAUXB}%</Td>
                                            <Td border={'1px'}>{francophoneClass.numberOfStudentsNotPaid}</Td>
                                            <Td border={'1px'}>{francophoneClass.TAUXC}%</Td>
                                            <Td border={'1px'}>{francophoneClass.amountRest}</Td>
                                            <Td border={'1px'}>{francophoneClass.TAUXD}%</Td>
                                        </Tr>
                                         ))
                                        }
                                    </Tbody>
                                    {dataTotalInscriptionStatisticsFrancophoneSection &&
                                        dataTotalInscriptionStatisticsFrancophoneSection.TotalSectionStatisticsFrancophoneAdmissionFee
                                        .map((totalFrancophoneClass, index) => ( 
                                        <Tr key={index}>
                                            <Td border={'1px'} rowSpan={6} fontWeight={"bold"}>Total</Td>
                                            <Td border={'1px'}></Td>
                                            <Td  border={'1px'}>{totalFrancophoneClass.TOTAL_EFFECTIFS_ENREGISTRES}</Td>
                                            <Td border={'1px'}>{totalFrancophoneClass.TOTAL_MONTANT_ATTENDU}</Td>
                                            <Td border={'1px'}>{totalFrancophoneClass.TOTAL_NOMBRE_ENCAISSEMENT}</Td>
                                            <Td border={'1px'}>{totalFrancophoneClass.TOTAL_FIRST_TAUX_ENCAISSEMENT}%</Td>
                                            <Td border={'1px'}>{totalFrancophoneClass.TOTAL_MONTANT_EN_CAISSE}</Td>
                                            <Td border={'1px'}>{totalFrancophoneClass.TOTAL_SECOND_TAUX_ENCAISSEMENT}%</Td>
                                            <Td border={'1px'}>{totalFrancophoneClass.TOTAL_NOMBRE_SANS_ENCAISSEMENT}</Td>
                                            <Td border={'1px'}>{totalFrancophoneClass.TOTAL_FIRST_TAUX_RECOUVRIR}%</Td>
                                            <Td border={'1px'}>{totalFrancophoneClass.TOTAL_RESTE_A_RECOUVRER}</Td>
                                            <Td border={'1px'}>{totalFrancophoneClass.TOTAL_SECOND_TAUX_RECOUVRIR}%</Td>
                                      
                                        </Tr>
                                        ))
                                    }
                                    <Tbody>
                                    </Tbody>
                                    <Tbody>
                                     {dataInscriptionStatisticsAnglophoneSection &&
                                        dataInscriptionStatisticsAnglophoneSection?.getSectionStatisticsAnglophoneAdmissionFee
                                        .map((anglophoneclasse, index) =>( 
                                        <Tr border={'1px'} key={index}>
                                            <Td border={'1px'} rowSpan={1}>{anglophoneclasse.sectionName}</Td>
                                            <Td border={'1px'}>{anglophoneclasse.className}</Td>
                                            <Td border={'1px'}>{anglophoneclasse.numberOfStudents}</Td>
                                            <Td border={'1px'}>{anglophoneclasse.expectedAmount}</Td>
                                            <Td border={'1px'}>{anglophoneclasse.numberOfStudentsStartedPaying}</Td>
                                            <Td border={'1px'}>{anglophoneclasse.TAUXA}%</Td>
                                            <Td border={'1px'}>{anglophoneclasse.sumAmountAlreadyPaid}</Td>
                                            <Td border={'1px'}>{anglophoneclasse.TAUXB}%</Td>
                                            <Td border={'1px'}>{anglophoneclasse.numberOfStudentsNotPaid}</Td>
                                            <Td border={'1px'}>{anglophoneclasse.TAUXC}%</Td>
                                            <Td border={'1px'}>{anglophoneclasse.amountRest}</Td>
                                            <Td border={'1px'}>{anglophoneclasse.TAUXD}%</Td>
                                        </Tr>
                                      )) }
                                    </Tbody>
                                    <Tbody>
                                        { dataTotalInscriptionStatisticsAnglophoneSection &&
                                        dataTotalInscriptionStatisticsAnglophoneSection.TotalSectionStatisticsAnglophoneAdmissionFee
                                        .map((totalAnglophoneclasse, index) => ( 
                                    <Tr key={index}>
                                            <Td border={'1px'} rowSpan={6} fontWeight={"bold"}>Total</Td>
                                            <Td border={'1px'}></Td>
                                            <Td  border={'1px'}>{totalAnglophoneclasse.TOTAL_EFFECTIFS_ENREGISTRES}</Td>
                                            <Td border={'1px'}>{totalAnglophoneclasse.TOTAL_MONTANT_ATTENDU}</Td>
                                            <Td border={'1px'}>{totalAnglophoneclasse.TOTAL_NOMBRE_ENCAISSEMENT}</Td>
                                            <Td border={'1px'}>{totalAnglophoneclasse.TOTAL_FIRST_TAUX_ENCAISSEMENT}%</Td>
                                            <Td border={'1px'}>{totalAnglophoneclasse.TOTAL_MONTANT_EN_CAISSE}</Td>
                                            <Td border={'1px'}>{totalAnglophoneclasse.TOTAL_SECOND_TAUX_ENCAISSEMENT}%</Td>
                                            <Td border={'1px'}>{totalAnglophoneclasse.TOTAL_NOMBRE_SANS_ENCAISSEMENT}</Td>
                                            <Td border={'1px'}>{totalAnglophoneclasse.TOTAL_FIRST_TAUX_RECOUVRIR}%</Td>
                                            <Td border={'1px'}>{totalAnglophoneclasse.TOTAL_RESTE_A_RECOUVRER}</Td>
                                            <Td border={'1px'}>{totalAnglophoneclasse.TOTAL_SECOND_TAUX_RECOUVRIR}%</Td>
                                      
                                        </Tr>
                                        ))
                                     }
                                    </Tbody>
                                </Table>
                            </TableContainer>
                        </Box>
                    </Box>
            </Center>
        </DefaultLayout>
    );
}

export default SuiviPaiementFraisInscription;

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
import { useQuery } from '@apollo/client';
import {GET_GENERAL_FEES_STATISTICS_PER_CLASS_ANGLOPHONE_SECTION,
    GET_GENERAL_FEES_STATISTICS_PER_CLASS_FRANCOPHONE_SECTION,
    GET_TOTAL_GENERAL_FEES_STATISTICS_PER_CLASS_FRANCOPHONE_SECTION,
    GET_TOTAL_GENERAL_FEES_STATISTICS_PER_CLASS_ANGLOPHONE_SECTION 
} from '../../graphql/Queries'
import {CiSearch} from 'react-icons/ci'
import DefaultLayout from '../../components/layouts/DefaultLayout';
import { useEffect } from 'react';

const SuiviPaiementParEleveReNormal = () => {

    const {data:dataStudentStatisticsFeesPerClassAndSection} = useQuery(GET_GENERAL_FEES_STATISTICS_PER_CLASS_ANGLOPHONE_SECTION)
    const {data:dataGeneralClassStatisticsFrancophoneSection} = useQuery(GET_GENERAL_FEES_STATISTICS_PER_CLASS_FRANCOPHONE_SECTION)
    
    const {data:dataTotalGeneralClassStatisticsFrancophoneSection} = useQuery(GET_TOTAL_GENERAL_FEES_STATISTICS_PER_CLASS_FRANCOPHONE_SECTION);
    const {data:dataTotalGeneralClassStatisticsAnglophoneSection} = useQuery(GET_TOTAL_GENERAL_FEES_STATISTICS_PER_CLASS_ANGLOPHONE_SECTION);
    
    // const {t} = useTranslation();

    // useEffect(()=>{
    //     console.log(dataStudentStatisticsFeesPerClassAndSection);
    // })
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
                        <Box mt={'30px'} display={{md:"flex"}} alignContent={"center"}>
                            <Heading textAlign={'center'} fontSize={['xl', 'xl', 'xl']} >
                                T0:  TABLEAU DE SUIVI GENERAL  DE PAIEMENT DES FRAIS DE SCOLARITE 
                            </Heading>
                            <Box mt={'3px'} ml='20px'>
                                <Text  fontSize={['sm', 'sm', 'sm']}>
                                    Date:{(new Date).toLocaleDateString()}
                                </Text>  
                            </Box>
                        </Box>
                        
                        <Box mt={"20px"}> 
                            <TableContainer>
                                <Table size='sm'>
                                    <Thead>
                                        <Tr ml={'100px'}>
                                            <Th border={'1px'}>SECTIONS</Th>
                                            <Th border={'1px'}>CLASSES</Th>
                                            <Th border={'1px'}>EFFECTIFS ENREGISTRES (1)</Th>
                                            <Th border={'1px'}>MONTANT ATTENDU (2)</Th>
                                            <Th  border={'1px'}>MONTANT EN CAISSE (3)</Th>
                                            <Th border={'1px'}>TAUX D'ENCAISSEMENT=(4)=3/2*(100)</Th>
                                            <Th border={'1px'}>RESTE A RECOUVRER(5)=2-3</Th>
                                            <Th border={'1px'}>TAUX RAR(6) =5/2*100</Th>

                                        </Tr>
                                    </Thead>
                                    <Tbody>
                                        {dataGeneralClassStatisticsFrancophoneSection &&
                                            dataGeneralClassStatisticsFrancophoneSection.getGeneralFrancophoneSectionStatistics
                                            .map((francophoneclasse, index) => ( 
                                        <Tr key={index}>
                                            <Td border={'1px'} fontWeight={"bold"}>
                                                {francophoneclasse.sectionName}
                                            </Td>
                                            <Td border={'1px'}>{francophoneclasse.className}</Td>
                                            <Td border={'1px'}>{francophoneclasse.numberOfStudents}</Td>
                                            <Td border={'1px'} >{francophoneclasse.expectedAmount}</Td>
                                            <Td border={'1px'}>{francophoneclasse.sumAmountAlreadyPaid}</Td>
                                            <Td border={'1px'}>{francophoneclasse.rateT}%</Td>
                                            <Td border={'1px'}>{francophoneclasse.amountRest}</Td>
                                            <Td border={'1px'}>{francophoneclasse.rateZ}%</Td>
                                        </Tr>
                                        ))}
                                    </Tbody>
                                    <Tbody>
                                        {dataTotalGeneralClassStatisticsFrancophoneSection && 
                                            dataTotalGeneralClassStatisticsFrancophoneSection.TotalGeneralFrancophoneSectionStatistics
                                            .map((totalFrancophoneclasse, index) =>( 
                                        <Tr borderBottom={'1px'} key={index}>
                                            <Td border={'1px'}>Total</Td>
                                            <Td border={'1px'}></Td>
                                            <Td border={'1px'}>{totalFrancophoneclasse.TOTAL_EFFECTIFS_ENREGISTRES}</Td>
                                            <Td border={'1px'}>{totalFrancophoneclasse.TOTAL_MONTANT_ATTENDU}</Td>
                                            <Td border={'1px'}>{totalFrancophoneclasse.TOTAL_MONTANT_EN_CAISSE}</Td>
                                            <Td border={'1px'}>{totalFrancophoneclasse.TOTAL_TAUX_ENCAISSEMENT}</Td>
                                            <Td border={'1px'}>{totalFrancophoneclasse.TOTAL_RESTE_A_RECOUVRER}</Td>
                                            <Td border={'1px'}>{totalFrancophoneclasse.TAUX_RAR}</Td>
                                        </Tr>
                                            ))
                                            }
                                        </Tbody>


                                    <Tbody>
                                        {dataStudentStatisticsFeesPerClassAndSection &&
                                            dataStudentStatisticsFeesPerClassAndSection.getGeneralAnglophoneSectionStatistics
                                            .map((classe, index)=> ( 
                                        <Tr border={'1px'} key={index}>
                                            <Td rowSpan={1} borderBottom={"1px"} fontWeight={"bold"}>
                                                {classe.sectionName}
                                            </Td>
                                            <Td border={'1px'}>{classe.className}</Td>
                                            {/* <Td border={'1px'} rowSpan={4}>MB</Td> */}
                                            <Td border={'1px'}>{classe.numberOfStudents}</Td>
                                            <Td border={'1px'}>{classe.expectedAmount}</Td>
                                            <Td border={'1px'}>{classe.sumAmountAlreadyPaid}</Td>
                                            <Td border={'1px'}>{classe.rateT}%</Td>
                                            <Td border={'1px'}>{classe.amountRest}</Td>
                                            <Td border={'1px'} borderBottom={"1px"}>{classe.rateZ}%</Td>
                                        </Tr> 
                                    ))}
                                    {dataTotalGeneralClassStatisticsAnglophoneSection &&
                                      dataTotalGeneralClassStatisticsAnglophoneSection.TotalGeneralAnglophoneSectionStatistics
                                      .map((totalAnglophoneclasse, index ) => ( 
                                     <Tr key={index}>
                                        <Td border={'1px'} >ToTal</Td>
                                        <Td border={'1px'}>ToTal</Td>
                                        <Td border={'1px'}>{totalAnglophoneclasse.TOTAL_EFFECTIFS_ENREGISTRES}</Td>
                                        <Td border={'1px'}>{totalAnglophoneclasse.TOTAL_MONTANT_ATTENDU}</Td>
                                        <Td border={'1px'}>{totalAnglophoneclasse.TOTAL_MONTANT_EN_CAISSE}</Td>
                                        <Td border={'1px'}>{totalAnglophoneclasse.TOTAL_TAUX_ENCAISSEMENT}%</Td>
                                        <Td border={'1px'}>{totalAnglophoneclasse.TOTAL_RESTE_A_RECOUVRER}</Td>
                                        <Td border={'1px'}>{totalAnglophoneclasse.TAUX_RAR}%</Td>

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

export default SuiviPaiementParEleveReNormal;

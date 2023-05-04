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
import DefaultLayout from '../../components/layouts/DefaultLayout';

const SuiviPaimentFraisScolarite = () => {

    // const {t} = useTranslation();

    return (
        <DefaultLayout> 
            <Center>
                    <Box 
                        //  gap={6}
                        // mt={'10'} 
                        // display={{md:'flex'}}
                        // mb={'20px'}
                        border={'1px'}
                        mt={'80px'}
                        width={'1200px'}
                        ml={'45px'}
                        bg={"white"}
                    >
                        <Box mb={'2'} borderBottom={'1px'}>
                            <Heading textAlign={'center'}  fontSize={['2xl', '2xl', '2xl']}>
                                GROUPE SCOLAIE BILINGUE AWONO BILOGUE
                            </Heading>
                        </Box>
                        <Box display={'flex'} ml={'50px'} > 
                            <Box   mt={'30px'}>
                                <Heading textAlign={'center'} fontSize={['sm', 'sm', 'sm']} >
                                    TABLEAU DE SUIVI GENERAL  DU PAIEMENT DES FRAIS DE SCOLARITE: CLASSE: CM2/ SECTION FRANCOPHONE         
                                </Heading>
                            </Box>
                            <Box mt={'30px'} ml={'40px'}>
                                <Text textAlign={'center'} fontSize={['sm', 'sm', 'sm']}>
                                    Date:-------/-------/------
                                </Text>  
                            </Box>
                        </Box>
                        <Box borderTop={'1px'}> 
                            <TableContainer >
                                <Table size='sm'>
                                    <Thead borderBottom={"1px"}>
                                        <Tr borderBottom={"1px"}>
                                            <Th>No</Th>
                                            <Th>Nom et prenom</Th>
                                            <Th>Matricule</Th>
                                            <Th>Montant attendu</Th>
                                            <Th>montant en caisse</Th>
                                            <Th>taux d'encaissement</Th>
                                            <Th>reste a recouvrir</Th>
                                            <Th>taux rar</Th>
                                        </Tr>
                                    </Thead>
                                    <Tbody>
                                        <Tr borderBottom={"1px"}>
                                            <Td  borderBottom={"1px"}>1</Td>
                                            <Td borderBottom={"1px"}>millimetres</Td>
                                            <Td  borderBottom={"1px"}isNumeric>25.4</Td>
                                            <Td>millimetres</Td>
                                            <Td>millimetres</Td>
                                            <Td>10% </Td>
                                            <Td>100000</Td>
                                            <Td>2% </Td>
                                        </Tr>
                                        <Tr>
                                            <Td>2</Td>
                                            <Td></Td>
                                            <Td></Td>
                                            <Td></Td>
                                            <Td> </Td>
                                            <Td></Td>
                                            <Td></Td>
                                            <Td></Td>
                                        </Tr>
                                        <Tr>
                                            <Td>3</Td>
                                            <Td></Td>
                                            <Td></Td>
                                            <Td></Td>
                                            <Td></Td>
                                            <Td></Td>
                                            <Td></Td>
                                            <Td></Td>
                                        </Tr>
                                        <Tr>
                                            <Td>4</Td>
                                            <Td></Td>
                                            <Td></Td>
                                            <Td></Td>
                                            <Td></Td>
                                            <Td></Td>
                                            <Td></Td>
                                            <Td></Td>
                                        </Tr>  <Tr>
                                            <Td>5</Td>
                                            <Td></Td>
                                            <Td></Td>
                                            <Td></Td>
                                            <Td></Td>
                                            <Td></Td>
                                            <Td></Td>
                                            <Td></Td>
                                        </Tr>  <Tr>
                                            <Td>6</Td>
                                            <Td></Td>
                                            <Td></Td>
                                            <Td></Td>
                                            <Td></Td>
                                            <Td></Td>
                                            <Td></Td>
                                            <Td></Td>
                                        </Tr>  <Tr>
                                            <Td>7</Td>
                                            <Td></Td>
                                            <Td></Td>
                                            <Td></Td>
                                            <Td></Td>
                                            <Td></Td>
                                            <Td></Td>
                                            <Td></Td>
                                        </Tr>  <Tr>
                                            <Td>8</Td>
                                            <Td></Td>
                                            <Td></Td>
                                            <Td></Td>
                                            <Td></Td>
                                            <Td></Td>
                                            <Td></Td>
                                            <Td></Td>
                                        </Tr>  <Tr>
                                            <Td>9</Td>
                                            <Td></Td>
                                            <Td></Td>
                                            <Td></Td>
                                            <Td></Td>
                                            <Td></Td>
                                            <Td></Td>
                                            <Td></Td>
                                        </Tr>  <Tr>
                                            <Td>10</Td>
                                            <Td></Td>
                                            <Td></Td>
                                            <Td></Td>
                                            <Td></Td>
                                            <Td></Td>
                                            <Td></Td>
                                            <Td></Td>
                                        </Tr>
                                    </Tbody>
                                    <Tfoot>
                                        <Tr>
                                            <Th>Total</Th>
                                        </Tr>
                                    
                                    </Tfoot>
                                </Table>
                            </TableContainer>
                        </Box>
                    </Box>
            </Center>
        </DefaultLayout>
    );
}

export default SuiviPaimentFraisScolarite;

import {
    Box, 
    Flex, 
    Image, 
    Center, 
    Heading, 
    Text, 
    Divider, 
    Stack, 
    Table, 
    TableContainer, 
    Thead, 
    Tbody, 
    Tr,
    Th,
    Td, 
} from "@chakra-ui/react";
import DefaultLayout from "../../../components/layouts/DefaultLayout";
import { GiDivergence } from "react-icons/gi";
// import Router from "next/router";
import { useRouter } from "next/router";
import { 
    GET_STUDENT_BY_TRANCHE_STUDENT,
    GET_STUDENT_BY_ID,
    GET_STUDENT_SALLE,
    GET_LAST_PAYMENT,
    GET_AVANCE_MONTANT_TRANCHE_BY_STUDENT,
    GET_ALL_TRANCHE_PENSION,
    GET_RESTE_TRANCHE_BY_STUDENT,
    GET_ALL_MONTANT_TRANCHE_BY_STUDENT,
    GET_ALL_TRANCHE_DATE_LINE_BY_STUDENT,
    GET_CLASS_FEES_BY_STUDENT_ID,
    GET_PENSION_ALREADY_PAY_BY_STUDENT_ID,
  GET_RESTE_PENSION_A_PAYER_BY_STUDENT_ID

 } from "../../../graphql/Queries";
import { use, useEffect } from "react";
import { useQuery } from "@apollo/client";

const receipt = () => {

    const router = useRouter();

   const {data:dataTranchePension} = useQuery(GET_ALL_TRANCHE_PENSION);

   const {data:dataLastPayment} = useQuery(GET_LAST_PAYMENT,
        {
            variables: {studentid: router.query.id} 
        }
    );
    console.log(dataLastPayment)
    const {data:dataStudentId, loading, error} = useQuery(GET_STUDENT_BY_ID,
        {
          variables: {id: router.query.id}
        }
    );

    const {data:dataStudentByTrancheStudent} = useQuery(GET_STUDENT_BY_TRANCHE_STUDENT,
        {
            variables: {studentid: router.query.id} 
        }
    );

    const {data:dataStudentSalle} = useQuery(GET_STUDENT_SALLE,
        {
            variables: {studentid: router.query.id} 
        }
    )

    //PENSION PAR CLASSE DE CHQUE ELEVE
    const {data:dataClassFeesByStudentId} = useQuery(GET_CLASS_FEES_BY_STUDENT_ID,
        {
            variables: {studentid: router.query.id}
        }
    )

    //RESTE DE LA PENSION A PAYER POUR CHAQUE ELEVE
  const {data:dataResteFeesToPayByStudent} = useQuery(GET_RESTE_PENSION_A_PAYER_BY_STUDENT_ID,
    {
      variables: {studentid: router.query.id} 
    }
  )

    //MONTANT DES TRANCHES PAYE EN FONCTION DE CHAQUE ELEVE
    const {data:dataAvanceMontantInscriptionByStudent} = useQuery(GET_AVANCE_MONTANT_TRANCHE_BY_STUDENT,
        {
            variables:{
                studentid: router.query.id,
                trancheid: dataTranchePension?.findAlltranche[0].id
            }   
     
        } 
    )

    const {data:dataAvanceMontantTranche1ByStudent} = useQuery(GET_AVANCE_MONTANT_TRANCHE_BY_STUDENT,
        {
            variables:{
                studentid: router.query.id,
                trancheid: dataTranchePension?.findAlltranche[1].id
            }   
     
        } 
    )

    const {data:dataAvanceMontantTranche2ByStudent} = useQuery(GET_AVANCE_MONTANT_TRANCHE_BY_STUDENT,
        {
            variables:{
                studentid: router.query.id,
                trancheid: dataTranchePension?.findAlltranche[2].id
            }   
     
        } 
    )

    // const {data:dataAvanceTranche2ByStudent} = useQuery(GET_AVANCE_MONTANT_TRANCHE_BY_STUDENT,
    //     {
    //         variables:{
    //             studentid: router.query.id,
    //             trancheid: dataTranchePension?.findAlltranche[1].id
    //         }   
     
    //     } 
    // )
    
    //RESTE DES PAIEMENT POUR CHAQUE TRANCHE
    const {data:dataResteTrancheInscriptionByStudent} = useQuery(GET_RESTE_TRANCHE_BY_STUDENT,
        {
            variables:{
                studentid: router.query.id,
                trancheid: dataTranchePension?.findAlltranche[0].id
            }   
     
        } 
    
    )
        //pour la tranche1
    const {data:dataResteTrancheForTranche1ByStudent} = useQuery(GET_RESTE_TRANCHE_BY_STUDENT,
        {
            variables:{
                studentid: router.query.id,
                trancheid: dataTranchePension?.findAlltranche[1].id
            }   
     
        } 
    
    )

    

    const {data:dataResteTrancheForTranche2ByStudent} = useQuery(GET_RESTE_TRANCHE_BY_STUDENT,
        {
            variables:{
                studentid: router.query.id,
                trancheid: dataTranchePension?.findAlltranche[2].id
            }   
     
        } 
    
    )

    const {data:dataMontantTrancheByStudent } = useQuery(GET_ALL_MONTANT_TRANCHE_BY_STUDENT,
        {
            variables:{
                studentid: router.query.id,
            }   
        } 
    )

    const {data:dataDateLineTrancheStudent } = useQuery(GET_ALL_TRANCHE_DATE_LINE_BY_STUDENT,
        {
            variables:{
                studentid: router.query.id,
        }   }   
    )

     //PENSION TOTALE DEJA PAYE PAR ELEVE 
    const {data:dataAlreadyPayBySudent} = useQuery(GET_PENSION_ALREADY_PAY_BY_STUDENT_ID,
        {
        variables: {studentid: router.query.id} 
        }
    )
    // const {data:dataStudentByTrancheStudent} = useQuery(GET_STUDENT_BY_TRANCHE_STUDENT,
    //     {
    //         variables: {studentid: router.query.id} 
    //     }
    // )

    useEffect(() =>{
        console.log(dataStudentByTrancheStudent?.getTrancheStudentByStudent)
        console.log(dataStudentSalle?.dataStudentSalle)
        console.log(dataAvanceMontantInscriptionByStudent?.SumAvanceTrancheByStudent)

    })

    if (loading) return <Text>Chargement en cour...</Text>
    if (error) return <Text>Une erreur s'est produite!</Text>
    
    return ( 
        <DefaultLayout>
            <Center 
                pt='70px' 
                ml='60px' 
                pb="10px"
            >
            {dataStudentId && (    
                <Box 
                    borderWidth='1px' 
                    borderRadius='25px' 
                    borderColor='black'  w='1000px'  
                >
                    <Center 
                        borderBottomWidth='3px' 
                        h="120px" 
                        borderBottomColor='black' 
                        borderBottomStyle='solid'
                    >
                        <Flex >
                            <Box ml='30px'>
                                <Image 
                                    src='/logo.png' 
                                    w={['240px', '230px', '100px']}
                                />
                            </Box>
                            <Box p='2em'>
                                <Heading fontSize='2xl'>GROUPE SCOLAIRE BILINGUE AWONO BILOGUE</Heading>
                                <Flex gap="5" p='1em' mx='30px'>
                                    <Text fontWeigth='bold'>BP: 122</Text>
                                    <Text fontWeigth='bold'>Obala-Cameroun</Text>
                                    <Text fontWeigth='bold'>TEL: 678732927/698258781</Text>
                                </Flex>
                            </Box>
                        </Flex> 
                    </Center >
                    
                    <Flex  direction='column' >
                        <Center>
                            <Box 
                                width='250px'
                                h='60px' 
                                borderWidth='2px' 
                                borderColor='black' 
                                mt='3' 
                                textAlign='center'
                            >
                                <Heading 
                                    my='3' 
                                    fontSize='2xl' 
                                    fontWeight='bold'
                                >
                                    RECU DE PAIEMENT
                                    {/* {dataAvanceMontantInscriptionByStudent?.SumAvanceTrancheByStudent} */}
                                </Heading>
                            </Box>
                        </Center>
                        <Flex>
                            <Box 
                                ml='3' 
                                m='3' 
                                borderWidth='1px' 
                                borderColor='black' 
                                bg='gray.50' 
                                gap='8' 
                                w='600px' 
                                mt='15px'
                            >
                            <Box my='20px'>
                                <Flex 
                                    mt='3' 
                                    ml='3' 
                                    gap={2} 
                                    mb='1'
                                >
                                    <Text>Nom / Name:</Text>
                                    <Box display={"flex"}gap={3}>
                                        <Text> {dataStudentId.findOnestudent.firstname.toUpperCase()}</Text>
                                        <Text>{dataStudentId.findOnestudent.lastname}  </Text>
                                    </Box>
                                </Flex>
                                <Flex ml='3' gap={3} mb='1'>
                                    <Text>Section:</Text>
                                    <Text></Text>
                                </Flex>
                                <Flex ml='3' gap='1' mb='1'>
                                    <Text>Regime:</Text>
                                    <Text></Text>
                                </Flex>
                                <Flex ml='3' gap='1' mb='1'>
                                    <Text>Classe / Class:</Text>
                                    <Text>{dataStudentSalle?.findSalleByStudent.name}</Text>
                                </Flex>
                                <Flex ml='3' gap='1' mb='1'>
                                    <Text>Matricule / Registration:</Text>
                                    <Text>{dataStudentId.findOnestudent.matricule}</Text>
                                </Flex>
                                <Flex mb='1' justify='space-between' >
                                    <Flex ml='3' gap='1' >
                                        <Text>Annee Academique / Academic year:</Text>
                                        <Text></Text>
                                    </Flex>
                                    {/* <Flex ml='3' gap='1' mr='140px'>
                                        <Text>à/at:</Text>
                                        <Text></Text>
                                    </Flex> */}
                                </Flex>
                                <Flex 
                                    ml='3' 
                                    gap='3' 
                                    mb='1' 
                                    justify='space-between'
                                >
                                    <Flex gap='1'>
                                        <Box 
                                            display={"flex"}
                                            gap={2}
                                        > 
                                            <Text>Remettant / Renderer:</Text>
                                            <Text> {dataStudentId.findOnestudent.fatherFirstName}</Text>
                                        </Box>
                                    </Flex>
                                    <Flex gap='1' mr='130px'>
                                        <Box 
                                            display={"flex"}
                                            gap={"2"}
                                        > 
                                            <Text>Tel:</Text>
                                            <Text>{dataStudentId.findOnestudent.fatherPhoneNumber}</Text>
                                        </Box>
                                    </Flex>

                                </Flex>
                            </Box>
                            
                            </Box>

                            <Flex 
                                direction='column' 
                                gap={7} 
                                mx='4' 
                                mt='-3'
                            >
                                <Flex 
                                    gap='1' 
                                    mt='4' 
                                    ml='60px'
                                >
                                    <Text fontWeight='bold'>No Recu</Text>
                                    <Text>____________</Text>
                                </Flex>
                                <Flex 
                                    direction='column' 
                                    border='1px' 
                                    w='300px'
                                >
                                    <Box textAlign='center' >
                                        <Text fontWeight='bold'>
                                            Versement / Amount
                                        </Text>
                                    </Box>
                                    <Divider />
                                    <Box 
                                        h='80px' 
                                        bg='blue.50' 
                                        textAlign='center'
                                    >
                                        <Center>
                                            <Flex p='1em' gap='3'>
                                                <Text 
                                                    align='center' 
                                                    fontSize='xl' 
                                                    fontWeight='bold'
                                                >
                                                    {dataLastPayment?.AmountRecentAvanceTrancheByStudent}
                                                    {/* {dataStudentByTrancheStudent?.getStudentByTrancheStudent.montant} */}
                                                </Text>
                                                <Text 
                                                    fontWeight='bold' 
                                                    fontSize='xl' 
                                                >
                                                    Fcfa
                                                </Text>
                                            </Flex>
                                        </Center>
                                        {/* <Text 
                                        mt='-15px' 
                                        fontSize="sm">
                                            (Cinq cent mille)
                                        </Text> */}
                                    </Box>
                                </Flex>
                                <Flex 
                                    direction='column' 
                                    w='360px'
                                >
                                    <Text 
                                        fontSize='12px' 
                                        fontWeight='bold' 
                                        ml='10px'
                                    >
                                        SITUATION FINANCIERE / FINANCIAL SITUATION
                                    </Text>
                                    <Box >
                                    <TableContainer>
                                                <Table 
                                                    variant='simple' 
                                                    size='20px'
                                                    borderCollapse='collapse'
                                                >
                                            <Thead>
                                                <Tr 
                                                    gap='1' 
                                                    bg="blackAlpha.300"
                                                >
                                                    <Th border='1px'>
                                                        <Box fontSize='8px' textAlign='center'>
                                                            <Text>Net Attendu</Text>
                                                            <Text>Net Excepted</Text>
                                                        </Box>
                                                    </Th>
                                                        <Th border='1px'>
                                                        <Box 
                                                            fontSize='8px' 
                                                            textAlign='center'
                                                        >
                                                            <Text>Net Versé</Text>
                                                            <Text>Net Paid</Text>
                                                        </Box>
                                                    </Th>
                                                    {/* <Th border='1px'>
                                                        <Box fontSize='8px' textAlign='center'>
                                                            <Text>Net Reduit</Text>
                                                            <Text>Net Discount</Text>
                                                        </Box>
                                                    </Th> */}
                                                    <Th border='1px'>
                                                        <Box fontSize='8px' textAlign='center'>
                                                            <Text>Reste à Payer</Text>
                                                            <Text>Left to Paid</Text>
                                                        </Box>
                                                    </Th>
                                                </Tr>
                                            </Thead>
                                            <Tbody>
                                                <Tr gap='1'>
                                                    <Th border='1px'>
                                                        <Box h='13px' fontSize='8px'>
                                                            <Text textAlign={"center"}>{dataClassFeesByStudentId?.getClassfeebyStudent}</Text>
                                                        </Box>
                                                    </Th>
                                                    <Th border='1px'>
                                                        <Box fontSize='8px'>
                                                            <Text textAlign={"center"}> 
                                                                {/* {dataStudentByTrancheStudent?.getTrancheStudentByStudent.montant} */}
                                                                {dataAlreadyPayBySudent?.findpensionbystudent.montantPension}
                                                            </Text>
                                                        </Box>
                                                    </Th>
                                                    {/* <Th border='1px'>
                                                        <Box fontSize='8px'>
                                                            <Text textAlign={"center"} >

                                                            </Text>
                                                        </Box>
                                                    </Th> */}
                                                    <Th border='1px'>
                                                        <Box fontSize='8px'>
                                                        <Text textAlign={"center"}>
                                                            {dataResteFeesToPayByStudent?.findrestpensionbystudent} FCFA
                                                        </Text>
                                                        </Box>
                                                    </Th>
                                                </Tr>

                                            </Tbody>
                                        </Table>
                                    </TableContainer>
                                </Box>
                                </Flex>
                            </Flex>
                        </Flex>

                                <Flex 
                                    justify='space-between' 
                                    ml='3' 
                                    mb='2'
                                >
                                    <Flex 
                                        direction='column' 
                                        textAlign='center'
                                    >
                                        <Text 
                                            fontSize='15px' 
                                            fontWeight='bold'
                                        >
                                            DETAILS / DETAILS
                                        </Text>
                                        <Box w='500px' mb='2'>
                                        <TableContainer>
                                            <Table 
                                                variant='simple' 
                                                size='40px' 
                                            >
                                            <Thead>
                                                        <Tr gap='1' bg="blackAlpha.300">
                                                        
                                                        <Th border='1px'>
                                                            <Box 
                                                                fontSize='10px'
                                                                textAlign='center'
                                                             >
                                                                <Text>Eléments</Text>
                                                                <Text>Elements</Text>
                                                            </Box>
                                                        </Th>
                                                        <Th border='1px'>
                                                            <Box 
                                                                fontSize='10px'
                                                                textAlign='center'
                                                            >
                                                                <Text>Attendu</Text>
                                                                <Text>Expected</Text>
                                                            </Box>
                                                        </Th>
                                                        <Th border='1px'>
                                                            <Box 
                                                                fontSize='10px' 
                                                                textAlign='center'
                                                            >
                                                                <Text>Percu</Text>
                                                                <Text>Received</Text>
                                                            </Box>
                                                        </Th>
                                                        <Th border='1px' >
                                                            <Box fontSize='10px' textAlign='center'>
                                                                <Text>Reste</Text>
                                                                <Text>Remainder</Text>
                                                            </Box>
                                                        </Th>
                                                        <Th border='1px'>
                                                                <Box fontSize='10px' textAlign='center'>
                                                                    <Text>Délai</Text>
                                                                    <Text>Deadline</Text>
                                                            </Box>
                                                        </Th>
                                                    </Tr>
                                            </Thead>
                                                <Tbody>
                                                
                                                    {/* <Tr gap='1'>
                                                            <Th border='1px' bg='#rgba(0,0,0,0.36)'><Box fontSize='8px' fontWeight='bold' textAlign='center'>
                                                            <Text>I</Text>

                                                        </Box>
                                                        </Th>
                                                        <Th border='1px'><Box fontSize='8px'>
                                                            <Text></Text>
                                                        </Box>
                                                        </Th>
                                                        <Th border='1px'><Box fontSize='8px'>
                                                            <Text></Text>
                                                        </Box>
                                                        </Th>
                                                        <Th border='1px'><Box fontSize='8px'>
                                                            <Text></Text>
                                                        </Box>
                                                        </Th>
                                                        <Th border='1px'><Box fontSize='8px'>
                                                            <Text></Text>
                                                        </Box>
                                                        </Th>
                                                    </Tr> */}
                                                    <Tr gap='1' >
                                                        <Th 
                                                            border='1px'
                                                        >
                                                            <Box 
                                                                textAlign='center' 
                                                                fontWeight='bold' 
                                                                fontSize='10px'
                                                            >
                                                                <Text>Inscription</Text>
                                                            </Box>
                                                        </Th>
                                                        <Th border='1px'>
                                                            <Box fontSize='8px'>
                                                                <Text textAlign={"center"}>
                                                                    {dataMontantTrancheByStudent?.AmountrExpectedByTranche[0]}
                                                                </Text>
                                                            </Box>
                                                        </Th>
                                                        <Th border='1px'>
                                                            <Box fontSize='8px'>
                                                                <Text textAlign={"center"}>
                                                                    {dataAvanceMontantInscriptionByStudent?.SumAvanceTrancheByStudent}
                                                                </Text>
                                                            </Box>
                                                        </Th>
                                                        <Th border='1px'>
                                                            <Box fontSize='8px'>
                                                                <Text textAlign={"center"}>
                                                                    {dataResteTrancheInscriptionByStudent?.RestTrancheByStudent}
                                                                </Text>
                                                            </Box>
                                                        </Th>
                                                        <Th border='1px'>
                                                            <Box fontSize='8px'>
                                                                <Text textAlign={"center"}>
                                                                    rrr
                                                                </Text>
                                                            </Box>
                                                        </Th>
                                                    </Tr>
                                                    <Tr gap='1'>
                                                            <Th 
                                                             border='1px'
                                                            >
                                                                <Box 
                                                                    textAlign='center' 
                                                                    fontSize='10px' 
                                                                    fontWeight='bold'
                                                                >
                                                                     <Text>Tranche 1</Text>
                                                                </Box>
                                                            </Th>
                                                        <Th border='1px'>
                                                            <Box fontSize='8px'>
                                                                <Text textAlign={"center"}>
                                                                    {dataMontantTrancheByStudent?.AmountrExpectedByTranche[1]}
                                                                </Text>
                                                            </Box>
                                                        </Th>
                                                        <Th border='1px'>
                                                            <Box fontSize='8px'>
                                                            <Text textAlign={"center"}>
                                                                {dataAvanceMontantTranche1ByStudent?.SumAvanceTrancheByStudent}
                                                            </Text>
                                                            </Box>
                                                        </Th>
                                                        <Th border='1px'>
                                                            <Box fontSize='8px'>
                                                                <Text textAlign={"center"}>
                                                                    {dataResteTrancheForTranche1ByStudent?.SumAvanceTrancheByStudent}
                                                                </Text>
                                                            </Box>
                                                        </Th>
                                                        <Th border='1px'>
                                                            <Box fontSize='8px'>
                                                                <Text textAlign={"center"}>

                                                                </Text>
                                                            </Box>
                                                        </Th>
                                                    </Tr>
                                                    <Tr gap='1'>
                                                            <Th border='1px'>
                                                                <Box 
                                                                    textAlign='center' 
                                                                    fontSize='10px' 
                                                                    fontWeight='bold'
                                                                >
                                                                    <Text textAlign={"center"}>Tranche 2</Text>
                                                                </Box>
                                                        </Th>
                                                        <Th border='1px'>
                                                            <Box fontSize='8px'>
                                                                <Text textAlign={"center"}>
                                                                    {dataMontantTrancheByStudent?.AmountrExpectedByTranche[2]}
                                                                </Text>
                                                            </Box>
                                                        </Th>
                                                        <Th border='1px'>
                                                            <Box fontSize='8px'>
                                                                <Text textAlign={"center"}>
                                                                    {dataAvanceMontantTranche2ByStudent?.SumAvanceTrancheByStudent}
                                                                </Text>
                                                            </Box>
                                                        </Th>
                                                        <Th border='1px'>
                                                            <Box fontSize='8px'>
                                                                <Text textAlign={"center"}>
                                                                    {dataResteTrancheForTranche2ByStudent?.SumAvanceTrancheByStudent}
                                                                </Text>
                                                            </Box>
                                                        </Th>
                                                        <Th border='1px'>
                                                            <Box fontSize='8px'>
                                                                <Text textAlign={"center"}>

                                                                </Text>
                                                            </Box>
                                                        </Th>
                                                    </Tr>

                                                </Tbody>
                                            </Table>
                                        </TableContainer>
                                        <Box 
                                        textAlign='center'
                                        >
                                        <Center>
                                            <Flex p='1em' gap='3'>
                                                <Text 
                                                    fontSize='xl' 
                                                    fontWeight='bold' 
                                                    ml={"-10px"}
                                                > 
                                                    Montant Total Versé:
                                                </Text>
                                                <Text 
                                                    align='center' 
                                                    fontSize='xl' 
                                                >
                                                    {/* {dataStudentByTrancheStudent?.getStudentByTrancheStudent.montant} */}
                                                    {/* {dataStudentByTrancheStudent?.getTrancheStudentByStudent.montant} */}
                                                    {dataAlreadyPayBySudent?.findpensionbystudent.montantPension}
                                                </Text>
                                                <Text 
                                                    fontWeight='bold'
                                                    fontSize='xl' 
                                                >
                                                    Fcfa
                                                </Text>
                                            </Flex>
                                        </Center>
                                    </Box>
                                    </Box>
                                        <Box fontSize='11px' mt={"-5px"}>
                                            <Text>Les frais de scolarite ne sont ni remboursables, ni cessibles, ni transferables</Text>
                                            <Text>Tuition fees are neither refundable no transferable</Text>
                                        </Box>
                                    </Flex>
                            <Box 
                                fontWeight='bold' 
                                mt='20px'
                                mr='35px'
                             >
                                <Text as='u'>
                                    SIGNATURE ET CACHET / VISA AND STAMP
                                </Text>
                            </Box>
                        </Flex>
                    </Flex>
                </Box>
            )}
            </Center>
        </DefaultLayout>
    );
}
 
export default receipt;
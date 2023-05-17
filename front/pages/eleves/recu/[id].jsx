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
    Icon,
    Button
} from "@chakra-ui/react";
import DefaultLayout from "../../../components/layouts/DefaultLayout";
import { GiDivergence } from "react-icons/gi";
// import { getStaticPropsTranslations } from "../../../types/staticProps";
// import Router from "next/router";
import { useRouter } from "next/router";
import ReactToPrint from 'react-to-print';
import ReactToPdf from "react-to-pdf";
import ReactPaginate from "react-paginate";
import {TfiFilter, TfiPrinter} from "react-icons/tfi"


import { 
    // GET_STUDENT_BY_TRANCHE_STUDENT,
    GET_STUDENT_BY_ID,
    GET_STUDENT_SALLE,
    GET_LAST_PAYMENT,
    GET_AVANCE_MONTANT_TRANCHE_BY_STUDENT,
    // GGET_RESTE_TRANCHE_BY_STUDENT,
    GET_DATELINE_TRANCHE_BY_STUDENT,
    GET_ALL_MONTANT_TRANCHE_BY_STUDENT,
    GET_ALL_TRANCHE_DATE_LINE_BY_STUDENT,
    GET_CLASS_FEES_BY_STUDENT_ID,
    GET_ALL_TRANCHE_PENSION,
    GET_PENSION_ALREADY_PAY_BY_STUDENT_ID,
    GET_RESTE_PENSION_A_PAYER_BY_STUDENT_ID,
    GET_SECTION_STUDENT_BY_ID,
    GET_RESTE_MONTANT_TRANCHE_BY_STUDENT_ID,
    GET_ALL_TRANCHE_BY_STUDENT_ID,
    GET_PERSONNEL_BY_USERID

 } from "../../../graphql/Queries";
import React, {useEffect,useRef } from "react";
import { useQuery } from "@apollo/client";
import { useAccount } from "../../../contexts/account/Account";

const receipt = () => {

    const router = useRouter();
    const { account, loaded } = useAccount();
    
   const {data:dataTranchePension} = useQuery(GET_ALL_TRANCHE_PENSION);

   //Compte personnel de la'pplication
   const { data: personnelData, called} = useQuery(GET_PERSONNEL_BY_USERID,
        {
        variables:{ userid: account?.id }
        }
    )
   //Dernier paiement qu'a fait un eleve
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

    // const {data:dataStudentByTrancheStudent} = useQuery(GET_STUDENT_BY_TRANCHE_STUDENT,
    //     {
    //         variables: {studentid: router.query.id} 
    //     }
    // );

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

  //RESTE DU MONTANT DES TRANCHES PAR ELEVE
    const {data:dataResteTrancheByStudentId} = useQuery(GET_RESTE_MONTANT_TRANCHE_BY_STUDENT_ID,
        {
            variables: {studentid: router.query.id} 
        }
    );

    //dateline trache
    const {data:dataTrancheByStudentId} = useQuery(GET_ALL_TRANCHE_BY_STUDENT_ID,
        {
              variables: {studentid: router.query.id} 
        }
      );
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

    //RECUPERATION DES DATELINE PAR TRANCHE POUR CHQUE ELEVE
     const {data:dataDateLineTrancheStudentInscription } = useQuery(GET_DATELINE_TRANCHE_BY_STUDENT,
        {
            variables:{
                studentid: router.query.id,
                trancheid: dataTranchePension?.findAlltranche[0].id
        }   }   
    )


    const {data:dataDateLineTrancheStudentTranche1 } = useQuery(GET_DATELINE_TRANCHE_BY_STUDENT,
        {
            variables:{
                studentid: router.query.id,
                trancheid: dataTranchePension?.findAlltranche[1].id
        }   }   
    )

    const {data:dataDateLineTrancheStudentTranche2 } = useQuery(GET_DATELINE_TRANCHE_BY_STUDENT,
        {
            variables:{
                studentid: router.query.id,
                trancheid: dataTranchePension?.findAlltranche[2].id
        }   }   
    )

    //RECUPERATION DE LA SECTION DE L'ELEVE
    const {data:dataSectionStudentById} = useQuery(GET_SECTION_STUDENT_BY_ID,
        {
            variables:{
                studentid: router.query.id,
            }   
     
        } 
    );

    // const {data:dataAvanceTranche2ByStudent} = useQuery(GET_AVANCE_MONTANT_TRANCHE_BY_STUDENT,
    //     {
    //         variables:{
    //             studentid: router.query.id,
    //             trancheid: dataTranchePension?.findAlltranche[1].id
    //         }   
     
    //     } 
    // )
    
    //RESTE DES PAIEMENT POUR CHAQUE TRANCHE
    // const {data:dataResteTrancheInscriptionByStudent} = useQuery(GET_RESTE_TRANCHE_BY_STUDENT,
    //     {
    //         variables:{
    //             studentid: router.query.id,
    //             trancheid: dataTranchePension?.findAlltranche[0].id
    //         }   
     
    //     } 
    
    // )
        //pour la tranche1
    // const {data:dataResteTrancheForTranche1ByStudent} = useQuery(GET_RESTE_TRANCHE_BY_STUDENT,
    //     {
    //         variables:{
    //             studentid: router.query.id,
    //             trancheid: dataTranchePension?.findAlltranche[1].id
    //         }   
     
    //     } 
    
    // )

    

    // const {data:dataResteTrancheForTranche2ByStudent} = useQuery(GET_RESTE_TRANCHE_BY_STUDENT,
    //     {
    //         variables:{
    //             studentid: router.query.id,
    //             trancheid: dataTranchePension?.findAlltranche[2].id
    //         }   
     
    //     } 
    
    // )

    const {data:dataMontantTrancheByStudent } = useQuery(GET_ALL_MONTANT_TRANCHE_BY_STUDENT,
        {
            variables:{
                studentid: router.query.id,
            }   
        } 
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
    const date1 = new Date('December 17, 1995 03:24:00')
    
    const componentRef = useRef();
    const ref = React.createRef();
    const options = {
        orientation: 'landscape',
        // unit: 'mm',
        // format: 'a4',
    };

    useEffect(() =>{
        // console.log(dataStudentByTrancheStudent?.getTrancheStudentByStudent)
        console.log(dataStudentSalle?.dataStudentSalle)
        console.log(dataAvanceMontantInscriptionByStudent?.SumAvanceTrancheByStudent)
        console.log(dataMontantTrancheByStudent)

    })

    if (loading) return <Text>Chargement en cour...</Text>
    if (error) return <Text>Une erreur s'est produite!</Text>
    

    const lastStudentPaiement = dataLastPayment?.AmountRecentAvanceTrancheByStudent

function nombreEnLettres(montant) {
    const chiffres = [
      '', 'un', 'deux', 'trois', 'quatre', 'cinq', 'six', 'sept', 'huit', 'neuf', 'dix',
      'onze', 'douze', 'treize', 'quatorze', 'quinze', 'seize', 'dix-sept', 'dix-huit', 'dix-neuf'
    ];
  
    const dizaines = [
      '', '', 'vingt', 'trente', 'quarante', 'cinquante', 'soixante', 'soixante-dix',
      'quatre-vingt', 'quatre-vingt-dix'
    ];
  
    const unite = montant % 10;
    const dizaine = Math.floor(montant / 10) % 10;
    const centaine = Math.floor(montant / 100) % 10;
    const millier = Math.floor(montant / 1000);
  
    let resultat = '';
  
    if (millier > 0) {
      resultat += nombreEnLettres(millier) + ' mille ';
      const reste = montant % 1000;
      if (reste > 0) {
        resultat += nombreEnLettres(reste) + ' ';
      }
    }
  
    if (centaine > 0) {
      if (centaine === 1) {
        resultat += 'cent ';
      } else {
        resultat += chiffres[centaine] + ' cent ';
      }
    }
}
    const lettreLastStudentPaiement =nombreEnLettres(lastStudentPaiement)
    console.log(lettreLastStudentPaiement)

    return ( 
        <DefaultLayout>
            
            <Center 
                pt='70px' 
                ml='60px' 
                pb="10px"
            >
                <Flex 
                    mt="-630px"
                    ml={"-300px"}
                > 
                    <ReactToPrint
                        trigger={() => <Icon as={TfiPrinter} boxSize="50px" alignItems={"center"} p="3" />}
                        content={() => componentRef.current}
                        documentTitle= "Recu de paiement"
                        pageStyle="print"
                    />
                    <ReactToPdf 
                        targetRef={componentRef} 
                        filename="Recu de paiement" 
                        options={options} y={10}
                    >
                        {({toPdf}) => ( 
                        <Button bg={"blackAlpha.100"} 
                            onClick={toPdf} border="1px" width={"50px"} 
                            fontSize={"sm"}
                        >
                            PDF
                        </Button>)}
                    </ReactToPdf>
                </Flex>
                
            <Box 
                 ref={componentRef}
            >
                {dataStudentId && (  
                    
                    <Box 
                        borderWidth='1px' 
                        borderRadius='25px' 
                        borderColor='black'  w='1020px' 
                        ml={"50px"}
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
                            <Flex gap="10px">
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
                                            <Text>{dataSectionStudentById?.findSectionByStudent[0].name}</Text>
                                        </Flex>
                                        <Flex ml='3' gap='1' mb='1'>
                                            <Text>Regime:</Text>
                                            <Text>{dataStudentId.findOnestudent.categoryName} </Text>
                                        </Flex>
                                        <Flex ml='3' gap='1' mb='1'>
                                            <Text>Niveau:</Text>
                                            <Text>
                                                {dataStudentSalle?.findSalleByStudent.levelName}
                                            </Text>
                                        </Flex>
                                        <Flex ml='3' gap='1' mb='1'>
                                            <Text>Classe / Class:</Text>
                                            <Text>
                                                {/* {dataStudentSalle?.findSalleByStudent.name} */}
                                                {dataStudentId.findOnestudent.salleName}
                                            </Text>
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
                                                    {
                                                        (personnelData?.getpersonnelbyaccount.fonction==="econome") &&
                                                        <Text>{personnelData?.getpersonnelbyaccount.firstName +' '+ personnelData?.getpersonnelbyaccount.lastName}</Text>
                                                    }
                                                </Box>
                                            </Flex>
                                            <Flex gap='1' mr='130px'>
                                                <Box 
                                                    display={"flex"}
                                                    gap={"2"}
                                                > 
                                                    <Text>Tel:</Text>
                                                    {
                                                        (personnelData?.getpersonnelbyaccount.fonction==="econome") &&
                                                        <Text> {personnelData?.getpersonnelbyaccount.phoneNumber}</Text>
                                                    }
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
                                        w='250px'
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
                                                        {lastStudentPaiement}
                                                        {/* {dataLastPayment?.AmountRecentAvanceTrancheByStudent} */}
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
                                            <Text 
                                            mt='-15px' 
                                            fontSize="sm">
                                                {lettreLastStudentPaiement}jjjjj
                                            </Text>
                                        </Box>
                                    </Flex>
                                    <Flex 
                                        direction='column' 
                                        w='300px'
                                    >
                                        <Text 
                                            fontSize='14px' 
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
                                                            <Box 
                                                                fontSize='10px' 
                                                                textAlign='center'
                                                                p="5px"
                                                            >
                                                                <Text>Net Attendu</Text>
                                                                <Text>Net Excepted</Text>
                                                            </Box>
                                                        </Th>
                                                            <Th border='1px'>
                                                            <Box 
                                                                fontSize='10px' 
                                                                textAlign='center'
                                                                p="5px"
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
                                                            <Box 
                                                                fontSize='10px' 
                                                                textAlign='center'
                                                                p="5px"
                                                            >
                                                                <Text>Reste à Payer</Text>
                                                                <Text>Left to Paid</Text>
                                                            </Box>
                                                        </Th>
                                                    </Tr>
                                                </Thead>
                                                <Tbody>
                                                    <Tr gap='1'>
                                                        <Th border='1px'>
                                                            <Box h='13px' fontSize='10px'>
                                                                <Text textAlign={"center"}>{dataClassFeesByStudentId?.getClassfeebyStudent}</Text>
                                                            </Box>
                                                        </Th>
                                                        <Th border='1px'>
                                                            <Box fontSize='10px'>
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
                                                            <Box fontSize='10px'>
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
                                            <Box w='550px' mb='2'>
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
                                                                    p="5px"
                                                                >
                                                                    <Text>Percu</Text>
                                                                    <Text>Received</Text>
                                                                </Box>
                                                            </Th>
                                                            <Th border='1px' >
                                                                <Box 
                                                                    fontSize='10px' 
                                                                    textAlign='center'
                                                                    p="5px"
                                                                >
                                                                    <Text>Reste</Text>
                                                                    <Text>Remainder</Text>
                                                                </Box>
                                                            </Th>
                                                            <Th border='1px'>
                                                                    <Box 
                                                                        fontSize='10px'
                                                                        textAlign='center'
                                                                        p="5px"
                                                                     >
                                                                        <Text>Délai</Text>
                                                                        <Text>Deadline</Text>
                                                                </Box>
                                                            </Th>

                                                            <Th border='1px'>
                                                                    <Box 
                                                                        fontSize='10px' 
                                                                        textAlign='center'
                                                                        p="5px"
                                                                    >
                                                                        <Text>Date </Text>
                                                                        <Text>Date</Text>
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
                                                                    display={"flex"}
                                                                    flexDirection={"column"}
                                                                    p="5px"
                                                                >
                                                                    <Text>Inscription</Text>
                                                                    <Text>Reg. Fees</Text>

                                                                </Box>
                                                            </Th>
                                                            <Th border='1px'>
                                                                <Box fontSize='10px'>
                                                                    <Text textAlign={"center"}>
                                                                        {dataMontantTrancheByStudent?.AmountrExpectedByTranche[0]}
                                                                    </Text>
                                                                </Box>
                                                            </Th>
                                                            <Th border='1px'>
                                                                <Box fontSize='10px'>
                                                                    <Text textAlign={"center"}>
                                                                        {dataAvanceMontantInscriptionByStudent?.SumAvanceTrancheByStudent ? dataAvanceMontantInscriptionByStudent?.SumAvanceTrancheByStudent : "0"}
                                                                    </Text>
                                                                </Box>
                                                            </Th>
                                                            <Th border='1px'>
                                                                <Box fontSize='10px'>
                                                                    <Text textAlign={"center"}>
                                                                        {dataResteTrancheByStudentId?.findByStudentRestTranche[0].Rest}
                                                                    </Text>
                                                                </Box>
                                                            </Th>
                                                            <Th border='1px'>
                                                                <Box fontSize='10px'>
                                                                    <Text textAlign={"center"}>
                                                                       {/* {(new Date(dataDateLineTrancheStudentInscription?.getTrancheDateLineByStudent)).toLocaleDateString()}
                                                                        */}
                                                                        {(new Date(dataTrancheByStudentId?.getClassfeeofStudent[0].dateLine)).toLocaleDateString()}
                                                                    </Text>
                                                                </Box>
                                                            </Th>
                                                            <Th border='1px'>
                                                                <Box fontSize='10px'>
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
                                                                        display={"flex"}
                                                                        flexDirection={"column"}
                                                                        p="5px"
                                                                    >
                                                                        <Text>Tranche 1</Text>
                                                                        <Text>First Part</Text>
                                                                    </Box>
                                                                </Th>
                                                            <Th border='1px'>
                                                                <Box fontSize='10px'>
                                                                    <Text textAlign={"center"}>
                                                                        {dataMontantTrancheByStudent?.AmountrExpectedByTranche[1]}
                                                                    </Text>
                                                                </Box>
                                                            </Th>
                                                            <Th border='1px'>
                                                                <Box fontSize='10px'>
                                                                <Text textAlign={"center"}>
                                                                    {dataAvanceMontantTranche1ByStudent?.SumAvanceTrancheByStudent}
                                                                </Text>
                                                                </Box>
                                                            </Th>
                                                            <Th border='1px'>
                                                                <Box fontSize='10px'>
                                                                    <Text textAlign={"center"}>
                                                                         {dataResteTrancheByStudentId?.findByStudentRestTranche[1].Rest}
                                                                    </Text>
                                                                </Box>
                                                            </Th>
                                                            <Th border='1px'>
                                                                <Box fontSize='10px'>
                                                                    <Text textAlign={"center"}>
                                                                {/* {((new Date(expense.createdOn)).toLocaleDateString('fr-FR', { day: 'numeric', month: 'numeric', year: 'numeric' }))}  */}
                                                                    {(new Date(dataTrancheByStudentId?.getClassfeeofStudent[1].dateLine)).toLocaleDateString()}
                                                                    {/* {(new Date(dataDateLineTrancheStudentTranche1?.getTrancheDateLineByStudent)).toLocaleDateString()} */}
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
                                                                        display={"flex"}
                                                                        flexDirection={"column"}
                                                                        p="5px"
                                                                    >
                                                                        <Text textAlign={"center"}>Tranche 2</Text>
                                                                        <Text textAlign={"center"}>Second part</Text>

                                                                    </Box>
                                                            </Th>
                                                            <Th border='1px'>
                                                                <Box fontSize='10px'>
                                                                    <Text textAlign={"center"}>
                                                                        {dataMontantTrancheByStudent?.AmountrExpectedByTranche[2]}
                                                                    </Text>
                                                                </Box>
                                                            </Th>
                                                            <Th border='1px'>
                                                                <Box fontSize='10px'>
                                                                    <Text textAlign={"center"}>
                                                                        {dataAvanceMontantTranche2ByStudent?.SumAvanceTrancheByStudent}
                                                                    </Text>
                                                                </Box>
                                                            </Th>
                                                            <Th border='1px'>
                                                                <Box fontSize='10px'>
                                                                    <Text textAlign={"center"}>
                                                                        {/* {dataResteTrancheByStudentId?.findByStudentRestTranche? dataResteTrancheByStudentId?.findByStudentRestTranche[2].Rest : 50000} */}
                                                                    </Text>
                                                                </Box>
                                                            </Th>
                                                            <Th border='1px'>
                                                                <Box fontSize='10px'>
                                                                    <Text textAlign={"center"}>
                                                                {/* {((new Date(expense.createdOn)).toLocaleDateString('fr-FR', { day: 'numeric', month: 'numeric', year: 'numeric' }))}  */}
                                                                    {/* {dataDateLineTrancheStudentTranche2?.getTrancheDateLineByStudent}  */}
                                                                    {/* {console.log(dataDateLineTrancheStudentTranche2?.getTrancheDateLineByStudent)} */}
                                                                    {(new Date(dataTrancheByStudentId?.getClassfeeofStudent[2].dateLine)).toLocaleDateString()}
                                                                    
                                                                    </Text>
                                                                </Box>
                                                            </Th>
                                                            <Th border='1px'>
                                                                <Box fontSize='10px'>
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
                                            <Box fontSize='13px' mt={"-5px"}>
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
             </Box>
            </Center>
        </DefaultLayout>
    );
}
 
// export async function getStaticProps({ locale }) {
//     return {
//       props: {
//         ...(await getStaticPropsTranslations(locale)),
//         // Will be passed to the page component as props
//       },
//     };
// }

export default receipt;
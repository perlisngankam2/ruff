
import {
    Flex,
    Heading,
    Box,
    Text,
    Input,
    Checkbox,
    CheckboxGroup,
    Stack,
 }
    from '@chakra-ui/react';
import DefaultLayout from '../../components/layouts/DefaultLayout';
import { useQuery, useMutation } from "@apollo/client";
import { useAuth } from "../../contexts/account/Auth/Auth";

  import {
    GET_STUDENT_BY_ID,
    GET_SECTION_STUDENT_BY_ID,
    GET_STUDENT_SALLE

  } from "../../graphql/Queries"
import { useRouter } from 'next/router';

const Paiement = () => {

    const router = useRouter()
    const { setAuthToken, authToken } = useAuth();


    const {data:dataStudentId, loading, error} = useQuery(GET_STUDENT_BY_ID,
        {
          variables: {id: router.query.id}
        }
    );

    const {data:dataSectionStudentById} = useQuery(GET_SECTION_STUDENT_BY_ID,
        {
            variables:{
                studentid: router.query.id,
            }   
     
        } 
    );

    const {data:dataStudentLevel} = useQuery(GET_STUDENT_SALLE,
        {
          variables: {studentid: router.query.id} 
        }
      )
//   affichage de la date d'aaujourd'hui
      const today = new Date();
      useEffect(()=>{
        if(!authToken){
          router.back()
        }
        
      },[authToken])

      
    return (
        <DefaultLayout> 
        <Flex p='3em' minH='100vh' direction ='column' flexWrap='wrap' mt={"50px"} >
            <Box 
            bg={"colors.whiteColor"} 
            border='1px'
            w={"810px"}
            ml={"90px"}
            > 
            <Box borderBottom='1px'  >
                <Heading fontSize='xl' textAlign={'center'} mt='20px'>
                    GROUPE SCOLAIRE BILINGUE AWONO BILOGUE
                </Heading>
            </Box>
            <Box  borderBottom='1px' > 
                <Heading fontSize='md' textAlign={'center'} mt='20px'>
                    FICHE DE PAIEMENT
                </Heading>
            </Box>
            {dataStudentId && (
            <Box  p={"15px"} >
                <Flex justify='space-between'>
                    <Box display='flex' mt='20px' gap={'1'}>
                        <Text fontWeight={"bold"}>Date : </Text>
                        <Text>
                            {/* {today.toLocaleDateString()} */}
                            {(new Date).toLocaleDateString()}
                        </Text>
                    </Box>
                    <Box display='flex' mt='20px' mr='150px'gap={'1'}>
                        <Text fontWeight={"bold"}>No Reçu : </Text>
                        <Text>00000000</Text>
                    </Box>
                </Flex>
                
                    <Box display='flex' mt='20px'gap={1}>
                        <Text fontWeight={"bold"}>
                            Noms & Prenoms :
                        </Text>
                        <Text>
                        {dataStudentId.findOnestudent.firstname.toUpperCase()} &nbsp;
                            {dataStudentId.findOnestudent.lastname}
                        </Text>
                    </Box>
                    <Box display='flex' mt='20px' gap={10}>
                        <Box display='flex' gap={1}>
                            <Text fontWeight={"bold"}>
                             Classe :
                            </Text>
                            <Text>
                                {dataStudentLevel?.findSalleByStudent.levelName}
                            </Text>
                        </Box>
                        <Box display='flex' gap={1}>
                            <Text fontWeight={"bold"}>
                                Matricule:
                            </Text>
                            <Text>
                                 {dataStudentId.findOnestudent.matricule}
                            </Text>
                        </Box>
                        <Box display='flex' gap={1}>
                            <Text fontWeight={"bold"}>
                                Section: 
                                </Text>
                            <Text>
                                {dataSectionStudentById?.findSectionByStudent[0].name}
                            </Text>
                        </Box>
                    </Box>
                    <Box display='flex' mt='20px' gap={8}>
                        <Box display={{md:"flex"}} gap={1}>
                            <Text fontWeight={"bold"}>
                                Né (e) le :
                                </Text>
                            <Text>
                            {(new Date(dataStudentId.findOnestudent.dateOfBirth)).toLocaleDateString('fr-FR', { day: 'numeric', month: 'numeric', year: 'numeric' })}
                            </Text>
                        </Box>
                        <Box  display={{md:"flex"}} gap={2}>
                            <Text fontWeight={"bold"}>à:</Text>
                            <Text>
                                {dataStudentId.findOnestudent.birthPlace}
                            </Text>
                        </Box>
                    </Box>
                    <Box display='flex' mt='20px' gap={1}>
                        <Text fontWeight={"bold"}>
                            Sexe :
                        </Text>
                        <Text>
                            {dataStudentId.findOnestudent.sex}
                        </Text>
                    </Box>
                    <Box display='flex' mt='20px' gap={1} flexWrap='wrap'>
                        <Text fontWeight={"bold"}>
                            Noms & Prénoms du remettant :
                            </Text>
                        <Text>
           
                            .............................
                        </Text>
                        <Text fontWeight={"bold"}>tel : </Text>
                        <Text>
                           ....................
                        </Text>
                    </Box>
                    <Box display='flex' mt='20px' gap={50}>
                        <Text fontWeight={"bold"}>
                            Régime de paiement: Normal
                        </Text>
                        <Box display='flex' gap='2'>
                            <Text>I</Text>
                            <Checkbox
                                isChecked={dataStudentId?.findOnestudent.categoryName === "Candidat regulier"}
                            >
                            </Checkbox>
                        </Box>
                        <Box display='flex' gap='2'>
                            <Text >T1</Text>
                            <Checkbox></Checkbox>
                        </Box>
                    
                        <Box display='flex' gap='2'>
                            <Text>T2</Text>
                            <Checkbox ></Checkbox>
                        </Box>
                    
                        <Box display='flex' gap='2'>
                            <Text>T3</Text>
                            <Checkbox ></Checkbox>
                        </Box>
                    
                        <Box display='flex' gap='2'>
                            <Text >T4</Text>
                            <Checkbox></Checkbox>
                            
                        </Box>
                    </Box>
                <Box display='flex' mt='20px' gap={50}>
                    <Text fontWeight={"bold"}>
                        Régime de paiement: Spécial
                    </Text>
                    <Box display='flex' gap='2'>
                        <Text >I</Text>
                        <Checkbox 
                            size={"xl"}
                            isChecked={dataStudentId?.findOnestudent.categoryName === "Candidat libre"}>

                        </Checkbox>
                        
                    </Box>
                    <Box display='flex' gap='2'>
                        <Text>T1</Text>
                        <Checkbox></Checkbox>
                    </Box>

                    <Box display='flex' gap='2'>
                        <Text >T2</Text>
                        <Checkbox></Checkbox>
                        
                    </Box>

                    <Box display='flex' gap='2'>
                        <Text>T3</Text>
                        <Checkbox></Checkbox>
                    </Box>

                    <Box display='flex' gap='2'>
                        <Text>T4</Text>
                        <Checkbox ></Checkbox>
                        
                    </Box>
                </Box>
            </Box>
            )}
            </Box>
        </Flex>
        </DefaultLayout>
    );
}
 
export default Paiement;
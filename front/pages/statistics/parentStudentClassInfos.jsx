
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

  import {
    GET_STUDENT_BY_ID,
    GET_SECTION_STUDENT_BY_ID,
    GET_STUDENT_SALLE

  } from "../../graphql/Queries"
import { useRouter } from 'next/router';

const ParentStudentClass = () => {
    const router = useRouter()
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
  
    return (
        <DefaultLayout> 
        <Flex p='3em'  flexWrap='wrap' mt={"50px"} >
            
            <Box 
                bg={"colors.whiteColor"} 
                border='1px' 
                width={"810px"} 
                ml={"100px"} 
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
                                Matricule:
                            </Text>
                            <Text>
                                 {dataStudentId.findOnestudent.matricule}
                            </Text>
                        </Box>
                    </Box>
                    <Box display='flex' mt='20px' gap={1}>
                        <Text fontWeight={"bold"}>
                            Né (e) le :
                            </Text>
                        <Text>
                        {(new Date(dataStudentId.findOnestudent.dateOfBirth)).toLocaleDateString('fr-FR', { day: 'numeric', month: 'numeric', year: 'numeric' })}

                        </Text>
                        <Text fontWeight={"bold"}>à</Text>
                        <Text>
                         .................    
                          </Text>
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
           ........................
                        </Text>
                        <Text fontWeight={"bold"}>tel : </Text>
                        <Text>
                            ..............................
                        </Text>
                    </Box>
                    <Box display='flex' mt='20px' gap={50}>
                        <Text fontWeight={"bold"}>
                            Section: 
                        </Text>
                        <Box display='flex' gap='2'>
                            <Text mb='8px'>MB</Text>
                            <Input
                                type="checkbox"
                                placeholder='Here is a sample placeholder'
                                size='sm'
                                width='60px'
                               
                            />
                        </Box>
                        <Box display='flex' gap='2'>
                            <Text mb='8px'>PA</Text>
                            <Input
                                type="checkbox"
                                placeholder='Here is a sample placeholder'
                                size='sm'
                                width='40px'
                              
                            />
                        </Box>
                    </Box>
                <Box display='flex' mt='20px' gap={50}>
                    <Text fontWeight={"bold"}>
                        Classe:
                    </Text>
                    <Box display='flex' gap='2'>
                        <Text mb='8px'>PM</Text>
                        <Input
                            type="checkbox"
                            placeholder='Here is a sample placeholder'
                            size='sm'
                            width='40px'
                        />
                    </Box>
                    <Box display='flex' gap='2'>
                        <Text mb='8px'>PS/PN</Text>
                        <Input
                            type="checkbox"
                            placeholder='Here is a sample placeholder'
                            size='sm'
                            width='40px'
                          
                        />
                    </Box>

                    <Box display='flex' gap='2'>
                        <Text mb='8px'>MS/NI</Text>
                        <Input
                            type="checkbox"
                            placeholder='Here is a sample placeholder'
                            size='sm'
                            width='40px'
                        />
                    </Box>

                    <Box display='flex' gap='2'>
                        <Text mb='8px'>GS/NII</Text>
                        <Input
                            type="checkbox"
                            placeholder='Here is a sample placeholder'
                            size='sm'
                            width='40px'
                        />
                    </Box>

                    <Box display='flex' gap='2'>
                        <Text mb='8px'>Classe 1</Text>
                        <Input
                            type="checkbox"
                            placeholder='Here is a sample placeholder'
                            size='sm'
                            width='40px'
                        />
                    </Box>
                </Box>
                <Box display='flex' mt={"17px"} gap={50}>
                    <Box display='flex' gap='2'>
                        <Text mb='8px'>Class2</Text>
                        <Input
                            type="checkbox"
                            placeholder='Here is a sample placeholder'
                            size='sm'
                            width='40px'
                        />
                    </Box>
                    <Box display='flex' gap='2'>
                        <Text mb='8px'>Class3</Text>
                        <Input
                            type="checkbox"
                            placeholder='Here is a sample placeholder'
                            size='sm'
                            width='40px'
                        />
                    </Box>

                    <Box display='flex' gap='2'>
                        <Text mb='8px'>Class4</Text>
                        <Input
                            type="checkbox"
                            placeholder='Here is a sample placeholder'
                            size='sm'
                            width='40px'
                        />
                    </Box>

                    <Box display='flex' gap='2'>
                        <Text mb='8px'>Class5</Text>
                        <Input
                            type="checkbox"
                            placeholder='Here is a sample placeholder'
                            size='sm'
                            width='40px'
                        />
                    </Box>

                    <Box display='flex' gap='2'>
                        <Text mb='8px'>Class6</Text>
                        <Input
                            type="checkbox"
                            placeholder='Here is a sample placeholder'
                            size='sm'
                            width='40px'
                        />
                    </Box>
                </Box>
                <Box display='flex' mt='20px' gap={50}>
                    <Box display='flex' gap='2'>
                        <Text mb='8px'>Sil</Text>
                        <Input
                            type="checkbox"
                            placeholder='Here is a sample placeholder'
                            size='sm'
                            width='40px'
                        />
                    </Box>
                    <Box display='flex' gap='2'>
                        <Text mb='8px'>Cp</Text>
                        <Input
                            type="checkbox"
                            placeholder='Here is a sample placeholder'
                            size='sm'
                            width='40px'
                        />
                    </Box>

                    <Box display='flex' gap='2'>
                        <Text mb='8px'>CE1</Text>
                        <Input
                            type="checkbox"
                            placeholder='Here is a sample placeholder'
                            size='sm'
                            width='40px'
                        />
                    </Box>

                    <Box display='flex' gap='2'>
                        <Text mb='8px'>CE2</Text>
                        <Input
                            type="checkbox"
                            placeholder='Here is a sample placeholder'
                            size='sm'
                            width='40px'
                        />
                    </Box>

                    <Box display='flex' gap='2'>
                        <Text mb='8px'>CM1</Text>
                        <Input
                            type="checkbox"
                            placeholder='Here is a sample placeholder'
                            size='sm'
                            width='40px'
                        />
                    </Box>
                    <Box display='flex' gap='2'>
                        <Text mb='8px'>CM2</Text>
                        <Input
                            type="checkbox"
                            placeholder='Here is a sample placeholder'
                            size='sm'
                            width='40px'
                        />
                    </Box>
                </Box>
               
                <Box display='flex' mt='20px' gap={10}>
                        <Box display='flex' gap={1}>
                            <Text fontWeight={"bold"}>
                             Pere :
                            </Text>
                            <Text>
                                 {dataStudentId.findOnestudent.fatherFirstName}
                            </Text>
                        </Box>
                        <Box display='flex' gap={1}>
                            <Text fontWeight={"bold"}>
                                Telephone:
                            </Text>
                            <Text>
                                {dataStudentId.findOnestudent.fatherPhoneNumber} 

                            </Text>
                        </Box>
                        </Box>
                        <Box display='flex' mt='20px' gap={10}>
                        <Box display='flex' gap={1}>
                            <Text fontWeight={"bold"}>
                             Mere :
                            </Text>
                            <Text>
                                {dataStudentId.findOnestudent.motherFirstName}

                            </Text>
                        </Box>
                        <Box display='flex' gap={1}>
                            <Text fontWeight={"bold"}>
                            Telephone:
                            </Text>
                            <Text>
                            {dataStudentId.findOnestudent.motherPhoneNumber}

                            </Text>
                        </Box>
                </Box>
                        <Box display='flex' mt='20px' gap={10}>
                            <Box display='flex' gap={1}>
                                <Text fontWeight={"bold"}>
                                Domicile:
                                </Text>
                                <Text>
                                    {dataStudentId.findOnestudent.motherPhoneNumber}
                                </Text>
                            </Box>
                        </Box>
                        
            </Box>
            )}
            </Box>
        </Flex>
        </DefaultLayout>
    );
}
 
export default ParentStudentClass;

import {
    Box,
    Text,
    Center,
    Heading,
} from "@chakra-ui/react";
import PaySlipBottom from "../../../components/atoms/PaySlipBottom";
import PaySlipMiddle from "../../../components/atoms/PaySlipMiddle";
import PaySlipFolderSalaryBox from "../../../components/atoms/PaySlipFolderSalaryBox";
import PaySlipLogoBox from "../../../components/atoms/PaySlipLogoBox";
import PaySlipInformationEmployeeBox from "../../../components/atoms/PaySlipInformationEmployeeBox";
import DefaultLayout from "../../../components/layouts/DefaultLayout";
import { GET_ALL_PERSONNEL_BY_ID, GET_ALL_SALAIRE_BY_ID } from "../../../graphql/Queries";
import { useRouter } from "next/router";
import { useQuery } from "@apollo/client";

const Bulletin = () => {

  const router = useRouter();

     const {data:dataPersonnelId, loading, error} = useQuery(GET_ALL_PERSONNEL_BY_ID,
      {
        variables:{ id: router.query.id}
      });


      const {data:dataSalaireId} = useQuery(GET_ALL_SALAIRE_BY_ID,
      {
        variables:{ personnelid: router.query.id}
      });

    if (loading) return <Text>Chargement en cour...</Text>
    if (error) return <Text>Une erreur s'est produite!</Text>

    
    return ( 
        <DefaultLayout>
            <Box p="3" pt="70px" w="100%" background="colors.tertiary">
        <Center >
            <Box  borderWidth='1px' 
                    bg={'white'}
                    borderColor='black' 
                    px='20px' >

                <Box textAlign={'center'} mt={'4%'}>
                    <Heading>BULLETIN DE PAIE</Heading>
                    <Text>Du 23/07/2023 au 23/08/2023</Text>
                </Box>
                <Box
                    gap={6}
                    mt={'10'}
                    display={{ md: 'flex' }}
                    mb={'20px'}
                >
                   <PaySlipLogoBox />

                    <Box>
                        <PaySlipFolderSalaryBox name1='DOSSIER/SALAIRE' name2='EMPLOI' name3='xxxxxxxx' name4='xxxxxxx' />
                        <PaySlipFolderSalaryBox name1='MAT.CNPS' name2='CLASSIFICATION' name3='xxxxxxxx' name4='xxxxxxx' />
                        <PaySlipFolderSalaryBox name1="Date d'entrée" name2='Date de sortie' name3='xxxxxxxx' name4='xxxxxxx' />

                        <PaySlipInformationEmployeeBox 
                        id={dataPersonnelId?.findOnePersonnel.id} 
                        firstName={dataPersonnelId?.findOnePersonnel.firstName}
                        lastName={dataPersonnelId?.findOnePersonnel.lastName}
                        fonction={dataPersonnelId?.findOnePersonnel.fonction}
                        status={dataPersonnelId?.findOnePersonnel.status}
                        />
                    </Box>
                </Box>
                <PaySlipMiddle />
                <PaySlipBottom montant ={dataSalaireId?.getsalairebypersonnel.montant } />
            </Box>
        </Center>
         </Box>
        </DefaultLayout>
        
       
     );
}
 
export default Bulletin;
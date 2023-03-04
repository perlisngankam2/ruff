
import {
    Box,
    Text,
    Center,
    Heading,
} from "@chakra-ui/react";
import PaySlipBottom from "../../components/atoms/PaySlipBottom";
import PaySlipMiddle from "../../components/atoms/PaySlipMiddle";
import PaySlipFolderSalaryBox from "../../components/atoms/PaySlipFolderSalaryBox";
import PaySlipLogoBox from "../../components/atoms/PaySlipLogoBox";
import PaySlipInformationEmployeeBox from "../../components/atoms/PaySlipInformationEmployeeBox";
import DefaultLayout from "../../components/layouts/DefaultLayout";
import { useQuery } from "@apollo/client";
import { GET_ALL_PERSONNEL_BY_ID} from "../../graphql/queries";
import { useEffect } from "react";
import { useRouter } from "next/router";

const PaySlip = () => {

  const router = useRouter();

  const {data:dataPersonnelId} = useQuery(GET_ALL_PERSONNEL_BY_ID,
  {
    variables:{ id: router.query.id}
  })

  useEffect(() =>{
    console.log(dataPersonnelId)
  })


    return ( 
        <DefaultLayout>
            <Box  p="3" pt="70px"  background="colors.tertiary" w="full" minH="100vh">
                {dataPersonnelId && (
        <Center>
            <Box>

                <Box textAlign={'center'} >
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

                        <PaySlipInformationEmployeeBox id={dataPersonnelId.findOnePersonnel.id} firstName={dataPersonnelId.findOnePersonnel.firstName} lastName={dataPersonnelId.findOnePersonnel.lastName} fonction={dataPersonnelId.findOnePersonnel.fonction} />
                    </Box>
                </Box>
                <PaySlipMiddle />
                <PaySlipBottom />
            </Box>
        </Center>
                )}
        </Box>
        </DefaultLayout>
     );
}
 
export default PaySlip;
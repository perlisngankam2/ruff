
import {
    Box,
    Text,
    Center,
    Heading,
} from "@chakra-ui/react";
import PaySlipBottom from "../../components/atoms/PaySlipBottom";
import PaySlipMiddle from "../atoms/PaySlipMiddle";
import PaySlipFolderSalaryBox from "../atoms/PaySlipFolderSalaryBox";
import PaySlipLogoBox from "../atoms/PaySlipLogoBox";
import PaySlipInformationEmployeeBox from "../atoms/PaySlipInformationEmployeeBox";


const PaySlip = () => {
    return ( 
        <Center>
            <Box>

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

                        <PaySlipInformationEmployeeBox />
                    </Box>
                </Box>
                <PaySlipMiddle />
                <PaySlipBottom />
            </Box>
        </Center>
     );
}
 
export default PaySlip;
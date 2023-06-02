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
    Image
} from '@chakra-ui/react';
// import { useTranslation} from 'next-i18next';
import {CiSearch} from 'react-icons/ci'
import { useEffect } from 'react';
import { useRouter } from "next/router";
import { useAuth } from '../../contexts/account/Auth/Auth';



const SuiviPaimenetPrEleve = () => {
    const { setAuthToken, authToken } = useAuth();
    const router = useRouter();

    useEffect(() => {
        if (!authToken) {
          router.back();
        }
      }, [authToken]);
    // const {t} = useTranslation();

    return (
            <Center>
                <Box> 
                    <Box 
                        //  gap={6}
                        // mt={'10'} 
                        // display={{md:'flex'}}
                        // mb={'20px'}
                    >   
                    </Box>
                    
                </Box>
            </Center>
    );
}

export default SuiviPaimenetPrEleve;

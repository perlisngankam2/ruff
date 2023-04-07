import {
    Box,
    Text,
    Divider,
    Flex,
} from "@chakra-ui/react";
import { useQuery } from "@apollo/client";
import { GET_ALL_PERSONNEL_BY_ID} from "../../graphql/Queries";
import { useEffect } from "react";
import { useRouter } from "next/router";

const PaySlipInformationEmployeeBox = (props) => {


      const router = useRouter();

  const {data:dataPersonnelId} = useQuery(GET_ALL_PERSONNEL_BY_ID,
  {
    variables:{ id: props.id}
  })


    return ( 
        <Box
            w={['270px', '300px', '617px']}
            borderColor={'black'}
            border='1px'
            minH={'120px'}
        >
            <Box
                fontWeight={'bold'}
                bg={'yellow.400'}>
                <Text
                    fontSize={['sm', 'sm', 'sm']}
                    textAlign={'center'}
                >
                    SALARIE
                                    </Text>
            </Box>
            <Divider borderColor={'black'} />
            <Box >
                <Flex>
                    <Text ml={['10px', '10px', '10px']}>Noms & Prenoms:</Text>
                    <Text ml={['10px', '10px', '10px']} fontWeight='bold'> {props.firstName.toUpperCase() } {props.lastName.toUpperCase() }</Text>
                </Flex>
        
                <Flex>
                    <Text ml={['10px', '10px', '10px']}>Fonction:</Text>
                    <Text ml={['10px', '10px', '10px']} fontWeight='bold'>{props.fonction.toUpperCase() } </Text>
                </Flex>
                <Flex>
                    <Text ml={['10px', '10px', '10px']}>Status:</Text>
                    <Text ml={['10px', '10px', '10px']} fontWeight='bold'>{props.status.toUpperCase() } </Text>
                </Flex>
            </Box>
        </Box>
     );
}
 
export default PaySlipInformationEmployeeBox;
import {
    Box,
    Text,
    Divider,
} from "@chakra-ui/react";
import { useQuery } from "@apollo/client";
import { GET_ALL_PERSONNEL_BY_ID} from "../../graphql/queries";
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
                <Text ml={['10px', '10px', '10px']}>Noms: {props.firstName} </Text>
                <Text ml={['10px', '10px', '10px']}>Prenom: {props.lastName} </Text>
                <Text ml={['10px', '10px', '10px']}>fonction: {props.fonction} </Text>
                <Text ml={['10px', '10px', '10px']}>xxxxxxxxxxx </Text>
            </Box>
        </Box>
     );
}
 
export default PaySlipInformationEmployeeBox;
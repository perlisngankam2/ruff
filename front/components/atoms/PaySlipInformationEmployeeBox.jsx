import {
    Box,
    Text,
    Divider,
} from "@chakra-ui/react";

const PaySlipInformationEmployeeBox = (props) => {
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
                <Text ml={['10px', '10px', '10px']}>{props.name} </Text>
                <Text ml={['10px', '10px', '10px']}>{props.function} </Text>
                <Text ml={['10px', '10px', '10px']}>xxxxxxxxxxx </Text>
            </Box>
        </Box>
     );
}
 
export default PaySlipInformationEmployeeBox;
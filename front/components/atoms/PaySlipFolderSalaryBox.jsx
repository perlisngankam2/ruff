import {
    Box,
    Text,
    Divider,
    Flex,
} from "@chakra-ui/react";

const PaySlipFolderSalaryBox = (props) => {
    return ( 
        <Box
            w={['270px', '300px', '617px']}
            borderColor={'black'}
            border='1px'
            mb='22px'
        >
            <Flex
                fontWeight={'bold'}
                bg={'yellow.400'}
                justify='space-between'
            >
                <Text
                    mx='2'
                    fontSize={['sm', 'sm', 'sm']}
                    textAlign={'center'}
                >
                    {props.name1}
                                    </Text>
                <Text mx='2' fontSize='sm' >{props.name2}</Text>
            </Flex>
            <Divider borderColor={'black'} />
            <Flex justify='space-between'>
                <Text mx='2'>
                    {props.name3}
                    </Text>
                <Text mx='2'>
                    {props.name4}
                    </Text>
            </Flex>
        </Box>

     );
}
 
export default PaySlipFolderSalaryBox;
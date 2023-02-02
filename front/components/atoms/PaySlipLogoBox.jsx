import {
    Box,
    Card,
    CardBody,
    CardFooter,
    Text,
    Center,
    Stack,
    Divider,
    Image,
    Heading,
    Flex,
} from "@chakra-ui/react";

const PaySlipLogoBox = () => {
    return ( 

        <Box
            borderColor={'black'}
            border={'1px'}
            w={['270px', '300px', '250px']}
        >
            <Card
                maxW='sm'
                borderRadius={'n0ne'}
            >
                <Stack p={1} bg={'yellow.400'}
                >
                    <Heading
                        size='sm'
                        textAlign={'center'}


                    >
                        EMPLOYEUR
                                </Heading>
                </Stack>
                <Divider borderColor={'black'} />
                <CardBody
                    mt={['-45px', '-45px', '-65px']}
                >
                    <Stack>
                        <Center>
                            <Image
                                w={['240px', '230px', '240px']}
                                src='logo.png'
                                alt={'logo'}
                            />
                        </Center>
                    </Stack>
                </CardBody>
                <CardFooter mt={'-9'} pb={'1'} >
                    <Stack >
                        <Text>
                            BP:122
                                    </Text>
                        <Text>
                            Obala-Cameroun
                                    </Text>
                        <Text m={'0'}>
                            Tel: 62578552/5555554
                                    </Text>
                    </Stack>
                </CardFooter>
            </Card>
        </Box>
     );
}
 
export default PaySlipLogoBox;
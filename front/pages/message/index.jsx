import { 
    Box, 
    Center, 
    Flex, 
    Button,
    Icon,
    Heading,
    Hide,
    Text
 } from "@chakra-ui/react";
import DefaultLayout from "../../components/layouts/DefaultLayout";
import SearchBarNew from "../../components/atoms/SearchBarNew";
import MessageTable from "./MessageTable";
import { IoIosAdd } from "react-icons/io";
import {Router, useRouter} from 'next/router';

const Message = () => {

const router = useRouter();


    return(
        <DefaultLayout>
            <Box 
                p="3" 
                pt="70px" 
                background="colors.tertiary" 
                w="full" 
                minH="100vh"
                >
                    <Flex
                        align="center"
                        justify="space-between"
                        boxShadow="md"
                        p="5"
                        rounded="lg"
                        background="white"
                    >
                        <Heading
                            textAlign="center"
                            color="WindowText"
                            size="lg"
                            textColor="pink.300"
                        >
                            Liste des méssages
                        </Heading>
                        <Hide below="sm">
                            <Text>Dashboad / messages / Liste messages</Text>
                        </Hide>
                    </Flex>
                    <Flex p='0px' gap={'680px'} mt={3} >
                        {/* <SearchBarNew/> */}
                        <Button
                            rightIcon={<Icon as={IoIosAdd} boxSize="20px" />}
                            onClick={() => router.push("/message/creersms")}
                            mt='10px'
                            // mr={'20px'}
                            ml='1020px'
                            bg='white'
                        >
                            Creez votre message
                        </Button>
                    </Flex>
                    <Box mt={10}>
                        <MessageTable/>
                    </Box>
            </Box>
      </DefaultLayout>
    )

}

export default Message;
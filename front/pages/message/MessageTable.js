import { AddIcon } from '@chakra-ui/icons';
import { Box ,
    Table ,
    Td ,
    Th ,
    Tr , 
    Tbody , 
    TableCaption , 
    Tfoot ,
    TableContainer ,
    Thead , 
    Avatar ,
    Link , 
    IconButton ,
    Button ,
    ButtonGroup , 
    Icon, 
    Flex,
    Text,
    Checkbox
} from '@chakra-ui/react';
import {FiEdit} from 'react-icons/fi';
import {MdDelete} from 'react-icons/md'
import { Messages } from '../api/data/messages';
import { useRouter } from 'next/router';
import { Users } from '../api/data/users';

const MessageTable = () => {

    const router= useRouter()

    console.log(Messages)

    return ( 
    <>
    <Box>
        {Messages.map((message, index) =>(
                <Flex 
                    key={index} 
                    _hover={{color:'green.300'}} 
                    gap={250} 
                    onClick={() => router.push("/message/viewmail")}
                >
                    {/* <Box><Checkbox></Checkbox></Box> */}
                    <Box 
                        flex={1} 
                        mb='30px' 
                        width='100px' 
                        borderColor={'#C6B062'}
                    >
                        {message.last_name}
                    </Box>
                    <Box 
                        flex={1} 
                        width='200px'
                        ml='-280px'
                         borderColor={'#C6B062'}
                     >
                        {message.first_name}
                    </Box>
                    <Flex  gap={20}  >
                        <Box 
                            flex={1} 
                            borderColor={'#C6B062'} 
                        >
                            {message.heure}
                        </Box>
                        <Box
                            flex={1} 
                            borderColor={'#C6B062'} 
                            mt='-12px'
                         >
                            <ButtonGroup 
                                size='sm' 
                                isAttached 
                                variant='link' 
                                colorScheme={'teal'}
                                display='flex'
                                >
                                <Button>
                                    <Link 
                                    href='/eleves/details'
                                    >Details</Link>
                                </Button>
                                {/* <Link 
                                    href="/eleves/modifiereleve">
                                    <Icon
                                        as={FiEdit}
                                        boxSize="40px"
                                        p="3"
                                        // bg="blue.100"
                                        // rounded="full"
                                    />
                                </Link> */}
                                <Link href="#" ml='5px' >
                                    <Icon
                                        as={MdDelete}
                                        boxSize="42px"
                                        p="3"
                                        rounded="full"
                                        color="red"
                                    />
                                </Link>
                            </ButtonGroup> 
                        </Box>
                    </Flex>
                </Flex>
            // </Link>
                )
             )}
    </Box>
    </>
    )
}




export default MessageTable ; 
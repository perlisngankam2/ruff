import {Flex, 
    Box, 
    Icon, 
    Input, 
    InputGroup, 
    InputLeftElement,
    Show,
    Center
} from '@chakra-ui/react';
import {CiSearch} from 'react-icons/ci'
import Link from 'next/link';

const SearchBar = () => {
    return(
        <Center>
        <Show above='lg'> 
            <Box  
                width={['400px', '400px','700px']} 
                mt={'5%'} 
            >
                <InputGroup borderColor={'blue'} >
                    <InputLeftElement>
                   <Link href=''> <Icon  as={ CiSearch} h={8} w={30}/> </Link>
                    </InputLeftElement>
                    <Input 
                        type="text" 
                        placeholder="Search..."
                    />
                </InputGroup>
            </Box>
        </Show>
        </Center>
    )
}
export default SearchBar;
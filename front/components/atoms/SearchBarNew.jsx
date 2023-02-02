import  {
    Box,
     Flex,
      InputGroup, 
      InputRightElement, 
      Input, 
      Icon
    } from '@chakra-ui/react';
import { useState } from 'react';
import {FiSearch} from 'react-icons/fi'



const SearchBarNew = ({children}) => {
    const [searchName, setSearchName] = useState("")

    const handleChange = (e) => {
        console.log(searchName)
        setSearchName(e.target.value);
      };
    return(
        <Box>
            <Flex bg="white" my="5" p="5" rounded="md" justify="space-between">
                <InputGroup width="300px">
                    <InputRightElement
                    children={<Icon as={FiSearch} />}
                    cursor="pointer"
                    />
                    <Input
                    placeholder="Rechercher un employé"
                    variant="flushed"
                    onChange={handleChange}
                    />
                </InputGroup>
            </Flex>
        </Box>
    )
}
export default SearchBarNew;
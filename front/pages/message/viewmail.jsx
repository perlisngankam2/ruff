
import { Textarea, Box, Container, Heading, Button, Input,Text, Flex} from '@chakra-ui/react'
import React from 'react'
import { useRef} from 'react'
import { useDimensions } from '@chakra-ui/react'
import ReponseMail from './ReponseMail'
import DefaultLayout from "../../components/layouts/DefaultLayout";



function viewmail() {
  let [value, setValue] = React.useState('')

  let handleInputChange = (e) => {
    let inputValue = e.target.value
    setValue(inputValue)
  }
  return (
    <DefaultLayout>
    
      <Box mt={'60px'} w='100%'>
      <Flex display={'block'} p='10px' >
        <Text mb='8px'>Destinataire: {value='hello@gmail.com'} </Text>
        <Text mb='8px'>objet: {value='bonjour'} </Text>
        <Textarea
          value={value}
          onChange={handleInputChange}
          placeholder='Here is a sample placeholder'
          size='xl'
          h={'300px'}
          borderRadius='5px'
          textAlign='justify'
          borderColor="gray.300"
          _hover={{
            borderRadius: 'blue.300',
          }}
          bg='gray.100'
        />
        </Flex>
        <Box p='10px'> <ReponseMail/> </Box>
      </Box>
    </DefaultLayout>
  )
}
export default viewmail;
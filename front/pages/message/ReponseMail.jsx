import {
    Popover,
    PopoverTrigger,
    PopoverContent,
    PopoverHeader,
    PopoverBody,
    PopoverFooter,
    PopoverArrow,
    PopoverCloseButton,
    PopoverAnchor,
    Button,
    Box,
    ButtonGroup,
    FormLabel,
    FormControl,
    Textarea,
    Input,
    Text
    
  } from '@chakra-ui/react'
  import React from 'react'
  function ReponseMail() {
    const initialFocusRef = React.useRef()
    let [value, setValue] = React.useState('')

  let handleInputChange = (e) => {
    let inputValue = e.target.value
    setValue(inputValue)
  }
    return (
      <Popover
        initialFocusRef={initialFocusRef}
        closeOnBlur={false}
        placement ="auto"
      >
        <PopoverTrigger>
          <Button  colorScheme='green' >Repondre</Button>
        </PopoverTrigger>
        <PopoverContent
          color='white'
          bg='colors.tertiary' 
          borderColor='blue.400'
          width={['200px', '400px', '600px']}
          >
          <PopoverHeader pt={4} fontWeight='bold' border='0'>
           <Text color="black" mb='8px'  >A: {value='hello@gmail.com'} </Text>
          </PopoverHeader>
          <PopoverArrow />
          <PopoverCloseButton color="black"/>
          <PopoverBody>
          <FormControl id="name">
              <FormLabel color="black">Message:</FormLabel>
              <Textarea
                borderColor="gray.300"
                _hover={{
                  borderRadius: 'gray.300',
                }}
                color="black"
                placeholder="message"
              />
          </FormControl>
          </PopoverBody>
          <PopoverFooter
            border='0'
            display='flex'
            alignItems='center'
            justifyContent='space-between'
            pb={4}
          >
            <ButtonGroup size='sm'>
              <Button colorScheme='green' >Envoyer</Button>
            </ButtonGroup>
          </PopoverFooter>
        </PopoverContent>
      </Popover>
    )
  }
  export default ReponseMail;
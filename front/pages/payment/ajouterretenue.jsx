import { Center, Heading, Box, Divider, Input, NumberInput,
  NumberInputField,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper,
  InputLeftAddon,
  Button, } from '@chakra-ui/react'
import React from 'react'
import DefaultLayout from '../../components/layouts/DefaultLayout'
import { useState, useEffect } from 'react';
import { CheckIcon } from '@chakra-ui/icons'


function ajouterretenue() {

    const today = new Date();
    const day = today.getDate().toString().padStart(2, '0');
    const month = (today.getMonth() + 1).toString().padStart(2, '0');
    const year = today.getFullYear();
    const formattedDate = `${day}/${month}/${year}`;
console.log(formattedDate)

  return (
      <DefaultLayout>
        <Box pt="70px" w="100%" bg={"#f6f7fb"}>

          <Heading p="1em" textAlign="center" bgGradient='linear(to-r, teal.500, green.500)' bgClip='text' fontSize={'30px'}>
            Ajouter une retenue
          </Heading>
        <Box mx='400px' pb={'15px'}>
          <Divider />
        </Box>
        <Box w="300px" margin="0 auto" textAlign="center" gap={200} >
<Box pb={'10px'}>
 <Input
                    type="date"
                    id="dateOfPrime"
                    name="dateOfPrime"
                    placeholder="{formattedDate}"
                    bg='white'
              
                    // borderColor="purple.100"
                    // onChange={e => setDateOfStartWork(e.target.value)}
                    // value={dateOfStartWork}
                    // // ref={dateOfStartWorkRef}
                    
                  />
</Box>
          
<Box pb={'10px'}>
 <Input
                    type="text"
                    id="lastName"
                    name="lastName"
                    placeholder="description retenue"
                    bg='white'
                    // borderColor="purple.100"
                    // onChange={e => setLastName(e.target.value)}
                    // value={lastName}
                  /> 
</Box>
                  
<Box pb={'15px'}>
 <NumberInput defaultValue={0} bg='white'>
  
                    <NumberInputField />
                    <NumberInputStepper>
                      <NumberIncrementStepper />
                      <NumberDecrementStepper />
                    </NumberInputStepper>
                  </NumberInput>
</Box>
                   
        </Box>

         <Box mx='400px' pt='0px' pb={'15px'}>
          <Divider />
          
        </Box>
        <Center><Button leftIcon={<CheckIcon />} colorScheme='teal' variant='solid' mx='auto' my='auto'>
    Soumettre
  </Button>
          </Center>
         
        </Box>


    </DefaultLayout>
  )
}

export default ajouterretenue
import { Center, Heading, Box, Divider, Input, NumberInput,
  NumberInputField,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper,
  InputLeftAddon,
  Button, Select} from '@chakra-ui/react'
import React from 'react'
import DefaultLayout from '../../components/layouts/DefaultLayout';
import { CheckIcon } from '@chakra-ui/icons';
import { useRouter } from "next/router";
import { useEffect ,useState } from "react";
import { useMutation, useQuery } from "@apollo/client";
import { CREATE_PRIME } from "../../graphql/Mutation";
import { GET_ALL_PERSONNELS, GET_ALL_Category_Personnel } from "../../graphql/Queries";

import { useToast } from "@chakra-ui/react";

function ajouterprime() {

  const [Nom , setNom] = useState("");
  const [Description , setDescription] = useState("");
  const [Montant, setMontant] = useState("");
  const [categoryPersonnelId, setCategoryPersonnelId] = useState("");
  const [createPrime, error] = useMutation(CREATE_PRIME);
  
  const {data:dataCategoryPersonnel} = useQuery(GET_ALL_Category_Personnel);
  const toast = useToast()
  const router = useRouter()

    const HandleClick = async (event) => {
  event.preventDefault();

  const primeData = await createPrime({
        variables:{
        prime: { 
          nom: Nom,
          description: Description, 
          montant: parseInt(Montant),
          // categorieId: categoryPersonnelId,
        }
      }
    })
    // console.log(userData)
    toast({
      title: "Succès.",
      description: "La prime a été crée .",
      status: "success",
      duration: 3000,
      isClosable: true,
    });
  }

//     const today = new Date();
//     const day = today.getDate().toString().padStart(2, '0');
//     const month = (today.getMonth() + 1).toString().padStart(2, '0');
//     const year = today.getFullYear();
//     const formattedDate = `${day}/${month}/${year}`;
// console.log(formattedDate)

  return (
    <DefaultLayout>
        <Box pt="70px" w="100%" bg={"#f6f7fb"}>
          <Box as={"form"} 
             onSubmit={HandleClick}>

          <Heading p="1em" textAlign="center" bgGradient='linear(to-r, teal.500, green.500)' bgClip='text' fontSize={'30px'}>
            Ajouter une prime
          </Heading>
        <Box mx='400px' pb={'15px'}>
          <Divider />
        </Box>
        <Box w="300px" margin="0 auto" textAlign="center" gap={200} >
<Box pb={'10px'}>
 <Input

                    type="text"
                    value={Nom}
                    onChange={(e) => setNom(e.target.value)}
                    name="Nom"
                    placeholder="nom prime"
                    bg='white'
                    // type="date"
                    // id="dateOfPrime"
                    // name="dateOfPrime"
                    // placeholder="{formattedDate}"
                    // bg='white'
              
                    // borderColor="purple.100"
                    // onChange={e => setDateOfStartWork(e.target.value)}
                    // value={dateOfStartWork}
                    // // ref={dateOfStartWorkRef}
                    
                  />
</Box>
          
<Box pb={'10px'}>
 <Input
                    type="text"
                   value={Description}
                    onChange={(e) => setDescription(e.target.value)}
                    name="Description"
                    placeholder="description prime"
                    bg='white'
                    // borderColor="purple.100"
                    // onChange={e => setLastName(e.target.value)}
                    // value={lastName}
                  /> 
</Box>
                  
{/* <Box pb={'15px'}>
   <Select
                    type="text"
                    name="categoryPersonnelId"
                    placeholder="Categorie du personnel"
                    onChange={e => setCategoryPersonnelId(e.target.value)}
                    value={categoryPersonnelId}
                    bg='white'
                    // ref={dateOfBirthRef}
                   
                  >
                    { 
                          dataCategoryPersonnel && (
                            dataCategoryPersonnel.findAllcategoriepersonnel.map((categoryPersonnel, index) => (
                                <option value={categoryPersonnel.id} key={index}>
                                  {categoryPersonnel.nom}
                                </option>
                            ))
                        )}

                  </Select>

  
                   
</Box> */}

             <Box pb={'15px'}>
   <Input
                    type="text"
                   value={Montant} 
                   onChange={(e) => setMontant(e.target.value)}
                    name="Description"
                    placeholder="--montant--"
                    bg='white'
                    // borderColor="purple.100"
                    // onChange={e => setLastName(e.target.value)}
                    // value={lastName}
                  /> 

  
                   
</Box>

        </Box>

         <Box mx='400px' pt='0px' pb={'15px'}>
          <Divider />
          
        </Box>
        <Center>
          <Button type="submit" leftIcon={<CheckIcon />} colorScheme='teal' variant='solid' mx='auto' my='auto'>
                Soumettre
           </Button>
        </Center>
         </Box>
        </Box>


    </DefaultLayout>
  )
}

export default ajouterprime
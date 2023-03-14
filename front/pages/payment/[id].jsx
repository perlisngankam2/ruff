
import {
    Box, Button, Center, Divider, Flex, Heading, Input, Text 
} from "@chakra-ui/react";
import PaySlipBottom from "../../components/atoms/PaySlipBottom";
import PaySlipMiddle from "../../components/atoms/PaySlipMiddle";
import PaySlipFolderSalaryBox from "../../components/atoms/PaySlipFolderSalaryBox";
import PaySlipLogoBox from "../../components/atoms/PaySlipLogoBox";
import PaySlipInformationEmployeeBox from "../../components/atoms/PaySlipInformationEmployeeBox";
import DefaultLayout from "../../components/layouts/DefaultLayout";
import { useQuery, useMutation } from "@apollo/client";
import { GET_ALL_PERSONNEL_BY_ID} from "../../graphql/queries";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { CREATE_SALAIRE } from "../../graphql/Mutation";
import { useToast } from "@chakra-ui/react";

const PaySlip = () => {


  const moisPayes = [];
  const router = useRouter();
  const toast = useToast();


  const {data:dataPersonnelId} = useQuery(GET_ALL_PERSONNEL_BY_ID,
  {
    variables:{ id: router.query.id}
  })

  const [personnelId , setPersonnelId] = useState("");
  const [montant, setMontant] = useState("");
  const [moisPaie, setMoisPaie] = useState("");
  const [jourPaie , setJourPaie] = useState("");
  const [createSalaire] = useMutation(CREATE_SALAIRE);
  

  const handleMoisPaieChange = (event) => {
    const selectedMonth = event.target.value;
    if (!moisPayes.includes(selectedMonth)) {
      setMoisPaie(selectedMonth);
    }
  };

    const HandleClick = async (event) => {
  event.preventDefault();

  const salaireData = await createSalaire({
        variables:{
        input: { 
          personnelId: personnelId,
          montant: parseInt(montant),
          moisPaie: moisPaie, 
          jourPaie: jourPaie
        }
      }
    })

    toast({
      title: "Succès.",
      description: "La prime a été crée .",
      status: "success",
      duration: 3000,
      isClosable: true,
    });

    moisPayes.push(moisPaie);
        setMoisPaie("");
  }

  useEffect(() =>{
    console.log(dataPersonnelId?.findOnePersonnel)
  })


    return ( 



            <DefaultLayout>
      <Box pt="70px" w="100%" bg={"#f6f7fb"}>

        <Heading p="1em" textAlign="center" bg='#eb808a' bgClip='text' fontSize={'30px'}>
            Formulaire de paie de salaire
          </Heading>
          
        <Flex bg='#5755c1' width='1000px' h='80px' margin="0 auto" pb='20px'> 
        <Flex p="1.5em" textAlign="center" ml='20px' gap={6} margin="0 auto" >
          <Flex>
            <Text color='#9490c9' fontWeight={'bold'}>Noms & prénoms de l'employé :</Text>
            <Text color='white'>{dataPersonnelId?.findOnePersonnel.firstName +' '+ dataPersonnelId?.findOnePersonnel.lastName}</Text>
          
          </Flex>
          <Flex>
            <Text color='#9490c9' fontWeight={'bold'}>Fonction :</Text>
            <Text color='white'>{dataPersonnelId?.findOnePersonnel.fonction}</Text>
          </Flex>
          
        </Flex>

        </Flex>


{/* //informaton salaire et mois */}
      <Center>
        <Flex 
          mt="20px"
          gap={7}
        > 
        <Box width={'340px'} gap={7} >
          <Text fontSize='sm'> Salaire Mois</Text>
              <Input
                    placeholder="nom prime"
                    bg='white'
                    type="month"
                    name="dateOfPrime"
                    rounded={2}
                    onChange={handleMoisPaieChange}
                    disabled={moisPayes.includes(moisPaie)}
                    value={moisPaie}
                    
                  />
                      <Input
                    placeholder="nom prime"
                    bg='white'
                    type="date"
                    rounded={2}
                    name="dateOfPrime"
                    mt={'8px'}
                    onChange={(event) => setJourPaie(event.target.value)}
                    value={jourPaie}
                    
                  /></Box>
                  <Box>
                    <Text fontWeight={'bold'} fontSize='sm' color='#eb808a'>Montant du salaire *</Text>

                           <Input
                    placeholder="nom prime"
                    bg='white'
                    type="text"
                    rounded={2}
                    name="dateOfPrime"
                    // placeholder="{formattedDate}"
                    // onChange={(event) => setStartDate(event.target.value)}
                   value={dataPersonnelId?.findOnePersonnel.salary}
                 
                    
                  />
                  </Box>
                
        

        </Flex>
      </Center>

       <Box mx='100px' pb={'20px'} mt='20px'>
          <Divider />
        </Box>

             <Center>
          <Button disabled={!moisPaie} type="submit" color='white' bg='#eb808a' variant='solid' mx='auto' my='auto' onClick={HandleClick}>
                Soumettre
           </Button>
        </Center>
      </Box>

    </DefaultLayout>
     );
}
 
export default PaySlip;

// je voudrais payer un salarié et mon probleme est a ce niveau 
//    <Input
//                     placeholder="nom prime"
//                     bg='white'
//                     type="month"
//                     name="dateOfPrime"
//                     rounded={2}
//                     onChange={(event) => setMoisPaie(event.target.value)}
//                     value={moisPaie}
                    
//                   /> 

// j'aimerais que lorsque je clique sur un mois et je paye le salarie le mois ne sois plus cliquable  
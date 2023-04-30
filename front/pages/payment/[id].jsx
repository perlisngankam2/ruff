
import {
    Box, Button, Center, Divider, Flex, Heading, Input, Select, Text, Hide
} from "@chakra-ui/react";
import PaySlipBottom from "../../components/atoms/PaySlipBottom";
import PaySlipMiddle from "../../components/atoms/PaySlipMiddle";
import PaySlipFolderSalaryBox from "../../components/atoms/PaySlipFolderSalaryBox";
import PaySlipLogoBox from "../../components/atoms/PaySlipLogoBox";
import PaySlipInformationEmployeeBox from "../../components/atoms/PaySlipInformationEmployeeBox";
import DefaultLayout from "../../components/layouts/DefaultLayout";
import { useQuery, useMutation } from "@apollo/client";
import { GET_ALL_PERSONNEL_BY_ID,
  GET_ALL_SALAIRE_BY_ID,
   GET_Category_Personnel_BY_ID, GET_Category_Personnel_ID} from "../../graphql/Queries";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { CREATE_SALAIRE } from "../../graphql/Mutation";
import { useToast } from "@chakra-ui/react";
import Routes from "../../modules/routes";
import Link from "next/link";

const PaySlip = () => {

  const router = useRouter();
  const toast = useToast();



  //information du personnel par son ID

    const {data:dataPersonnelId, error} = useQuery(GET_ALL_PERSONNEL_BY_ID,
      {
        variables:{ id: router.query.id}
      })


  // recupere l'ID de la categorie associee a un personnel

    const {data:dataCategorieId} = useQuery(GET_Category_Personnel_ID,
     {
        variables:{ personnelid: router.query.id}
     })

// information de la categorie associee au personnel

    const {data:dataCategorie} = useQuery(GET_Category_Personnel_BY_ID,
    {
        variables:{ id: dataCategorieId?.findCategoriepersonnelbypersonnel}
    })


//recupere tout les noms et montant des primes d'un personnel

    const {data:dataPrimePersonnel} = useQuery(GET_PRIME_PERSONNEL,
  {
    variables:{ personnelid: router.query.id}
  });

  //recupere tout les noms et montant des retenues d'un personnel

    const {data:dataRetenuePersonnel} = useQuery(GET_RETENUE_PERSONNEL,
  {
    variables:{ personnelid: router.query.id}
  });

//recupere tout les mois de salaire d'un personnel

    const {data:dataMoisSalaire , loading} = useQuery(GET_ALL_MONTH_SALARY,
  {
    variables:{ personnelid: router.query.id}
  });


  const personnelId = dataPersonnelId?.findOnePersonnel.id ;
  const montant = dataCategorie?.findOneCategoriepersonnel.montant;

  const [moisPaie, setMoisPaie] = useState("");
  const [jourPaie , setJourPaie] = useState("");
const [isMonthUnavailable, setIsMonthUnavailable] = useState(false);

  const [createSalaire] = useMutation(CREATE_SALAIRE);

  
    const moisPayes = []
    
  const loadMoisPayes = () => {
    dataMoisSalaire?.PersonnelMonthSalary.map((item) => { 
            moisPayes.push(
              {
                value: item

              }
            )
          })

  }
    console.log("dataMoisSalaire")
  console.log(dataMoisSalaire?.PersonnelMonthSalary)
  console.log(moisPayes)
  console.log(moisPayes.includes(moisPaie.toLowerCase()))





// ...

const unavailableMonths = useMemo(
  () =>
    dataMoisSalaire?.PersonnelMonthSalary.map((paidMonth) => {
      const [year, month] = paidMonth.split('-');
      return new Date(year, month - 1, 1);
    }),
  [dataMoisSalaire?.PersonnelMonthSalary]
);

 console.log(unavailableMonths)





// const linkPersonnelPaySlip = () =>{
//   return (<Link></Link>)
// }
  const HandleClick = async (event) => {
    event.preventDefault();
    const salaireData = await createSalaire({
          variables:{
          input: { 
            personnelId: personnelId,
            montant: parseInt(montant),
            payer: true,
            moisPaie: moisPaie, 
            jourPaie: jourPaie
          }
        }
      })
      // router.push({
      //   pathname: Routes.Bulletin?.path || '',
      //   query: {id: router.query.id}
      // })


    console.log(salaireData)

    toast({
      title: "Succès.",
      description: "Ce personnel a été payé .",
      status: "success",
      duration: 3000,
      isClosable: true,
    });

    router.push({
                  pathname: Routes.Bulletin?.path || '',
                  query: {id: router.query.id}
                })

        setMoisPaie("");
  }

    useEffect(() =>{
      loadMoisPayes()
      console.log(dataPersonnelId?.findOnePersonnel)

   }, [dataMoisSalaire?.PersonnelMonthSalary]);

const handleMonthChange = (e) => {
  const { value } = e.target;
  setMoisPaie(value);
  const selectedMonth = new Date(value);
  if(!loading){
    if(!unavailableMonths){
      
      const isMonthUnavailable = false
    }else{
  const isMonthUnavailable = unavailableMonths.some(
    (unavailableMonth) =>
      unavailableMonth.getFullYear() === selectedMonth.getFullYear() &&
      unavailableMonth.getMonth() === selectedMonth.getMonth()
  );}}
  setIsMonthUnavailable(isMonthUnavailable);
};

// ...

const monthOptions = useMemo(() => {
  const today = new Date();
  const startMonth = new Date(today.getFullYear(), today.getMonth() - 3, 1);
  const endMonth = new Date(today.getFullYear(), today.getMonth() + 3, 1);
  const options = [];
  let currentMonth = startMonth;

   if (!unavailableMonths) {
    // Si le tableau est vide, ajouter les options pour les 7 mois autour du mois actuel
    for (let i = -3; i <= 3; i++) {
      const date = new Date(today.getFullYear(), today.getMonth() + i, 1);
      const year = date.getFullYear();
      const month = (date.getMonth() + 1).toString().padStart(2, '0');
      const optionValue = `${year}-${month}`;
      const monthName = date.toLocaleString('default', { month: 'long' });
      options.push(
        <option key={optionValue} value={optionValue}>
          {`${monthName} ${year}`}
        </option>
      );
    }
  }

  while (currentMonth < endMonth) {


    const year = currentMonth.getFullYear();
    const month = (currentMonth.getMonth() + 1).toString().padStart(2, '0');
    const optionValue = `${year}-${month}`;

    
    if(!loading){
    const isUnavailable = unavailableMonths.some(
      (unavailableMonth) =>
        unavailableMonth.getFullYear() === currentMonth.getFullYear() &&
        unavailableMonth.getMonth() === currentMonth.getMonth()
    );
    if (!isUnavailable) {
      const monthName = currentMonth.toLocaleString('default', { month: 'long' });
      options.push(
        <option key={optionValue} value={optionValue}>
          {`${monthName} ${year}`}
        </option>
      );
    } 
  
  }
    currentMonth = new Date(year, currentMonth.getMonth() + 1, 1);
  }
  return options;
}, [unavailableMonths]);

// const monthOptions = useMemo(() => {
//   const today = new Date();
//   const startMonth = new Date(today.getFullYear(), today.getMonth() - 3, 1);
//   const endMonth = new Date(today.getFullYear(), today.getMonth() + 6, 1);
//   const options = [];
//   let currentMonth = startMonth;

//    if (!unavailableMonths) {
//     // Si le tableau est vide, ajouter les options pour les 7 mois autour du mois actuel
//     for (let i = -3; i <= 3; i++) {
//       const date = new Date(today.getFullYear(), today.getMonth() + i, 1);
//       const year = date.getFullYear();
//       const month = (date.getMonth() + 1).toString().padStart(2, '0');
//       const optionValue = `${year}-${month}`;
//       const monthName = date.toLocaleString('default', { month: 'long' });
//       options.push(
//         <option key={optionValue} value={optionValue}>
//           {`${monthName} ${year}`}
//         </option>
//       );
//     }
//   }

//   while (currentMonth < endMonth) {


//     const year = currentMonth.getFullYear();
//     const month = (currentMonth.getMonth() + 1).toString().padStart(2, '0');
//     const optionValue = `${year}-${month}`;


// if (loading) return <Text>Chargement en cour...</Text>

    return ( 

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
          mb='10px'
        >
          <Heading
            textAlign="center"
            color="WindowText"
            size="lg"
            textColor="pink.300"
          >
            Formulaire de paie de salaire
          </Heading>
          <Hide below="sm">
            <Text>Dashboad / Salaires / Paiement</Text>
          </Hide>
        </Flex>
          
        <Flex 
          bg='#5755c1' 
          width='1000px' 
          h='80px' 
          margin="0 auto" 
          pb='20px'
          mt="50px"
          text-align="center"
          rounded={'7px'}
     
        > 
        <Center w='full'>
          
               {dataPersonnelId?.findOnePersonnel.sexe.toLowerCase() === "homme" ? 
                 <Avatar
                  size="xl"
                  mt={["10px","10px", "10px" ]}
                  src="https://img.freepik.com/vecteurs-premium/profil-avatar-homme-icone-ronde_24640-14044.jpg?w=2000"
                />
             :
                <Avatar
                  size="xl"
                  mt={["10px","10px", "10px" ]}
                  src="https://img.freepik.com/premium-vector/woman-avatar-profile-round-icon_24640-14042.jpg?size=626&ext=jpg"
                /> }
                 </Center>
                 <Heading  mr='20px'  textAlign="center" 
                fontSize="2xl" 
                m={["8px", "8px", "8px"]}>
                        {dataPersonnelId?.findOnePersonnel.firstName.charAt(0).toUpperCase()+dataPersonnelId?.findOnePersonnel.firstName.substring(1) +' '+ dataPersonnelId?.findOnePersonnel.lastName.charAt(0).toUpperCase()+dataPersonnelId?.findOnePersonnel.lastName.substring(1)}
                        </Heading>
                <Box width='50%'
    margin="0 auto">  

                <Flex gap={20}>
                  <Text>Fonction :</Text>
                  <Text fontWeight={'bold'}>{dataPersonnelId?.findOnePersonnel.fonction}</Text>
                </Flex>
                <Flex>
                  <Text>Mois de salaire :</Text>
                  <Text></Text>
                </Flex>
                
                <Box>
                  <Text>PRIMES SALARIALES</Text>
                  {dataPrimePersonnel && 
                 (dataPrimePersonnel?.primesETnomprimepersonnel.map((prime) =>(
                   <Flex>{prime[0]}
                    
</Flex>
                 )) )
                    
                  }
                </Box>
                <Flex>
                  <Text>RETENUES</Text>
                  <Text></Text>
                </Flex>
                <Flex>
                  <Text></Text>
                  <Text></Text>
                </Flex>
                <Flex>
                  <Text></Text>
                  <Text></Text>
                </Flex>
                
                
                
                </Box>
                </Flex>
             
        {/* <Flex 
        <Flex 
          p="1.5em" 
          textAlign="center" 
          ml='20px' 
          gap={6} 
          margin="0 auto" 
        >
          <Flex gap='3px'>
            <Text 
              color='#9490c9' 
              fontWeight={'bold'}
            >
              Noms & prénoms de l'employé :
            </Text>
            <Text color='white'>
              {dataPersonnelId?.findOnePersonnel.firstName +' '+ dataPersonnelId?.findOnePersonnel.lastName}
            </Text>
          </Flex>
          <Flex gap='3px'>
            <Text 
              color='#9490c9' 
              fontWeight={'bold'}
            >Fonction :
            </Text>
            <Text color='white'>
              {dataPersonnelId?.findOnePersonnel.fonction}
            </Text>
          </Flex>
        </Flex>
        </Flex>

{/* //informaton salaire et mois */}
      <Center>
        <Flex 
          mt="20px"
          gap={7}
        > 
         <Box width={'340px'} gap={7} as={"form"}
            onSubmit={HandleClick}
         >
          <Text fontSize='sm'> Salaire Mois</Text>
              {/* <Input
                    placeholder="nom prime"
                    bg='white'
                    type="month"
                    name="dateOfPrime"
                    rounded={2}
                    onChange={handleMoisPaieChange}
                    isDisabled={dataMoisSalaire?.PersonnelMonthSalary.includes(moisPaie)}
                    value={moisPaie}
                    
                  /> */}
                  <Select
                  
        bg='white'         
        id="moisPaie"
        name="moisPaie"
        value={moisPaie}
        onChange={handleMonthChange}
      >
        <option value="">Sélectionnez un mois</option>
        {monthOptions}
      </Select>
      {isMonthUnavailable && <p>Le mois sélectionné a déjà été payé.</p>}
   
                  {console.log(moisPaie)}
                  
                      <Input
                    placeholder="nom prime"
                    bg='white'
                    type="date"
                    rounded={2}
                    name="dateOfPrime"
                    mt={'8px'}
                    onChange={(event) => setJourPaie(event.target.value)}
                    value={jourPaie}
                    
                  />
                  
                   {console.log(jourPaie)}
                  </Box>
        </Flex>
      </Center>
       <Box 
        mx='100px' 
        pb={'20px'} 
        mt='20px'
       >
          <Divider />
        </Box>
             <Center>
          <Button 
            disabled={!moisPaie} 
            type="submit" 
            color='white' 
            bg='#eb808a' 
            variant='solid'
            mx='auto' 
            my='auto'
          >
            Soumettre  
           </Button>
        </Center>
      </Box>

    </DefaultLayout>
)};
     

 
export default PaySlip; 

//   voici ma parselle de code

// const moisPayes = [];
//   const [personnelId , setPersonnelId] = useState("");
//   const montant = dataCategorie?.findOneCategoriepersonnel.montant;
//   const [moisPaie, setMoisPaie] = useState("");
//   const [jourPaie , setJourPaie] = useState("");
//   const [createSalaire] = useMutation(CREATE_SALAIRE);
  


//   const handleMoisPaieChange = (event) => {
//     const selectedMonth = event.target.value;
//     if (!moisPayes.includes(selectedMonth)) {
//       setMoisPaie(selectedMonth);
//     }
//   };
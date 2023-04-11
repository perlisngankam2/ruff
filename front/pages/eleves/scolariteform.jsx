import { Box, Heading } from "@chakra-ui/react";
import SearchBar from "../../components/atoms/searchbar";
import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogContent,
  AlertDialogOverlay,
  useDisclosure,
  Button,
 
  Flex,
  Input,
  Select,
  Spacing,
  Text,
  FormControl,
  FormLabel,
  extendTheme 
} from '@chakra-ui/react';
import React from "react";

import Link from "next/link";

function Finances  () {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const cancelRef = React.useRef()
  return (
    <DefaultLayout>
      <Box p="3" pt="70px">
        <Heading>Finances</Heading>
        <SearchBar/>
        <Box>
          {/* <Button colorScheme='red' onClick={onOpen}>
            valider
          </Button> */}
          <AlertDialog
            isOpen={isOpen}
            leastDestructiveRef={cancelRef}
            onClose={onClose}
            size='xl'
          >
            <AlertDialogOverlay >
              <AlertDialogContent  >
                <AlertDialogHeader fontSize='sm' fontWeight='base' mt='0'>
                <Box  bg={"colors.secondary"} borderBottomRightRadius={10} borderBottomLeftRadius={10}>
                  <Heading as='h4' textAlign={'center'} fontSize={['15px','20px','26px']} p='2' >
                      
                          Groupe Scolaire Bilingue Awono Bilongue
                  </Heading>
                </Box>
                </AlertDialogHeader>
                <AlertDialogBody>
                <Box >
                    <Flex gap={5} flexWrap={['wrap','wrap','nowrap']} align='end' >
                        <FormControl>
                            <FormLabel>Matricule</FormLabel>
                        <Input type={'text'} ></Input>
                        </FormControl>

                        <FormControl>
                            <FormLabel>Classe</FormLabel>
                        <Select>
                            <option>cm2</option>
                            <option>cm1</option>
                            <option>ce2</option>
                        </Select>
                        </FormControl>
                    </Flex>
                </Box>

                <Box mt='4'>
                        <Flex align='end'>
                            <FormControl>
                                <FormLabel>Nom et prenom</FormLabel>
                                <Input type={'text'} ></Input>
                            </FormControl>
                        </Flex>
                      
                </Box>
                <Box mt='4'>
                    <Flex gap={5} flexWrap={['wrap','wrap','nowrap']} align='end'>
                        <FormControl>
                                <FormLabel>Nom du Remettant</FormLabel>
                            <Select>
                                <option>Tranche 1</option>
                                <option>Tranche 2</option>
                                <option>Tranche 3</option>
                            </Select>
                        </FormControl>

                        <FormControl>
                                <FormLabel>tel du Remettant</FormLabel>
                            <Input type={'tel'} ></Input>
                        </FormControl>
                    </Flex>
                </Box>
                <Box mt='4'>
                    <Flex gap={5} flexWrap={['wrap','wrap','nowrap']} align='end'>
                        <FormControl>
                                <FormLabel>versement</FormLabel>
                                <Input type={'number'} ></Input>
                            
                        </FormControl>

                        <FormControl>
                                <FormLabel>Delai</FormLabel>
                                <Input type={'date'} ></Input>
                            
                        </FormControl>

                        <FormControl>
                                <FormLabel>reste</FormLabel>
                            <Input type={'number'}  textColor={'red.300'}></Input>
                        </FormControl>
                    </Flex>
                </Box>
                </AlertDialogBody>

                <AlertDialogFooter>
                  <Button ref={cancelRef} onClick={onClose} colorScheme='red' >
                    annuler
                  </Button>
                <Link href={'#'}>
                    <Button colorScheme='green'  ml={3}>
                      payer
                    </Button>
                  </Link> 
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialogOverlay>
          </AlertDialog>
        </Box>
      </Box>
    </DefaultLayout>
    



    );
  }
export default Finances



// const tranches = []
//         const loadTranches = () => {
//           dataTranchePension?.findAlltranche?.map((item , index) => { 
//             tranches.push(
//               {
//                 label: item?.name,
//                 value: item?.id
//               }
//             )
//           })
//         }

//         useEffect(() =>{
//           loadTranches();
//         })

    //     </FormLabel>
    //     <Selects
    //       name="trancheId"
    //       isMulti
    //       value={selectedTranches}
    //       // onChange={(event) => setTrancheId(event.target.value)}
    //       // options={tranches}
    //       placeholder={"Motif"}
    //       // value={trancheId} 
    //       // onChange={handleTrancheSelect}
    //     >
    //        {tranches.map((tranche) => (
    //           <option key={tranche?.value} value={option.value}>
    //             {tranche?.label}
    //           </option>
    //         ))}
    //     </Selects>
    // </FormControl>





  //   const tranches = dataTranchePension?.findAlltranche?.map((tranche) =>
  //   ( {
  //        label: tranche?.name,
  //        value: tranche?.id
  //    })
  //  )

   // const handleTrancheSelect = (selectedTranches) => {
   //   setSelectedTranches(selectedTranches?.map((tranche) => tranche.value));
   // };

  // const [selectedTranches, setSelectedTranches] = useState([]); 

//   <FormControl>
//   <FormLabel>
//     Motif
//   </FormLabel>
//     <Select
//       name="trancheId"
//       ismulti
//       value={selectedTranches}
//       // onChange={(event) => setTrancheId(event.target.value)}
//       // options={tranches}
//       placeholder={"Motif"}
//       // value={trancheId} 
//       onChange={(value) => handleTrancheSelect(value)}
//     >
//        {tranches.map((tranche) => (
//           <option key={tranche.value} value={tranche.value}>
//             {tranche.label}
//           </option>
//         ))}
//     </Select>
// </FormControl>



// const addAvanceTranche = async() => {
//   console.log(montant)
//   console.log(selectedTranches)
//   console.log(dataStudentId?.findOnestudent.id)
//   // if(montant <= dataTranchePension.findAlltranche.montant[0])
//   selectedTranches.map(tranche=> {
//   // const datas = dataTranchePension?.findAlltranche.map((tranche)=> tranche.montant)
//   let montantResant 
//   for(let i =0; i<selectedTranches.length[i]; i++)
//   const trancheSelected = selectedTranches[i];
//     if(montant <= datas){
//       //je dois comparer sa au reste
//       // console.log(`Le montant payé (${montant}) est supérieur au montant de la tranche (${tranche.montant})`);
//       alert('le montant:' + montant + 'est superieure au montant de:' + tranche.label )
//       // Afficher un message d'erreur
//     }if (montant > datas)
//     //si c'est inferieur ou egale et qu'on a fait deux select, on envoir a la premiere tranche.
//     //si le montant est superieur au reste de la premiere tranche et qu'on a fait deux select,
//     //on envoi le montant que doit avoir la premier tranche a lui meme, 
//     //on recuperer le surplu et on envoi a la tranche suivante ainsi de suite re 
//     //sa recupere le montant entre sa compar
//     {  
//       createFeesAvanceTranche({
//         variables: {
//           avancetranche:{
//             // trancheStudentId: "",
//             montant: parseInt(montant),
//             trancheId: tranche.value,
//             tranchestudentinput: {
//               studentId: dataStudentId?.findOnestudent.id,
//               name: "",
//               description: "",
//               montant : 0
//             }
//           }
//         }
//       })}



// const addAvanceTranche = async() => {
//   console.log(montant)
//   console.log(selectedTranches)
//   console.log(dataStudentId?.findOnestudent.id)
//   // if(montant <= dataTranchePension.findAlltranche.montant[0])
//   const pension = dataClasse?.findAllsalle[0]?.montantPensionSalle
//   let totalTrancheSelectionner = 0
//   selectedTranches.forEach((tranche, index) => {
//     // console.log(getTrancheById(tranche.value));
//       totalTrancheSelectionner += getTrancheById(tranche.value)?.montant
//   })
//   console.log("pension",pension);
//   console.log("pension sel",totalTrancheSelectionner);
//   if(totalTrancheSelectionner >= pension) {
//     let temp = montant
//     selectedTranches.map(tranche=> {
//       const mont = getTrancheById(tranche.value)?.montant
//       temp = temp - mont
//       console.log(temp)
//       setMontant(temp)
//       createFeesAvanceTranche({
//         variables: {
//           avancetranche:{
//             // trancheStudentId: "",
//             montant: mont,
//             trancheId: tranche.value,
//             tranchestudentinput: {
//               studentId: dataStudentId?.findOnestudent.id,
//               name: "",
//               description: "",
//               montant : 0
//             }
//           }
//         }
//       })
//     })
//     toast({
//       title: "paiement tranche pension.",
//       description: " paye avec succes.",
//       status: "success",
//       duration: 3000,
//       isClosable: true,
//     });
//     setMontant(0);

//   } else if(totalTrancheSelectionner < pension) {

//   }
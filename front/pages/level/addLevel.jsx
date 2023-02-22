import {
    Box,
    Button,
    Center,
    Flex,
    FormControl,
    FormLabel,
    Heading,
    HStack,
    Input,
    Select,
    Stack,
    VStack,
    useToast
  } from "@chakra-ui/react";
  import { useRouter } from "next/router";
  import { useEffect ,useState } from "react";
  import { useMutation, useQuery } from "@apollo/client";
  import { MdDescription } from "react-icons/md";
  import DefaultLayout from "../../components/layouts/DefaultLayout";
  import { CREATE_STUDY_LEVEL} from "../../graphql/Mutation";
//   import { GET_ALL_SECTION , GET_ALL_CYCLE} from "../../graphql/Queries";
  
  const AddLevel = () => {
  
    const toast = useToast();
    const router = useRouter();
    const teachers = ["Ryan Jones", "Illary Daenarys ", "Julian Clinton"];
    const [name, setName] = useState();
    const [montantPension, setMontantPension] = useState();

    const [createStudyLevel] = useMutation(CREATE_STUDY_LEVEL)
    // const [createSalle] = useMutation(CREATE_SALLE);
    // const {data:dataSection} = useQuery(GET_ALL_SECTION);
    // const {data:dataCycle} = useQuery(GET_ALL_CYCLE);
  
    // const bb = parseInt(montantPension)
    // // console.log(parseFloat(montantPension))
    // console.log(typeof bb)
    
    let input;
    
    // const addSalle = (event) => {
    // console.log('vdw')
    // }
      
    // if (loading) return "creation en cour..."
    // if(error)  return "erreur! ${error.message}";
    
   
    // useEffect(() => {
    //   console.log(dataSection?.findAllsection)
    //   console.log("j")
    //   console.log(dataCycle?.findAllcycle)
    // }, [dataSection])
    
    const  addStudyLevel = async (event, value) => {
      event.preventDefault();
  
      console.log(name);
      console.log(montantPension)
  
       await createStudyLevel({
          variables: {
            niveauEtude: {
                  name: name,
                  montantPension: parseInt(montantPension)
              }
          }
      })
      console.log(cycleData)
      toast({
        title: "Creation d'un niveau d'etude.",
        description: "Le niveau a ete créée avec succes.",
        status: "success",
        duration: 3000,
        isClosable: true,
      });
      router.push("/levelList")
  }
  
  
    return (
      <DefaultLayout>
        <Box 
          pt="70px" 
          width="full" 
          background="colors.tertiary"
        >
          <Center>
            <VStack
              gap={5}
              boxShadow="md"
              rounded="md"
              p="10"
              background="white"
              mt={10}
            >
              <Box 
                as="form"
                width="500px"
              > 
                <Heading color={"colors.primary"}>Creation d'une classe</Heading>
                <Stack
                  gap={2}
                  align="start"
                  direction={["column", "column", "column"]}
                  mt="25px"
                >
                    <FormControl>
                      <FormLabel>Nom du niveaux:</FormLabel>
                      <Input 
                        placeholder="Nom du niveaux" 
                        type="text"
                        // maxW="300px"
                        name="name"
                        value={name}
                        onChange = {(event) => setName(event.target.value)}
                      />
                    </FormControl>
                    <FormControl mt="15px">
                        <FormLabel>Pension</FormLabel>
                       <Input
                         type={"number"}
                         name="montantPension"
                         value={montantPension}
                         placeholder="Montant de la pension"
                         onChange ={(event) => setMontantPension(event.target.value)}
                       />
                    </FormControl>
                    {/* <FormControl mt="15px">
                        <FormLabel>Classe</FormLabel>
                        <Select 
                          id="cycle"
                          name="classId"
                          placeholder="Cycle"
                          minW="300px"
                          onChange = {(event) => setCLassId(event.target.value)}
                          value={classId}
                        > */}
                            {/* {dataCycle &&(
                                dataCycle.findAllcycle.map((cycle, index) => ( 
                                    <option key={index}>
                                        <option>{cycle.name}</option>
                                    </option>
                                ))
                            )} */}
                        {/* </Select>
                    </FormControl> */}
                    <Flex gap={5} pt="30px">
                      <Button colorScheme="red" onClick={() => router.back()}>
                        Annuler
                      </Button>
                      <Button
                        colorScheme="green"
                        onClick={addStudyLevel}
                      >
                        Creer
                      </Button>
                    </Flex>
                </Stack>
              </Box>
            </VStack>
          </Center>
        </Box>
      </DefaultLayout>
    );
  };
  
  export default AddLevel;
  
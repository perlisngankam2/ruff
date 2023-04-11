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
  import {
     CREATE_STUDY_LEVEL,
     UPDATE_LEVEL 
    } from "../../graphql/Mutation";
  import {GET_ALL_CYCLE, GET_ALL_STUDY_LEVEL, GET_LEVEL_BY_ID} from "../../graphql/Queries";
//   import { GET_ALL_SECTION , GET_ALL_CYCLE} from "../../graphql/Queries";
  
  const AddLevel = () => {
  
    const toast = useToast();
    const router = useRouter();
    const teachers = ["Ryan Jones", "Illary Daenarys ", "Julian Clinton"];
    // const [name, setName] = useState();
    // const [montantPension, setMontantPension] = useState();
    // const [cycleId, setCycleId] = useState("");
    const [level , setLevel] = useState({
      name: "",
      montantPension: "",
      cycleId: ""
    })
    const [createStudyLevel] = useMutation(CREATE_STUDY_LEVEL)
    // const [createSalle] = useMutation(CREATE_SALLE);
    // const {data:dataSection} = useQuery(GET_ALL_SECTION);
    const {data:dataCycle} = useQuery(GET_ALL_CYCLE);
    const [updateStudyLevel] = useMutation(UPDATE_LEVEL)

    const {data:dataLevelById} = useQuery(GET_LEVEL_BY_ID, {
      variables: {
        id: router.query.id
      }
    });
  
    // const bb = parseInt(montantPension)
    // // console.log(parseFloat(montantPension))
    // console.log(typeof bb)
    
    let input;
    
    // const addSalle = (event) => {
    // console.log('vdw')
    // }
      
    // if (loading) return "creation en cour..."
    // if(error)  return "erreur! ${error.message}";
    
    useEffect(() => {
      // console.log(dataSection?.findAllsection)
      console.log("j")
      console.log(dataCycle?.findAllcycle)
      if(router.query.id) {
        const data = dataLevelById?.niveaEtude
        if(data) {
          setLevel({
            name: data.name,
            montantPension: data.montantPension,
            cycleId: data.cycleId,
          })
        }
      }
    }, [dataCycle, dataLevelById])
    
    const  addStudyLevel = async (event, value) => {
      event.preventDefault();

      if(!router.query.id) {
        await createStudyLevel({
           variables: {
             niveauEtude: {
                   name: level.name,
                   montantPension: parseInt(level.montantPension),
                   cycleId: level.cycleId
               }
           },
           refetchQueries:[{
             query: GET_ALL_STUDY_LEVEL
           }]
       })
       toast({
         title: "Creation d'un niveau d'etude.",
         description: "Le niveau a ete créée avec succes.",
         status: "success",
         duration: 3000,
         isClosable: true,
       });
      } else {
        console.log('Update error : ' , level);
        await updateStudyLevel({
          variables: {
            id: router.query.id,
            input: {
              name: level.name,
              montantPension: parseInt(level.montantPension),
              cycleId: level.cycleId
            }
          },
          refetchQueries:[{
            query: GET_ALL_STUDY_LEVEL
          }]
      })
      toast({
        title: "Modification d'un niveau d'etude.",
        description: "Le niveau a ete créée avec succes.",
        status: "success",
        duration: 3000,
        isClosable: true,
      });
      }
      setLevel({
        name: "",
        montantPension: 0,
        cycleId: ""
      })
      router.push("/level/levelList")
      
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
                <Heading color={"colors.primary"}>
                  Creation d'un niveau d'etude
                </Heading>
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
                        value={level.name}
                        onChange = {(event) => setLevel({...level, name:event.target.value})}
                      />
                    </FormControl>
                    <FormControl mt="15px">
                        <FormLabel>Pension</FormLabel>
                       <Input
                         type={"number"}
                         name="montantPension"
                         value={level.montantPension}
                         placeholder="Montant de la pension"
                         onChange ={(event) => setLevel({...level,montantPension:event.target.value})}
                       />
                    </FormControl>
                    <FormControl mt="15px">
                        <FormLabel>Cycle</FormLabel>
                        <Select 
                          name="cycleId"
                          placeholder="Cycle"
                          minW="300px"
                          onChange = {(event) => setLevel({...level,cycleId:event.target.value})}
                          value={level.cycleId}
                        >
                         {dataCycle &&(
                                dataCycle.findAllcycle.map((cycle, index) => ( 
                                    <option selected={level.cycleId == cycle.id ? "selected": ''} value={cycle.id}  key={index}>
                                        {cycle.name} { console.log(level.cycleId + " -- " +cycle.id) }
                                    </option>
                                ))
                            )} 
                        </Select>
                    </FormControl> 
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
  
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
import { CREATE_SALLE} from "../../graphql/Mutation";
import { 
  GET_ALL_SECTION , 
  GET_ALL_CYCLE, 
  GET_ALL_STUDY_LEVEL, 
  GET_ALL_CLASS,
}  from "../../graphql/Queries";

const AddClass = () => {

  const toast = useToast();
  const router = useRouter();
  const teachers = ["Ryan Jones", "Illary Daenarys ", "Julian Clinton"];
  const [name, setName] = useState();
  const [section, setSection] = useState();
  const [niveauEtudeId, setNiveauEtudeId] = useState("");
  const [cycleId, setCycleId] = useState("");
  const [montantPensionSalle, setMontantPensionSalle] = useState();
  const [createSalle] = useMutation(CREATE_SALLE);
  const {data:dataSection} = useQuery(GET_ALL_SECTION);
  const {data:dataStudyLevel} = useQuery(GET_ALL_STUDY_LEVEL);
  const {data:dataCycle} = useQuery(GET_ALL_CYCLE);

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
    console.log(dataStudyLevel?.findAllNiveauEtude)
  }, [dataSection])
  
  const  addClasse = async (event, value) => {
    event.preventDefault();
    console.log('cccc');

    console.log(name);
    console.log(section);
    console.log(cycleId);
    console.log(montantPensionSalle);
    console.log(niveauEtudeId);

    const cycleData = await createSalle({
        variables: {
            salle: {
              name: name,
              niveauEtudeId: niveauEtudeId,
              cycleId: cycleId,
              montantPensionSalle: parseInt(montantPensionSalle)
            }
        },
        refetchQueries:[{
          query: GET_ALL_CLASS
        }]
    })
    console.log(cycleData)
    toast({
      title: "Creation d'une classe.",
      description: "La classe a ete créée avec succes.",
      status: "success",
      duration: 3000,
      isClosable: true,
    });
    router.push("/class")
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
              <Heading 
                color={"colors.primary"}
                textAlign={"center"}
              >
                Creation d'une classe
              </Heading>
              <Stack
                gap={2}
                align="start"
                direction={["column", "column", "column"]}
                mt="25px"
              >
                  <FormControl>
                    <FormLabel>Nom de la classe:</FormLabel>
                    <Input 
                      placeholder="Nom de la classe" 
                      type="text"
                      // maxW="300px"
                      name="name"
                      value={name}
                      onChange = {(event) => setName(event.target.value)}
                    />
                  </FormControl>
                  <FormControl>
                    <FormLabel>Montant pension:</FormLabel>
                    <Input 
                      placeholder="Valeur de la pension" 
                      type="number"
                      // maxW="300px"
                      name="montantPensionSalle"
                      value={montantPensionSalle}
                      onChange = {(event) => setMontantPensionSalle(event.target.value)}
                    />
                  </FormControl>
                  <FormControl mt="15px">
                      <FormLabel>Niveau d'etude</FormLabel>
                      <Select 
                        id="cycle"
                        name="niveauEtudeId"
                        placeholder="Nom"
                        minW="300px"
                        onChange = {(event) => setNiveauEtudeId(event.target.value)}
                        value={niveauEtudeId}
                      >
                          {dataStudyLevel &&(
                              dataStudyLevel.findAllNiveauEtude.map((niveauEtude, index) => ( 
                                  <option value={niveauEtude.id} key={index}>
                                    {niveauEtude.name}
                                  </option>
                              ))
                          )}
                      </Select>
                  </FormControl> 
                  <FormControl mt="15px">
                      <FormLabel>Cycle</FormLabel>
                        <Select 
                          name="cycleId"
                          placeholder="Cycle"
                          minW="300px"
                          onChange = {(event) => setCycleId(event.target.value)}
                          value={cycleId}
                        >
                         {dataCycle &&(
                                dataCycle.findAllcycle.map((cycle, index) => ( 
                                    <option value={cycle.id} key={index}>
                                        {cycle.name}
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
                      onClick={addClasse}
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

export default AddClass;

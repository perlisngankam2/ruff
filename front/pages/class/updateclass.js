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
  } from "@chakra-ui/react";
  import { useRouter } from "next/router";
  import { useEffect ,useState } from "react";
  import { useMutation, useQuery } from "@apollo/client";
  import { MdDescription } from "react-icons/md";
  import DefaultLayout from "../../components/layouts/DefaultLayout";
  import { CREATE_SALLE, UPDATE_CLASS} from "../../graphql/Mutation";
  import { GET_ALL_SECTION , GET_ALL_CYCLE} from "../../graphql/Queries";
  

  const UpdateClass = () => {
    const router = useRouter();
    const teachers = ["Ryan Jones", "Illary Daenarys ", "Julian Clinton"];
    const [name, setName] = useState();
    const [section, setSection] = useState();
    const [cycle, setCycle] = useState();
  
    const [createSalle] = useMutation(CREATE_SALLE);
    const {data:dataSection} = useQuery(GET_ALL_SECTION);
    const {data:dataCycle} = useQuery(GET_ALL_CYCLE);
    const [editClass] = useMutation(UPDATE_CLASS);

    let input;
    
    const updateClass = async () => {
        await editClass({
            variables:{
                nom: name,
                section: section,
                cycle: cycle
            }
        })
    }
    // const addSalle = (event) => {
    // console.log('vdw')
    // }
      
    // useEffect(() => {
    //   console.log(dataSection?.findAllsection)
    //   console.log("j")
    //   console.log(dataCycle?.findAllcycle)
    // }, [dataSection])
    
//     const  addClasse = async (event, value) => {
//       event.preventDefault();
//       console.log('cccc');
  
//       console.log(name);
//       console.log(section);
//       console.log(cycle)
  
//       const cycleData = await createSalle({
//           variables: {
//               salle: {
//                   name: name,
//                   section: section,
//                   cycle: cycle
//               }
//           }
//       })
//       console.log(cycleData)
//   }
  
  
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
                onSubmit={(event) => {
                  event.preventDefault();
                  createSalle({
                    variables: {
                      name: input.value,
                      description: input.value,
                      effectif: input.value
                    }
                  })
                  console.log(SalleData)
                }}
              > 
                <Heading color={"colors.primary"}>Creation d'une classe</Heading>
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
                        onChange = {(e) => setName(e.target.value)}
                      />
                    </FormControl>
                    <FormControl mt="15px">
                        <FormLabel>Section</FormLabel>
                        <Select 
                          id="section"
                          name="section"
                          placeholder="Section"
                          minW="300px"
                          onChange = {(event) => setSection(event.target.value)}
                          value={section}
                        >
                            {dataSection &&(
                                dataSection.findAllsection.map((section, index) => ( 
                                    <option key={index}>
                                        <option>{section.name}</option>
                                    </option>
                                ))
                            )}
                        </Select>
                    </FormControl>
                    <FormControl mt="15px">
                        <FormLabel>Cycle</FormLabel>
                        <Select 
                          id="cycle"
                          name="cycle"
                          placeholder="Cycle"
                          minW="300px"
                          onChange = {(event) => setCycle(event.target.value)}
                          value={cycle}
                        >
                            {dataCycle &&(
                                dataCycle.findAllcycle.map((cycle, index) => ( 
                                    <option key={index}>
                                        <option>{cycle.name}</option>
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
                        // onClick={() => router.push("/class")}
                        onClick={updateClass}
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
  
  export default UpdateClass;
  
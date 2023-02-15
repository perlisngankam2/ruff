import { AddIcon, SearchIcon } from "@chakra-ui/icons";
import {
  Box,
  Button,
  ButtonGroup,
  IconButton ,
  Center,
  Flex,
  Heading,
  Hide,
  Input,
  InputGroup,
  InputRightAddon,
  Select,
  Table,
  TableContainer,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr,
  Link,
  Icon,
  AlertDialogFooter,
  AlertDialogBody,
  AlertDialog,
  useDisclosure,
  AlertDialogContent,
  AlertDialogOverlay,
  AlertDialogHeader,
  AlertDialogCloseButton,
  FormControl,
  FormLabel
} from "@chakra-ui/react";

import DefaultLayout from "../../components/layouts/DefaultLayout";
import React, { useEffect, useState, useContext } from "react";
import { Router, useRouter } from "next/router";
import { GlobalContext } from "../../contexts/cyclesection/AppContext";
import {IoIosAdd} from "react-icons/io"

const Pension = () => {

    // const router = useRouter();
    const [query , setQuery] = useState("");
    const [anneeAcademique, setAnneeAcademique] = useState("");
    // const [cycle, setCycle] = useState();
    // const [name, setName] = useState("");
    // const [section, setSection] = useState("");
    // const search = (data) => {
    //   let datas = data.filter((item) => keys.some((key) => (
    //     item[key].toUpperCase().includes(query) 
    //     )
    //   ));
    //   console.log("datas :" , datas)
    //   return query ? datas.slice(0,5) : Users.slice(0,5)
    // };
   
    // const {data} = useQuery(GET_ALL_SECTION);
    // const{data:dataCycle} = useQuery(GET_ALL_CYCLE);
    // const [id, setId] = useState(null)
    // const [deleteSection ]= useMutation(DELETE_SECTION);
    // const [deleteCycle] = useMutation(DELETE_CYCLE);
    // const{ data:dataDetailsCycle} = useQuery(GET_ONE_CYCLE);
    // const [editCycle] = useMutation(UPDATE_CYCLE);
    // const [createCycle, {error}] = useMutation(CREATE_CYCLE);
    const { isOpen, onOpen, onClose} = useDisclosure();
    const [isformOpen, setIsFormOpen] = useState(false)
    const cancelRef = React.useRef();
    const router = useRouter();
   


  //  const defaultValues = useMemo(() =>{
  //     name =  "",
  //     section = ""
  // })


    //  useEffect (() => {
    //   console.log(data?.findAllsection);
    //   setSection(data);
    //   console.log(dataCycle?.findAllcycle)
    //   console.log("hh")
    // });

    // const removeSection = async (id) => {
    //   await deleteSection({
    //     variables: {
    //       id
    //     },
    //     refetchQueries:[{
    //       query: GET_ALL_SECTION
    //     }]

    //   })
    // }


  
  return (
    <DefaultLayout>
      <Box p="3" pt={"80px"} w="full">
        <Flex
          align="center"
          justify="space-between"
          boxShadow="md"
          p="5"
          rounded="lg"
          background="white"
        >
          <Heading
            textAlign="center"
            color="WindowText"
            size="lg"
            textColor="pink.300"
          >
            Pension
          </Heading>
          <Hide below="sm">
            <Text>Dashboad / Pension/</Text>
          </Hide>
        </Flex>
        <Flex gap={10} mt={5}>
          <InputGroup>
            <Input
              placeholder="Recherchez une categorie..."
              //value={recherche}
              onChange={e => setQuery(e.target.value)}
            />
            <InputRightAddon children={<SearchIcon />} />
          </InputGroup>
          {/* <Select 
            placeholder="Selectionner la classe"
            onChange={e =>setQuery(e.target.value)}
          >
          </Select> */}
          {/* <SectionCreate/> */}
        </Flex>
        <Box mt={10}>
          <Box display={{md:"flex"}}> 
            <Heading 
               mb={5}
              size="md"
              color = "colors.quinzaine"
              
              >
                Annee academique
            </Heading>
            <Icon 
              as={IoIosAdd} 
              boxSize="30px"
              color={"colors.greencolor"}
              // _hover={bg:}
              rounded="full"
              ml={["10px", "10px", "10px" ]}
              _hover={{background:"colors.bluecolor"}}
              onClick={onOpen}
            />
          </Box>
          <AlertDialog
            motionPreset='slideInBottom'
            leastDestructiveRef={cancelRef}
            onClose={onClose}
            isOpen={isOpen}
            isCentered
          >
            <AlertDialogOverlay />
            <AlertDialogContent>
              <AlertDialogHeader
                 textAlign={"center"}
              >
                Ajoutez une anneee academique
              </AlertDialogHeader>
              <AlertDialogCloseButton />
              <AlertDialogBody>
              <Box>
                <FormControl>
                    <FormLabel>Nom</FormLabel>
                    <Input 
                        type={'text'} 
                        name="anneeAcademique"
                        placeholder="Annee academique"
                        onChange = {(event) => setAnneeAcademique(event.target.value)}
                        value={anneeAcademique}
                    />
                </FormControl>
                </Box>
              </AlertDialogBody>
              <AlertDialogFooter>
                <Button
                   ref={cancelRef} 
                   onClick={onClose}
                   colorScheme='red'
                >
                  annuler
                </Button>
                <Button colorScheme='green' ml={3}>
                  Creer
                </Button>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </Box>
        <Box width={["400px", "400px","400px"]} border="1px" borderColor={"GREEN"}>
          <TableContainer>
            <Table size='sm' variant='striped' >
              <Thead>
                <Tr>
                  <Th>Nom</Th>
                  
                </Tr>
              </Thead>
              <Tbody>
                <Tr>
                  <Td>2022-2023</Td>
                </Tr>
              </Tbody>
            </Table>
          </TableContainer>
        </Box>

        <Box mt={50}>
          <Box> 
              <Heading 
              mt={2}
                size="lg"
                textAlign={"center"}
                color = "colors.quinzaine"
                >
                  Cycles
              </Heading>
          </Box>
            
        </Box>
      </Box>
    </DefaultLayout>
  );
};

export default Pension;

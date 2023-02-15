import React from "react";
import {
  Table,
  Thead,
  Tbody,
  Tfoot,
  Tr,
  Th,
  Td,
  TableCaption,
  TableContainer,
  Text,
  Divider,
  Button,
  FormControl,
  FormLabel,
  Input,
  Select,
  Checkbox,
  Box,
  Flex,
  HStack,
  Heading,
  useColorModeValue,
  Hide,
} from "@chakra-ui/react";
import { AddIcon } from "@chakra-ui/icons";
import { type } from "os";
import DefaultLayout from "../components/layouts/DefaultLayout";

const index = () => {
  return (
    <DefaultLayout>
      <Box mx={"5"} pt="30px" w="full">
        <Box
          display={["block", "block", "flex"]}
          gap={["100", "200", "400", "600"]}
          m={"2"}
        >
          <Flex mt={"4"} display="block">
            <Heading
              as="h5"
              fontSize={{ base: "0px", md: "30px", lg: "35px", xl: "40px" }}
              textAlign="justify"
              width="100%"
            >
              <Hide below="sm"> Ajouter un professeur </Hide>
            </Heading>
            <Heading
              textColor={"red.400"}
              as="i"
              textAlign="center"
              fontSize={{ base: "10px", md: "15px", lg: "16px" }}
            >
              <Hide below="lg">
                les informations suivies d'un astérix sont obligatoires
              </Hide>
            </Heading>
          </Flex>

          <Box justifyContent={"end"} display="flex">
            <Flex mt={"5"}>
              <Button bg={"blue.400"} textColor="white">
                <AddIcon boxSize={3} color={"white"} mr="2" /> importer un
                professeur
              </Button>
            </Flex>
          </Box>
        </Box>
        <Box
          m={"2"}
          boxShadow="md"
          p="6"
          rounded="md"
          bg="white"
          borderWidth={"2px"}
          borderColor={"red.200"}
        >
          <Heading
            backgroundColor={"red.300"}
            mt={"5"}
            mb={"5"}
            as="h4"
            size={"sm"}
            color="white"
            p="1"
          >
            <Hide below="sm">Informations personnelles</Hide>
          </Heading>

          <Box>
            <Flex
              w={"full"}
              gap={"10"}
              flexWrap={["wrap", "wrap", "nowrap"]}
              align="end"
            >
              <Input type={"text"} placeholder={"Nom"} variant={"flushed"} />
              <Input type={"text"} placeholder={"Prenom"} variant={"flushed"} />
              <FormControl>
                <FormLabel /> Date de naissance
                <Input
                  type={"date"}
                  placeholder="Date de naissance"
                  variant={"flushed"}
                />
              </FormControl>

              <Select placeholder="Sexe" variant={"flushed"}>
                <option value={"Masculin"}>Masculin</option>
                <option value={"Feminin"}>Feminin</option>
              </Select>
            </Flex>
          </Box>

          <Heading
            backgroundColor={"green.300"}
            mt={"5"}
            mb={"5"}
            as="h3"
            size={"sm"}
            color="white"
            p={"1"}
          >
            <Hide below="sm">Informations professionnelles</Hide>
          </Heading>

          <Box>
            <Flex
              w={"full"}
              gap={"10"}
              flexWrap={["wrap", "wrap", "nowrap"]}
              align="end"
            >
              <FormControl>
                <FormLabel /> Date de creation
                <Input
                  type={"date"}
                  placeholder="Date de creation"
                  variant={"flushed"}
                />
              </FormControl>

              <FormControl>
                <FormLabel /> Date de prise de fonction
                <Input
                  type={"date"}
                  placeholder="Date de prise de fonction"
                  variant={"flushed"}
                />
              </FormControl>
              <Input
                type={"number"}
                placeholder="Salaire"
                variant={"flushed"}
              />
              <Input
                type={"number"}
                placeholder="Matricule"
                variant={"flushed"}
              />
              <Input type={"text"} placeholder="Fonction" variant={"flushed"} />
            </Flex>
          </Box>
          <Heading
            backgroundColor={"blue.300"}
            mt={"5"}
            mb={"5"}
            as="h3"
            size={"sm"}
            color="white"
            p="1"
          >
            <Hide below="sm">Informations complementaire</Hide>
          </Heading>
          <Box>
            <Flex w={"full"} gap={"10"} flexWrap={["wrap", "wrap", "nowrap"]}>
              <Input
                type={"tel-country-code"}
                placeholder="Telephone"
                variant={"flushed"}
              />
              <Input
                type={"number"}
                placeholder="Nombre d_enfant"
                variant={"flushed"}
              />
            </Flex>
          </Box>
          <Box>
            <Flex display={"flex"} gap="5" justifyContent="end" mt="5">
              <Button bg="red.400" color="white" borderRadius={15}>
                Annuler
              </Button>
              <Button bg="blue.400" color="white" borderRadius={15}>
                Valider
              </Button>
            </Flex>
          </Box>
        </Box>
      </Box>
    </DefaultLayout>
  );
};
export default index;

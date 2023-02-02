import { SearchIcon } from "@chakra-ui/icons";
import {
  Box,
  Center,
  Heading,
  Flex,
  Input,
  InputGroup,
  InputRightElement,
  Icon,
} from "@chakra-ui/react";

import { FiSearch } from "react-icons/fi";
import DefaultLayout from "../../components/layouts/DefaultLayout";
import PaySlip from "../../components/molecules/PaySlip";
import { useState } from "react";

const Payment = () => {
  const [searchName, setSearchName] = useState("");
  const employees = [
    { name: "DON WILFRIED", function: "Directeur" },
    { name: "ALAIN KANA", function: "Enseignant" },
    { name: "BLAISE MATUIDI", function: "Enseignant" },
    { name: "LIONEL MESSI", function: "Enseignant" },
    { name: "SANCHEZ RENA", function: "Enseignant" },
    { name: "DILAN DEMBA", function: "Enseignant" },
    { name: "NEY REMA", function: "Enseignant" },
    { name: "HALAN JAMES", function: "Enseignant" },
  ];
  const handleChange = (e) => {
    setSearchName(e.target.value);
  };
  return (
    <DefaultLayout>
      <Flex w="100%" direction="column" bgColor="colors.tertiary">
        <Box pt="70px" w="100%">
          <Heading p="1em" textAlign="center" color="pink.400">
            gestion de la paie de salaire
          </Heading>
        </Box>
        <Center>
          <Box mt={5}>
            <InputGroup>
              <InputRightElement
                children={<Icon as={FiSearch} />}
                cursor="pointer"
              />
              <Input
                bgColor="white"
                value={searchName}
                onChange={handleChange}
                w="400px"
                placeholder="Rechercher un employé..."
              />
            </InputGroup>
          </Box>
        </Center>

        <PaySlip />
      </Flex>
    </DefaultLayout>
  );
};

export default Payment;

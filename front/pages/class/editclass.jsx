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
import { Formik } from "formik";
import { useRouter } from "next/router";
import DefaultLayout from "../../components/layouts/DefaultLayout";


const EditClass = () => {
  const teachers = [
    "Ryan Jones",
    "Illary Daenarys ",
    "Julian Clinton",
    "Alain Kana",
  ];
  const classes = ["SIL", "CP", "CE1", "CM1", "CM2"];
  const router = useRouter();

  return (
    <DefaultLayout>
      <Formik
        initialValues={{
          nom: "CM2",
          inscription: "20000",
          premiereTranche: "50000",
          secondeTranche: "60000",
          nomEnseignant: "Alain Kana",
        }}
      >
        {({ values, handleChange, handleSubmit }) => (
          <Box pt="70px" width="full" background="colors.tertiary">
            <Center>
              <VStack
                gap={5}
                boxShadow="md"
                rounded="md"
                p="10"
                background="white"
                mt={10}
              >
                <Heading color={"colors.primary"}>Éditer une classe</Heading>
                <Stack
                  gap={2}
                  align="start"
                  direction={["column", "column", "row"]}
                  as="form"
                >
                  <VStack gap={2}>
                    <FormControl>
                      <FormLabel>Selectionner la classe:</FormLabel>
                      <Select minW="300px" placeholder="Sélectionner la classe">
                        {classes.map((teacher) => (
                          <Box as="option">{teacher}</Box>
                        ))}
                      </Select>
                    </FormControl>
                    <FormControl>
                      <FormLabel>Nom de l'enseignant:</FormLabel>
                      <Select
                        minW="300px"
                        placeholder="Sélectionner l'enseignant"
                        value={values.nomEnseignant}
                        name="nomEnseignant"
                        onChange={handleChange}
                      >
                        {teachers.map((teacher) => (
                          <Box as="option">{teacher}</Box>
                        ))}
                      </Select>
                    </FormControl>
                    <FormControl>
                      <FormLabel>Frais d'inscription:</FormLabel>
                      <Input
                        minW="300px"
                        type="number"
                        value={values.inscription}
                        onChange={handleChange}
                        name="inscription"
                      />
                    </FormControl>
                  </VStack>
                  <VStack gap={2}>
                    <FormControl>
                      <FormLabel>Première tranche:</FormLabel>
                      <Input
                        minW="300px"
                        type="number"
                        value={values.premiereTranche}
                        onChange={handleChange}
                        name="premiereTranche"
                      />
                    </FormControl>
                    <FormControl>
                      <FormLabel>Seconde tranche:</FormLabel>
                      <Input
                        minW="300px"
                        type="number"
                        value={values.secondeTranche}
                        onChange={handleChange}
                        name="secondeTranche"
                      />
                    </FormControl>
                    <Flex gap={5} pt="30px">
                      <Button colorScheme="red" onClick={() => router.back()}>
                        Annuler
                      </Button>
                      <Button colorScheme="green">Valider</Button>
                    </Flex>
                  </VStack>
                </Stack>
              </VStack>
            </Center>
          </Box>
        )}
      </Formik>
    </DefaultLayout>
  );
};

export default EditClass;

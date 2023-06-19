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
  useToast,
} from "@chakra-ui/react";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useMutation, useQuery } from "@apollo/client";
import { MdDescription } from "react-icons/md";
import DefaultLayout from "../../components/layouts/DefaultLayout";
import { CREATE_STUDY_LEVEL, UPDATE_LEVEL } from "../../graphql/Mutation";
import {
  GET_ALL_CYCLE,
  GET_ALL_STUDY_LEVEL,
  GET_LEVEL_BY_ID,
} from "../../graphql/Queries";
import { useTranslation } from "next-i18next";
import { getStaticPropsTranslations } from "../../types/staticProps";
import { useAuth } from "../../contexts/account/Auth/Auth";

const AddLevel = () => {
  const toast = useToast();
  const router = useRouter();
  const { t } = useTranslation();
  const teachers = ["Ryan Jones", "Illary Daenarys ", "Julian Clinton"];
  const { setAuthToken, authToken } = useAuth();

  // const [name, setName] = useState();
  // const [montantPension, setMontantPension] = useState();
  // const [cycleId, setCycleId] = useState("");
  const [level, setLevel] = useState({
    name: "",
    montantPension: "",
    cycleId: "",
  });
  const [createStudyLevel] = useMutation(CREATE_STUDY_LEVEL, {
    onError: (error) => console.log(error),
  });
  const { data: dataCycle } = useQuery(GET_ALL_CYCLE);
  const [updateStudyLevel] = useMutation(UPDATE_LEVEL);
  const { data: dataStudyLevel, refetch } = useQuery(GET_ALL_STUDY_LEVEL);
  const { data: dataLevelById } = useQuery(GET_LEVEL_BY_ID, {
    variables: {
      id: router.query.id,
    },
  });

  let input;

  useEffect(() => {
    console.log(dataStudyLevel);
    if (!authToken) {
      router.back();
    }
  }, [authToken]);

  useEffect(() => {
    // console.log(dataSection?.findAllsection)
    console.log("j");
    console.log(dataCycle?.findAllcycle);
    console.log(dataLevelById);

    if (router.query.id) {
      const data = dataLevelById?.findOneNiveauEtude;
      if (data) {
        setLevel({
          name: data.name,
          montantPension: data.montantPension,
          cycleId: data.cycleid,
        });
      }
    }
  }, [dataCycle, dataLevelById]);

  const addStudyLevel = async (event, value) => {
    event.preventDefault();

    if (!router.query.id) {
      await createStudyLevel({
        variables: {
          niveauEtude: {
            name: level.name,
            montantPension: parseInt(level.montantPension),
            cycleId: level.cycleId,
          },
        },
        refetchQueries: [
          {
            query: GET_ALL_STUDY_LEVEL,
          },
        ],
      }),
        refetch();
      toast({
        title: "Creation d'un niveau d'etude.",
        description: "Le niveau a ete créée avec succes.",
        status: "success",
        duration: 3000,
        isClosable: true,
      });
    } else {
      console.log("Update error : ", level);
      await updateStudyLevel({
        variables: {
          id: router.query.id,
          input: {
            name: level.name,
            montantPension: parseInt(level.montantPension),
            cycleId: level.cycleId,
          },
        },
        refetchQueries: [
          {
            query: GET_ALL_STUDY_LEVEL,
          },
        ],
      });
      refetch();
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
      cycleId: "",
    });
    router.push("/level/levelList");
  };

  return (
    <DefaultLayout>
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
            <Box as="form" width="500px" onSubmit={addStudyLevel}>
              {/* <Text>jj</Text> */}
              <Heading
                color={"colors.primary"}
                fontSize={"2xl"}
                textAlign={"center"}
              >
                {t("pages.level.addLevel.heading")}
                {/* Creation d'un niveau d'etude */}
              </Heading>
              <Stack
                gap={2}
                align="start"
                direction={["column", "column", "column"]}
                mt="25px"
              >
                <FormControl>
                  <FormLabel>
                    {t("pages.level.addLevel.name")}
                    {/* Nom du niveaux: */}
                  </FormLabel>
                  <Input
                    placeholder="Nom du niveau"
                    type="text"
                    // maxW="300px"
                    name="name"
                    value={level.name}
                    onChange={(event) =>
                      setLevel({ ...level, name: event.target.value })
                    }
                    isRequired
                  />
                </FormControl>
                <FormControl mt="15px">
                  <FormLabel>{t("pages.level.addLevel.fees")}</FormLabel>
                  <Input
                    type={"number"}
                    name="montantPension"
                    value={level.montantPension}
                    placeholder="Montant de la pension"
                    onChange={(event) =>
                      setLevel({ ...level, montantPension: event.target.value })
                    }
                    isRequired
                  />
                </FormControl>
                <FormControl mt="15px">
                  <FormLabel>{t("pages.level.addLevel.nameCycle")}</FormLabel>
                  <Select
                    name="cycleId"
                    placeholder="Cycle"
                    minW="300px"
                    onChange={(event) =>
                      setLevel({ ...level, cycleId: event.target.value })
                    }
                    value={level.cycleId}
                    isRequired
                  >
                    {dataCycle &&
                      dataCycle.findAllcycle.map((cycle, index) => (
                        <option
                          selected={level.cycleId == cycle.id ? "selected" : ""}
                          value={cycle.id}
                          key={index}
                        >
                          {cycle.name}{" "}
                          {console.log(level.cycleId + " -- " + cycle.id)}(
                          {cycle.sectionName})
                        </option>
                      ))}
                  </Select>
                </FormControl>
                <Flex gap={5} pt="30px">
                  <Button colorScheme="red" onClick={() => router.back()}>
                    {t("pages.level.addLevel.cancelButton")}
                  </Button>
                  <Button colorScheme="green" type="submit">
                    {t("pages.level.addLevel.submitButton")}
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

export async function getStaticProps({ locale }) {
  return {
    props: {
      ...(await getStaticPropsTranslations(locale)),
      // Will be passed to the page component as props
    },
  };
}
export default AddLevel;

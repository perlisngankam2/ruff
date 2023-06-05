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
import { useTranslation } from "next-i18next";
import { getStaticPropsTranslations } from "../../types/staticProps";
import { CREATE_SALLE, UPDATE_SALLE } from "../../graphql/Mutation";
import {
  GET_ALL_SECTION,
  GET_ALL_CYCLE,
  GET_ALL_STUDY_LEVEL,
  GET_ALL_CLASS,
  GET_SALLE_BY_ID,
  GET_ALL_ANNEE_ACADEMIQUE,
  GET_ALL_SCHOOL_PARAMETER
} from "../../graphql/Queries";
import { useAuth } from "../../contexts/account/Auth/Auth";

const AddClass = () => {
  const toast = useToast();
  const router = useRouter();
  const { t } = useTranslation();
  const { setAuthToken, authToken } = useAuth();
  const teachers = ["Ryan Jones", "Illary Daenarys ", "Julian Clinton"];
  const [name, setName] = useState();
  const [section, setSection] = useState();
  const [niveauEtudeId, setNiveauEtudeId] = useState("");
  const [cycleId, setCycleId] = useState("");
  // const [anneeAcademiqueId, setAnneeAcademiqueId] = useState("");
  const [montantPensionSalle, setMontantPensionSalle] = useState();
  const [createSalle] = useMutation(CREATE_SALLE);
  const [updateSalle] = useMutation(UPDATE_SALLE);
  const { data: dataSection } = useQuery(GET_ALL_SECTION);
  const { data: dataStudyLevel } = useQuery(GET_ALL_STUDY_LEVEL);
  const { data: dataAnneeAcademique } = useQuery(GET_ALL_ANNEE_ACADEMIQUE);
  const { data: dataCycle } = useQuery(GET_ALL_CYCLE);
  const { data: dataSchoolParameter } = useQuery(GET_ALL_SCHOOL_PARAMETER);

  const [salle, setSalle] = useState({
    name: "",
    montantPensionSalle: "",
    cycleId: "",
    niveauEtudeId: "",
  });

  //RECUPERATION D'UNE CLASSE A PARTIR DE SON ID
  const { data: dataSalleById } = useQuery(GET_SALLE_BY_ID, {
    variables: { id: router.query.id },
  });

  // const bb = parseInt(montantPension)
  // // console.log(parseFloat(montantPension))
  // console.log(typeof bb)

  let input;
  useEffect(() => {
    if (!authToken) {
      router.back();
    }
  }, [authToken]);

  useEffect(
    () => {
      // console.log(dataSection?.findAllsection)
      console.log("j");
      console.log(dataStudyLevel?.findAllNiveauEtude);
      console.log(dataSalleById);

      if (router.query.id) {
        const dataSalleEdit = dataSalleById?.findOnesalle;
        if (dataSalleEdit) {
          setSalle({
            name: dataSalleEdit.name,
            montantPensionSalle: dataSalleEdit.montantPensionSalle,
            // cycleId: dataSalleEdit.cycleid,
            niveauEtudeId: dataSalleEdit.niveauid,
          });
        }
      }
    },
    [dataSection],
    [dataSalleById]
  );

  // RECUPERATION DU NOM ET DE L'ID DE L'ANNEE ACADEMIQUE EN COUR
  const anneeAcademiqueName =
    dataSchoolParameter?.findAllparameters[0].anneeAcademiqueName;
  console.log(anneeAcademiqueName);

  let anneeAcademiqueId =
    dataSchoolParameter?.findAllparameters[0].anneeAcademiqueId;
  console.log("anneeAcademiqueIds", anneeAcademiqueId);

  const addClasse = async (event, value) => {
    event.preventDefault();
    console.log("cccc");

    console.log(name);
    console.log(section);
    // console.log(cycleId);
    console.log(salle.montantPensionSalle);
    console.log(salle.niveauEtudeId);

    // const cycleData =
    if (!router.query.id) {
      await createSalle({
        variables: {
          salle: {
            name: salle.name,
            niveauEtudeId: salle.niveauEtudeId,
            // cycleId: salle.cycleId,
            montantPensionSalle: parseInt(salle.montantPensionSalle),
            anneeAcademiqueId: anneeAcademiqueId,
          },
        },
        refetchQueries: [
          {
            query: GET_ALL_CLASS,
          },
        ],
      });
      toast({
        title: "Creation d'une classe.",
        description: "La classe a ete créée avec succes.",
        status: "success",
        duration: 3000,
        isClosable: true,
      });
    } else {
      await updateSalle({
        variables: {
          id: router.query.id,
          input: {
            name: salle.name,
            montantPensionSalle: parseInt(salle.montantPensionSalle),
            niveauEtudeId: salle.niveauEtudeId,
            // cycleId: salle.cycleId
          },
        },
        refetchQueries: [
          {
            query: GET_ALL_CLASS,
          },
        ],
      });
    }
    router.push("/class");
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
            <Box as="form" width="500px" onSubmit={addClasse}>
              <Heading color={"colors.primary"} textAlign={"center"}>
                {t("pages.class.classAdd.heading")}
              </Heading>
              <Stack
                gap={2}
                align="start"
                direction={["column", "column", "column"]}
                mt="25px"
              >
                <FormControl>
                  <FormLabel>
                    {/* Nom de la classe: */}
                    {t("pages.class.classAdd.name")}
                  </FormLabel>
                  <Input
                    placeholder="Nom de la classe"
                    type="text"
                    // maxW="300px"
                    name="name"
                    value={salle.name}
                    onChange={(event) =>
                      setSalle({ ...salle, name: event.target.value })
                    }
                    isRequired
                  />
                </FormControl>
                <FormControl>
                  <FormLabel>
                    {/* Montant pension: */}
                    {t("pages.class.classAdd.feesAmount")}
                  </FormLabel>
                  <Input
                    placeholder="Valeur de la pension"
                    type="number"
                    // maxW="300px"
                    name="montantPensionSalle"
                    value={salle.montantPensionSalle}
                    onChange={(event) =>
                      setSalle({
                        ...salle,
                        montantPensionSalle: event.target.value,
                      })
                    }
                  />
                </FormControl>
                <FormControl mt="15px">
                  <FormLabel>
                    {t("pages.class.classAdd.studyLevel")}
                    {/* Niveau d'etude: */}
                  </FormLabel>
                  <Select
                    id="cycle"
                    name="niveauEtudeId"
                    placeholder="Nom"
                    minW="300px"
                    onChange={(event) =>
                      setSalle({ ...salle, niveauEtudeId: event.target.value })
                    }
                    value={salle.niveauEtudeId}
                    isRequired
                  >
                    {dataStudyLevel &&
                      dataStudyLevel.findAllNiveauEtude.map(
                        (niveauEtude, index) => (
                          <option
                            selected={
                              salle.niveauEtudeId == niveauEtude.id
                                ? "selected"
                                : ""
                            }
                            value={niveauEtude.id}
                            key={index}
                          >
                            {niveauEtude.name}({niveauEtude.cycleName})
                          </option>
                        )
                      )}
                  </Select>
                </FormControl>
                <FormControl mt={4}>
                  <FormLabel>
                    {/* Annee academique */}
                    {t("pages.class.classAdd.academicYear")}
                  </FormLabel>
                  <Input
                    type={"text"}
                    value={anneeAcademiqueName}
                    placeholder="Annee academique"
                    isRequired
                  />
                </FormControl>
                {/* <FormControl mt="15px">
                      <FormLabel>Annee academique:</FormLabel>
                        <Select 
                          name="cycleId"
                          placeholder="Cycle"
                          minW="300px"
                          onChange = {(event) => setSalle({...salle, cycleId:event.target.value})}
                          value={salle.cycleId}
                        >
                         {dataCycle &&(
                                dataCycle.findAllcycle.map((cycle, index) => ( 
                                    <option value={cycle.id} key={index}>
                                        {cycle.name}
                                    </option>
                                ))
                          )} 
                        </Select>
                 </FormControl> */}
                <Flex gap={5} pt="30px">
                  <Button
                    colorScheme="red"
                    // onClick={() => router.back()}
                  >
                    {t("pages.class.classAdd.cancelButton")}
                    {/* Annuler */}
                  </Button>
                  <Button type="submit" colorScheme="green">
                    {t("pages.class.classAdd.submitButton")}
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

export default AddClass;

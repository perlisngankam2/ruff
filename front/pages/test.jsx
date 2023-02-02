import { useState } from "react";
import {
  Progress,
  Box,
  ButtonGroup,
  Button,
  Flex,
  Input,
  Heading,
  Select,
  FormControl,
  FormLabel,
} from "@chakra-ui/react";

import { useToast } from "@chakra-ui/react";

export default function multistep() {
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [classe, setClasse] = useState("");
  const [dateDeNaissance, setDateDeNaissance] = useState("");
  const [sexe, setSexe] = useState("");
  const [adresse, setAdresse] = useState("");
  const [transport, setTransport] = useState(false);
  const [nomDuPere, setNomDuPere] = useState("");
  const [prenomDuPere, setPrenomDuPere] = useState("");
  const [professionDuPere, setProfessionDuPere] = useState("");
  const [emailDuPere, setEmailDuPere] = useState("");
  const [numeroDuPere, setNumeroDuPere] = useState("");
  const [nomDeLaMere, setNomDeLaMere] = useState("");
  const [prenomDeLaMere, setPrenomDeLaMere] = useState("");
  const [professionDeLaMere, setProfessionDeLaMere] = useState("");
  const [emailDeLaMere, setEmailDeLaMere] = useState("");
  const [numeroDeLaMere, setNumeroDeLaMere] = useState("");
  const [nomDuTuteur, setNomDuTuteur] = useState("");
  const [prenomDuTuteur, setPrenomDuTuteur] = useState("");
  const [professionDuTuteur, setProfessionDuTuteur] = useState("");
  const [emailDuTuteur, setEmailDuTuteur] = useState("");
  const [numeroDuTuteur, setNumeroDuTuteur] = useState("");

  const toast = useToast();
  const classes = ["SIL", "CP", "CE1", "CE2", "CM1", "CM2"];
  const [step, setStep] = useState(1);
  const [progress, setProgress] = useState(33.33);
  const [prenom, setPrenom] = useState("");
  const [age, setAge] = useState("");
  const handleSubmit = (e) => {
    e.preventDefault();
    const submitObject = {
      nom: firstname,
      prenom: lastname,
      salle: classe,
      dateDeNaissance: dateDeNaissance,
      sexe: sexe,
      adresse: adresse,
      transport: transport,
      nomDuPere: nomDuPere,
      prenomDuPere: prenomDuPere,
      professionDuPere: professionDuPere,
      emailDuPere: emailDuPere,
      numeroDuPere: numeroDuPere,
      nomDeLaMere: nomDeLaMere,
      prenomDeLaMere: prenomDeLaMere,
      professionDeLaMere: professionDeLaMere,
      emailDeLaMere: emailDeLaMere,
      numeroDeLaMere: numeroDeLaMere,
      nomDuTuteur: nomDuTuteur,
      prenomDuTuteur: prenomDuTuteur,
      professionDuTuteur: professionDuTuteur,
      emailDuTuteur: emailDuTuteur,
      numeroDuTuteur: numeroDuTuteur,
    };
    console.log(submitObject);
  };
  return (
    <>
      <Box
        borderWidth="1px"
        rounded="lg"
        shadow="1px 1px 3px rgba(0,0,0,0.3)"
        maxWidth={800}
        p={6}
        m="10px auto"
        as="form"
        onSubmit={handleSubmit}
      >
        <Progress
          hasStripe
          value={progress}
          mb="5%"
          mx="5%"
          isAnimated
        ></Progress>
        {step === 1 ? (
          <Box mt={5}>
            <Heading size="md" p="2" background="pink.300" color="white">
              Informations de l'élève
            </Heading>
            <Box mx={2} mt="5">
              <Flex gap={3} flexWrap={["wrap", "wrap", "nowrap"]}>
                <Input
                  placeholder="Nom de l'élève"
                  value={firstname}
                  onChange={(e) => setFirstname(e.target.value)}
                  name="nom"
                  variant="flushed"
                />
                <Input
                  placeholder="Prenom"
                  name="prenom"
                  value={lastname}
                  onChange={(e) => setLastname(e.target.value)}
                  variant="flushed"
                />
                <Select
                  placeholder="Selectionner la classe"
                  name="salle"
                  value={classe}
                  onChange={(e) => setClasse(e.target.value)}
                  variant="flushed"
                >
                  {classes.map((classe, index) => (
                    <option key={index}>{classe}</option>
                  ))}
                </Select>
              </Flex>

              <Flex
                gap={3}
                mt="5"
                align="end"
                flexWrap={["wrap", "wrap", "nowrap"]}
              >
                <FormControl>
                  <FormLabel>Date de naissance</FormLabel>
                  <Input
                    type="date"
                    name="dateDeNaissance"
                    value={dateDeNaissance}
                    onChange={(e) => setDateDeNaissance(e.target.value)}
                    variant="flushed"
                  />
                </FormControl>
                <FormControl>
                  <FormLabel>Sexe</FormLabel>
                  <Select
                    name="sexe"
                    value={sexe}
                    onChange={(e) => setSexe(e.target.value)}
                    variant="flushed"
                  >
                    <option>Masculin</option>
                    <option>Feminin</option>
                  </Select>
                </FormControl>

                <FormControl>
                  <FormLabel>Adresse</FormLabel>
                  <Input
                    type="text"
                    name="adresse"
                    value={adresse}
                    onChange={(e) => setAdresse(e.target.value)}
                    variant="flushed"
                  />
                </FormControl>
              </Flex>
              <Flex>
                <Select
                  placeholder="Transport"
                  name="transport"
                  value={transport}
                  onChange={(e) => setTransport(e.target.value)}
                  variant="flushed"
                >
                  <option>Oui</option>
                  <option>Non</option>
                </Select>
              </Flex>
            </Box>
          </Box>
        ) : step === 2 ? (
          <Box mt={10}>
            <Heading size="md" p="2" background="purple.300" color="white">
              Informations du père
            </Heading>
            <Box mx={2} mt="5">
              <Flex gap={3} flexWrap={["wrap", "wrap", "nowrap"]}>
                <Input
                  placeholder="Nom du père"
                  name="nomDuPere"
                  value={nomDuPere}
                  onChange={(e) => setNomDuPere(e.target.value)}
                  variant="flushed"
                />
                <Input
                  placeholder="Prenom"
                  name="prenomDuPere"
                  value={prenomDuPere}
                  onChange={(e) => setPrenomDuPere(e.target.value)}
                  variant="flushed"
                />
                <Input
                  placeholder="Profession"
                  name="professionDuPere"
                  value={professionDuPere}
                  onChange={(e) => setProfessionDuPere(e.target.value)}
                  variant="flushed"
                />
              </Flex>
              <Flex gap={3}>
                <Input
                  type="email"
                  placeholder="Email"
                  name="emailDuPere"
                  value={emailDuPere}
                  onChange={(e) => setEmailDuPere(e.target.value)}
                  variant="flushed"
                />
                <Input
                  type="number"
                  placeholder="Numero de téléphone"
                  name="numeroDuPere"
                  value={numeroDuPere}
                  onChange={(e) => setNumeroDuPere(e.target.value)}
                  variant="flushed"
                />
              </Flex>
            </Box>
            <Box mt={10}>
              <Heading size="md" p="2" background="green.300" color="white">
                Informations de la mère
              </Heading>
              <Box mx={2} mt="5">
                <Flex gap={3} flexWrap={["wrap", "wrap", "nowrap"]}>
                  <Input
                    placeholder="Nom de la mère"
                    name="nomDeLaMere"
                    value={nomDeLaMere}
                    onChange={(e) => setNomDeLaMere(e.target.value)}
                    variant="flushed"
                  />
                  <Input
                    placeholder="Prenom"
                    name="prenomDeLaMere"
                    value={prenomDeLaMere}
                    onChange={(e) => setPrenomDeLaMere(e.target.value)}
                    variant="flushed"
                  />
                  <Input
                    placeholder="Profession"
                    name="professionDeLaMere"
                    value={professionDeLaMere}
                    onChange={(e) => setProfessionDeLaMere(e.target.value)}
                    variant="flushed"
                  />
                </Flex>
                <Flex gap={3}>
                  <Input
                    type="email"
                    placeholder="Email"
                    name="emailDuPere"
                    value={emailDeLaMere}
                    onChange={(e) => setEmailDeLaMere(e.target.value)}
                    variant="flushed"
                  />
                  <Input
                    type="number"
                    placeholder="Numero de téléphone"
                    name="emailDeLaMere"
                    value={numeroDeLaMere}
                    onChange={(e) => setNumeroDeLaMere(e.target.value)}
                    variant="flushed"
                  />
                </Flex>
              </Box>
            </Box>
          </Box>
        ) : (
          <Box mt={10}>
            <Heading size="md" p="2" background="orange.300" color="white">
              Informations du tuteur
            </Heading>
            <Box mx={2} mt="5">
              <Flex gap={3} flexWrap={["wrap", "wrap", "nowrap"]}>
                <Input
                  placeholder="Nom du tuteur"
                  name="nomDuTuteur"
                  value={nomDuTuteur}
                  onChange={(e) => setNomDuTuteur(e.target.value)}
                  variant="flushed"
                />
                <Input
                  placeholder="Prenom"
                  name="prenomDuTuteur"
                  value={prenomDuTuteur}
                  onChange={(e) => setPrenomDuTuteur(e.target.value)}
                  variant="flushed"
                />
                <Input
                  placeholder="Profession"
                  name="professionDuTuteur"
                  value={professionDuTuteur}
                  onChange={(e) => setProfessionDuTuteur(e.target.value)}
                  variant="flushed"
                />
              </Flex>
              <Flex gap={3}>
                <Input
                  type="email"
                  placeholder="Email"
                  value={emailDuTuteur}
                  onChange={(e) => setEmailDuTuteur(e.target.value)}
                  variant="flushed"
                />
                <Input
                  type="number"
                  placeholder="Numero de téléphone"
                  value={numeroDuTuteur}
                  onChange={(e) => setNumeroDuTuteur(e.target.value)}
                  variant="flushed"
                />
              </Flex>
            </Box>
          </Box>
        )}
        <ButtonGroup mt="5%" w="100%">
          <Flex w="100%" justifyContent="space-between">
            <Flex>
              <Button
                onClick={() => {
                  setStep(step - 1);
                  setProgress(progress - 33.33);
                }}
                isDisabled={step === 1}
                colorScheme="teal"
                variant="solid"
                w="7rem"
                mr="5%"
              >
                Back
              </Button>
              <Button
                w="7rem"
                isDisabled={step === 3}
                onClick={() => {
                  setStep(step + 1);
                  if (step === 3) {
                    setProgress(100);
                  } else {
                    setProgress(progress + 33.33);
                  }
                }}
                colorScheme="teal"
                variant="outline"
              >
                Next
              </Button>
            </Flex>
            {step === 3 ? (
              <Button
                w="7rem"
                colorScheme="red"
                variant="solid"
                type="submit"
                onClick={() => {
                  toast({
                    title: "Account created.",
                    description: "We've created your account for you.",
                    status: "success",
                    duration: 3000,
                    isClosable: true,
                  });
                }}
              >
                Submit
              </Button>
            ) : null}
          </Flex>
        </ButtonGroup>
      </Box>
    </>
  );
}

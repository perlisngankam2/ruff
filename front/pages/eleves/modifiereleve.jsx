import {
  Box,
  Button,
  Center,
  Flex,
  FormControl,
  FormLabel,
  Heading,
  Hide,
  Input,
  Select,
  Text,
} from "@chakra-ui/react";
import { Formik } from "formik";
import { useRouter } from "next/router";
import DefaultLayout from "../../components/layouts/DefaultLayout";

const ModifierEleve = () => {
  const classes = ["SIL", "CP", "CE1", "CE2", "CM1", "CM2"];
  const router = useRouter();

  return (
    <DefaultLayout>
      <Formik
        initialValues={{
          nom: "",
          prenom: "",
          salle: "",
          dateDeNaissance: "",
          sexe: "",
          adresse: "",
          transport: false,
          nomDuPere: "",
          prenomDuPere: "",
          professionDuPere: "",
          emailDuPere: "",
          numeroDuPere: "",
          nomDeLaMere: "",
          prenomDeLaMere: "",
          professionDeLaMere: "",
          emailDeLaMere: "",
          numeroDeLaMere: "",
          nomDuTuteur: "",
          prenomDuTuteur: "",
          professionDuTuteur: "",
          emailDuTuteur: "",
          numeroDuTuteur: "",
          exclu: false,
        }}
        onSubmit={(values) => {
          console.log(values);
        }}
      >
        {({ handleSubmit, values, handleChange }) => (
          <Box
            p={7}
            pt={70}
            w="full"
            as="form"
            onSubmit={handleSubmit}
            background="colors.tertiary"
          >
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
                textColor="colors.primary"
              >
                Inscription des élèves
              </Heading>
              <Hide below="sm">
                <Text>Dashboad / Éleves / AjouterPersonnel</Text>
              </Hide>
            </Flex>

            <Box background="white" rounded="lg" p="5" mt="10" boxShadow="md">
              {/* INFORMATIONS DE L'ELÈVE */}
              <Box mt={5}>
                <Heading size="md" p="2" background="pink.300" color="white">
                  Informations de l'élève
                </Heading>
                <Box mx={2} mt="5">
                  <Flex gap={3} flexWrap={["wrap", "wrap", "nowrap"]}>
                    <Input
                      placeholder="Nom de l'élève"
                      value={values.nom}
                      onChange={handleChange}
                      name="nom"
                      variant="flushed"
                    />
                    <Input
                      placeholder="Prenom"
                      name="prenom"
                      value={values.prenom}
                      onChange={handleChange}
                      variant="flushed"
                    />
                    <Select
                      placeholder="Selectionner la classe"
                      name="salle"
                      value={values.salle}
                      onChange={handleChange}
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
                        value={values.dateDeNaissance}
                        onChange={handleChange}
                        variant="flushed"
                      />
                    </FormControl>
                    <FormControl>
                      <FormLabel>Sexe</FormLabel>
                      <Select
                        name="sexe"
                        value={values.sexe}
                        onChange={handleChange}
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
                        value={values.adresse}
                        onChange={handleChange}
                        variant="flushed"
                      />
                    </FormControl>
                  </Flex>
                  <Flex>
                    <Select
                      placeholder="Transport"
                      name="transport"
                      value={values.transport}
                      onChange={handleChange}
                      variant="flushed"
                    >
                      <option>Oui</option>
                      <option>Non</option>
                    </Select>
                  </Flex>
                </Box>
              </Box>

              {/* INFORMATIONS DU PERE */}
              <Box mt={10}>
                <Heading size="md" p="2" background="purple.300" color="white">
                  Informations du père
                </Heading>
                <Box mx={2} mt="5">
                  <Flex gap={3} flexWrap={["wrap", "wrap", "nowrap"]}>
                    <Input
                      placeholder="Nom du père"
                      name="nomDuPere"
                      value={values.nomDuPere}
                      onChange={handleChange}
                      variant="flushed"
                    />
                    <Input
                      placeholder="Prenom"
                      name="prenomDuPere"
                      value={values.prenomDuPere}
                      onChange={handleChange}
                      variant="flushed"
                    />
                    <Input
                      placeholder="Profession"
                      name="professionDuPere"
                      value={values.professionDuPere}
                      onChange={handleChange}
                      variant="flushed"
                    />
                  </Flex>
                  <Flex gap={3}>
                    <Input
                      type="email"
                      placeholder="Email"
                      name="emailDuPere"
                      value={values.emailDuPere}
                      onChange={handleChange}
                      variant="flushed"
                    />
                    <Input
                      type="number"
                      placeholder="Numero de téléphone"
                      name="numeroDuPere"
                      value={values.numeroDuPere}
                      onChange={handleChange}
                      variant="flushed"
                    />
                  </Flex>
                  {/* <Flex gap={3} mt="5">
                      <FormControl>
                        <FormLabel>Date de naissance</FormLabel>
                        <Input
                          type="date"
                          name="dateDeNaissanceParent"
                          value={values.dateDeNaissanceParent}
                          onChange={handleChange}
                        />
                      </FormControl>
                    </Flex> */}
                </Box>
              </Box>

              {/* INFORMATIONS DE LA MERE */}
              <Box mt={10}>
                <Heading size="md" p="2" background="green.300" color="white">
                  Informations de la mère
                </Heading>
                <Box mx={2} mt="5">
                  <Flex gap={3} flexWrap={["wrap", "wrap", "nowrap"]}>
                    <Input
                      placeholder="Nom de la mère"
                      name="nomDeLaMere"
                      value={values.nomDeLaMere}
                      onChange={handleChange}
                      variant="flushed"
                    />
                    <Input
                      placeholder="Prenom"
                      name="prenomDeLaMere"
                      value={values.prenomDeLaMere}
                      onChange={handleChange}
                      variant="flushed"
                    />
                    <Input
                      placeholder="Profession"
                      name="professionDeLaMere"
                      value={values.professionDeLaMere}
                      onChange={handleChange}
                      variant="flushed"
                    />
                  </Flex>
                  <Flex gap={3}>
                    <Input
                      type="email"
                      placeholder="Email"
                      name="emailDuPere"
                      value={values.emailDeLaMere}
                      onChange={handleChange}
                      variant="flushed"
                    />
                    <Input
                      type="number"
                      placeholder="Numero de téléphone"
                      name="emailDeLaMere"
                      value={values.numeroDeLaMere}
                      onChange={handleChange}
                      variant="flushed"
                    />
                  </Flex>
                  {/* <Flex gap={3} mt="5">
                      <FormControl>
                        <FormLabel>Date de naissance</FormLabel>
                        <Input
                          type="date"
                          name="dateDeNaissanceParent"
                          value={values.dateDeNaissanceParent}
                          onChange={handleChange}
                        />
                      </FormControl>
                    </Flex> */}
                </Box>
              </Box>

              {/* INFORMATIONS DU TUTEUR */}
              <Box mt={10}>
                <Heading size="md" p="2" background="orange.300" color="white">
                  Informations du tuteur
                </Heading>
                <Box mx={2} mt="5">
                  <Flex gap={3} flexWrap={["wrap", "wrap", "nowrap"]}>
                    <Input
                      placeholder="Nom du tuteur"
                      name="nomDuTuteur"
                      value={values.nomDuTuteur}
                      onChange={handleChange}
                      variant="flushed"
                    />
                    <Input
                      placeholder="Prenom"
                      name="prenomDuTuteur"
                      value={values.prenomDuTuteur}
                      onChange={handleChange}
                      variant="flushed"
                    />
                    <Input
                      placeholder="Profession"
                      name="professionDuTuteur"
                      value={values.professionDuTuteur}
                      onChange={handleChange}
                      variant="flushed"
                    />
                  </Flex>
                  <Flex gap={3}>
                    <Input
                      type="email"
                      placeholder="Email"
                      name="emailDuPere"
                      value={values.emailDuTuteur}
                      onChange={handleChange}
                      variant="flushed"
                    />
                    <Input
                      type="number"
                      placeholder="Numero de téléphone"
                      name="emailDeLaMere"
                      value={values.numeroDuPere}
                      onChange={handleChange}
                      variant="flushed"
                    />
                  </Flex>
                  {/* <Flex gap={3} mt="5">
                      <FormControl>
                        <FormLabel>Date de naissance</FormLabel>
                        <Input
                          type="date"
                          name="dateDeNaissanceParent"
                          value={values.dateDeNaissanceParent}
                          onChange={handleChange}
                        />
                      </FormControl>
                    </Flex> */}
                </Box>
              </Box>
              <Flex gap={5} justify="end">
                <Button
                  mt="20px"
                  colorScheme="red"
                  onClick={() => router.back()}
                >
                  Annuler
                </Button>
                <Button mt="20px" colorScheme="green" type="submit">
                  Valider
                </Button>
              </Flex>
            </Box>
          </Box>
        )}
      </Formik>
    </DefaultLayout>
  );
};

export default ModifierEleve;

// //total stattistique des eleves de la section francophone
// export const GET_TOTAL_STUDENT_STATISTICS_FRANCOPHONE_SECTION = gql `
// query getTotalStudentStatisticsFrancophone {
//     getTotalStudentStatisticsFrancophone {
//         MONTANT_ATTENDU
//         MONTANT_EN_CAISSE
//         TAUX_ENCAISSEMENT
//         RESTE_RECOUVRER
//         TAUX_RAR
//     }
// }
// `

//TOTal stattistique des eleves de la section anglophone
// export const GET_TOTAL_STUDENT_STATISTICS_ANGLOPHONE_SECTION = gql `
// query getTotalStudentStatisticsAnglophone {
//     getTotalStudentStatisticsAnglophone {
//         MONTANT_ATTENDU
//         MONTANT_EN_CAISSE
//         TAUX_ENCAISSEMENT
//         RESTE_RECOUVRER
//         TAUX_RAR
//     }
// }


//  FONCTION DE CONVERTION EN LETTRE
// function nombreEnLettres(montant) {
//   const chiffres = [
//     '', 'un', 'deux', 'trois', 'quatre', 'cinq', 'six', 'sept', 'huit', 'neuf', 'dix',
//     'onze', 'douze', 'treize', 'quatorze', 'quinze', 'seize', 'dix-sept', 'dix-huit', 'dix-neuf'
//   ];

//   const dizaines = [
//     '', '', 'vingt', 'trente', 'quarante', 'cinquante', 'soixante', 'soixante-dix',
//     'quatre-vingt', 'quatre-vingt-dix'
//   ];

//   const unite = montant % 10;
//   const dizaine = Math.floor(montant / 10) % 10;
//   const centaine = Math.floor(montant / 100) % 10;
//   const millier = Math.floor(montant / 1000) % 1000;

//   const million = Math.floor(montant / 1000000);

//   let resultat = '';

//   if (million > 0) {
//       if (million === 1) {
//       resultat += 'un million ';
//     } else {
//       resultat += nombreEnLettres(million) + ' million ';
//     }

//     montant %= 1000000;
//   }
//     if(millier > 0){
//       if (millier === 1) {
//       resultat += 'mille ';
//     } else {
//          resultat += nombreEnLettres(millier) + ' mille ';
//     }
//     const reste = millier % 1000;
//   }

//   if (centaine > 0) {
//     if (centaine === 1) {
//       resultat += 'cent ';
//     } else {
//       resultat += chiffres[centaine] + ' cent ';
//     }
//   }

// if (dizaine === 1 && unite === 0) {
//     resultat += chiffres[10] + ' ';
//   }
//   if (dizaine === 1 && unite > 0) {
//     resultat += chiffres[10 + unite] + ' ';
//   }
//   if (dizaine > 1) {
//     if ((dizaine === 7 && unite > 0) || (dizaine === 9 && unite > 0)) {
//     resultat += dizaines[dizaine-1] + ' ' + chiffres[10 + unite] + ' ';
//   }else{
//     resultat += dizaines[dizaine] + ' ';
//   }

//   }

//   if (dizaine !== 1&& dizaine !== 7 && dizaine !== 9 ) {
//     if(dizaine === 0  && unite > 0){
//    resultat += chiffres[unite] + ' ';
//     }
//     resultat += chiffres[unite] + ' ';

//   }

//   return resultat.trim();
// }

// SUPPRSSION DE LA PRIME , SUPPRESSION DE LA RETENU
// mutation deleteprime ($id: String!) {
//     deleteprime (id: $id) {9
//         id
//         nom
//         description
//         montant
//     }
// }

// mutation deleteretenusalarial ($id: String!) {
//   deleteretenusalarial (id: $id) {
//       id
//       nom
//       description
//       montant
//   }
// }
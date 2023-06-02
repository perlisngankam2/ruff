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




// import {
//   Box,
//   Flex,
//   Image,
//   Center,
//   Heading,
//   Text,
//   Divider,
//   Stack,
//   Table,
//   TableContainer,
//   Thead,
//   Tbody,
//   Tr,
//   Th,
//   Td,
//   Icon,
//   Button,
// } from "@chakra-ui/react";
// import DefaultLayout from "../../../components/layouts/DefaultLayout";
// import { GiDivergence } from "react-icons/gi";
// // import { getStaticPropsTranslations } from "../../../types/staticProps";
// // import Router from "next/router";
// import { useRouter } from "next/router";
// import ReactToPrint from "react-to-print";
// import ReactToPdf from "react-to-pdf";
// import ReactPaginate from "react-paginate";
// import { TfiFilter, TfiPrinter } from "react-icons/tfi";
// import { useAuth } from "../../../contexts/account/Auth/Auth";

// import {
//   // GET_STUDENT_BY_TRANCHE_STUDENT,
//   GET_STUDENT_BY_ID,
//   GET_STUDENT_SALLE,
//   GET_LAST_PAYMENT,
//   GET_AVANCE_MONTANT_TRANCHE_BY_STUDENT,
//   // GGET_RESTE_TRANCHE_BY_STUDENT,
//   GET_DATELINE_TRANCHE_BY_STUDENT,
//   GET_ALL_MONTANT_TRANCHE_BY_STUDENT,
//   GET_ALL_TRANCHE_DATE_LINE_BY_STUDENT,
//   GET_CLASS_FEES_BY_STUDENT_ID,
//   GET_ALL_TRANCHE_PENSION,
//   GET_PENSION_ALREADY_PAY_BY_STUDENT_ID,
//   GET_RESTE_PENSION_A_PAYER_BY_STUDENT_ID,
//   GET_SECTION_STUDENT_BY_ID,
//   GET_RESTE_MONTANT_TRANCHE_BY_STUDENT_ID,
//   GET_ALL_TRANCHE_BY_STUDENT_ID,
//   GET_PERSONNEL_BY_USERID,
// } from "../../../graphql/Queries";
// import React, { useEffect, useRef } from "react";
// import { useQuery } from "@apollo/client";
// import { useAccount } from "../../../contexts/account/Account";

// const receipt = () => {
//   const router = useRouter();
//   const { account, loaded } = useAccount();
//   const { setAuthToken, authToken } = useAuth();

//   const { data: dataTranchePension } = useQuery(GET_ALL_TRANCHE_PENSION);

//   //Compte personnel de la'pplication
//   const { data: personnelData, called } = useQuery(GET_PERSONNEL_BY_USERID, {
//     variables: { userid: account?.id },
//   });
//   //Dernier paiement qu'a fait un eleve
//   const { data: dataLastPayment } = useQuery(GET_LAST_PAYMENT, {
//     variables: { studentid: router.query.id },
//   });
//   console.log(dataLastPayment);
//   const {
//     data: dataStudentId,
//     loading,
//     error,
//   } = useQuery(GET_STUDENT_BY_ID, {
//     variables: { id: router.query.id },
//   });

//   // const {data:dataStudentByTrancheStudent} = useQuery(GET_STUDENT_BY_TRANCHE_STUDENT,
//   //     {
//   //         variables: {studentid: router.query.id}
//   //     }
//   // );

//   const { data: dataStudentSalle } = useQuery(GET_STUDENT_SALLE, {
//     variables: { studentid: router.query.id },
//   });

//   //PENSION PAR CLASSE DE CHQUE ELEVE
//   const { data: dataClassFeesByStudentId } = useQuery(
//     GET_CLASS_FEES_BY_STUDENT_ID,
//     {
//       variables: { studentid: router.query.id },
//     }
//   );

//   //RESTE DE LA PENSION A PAYER POUR CHAQUE ELEVE
//   const { data: dataResteFeesToPayByStudent } = useQuery(
//     GET_RESTE_PENSION_A_PAYER_BY_STUDENT_ID,
//     {
//       variables: { studentid: router.query.id },
//     }
//   );

//   //RESTE DU MONTANT DES TRANCHES PAR ELEVE
//   const { data: dataResteTrancheByStudentId } = useQuery(
//     GET_RESTE_MONTANT_TRANCHE_BY_STUDENT_ID,
//     {
//       variables: { studentid: router.query.id },
//     }
//   );

//   //dateline trache
//   const { data: dataTrancheByStudentId } = useQuery(
//     GET_ALL_TRANCHE_BY_STUDENT_ID,
//     {
//       variables: { studentid: router.query.id },
//     }
//   );
//   //MONTANT DES TRANCHES PAYE EN FONCTION DE CHAQUE ELEVE
//   const { data: dataAvanceMontantInscriptionByStudent } = useQuery(
//     GET_AVANCE_MONTANT_TRANCHE_BY_STUDENT,
//     {
//       variables: {
//         studentid: router.query.id,
//         trancheid: dataTranchePension?.findAlltranche[0].id,
//       },
//     }
//   );

//   const { data: dataAvanceMontantTranche1ByStudent } = useQuery(
//     GET_AVANCE_MONTANT_TRANCHE_BY_STUDENT,
//     {
//       variables: {
//         studentid: router.query.id,
//         trancheid: dataTranchePension?.findAlltranche[1].id,
//       },
//     }
//   );

//   const { data: dataAvanceMontantTranche2ByStudent } = useQuery(
//     GET_AVANCE_MONTANT_TRANCHE_BY_STUDENT,
//     {
//       variables: {
//         studentid: router.query.id,
//         trancheid: dataTranchePension?.findAlltranche[2].id,
//       },
//     }
//   );

//   //RECUPERATION DES DATELINE PAR TRANCHE POUR CHQUE ELEVE
//   const { data: dataDateLineTrancheStudentInscription } = useQuery(
//     GET_DATELINE_TRANCHE_BY_STUDENT,
//     {
//       variables: {
//         studentid: router.query.id,
//         trancheid: dataTranchePension?.findAlltranche[0].id,
//       },
//     }
//   );

//   const { data: dataDateLineTrancheStudentTranche1 } = useQuery(
//     GET_DATELINE_TRANCHE_BY_STUDENT,
//     {
//       variables: {
//         studentid: router.query.id,
//         trancheid: dataTranchePension?.findAlltranche[1].id,
//       },
//     }
//   );

//   const { data: dataDateLineTrancheStudentTranche2 } = useQuery(
//     GET_DATELINE_TRANCHE_BY_STUDENT,
//     {
//       variables: {
//         studentid: router.query.id,
//         trancheid: dataTranchePension?.findAlltranche[2].id,
//       },
//     }
//   );

//   //RECUPERATION DE LA SECTION DE L'ELEVE
//   const { data: dataSectionStudentById } = useQuery(GET_SECTION_STUDENT_BY_ID, {
//     variables: {
//       studentid: router.query.id,
//     },
//   });

//   // const {data:dataAvanceTranche2ByStudent} = useQuery(GET_AVANCE_MONTANT_TRANCHE_BY_STUDENT,
//   //     {
//   //         variables:{
//   //             studentid: router.query.id,
//   //             trancheid: dataTranchePension?.findAlltranche[1].id
//   //         }

//   //     }
//   // )

//   //RESTE DES PAIEMENT POUR CHAQUE TRANCHE
//   // const {data:dataResteTrancheInscriptionByStudent} = useQuery(GET_RESTE_TRANCHE_BY_STUDENT,
//   //     {
//   //         variables:{
//   //             studentid: router.query.id,
//   //             trancheid: dataTranchePension?.findAlltranche[0].id
//   //         }

//   //     }

//   // )
//   //pour la tranche1
//   // const {data:dataResteTrancheForTranche1ByStudent} = useQuery(GET_RESTE_TRANCHE_BY_STUDENT,
//   //     {
//   //         variables:{
//   //             studentid: router.query.id,
//   //             trancheid: dataTranchePension?.findAlltranche[1].id
//   //         }

//   //     }

//   // )

//   // const {data:dataResteTrancheForTranche2ByStudent} = useQuery(GET_RESTE_TRANCHE_BY_STUDENT,
//   //     {
//   //         variables:{
//   //             studentid: router.query.id,
//   //             trancheid: dataTranchePension?.findAlltranche[2].id
//   //         }

//   //     }

//   // )

//   const { data: dataMontantTrancheByStudent } = useQuery(
//     GET_ALL_MONTANT_TRANCHE_BY_STUDENT,
//     {
//       variables: {
//         studentid: router.query.id,
//       },
//     }
//   );

//   //PENSION TOTALE DEJA PAYE PAR ELEVE
//   const { data: dataAlreadyPayBySudent } = useQuery(
//     GET_PENSION_ALREADY_PAY_BY_STUDENT_ID,
//     {
//       variables: { studentid: router.query.id },
//     }
//   );

//   // const tranches = [];
//   // const loadTranches = () => {
//   //   dataTrancheByStudentId?.getClassfeeofStudent.map((tranche) => {
//   //     tranches.push({
//   //       label: tranche?.name + " ," + tranche?.montant + "Fcfa",
//   //       value: tranche?.id,
//   //       //  (il faut aussi que l'id de cette tranche soit inclu dans la liste des tranches qui sont dans avancetranche)
//   //       //la liste des tranches qi sont dans avance tranches et dont la somme total de tout ses avances soit superieur au montant de la tranche
//   //     });
//   //   });
//   // };
//   // const {data:dataStudentByTrancheStudent} = useQuery(GET_STUDENT_BY_TRANCHE_STUDENT,
//   //     {
//   //         variables: {studentid: router.query.id}
//   //     }
//   // )
//   const date1 = new Date("December 17, 1995 03:24:00");

//   const componentRef = useRef();
//   const ref = React.createRef();
//   const options = {
//     orientation: "landscape",
//     // unit: 'mm',
//     // format: 'a4',
//   };

//   useEffect(() => {
//     if (!authToken) {
//       router.back();
//     }
//   }, [authToken]);

//   useEffect(() => {
//     // console.log(dataStudentByTrancheStudent?.getTrancheStudentByStudent)
//     console.log(dataStudentSalle?.dataStudentSalle);
//     console.log(
//       dataAvanceMontantInscriptionByStudent?.SumAvanceTrancheByStudent
//     );
//     console.log(dataMontantTrancheByStudent);
//     // loadTranches();
//   });

//   if (loading) return <Text>Chargement en cour...</Text>;
//   if (error) return <Text>Une erreur s'est produite!</Text>;

//   const lastStudentPaiement =
//     dataLastPayment?.AmountRecentAvanceTrancheByStudent;

//   function nombreEnLettres(montant) {
//     const chiffres = [
//       "",
//       "un",
//       "deux",
//       "trois",
//       "quatre",
//       "cinq",
//       "six",
//       "sept",
//       "huit",
//       "neuf",
//       "dix",
//       "onze",
//       "douze",
//       "treize",
//       "quatorze",
//       "quinze",
//       "seize",
//       "dix-sept",
//       "dix-huit",
//       "dix-neuf",
//     ];

//     const dizaines = [
//       "",
//       "",
//       "vingt",
//       "trente",
//       "quarante",
//       "cinquante",
//       "soixante",
//       "soixante-dix",
//       "quatre-vingt",
//       "quatre-vingt-dix",
//     ];

//     const unite = montant % 10;
//     const dizaine = Math.floor(montant / 10) % 10;
//     const centaine = Math.floor(montant / 100) % 10;
//     const millier = Math.floor(montant / 1000);

//     let resultat = "";

//     if (millier > 0) {
//       resultat += nombreEnLettres(millier) + " mille ";
//       const reste = montant % 1000;
//       if (reste > 0) {
//         resultat += nombreEnLettres(reste) + " ";
//       }
//     }

//     if (centaine > 0) {
//       if (centaine === 1) {
//         resultat += "cent ";
//       } else {
//         resultat += chiffres[centaine] + " cent ";
//       }
//     }
//   }
//   const lettreLastStudentPaiement = nombreEnLettres(lastStudentPaiement);
//   console.log(lettreLastStudentPaiement);

//   return (
//     <DefaultLayout>
//       <Center pt="70px" ml="60px" pb="10px">
//         <Flex mt="-630px" ml={"-300px"}>
//           <ReactToPrint
//             trigger={() => (
//               <Icon
//                 as={TfiPrinter}
//                 boxSize="50px"
//                 alignItems={"center"}
//                 p="3"
//               />
//             )}
//             content={() => componentRef.current}
//             documentTitle="Recu de paiement"
//             pageStyle="print"
//           />
//           <ReactToPdf
//             targetRef={componentRef}
//             filename="Recu de paiement"
//             options={options}
//             y={10}
//           >
//             {({ toPdf }) => (
//               <Button
//                 bg={"blackAlpha.100"}
//                 onClick={toPdf}
//                 border="1px"
//                 width={"50px"}
//                 fontSize={"sm"}
//               >
//                 PDF
//               </Button>
//             )}
//           </ReactToPdf>
//         </Flex>

//         <Box ref={componentRef}>
//           {dataStudentId && (
//             <Box
//               borderWidth="1px"
//               borderRadius="25px"
//               borderColor="black"
//               w="1020px"
//               ml={"50px"}
//             >
//               <Center
//                 borderBottomWidth="3px"
//                 h="120px"
//                 borderBottomColor="black"
//                 borderBottomStyle="solid"
//               >
//                 <Flex>
//                   <Box ml="30px">
//                     <Image src="/logo.png" w={["240px", "230px", "100px"]} />
//                   </Box>
//                   <Box p="2em">
//                     <Heading fontSize="2xl">
//                       GROUPE SCOLAIRE BILINGUE AWONO BILOGUE
//                     </Heading>
//                     <Flex gap="5" p="1em" mx="30px">
//                       <Text fontWeigth="bold">BP: 122</Text>
//                       <Text fontWeigth="bold">Obala-Cameroun</Text>
//                       <Text fontWeigth="bold">TEL: 678732927/698258781</Text>
//                     </Flex>
//                   </Box>
//                 </Flex>
//               </Center>

//               <Flex direction="column">
//                 <Center>
//                   <Box
//                     width="250px"
//                     h="60px"
//                     borderWidth="2px"
//                     borderColor="black"
//                     mt="3"
//                     textAlign="center"
//                   >
//                     <Heading my="3" fontSize="2xl" fontWeight="bold">
//                       RECU DE PAIEMENT
//                       {/* {dataAvanceMontantInscriptionByStudent?.SumAvanceTrancheByStudent} */}
//                     </Heading>
//                   </Box>
//                 </Center>
//                 <Flex gap="10px">
//                   <Box
//                     ml="3"
//                     m="3"
//                     borderWidth="1px"
//                     borderColor="black"
//                     bg="gray.50"
//                     gap="8"
//                     w="600px"
//                     mt="15px"
//                   >
//                     <Box my="20px">
//                       <Flex mt="3" ml="3" gap={2} mb="1">
//                         <Text>Nom / Name:</Text>
//                         <Box display={"flex"} gap={3}>
//                           <Text>
//                             {" "}
//                             {dataStudentId.findOnestudent.firstname.toUpperCase()}
//                           </Text>
//                           <Text>{dataStudentId.findOnestudent.lastname} </Text>
//                         </Box>
//                       </Flex>
//                       <Flex ml="3" gap={3} mb="1">
//                         <Text>Section:</Text>
//                         <Text>
//                           {dataSectionStudentById?.findSectionByStudent[0].name}
//                         </Text>
//                       </Flex>
//                       <Flex ml="3" gap="1" mb="1">
//                         <Text>Regime:</Text>
//                         <Text>
//                           {dataStudentId.findOnestudent.categoryName}{" "}
//                         </Text>
//                       </Flex>
//                       <Flex ml="3" gap="1" mb="1">
//                         <Text>Niveau:</Text>
//                         <Text>
//                           {dataStudentSalle?.findSalleByStudent.levelName}
//                         </Text>
//                       </Flex>
//                       <Flex ml="3" gap="1" mb="1">
//                         <Text>Classe / Class:</Text>
//                         <Text>
//                           {/* {dataStudentSalle?.findSalleByStudent.name} */}
//                           {dataStudentId.findOnestudent.salleName}
//                         </Text>
//                       </Flex>
//                       <Flex ml="3" gap="1" mb="1">
//                         <Text>Matricule / Registration:</Text>
//                         <Text>{dataStudentId.findOnestudent.matricule}</Text>
//                       </Flex>
//                       <Flex ml="3" gap="1" mb="1">
//                         <Text>Status / status:</Text>
//                         <Text>{dataStudentId.findOnestudent.repeating}</Text>
//                       </Flex>
//                       <Flex mb="1" justify="space-between">
//                         <Flex ml="3" gap="1">
//                           <Text>Annee Academique / Academic year:</Text>
//                           <Text></Text>
//                         </Flex>
//                         {/* <Flex ml='3' gap='1' mr='140px'>
//                                                 <Text>à/at:</Text>
//                                                 <Text></Text>
//                                             </Flex> */}
//                       </Flex>
//                       <Flex ml="3" gap="3" mb="1" justify="space-between">
//                         <Flex gap="1">
//                           <Box display={"flex"} gap={2}>
//                             <Text>Remettant / Renderer:</Text>
//                             {personnelData?.getpersonnelbyaccount.fonction ===
//                               "econome" && (
//                               <Text>
//                                 {personnelData?.getpersonnelbyaccount
//                                   .firstName +
//                                   " " +
//                                   personnelData?.getpersonnelbyaccount.lastName}
//                               </Text>
//                             )}
//                           </Box>
//                         </Flex>
//                         <Flex gap="1" mr="130px">
//                           <Box display={"flex"} gap={"2"}>
//                             <Text>Tel:</Text>
//                             {personnelData?.getpersonnelbyaccount.fonction ===
//                               "econome" && (
//                               <Text>
//                                 {" "}
//                                 {
//                                   personnelData?.getpersonnelbyaccount
//                                     .phoneNumber
//                                 }
//                               </Text>
//                             )}
//                           </Box>
//                         </Flex>
//                       </Flex>
//                     </Box>
//                   </Box>

//                   <Flex direction="column" gap={7} mx="4" mt="-3">
//                     <Flex gap="1" mt="4" ml="60px">
//                       <Text fontWeight="bold">No Recu</Text>
//                       <Text>____________</Text>
//                     </Flex>
//                     <Flex direction="column" border="1px" w="250px">
//                       <Box textAlign="center">
//                         <Text fontWeight="bold">Versement / Amount</Text>
//                       </Box>
//                       <Divider />
//                       <Box h="80px" bg="blue.50" textAlign="center">
//                         <Center>
//                           <Flex p="1em" gap="3">
//                             <Text
//                               align="center"
//                               fontSize="xl"
//                               fontWeight="bold"
//                             >
//                               {lastStudentPaiement ? lastStudentPaiement : "0"}
//                               {/* {dataLastPayment?.AmountRecentAvanceTrancheByStudent} */}
//                               {/* {dataStudentByTrancheStudent?.getStudentByTrancheStudent.montant} */}
//                             </Text>
//                             <Text fontWeight="bold" fontSize="xl">
//                               Fcfa
//                             </Text>
//                           </Flex>
//                         </Center>
//                         <Text mt="-15px" fontSize="sm">
//                           {lettreLastStudentPaiement}jjjjj
//                         </Text>
//                       </Box>
//                     </Flex>
//                     <Flex direction="column" w="300px">
//                       <Text fontSize="14px" fontWeight="bold" ml="10px">
//                         SITUATION FINANCIERE / FINANCIAL SITUATION
//                       </Text>
//                       <Box>
//                         <TableContainer>
//                           <Table
//                             variant="simple"
//                             size="20px"
//                             borderCollapse="collapse"
//                           >
//                             <Thead>
//                               <Tr gap="1" bg="blackAlpha.300">
//                                 <Th border="1px">
//                                   <Box
//                                     fontSize="10px"
//                                     textAlign="center"
//                                     p="5px"
//                                   >
//                                     <Text>Net Attendu</Text>
//                                     <Text>Net Excepted</Text>
//                                   </Box>
//                                 </Th>
//                                 <Th border="1px">
//                                   <Box
//                                     fontSize="10px"
//                                     textAlign="center"
//                                     p="5px"
//                                   >
//                                     <Text>Net Versé</Text>
//                                     <Text>Net Paid</Text>
//                                   </Box>
//                                 </Th>
//                                 {/* <Th border='1px'>
//                                   <Box fontSize='8px' textAlign='center'>
//                                       <Text>Net Reduit</Text>
//                                       <Text>Net Discount</Text>
//                                   </Box>
//                               </Th> */}
//                                 <Th border="1px">
//                                   <Box
//                                     fontSize="10px"
//                                     textAlign="center"
//                                     p="5px"
//                                   >
//                                     <Text>Reste à Payer</Text>
//                                     <Text>Left to Paid</Text>
//                                   </Box>
//                                 </Th>
//                               </Tr>
//                             </Thead>
//                             <Tbody>
//                               <Tr gap="1">
//                                 <Th border="1px">
//                                   <Box h="13px" fontSize="10px">
//                                     <Text textAlign={"center"}>
//                                       {dataClassFeesByStudentId?.getClassfeebyStudent
//                                         ? dataClassFeesByStudentId?.getClassfeebyStudent
//                                         : "0"}
//                                     </Text>
//                                   </Box>
//                                 </Th>
//                                 <Th border="1px">
//                                   <Box fontSize="10px">
//                                     <Text textAlign={"center"}>
//                                       {/* {dataStudentByTrancheStudent?.getTrancheStudentByStudent.montant} */}
//                                       {dataAlreadyPayBySudent
//                                         ?.findpensionbystudent.montantPension
//                                         ? dataAlreadyPayBySudent
//                                             ?.findpensionbystudent
//                                             .montantPension
//                                         : "0"}
//                                     </Text>
//                                   </Box>
//                                 </Th>
//                                 {/* <Th border='1px'>
//                                                             <Box fontSize='8px'>
//                                                                 <Text textAlign={"center"} >

//                                                                 </Text>
//                                                             </Box>
//                                                         </Th> */}
//                                 <Th border="1px">
//                                   <Box fontSize="10px">
//                                     <Text textAlign={"center"}>
//                                       {dataResteFeesToPayByStudent?.findrestpensionbystudent
//                                         ? dataResteFeesToPayByStudent?.findrestpensionbystudent
//                                         : "0"}{" "}
//                                       FCFA
//                                     </Text>
//                                   </Box>
//                                 </Th>
//                               </Tr>
//                             </Tbody>
//                           </Table>
//                         </TableContainer>
//                       </Box>
//                     </Flex>
//                   </Flex>
//                 </Flex>

//                 <Flex justify="space-between" ml="3" mb="2">
//                   <Flex direction="column" textAlign="center">
//                     <Text fontSize="15px" fontWeight="bold">
//                       DETAILS / DETAILS
//                     </Text>
//                     <Box w="550px" mb="2">
//                       <TableContainer>
//                         <Table variant="simple" size="40px">
//                           <Thead>
//                             <Tr gap="1" bg="blackAlpha.300">
//                               <Th border="1px">
//                                 <Box fontSize="10px" textAlign="center">
//                                   <Text>Eléments</Text>
//                                   <Text>Elements</Text>
//                                 </Box>
//                               </Th>
//                               <Th border="1px">
//                                 <Box fontSize="10px" textAlign="center">
//                                   <Text>Attendu</Text>
//                                   <Text>Expected</Text>
//                                 </Box>
//                               </Th>
//                               <Th border="1px">
//                                 <Box fontSize="10px" textAlign="center" p="5px">
//                                   <Text>Percu</Text>
//                                   <Text>Received</Text>
//                                 </Box>
//                               </Th>
//                               <Th border="1px">
//                                 <Box fontSize="10px" textAlign="center" p="5px">
//                                   <Text>Reste</Text>
//                                   <Text>Remainder</Text>
//                                 </Box>
//                               </Th>
//                               <Th border="1px">
//                                 <Box fontSize="10px" textAlign="center" p="5px">
//                                   <Text>Délai</Text>
//                                   <Text>Deadline</Text>
//                                 </Box>
//                               </Th>
//                               {/* 
//                               <Th border="1px">
//                                 <Box fontSize="10px" textAlign="center" p="5px">
//                                   <Text>Date </Text>
//                                   <Text>Date</Text>
//                                 </Box>
//                               </Th> */}
//                             </Tr>
//                           </Thead>
//                           <Tbody>
//                             {/* <Tr gap='1'>
//                                                                 <Th border='1px' bg='#rgba(0,0,0,0.36)'><Box fontSize='8px' fontWeight='bold' textAlign='center'>
//                                                                 <Text>I</Text>

//                                                             </Box>
//                                                             </Th>
//                                                             <Th border='1px'><Box fontSize='8px'>
//                                                                 <Text></Text>
//                                                             </Box>
//                                                             </Th>
//                                                             <Th border='1px'><Box fontSize='8px'>
//                                                                 <Text></Text>
//                                                             </Box>
//                                                             </Th>
//                                                             <Th border='1px'><Box fontSize='8px'>
//                                                                 <Text></Text>
//                                                             </Box>
//                                                             </Th>
//                                                             <Th border='1px'><Box fontSize='8px'>
//                                                                 <Text></Text>
//                                                             </Box>
//                                                             </Th>
//                                                         </Tr> */}
//                             <Tr gap="1">
//                               <Th border="1px">
//                                 <Box
//                                   textAlign="center"
//                                   fontWeight="bold"
//                                   fontSize="10px"
//                                   display={"flex"}
//                                   flexDirection={"column"}
//                                   p="5px"
//                                 >
//                                   <Text>Inscription</Text>
//                                   <Text>Reg. Fees</Text>
//                                 </Box>
//                               </Th>
//                               <Th border="1px">
//                                 <Box fontSize="10px">
//                                   <Text textAlign={"center"}>
//                                     {/* {dataMontantTrancheByStudent
//                                       ?.AmountrExpectedByTranche[0]
//                                       ? dataMontantTrancheByStudent
//                                           ?.AmountrExpectedByTranche[0]
//                                       : "aucun"} */}
//                                     {/* {dataTrancheByStudentId
//                                       ?.getClassfeeofStudent?  dataTrancheByStudentId?
//                                       .getClassfeeofStudent[0].name : "aucun"} */}
//                                   </Text>
//                                 </Box>
//                               </Th>
//                               <Th border="1px">
//                                 <Box fontSize="10px">
//                                   <Text textAlign={"center"}>
//                                     {dataAvanceMontantInscriptionByStudent?.SumAvanceTrancheByStudent
//                                       ? dataAvanceMontantInscriptionByStudent?.SumAvanceTrancheByStudent
//                                       : "0"}
//                                   </Text>
//                                 </Box>
//                               </Th>
//                               <Th border="1px">
//                                 <Box fontSize="10px">
//                                   <Text textAlign={"center"}>
//                                     {/* {
//                                       dataResteTrancheByStudentId
//                                         ?.findByStudentRestTranche[0].Rest
//                                     } */}
//                                   </Text>
//                                 </Box>
//                               </Th>
//                               <Th border="1px">
//                                 <Box fontSize="10px">
//                                   <Text textAlign={"center"}>
//                                     {/* {(new Date(dataDateLineTrancheStudentInscription?.getTrancheDateLineByStudent)).toLocaleDateString()}
//                                      */}
//                                     {/* {dataTrancheByStudentId
//                                       ?.getClassfeeofStudent[0].dateLine
//                                       ? new Date(
//                                           dataTrancheByStudentId?.getClassfeeofStudent[0].dateLine
//                                         ).toLocaleDateString()
//                                       : "aucun"} */}
//                                   </Text>
//                                 </Box>
//                               </Th>
//                               {/* <Th border="1px">
//                                 <Box fontSize="10px">
//                                   <Text textAlign={"center"}>rrr</Text>
//                                 </Box>
//                               </Th> */}
//                             </Tr>
//                             <Tr gap="1">
//                               <Th border="1px">
//                                 <Box
//                                   textAlign="center"
//                                   fontSize="10px"
//                                   fontWeight="bold"
//                                   display={"flex"}
//                                   flexDirection={"column"}
//                                   p="5px"
//                                 >
//                                   <Text>Tranche 1</Text>
//                                   <Text>First Part</Text>
//                                 </Box>
//                               </Th>
//                               <Th border="1px">
//                                 <Box fontSize="10px">
//                                   <Text textAlign={"center"}>
//                                     {/* {dataMontantTrancheByStudent
//                                       ?.AmountrExpectedByTranche[1]
//                                       ? dataMontantTrancheByStudent
//                                           ?.AmountrExpectedByTranche[1]
//                                       : "aucun"} */}
//                                     {/* {dataTrancheByStudentId
//                                       ?.getClassfeeofStudent[1].name?  dataTrancheByStudentId
//                                       ?.getClassfeeofStudent[1].name : "aucun"} */}
//                                   </Text>
//                                 </Box>
//                               </Th>
//                               <Th border="1px">
//                                 <Box fontSize="10px">
//                                   <Text textAlign={"center"}>
//                                     {
//                                       dataAvanceMontantTranche1ByStudent?.SumAvanceTrancheByStudent
//                                     }
//                                   </Text>
//                                 </Box>
//                               </Th>
//                               <Th border="1px">
//                                 <Box fontSize="10px">
//                                   <Text textAlign={"center"}>
//                                     {/* {
//                                       dataResteTrancheByStudentId
//                                         ?.findByStudentRestTranche[1].Rest
//                                     } */}
//                                   </Text>
//                                 </Box>
//                               </Th>
//                               <Th border="1px">
//                                 <Box fontSize="10px">
//                                   <Text textAlign={"center"}>
//                                     {/* {((new Date(expense.createdOn)).toLocaleDateString('fr-FR', { day: 'numeric', month: 'numeric', year: 'numeric' }))}  */}
//                                     {/* {dataTrancheByStudentId
//                                       ?.getClassfeeofStudent[1].dateLine
//                                       ? new Date(
//                                           dataTrancheByStudentId?.getClassfeeofStudent[1].dateLine
//                                         ).toLocaleDateString()
//                                       : "aucun"} */}
//                                     {/* {(new Date(dataDateLineTrancheStudentTranche1?.getTrancheDateLineByStudent)).toLocaleDateString()} */}
//                                   </Text>
//                                 </Box>
//                               </Th>
//                               {/* <Th border="1px">
//                                 <Box fontSize="8px">
//                                   <Text textAlign={"center"}></Text>
//                                 </Box>
//                               </Th> */}
//                             </Tr>
//                             <Tr gap="1">
//                               <Th border="1px">
//                                 <Box
//                                   textAlign="center"
//                                   fontSize="10px"
//                                   fontWeight="bold"
//                                   display={"flex"}
//                                   flexDirection={"column"}
//                                   p="5px"
//                                 >
//                                   <Text textAlign={"center"}>Tranche 2</Text>
//                                   <Text textAlign={"center"}>Second part</Text>
//                                 </Box>
//                               </Th>
//                               <Th border="1px">
//                                 <Box fontSize="10px">
//                                   <Text textAlign={"center"}>
//                                     {/* {dataMontantTrancheByStudent
//                                       ?.AmountrExpectedByTranche[2]
//                                       ? dataMontantTrancheByStudent
//                                           ?.AmountrExpectedByTranche[2]
//                                       : "aucun"} */}
//                                     {/* {dataTrancheByStudentId
//                                       ?.getClassfeeofStudent[2].name?  dataTrancheByStudentId
//                                       ?.getClassfeeofStudent[2].name : "aucun"} */}
//                                   </Text>
//                                 </Box>
//                               </Th>
//                               <Th border="1px">
//                                 <Box fontSize="10px">
//                                   <Text textAlign={"center"}>
//                                     {
//                                       dataAvanceMontantTranche2ByStudent?.SumAvanceTrancheByStudent
//                                     }
//                                   </Text>
//                                 </Box>
//                               </Th>
//                               <Th border="1px">
//                                 <Box fontSize="10px">
//                                   <Text textAlign={"center"}>
//                                     {/* {dataResteTrancheByStudentId?.findByStudentRestTranche? dataResteTrancheByStudentId?.findByStudentRestTranche[2].Rest : 50000} */}
//                                   </Text>
//                                 </Box>
//                               </Th>
//                               <Th border="1px">
//                                 <Box fontSize="10px">
//                                   <Text textAlign={"center"}>
//                                     {/* {((new Date(expense.createdOn)).toLocaleDateString('fr-FR', { day: 'numeric', month: 'numeric', year: 'numeric' }))}  */}
//                                     {/* {dataDateLineTrancheStudentTranche2?.getTrancheDateLineByStudent}  */}
//                                     {/* {console.log(dataDateLineTrancheStudentTranche2?.getTrancheDateLineByStudent)} */}
//                                     {/* {dataTrancheByStudentId
//                                       ?.getClassfeeofStudent[2].dateLine
//                                       ? new Date(
//                                           dataTrancheByStudentId?.getClassfeeofStudent[2].dateLine
//                                         ).toLocaleDateString()
//                                       : "aucune"} */}
//                                   </Text>
//                                 </Box>
//                               </Th>
//                               {/* <Th border="1px">
//                                 <Box fontSize="10px">
//                                   <Text textAlign={"center"}></Text>
//                                 </Box>
//                               </Th> */}
//                             </Tr>
//                           </Tbody>
//                         </Table>
//                       </TableContainer>
//                       <Box textAlign="center">
//                         <Center>
//                           <Flex p="1em" gap="3">
//                             <Text fontSize="xl" fontWeight="bold" ml={"-10px"}>
//                               Montant Total Versé:
//                             </Text>
//                             <Text align="center" fontSize="xl">
//                               {/* {dataStudentByTrancheStudent?.getStudentByTrancheStudent.montant} */}
//                               {/* {dataStudentByTrancheStudent?.getTrancheStudentByStudent.montant} */}
//                               {dataAlreadyPayBySudent?.findpensionbystudent
//                                 .montantPension
//                                 ? dataAlreadyPayBySudent?.findpensionbystudent
//                                     .montantPension
//                                 : "0"}
//                             </Text>
//                             <Text fontWeight="bold" fontSize="xl">
//                               Fcfa
//                             </Text>
//                           </Flex>
//                         </Center>
//                       </Box>
//                     </Box>
//                     <Box fontSize="13px" mt={"-5px"}>
//                       <Text>
//                         Les frais de scolarite ne sont ni remboursables, ni
//                         cessibles, ni transferables
//                       </Text>
//                       <Text>
//                         Tuition fees are neither refundable no transferable
//                       </Text>
//                     </Box>
//                   </Flex>
//                   <Box fontWeight="bold" mt="20px" mr="35px">
//                     <Text as="u">SIGNATURE ET CACHET / VISA AND STAMP</Text>
//                   </Box>
//                 </Flex>
//               </Flex>
//             </Box>
//           )}
//         </Box>
//       </Center>
//     </DefaultLayout>
//   );
// };

// // export async function getStaticProps({ locale }) {
// //     return {
// //       props: {
// //         ...(await getStaticPropsTranslations(locale)),
// //         // Will be passed to the page component as props
// //       },
// //     };
// // }

// export default receipt;


// const list: Student[] = [];
//         for (let i = (await a).length - 3; i < (await a).length; i++) {
//           if (i >= 0) {
//             list.push(a[i]);
//           }
//         }


// const list: Student[] = [];
//     for (let i = (await a).length - 3; i < (await a).length; i++) {
//       if (i >= 0) {
//         list.push(a[i]);
//       }
//     }
//     return list


   
// async getclassfeebystudent(studentid:string){
//   const a= await this.findByOne(studentid)
//   if(!a){
//     throw Error("student not found")
//   }
//   return (a.salle.getEntity().pensionsalle.getItems().map(a=>a.montantPension))[0]
// }
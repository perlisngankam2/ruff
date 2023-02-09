import { Box, Button, Flex, Heading } from "@chakra-ui/react";
import Link from "next/link";
import { useRouter } from "next/router";
import DefaultLayout from "../components/layouts/DefaultLayout";

const Stastistiques = () => {
  const router = useRouter();
  return (
    <DefaultLayout>
      <Box p="3" pt="70px">
        <Heading>Statistiques</Heading>
        <Flex gap={5} mt="5" flexWrap={'wrap'}>
          <Button
            onClick={() => {
              router.push("/payment/suiviepaiementfraisscolarite");
            }}
            colorScheme="blue"
          >
            Frais scolarité par élève
          </Button>
          <Button
            onClick={() => {
              router.push("/payment/suivipaiementpareleverenormal");
            }}
            colorScheme="pink"
          >
            Paiement par éleve Régime normal
          </Button>
          <Button
            onClick={() => {
              router.push("/payment/suivipaiementpareleverespecial");
            }}
            colorScheme="purple"
          >
            Paiement par éleve Régime Special
          </Button>
          <Button
            onClick={() => {
              router.push("/payment/receipt");
            }}
            colorScheme="green"
          >
            Reçu de paiement
          </Button>
          <Button
            onClick={() => {
              router.push("/payment/suiviegeneraldepaiementdefraisdescolarite");
            }}
            colorScheme="purple"
          >
            Suivi general de paiement des frais des colarite
          </Button>
          <Button
            onClick={() => {
              router.push("/payment/suividepaiementdesfraisdepremieretranche");
            }}
            colorScheme="green"
          >
            Suivi de paiement des frais de premiere tranche
          </Button>
          <Button
            onClick={() => {
              router.push("/payment/suiviepaiementdesfraisinscription");
            }}
            colorScheme="pink"
          >
            Suivie paiement des frais d'inscription
          </Button>
        </Flex>
      </Box>
    </DefaultLayout>
  );
  
};

export default Stastistiques;

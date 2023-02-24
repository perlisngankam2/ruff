import { useQuery } from "@apollo/client";
import {
  Avatar,
  Box,
  Center,
  Flex,
  Heading,
  Table,
  TableContainer,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr,
} from "@chakra-ui/react";
import { useRouter } from "next/router";
import { useEffect } from "react";
import DefaultLayout from "../../components/layouts/DefaultLayout";
import { GET_PERSONNEL_BY_ID} from "../../graphql/queries";


const Profil = () => {

  const router = useRouter();

  const {data:dataPersonnelId} = useQuery(GET_PERSONNEL_BY_ID,
  {
    variables:{ id: router.query.id}
  })

  useEffect(() =>{
    console.log(dataPersonnelId)
  })

  return (
    <DefaultLayout>
      <Box p="3" pt="70px" w="100%" background="colors.tertiary">
      {dataPersonnelId && (
        <Flex gap="5">
          <Box rounded="md" p="5" boxShadow="md" w="40%" background="white">
            <Center>
              <Avatar
                src="https://img.freepik.com/vecteurs-premium/profil-avatar-homme-icone-ronde_24640-14044.jpg?w=2000"
                size="xl"
              />
            </Center>
            <Text fontSize="2xl" fontWeight="bold" textAlign="center" my="2">
              {dataPersonnelId.findOnePersonnel.fonction}
            </Text>
            <Box background="blue.500" p="3" rounded="md" color="white">
              <Text>Nom : {dataPersonnelId.findOnePersonnel.firstName}</Text>
              <Text>Prenom : {dataPersonnelId.findOnePersonnel.lastName}</Text>
              <Text>Situation matrimoniale :{dataPersonnelId.findOnePersonnel.situationMatrimonial} </Text>
              <Text>Telephone: {dataPersonnelId.findOnePersonnel.phoneNumber}</Text>
              <Text>Sexe : {dataPersonnelId.findOnePersonnel.sexe}</Text>
            </Box>
            <Box background="white" p="3" rounded="md">
            <Text>Date de naissance :{dataPersonnelId.findOnePersonnel.dateOfBirth}</Text>
              <Text>Date de prise de fonction :{dataPersonnelId.findOnePersonnel.dateOfStartWork} </Text>
              <Text>Nombre d'enfants: {dataPersonnelId.findOnePersonnel.childNumber}</Text>
              <Text> Statut: {dataPersonnelId.findOnePersonnel.status}</Text>
              {/* <Text> Section: Anglophone</Text>
              <Text> Classe: CM1</Text> */}
            </Box>
          </Box>
          <Box rounded="md" p="5" boxShadow="md" background="white" w="60%">
            <Text fontSize="2xl" fontWeight="bold" mb={3}>
              Dossier de salaire
            </Text>
            <TableContainer>
              <Table variant="striped">
                <Thead>
                  <Tr>
                    <Th textAlign="center">Mois de salaire</Th>
                    <Th textAlign="center">Prime</Th>
                    <Th textAlign="center">Retenue</Th>
                    <Th textAlign="center">Salaire net</Th>
                  </Tr>
                </Thead>
                <Tbody>
                  <Tr>
                    <Td textAlign="center">03/2021</Td>
                    <Td textAlign="center">5000</Td>
                    <Td textAlign="center">1000</Td>
                    <Td textAlign="center">155000</Td>
                  </Tr>
                  <Tr>
                    <Td textAlign="center">02/2021</Td>
                    <Td textAlign="center">9000</Td>
                    <Td textAlign="center">3000</Td>
                    <Td textAlign="center">156000</Td>
                  </Tr>
                  <Tr textAlign="center">
                    <Td textAlign="center">01/2021</Td>
                    <Td textAlign="center">1000</Td>
                    <Td textAlign="center">15000</Td>
                    <Td textAlign="center">135000</Td>
                  </Tr>
                  <Tr>
                    <Td textAlign="center">12/2020</Td>
                    <Td textAlign="center">20000</Td>
                    <Td textAlign="center">15000</Td>
                    <Td textAlign="center">135000</Td>
                  </Tr>
                  <Tr>
                    <Td textAlign="center">11/2020</Td>
                    <Td textAlign="center">20000</Td>
                    <Td textAlign="center">15000</Td>
                    <Td textAlign="center">135000</Td>
                  </Tr>
                </Tbody>
              </Table>
            </TableContainer>
          </Box>
        </Flex>
    )}
      </Box>
    </DefaultLayout>
  );
};

export default Profil;

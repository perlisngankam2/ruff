import { Avatar, Box, Flex, Icon, Text } from "@chakra-ui/react";
import { RiUserAddFill } from "react-icons/ri";
import { useQuery, useMutation } from "@apollo/client";
import { GET_ALL_STUDENT } from "../../graphql/Queries";
import { useEffect } from "react";

const LastStudentPayInscriptionFee = () => {
  const {
    data: dataStudent,
    loading,
    error,
    refetch,
    b,
  } = useQuery(GET_ALL_STUDENT);
  let dataTwoLastStudent = dataStudent?.findAllstudents.slice(-3);

  useEffect(() => {
    console.log("dernier eleve enregistre", dataTwoLastStudent);
  });

  return (
    <Box>
      <Box border={"1px"} p={"20px"} rounded={"xl"}>
        {" "}
        <Box>
          <Text
            letterSpacing="tight"
            fontSize="xl"
            color="green.500"
            fontWeight="bold"
            mb={"10px"}
          >
            Derniers élèves inscrit
          </Text>
        </Box>
        <Box >
          <Flex
            rounded="md"
            bg="rgba(0,0,0,0.24)"
            p="1"
            justify="space-between"
          >
            <Box direction="column">
              <Flex
                direction="row"
                p="1"
                justifyContent="center"
                gap="3"
                mt="1"
              >
                {/* <Avatar
                  size="sm"
                  name="Dan Abrahmov"
                  src="https://bit.ly/dan-abramov"
                /> */}

                <Box direction="column" textAlign="center">
                  <Text
                    letterSpacing="tight"
                    fontSize={{ base: "md", sm: "md", md: "md" }}
                    color="red"
                    fontWeight="normal"
                  >
                    Nom 
                  </Text>
                  <Text
                    mt="2"
                    fontSize={{ base: "md", sm: "md", md: "md" }}
                    letterSpacing="tight"
                    color="gray"
                    fontWeight="normal"

                  >
                    Prenom
                  </Text>
                </Box>
              </Flex>
            </Box>
            <Box direction="column" mr="5" mt="3">
              <Icon as={RiUserAddFill} color="yellow.600" boxSize={14} />
              <Text
                position="relative"
                fontSize={{ base: "md", sm: "md", md: "md" }}
                letterSpacing="tight"
                color="purple.500"
              >
                CMI
              </Text>
            </Box>
          </Flex>
        </Box>
      </Box>
    </Box>
  );
};

export default LastStudentPayInscriptionFee;

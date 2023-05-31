import { Avatar, Box, Flex, Icon, Text } from "@chakra-ui/react";
import { RiUserAddFill } from "react-icons/ri";
import { useQuery, useMutation } from "@apollo/client";
import {
  GET_ALL_STUDENT,
  GET_LAST_THREE_STUDENT_REGISTER,
} from "../../graphql/Queries";

import { useEffect } from "react";

const LastStudentRegisteredBox = () => {
  const {
    data: dataStudent,
    loading,
    error,
    refetch,
    b,
  } = useQuery(GET_ALL_STUDENT);
  let dataTwoLastStudent = dataStudent?.findAllstudents.slice(-3);
  const { data: dataLastThreeStudentRegister } = useQuery(
    GET_LAST_THREE_STUDENT_REGISTER
  );

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
            Derniers élèves enrégistrés
          </Text>
        </Box>
        <Box>
          {dataLastThreeStudentRegister &&
            dataLastThreeStudentRegister?.getLastThreeStudents.map(
              (student, index) => (
                <Flex
                  rounded="md"
                  bg="rgba(0,0,0,0.24)"
                  p="1"
                  justify="space-between"
                  key={index}
                >
                  <Box direction="column">
                    <Flex
                      direction="row"
                      p="1"
                      justifyContent="center"
                      // gap="10px"
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
                          {student.firstname}
                        </Text>
                        <Text
                          mt="2"
                          fontSize={{ base: "md", sm: "md", md: "md" }}
                          letterSpacing="tight"
                          color="gray"
                          fontWeight="normal"
                        >
                          {student.lastname}
                        </Text>
                      </Box>
                    </Flex>
                  </Box>
                  <Box direction="column" mr="5" mt="3">
                    <Icon as={RiUserAddFill} color="yellow.600" boxSize={6} />
                    <Text
                      position="relative"
                      fontSize={{ base: "md", sm: "md", md: "md" }}
                      letterSpacing="tight"
                      color="purple.500"
                    >
                      {student.salleName}
                    </Text>
                  </Box>
                </Flex>
              )
            )}
        </Box>
      </Box>
    </Box>
  );
};

export default LastStudentRegisteredBox;

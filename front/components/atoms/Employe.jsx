import {
  Avatar,
  Box,
  Center,
  Flex,
  Icon,
  Text,
  VStack,
} from "@chakra-ui/react";
import Link from "next/link";
import { FiSearch, FiEdit } from "react-icons/fi";
import { MdDelete } from "react-icons/md";
import { BiDetail } from "react-icons/bi";

const Employee = () => {
  return (
    <Box w="180px" bg="white" rounded="md" p="3" boxShadow="md">
      <Center>
        <Avatar
          boxSize="70px"
          src="https://img.freepik.com/vecteurs-premium/profil-avatar-homme-icone-ronde_24640-14044.jpg?w=2000"
        />
      </Center>
      <VStack mt={3}>
        <Text textAlign="center" fontSize="0.85em">
          {/* {props.name} */}
        </Text>
        <Text textAlign="center" fontWeight="bold" fontSize="0.85em">
          {/* {props.function} */}
        </Text>
        <Flex justify="center" gap="2">
          <Link
          href=""
          // href={"/personnel/" + props.id}
          >
            <Icon
              as={BiDetail}
              boxSize="40px"
              p="3"
              bg="purple.100"
              rounded="full"
            />
          </Link>
          <Link href="/personnel/modifierpersonnel">
            <Icon
              as={FiEdit}
              boxSize="40px"
              p="3"
              bg="blue.100"
              rounded="full"
            />
          </Link>
          <Link href="#">
            <Icon
              as={MdDelete}
              boxSize="40px"
              p="3"
              bg="red.500"
              rounded="full"
              color="white"
            />
          </Link>
        </Flex>
      </VStack>
    </Box>
  );
};

export default Employee;

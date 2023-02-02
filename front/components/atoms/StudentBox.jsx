import { Box, Flex, Icon, Text, VStack } from "@chakra-ui/react";
import Link from "next/link";
import { IoSchool } from "react-icons/io5";
import {FiEdit} from 'react-icons/fi';
import {MdDelete} from 'react-icons/md';

const StudentBox = (props) => {
  return (
    <Link href="#">
      <Box
        background="blue.600"
        color="white"
        w="220px"
        p="3"
        rounded="md"
        fontWeight="bold"
      >
        <Flex justify="space-between" alignItems="center">
          <Box>
            <Text>{props.class}</Text>
            <Text fontSize="2.5em">{props.studentnumber}</Text>
            <Text>ELEVES</Text>
          </Box>
          <Box>
            <Icon as={IoSchool} boxSize="80px" />
          </Box>
        </Flex>
        <VStack mt='6px'>
          <Flex justify="center" gap="10">
            <Link href="/eleves/modifiereleve">
              <Icon
                as={FiEdit}
                boxSize="40px"
                p="3"
                bg="black"
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
    </Link>
  );
};

export default StudentBox;

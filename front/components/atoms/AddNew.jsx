import { Box, Flex, Icon, Text } from "@chakra-ui/react";
import Link from "next/link";
import { IoAdd } from "react-icons/io5";

const AddNew = () => {
  return (
    <Link href="/class/addclass">
      <Box
        background="red.600"
        color="white"
        w="220px"
        p="5"
        rounded="md"
        fontWeight="bold"
        textAlign="center"
      >
        <Text fontSize="2.5em">Ajouter</Text>
        <Icon as={IoAdd} boxSize="50px" />
      </Box>
    </Link>
  );
};

export default AddNew;

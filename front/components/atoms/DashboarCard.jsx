import { Box, Flex, Icon, Text } from "@chakra-ui/react";
import { GiGraduateCap, GiReceiveMoney } from "react-icons/gi";

const DashboardCard = (props) => {
  return (
    <Box borderRadius="20px" w="300px" h={119} bgColor={props.color}>
      <Flex position="relative" justify="space-between" p="1em" top={-3} mr={3}>
        <Text
          letterSpacing="tight"
          fontSize="2xl"
          color="white"
          align="flex-start"
        >
          {props.name}
        </Text>
        <Text fontSize="2xl" color="white">
          254
        </Text>
      </Flex>

      <Flex
        position="relative"
        justify="space-between"
        align="flex-start"
        p="1em"
        top={-7}
      >
        <Flex flexDir="column">
          <Text
            letterSpacing="tight"
            fontSize={{ base: "sm", sm: "md", md: "md" }}
            color="white"
            fontWeight="normal"
          >
            <Box as="span" fontWeight="bold">
              105
            </Box>
            Garcons inscrits
          </Text>
          <Text
            position="relative"
            ml={3}
            fontSize={{ base: "sm", sm: "md", md: "md" }}
            letterSpacing="tight"
            color="white"
          >
            <Box as="span" fontWeight="bold">
              149
            </Box>
            Filles inscrites
          </Text>
        </Flex>

        <Flex align="center" position="relative" top={-4}>
          <Icon
            alignContent="right"
            as={GiGraduateCap}
            color="white"
            boxSize={14}
          />
        </Flex>
      </Flex>
    </Box>
  );
};

export default DashboardCard;

import { Box, Flex, Icon, Text } from "@chakra-ui/react";
import { GiGraduateCap, GiReceiveMoney } from "react-icons/gi";

const DashboardCard = (props) => {
  return (
    <Box borderRadius="20px" w="300px" h={119} boxShadow="md" borderLeft="5px solid" borderLeftColor={props.color} bg='rgba(255,255,255,0.48)'>
      <Flex position="relative" justify="space-between" p="1em" top={-3} mr={3}>
        <Text
          letterSpacing="tight"
          fontSize="2xl"
          align="flex-start"
          color={props.color}
        >
          {props.name}
        </Text>
        <Text fontSize="2xl" >
          {props.total}
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
            fontWeight="normal"
          >
            <Box as="span" fontWeight="bold" mr='4px'>
              105
            </Box>
             Garcons inscrits
          </Text>
          <Text
            position="relative"
            ml={3}
            fontSize={{ base: "sm", sm: "md", md: "md" }}
            letterSpacing="tight"
          >
            <Box as="span" fontWeight="bold" mr='4px'>
              149
            </Box>
            Filles inscrites
          </Text>
        </Flex>

        <Flex align="center" position="relative" top={-4}>
          <Icon
            alignContent="right"
            as={props.icon}
            color={props.color}
            // as={GiGraduateCap}
            boxSize={14}
          />
        </Flex>
      </Flex>
    </Box>
  );
};

export default DashboardCard;

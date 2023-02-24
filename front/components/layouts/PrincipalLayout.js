import {
    Accordion,
    AccordionButton,
    AccordionItem,
    AccordionPanel,
    Box,
    Flex,
    Icon,
    StackDivider,
    VStack,
    Hide
  } from "@chakra-ui/react";
  import Link from "next/link";
  import { HiOutlineHome, HiUserGroup } from "react-icons/hi";
  import { IoMdSchool, IoIosStats, IoIosArrowDown } from "react-icons/io";
  

  const PrincipalSidebarLayout = ({ children }) => {
    return (
        <Box> 
            <Accordion allowToggle>
            <AccordionItem>
                <AccordionButton pl={0} my={2}>
                <Link href="/dashboard">
                    <Flex align="center" gap="1">
                    <Icon as={HiOutlineHome} />
                    <Box as="span">Dashboard</Box>
                    </Flex>
                </Link>
                </AccordionButton>
            </AccordionItem>
            <AccordionItem>
                <AccordionButton my={2} pl={0}>
                <Flex align="center" gap="1">
                    <Icon as={HiUserGroup} />
                    <Box as="span">Personnel</Box>
                </Flex>
                </AccordionButton>
                <AccordionPanel>
                <Link href="/personnel">
                    <Box as="span">Liste du Personnel</Box>
                </Link>
                </AccordionPanel>
            </AccordionItem>
            <AccordionItem>
                <AccordionButton pl={0} my={2}>
                <Flex align="center" gap="1">
                    <Icon as={IoMdSchool} />
                    <Box as="span">Élèves</Box>
                </Flex>
                </AccordionButton>
                <AccordionPanel>
                <Link href="/eleves">
                    <Box as="span">Liste des Élèves</Box>
                </Link>
                </AccordionPanel>
            </AccordionItem>
            </Accordion>
            {children}
      </Box>
    );
  };
  
  export default PrincipalSidebarLayout;
  
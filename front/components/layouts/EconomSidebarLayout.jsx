import {
    Accordion,
    AccordionButton,
    AccordionItem,
    AccordionPanel,
    Box,
    Flex,
    Icon,
  } from "@chakra-ui/react";
  import Link from "next/link";
  import { HiOutlineHome, HiUserGroup } from "react-icons/hi";
  import { IoMdSchool, IoIosStats, IoIosArrowDown } from "react-icons/io";
  import { GiTakeMyMoney } from "react-icons/gi";

  const EconomeSidebarLayout = ({ children }) => {
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
    
            <AccordionItem>
                <AccordionButton pl={0} my={2}>
                <Flex align="center" gap="1">
                    <Icon as={GiTakeMyMoney} />
                    <Box as="span">Finances</Box>
                </Flex>
                </AccordionButton>
                <AccordionPanel>
                <Link href="/finances">
                    <Box as="span">Finance 1</Box>
                </Link>
                </AccordionPanel>
                <AccordionPanel>
                <Link href="/finances">
                    <Box as="span">Finance 2</Box>
                </Link>
                </AccordionPanel>
            </AccordionItem>
            <AccordionItem>
                <AccordionButton pl={0} my={2}>
                <Flex align="center" gap="1">
                    <Icon as={GiTakeMyMoney} />
                    <Box as="span">Salaires</Box>
                </Flex>
                </AccordionButton>
                <AccordionPanel>
                <Link href="/payment">
                    <Box as="span">Paiement</Box>
                </Link>
                </AccordionPanel>
                <AccordionPanel>
                <Link href="/payment/lastpayments">
                    <Box as="span">Derniers paiements</Box>
                </Link>
                </AccordionPanel>
            </AccordionItem>
            </Accordion>
            { children }
      </Box>
    );
  };
  
  export default EconomeSidebarLayout;
  
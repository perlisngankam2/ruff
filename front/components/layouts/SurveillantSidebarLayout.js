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
  import { GiTakeMyMoney } from "react-icons/gi";
  import { MdOutlineClass } from "react-icons/md";
  import Header from "../molecules/Header/Header";

  const SurveillantSidebarLayout = ({ children }) => {
    return (
        <Box> 
            <Header/>
            <Flex> 
                <Hide below="md">
                    <VStack
                        background="#e2d39c"
                        p="7"
                        gap={3}
                        minH="100vh"
                        minW={"230px"}
                        align="left"
                        paddingTop={"80px"}
                        color="#0e341f"
                        css={{
                            '&::-webkit-scrollbar':{
                                width:'2px',
                            },
                            '&::-webkit-scrollbar-track':{
                                width:'2px',
                            },
                            '&::-webkit-scrollbar-thumb':{
                                background: scrollbarColor,
                                borderRadius: '24px',
                            },
                        }}
                    >
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
                        <AccordionPanel>
                            <Link href="/personnel/ajouterpersonnel">
                            <Box as="span">Ajouter personnel</Box>
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
                        <AccordionPanel>
                            <Link href="/eleves/ajoutereleve">
                            <Box as="span">Ajouter un élève</Box>
                            </Link>
                        </AccordionPanel>
                        </AccordionItem>
                        <AccordionItem>
                            <AccordionButton pl={0} my={2}>
                            <Flex align="center" gap="1">
                                <Icon as={IoIosStats} />
                                <Box as="span">Statistiques</Box>
                            </Flex>
                            </AccordionButton>
                            <AccordionPanel>
                            <Link href="/statistiques">
                                <Box as="span">Statistiques 1</Box>
                            </Link>
                            </AccordionPanel>
                            <AccordionPanel>
                            <Link href="/statistiques">
                                <Box as="span">Statistiques 2</Box>
                            </Link>
                            </AccordionPanel>
                        </AccordionItem>
                        </Accordion>
                    </VStack>
                </Hide> 
                {children}
            </Flex>
      </Box>
    );
  };
  
  export default SurveillantSidebarLayout;
  
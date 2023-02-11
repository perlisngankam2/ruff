

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
  import { MdOutlineClass } from "react-icons/md";
  
  
  const ManagerLayout = ({ children }) => {
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
            <AccordionPanel>
              <Link href="/personnel/ajouterpersonnel">
                <Box as="span">Ajouter personnel</Box>
              </Link>
            </AccordionPanel>
          </AccordionItem>
          <AccordionItem>
            <AccordionButton my={2} pl={0}>
              <Flex align="center" gap="1">
                <Icon as={MdOutlineClass} />
                <Box as="span">Classes</Box>
              </Flex>
            </AccordionButton>
            <AccordionPanel>
              <Link href="/class">
                <Box as="span">Liste des classes</Box>
              </Link>
            </AccordionPanel>
            <AccordionPanel>
              <Link href="/class/addclass">
                <Box as="span">Ajouter une classe</Box>
              </Link>
            </AccordionPanel>
            <AccordionPanel>
              <Link href="/class/editclass">
                <Box as="span">Editer une classe</Box>
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
        </Accordion>
        { children }
      </Box>
    );
  };
  
  export default ManagerLayout;
  
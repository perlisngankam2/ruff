  import 
  {
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
  import {MdOutlineSms} from "react-icons/md";
  
  const AdminLayout = ({ children }) => {
    return (
     <Box h="100%"> 
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
            <AccordionPanel>
              <Link href="/personnel/categorypersonnel">
                <Box as="span">Categorie personnel</Box>
              </Link>
            </AccordionPanel>
            <AccordionPanel>
              <Link href="/comptePersonnel">
                <Box as="span">Compte personnel</Box>
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
              <Link href="/class/cyclesection">
                <Box as="span">Cycle & section</Box>
              </Link>
            </AccordionPanel>
          </AccordionItem>
          <AccordionItem>
            <AccordionButton my={2} pl={0}>
              <Flex align="center" gap="1">
                <Icon as={MdOutlineClass} />
                <Box as="span">Niveaux</Box>
              </Flex>
            </AccordionButton>
            <AccordionPanel>
              <Link href="/level/levelList">
                <Box as="span">Liste des niveaux</Box>
              </Link>
            </AccordionPanel>
            <AccordionPanel>
              <Link href="/level/addLevel">
                <Box as="span">Ajouter un niveau</Box>
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
            <AccordionPanel>
              <Link href="/eleves/categoryeleve">
                <Box as="span">Categorie des élèves</Box>
              </Link>
            </AccordionPanel>
          </AccordionItem>
          <AccordionItem> 
            <AccordionButton pl={0} my={2}>
              <Flex align="center" gap="1">
                <Icon as={IoMdSchool} />
                <Box as="span">Cours</Box>
              </Flex>
            </AccordionButton>
            <AccordionPanel>
              <Link href="/cours/listeDesCours">
                <Box as="span">Liste des cours</Box>
              </Link>
            </AccordionPanel>
          </AccordionItem>
          <AccordionItem>
            <AccordionButton my={2} pl={0}>
              <Flex align="center" gap="1">
                <Icon as={MdOutlineClass} />
                <Box as="span">Pension</Box>
              </Flex>
            </AccordionButton>
            <AccordionPanel>
              <Link href="pension/listeDroitScolaire">
                <Box as="span">Pension</Box>
              </Link>
            </AccordionPanel>
          </AccordionItem  >
          <AccordionItem>
            <AccordionButton my={2} pl={0}>
              <Flex align="center" gap="1">
                <Icon as={MdOutlineClass} />
                <Box as="span">Reduction</Box>
              </Flex>
            </AccordionButton>
            <AccordionPanel>
              <Link href="reduction/reductionStudent">
                <Box as="span">Reduction scolarite</Box>
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
            <AccordionPanel>
              <Link href="/payment/ajouterprime">
                <Box as="span">Ajouter une prime</Box>
              </Link>
            </AccordionPanel>
            <AccordionPanel>
              <Link href="/payment/ajouterretenue">
                <Box as="span">Ajouter une retenue</Box>
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
          <AccordionItem>
            <AccordionButton pl={0} my={2}>
              <Flex align="center" gap="1">
                <Icon as={MdOutlineSms} />
                <Box as="span">Méssage</Box>
              </Flex>
            </AccordionButton>
            <AccordionPanel>
              <Link href="/message">
                <Box as="span"> Liste des message</Box>
              </Link>
            </AccordionPanel>
            <AccordionPanel>
              <Link href="/message/creersms">
                <Box as="span">Créer un message</Box>
              </Link>
            </AccordionPanel>
            {/* <AccordionPanel>
              <Link href="/mail/mail">
                <Box as="span">Mail</Box>
              </Link>
            </AccordionPanel> */}
          </AccordionItem>
        </Accordion>
        { children }
      </Box>
    );
  };
  
  export default AdminLayout;
  
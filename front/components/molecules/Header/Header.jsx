import {
  Accordion,
  AccordionButton,
  AccordionItem,
  AccordionPanel,
  Avatar,
  Box,
  Container,
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerOverlay,
  Flex,
  Heading,
  HStack,
  Icon,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Show,
  useDisclosure,
  Image,
  Button,
  Text,
} from "@chakra-ui/react";
import Link from "next/link";
import React, { useEffect, useState, useMemo, useContext, use } from "react";
import { HiOutlineHome, HiUserGroup } from "react-icons/hi";
import { IoMdSchool, IoIosStats, IoIosArrowDown } from "react-icons/io";
import { GiTakeMyMoney } from "react-icons/gi";
import { HamburgerIcon } from "@chakra-ui/icons";
import { useAuth } from "../../../contexts/account/Auth/Auth";
import { useAccount } from "../../../contexts/account/Account";
import {
  GET_PERSONNEL_BY_USERID,
  GET_ALL_SCHOOL_PARAMETER,
} from "../../../graphql/Queries";
import { useMutation, useQuery } from "@apollo/client";
import ContentProfilePopop from "../../layouts/Content-profil/ContentProfilePopop";

const Header = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const {
    isOpen: isOpenPopop,
    onOpen: onOpenPopop,
    onClose: onClosePopop,
  } = useDisclosure();
  const { removeAuthToken } = useAuth();
  const { account } = useAccount();
  const {
    data: personnelData,
    called,
    loading,
  } = useQuery(GET_PERSONNEL_BY_USERID, {
    variables: { userid: account?.id },
  });
  const { data: dataSchoolParameter } = useQuery(GET_ALL_SCHOOL_PARAMETER);

  useEffect(() => {
    console.log(dataSchoolParameter?.findAllparameters);
  });
  return (
    <Box
      as="header"
      p={1}
      background="colors.primary"
      color="white"
      w="full"
      top="0"
      position="fixed"
      zIndex="10"
    >
      {/* <Container maxW={"container.xl"}> */}
      <Flex align="center" justify="space-between">
        <Show below="md">
          <Box onClick={onOpen}>
            <HamburgerIcon boxSize="6" />
          </Box>
        </Show>
        {/* DRAWER */}
        <Drawer isOpen={isOpen} onClose={onClose} placement={"left"}>
          <DrawerOverlay />
          <DrawerContent>
            <Accordion allowToggle>
              <AccordionItem pl={5}>
                <AccordionButton pl={0} my={2}>
                  <Link href="/dashboard">
                    <Flex align="center" gap="1">
                      <Icon as={HiOutlineHome} />
                      <Box as="span">Dashboard</Box>
                    </Flex>
                  </Link>
                </AccordionButton>
              </AccordionItem>
              <AccordionItem pl={5}>
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
              <AccordionItem pl={5}>
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

              <AccordionItem pl={5}>
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
              <AccordionItem pl={5}>
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
          </DrawerContent>
        </Drawer>
        {/* <Box>  */}
        <Box display={{ md: "flex" }} width={"full"}>
          {dataSchoolParameter &&
            dataSchoolParameter?.findAllparameters.map((parameter, index) => (
              <Box
                // src="/logo_blanc.png"
                w="150px"
                ml={"15px"}
                key={index}
              >
                <Text fontSize={"30px"}>{parameter.parameterName}</Text>
              </Box>
            ))}
          <Box ml={["auto", "auto", "auto", "auto"]}>
            <Menu>
              <MenuButton mr="12px">
                <Flex align="center" gap="1">
                  {account?.firstName === null &&
                  account?.firstName === null ? (
                    <Avatar
                      name={
                        personnelData?.getpersonnelbyaccount.firstName +
                        " " +
                        personnelData?.getpersonnelbyaccount.lastName
                      }
                      size="md"
                      mr={"10px"}
                    />
                  ) : (
                    <Avatar
                      name={account?.firstName + " " + account?.lastName}
                      size="md"
                    />
                  )}
                  <Icon as={IoIosArrowDown} boxSize="5" />
                </Flex>
              </MenuButton>
              <MenuList color="black" background="white">
                {/* <Link href="/profil">
                    <MenuItem>Profil</MenuItem>
                  </Link> */}
                <MenuItem onClick={onOpenPopop}>Profil</MenuItem>
                <Link href="#">
                  <ContentProfilePopop
                    isOpen={isOpenPopop}
                    onOpen={onOpenPopop}
                    onClose={onClosePopop}
                  />
                  {/* <MenuItem >Paramètres</MenuItem> */}
                </Link>
                <Link href="/" onClick={removeAuthToken}>
                  <MenuItem>Se Déconnecter</MenuItem>
                </Link>
                {/* <Link href="#">
                    <MenuItem>Aide</MenuItem>
                  </Link> */}
              </MenuList>
            </Menu>
          </Box>
        </Box>
      </Flex>
      {/* </Container> */}
    </Box>
  );
};

export default Header;

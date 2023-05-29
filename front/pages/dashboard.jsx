import {
  Flex,
  Heading,
  Stack,
  Box,
  Text,
  Icon,
  Container,
  Table,
  Thead,
  Tbody,
  Tfoot,
  Tr,
  Th,
  Td,
  TableCaption,
  TableContainer,
  SimpleGrid,
  Avatar,
  AvatarBadge,
  AvatarGroup,
} from "@chakra-ui/react";
import { useRouter } from "next/router";
import { useEffect ,useState } from "react";
import { getStaticPropsTranslations } from '../types/staticProps';
import DashboardMain from "../components/molecules/dashboardMain/dashboardMain";
import { useAuth } from "../contexts/account/Auth/Auth";
 

const dashboard = () => {
  const router = useRouter();
  const { setAuthToken, authToken } = useAuth();
  
  // useEffect(()=>{
  //   if(!authToken){
  //     router.back()
  //   }
  // },[authToken])


  return (
    <DashboardMain/>
  );
}

export async function getStaticProps({ locale }) {
  return {
    props: {
      ...(await getStaticPropsTranslations(locale)),
      // Will be passed to the page component as props
    },
  };
}

export default dashboard;

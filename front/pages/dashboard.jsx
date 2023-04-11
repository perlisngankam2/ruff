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
import { getStaticPropsTranslations } from '../types/staticProps';
import DashboardMain from "../components/molecules/dashboardMain/dashboardMain";

 const dashboard = () => {

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

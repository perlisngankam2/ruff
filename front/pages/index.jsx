import { Box, Heading, Hide, Show } from "@chakra-ui/react";
import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Home.module.css";
import LoginPage from "../components/pages/LoginPage/LoginPage";
import { getStaticPropsTranslations } from '../type/staticProps';

export default function Home() {

  return   <LoginPage />
  
}

export const getStaticProps = async ({ locale }) => ({
  props: {
    ...(await getStaticPropsTranslations(locale))
}
});
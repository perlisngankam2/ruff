import { Box, Heading, Hide, Show } from "@chakra-ui/react";
import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Home.module.css";
import LoginPage from "../components/pages/LoginPage/LoginPage";
import { getStaticPropsTranslations } from '../types/staticProps';
import dashboard from "./dashboard";
// import { getStaticPropsTranslations } from "../types/staticProps";
// import { serverSideTranslations } from "next-i18next/serverSideTranslations";

export default function Home() {

  return(  
   
  <LoginPage />
  )
}

export async function getStaticProps({ locale }) {
  return {
    props: {
      ...(await getStaticPropsTranslations(locale))
      // Will be passed to the page component as props
    }
  };
}
// export const getStaticProps = async ({ locales }) => ({
//   props: {
//     ...(await getStaticPropsTranslations(locales))
// }
// });
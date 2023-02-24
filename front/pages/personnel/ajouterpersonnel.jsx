import AjouterPersonnel from "../../components/pages/AjouterPersonnel/AjouterPersonnel"
import { Box, Heading, Hide, Show } from "@chakra-ui/react";
import { getStaticPropsTranslations } from '../../type/staticProps';

export default function Home() {

  return   <AjouterPersonnel />
  
}

export const getStaticProps = async ({ locale }) => ({
  props: {
    ...(await getStaticPropsTranslations(locale))
}
});
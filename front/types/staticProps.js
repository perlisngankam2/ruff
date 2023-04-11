// import nextI18nextConfig from "../plugins/next-i18next.config";
import {serverSideTranslations} from "next-i18next/serverSideTranslations";
import nextI18NextConfig from "../plugins/next-i18next.config";

export const getStaticPropsTranslations = async (
    locale,
    files
  ) => {
    return await serverSideTranslations(
      locale,
      ['common', 'errors', ...(files || [])],
      nextI18NextConfig
    );
  };
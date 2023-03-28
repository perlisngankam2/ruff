import { serverSideTranslations } from "next-i18next";

export async function getStaticProps({ locale }) {
  return {
    props: { ...(await serverSideTranslations(locale, ["common", "errors"])) }
  };
}

export default function i18n() {
  return null;
}

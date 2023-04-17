import RegisterPage from "../components/pages/pages/RegisterPage";
import { getStaticPropsTranslations } from '../types/staticProps';

const Register = () => {
  return <RegisterPage />;
};
export async function getStaticProps({ locale }) {
  return {
    props: {
      ...(await getStaticPropsTranslations(locale)),
      // Will be passed to the page component as props
    },
  };
}
export default Register;

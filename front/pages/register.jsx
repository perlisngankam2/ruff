import RegisterPage from "../components/pages/pages/RegisterPage";
import { getStaticPropsTranslations } from '../types/staticProps';
import React,{useEffect ,useState} from "react";
import { useRouter } from "next/router";
import { useAuth } from "../contexts/account/Auth/Auth";

const Register = () => {
  const router = useRouter();
  const { setAuthToken, authToken } = useAuth();

  // useEffect(()=>{
  //   if(!authToken){
  //     router.back()
  //   }
    
  // },[authToken])

  return (
  <RegisterPage />
  );
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

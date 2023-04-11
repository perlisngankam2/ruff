import { Box, Center } from "@chakra-ui/react";
import LoginForm from "../../molecules/LoginForm/LoginForm";
import { UseTranslation } from "next-i18next";
import { useTransition } from "react";


const LoginPage = () => {
  
  const t = useTransition()
  return (
    <Box w="full">
      <Box>
        <LoginForm/>
      </Box>
    </Box>
  );
};

export default LoginPage;

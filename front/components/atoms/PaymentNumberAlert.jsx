import { Box, Icon, Text } from "@chakra-ui/react";
import { AiOutlineAlert } from "react-icons/ai";
import { UseTranslation, useTranslation } from "next-i18next";


const PaymentNumberAlert = () => {
  const {t} = useTranslation()
  return (
    <Box
      display="flex"
      bg= "rgba(255,255,255,0.48)"
      boxShadow="md"
      p="1"
      rounded="5"
      alignItems="center"
      textAlign="right"
      justifyContent="right"
      gap="3"
      pr="10"
    >
      <Icon as={AiOutlineAlert} color="red.500" boxSize="14" />
      <Text fontSize="xl" align="flex-start" color="red.500">
         7 {t('atoms.PaymentNumberAlert.SalaireAPayerParMois')}
      </Text>
    </Box>
  );
};

export default PaymentNumberAlert;

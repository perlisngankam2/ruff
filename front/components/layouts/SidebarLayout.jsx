import {
  VStack
} from "@chakra-ui/react";
import { useState } from "react";
import PrincipalLaout from "./PrincipalLayout";
import EconomeSidebarLayout from "./EconomSidebarLayout";
import ManagerLayout from "./ManagerLayout";
import AdminLayout from "./AdminLayout";
import { GET_PERSONNEL_BY_USERID } from "../../graphql/Queries";
import { useMutation, useQuery } from '@apollo/client'; 
import { useAccount } from "../../contexts/account/Account";

// const[userProfil, setIsProfil ]  = useState (
//   'administrateur',
//   'fondateur',
//   'principal',
//   'econome',
//   'gesionnaire'
// )

// const role = "isAdmin"
 

  // const userProfil = {
  //   isAdmin: 
  // }

// const [isAdmin, setAdmin] = useState('false');
// const [isFondateur, setIsFondateur] = useState('false');
// const [isPrincipal, setIsPrincipal] = useState('false');
// const [isEconome, setIsEconome] = useState('false');
// const [isGesionnaire, setIsGesionnaire] = useState('false');

// const setProfil = () => {

//   if(userProfil === "administrateur"){
//     setIsProfil(true)
//   }
// }


const SidebarLayout = ({ children }) => {

  
  const { account, loaded } = useAccount();
  const { data: personnelData, called, loading } = useQuery(GET_PERSONNEL_BY_USERID,
     {
        variables:{ userid: account?.id }
    }
  )

  // const role = userRole;

  return (
   
    <VStack
      background="colors.secondary"
      overflowY="auto"
      p="7"
      gap={3}
      minW={"257px"}
      align="left"
      paddingTop={"80px"}
      color="#0e341f"
    >
        { 
          (account?.role==="ADMIN")&&
            <AdminLayout/>
        }

        {
          (personnelData?.getpersonnelbyaccount.fonction==="principal") && 
              <PrincipalLaout/>
        }
        {
        (personnelData?.getpersonnelbyaccount.fonction==="econome") &&
          <EconomeSidebarLayout/>
        }
        { 
        (personnelData?.getpersonnelbyaccount.fonction==="manager") &&
        <ManagerLayout/>
        }
      { children }
    </VStack>
  );
};

export default SidebarLayout;

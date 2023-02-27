import {
  VStack
} from "@chakra-ui/react";
import { useState } from "react";
import PrincipalLaout from "./PrincipalLayout";
import EconomeSidebarLayout from "./EconomSidebarLayout";
import ManagerLayout from "./ManagerLayout";
import AdminLayout from "./AdminLayout";

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

  // const role = userRole;

  return (
   
    <VStack
      background="colors.secondary"
      p="7"
      gap={3}
      minH="100vh"
      minW={"230px"}
      align="left"
      paddingTop={"80px"}
      color="#0e341f"
    >
        { 
          (account?.role==="ADMIN")&&
            <AdminLayout/>
        }
        {
          (account?.role==="PRINCIPAL") && 
              <PrincipalLaout/>
        }
        {
        (account?.role==="ECONOME") &&
          <EconomeSidebarLayout/>
        }
        { 
        (account?.user?.role==="MANAGER") &&
        <ManagerLayout/>
        }
      { children }
    </VStack>
  );
};

export default SidebarLayout;

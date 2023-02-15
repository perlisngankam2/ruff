import {
  VStack
} from "@chakra-ui/react";
import { useState } from "react";
import PrincipalLaout from "./PrincipalLayout";
import EconomeSidebarLayout from "./EconomSidebarLayout";
import ManagerLayout from "./ManagerLayout";
import AdminLayout from "./AdminLayout.jsx";

import { useAuth } from "../../contexts/account/Auth/Auth";

// const[userProfil, setIsProfil ]  = useState (
//   'administrateur',
//   'fondateur',
//   'principal',
//   'econome',
//   'gesionnaire'
// )


 

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

  
   const { userRole } = useAuth();

  // const role = userRole;
  const role = "ADMIN"
  
  return (
   
    <VStack
      background="#e2d39c"
      p="7"
      gap={3}
      minH="100vh"
      minW={"230px"}
      align="left"
      paddingTop={"80px"}
      color="#0e341f"
    >
        { 
          (role==="ADMIN")&&
            <AdminLayout/>
        }
        {
          (role==="PRINCIPAL") && 
              <PrincipalLaout/>
        }
        {
        (role==="ECONOME") &&
          <EconomeSidebarLayout/>
        }
        { 
        (role==="MANAGER") &&
        <ManagerLayout/>
        }
      { children }
    </VStack>
  );
};

export default SidebarLayout;

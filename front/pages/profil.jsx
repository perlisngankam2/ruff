// import {Container} from '@chakra-ui/layout';
// import { Box } from '@chakra-ui/react';
// import Sidebar from '../components/layouts/sidebar-profile/Sidebar-profile';
// import ContentProfile from '../components/layouts/Content-profil/Content-profile';
// import Cover from '../components/layouts/Cover-profile';
// import DefaultLayout from '../components/layouts/DefaultLayout';

// import React,{useEffect ,useState} from "react";
// import { useRouter } from "next/router";
// import { useAuth } from "../contexts/account/Auth/Auth";


// export default function profil(){
//     const router = useRouter();
//     const { setAuthToken, authToken } = useAuth();

//     useEffect(()=>{
//         if(!authToken){
//           router.back()
//         }
        
//       },[authToken])
      
//         return(
//             <DefaultLayout>
//             <Container maxW='100%' mt={"30px"}>
//                 <Cover/>
//                 <Container display={{base: 'block', md: 'flex'}} maxW='container.xl'>
//                 <Sidebar/>
//                 <ContentProfile/>
//                 </Container>
//             </Container>
//             </DefaultLayout>
//         )
    
// }
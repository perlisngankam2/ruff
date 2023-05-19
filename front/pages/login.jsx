import LoginPage from "../components/pages/LoginPage/LoginPage";
import React,{useEffect ,useState} from "react";
import { useRouter } from "next/router";
import { useAuth } from "../contexts/account/Auth/Auth";


const Login = () => {

  const router = useRouter();
  const { setAuthToken, authToken } = useAuth();
  
  useEffect(()=>{
    if(!authToken){
      router.back()
    }
    
  },[authToken])

  return <LoginPage />;
};

export default Login;

// {dataPersonnel && ( 
//   <VStack mt={3}>
//       { dataPersonnel.findAllpersonnel.map((personnel, index) => (
//     <Text key={index}> 
//       <Text textAlign="center" fontSize="0.85em">
//         {personnel.name}
//       </Text>
//       <Text textAlign="center" fontWeight="bold" fontSize="0.85em">
//         {personnel.function}
//       </Text>
//       <Flex justify="center" gap="2">
//         <Link href=""
//         // href={"/personnel/" + props.id}
//         >
//           <Icon
//             as={BiDetail}
//             boxSize="40px"
//             p="3"
//             bg="purple.100"
//             rounded="full"
//           />
//         </Link>
//         <Link href="/personnel/modifierpersonnel">
//           <Icon
//             as={FiEdit}
//             boxSize="40px"
//             p="3"
//             bg="blue.100"
//             rounded="full"
//           />
//         </Link>
//         <Link href="#">
//           <Icon
//             as={MdDelete}
//             boxSize="40px"
//             p="3"
//             bg="red.500"
//             rounded="full"
//             color="white"
//           />
//         </Link>
//       </Flex>
//     </Text>
//      ))} 
//   </VStack>
//   )}
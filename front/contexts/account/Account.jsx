import React, { createContext, useContext, useEffect } from 'react';
import { useMutation, useQuery } from "@apollo/client"; 
import { useAuth } from './Auth/Auth';
import { GET_USER_CONNECTED } from "../../graphql/queries";
import { useRouter } from "next/router";


export const AccountContext = createContext(
  {
    loaded: false,
  account: {},
}
);

export const AccountProvider  = ({ children }) => {
  const { dataUser, called, loading } = useQuery(GET_USER_CONNECTED);
  const { authToken, removeAuthToken } = useAuth();
  const router = useRouter();

  useEffect(() => {
    
    if (authToken) {
      dataUser;
      
    }
    
  }, [authToken, dataUser]);

  // console.log(dataUser?.me)

// useEffect(() => {
//   if (!loading && called) {
//     if (!dataUser) {
//       removeAuthToken?.();
//       router.push('/')
//       // Redirigez l'utilisateur vers la page de connexion ou affichez un message d'erreur
//     }
//   }
// }, [loading, called, dataUser, removeAuthToken]);

// if (loading || !called) {
//   return <div>Loading...</div>;
// }

  return (
    <AccountContext.Provider
      value={{ account: dataUser?.me, loaded: !loading && called }}
    >
      {children}
    </AccountContext.Provider>
  );
};

export const useAccount = () => useContext(AccountContext);

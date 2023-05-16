import React, { createContext, useContext, useEffect } from 'react';
import { useMutation, useQuery } from "@apollo/client"; 
import { useAuth } from './Auth/Auth';
import { GET_USER_CONNECTED } from "../../graphql/Queries";
import { useRouter } from "next/router";


export const AccountContext = createContext(
  {
    loaded: false,
  account: {},
}
);

export const AccountProvider  = ({ children }) => {

  const { authToken, removeAuthToken,userID } = useAuth();

  const { data: dataUser, called, loading } = useQuery(GET_USER_CONNECTED, 
      {
      variables:{ id: userID}
    });
    

  const router = useRouter();

  useEffect(() => {


    if (authToken) {
     console.log(dataUser?.user);
    } 
  }, [authToken, dataUser?.user]);


      return (
        <AccountContext.Provider
          value={{ account: dataUser?.user, loaded: !loading && called}}
        >
          {children}
        </AccountContext.Provider>
      );
}
;
export const useAccount = () => useContext(AccountContext);

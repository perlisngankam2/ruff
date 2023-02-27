import React, { createContext, useState, useEffect, useContext } from 'react';

const AuthContextProps = {

  authToken: "",
  setAuthToken: (data) => {},
  removeAuthToken: () => {},
  userID: "",
  isLogged: false,
}

export const AuthContext = createContext({AuthContextProps});

export const AuthProvider = ({ children }) => {

  const [authToken, setAuthToken] = useState();
  const [userID, setUserID] = useState();
  const [loading, setLoading] = useState(true);

    useEffect(() => {
    setLoading(true);
    setAuthToken(localStorage.getItem('token'));
    setUserID(localStorage.getItem('userID'));
    setLoading(false);
  }, []);


  const setToken = (access_token,userID) => {
    localStorage.setItem('token', access_token);
     localStorage.setItem('userID', userID);
        setAuthToken(access_token);
        setUserID(userID)
  };

  
  const isLogged = !!authToken;
  // console.log("valeur");
    console.log(isLogged);
    // console.log(userRole);

  const removeToken = () => {
    localStorage.removeItem('token');
        setAuthToken(null);
    localStorage.removeItem('userID');
        setUserID(null);

  };


  return (
    <AuthContext.Provider 
    value={{
        authToken,
        setAuthToken: setToken,
        userID: userID,
        removeAuthToken: removeToken,
        isLogged: isLogged,
        loading
    
      }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);

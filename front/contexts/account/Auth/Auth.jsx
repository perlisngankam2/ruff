import React, { createContext, useState, useEffect, useContext } from 'react';

const AuthContextProps = {

  authToken: "",
  setAuthToken: (data) => {},
  removeAuthToken: () => {},
  userRole: "",
  isLogged: false,
}

export const AuthContext = createContext({AuthContextProps});

export const AuthProvider = ({ children }) => {

  const [authToken, setAuthToken] = useState();
  const [userRole, setUserRole] = useState();
  const [loading, setLoading] = useState(true);

    useEffect(() => {
    setLoading(true);
    setAuthToken(localStorage.getItem('token'));
    setUserRole(localStorage.getItem('userRole'));
    setLoading(false);
  }, []);


  const setToken = (access_token,userRole) => {
    localStorage.setItem('token', access_token);
     localStorage.setItem('userRole', userRole);
        setAuthToken(access_token);
        setUserRole(userRole)
  };

  
  const isLogged = !!authToken;
  // console.log("valeur");
    console.log(isLogged);
    // console.log(userRole);

  const removeToken = () => {
    localStorage.removeItem('token');
        setAuthToken(null);
    localStorage.removeItem('userRole');
        setUserRole(null);

  };


  return (
    <AuthContext.Provider 
    value={{
        authToken,
        setAuthToken: setToken,
        userRole: userRole,
        removeAuthToken: removeToken,
        isLogged: isLogged,
        loading
    
      }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);

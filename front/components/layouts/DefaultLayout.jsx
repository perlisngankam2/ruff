import { Box, Flex, Hide } from "@chakra-ui/react";
import Header from "../molecules/Header/Header";
import SidebarLayout from "../layouts/SidebarLayout";
import React, { useState } from 'react';
// import { useAuth } from "../contexts/account/Auth/Auth";
// import { useRouter } from "next/router";

const DefaultLayout = ({children}) => {

//  const { isLogged } = useAuth();
  
//   const isLoggedIn = isLogged;
  
  return (
   <Box>
      <Header />
      <Flex>
        <Hide below="md">
          <SidebarLayout />
        </Hide>
        {children}
      </Flex>
    </Box>
  );
  
};

export default DefaultLayout;

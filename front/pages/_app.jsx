import { ChakraProvider, extendTheme } from "@chakra-ui/react";
// import { appWithTranslation } from 'next-i18next';
import { appWithTranslation } from "next-i18next";
// import { i18n } from "../plugins/next-i18next.config";
// import {i18n} from "../i18n";
import i18nextConfig from  '../plugins/next-i18next.config';
import { ApolloClient, ApolloProvider, InMemoryCache } from "@apollo/client";
import client from "../graphql/apollo-client";
import "../styles/globals.css";
import "@fontsource/open-sans";
import { AuthProvider } from "../contexts/account/Auth/Auth"
import { AccountProvider } from "../contexts/account/Account";
// import { I18nextProvider } from 'react-i18next';
// import { AppProps } from 'next/app';

function MyApp({ Component, pageProps}) {
  const theme = extendTheme({
    fonts: {
      heading: `'Open Sans', sans-serif`,
      body: `'Open Sans', sans-serif`,
    },
    colors: {
      colors: {
        primary: "#0e341f",
        secondary: "#e2d39c",
        tertiary: "f6f7fb",
        quaternary: "#E53E3E",
        quinzaine: "pink.300",
        greencolor: "#2F855A",
        bluecolor: "#BEE3F8",
        greenColor: "green",
        redColor400: "#F56565",
        greenColor400: "#48BB78"
      }, 
    },
  });  

  // const ApolloClient = useApollo(pageProps.initialApolloState);

  return (
    <ApolloProvider client={client}>
        {/* <I18nextProvider i18n={i18n}>  */}
          <AuthProvider>
            <AccountProvider>
            <ChakraProvider theme={theme}>
              <Component {...pageProps} />
            </ChakraProvider>
            </AccountProvider>
          </AuthProvider>
        {/* </I18nextProvider> */}
    </ApolloProvider>
  );
}
// export default appWithTranslation(MyApp)
export default appWithTranslation(MyApp, i18nextConfig)
// export default MyApp;

import { ChakraProvider, extendTheme } from "@chakra-ui/react";
import { appWithTranslation } from 'next-i18next';
// import i18nextConfig from  '../plugins/next-i18next.config';
import i18n from "../plugins/i18n";
import { ApolloClient, ApolloProvider, InMemoryCache } from "@apollo/client";
import client from "../graphql/apollo-client";
// import "../styles/globals.css";
import "@fontsource/open-sans";
import { AuthProvider } from "../contexts/account/Auth/Auth"
import { AccountProvider } from "../contexts/account/Account";


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
        greenColor: "green"
      }, 
    },
  });  

  // const ApolloClient = useApollo(pageProps.initialApolloState);

  return (
    <ApolloProvider client={client}>
        <AuthProvider>
          <AccountProvider>
          <ChakraProvider theme={theme}>
            <Component {...pageProps} />
          </ChakraProvider>
          </AccountProvider>
        </AuthProvider>
    </ApolloProvider>
  );
}

// export default appWithTranslation(MyApp, {i18n})
export default MyApp;

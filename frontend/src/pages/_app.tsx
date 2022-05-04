import "../styles/globals.scss";
import type { AppProps } from "next/app";
import { ChakraProvider } from "@chakra-ui/react";
import Navbar from "../components/Navbar";
import { extendTheme } from "@chakra-ui/react";
import "@fontsource/prompt/400.css"
import client from '../utils/apollo-client'
import { ApolloProvider } from '@apollo/client'

function MyApp({ Component, pageProps }: AppProps) {
  const theme = extendTheme({
    fonts: {
      body: "Prompt",
    },
  });
  return (
    <ApolloProvider client={client}>
      <ChakraProvider theme={theme}>
        <Navbar />
        <Component {...pageProps} />
      </ChakraProvider>
    </ApolloProvider>
  );
}

export default MyApp;

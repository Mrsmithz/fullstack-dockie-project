import "../styles/globals.scss";
import type { AppProps } from "next/app";
import { ChakraProvider } from "@chakra-ui/react";
import Navbar from "../components/Navbar";
import { extendTheme } from "@chakra-ui/react";
import "@fontsource/prompt/400.css"
import { SessionProvider } from "next-auth/react"
import CustomApolloProvider from "../components/context/CustomApolloProvider"

function MyApp({ Component, pageProps}: AppProps) {
  const theme = extendTheme({
    fonts: {
      body: "Prompt",
    },
  });
  return (
    <SessionProvider refetchOnWindowFocus={false} refetchInterval={60 * 60}>
      <CustomApolloProvider>
        <ChakraProvider theme={theme}>
          <Navbar />
          <Component {...pageProps} />
        </ChakraProvider>
      </CustomApolloProvider>
    </SessionProvider>
  );
}

export default MyApp;

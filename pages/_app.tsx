import "../styles/globals.css";
import type { AppProps } from "next/app";
import { client } from "../lib/apolloClient";
import { ApolloProvider } from "@apollo/client";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ApolloProvider {...{ client }}>
      <Component {...pageProps} />
    </ApolloProvider>
  );
}

export default MyApp;

import "../styles/globals.css";
import type { AppProps } from "next/app";
import { initializeApollo } from "../lib/apolloClient";
import { ApolloProvider } from "@apollo/client";

function MyApp({ Component, pageProps }: AppProps) {
  const client = initializeApollo();
  return (
    <ApolloProvider {...{ client }}>
      <Component {...pageProps} />
    </ApolloProvider>
  );
}

export default MyApp;

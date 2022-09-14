import {
  ApolloClient,
  InMemoryCache,
  HttpLink,
  NormalizedCacheObject,
} from "@apollo/client";

const GITHUB_API_KEY = process.env.NEXT_PUBLIC_GITHUB_API_KEY;

let apolloClient: ApolloClient<NormalizedCacheObject> | undefined;

// NOTICE: Nextでこう書くのはあまり推奨されていないそう。
export const client = new ApolloClient({
  uri: "https://flyby-gateway.herokuapp.com/",
  link: new HttpLink({
    uri: process.env.NEXT_PUBLIC_GITHUB_URL,
    headers: {
      Authorization: `Bearer ${process.env.NEXT_PUBLIC_GITHUB_API_KEY}`,
    },
  }),
  cache: new InMemoryCache(),
});

import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import { GET_ME } from "../queries/queries";
import { GetMeQuery } from "../types/generated/graphql";
import { useQuery, gql } from "@apollo/client";
import { client } from "../lib/apolloClient";

const Home: NextPage = () => {
  const { loading, error, data } = useQuery<GetMeQuery>(GET_ME);
  if (loading) return <h1>Loading...</h1>;
  if (error) return <h1>{`Error: ${error.message}`}</h1>;

  return (
    <>
      <h1>Hello</h1>
      <h2>{data?.user?.name}</h2>
    </>
  );
};

export default Home;

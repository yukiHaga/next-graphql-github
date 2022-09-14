import type { NextPage } from "next";
import { ChangeEvent, useState } from "react";
import Head from "next/head";
import Image from "next/image";
import { SEARCH_REPOSITORIES } from "../queries/queries";
import { SearchRepositoriesQuery } from "../types/generated/graphql";
import { useQuery } from "@apollo/client";

const PER_PAGE = 5;
const DEFAULT_STATE = {
  first: PER_PAGE,
  after: null,
  last: null,
  before: null,
  query: "フロントエンドエンジニア",
};

const Home: NextPage = () => {
  const [state, setState] = useState(DEFAULT_STATE);
  const { loading, error, data } = useQuery<SearchRepositoriesQuery>(
    SEARCH_REPOSITORIES,
    {
      variables: { ...state },
    }
  );

  // if (loading) return <h1>Loading...</h1>;
  // if (error) return <h1>{`Error: ${error.message}`}</h1>;
  const search = data?.search;
  const repositoryCount = search?.repositoryCount;
  const repositoryUnit = repositoryCount === 1 ? "Repository" : "Repositories";
  const title = `GitHub Repositories Search Results - ${repositoryCount} ${repositoryUnit}`;
  return (
    <>
      <h2>{title}</h2>
      <form>
        <input
          value={state.query}
          onChange={(e) =>
            setState((prev) => ({ ...prev, query: e.target.value }))
          }
        />
      </form>
    </>
  );
};

export default Home;

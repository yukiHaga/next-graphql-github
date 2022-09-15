import type { NextPage } from "next";
import { ChangeEvent, useState } from "react";
import Head from "next/head";
import Image from "next/image";
import { SEARCH_REPOSITORIES } from "../queries/queries";
import { SearchRepositoriesQuery } from "../types/generated/graphql";
import { useQuery } from "@apollo/client";
import { prepareServerlessUrl } from "next/dist/server/base-server";

const PER_PAGE = 5;
type DEFAULT_STATE = {
  first: number | null | undefined;
  after: string | null | undefined;
  last: number | null | undefined;
  before: string | null | undefined;
  query: string;
};
const DEFAULT_STATE = {
  first: PER_PAGE,
  after: null,
  last: null,
  before: null,
  query: "フロントエンドエンジニア",
};

const Home: NextPage = () => {
  const [state, setState] = useState<DEFAULT_STATE>(DEFAULT_STATE);
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

  const goPrevious = (search: SearchRepositoriesQuery["search"]) => {
    setState((prev) => ({
      ...prev,
      first: null,
      after: null,
      last: PER_PAGE,
      before: search.pageInfo.startCursor,
    }));
  };

  const goNext = (search: SearchRepositoriesQuery["search"]) => {
    setState((prev) => ({
      ...prev,
      after: search.pageInfo.endCursor,
    }));
  };

  return (
    <>
      <form>
        <input
          value={state.query}
          onChange={(e) =>
            setState((prev) => ({ ...prev, query: e.target.value }))
          }
        />
      </form>
      <h2>{title}</h2>
      <ul>
        {search?.edges?.map((edge, i) => {
          const node = edge?.node;
          return (
            <li key={i}>
              {/* @ts-ignore*/}
              <a href={node?.url} target="_blank" rel="noreferrer">
                {/* @ts-ignore*/}
                {node?.name}
              </a>
            </li>
          );
        })}
      </ul>
      {search?.pageInfo.hasPreviousPage && (
        <button onClick={() => goPrevious(search)}>Previous</button>
      )}
      {search?.pageInfo.hasNextPage && (
        <button onClick={() => goNext(search)}>Next</button>
      )}
    </>
  );
};

export default Home;

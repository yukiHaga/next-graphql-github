import { gql } from "@apollo/client";

export const SEARCH_REPOSITORIES = gql`
  query searchRepositories(
    $first: Int
    $after: String
    $last: Int
    $before: String
    $query: String!
  ) {
    search(
      first: $first
      after: $after
      last: $last
      before: $before
      query: $query
      type: REPOSITORY
    ) {
      repositoryCount
      pageInfo {
        endCursor
        hasNextPage
        hasPreviousPage
        startCursor
      }
      edges {
        cursor
        node {
          ... on Repository {
            id
            name
            url
            stargazers {
              totalCount
            }
            viewerHasStarred
          }
        }
      }
    }
  }
`;

export const GET_ME = gql`
  query getMe {
    user(login: "yukiHaga") {
      name
      avatarUrl
    }
  }
`;

export const ADD_STAR = gql`
  mutation addStar($input: AddStarInput!) {
    addStar(input: $input) {
      starrable {
        id
        viewerHasStarred
      }
    }
  }
`;

export const REMOVE_STAR = gql`
  mutation removeStar($input: RemoveStarInput!) {
    removeStar(input: $input) {
      starrable {
        id
        viewerHasStarred
      }
    }
  }
`;

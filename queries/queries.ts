import { gql } from "@apollo/client";

export const GET_ME = gql`
  query getMe {
    user(login: "yukiHaga") {
      name
      avatarUrl
    }
  }
`;

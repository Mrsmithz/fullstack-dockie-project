import { gql, useQuery } from "@apollo/client";

export const GET_ALL_POSTS = gql`
  query Post {
    posts {
      _id
      title
      document
      status
    }
  }
`;

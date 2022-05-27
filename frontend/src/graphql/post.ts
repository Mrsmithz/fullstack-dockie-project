import { gql, useQuery } from "@apollo/client";

export const GET_ALL_POSTS = gql`
  query Post {
    posts {
      _id
      title
      document
      status
      ratingAvg
    }
  }
`;

export const GET_ALL_POST_FOR_FILTER = gql`
  query {
    posts {
      _id
      title
      description
      createdAt
      ratingAvg
      tags {
        name
      }
    }
  }
`

export const GET_ALL_POST_WITH_AUTHOR = gql`
  query {
    posts {
      _id
      title
      tags {
        name
      }
      author {
        firstName
        lastName
      }
      createdAt
      ratingAvg
      images
    }
  }
`
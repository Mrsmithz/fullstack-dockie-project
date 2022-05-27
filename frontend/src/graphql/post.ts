import { gql, useQuery } from "@apollo/client";

export const GET_ALL_POSTS = gql`
  query Post {
    posts {
      _id
      title
      document
      status
      ratingAvg
      images
    }
  }
`;

export const GET_ALL_POST_FOR_FILTER_AUTHOR = gql`
  query {
    posts {
      _id
      title
      description
      author {
        firstName
        lastName
      }
      createdAt
      ratingAvg
      tags {
        name
      }
      images
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

export const GET_NEWEST_POST = gql`
query {
  newestPosts {
    _id
    title
    author {
      firstName
      lastName
    }
    ratingAvg
    createdAt
    images
  }
}
`
import { gql, useQuery } from "@apollo/client";

export const ME = gql
`
query {
    me {
        _id
        firstName
        lastName
        email
        recentViews{
          postId
        }
    }
}
`
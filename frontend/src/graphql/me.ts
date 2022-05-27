import { gql, useQuery } from "@apollo/client";

export const ME = gql
`
    query {
        me {
            firstName
            lastName
            email
            recentView
        }
    }
`
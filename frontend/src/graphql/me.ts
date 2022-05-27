import { gql, useQuery } from "@apollo/client";

export const ME = gql
`
    query {
        me {
        _id
        firstName
        lastName
        recentViews {
            post {
                _id
                title
            }
        }
        }
    }
`

export const VIEW_POST = gql`
    mutation ($postId: MongoID!) {
        view (postId: $postId) {
            post {
                title
            }
        }
    }
}
`